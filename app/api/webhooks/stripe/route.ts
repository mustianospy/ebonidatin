import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get("stripe-signature")

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error("[v0] Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = await createClient()

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        const subscription = event.data.object
        const userId = subscription.metadata?.userId

        if (userId) {
          await supabase.from("subscriptions").upsert({
            user_id: userId,
            stripe_subscription_id: subscription.id,
            stripe_customer_id: subscription.customer,
            status: subscription.status,
            plan: subscription.items.data[0]?.price?.nickname || "premium",
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
        }
        break

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object
        const deletedUserId = deletedSubscription.metadata?.userId

        if (deletedUserId) {
          await supabase
            .from("subscriptions")
            .update({ status: "canceled", updated_at: new Date().toISOString() })
            .eq("user_id", deletedUserId)
        }
        break

      case "invoice.payment_succeeded":
        console.log("[v0] Payment succeeded:", event.data.object.id)
        break

      case "invoice.payment_failed":
        console.error("[v0] Payment failed:", event.data.object.id)
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Webhook processing error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

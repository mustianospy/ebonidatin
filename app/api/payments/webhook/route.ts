import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // In a real implementation, you would verify the webhook signature here
    const body = await request.json()

    const supabase = await createClient()

    // Handle different webhook events
    switch (body.type) {
      case "payment_intent.succeeded":
        // Handle successful payment
        const paymentIntentId = body.data.object.id
        await supabase.from("payments").update({ status: "completed" }).eq("stripe_payment_intent_id", paymentIntentId)
        break

      case "payment_intent.payment_failed":
        // Handle failed payment
        const failedPaymentId = body.data.object.id
        await supabase.from("payments").update({ status: "failed" }).eq("stripe_payment_intent_id", failedPaymentId)
        break

      case "customer.subscription.deleted":
        // Handle subscription cancellation
        const customerId = body.data.object.customer
        // Update user tier back to Starter
        // You would need to map customer ID to user ID
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

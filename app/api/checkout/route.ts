import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const priceIds = {
  premium: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID,
  "premium plus": process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLUS_PRICE_ID,
}

export async function POST(request: Request) {
  try {
    const { plan } = await request.json()

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const priceId = priceIds[plan as keyof typeof priceIds]

    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/premium?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/premium?canceled=true`,
      customer_email: user.email,
      metadata: {
        userId: user.id,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("[v0] Checkout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

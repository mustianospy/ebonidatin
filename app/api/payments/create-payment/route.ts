import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { tier, amount, userId } = await request.json()

    const supabase = await createClient()

    // Verify user authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        user_id: userId,
        tier,
        amount,
        currency: "USD",
        status: "pending",
        stripe_payment_intent_id: `mock_${Date.now()}`, // Mock payment ID
      })
      .select()
      .single()

    if (paymentError) {
      return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
    }

    // In a real implementation, you would integrate with Stripe here
    // For now, we'll simulate a payment URL
    const paymentUrl = `/payments/checkout?payment_id=${payment.id}`

    return NextResponse.json({ paymentUrl })
  } catch (error) {
    console.error("Payment creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

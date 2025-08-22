import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { paymentId, cardData } = await request.json()

    const supabase = await createClient()

    // Get payment details
    const { data: payment } = await supabase.from("payments").select("*").eq("id", paymentId).single()

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    // Simulate payment processing (in real app, integrate with Stripe)
    const isPaymentSuccessful = true // Mock success

    if (isPaymentSuccessful) {
      // Update payment status
      await supabase.from("payments").update({ status: "completed" }).eq("id", paymentId)

      // Update user's tier
      const tierExpiresAt = new Date()
      tierExpiresAt.setMonth(tierExpiresAt.getMonth() + 1) // 1 month from now

      await supabase
        .from("profiles")
        .update({
          tier: payment.tier,
          tier_expires_at: tierExpiresAt.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", payment.user_id)

      return NextResponse.json({ success: true })
    } else {
      // Update payment status to failed
      await supabase.from("payments").update({ status: "failed" }).eq("id", paymentId)

      return NextResponse.json({ error: "Payment failed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

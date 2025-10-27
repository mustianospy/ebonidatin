import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const subscription = await request.json()

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ error: "Invalid subscription object" }, { status: 400 })
    }

    // Store subscription in database or cache
    // This is a placeholder - implement based on your needs
    console.log("[v0] Push subscription received:", subscription.endpoint)

    return NextResponse.json({ success: true, message: "Subscription stored" }, { status: 201 })
  } catch (error) {
    console.error("[v0] Push subscription error:", error)
    return NextResponse.json({ error: "Failed to store subscription" }, { status: 500 })
  }
}

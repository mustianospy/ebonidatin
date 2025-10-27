import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { title, body, icon } = await request.json()

    if (!title || !body) {
      return NextResponse.json({ error: "Title and body are required" }, { status: 400 })
    }

    // Send push notifications to all subscribed clients
    // This is a placeholder - implement based on your needs
    console.log("[v0] Push notification sent:", { title, body })

    return NextResponse.json({ success: true, message: "Notification sent" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Push send error:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}

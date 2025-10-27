import { type NextRequest, NextResponse } from "next/server"
import { monitor } from "@/lib/monitoring"

export async function GET() {
  try {
    const data = monitor.export()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Monitoring API error:", error)
    return NextResponse.json({ error: "Failed to fetch monitoring data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, message, context } = await request.json()

    if (!["error", "warning", "info"].includes(type)) {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 })
    }

    monitor.recordEvent(type, message, context)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Monitoring POST error:", error)
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 })
  }
}

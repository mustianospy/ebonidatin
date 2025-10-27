import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const metric = await request.json()

    console.log("[v0] Web Vital:", {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Metrics error:", error)
    return NextResponse.json({ error: "Failed to record metric" }, { status: 500 })
  }
}

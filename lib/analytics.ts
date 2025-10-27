export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: Date
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private batchSize = 10
  private flushInterval = 30000 // 30 seconds

  constructor() {
    if (typeof window !== "undefined") {
      setInterval(() => this.flush(), this.flushInterval)
    }
  }

  track(event: AnalyticsEvent) {
    this.events.push({
      ...event,
      timestamp: event.timestamp || new Date(),
    })

    if (this.events.length >= this.batchSize) {
      this.flush()
    }
  }

  private async flush() {
    if (this.events.length === 0) return

    try {
      const eventsToSend = [...this.events]
      this.events = []

      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events: eventsToSend }),
      })
    } catch (error) {
      console.error("[v0] Analytics flush error:", error)
    }
  }
}

export const analytics = new Analytics()

import { logger } from "@/lib/logger"

export interface MonitoringEvent {
  type: "error" | "warning" | "info"
  message: string
  context?: Record<string, any>
  timestamp: string
}

class Monitor {
  private events: MonitoringEvent[] = []
  private maxEvents = 500

  recordEvent(type: "error" | "warning" | "info", message: string, context?: Record<string, any>) {
    const event: MonitoringEvent = {
      type,
      message,
      context,
      timestamp: new Date().toISOString(),
    }

    this.events.push(event)

    if (this.events.length > this.maxEvents) {
      this.events.shift()
    }

    logger.log(type === "error" ? "ERROR" : type === "warning" ? "WARN" : "INFO", message, context)
  }

  recordError(error: unknown, context?: Record<string, any>) {
    const message = error instanceof Error ? error.message : String(error)
    this.recordEvent("error", message, {
      ...context,
      stack: error instanceof Error ? error.stack : undefined,
    })
  }

  getEvents() {
    return this.events
  }

  getEventsByType(type: "error" | "warning" | "info") {
    return this.events.filter((e) => e.type === type)
  }

  clear() {
    this.events = []
  }

  export() {
    return {
      events: this.events,
      summary: {
        total: this.events.length,
        errors: this.events.filter((e) => e.type === "error").length,
        warnings: this.events.filter((e) => e.type === "warning").length,
        info: this.events.filter((e) => e.type === "info").length,
      },
    }
  }
}

export const monitor = new Monitor()

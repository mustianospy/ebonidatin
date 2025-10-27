"use client"

import { useEffect } from "react"
import { reportWebVitals } from "@/lib/performance"

export function PerformanceMonitor() {
  useEffect(() => {
    if ("web-vital" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          reportWebVitals({
            name: entry.name,
            value: entry.duration,
            id: entry.name + Date.now(),
          })
        }
      })

      observer.observe({ entryTypes: ["navigation", "resource", "paint", "largest-contentful-paint"] })

      return () => observer.disconnect()
    }
  }, [])

  return null
}

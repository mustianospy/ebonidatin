"use client"

import type React from "react"

import { useEffect } from "react"
import { useNotifications } from "@/hooks/use-notifications"

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { requestPermission } = useNotifications()

  useEffect(() => {
    // Request notification permission on mount
    requestPermission().catch(() => {
      // User denied permission, continue without notifications
    })
  }, [requestPermission])

  return <>{children}</>
}

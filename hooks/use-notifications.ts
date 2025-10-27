"use client"

import { useEffect, useState } from "react"
import { notificationManager } from "@/lib/notifications"

export function useNotifications() {
  const [isSupported, setIsSupported] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    const supported = "Notification" in window && "serviceWorker" in navigator
    setIsSupported(supported)

    if (supported && Notification.permission === "granted") {
      setIsSubscribed(true)
    }
  }, [])

  const requestPermission = async () => {
    const granted = await notificationManager.requestPermission()
    setIsSubscribed(granted)
    return granted
  }

  const sendNotification = async (title: string, options?: any) => {
    if (isSubscribed) {
      await notificationManager.send({
        title,
        body: options?.body || "",
        icon: options?.icon,
      })
    }
  }

  return {
    isSupported,
    isSubscribed,
    requestPermission,
    sendNotification,
  }
}

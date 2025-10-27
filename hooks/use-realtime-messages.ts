"use client"

import { useEffect, useState } from "react"
import { realtimeManager } from "@/lib/realtime"

export function useRealtimeMessages(matchId: string) {
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = realtimeManager.subscribeToMessages(matchId, (newMessage) => {
      setMessages((prev) => [...prev, newMessage])
    })

    return () => {
      unsubscribe()
    }
  }, [matchId])

  return { messages, isLoading }
}

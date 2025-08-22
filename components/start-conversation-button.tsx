"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface StartConversationButtonProps {
  otherUserId: string
  disabled?: boolean
  className?: string
}

export function StartConversationButton({ otherUserId, disabled, className }: StartConversationButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleStartConversation = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/conversations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otherUserId }),
      })

      if (response.ok) {
        const { conversationId } = await response.json()
        router.push(`/messages/${conversationId}`)
      }
    } catch (error) {
      console.error("Error starting conversation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleStartConversation} disabled={disabled || isLoading} className={className}>
      <MessageCircle className="w-4 h-4 mr-2" />
      {isLoading ? "Starting..." : "Send Message"}
    </Button>
  )
}

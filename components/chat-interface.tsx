"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TierBadge } from "@/components/tier-badge"
import { TierPermissions } from "@/components/tier-permissions"
import { Send, Phone, Video } from "lucide-react"
import { cn } from "@/lib/utils"

interface Profile {
  id: string
  display_name: string
  profile_image_url?: string
  tier: string
}

interface Message {
  id: string
  content: string
  sender_id: string
  created_at: string
  is_read: boolean
}

interface Conversation {
  id: string
  participant_1: Profile
  participant_2: Profile
}

interface ChatInterfaceProps {
  conversation: Conversation
  messages: Message[]
  currentUserId: string
  currentUserTier: string
  otherParticipant: Profile
}

export function ChatInterface({
  conversation,
  messages: initialMessages,
  currentUserId,
  currentUserTier,
  otherParticipant,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isLoading) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversation.id,
          sender_id: currentUserId,
          content: newMessage.trim(),
        })
        .select()
        .single()

      if (error) throw error

      setMessages((prev) => [...prev, data])
      setNewMessage("")

      // Update conversation last_message_at
      await supabase
        .from("conversations")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", conversation.id)
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const initiateCall = async (callType: "voice" | "video") => {
    try {
      const { error } = await supabase.from("calls").insert({
        conversation_id: conversation.id,
        caller_id: currentUserId,
        receiver_id: otherParticipant.id,
        call_type: callType,
      })

      if (error) throw error

      // In a real app, you would integrate with WebRTC or a calling service
      alert(`${callType === "voice" ? "Voice" : "Video"} call initiated! (This is a demo)`)
    } catch (error) {
      console.error("Error initiating call:", error)
    }
  }

  return (
    <TierPermissions userTier={currentUserTier}>
      {(permissions) => (
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="flex-shrink-0 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={otherParticipant.profile_image_url || "/placeholder.svg"} />
                  <AvatarFallback>{otherParticipant.display_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{otherParticipant.display_name}</CardTitle>
                  <TierBadge tier={otherParticipant.tier} size="sm" />
                </div>
              </div>
              <div className="flex gap-2">
                {permissions.can_voice_call && (
                  <Button variant="outline" size="sm" onClick={() => initiateCall("voice")}>
                    <Phone className="w-4 h-4" />
                  </Button>
                )}
                {permissions.can_video_call && (
                  <Button variant="outline" size="sm" onClick={() => initiateCall("video")}>
                    <Video className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => {
                const isOwnMessage = message.sender_id === currentUserId
                return (
                  <div key={message.id} className={cn("flex", isOwnMessage ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                        isOwnMessage
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-gray-100 text-gray-900",
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={cn("text-xs mt-1", isOwnMessage ? "text-purple-100" : "text-gray-500")}>
                        {new Date(message.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          <div className="flex-shrink-0 border-t p-4">
            <form onSubmit={sendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </TierPermissions>
  )
}

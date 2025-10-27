"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
  read: boolean
}

interface OtherUser {
  first_name: string
  last_name: string
}

export default function ChatPage() {
  const params = useParams()
  const userId = params.userId as string
  const [messages, setMessages] = useState<Message[]>([])
  const [otherUser, setOtherUser] = useState<OtherUser | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [messageText, setMessageText] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const initChat = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        setCurrentUserId(user.id)

        // Fetch other user's profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name")
          .eq("id", userId)
          .single()

        if (profile) {
          setOtherUser(profile)
        }

        // Fetch messages
        const { data: msgs } = await supabase
          .from("messages")
          .select("*")
          .or(
            `and(sender_id.eq.${user.id},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${user.id})`,
          )
          .order("created_at", { ascending: true })

        setMessages(msgs || [])

        // Mark messages as read
        await supabase.from("messages").update({ read: true }).eq("receiver_id", user.id).eq("sender_id", userId)
      } catch (err) {
        console.error("[v0] Init chat error:", err)
      } finally {
        setLoading(false)
      }
    }

    initChat()
  }, [userId])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!messageText.trim() || !currentUserId) return

    setSending(true)

    try {
      const supabase = createClient()
      const { data: newMessage, error } = await supabase
        .from("messages")
        .insert({
          sender_id: currentUserId,
          receiver_id: userId,
          content: messageText,
          created_at: new Date().toISOString(),
          read: false,
        })
        .select()
        .single()

      if (error) {
        console.error("[v0] Send message error:", error)
        return
      }

      setMessages([...messages, newMessage])
      setMessageText("")
    } catch (err) {
      console.error("[v0] Send message failed:", err)
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading chat...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card p-4">
        <h1 className="text-xl font-semibold">
          {otherUser ? `${otherUser.first_name} ${otherUser.last_name}` : "Chat"}
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender_id === currentUserId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender_id === currentUserId
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            disabled={sending}
            className="flex-1"
          />
          <Button type="submit" disabled={sending || !messageText.trim()} size="icon">
            <Send size={20} />
          </Button>
        </form>
      </div>
    </div>
  )
}

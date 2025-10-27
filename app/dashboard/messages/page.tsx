"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Conversation {
  id: string
  other_user_id: string
  other_user_name: string
  last_message: string
  last_message_time: string
  unread_count: number
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        // Get all messages where user is sender or receiver
        const { data: messages } = await supabase
          .from("messages")
          .select("*")
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order("created_at", { ascending: false })

        if (!messages || messages.length === 0) {
          setConversations([])
          return
        }

        // Group messages by conversation
        const conversationMap = new Map<string, Conversation>()

        for (const message of messages) {
          const otherUserId = message.sender_id === user.id ? message.receiver_id : message.sender_id
          const key = [user.id, otherUserId].sort().join("-")

          if (!conversationMap.has(key)) {
            // Fetch other user's name
            const { data: profile } = await supabase
              .from("profiles")
              .select("first_name, last_name")
              .eq("id", otherUserId)
              .single()

            conversationMap.set(key, {
              id: key,
              other_user_id: otherUserId,
              other_user_name: profile ? `${profile.first_name} ${profile.last_name}` : "Unknown",
              last_message: message.content,
              last_message_time: message.created_at,
              unread_count: message.receiver_id === user.id && !message.read ? 1 : 0,
            })
          }
        }

        setConversations(Array.from(conversationMap.values()))
      } catch (err) {
        console.error("[v0] Fetch conversations error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchConversations()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading messages...</p>
      </div>
    )
  }

  if (conversations.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-semibold">No messages yet</p>
            <p className="text-muted-foreground mt-2">Start a conversation with your matches!</p>
            <Link href="/dashboard/matches">
              <Button className="mt-4">View Matches</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>

        <div className="space-y-2">
          {conversations.map((conversation) => (
            <Link key={conversation.id} href={`/dashboard/messages/${conversation.other_user_id}`}>
              <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{conversation.other_user_name}</p>
                    <p className="text-sm text-muted-foreground truncate">{conversation.last_message}</p>
                  </div>
                  {conversation.unread_count > 0 && (
                    <div className="ml-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                      {conversation.unread_count}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TierBadge } from "@/components/tier-badge"
import Link from "next/link"

interface Profile {
  id: string
  display_name: string
  profile_image_url?: string
  tier: string
}

interface Message {
  content: string
  created_at: string
  sender_id: string
}

interface Conversation {
  id: string
  participant_1: Profile
  participant_2: Profile
  last_message_at: string
  messages: Message[]
}

interface ConversationsListProps {
  conversations: Conversation[]
  currentUserId: string
}

export function ConversationsList({ conversations, currentUserId }: ConversationsListProps) {
  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.participant_1.id === currentUserId ? conversation.participant_2 : conversation.participant_1
  }

  const getLastMessage = (conversation: Conversation) => {
    return conversation.messages?.[0] || null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversations</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No conversations yet</div>
          ) : (
            conversations.map((conversation) => {
              const otherParticipant = getOtherParticipant(conversation)
              const lastMessage = getLastMessage(conversation)

              return (
                <Link key={conversation.id} href={`/messages/${conversation.id}`}>
                  <div className="p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={otherParticipant.profile_image_url || "/placeholder.svg"} />
                        <AvatarFallback>{otherParticipant.display_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium truncate">{otherParticipant.display_name}</h3>
                          <TierBadge tier={otherParticipant.tier} size="sm" />
                        </div>
                        {lastMessage && (
                          <p className="text-sm text-gray-600 truncate">
                            {lastMessage.sender_id === currentUserId ? "You: " : ""}
                            {lastMessage.content}
                          </p>
                        )}
                        <p className="text-xs text-gray-400">
                          {new Date(conversation.last_message_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}

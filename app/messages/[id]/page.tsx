import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { ChatInterface } from "@/components/chat-interface"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface MessagePageProps {
  params: { id: string }
}

export default async function MessagePage({ params }: MessagePageProps) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get conversation details
  const { data: conversation } = await supabase
    .from("conversations")
    .select(
      `
      *,
      participant_1:participant_1_id(id, display_name, profile_image_url, tier),
      participant_2:participant_2_id(id, display_name, profile_image_url, tier)
    `,
    )
    .eq("id", params.id)
    .single()

  if (!conversation) {
    notFound()
  }

  // Check if user is participant
  const isParticipant = conversation.participant_1.id === user.id || conversation.participant_2.id === user.id

  if (!isParticipant) {
    redirect("/messages")
  }

  // Get messages
  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", params.id)
    .order("created_at", { ascending: true })

  // Get current user's profile for tier checking
  const { data: currentProfile } = await supabase.from("profiles").select("tier").eq("id", user.id).single()

  const otherParticipant =
    conversation.participant_1.id === user.id ? conversation.participant_2 : conversation.participant_1

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button asChild variant="outline">
              <Link href="/messages">← Back to Messages</Link>
            </Button>
          </div>

          <ChatInterface
            conversation={conversation}
            messages={messages || []}
            currentUserId={user.id}
            currentUserTier={currentProfile?.tier || "Starter"}
            otherParticipant={otherParticipant}
          />
        </div>
      </div>
    </div>
  )
}

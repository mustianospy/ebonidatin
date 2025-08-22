import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { otherUserId } = await request.json()

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if conversation already exists
    const { data: existingConversation } = await supabase
      .from("conversations")
      .select("id")
      .or(
        `and(participant_1_id.eq.${user.id},participant_2_id.eq.${otherUserId}),and(participant_1_id.eq.${otherUserId},participant_2_id.eq.${user.id})`,
      )
      .single()

    if (existingConversation) {
      return NextResponse.json({ conversationId: existingConversation.id })
    }

    // Create new conversation
    const { data: newConversation, error } = await supabase
      .from("conversations")
      .insert({
        participant_1_id: user.id,
        participant_2_id: otherUserId,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 })
    }

    return NextResponse.json({ conversationId: newConversation.id })
  } catch (error) {
    console.error("Conversation creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

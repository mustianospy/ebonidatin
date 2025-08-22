import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ConversationsList } from "@/components/conversations-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TierPermissions } from "@/components/tier-permissions"
import Link from "next/link"

export default async function MessagesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("tier").eq("id", user.id).single()

  // Get conversations for the user
  const { data: conversations } = await supabase
    .from("conversations")
    .select(
      `
      *,
      participant_1:participant_1_id(id, display_name, profile_image_url, tier),
      participant_2:participant_2_id(id, display_name, profile_image_url, tier),
      messages(content, created_at, sender_id)
    `,
    )
    .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`)
    .order("last_message_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <Button asChild variant="outline">
              <Link href="/dashboard">← Back to Dashboard</Link>
            </Button>
          </div>

          <TierPermissions userTier={profile?.tier || "Starter"}>
            {(permissions) => (
              <>
                {!permissions.can_message ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Upgrade to Start Messaging</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        You need to upgrade your account to send and receive messages.
                      </p>
                      <Button asChild>
                        <Link href="/upgrade">Upgrade Now</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <ConversationsList conversations={conversations || []} currentUserId={user.id} />
                    </div>
                    <div className="lg:col-span-2">
                      <Card className="h-[600px] flex items-center justify-center">
                        <CardContent className="text-center">
                          <p className="text-gray-500">Select a conversation to start messaging</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </>
            )}
          </TierPermissions>
        </div>
      </div>
    </div>
  )
}

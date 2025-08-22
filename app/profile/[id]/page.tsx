import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { MediaGallery } from "@/components/media-gallery"
import { TierBadge } from "@/components/tier-badge"
import { StartConversationButton } from "@/components/start-conversation-button"
import { TierPermissions } from "@/components/tier-permissions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface ProfilePageProps {
  params: { id: string }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get the profile being viewed
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", params.id).single()

  if (!profile) {
    notFound()
  }

  // Get current user's profile for tier checking
  const { data: currentProfile } = await supabase.from("profiles").select("tier").eq("id", user.id).single()

  // Get media gallery
  const { data: mediaItems } = await supabase
    .from("media_galleries")
    .select("*")
    .eq("user_id", params.id)
    .order("order_index", { ascending: true })

  const isOwnProfile = user.id === params.id
  const currentUserTier = currentProfile?.tier || "Starter"
  const canViewPremiumContent =
    currentUserTier === "Gold" || currentUserTier === "Silver" || currentUserTier === "Premium"

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Button asChild variant="outline">
              <Link href="/dashboard">← Back to Dashboard</Link>
            </Button>
            {isOwnProfile && (
              <Button asChild>
                <Link href="/profile/edit">Edit Profile</Link>
              </Button>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    {profile.profile_image_url ? (
                      <Image
                        src={profile.profile_image_url || "/placeholder.svg"}
                        alt={profile.display_name}
                        fill
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-4xl font-bold text-gray-600">
                        {profile.display_name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2">
                    {profile.display_name}
                    {profile.is_verified && (
                      <Badge variant="secondary" className="bg-blue-500 text-white">
                        ✓
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex justify-center">
                    <TierBadge tier={profile.tier} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Age</h4>
                    <p>{profile.age}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Location</h4>
                    <p>{profile.location}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Gender</h4>
                    <p className="capitalize">{profile.gender}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Looking For</h4>
                    <p className="capitalize">{profile.looking_for}</p>
                  </div>
                  {profile.bio && (
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">About</h4>
                      <p className="text-sm leading-relaxed">{profile.bio}</p>
                    </div>
                  )}

                  {!isOwnProfile && (
                    <div className="pt-4 space-y-2">
                      <TierPermissions userTier={currentUserTier}>
                        {(permissions) => (
                          <>
                            {permissions.can_message ? (
                              <StartConversationButton otherUserId={profile.id} className="w-full" />
                            ) : (
                              <Button asChild className="w-full bg-transparent" variant="outline">
                                <Link href="/upgrade">Upgrade to Message</Link>
                              </Button>
                            )}
                          </>
                        )}
                      </TierPermissions>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Media Gallery */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Media Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <MediaGallery
                    mediaItems={mediaItems || []}
                    canViewPremium={canViewPremiumContent || isOwnProfile}
                    isOwnProfile={isOwnProfile}
                    profileId={params.id}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

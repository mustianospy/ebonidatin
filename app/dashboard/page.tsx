import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProfileCard } from "@/components/profile-card"
import { TierBadge } from "@/components/tier-badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get current user's profile
  const { data: currentProfile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get other profiles to browse
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .neq("id", user.id)
    .order("last_active", { ascending: false })
    .limit(12)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentProfile?.display_name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <TierBadge tier={currentProfile?.tier || "Starter"} />
              {currentProfile?.tier === "Starter" && (
                <Button asChild variant="outline" size="sm">
                  <Link href="/upgrade">Upgrade</Link>
                </Button>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/profile/edit">Edit Profile</Link>
            </Button>
            <Button asChild>
              <Link href="/profile/me">My Profile</Link>
            </Button>
          </div>
        </div>

        {/* Browse Profiles */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Discover People</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {profiles?.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} currentUserTier={currentProfile?.tier || "Starter"} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

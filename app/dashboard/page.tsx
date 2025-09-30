import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProfileCard } from "@/components/profile-card"
import { TierBadge } from "@/components/tier-badge"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: currentProfile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (profileError) {
    console.error("[v0] Profile fetch error:", profileError)
  }

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("*")
    .neq("id", user.id)
    .order("last_active", { ascending: false })
    .limit(12)

  if (profilesError) {
    console.error("[v0] Profiles fetch error:", profilesError)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50">
      <nav className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary fill-primary" />
            <span className="text-2xl font-bold text-primary">Eboni Dating</span>
          </Link>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/messages">Messages</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/profile/me">My Profile</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentProfile?.display_name || "User"}</h1>
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
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Discover People</h2>
          {profiles && profiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {profiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} currentUserTier={currentProfile?.tier || "Starter"} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600">No profiles to show yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

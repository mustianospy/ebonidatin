"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, X } from "lucide-react"

interface Profile {
  id: string
  first_name: string
  last_name: string
  date_of_birth: string
  gender: string
  bio: string
  interests: string[]
}

export default function DiscoverPage() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        const { data, error: fetchError } = await supabase.from("profiles").select("*").neq("id", user.id).limit(50)

        if (fetchError) {
          setError(fetchError.message)
          return
        }

        setProfiles(data || [])
      } catch (err) {
        console.error("[v0] Fetch profiles error:", err)
        setError("Failed to load profiles")
      } finally {
        setLoading(false)
      }
    }

    fetchProfiles()
  }, [])

  const handleLike = async () => {
    if (currentIndex >= profiles.length) return

    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const likedProfile = profiles[currentIndex]

      await supabase.from("likes").insert({
        user_id: user.id,
        liked_user_id: likedProfile.id,
        created_at: new Date().toISOString(),
      })

      setCurrentIndex(currentIndex + 1)
    } catch (err) {
      console.error("[v0] Like error:", err)
    }
  }

  const handlePass = () => {
    setCurrentIndex(currentIndex + 1)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading profiles...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

  if (currentIndex >= profiles.length) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-semibold">No more profiles</p>
            <p className="text-muted-foreground mt-2">Check back later for more matches!</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const profile = profiles[currentIndex]
  const age = new Date().getFullYear() - new Date(profile.date_of_birth).getFullYear()

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-b from-primary/20 to-background aspect-square flex items-center justify-center">
              <div className="text-center">
                <p className="text-4xl font-bold">{profile.first_name}</p>
                <p className="text-xl text-muted-foreground">{age} years old</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">About</p>
                <p className="text-foreground">{profile.bio || "No bio provided"}</p>
              </div>

              {profile.interests && profile.interests.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <span key={interest} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button variant="outline" size="lg" className="flex-1 gap-2 bg-transparent" onClick={handlePass}>
                  <X size={20} />
                  Pass
                </Button>
                <Button size="lg" className="flex-1 gap-2" onClick={handleLike}>
                  <Heart size={20} />
                  Like
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

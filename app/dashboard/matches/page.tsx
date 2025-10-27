"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Match {
  id: string
  first_name: string
  last_name: string
  bio: string
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        // Get mutual likes (matches)
        const { data: myLikes } = await supabase.from("likes").select("liked_user_id").eq("user_id", user.id)

        const { data: theirLikes } = await supabase.from("likes").select("user_id").eq("liked_user_id", user.id)

        const myLikedIds = myLikes?.map((l) => l.liked_user_id) || []
        const theirLikedIds = theirLikes?.map((l) => l.user_id) || []

        const mutualLikeIds = myLikedIds.filter((id) => theirLikedIds.includes(id))

        if (mutualLikeIds.length === 0) {
          setMatches([])
          return
        }

        const { data: matchProfiles } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, bio")
          .in("id", mutualLikeIds)

        setMatches(matchProfiles || [])
      } catch (err) {
        console.error("[v0] Fetch matches error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading matches...</p>
      </div>
    )
  }

  if (matches.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-semibold">No matches yet</p>
            <p className="text-muted-foreground mt-2">Keep discovering to find your match!</p>
            <Link href="/dashboard/discover">
              <Button className="mt-4">Continue Discovering</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Matches</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match) => (
            <Card key={match.id}>
              <CardHeader>
                <CardTitle>
                  {match.first_name} {match.last_name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{match.bio || "No bio provided"}</p>
                <Link href={`/dashboard/messages/${match.id}`}>
                  <Button className="w-full">Send Message</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

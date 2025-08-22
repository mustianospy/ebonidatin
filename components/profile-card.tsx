import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TierBadge } from "@/components/tier-badge"
import Link from "next/link"
import Image from "next/image"

interface Profile {
  id: string
  display_name: string
  age: number
  location: string
  bio: string
  tier: string
  profile_image_url?: string
  is_verified: boolean
}

interface ProfileCardProps {
  profile: Profile
  currentUserTier: string
}

export function ProfileCard({ profile, currentUserTier }: ProfileCardProps) {
  const canViewFullProfile = currentUserTier !== "Starter" || profile.tier === "Starter"

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100">
        {profile.profile_image_url ? (
          <Image
            src={profile.profile_image_url || "/placeholder.svg"}
            alt={profile.display_name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-6xl">
            {profile.display_name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="absolute top-2 right-2">
          <TierBadge tier={profile.tier} size="sm" />
        </div>
        {profile.is_verified && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-blue-500 text-white">
              ✓ Verified
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{profile.display_name}</h3>
          <span className="text-sm text-gray-500">{profile.age}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{profile.location}</p>
        <p className="text-sm text-gray-700 line-clamp-2 mb-4">{profile.bio || "No bio available"}</p>
        <Button asChild className="w-full" variant={canViewFullProfile ? "default" : "outline"}>
          <Link href={`/profile/${profile.id}`}>{canViewFullProfile ? "View Profile" : "Upgrade to View"}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

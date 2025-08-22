"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Upload, Lock, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface MediaItem {
  id: string
  file_url: string
  file_type: string
  title: string
  description?: string
  is_premium: boolean
  order_index: number
}

interface MediaGalleryProps {
  mediaItems: MediaItem[]
  canViewPremium: boolean
  isOwnProfile: boolean
  profileId: string
}

export function MediaGallery({ mediaItems, canViewPremium, isOwnProfile, profileId }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)

  const publicMedia = mediaItems.filter((item) => !item.is_premium)
  const premiumMedia = mediaItems.filter((item) => item.is_premium)

  const MediaCard = ({ item, isLocked = false }: { item: MediaItem; isLocked?: boolean }) => (
    <Card className="relative overflow-hidden group cursor-pointer">
      <CardContent className="p-0">
        <div className="relative aspect-square">
          {isLocked ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center">
                <Lock className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                <p className="text-sm text-gray-600">Premium Content</p>
              </div>
            </div>
          ) : (
            <>
              {item.file_type.startsWith("image/") ? (
                <Image
                  src={item.file_url || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <Play className="w-12 h-12 text-purple-600" />
                </div>
              )}
              {item.is_premium && (
                <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-600">Premium</Badge>
              )}
            </>
          )}
        </div>
        {item.title && !isLocked && (
          <div className="p-3">
            <h4 className="font-medium text-sm">{item.title}</h4>
            {item.description && <p className="text-xs text-gray-600 mt-1">{item.description}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {isOwnProfile && (
        <div className="flex justify-end">
          <Button asChild>
            <Link href={`/profile/${profileId}/upload`}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Media
            </Link>
          </Button>
        </div>
      )}

      {/* Public Media */}
      {publicMedia.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Public Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {publicMedia.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <div onClick={() => setSelectedMedia(item)}>
                    <MediaCard item={item} />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  {item.file_type.startsWith("image/") ? (
                    <Image
                      src={item.file_url || "/placeholder.svg"}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  ) : (
                    <video controls className="w-full">
                      <source src={item.file_url} type={item.file_type} />
                    </video>
                  )}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      )}

      {/* Premium Media */}
      {premiumMedia.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Premium Gallery</h3>
            {!canViewPremium && !isOwnProfile && (
              <Button asChild variant="outline" size="sm">
                <Link href="/upgrade">Upgrade to View</Link>
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {premiumMedia.map((item) => (
              <div key={item.id}>
                {canViewPremium || isOwnProfile ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div onClick={() => setSelectedMedia(item)}>
                        <MediaCard item={item} />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      {item.file_type.startsWith("image/") ? (
                        <Image
                          src={item.file_url || "/placeholder.svg"}
                          alt={item.title}
                          width={800}
                          height={600}
                          className="w-full h-auto"
                        />
                      ) : (
                        <video controls className="w-full">
                          <source src={item.file_url} type={item.file_type} />
                        </video>
                      )}
                    </DialogContent>
                  </Dialog>
                ) : (
                  <MediaCard item={item} isLocked />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {mediaItems.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No media uploaded yet</p>
          {isOwnProfile && (
            <Button asChild className="mt-4">
              <Link href={`/profile/${profileId}/upload`}>Upload Your First Photo</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

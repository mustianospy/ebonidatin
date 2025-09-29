"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Upload, ImageIcon, Video } from "lucide-react"
import Link from "next/link"

export default function MediaUploadPage() {
  const params = useParams()
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fileUrl: "",
    fileType: "image/jpeg",
    isPremium: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      // Get the highest order_index
      const { data: existingMedia } = await supabase
        .from("media_galleries")
        .select("order_index")
        .eq("profile_id", user.id)
        .order("order_index", { ascending: false })
        .limit(1)

      const nextOrderIndex = existingMedia && existingMedia.length > 0 ? existingMedia[0].order_index + 1 : 0

      const { error: insertError } = await supabase.from("media_galleries").insert({
        profile_id: user.id,
        file_url: formData.fileUrl,
        file_type: formData.fileType,
        title: formData.title,
        description: formData.description,
        is_premium: formData.isPremium,
        order_index: nextOrderIndex,
      })

      if (insertError) throw insertError

      router.push(`/profile/${params.id}`)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-6 w-6" />
                Upload Media
              </CardTitle>
              <Button asChild variant="outline">
                <Link href={`/profile/${params.id}`}>Cancel</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Give your photo/video a title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fileUrl">File URL *</Label>
                <Input
                  id="fileUrl"
                  type="url"
                  placeholder="https://example.com/your-photo.jpg"
                  required
                  value={formData.fileUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fileUrl: e.target.value }))}
                />
                <p className="text-sm text-gray-500">Upload your file to a hosting service and paste the URL here</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fileType">File Type *</Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={formData.fileType.startsWith("image/") ? "default" : "outline"}
                    onClick={() => setFormData((prev) => ({ ...prev, fileType: "image/jpeg" }))}
                    className="flex-1"
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Image
                  </Button>
                  <Button
                    type="button"
                    variant={formData.fileType.startsWith("video/") ? "default" : "outline"}
                    onClick={() => setFormData((prev) => ({ ...prev, fileType: "video/mp4" }))}
                    className="flex-1"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Video
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add a description..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                <div>
                  <Label htmlFor="isPremium" className="font-semibold">
                    Premium Content
                  </Label>
                  <p className="text-sm text-gray-600">Only paid members can view this</p>
                </div>
                <Switch
                  id="isPremium"
                  checked={formData.isPremium}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPremium: checked }))}
                />
              </div>

              {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700"
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Upload Media"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

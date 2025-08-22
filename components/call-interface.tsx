"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PhoneOff, Video, VideoOff, Mic, MicOff } from "lucide-react"

interface CallInterfaceProps {
  callType: "voice" | "video"
  otherParticipant: {
    id: string
    display_name: string
    profile_image_url?: string
  }
  onEndCall: () => void
}

export function CallInterface({ callType, otherParticipant, onEndCall }: CallInterfaceProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(callType === "video")
  const [callDuration, setCallDuration] = useState(0)

  useEffect(() => {
    // Simulate connection after 2 seconds
    const connectTimer = setTimeout(() => {
      setIsConnected(true)
    }, 2000)

    return () => clearTimeout(connectTimer)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isConnected])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={otherParticipant.profile_image_url || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">{otherParticipant.display_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{otherParticipant.display_name}</CardTitle>
              <p className="text-sm text-gray-500">{isConnected ? formatDuration(callDuration) : "Connecting..."}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {callType === "video" && (
            <div className="bg-gray-900 rounded-lg h-48 mb-4 flex items-center justify-center">
              <p className="text-white">Video call interface (demo)</p>
            </div>
          )}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-12 h-12 p-0 bg-transparent"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            {callType === "video" && (
              <Button
                variant="outline"
                size="lg"
                className="rounded-full w-12 h-12 p-0 bg-transparent"
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              >
                {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </Button>
            )}
            <Button variant="destructive" size="lg" className="rounded-full w-12 h-12 p-0" onClick={onEndCall}>
              <PhoneOff className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface TierPermissions {
  can_message: boolean
  can_view_premium_media: boolean
  can_voice_call: boolean
  can_video_call: boolean
  can_view_all_profiles: boolean
}

interface TierPermissionsProps {
  userTier: string
  children: (permissions: TierPermissions) => React.ReactNode
}

export function TierPermissions({ userTier, children }: TierPermissionsProps) {
  const [permissions, setPermissions] = useState<TierPermissions>({
    can_message: false,
    can_view_premium_media: false,
    can_voice_call: false,
    can_video_call: false,
    can_view_all_profiles: false,
  })

  useEffect(() => {
    const getPermissions = () => {
      switch (userTier) {
        case "Gold":
          return {
            can_message: true,
            can_view_premium_media: true,
            can_voice_call: true,
            can_video_call: true,
            can_view_all_profiles: true,
          }
        case "Silver":
          return {
            can_message: true,
            can_view_premium_media: true,
            can_voice_call: true,
            can_video_call: false,
            can_view_all_profiles: true,
          }
        case "Premium":
          return {
            can_message: true,
            can_view_premium_media: true,
            can_voice_call: false,
            can_video_call: false,
            can_view_all_profiles: true,
          }
        case "Advanced":
          return {
            can_message: true,
            can_view_premium_media: false,
            can_voice_call: false,
            can_video_call: false,
            can_view_all_profiles: true,
          }
        default: // Starter
          return {
            can_message: false,
            can_view_premium_media: false,
            can_voice_call: false,
            can_video_call: false,
            can_view_all_profiles: false,
          }
      }
    }

    setPermissions(getPermissions())
  }, [userTier])

  return <>{children(permissions)}</>
}

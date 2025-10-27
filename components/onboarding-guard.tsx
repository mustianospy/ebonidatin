"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isOnboarded, setIsOnboarded] = useState(false)

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login")
          return
        }

        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        if (!profile || !profile.first_name) {
          router.push("/onboarding")
          return
        }

        setIsOnboarded(true)
      } catch (error) {
        console.error("[v0] Onboarding check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkOnboarding()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!isOnboarded) {
    return null
  }

  return <>{children}</>
}

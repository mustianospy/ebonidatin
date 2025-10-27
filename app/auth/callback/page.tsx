"use client"

import { Suspense } from "react"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import AuthCallbackLoading from "./loading"

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code")
      if (!code) {
        router.push("/login")
        return
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        console.error("Auth callback error:", error)
        router.push(`/login?error=${encodeURIComponent(error.message)}`)
      } else {
        router.push("/dashboard")
      }
    }

    handleCallback()
  }, [searchParams, supabase, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-50 to-white">
      <p className="text-gray-600 font-medium">Processing sign in...</p>
    </div>
  )
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<AuthCallbackLoading />}>
      <AuthCallbackContent />
    </Suspense>
  )
}

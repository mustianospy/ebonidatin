"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("Verifying your email...")

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const supabase = createClient()

        // Get the code from the URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get("access_token")
        const type = hashParams.get("type")

        if (type === "signup" && accessToken) {
          // Update the user's email_verified status in profiles
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (user) {
            const { error } = await supabase.from("profiles").update({ email_verified: true }).eq("id", user.id)

            if (error) {
              console.error("[v0] Error updating email verification:", error)
            }

            setStatus("success")
            setMessage("Email verified successfully! Redirecting to dashboard...")

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
              router.push("/dashboard")
            }, 2000)
          }
        } else {
          setStatus("error")
          setMessage("Invalid verification link")
        }
      } catch (error) {
        console.error("[v0] Verification error:", error)
        setStatus("error")
        setMessage("An error occurred during verification")
      }
    }

    verifyEmail()
  }, [router])

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-b from-cyan-50 to-white">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {status === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
            {status === "success" && <CheckCircle className="h-5 w-5 text-green-600" />}
            {status === "error" && <XCircle className="h-5 w-5 text-red-600" />}
            Email Verification
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        {status === "error" && (
          <CardContent>
            <Button onClick={() => router.push("/auth/login")} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

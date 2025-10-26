"use client"

import { createBrowserClient } from "@supabase/ssr"

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      console.error("[v0] Missing Supabase environment variables")
      throw new Error("Missing Supabase configuration")
    }

    supabaseClient = createBrowserClient(url, key)
    return supabaseClient
  } catch (error) {
    console.error("[v0] Failed to initialize Supabase client:", error)
    throw error
  }
}

export async function signInWithGoogle(redirectTo?: string) {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error("[v0] Google sign-in error:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("[v0] Google sign-in failed:", error)
    return false
  }
}

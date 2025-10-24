import { createBrowserClient } from "@supabase/ssr"

<<<<<<< HEAD
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
<<<<<<< HEAD
=======
export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
>>>>>>> 5f7ecfe94c0ff42d7e2c8d499a6f34aef0565396
}

export async function signInWithGoogle(redirectTo?: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    return false
  }

<<<<<<< HEAD
  return true;
}
=======
>>>>>>> 49624c0 (Fresh start: Clean repository without secret history)
=======
  return true
}
>>>>>>> 5f7ecfe94c0ff42d7e2c8d499a6f34aef0565396

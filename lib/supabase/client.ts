import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
<<<<<<< HEAD
}

export async function signInWithGoogle(redirectTo?: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Error signing in with Google:', error.message);
    // You might want to show a toast notification to the user
    return false;
  }

  return true;
}
=======
>>>>>>> 49624c0 (Fresh start: Clean repository without secret history)

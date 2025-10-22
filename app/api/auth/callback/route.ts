import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = createClient()
    const { error: sessionError, data: sessionData } = await supabase.auth.exchangeCodeForSession(code)

    if (sessionError) {
      console.error('Session exchange error:', sessionError.message)
      // Redirect to a more specific error page if needed
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }

    if (sessionData.user) {
      // With the user session, check if a profile exists.
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', sessionData.user.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        // PGRST116: 'No rows found'. Any other error should be logged.
        console.error('Profile fetch error:', profileError.message)
        // Decide on a redirect path in case of a profile fetch error
        return NextResponse.redirect(`${origin}/auth/auth-code-error`)
      }

      if (!profile) {
        // This is a new user (or at least, they don't have a profile yet).
        // Redirect them to the onboarding page to create their profile.
        return NextResponse.redirect(`${origin}/onboarding`)
      } else {
        // This is an existing user with a profile.
        // Redirect them to the dashboard.
        return NextResponse.redirect(`${origin}/dashboard`)
      }
    }
  }

  // If there's no code, or something else went wrong before user session retrieval
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

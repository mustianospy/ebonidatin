import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase URL or Anon Key is missing.');
      return new NextResponse('Internal Server Error: Missing Supabase configuration.', { status: 500 });
    }

    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          response.cookies.set({ name, value: '', ...options });
        },
      },
    });

    const { data: { user } } = await supabase.auth.getUser();

    const protectedRoutes = ["/dashboard", "/discover", "/matches", "/messages", "/profile", "/onboarding"];
    const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

    if (isProtectedRoute && !user) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return response;
  } catch (error) {
    console.error('Error in middleware:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ],
};

import { createClient } from "@/lib/supabase/server";
import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const supabase = createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").single();

  const { data: { user } } = await supabase.auth.getUser();
  
  // Use a remote procedure call to a dedicated `is_admin` function.
  const isAdmin = user ? (await supabase.rpc("is_admin")).data : false;

  if (settings?.maintenance_mode && !isAdmin && !request.nextUrl.pathname.startsWith("/maintenance")) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  const response = await updateSession(request);

  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const protectedRoutes = ["/dashboard", "/discover", "/matches", "/messages", "/profile", "/onboarding"];
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ],
};

import { createClient } from "@/lib/supabase/server"

export async function checkAdminAccess() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { isAdmin: false, user: null }
  }

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  return {
    isAdmin: profile?.is_admin || false,
    user,
  }
}

export async function requireAdmin() {
  const { isAdmin } = await checkAdminAccess()
  return isAdmin
}

export type UserRole = "user" | "admin"

export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  if (requiredRole === "admin") {
    return userRole === "admin"
  }
  return true
}

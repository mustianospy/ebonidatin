import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <p className="text-muted-foreground">Dashboard coming soon...</p>
      </main>
    </div>
  )
}

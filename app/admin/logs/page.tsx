import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

export default async function AdminLogsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) {
    redirect("/dashboard")
  }

  // Fetch admin logs
  const { data: logs } = await supabase
    .from("admin_logs")
    .select(
      `
      *,
      admin:admin_id(display_name),
      target_user:target_user_id(display_name)
    `,
    )
    .order("created_at", { ascending: false })
    .limit(100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-rose-600 fill-rose-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
              Eboni Dating Admin
            </span>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Audit Logs</h1>
          <div className="text-gray-600">Last 100 actions</div>
        </div>

        <div className="space-y-2">
          {logs?.map((log) => (
            <Card key={log.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <Shield className="h-5 w-5 text-rose-600" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{log.admin?.display_name || "System"}</span>
                        <Badge variant="outline">{log.action}</Badge>
                        {log.target_user && <span className="text-gray-600">→ {log.target_user.display_name}</span>}
                      </div>
                      {log.details && <div className="text-sm text-gray-500 mt-1">{JSON.stringify(log.details)}</div>}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{new Date(log.created_at).toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!logs ||
          (logs.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No admin actions logged yet</p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

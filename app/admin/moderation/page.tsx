import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default async function AdminModerationPage() {
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

  // Fetch pending reports
  const { data: reports } = await supabase
    .from("content_reports")
    .select(
      `
      *,
      reporter:reporter_id(display_name),
      reported_user:reported_user_id(display_name)
    `,
    )
    .eq("status", "pending")
    .order("created_at", { ascending: false })

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
          <h1 className="text-4xl font-bold">Content Moderation</h1>
          <Badge variant="destructive" className="text-lg px-4 py-2">
            {reports?.length || 0} Pending Reports
          </Badge>
        </div>

        <div className="grid gap-4">
          {reports?.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <CardTitle>Report #{report.id.slice(0, 8)}</CardTitle>
                  </div>
                  <Badge variant="outline">{report.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold">Reason:</span> {report.reason}
                  </div>
                  {report.description && (
                    <div>
                      <span className="font-semibold">Description:</span> {report.description}
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold">Reporter:</span> {report.reporter?.display_name || "Unknown"}
                    </div>
                    <div>
                      <span className="font-semibold">Reported User:</span>{" "}
                      {report.reported_user?.display_name || "Unknown"}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Reported: {new Date(report.created_at).toLocaleString()}</div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="destructive">
                      Take Action
                    </Button>
                    <Button size="sm" variant="outline">
                      Dismiss
                    </Button>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/profile/${report.reported_user_id}`}>View Profile</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!reports ||
          (reports.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No pending reports</p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

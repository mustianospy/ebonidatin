import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, DollarSign } from "lucide-react"
import Link from "next/link"

export default async function AdminPaymentsPage() {
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

  // Fetch payments
  const { data: payments } = await supabase
    .from("payments")
    .select(
      `
      *,
      profile:profile_id(display_name)
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
        <h1 className="text-4xl font-bold mb-8">Payments & Subscriptions</h1>

        <div className="space-y-2">
          {payments?.map((payment) => (
            <Card key={payment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{payment.profile?.display_name || "Unknown"}</span>
                        <Badge
                          variant={payment.status === "completed" ? "default" : "secondary"}
                          className={payment.status === "completed" ? "bg-green-600" : ""}
                        >
                          {payment.status}
                        </Badge>
                        <span className="text-gray-600">→ {payment.tier_name}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Payment ID: {payment.id.slice(0, 8)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">${(payment.amount / 100).toFixed(2)}</div>
                    <div className="text-sm text-gray-500">{new Date(payment.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!payments ||
          (payments.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No payments recorded yet</p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

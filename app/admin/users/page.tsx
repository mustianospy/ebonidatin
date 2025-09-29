import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Mail, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { AdminUserActions } from "@/components/admin-user-actions"

export default async function AdminUsersPage() {
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

  // Fetch all users with their profiles
  const { data: users } = await supabase
    .from("profiles")
    .select("*")
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
          <h1 className="text-4xl font-bold">User Management</h1>
          <div className="text-gray-600">Total Users: {users?.length || 0}</div>
        </div>

        <div className="grid gap-4">
          {users?.map((userProfile) => (
            <Card key={userProfile.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold">{userProfile.display_name}</h3>
                      <Badge
                        variant={
                          userProfile.tier === "gold"
                            ? "default"
                            : userProfile.tier === "silver"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          userProfile.tier === "gold"
                            ? "bg-gradient-to-r from-amber-400 to-yellow-500"
                            : userProfile.tier === "silver"
                              ? "bg-gradient-to-r from-slate-300 to-slate-400"
                              : ""
                        }
                      >
                        {userProfile.tier || "starter"}
                      </Badge>
                      {userProfile.is_admin && (
                        <Badge variant="destructive" className="bg-rose-600">
                          Admin
                        </Badge>
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {userProfile.id}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {userProfile.location || "Not specified"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Age: {userProfile.age || "N/A"}
                      </div>
                    </div>

                    <div className="mt-3 text-sm">
                      <span className="font-medium">Gender:</span> {userProfile.gender || "N/A"} |{" "}
                      <span className="font-medium">Looking for:</span> {userProfile.looking_for || "N/A"}
                    </div>

                    {userProfile.bio && <p className="mt-3 text-sm text-gray-600 line-clamp-2">{userProfile.bio}</p>}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <AdminUserActions userId={userProfile.id} isAdmin={userProfile.is_admin || false} />
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/profile/${userProfile.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!users ||
          (users.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <p>No users found</p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

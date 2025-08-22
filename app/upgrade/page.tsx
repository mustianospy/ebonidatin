import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { TierPricingCard } from "@/components/tier-pricing-card"
import { TierBadge } from "@/components/tier-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function UpgradePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const tiers = [
    {
      name: "Advanced",
      price: 9.99,
      duration: "month",
      features: [
        "View all profiles",
        "Send unlimited messages",
        "See who viewed your profile",
        "Advanced search filters",
        "Priority customer support",
      ],
      color: "from-blue-500 to-blue-700",
      popular: false,
    },
    {
      name: "Premium",
      price: 19.99,
      duration: "month",
      features: [
        "All Advanced features",
        "View premium media galleries",
        "Boost your profile visibility",
        "Read receipts for messages",
        "Video chat capabilities",
        "Remove ads completely",
      ],
      color: "from-purple-500 to-purple-700",
      popular: true,
    },
    {
      name: "Silver",
      price: 29.99,
      duration: "month",
      features: [
        "All Premium features",
        "Voice calling with any user",
        "Priority profile placement",
        "Advanced matching algorithm",
        "Exclusive Silver member events",
        "Personal dating coach consultation",
      ],
      color: "from-gray-400 to-gray-600",
      popular: false,
    },
    {
      name: "Gold",
      price: 49.99,
      duration: "month",
      features: [
        "All Silver features",
        "Video calling with any user",
        "Text, voice, and video with anyone",
        "VIP customer support",
        "Exclusive Gold member perks",
        "Monthly premium feature previews",
        "Personal relationship advisor",
      ],
      color: "from-yellow-400 to-yellow-600",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-between items-center mb-6">
              <Button asChild variant="outline">
                <Link href="/dashboard">← Back to Dashboard</Link>
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Current tier:</span>
                <TierBadge tier={profile?.tier || "Starter"} />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Upgrade Your Experience
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlock premium features and connect with more people. Choose the plan that's right for you.
            </p>
          </div>

          {/* Current Tier Info */}
          {profile?.tier !== "Starter" && (
            <Card className="mb-8 border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Your Current Plan: <TierBadge tier={profile?.tier || "Starter"} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">
                      {profile?.tier_expires_at
                        ? `Expires on ${new Date(profile.tier_expires_at).toLocaleDateString()}`
                        : "Active subscription"}
                    </p>
                  </div>
                  <Button variant="outline">Manage Subscription</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {tiers.map((tier) => (
              <TierPricingCard key={tier.name} tier={tier} currentTier={profile?.tier || "Starter"} userId={user.id} />
            ))}
          </div>

          {/* Features Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Feature Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Feature</th>
                      <th className="text-center py-3 px-4">Starter</th>
                      <th className="text-center py-3 px-4">Advanced</th>
                      <th className="text-center py-3 px-4">Premium</th>
                      <th className="text-center py-3 px-4">Silver</th>
                      <th className="text-center py-3 px-4">Gold</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Basic profile browsing</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Send messages</td>
                      <td className="text-center py-3 px-4">Limited</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">View premium media</td>
                      <td className="text-center py-3 px-4">✗</td>
                      <td className="text-center py-3 px-4">✗</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Voice calling</td>
                      <td className="text-center py-3 px-4">✗</td>
                      <td className="text-center py-3 px-4">✗</td>
                      <td className="text-center py-3 px-4">✗</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Video calling</td>
                      <td className="text-center py-3 px-4">✗</td>
                      <td className="text-center py-3 px-4">✗</td>
                      <td className="text-center py-3 px-4">✗</td>
                      <td className="text-center py-3 px-4">✗</td>
                      <td className="text-center py-3 px-4">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

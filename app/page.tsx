import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Video, Star } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-rose-600 fill-rose-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
              Eboni Dating
            </span>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="ghost">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700"
            >
              <Link href="/auth/signup">Join Now</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full mb-6 text-sm font-medium">
            <Star className="h-4 w-4 fill-rose-700" />
            Premium LGBTQ+ Dating Platform
          </div>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent mb-6 leading-tight">
            Find Your Perfect Match on Eboni Dating
          </h1>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join the most inclusive and authentic dating platform for gay and lesbian connections. Experience premium
            features, secure messaging, and meaningful relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 h-14 px-10 text-lg"
            >
              <Link href="/auth/signup">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg border-2 bg-transparent">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">No credit card required • Free to join</p>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl mb-6 flex items-center justify-center">
              <Heart className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Authentic Connections</h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with verified members in a safe, inclusive environment designed for the LGBTQ+ community
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl mb-6 flex items-center justify-center">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Premium Tiers</h3>
            <p className="text-gray-600 leading-relaxed">
              Unlock advanced features with Starter, Advanced, Premium, Silver, and Gold membership levels
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-rose-500 rounded-xl mb-6 flex items-center justify-center">
              <Video className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Rich Communication</h3>
            <p className="text-gray-600 leading-relaxed">
              Text messaging, voice calls, and video calls with premium members. Gold users get unlimited access
            </p>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-4xl font-bold mb-4">Choose Your Membership</h2>
          <p className="text-xl text-gray-600 mb-12">Unlock premium features and find your perfect match</p>
          <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {[
              { name: "Starter", color: "from-gray-400 to-gray-500" },
              { name: "Advanced", color: "from-blue-400 to-blue-500" },
              { name: "Premium", color: "from-purple-400 to-purple-500" },
              { name: "Silver", color: "from-slate-300 to-slate-400" },
              { name: "Gold", color: "from-amber-400 to-yellow-500" },
            ].map((tier) => (
              <div key={tier.name} className="bg-white rounded-xl p-6 shadow-md">
                <div className={`w-12 h-12 bg-gradient-to-r ${tier.color} rounded-full mx-auto mb-3`} />
                <h4 className="font-bold text-lg">{tier.name}</h4>
              </div>
            ))}
          </div>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700"
          >
            <Link href="/upgrade">View All Plans</Link>
          </Button>
        </div>

        <div className="mt-24 bg-white rounded-3xl p-12 shadow-xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <p className="text-gray-600 text-lg">Active Members</p>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent mb-2">
                10K+
              </div>
              <p className="text-gray-600 text-lg">Matches Made</p>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent mb-2">
                4.8★
              </div>
              <p className="text-gray-600 text-lg">User Rating</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t mt-24 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-rose-600 fill-rose-600" />
            <span className="text-xl font-bold text-gray-900">Eboni Dating</span>
          </div>
          <p className="mb-2">© 2025 Eboni Dating. All rights reserved.</p>
          <p className="text-sm">A safe and inclusive platform for LGBTQ+ connections</p>
        </div>
      </footer>
    </div>
  )
}

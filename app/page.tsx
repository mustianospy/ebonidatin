import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Video, Users, MessageCircle, Sparkles } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50">
      <nav className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary fill-primary" />
            <span className="text-2xl font-bold text-primary">Eboni Dating</span>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="ghost">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/auth/signup">Join Now</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Trusted LGBTQ+ Dating Platform
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find Meaningful Connections on Eboni Dating
          </h1>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join thousands of LGBTQ+ individuals finding love, friendship, and authentic connections in a safe,
            inclusive environment designed for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 h-14 px-10 text-lg">
              <Link href="/auth/signup">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg border-2 bg-transparent">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-4">Free to join • No credit card required • 18+ only</p>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-primary/10 rounded-xl mb-6 flex items-center justify-center">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Verified Members</h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with verified LGBTQ+ members in a safe, moderated environment with profile verification and
              security features.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-accent/10 rounded-xl mb-6 flex items-center justify-center">
              <MessageCircle className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Smart Matching</h3>
            <p className="text-gray-600 leading-relaxed">
              Our advanced algorithm helps you find compatible matches based on your preferences, interests, and
              relationship goals.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-primary/10 rounded-xl mb-6 flex items-center justify-center">
              <Video className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Rich Communication</h3>
            <p className="text-gray-600 leading-relaxed">
              Text, voice, and video calls with premium features. Connect meaningfully with unlimited messaging for Gold
              members.
            </p>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Membership Tiers</h2>
          <p className="text-xl text-gray-600 mb-12">Choose the plan that fits your dating journey</p>
          <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {[
              { name: "Starter", color: "from-gray-400 to-gray-500", desc: "Basic features" },
              { name: "Advanced", color: "from-blue-400 to-blue-600", desc: "Enhanced matching" },
              { name: "Premium", color: "from-purple-400 to-purple-600", desc: "Priority support" },
              { name: "Silver", color: "from-slate-300 to-slate-500", desc: "Advanced features" },
              { name: "Gold", color: "from-amber-400 to-yellow-500", desc: "Unlimited access" },
            ].map((tier) => (
              <div
                key={tier.name}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${tier.color} rounded-full mx-auto mb-3`} />
                <h4 className="font-bold text-lg text-gray-900">{tier.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{tier.desc}</p>
              </div>
            ))}
          </div>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90">
            <Link href="/upgrade">View All Plans</Link>
          </Button>
        </div>

        <div className="mt-24 bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">50K+</div>
              <p className="text-gray-600 text-lg">Active Members</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">10K+</div>
              <p className="text-gray-600 text-lg">Successful Matches</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">4.8★</div>
              <p className="text-gray-600 text-lg">User Rating</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t mt-24 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary fill-primary" />
              <span className="text-xl font-bold text-gray-900">Eboni Dating</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/upgrade" className="hover:text-primary transition-colors">
                Pricing
              </Link>
            </div>
          </div>
          <div className="text-center mt-6 text-gray-600">
            <p className="mb-2">© 2025 Eboni Dating. All rights reserved.</p>
            <p className="text-sm">A safe and inclusive platform for LGBTQ+ connections</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

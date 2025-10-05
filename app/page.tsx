import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, MessageCircle, Shield, Check } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-yellow-500 fill-yellow-500" />
            <span className="text-xl font-bold text-white">Eboni Dating</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="text-white hover:text-white/80">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-yellow-600 hover:bg-yellow-700 text-white">
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/couple1.jpg" 
            alt="Happy couple" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-gray-900" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find Love, Build Connections,<br />Celebrate Black Love
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of singles worldwide in a safe, culturally-rich dating community.
            </p>

            {/* Sign Up Form */}
            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg max-w-4xl">
              <form className="flex flex-col md:flex-row gap-3">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="flex-1 px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input 
                  type="number" 
                  placeholder="Age" 
                  className="flex-1 px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="flex-1 px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <select className="flex-1 px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <option value="">I'm a...</option>
                  <option value="man">Man</option>
                  <option value="woman">Woman</option>
                  <option value="other">Other</option>
                </select>
                <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-8">
                  Join Free Today
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-800 mb-4">
                <Shield className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Verified Members</h3>
              <p className="text-gray-400 text-sm">Profiles you can trust</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-800 mb-4">
                <Heart className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Smart Matching</h3>
              <p className="text-gray-400 text-sm">AI-powered connections</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-800 mb-4">
                <MessageCircle className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Rich Communication</h3>
              <p className="text-gray-400 text-sm">Chat, voice, and video calls</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-800 mb-4">
                <Shield className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Privacy First</h3>
              <p className="text-gray-400 text-sm">Your dignity is our top priority</p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Plans Section */}
      <section id="pricing" className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Membership Plans</h2>
              <Badge className="bg-yellow-600 text-white">Send Votes!</Badge>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-6">
                {/* Headers */}
                <div className="text-gray-400 font-medium"></div>
                <div className="text-center">
                  <h3 className="text-white font-semibold mb-2">Free</h3>
                </div>
                <div className="text-center">
                  <h3 className="text-white font-semibold mb-2">Plus</h3>
                </div>
                <div className="text-center">
                  <h3 className="text-white font-semibold mb-2">Premium</h3>
                  <Badge className="bg-yellow-600 text-white text-xs">Send Votes!</Badge>
                </div>

                {/* Messaging Row */}
                <div className="text-white flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-gray-400" />
                  Messaging
                </div>
                <div className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></div>
                <div className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></div>
                <div className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></div>

                {/* Video Calls Row */}
                <div className="text-white flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-gray-400" />
                  Video calls
                </div>
                <div className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></div>
                <div className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></div>
                <div className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></div>

                {/* Priority Support Row */}
                <div className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-gray-400" />
                  Priority Support
                </div>
                <div className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></div>
                <div className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></div>
                <div className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></div>

                {/* Unlimited Matches Row */}
                <div className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  Unlimited Matches
                </div>
                <div className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></div>
                <div className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></div>
                <div className="text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></div>
              </div>

              <div className="p-6 border-t border-gray-700">
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3" asChild>
                  <Link href="/pricing">Choose Your Plan</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Real Love Stories from Eboni Dating</h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <blockquote className="bg-gray-800 p-6 rounded-lg mb-4">
                  <p className="text-white text-lg italic mb-4">
                    "We matched in 2023, got married in 2024. Thank you, Eboni Dating!"
                  </p>
                  <footer className="text-yellow-500 font-semibold">~ Jasmine & Malik</footer>
                </blockquote>
              </div>

              <div className="rounded-lg overflow-hidden">
                <img 
                  src="/couple2.jpg" 
                  alt="Happy couple testimonial" 
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8">Our Community</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden">
              <img src="/couple3.jpg" alt="Community" className="w-full h-64 object-cover" />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img src="/couple4.jpg" alt="Community" className="w-full h-64 object-cover" />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img src="/couple5.jpg" alt="Community" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-white">Eboni Dating</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-yellow-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-yellow-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/pricing" className="hover:text-yellow-500 transition-colors">
                Pricing
              </Link>
            </div>
          </div>

          <div className="text-center mt-6 text-sm text-gray-500">
            © 2025 Eboni Dating. All rights reserved.
            <br />A safe and inclusive platform for LGBTQ+ connections.
          </div>
        </div>
      </footer>
    </div>
  )
}
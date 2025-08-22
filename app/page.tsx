import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6">
            Connect Authentically
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            A premium dating platform designed for meaningful connections in the LGBTQ+ community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 px-8"
            >
              <Link href="/auth/signup">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 bg-transparent">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl">💜</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Authentic Connections</h3>
            <p className="text-gray-600">Connect with like-minded individuals in a safe, inclusive environment</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Features</h3>
            <p className="text-gray-600">Unlock advanced features with our tiered membership system</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl">💬</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Rich Communication</h3>
            <p className="text-gray-600">Text, voice, and video calls with premium members</p>
          </div>
        </div>
      </div>
    </div>
  )
}

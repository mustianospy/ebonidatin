"use client"

import { lazy, Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Users, Shield, Zap, ArrowRight, Star, Sparkles } from "lucide-react"
import { HomeCarousel } from "@/components/home-carousel"

const HeaderClient = lazy(() => import("@/components/header-client").then((mod) => ({ default: mod.HeaderClient })))

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Suspense fallback={<div className="h-16" />}>
        <HeaderClient />
      </Suspense>

      {/* Hero Section with Image Carousel */}
      <HomeCarousel />

      {/* Model of the Day Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-6 h-6 text-amber-600" aria-hidden="true" />
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Model of the Day
            </h3>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg text-center">
            <p className="text-gray-600 dark:text-gray-400">Loading model of the day...</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose Eboni Dating?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Verified Members", desc: "All profiles verified for authenticity" },
              { icon: Zap, title: "Smart Matching", desc: "AI-powered compatibility matching" },
              { icon: Heart, title: "Real Connections", desc: "Find meaningful relationships" },
              { icon: Users, title: "Active Community", desc: "Thousands of verified singles" },
            ].map((feature, idx) => (
              <div key={idx} className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition">
                <feature.icon className="w-8 h-8 text-amber-600 mb-4" aria-hidden="true" />
                <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Choose Your Plan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Free", price: "$0", features: ["Basic profile", "Browse profiles", "Limited likes"] },
              {
                name: "Premium",
                price: "$9.99",
                features: ["Unlimited likes", "Advanced filters", "See who liked you"],
                popular: true,
              },
              { name: "VIP", price: "$19.99", features: ["Priority support", "Verified badge", "Video calls"] },
              { name: "Model Pro", price: "$29.99", features: ["Gallery access", "Model awards", "Analytics"] },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-6 transition ${
                  plan.popular
                    ? "bg-amber-600 text-white shadow-lg scale-105"
                    : "bg-card border border-border text-foreground"
                }`}
              >
                {plan.popular && (
                  <div className="text-sm font-semibold mb-2 flex items-center gap-1">
                    <Star className="w-4 h-4" aria-hidden="true" /> Most Popular
                  </div>
                )}
                <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                <p className="text-2xl font-bold mb-4">
                  {plan.price}
                  <span className="text-sm">/mo</span>
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/sign-up">
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-foreground">Ready to Find Your Match?</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of Black singles finding love and authentic connections on Eboni Dating.
          </p>
          <Link href="/auth/sign-up">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
              Start Your Journey Today <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 text-foreground">About</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Safety Tips
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Follow</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Eboni Dating. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

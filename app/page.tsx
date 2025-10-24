"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Users, Shield, Zap, ArrowRight, Star, Sparkles } from "lucide-react"
import { HeaderClient } from "@/components/header-client"

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [modelOfDay, setModelOfDay] = useState<any>(null)

  const modelImages = [
    "/beautiful-black-woman-model-1.jpg",
    "/beautiful-black-woman-model-2.jpg",
    "/beautiful-black-woman-model-3.jpg",
    "/beautiful-black-woman-model-4.jpg",
    "/beautiful-black-woman-model-5.jpg",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % modelImages.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [modelImages.length])

  // Fetch model of the day
  useEffect(() => {
    const fetchModelOfDay = async () => {
      try {
        const response = await fetch("/api/models/of-day")
        if (response.ok) {
          const data = await response.json()
          setModelOfDay(data)
        }
      } catch (err) {}
    }
    fetchModelOfDay()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderClient />

      {/* Hero Section with Image Carousel */}
      <section className="relative w-full h-96 sm:h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={modelImages[currentImageIndex] || "/placeholder.svg"}
            alt={`Model carousel image ${currentImageIndex + 1} of ${modelImages.length}`}
            fill
            className="object-cover transition-opacity duration-1000"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
            Find Your Perfect Match
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl text-balance">
            Connect with authentic Black singles worldwide. Verified members, smart matching, and meaningful
            relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
                Get Started <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Navigation */}
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
          role="tablist"
          aria-label="Carousel slides"
        >
          {modelImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentImageIndex ? "bg-white w-8" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              aria-selected={idx === currentImageIndex}
              role="tab"
            />
          ))}
        </div>
      </section>

      {/* Model of the Day Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-6 h-6 text-amber-600" aria-hidden="true" />
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Model of the Day
            </h3>
          </div>

          {modelOfDay ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={modelOfDay.profile_photo_url || "/placeholder.svg"}
                    alt={`${modelOfDay.full_name}, Model of the Day`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
              <div className="md:col-span-2 flex flex-col justify-center space-y-4">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{modelOfDay.full_name}</h4>
                  <p className="text-amber-600 font-semibold">
                    {modelOfDay.city}, {modelOfDay.country}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">{modelOfDay.likes_count || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Likes</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">{modelOfDay.followers_count || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">{modelOfDay.posts_count || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
                  </div>
                </div>
                <Link href="/auth/sign-up">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">View Profile & Connect</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg text-center">
              <p className="text-gray-600 dark:text-gray-400">Loading model of the day...</p>
            </div>
          )}
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

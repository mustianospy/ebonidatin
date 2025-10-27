"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Get started with basic features",
    features: ["Browse profiles", "Like/Pass", "Basic messaging", "Limited daily likes"],
    current: true,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "/month",
    description: "Unlock all features",
    features: [
      "Unlimited likes",
      "Advanced filters",
      "See who liked you",
      "Priority messaging",
      "Verified badge",
      "Ad-free experience",
    ],
    cta: "Upgrade to Premium",
  },
  {
    name: "Premium Plus",
    price: "$19.99",
    period: "/month",
    description: "VIP experience",
    features: [
      "Everything in Premium",
      "Rewind feature",
      "Boost profile",
      "Monthly spotlight",
      "Priority support",
      "Travel mode",
    ],
    cta: "Upgrade to Premium Plus",
  },
]

export default function PremiumPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async (planName: string) => {
    setLoading(true)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: planName.toLowerCase(),
        }),
      })

      const { url } = await response.json()

      if (url) {
        router.push(url)
      }
    } catch (err) {
      console.error("[v0] Checkout error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Upgrade Your Experience</h1>
          <p className="text-xl text-muted-foreground">Choose the perfect plan for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.current ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check size={20} className="text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.current ? (
                  <Button disabled className="w-full">
                    Current Plan
                  </Button>
                ) : (
                  <Button onClick={() => handleUpgrade(plan.name)} disabled={loading} className="w-full" size="lg">
                    {loading ? "Processing..." : plan.cta}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

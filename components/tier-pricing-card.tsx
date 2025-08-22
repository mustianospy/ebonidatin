"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Tier {
  name: string
  price: number
  duration: string
  features: string[]
  color: string
  popular: boolean
}

interface TierPricingCardProps {
  tier: Tier
  currentTier: string
  userId: string
}

export function TierPricingCard({ tier, currentTier, userId }: TierPricingCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const isCurrentTier = currentTier === tier.name
  const isDowngrade = getTierLevel(currentTier) > getTierLevel(tier.name)

  function getTierLevel(tierName: string): number {
    const levels = { Starter: 0, Advanced: 1, Premium: 2, Silver: 3, Gold: 4 }
    return levels[tierName as keyof typeof levels] || 0
  }

  const handleUpgrade = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/payments/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: tier.name,
          amount: tier.price * 100, // Convert to cents
          userId,
        }),
      })

      if (response.ok) {
        const { paymentUrl } = await response.json()
        window.location.href = paymentUrl
      }
    } catch (error) {
      console.error("Payment error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all hover:shadow-lg",
        tier.popular && "border-2 border-purple-500 scale-105",
        isCurrentTier && "ring-2 ring-green-500",
      )}
    >
      {tier.popular && (
        <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500">Most Popular</Badge>
      )}
      {isCurrentTier && <Badge className="absolute top-4 left-4 bg-green-500">Current Plan</Badge>}

      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
        <div className="text-3xl font-bold">
          <span className={cn("bg-gradient-to-r bg-clip-text text-transparent", tier.color)}>${tier.price}</span>
          <span className="text-lg text-gray-500">/{tier.duration}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={handleUpgrade}
          disabled={isLoading || isCurrentTier}
          className={cn(
            "w-full",
            tier.popular && "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
            isCurrentTier && "bg-green-500 hover:bg-green-600",
            isDowngrade && "bg-gray-400 hover:bg-gray-500",
          )}
        >
          {isLoading
            ? "Processing..."
            : isCurrentTier
              ? "Current Plan"
              : isDowngrade
                ? "Downgrade"
                : `Upgrade to ${tier.name}`}
        </Button>
      </CardContent>
    </Card>
  )
}

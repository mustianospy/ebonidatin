import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TierBadgeProps {
  tier: string
  size?: "sm" | "default"
}

export function TierBadge({ tier, size = "default" }: TierBadgeProps) {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Gold":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case "Silver":
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
      case "Premium":
        return "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
      case "Advanced":
        return "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
      case "Starter":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return <Badge className={cn(getTierColor(tier), size === "sm" && "text-xs px-2 py-1")}>{tier}</Badge>
}

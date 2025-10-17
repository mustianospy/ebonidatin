import { CheckCircle2 } from "lucide-react"

interface VerifiedBadgeProps {
  verified: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function VerifiedBadge({ verified, size = "md", className = "" }: VerifiedBadgeProps) {
  if (!verified) return null

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <CheckCircle2 className={`${sizeClasses[size]} text-blue-500 fill-blue-500`} />
      <span className="text-xs font-semibold text-blue-600">Verified</span>
    </div>
  )
}

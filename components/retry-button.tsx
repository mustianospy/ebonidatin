"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface RetryButtonProps {
  onRetry: () => Promise<void>
  children?: React.ReactNode
}

export function RetryButton({ onRetry, children = "Retry" }: RetryButtonProps) {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = async () => {
    setIsRetrying(true)
    try {
      await onRetry()
    } finally {
      setIsRetrying(false)
    }
  }

  return (
    <Button onClick={handleRetry} disabled={isRetrying} variant="outline">
      <RotateCcw className="mr-2 h-4 w-4" />
      {isRetrying ? "Retrying..." : children}
    </Button>
  )
}

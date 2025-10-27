"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { OnboardingGuard } from "@/components/onboarding-guard"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, User, LogOut, Menu, X } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/dashboard/discover", label: "Discover", icon: Heart },
    { href: "/dashboard/matches", label: "Matches", icon: Heart },
    { href: "/dashboard/messages", label: "Messages", icon: MessageCircle },
    { href: "/dashboard/profile", label: "Profile", icon: User },
  ]

  return (
    <OnboardingGuard>
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* Mobile Header */}
        <div className="md:hidden border-b border-border bg-card">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold">Ebonidatin</h1>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } md:block w-full md:w-64 border-r border-border bg-card md:min-h-screen`}
        >
          <div className="hidden md:block p-6">
            <h1 className="text-2xl font-bold">Ebonidatin</h1>
          </div>

          <nav className="space-y-2 p-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </nav>

          <div className="absolute bottom-4 left-4 right-4 md:relative md:mt-auto md:p-4">
            <Link href="/auth/logout">
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <LogOut size={20} />
                Sign Out
              </Button>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </OnboardingGuard>
  )
}

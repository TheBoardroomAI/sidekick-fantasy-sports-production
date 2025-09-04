"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, DollarSign, Users, MessageSquare, Trophy, BarChart3, Settings, LogOut, FileText } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  // Mock user state - in real app this would come from auth context
  const isAuthenticated = pathname !== "/" && pathname !== "/pricing" && !pathname.startsWith("/auth")
  const userTier = "pro" // 'rookie', 'pro', 'champion'

  const navItems = [
    { href: "/", label: "Home", icon: Home, public: true },
    { href: "/pricing", label: "Pricing", icon: DollarSign, public: true },
    { href: "/select-sidekick", label: "Select SideKick", icon: Users, auth: true },
    { href: "/dashboard", label: "SideKick Central", icon: MessageSquare, auth: true },
    { href: "/draft", label: "Draft Center", icon: Trophy, auth: true, tier: ["pro", "champion"] },
    { href: "/draft-results", label: "Draft Results", icon: FileText, auth: true, tier: ["pro", "champion"] },
    { href: "/rankings", label: "Rankings", icon: BarChart3, auth: true },
    { href: "/league", label: "League", icon: Settings, auth: true },
  ]

  const filteredNavItems = navItems.filter((item) => {
    if (item.public) return true
    if (item.auth && !isAuthenticated) return false
    if (item.tier && !item.tier.includes(userTier)) return false
    return true
  })

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/sidekick-logo.png"
              alt="SideKick Fantasy Football"
              width={240}
              height={80}
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {filteredNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}

            {isAuthenticated && (
              <Button variant="ghost" size="sm" className="ml-4">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Hidden by default, would toggle with state */}
      <div className="md:hidden border-t border-border">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {filteredNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

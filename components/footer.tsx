import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/sidekick-logo.png"
                alt="SideKick Fantasy Football"
                width={240}
                height={80}
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-subheading text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Features - COMMENTED OUT FOR CLEAN DEPLOYMENT */}
          {/*
          <div>
            <h3 className="font-subheading text-foreground mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  SideKick Central
                </Link>
              </li>
              <li>
                <Link href="/draft" className="text-muted-foreground hover:text-foreground transition-colors">
                  Draft Center
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="text-muted-foreground hover:text-foreground transition-colors">
                  Rankings
                </Link>
              </li>
              <li>
                <Link href="/league" className="text-muted-foreground hover:text-foreground transition-colors">
                  League Management
                </Link>
              </li>
            </ul>
          </div>
          */}
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <div className="mb-4 space-x-6">
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Privacy Policy
            </Link>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 SideKick Fantasy Football. Dominate Responsibly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

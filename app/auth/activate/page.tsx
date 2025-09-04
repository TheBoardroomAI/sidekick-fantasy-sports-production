import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Zap, Trophy } from "lucide-react"

// This would normally get the token from URL params and validate it
export default function ActivateAccountPage() {
  // Mock data - would come from URL params and API
  const userTier = "Pro" // Could be "Rookie", "Pro", or "Champion"
  const isValidToken = true

  const tierConfig = {
    Rookie: {
      icon: <Star className="h-8 w-8 text-sidekick-success-green" />,
      color: "text-sidekick-success-green",
      bgColor: "bg-sidekick-success-green/10",
      features: ["2 SideKick Personas", "Basic lineup optimization", "Weekly suggestions"],
    },
    Pro: {
      icon: <Zap className="h-8 w-8 text-sidekick-authority-blue" />,
      color: "text-sidekick-authority-blue",
      bgColor: "bg-sidekick-authority-blue/10",
      features: ["All 5 SideKick Personas", "Draft Command Center", "Advanced optimization"],
    },
    Champion: {
      icon: <Trophy className="h-8 w-8 text-sidekick-action-orange" />,
      color: "text-sidekick-action-orange",
      bgColor: "bg-sidekick-action-orange/10",
      features: ["Everything in Pro", "Advanced Analytics", "Priority support"],
    },
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="font-headline text-xl text-destructive">Invalid Activation Link</CardTitle>
            <CardDescription className="font-body">
              This activation link is invalid or has already been used.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/auth/signin">Go to Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="border-border">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <Image
                src="/images/sidekick-logo.png"
                alt="SideKick Fantasy Football"
                width={200}
                height={100}
                className="h-16 w-auto"
              />
            </div>
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-sidekick-success-green" />
            </div>
            <CardTitle className="font-headline text-2xl">Account Activated!</CardTitle>
            <CardDescription className="font-body">
              Welcome to SideKick Fantasy Football. Your account has been successfully activated.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Tier Information */}
            <div className={`p-4 rounded-lg ${tierConfig[userTier].bgColor}`}>
              <div className="flex items-center gap-3 mb-3">
                {tierConfig[userTier].icon}
                <div>
                  <h3 className="font-subheading text-lg">
                    <Badge variant="secondary" className="mr-2">
                      {userTier}
                    </Badge>
                    Plan Activated
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    You now have access to all {userTier} features
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {tierConfig[userTier].features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-sidekick-success-green" />
                    <span className="font-body text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
              <h3 className="font-subheading text-lg">Next Steps:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-sidekick-authority-blue text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-subheading text-sm">Choose Your SideKick</p>
                    <p className="font-body text-xs text-muted-foreground">Select your AI fantasy coach persona</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-sidekick-success-green text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-subheading text-sm">Set Up Your League</p>
                    <p className="font-body text-xs text-muted-foreground">Import your league settings and roster</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-sidekick-action-orange text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-subheading text-sm">Start Dominating</p>
                    <p className="font-body text-xs text-muted-foreground">
                      Get personalized advice and win your league
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              asChild
              className="w-full bg-sidekick-authority-blue hover:bg-sidekick-authority-blue/90 font-subheading"
            >
              <Link href="/auth/signup">Get Started</Link>
            </Button>

            <div className="text-center">
              <p className="font-body text-xs text-muted-foreground">
                Need help?{" "}
                <Link href="/support" className="text-sidekick-authority-blue hover:underline">
                  Contact Support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

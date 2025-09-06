"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const pricingTiers = [
  {
    name: "ROOKIE",
    monthlyPrice: 7.25,
    seasonPrice: 21,
    seasonOriginalPrice: 26,
    features: [
      "2 SideKick Personas (Rookie & Mentor)",
      "Basic lineup optimization",
      "Weekly waiver wire suggestions",
      "Injury alerts & updates",
      "Basic trade recommendations",
    ],
    limitations: ["No Draft Command Center access", "Limited to 2 personas"],
    popular: false,
  },
  {
    name: "PRO",
    monthlyPrice: 12.5,
    seasonPrice: 36,
    seasonOriginalPrice: 45,
    features: [
      "All 5 SideKick Personas",
      "Full Draft Command Center access",
      "Advanced lineup optimization",
      "Real-time draft assistance",
      "Deep trade analysis",
      "Matchup-specific strategies",
      "Voice & text conversations",
    ],
    limitations: [],
    popular: true,
  },
  {
    name: "CHAMPION",
    monthlyPrice: null,
    seasonPrice: null,
    lifetimePrice: 198,
    features: [
      "Everything in Pro",
      "Advanced Analytics Dashboard",
      "EPA & YPRR metrics",
      "Strength of Schedule analysis",
      "Vegas line movement tracking",
      "Weather-adjusted projections",
      "Breakout probability scores",
      "Priority customer support",
    ],
    limitations: [],
    popular: false,
  },
]

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "season">("season")
  const [selectedTier, setSelectedTier] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="font-headline text-4xl md:text-6xl mb-6 text-foreground">Secure Your Advantage</h1>

          {/* Launch Year Special Banner */}
          <div className="inline-flex items-center bg-gradient-red-orange text-white px-6 py-2 rounded-full mb-8">
            <span className="text-sm font-medium">⚡ LAUNCH YEAR SPECIAL: SEASON PASS 25% OFF ⚡</span>
          </div>

          {/* Billing Toggle */}
          <div className="mb-12">
            <div className="inline-flex items-center bg-muted rounded-full p-1">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-6 py-2 rounded-full font-subheading text-sm transition-all ${
                  billingPeriod === "monthly"
                    ? "bg-gradient-blue-green text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("season")}
                className={`px-6 py-2 rounded-full font-subheading text-sm transition-all ${
                  billingPeriod === "season"
                    ? "bg-gradient-green-blue text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Season
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto mb-12 md:grid md:grid-cols-3">
          {pricingTiers
            .filter((tier) => billingPeriod === "season" || tier.name !== "CHAMPION")
            .map((tier, index) => (
              <Card
                key={tier.name}
                onClick={() => setSelectedTier(tier.name)}
                className={`relative bg-card border-2 cursor-pointer transition-all duration-300 ${
                  selectedTier === tier.name
                    ? "border-blue-500 bg-blue-500/10 scale-105 shadow-lg"
                    : tier.popular
                      ? "border-sidekick-authority-blue bg-gradient-to-b from-blue-900/20 to-blue-800/10"
                      : "border-muted hover:border-blue-300"
                }`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-sidekick-action-orange text-white font-subheading">
                    MOST POPULAR
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="font-headline text-xl text-foreground">{tier.name}</CardTitle>

                  {/* Pricing Display */}
                  <div className="text-center py-4">
                    {tier.lifetimePrice ? (
                      <div>
                        <div className="font-headline text-4xl text-sidekick-success-green">${tier.lifetimePrice}</div>
                        <div className="font-body text-sm text-muted-foreground">Lifetime</div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {billingPeriod === "monthly" ? (
                          <>
                            <div className="font-headline text-4xl text-sidekick-success-green">
                              ${tier.monthlyPrice}
                            </div>
                            <div className="font-body text-sm text-muted-foreground">/mo</div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center justify-center gap-2">
                              <span className="font-headline text-2xl text-muted-foreground line-through">
                                ${tier.seasonOriginalPrice}
                              </span>
                              <span className="font-headline text-4xl text-sidekick-success-green">
                                ${tier.seasonPrice}
                              </span>
                            </div>
                            <div className="font-body text-sm text-muted-foreground">/season</div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Features */}
                  <div className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-sidekick-success-green mt-0.5 flex-shrink-0" />
                        <span className="font-body text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {tier.limitations.length > 0 && (
                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="font-body text-xs text-muted-foreground uppercase tracking-wide">LIMITATIONS</div>
                      {tier.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="flex items-start gap-3">
                          <div className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground">×</div>
                          <span className="font-body text-sm text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>

                <CardFooter className="pt-6">
                  <Button variant="gradient-green-blue" className="w-full text-white font-subheading">
                    Reserve Your Spot
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>

        <div className="text-center mb-8">
          <p className="font-body text-2xl font-bold rolling-light-text">
            29 MILLION FANTASY FOOTBALL PLAYERS. BE THE 1% WITH THE AI SIDEKICK ADVANTAGE.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl text-center mb-12 text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "Can I upgrade or downgrade my plan?",
                answer:
                  "Yes! You can upgrade anytime and get immediate access to new features. Downgrades take effect at your next billing cycle.",
              },
              {
                question: "What happens if I cancel mid-season?",
                answer:
                  "You'll retain access to your current plan until the end of your billing period. No refunds for partial periods.",
              },
              {
                question: "Do you offer team or league discounts?",
                answer: "Yes! Contact us for group pricing if you're purchasing for 5+ people in your league.",
              },
              {
                question: "Is my payment information secure?",
                answer:
                  "Absolutely. We use Stripe for secure payment processing and never store your payment details on our servers.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="font-subheading text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-body text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

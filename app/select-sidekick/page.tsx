"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Volume2, Lock, X } from "lucide-react"

// Mock user tier - would come from auth context
const userTier = "Rookie" // "Rookie", "Pro", or "Champion"

const sidekicks = [
  {
    id: "rookie",
    name: "The Rookie",
    tagline: "Energy over logic. Stars win games!",
    description:
      "Your enthusiastic fantasy buddy who loves the big names and exciting plays. Perfect for beginners who want to have fun and learn the ropes.",
    avatar: "/images/avatars/rookie-avatar.png",
    accentColor: "text-sidekick-success-green",
    borderColor: "border-sidekick-success-green/30",
    bgColor: "bg-sidekick-success-green/5",
    buttonColor: "gradient-green-blue",
    availableFor: ["Rookie", "Pro", "Champion"],
    philosophy: "Hype over numbers. Stars win games.",
    sampleQuote: "Mahomes, duh! He's the GOAT. You'll feel like a genius when he drops 4 TDs!",
  },
  {
    id: "mentor",
    name: "The Mentor",
    tagline: "Consistency wins championships.",
    description:
      "Your patient teacher who focuses on steady, reliable strategies. Explains everything clearly and helps you build a solid foundation.",
    avatar: "/images/avatars/mentor-avatar.png",
    accentColor: "text-green-400",
    borderColor: "border-green-400/30",
    bgColor: "bg-green-400/5",
    buttonColor: "gradient-green-blue",
    availableFor: ["Rookie", "Pro", "Champion"],
    philosophy: "Foundation first. Steady wins seasons.",
    sampleQuote: "Start the steady starter. His snap-stable role gives you the safest path to points.",
  },
  {
    id: "analyst",
    name: "The Analyst",
    tagline: "Fantasy is math. Trust the data.",
    description:
      "Your numbers guru who breaks down every stat and metric. Perfect for data-driven managers who want evidence-based recommendations.",
    avatar: "/images/avatars/analyst-avatar.png",
    accentColor: "text-sidekick-authority-blue",
    borderColor: "border-sidekick-authority-blue/30",
    bgColor: "bg-sidekick-authority-blue/5",
    buttonColor: "gradient-blue-green",
    availableFor: ["Pro", "Champion"],
    philosophy: "Evidence beats vibes. Numbers don't lie",
    sampleQuote:
      "Start Player A. Higher median (18.2 vs 15.4), better CPOE matchup, and opponent pressure rate is below league average.",
  },
  {
    id: "oracle",
    name: "The Oracle",
    tagline: "Sees the future through trends and signs.",
    description:
      "Your mystical advisor who reads between the lines and spots trends others miss. Frames probability as destiny with cryptic wisdom.",
    avatar: "/images/avatars/oracle-avatar.webp",
    accentColor: "text-sidekick-success-green",
    borderColor: "border-sidekick-success-green/30",
    bgColor: "bg-sidekick-success-green/5",
    buttonColor: "gradient-green-blue",
    availableFor: ["Pro", "Champion"],
    philosophy: "Trends reveal truth. Fate guides fantasy.",
    sampleQuote:
      "Choose the overlooked arm. The market's line shifts and a softened schedule foretell his rise by Sunday night.",
  },
  {
    id: "rebel",
    name: "The Rebel",
    tagline: "Win big or don't bother.",
    description:
      "Your risk-taking maverick who swings for the fences. Perfect for managers who want to make bold moves and chase upside.",
    avatar: "/images/avatars/rebel-avatar.png",
    accentColor: "text-sidekick-action-orange",
    borderColor: "border-sidekick-action-orange/30",
    bgColor: "bg-sidekick-action-orange/5",
    buttonColor: "bg-sidekick-action-orange hover:bg-sidekick-action-orange/90",
    availableFor: ["Pro", "Champion"],
    philosophy: "Embrace volatility. Safe picks finish fourth.",
    sampleQuote:
      "Roll the bomber. He's chucking deep and the weather won't kill the go routes. Go for the 30-point pop.",
  },
]

export default function SelectSidekickPage() {
  const [selectedSidekick, setSelectedSidekick] = useState<string | null>(null)
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const availableSidekicks = sidekicks.filter((sidekick) => sidekick.availableFor.includes(userTier))
  const lockedSidekicks = sidekicks.filter((sidekick) => !sidekick.availableFor.includes(userTier))

  const handleSelectSidekick = (sidekickId: string) => {
    const sidekick = sidekicks.find((s) => s.id === sidekickId)
    if (sidekick && !sidekick.availableFor.includes(userTier)) {
      setShowUpgradeModal(true)
      return
    }
    setSelectedSidekick(sidekickId)
  }

  const handlePlaySample = (sidekickId: string) => {
    // Mock audio playback
    setPlayingAudio(sidekickId)
    setTimeout(() => setPlayingAudio(null), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl mb-4 text-foreground">Choose Your SideKick</h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Each SideKick has a unique personality and approach to fantasy football. Select the one that matches your
            style and let them guide you to victory.
          </p>
          <Badge variant="secondary" className="font-subheading">
            {userTier} Plan - {availableSidekicks.length} SideKicks Available (No Voice Features)
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {sidekicks.map((sidekick) => {
            const isLocked = !sidekick.availableFor.includes(userTier)
            return (
              <Card
                key={sidekick.id}
                className={`relative transition-all duration-300 cursor-pointer ${sidekick.borderColor} ${
                  selectedSidekick === sidekick.id
                    ? "ring-2 ring-offset-2 ring-offset-background"
                    : "hover:scale-[1.02]"
                } ${selectedSidekick === sidekick.id ? `ring-current ${sidekick.accentColor}` : ""} ${
                  isLocked ? "opacity-75" : ""
                }`}
                onClick={() => handleSelectSidekick(sidekick.id)}
              >
                {isLocked && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Image
                        src={sidekick.avatar || "/placeholder.svg"}
                        alt={sidekick.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      {selectedSidekick === sidekick.id && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-sidekick-success-green rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="font-headline text-xl">{sidekick.name}</CardTitle>
                      </div>
                      <CardDescription className="font-body text-sm mb-2">{sidekick.tagline}</CardDescription>
                      <p className="font-body text-sm text-muted-foreground">{sidekick.description}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Philosophy */}
                  <div className={`p-3 rounded-lg ${sidekick.bgColor}`}>
                    <div className="font-subheading text-sm mb-1">Philosophy</div>
                    <div className="font-body text-sm text-muted-foreground">{sidekick.philosophy}</div>
                  </div>

                  {/* Sample Quote */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-subheading text-sm">Sample Response</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePlaySample(sidekick.id)
                        }}
                        className="h-8 w-8 p-0"
                      >
                        {playingAudio === sidekick.id ? (
                          <Volume2 className="h-4 w-4 text-sidekick-success-green" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="font-body text-sm text-muted-foreground italic border-l-2 border-border pl-3">
                      "{sidekick.sampleQuote}"
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Continue Button */}
        {selectedSidekick && (
          <div className="text-center">
            <Button
              asChild
              variant={availableSidekicks.find((s) => s.id === selectedSidekick)?.buttonColor as any}
              className="font-subheading px-8 py-3 text-white"
            >
              <Link href={`/dashboard?sidekick=${selectedSidekick}`}>
                Continue with {availableSidekicks.find((s) => s.id === selectedSidekick)?.name}
              </Link>
            </Button>
          </div>
        )}

        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-lg p-6 max-w-md w-full mx-4 relative">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-muted-foreground" />
                </div>

                <h3 className="font-headline text-xl mb-2">Pro Plan Required</h3>
                <p className="font-body text-muted-foreground mb-6">
                  Upgrade to Pro to unlock all SideKicks and get the full fantasy football experience.
                </p>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowUpgradeModal(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button asChild className="flex-1 gradient-blue-green text-white">
                    <Link href="/pricing">Upgrade Here</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

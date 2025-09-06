import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Trophy, BarChart3, Users, Zap, Shield } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: MessageSquare,
      title: "AI Fantasy Co-Pilot",
      description: "Chat with 5 unique AI personas, each with their own expertise and personality",
    },
    {
      icon: Trophy,
      title: "Draft Command Center",
      description: "Professional draft room with real-time rankings, queue management, and AI insights",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep statistical analysis with predictive metrics and matchup projections",
    },
    {
      icon: Users,
      title: "League Management",
      description: "Import and manage your league settings, rosters, and scoring systems",
    },
    {
      icon: Zap,
      title: "Lineup Optimizer",
      description: "Weekly lineup recommendations with detailed rationale from your chosen AI",
    },
    {
      icon: Shield,
      title: "Research Alerts",
      description: "Proactive injury updates, trade opportunities, and waiver wire suggestions",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-8">
            <Image
              src="/images/sidekick-logo.png"
              alt="SideKick Fantasy Football"
              width={400}
              height={200}
              className="mx-auto"
            />
          </div>

          <h1 className="font-headline text-4xl md:text-6xl mb-6 text-foreground">Your Fantasy Co-Pilot</h1>

          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
            Stop researching, Start winning.
            <br />
            Ask questions. Get answers. Dominate your league.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-subheading px-8 py-3 rounded-lg transition-colors"
            >
              <Link href="/auth/signup">Get Started</Link>
            </Button>
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-subheading px-8 py-3 rounded-lg transition-colors"
            >
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </div>

          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl mb-8 text-foreground">Meet Your AI SideKicks</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { name: "The Oracle", image: "/images/avatars/oracle-avatar.webp", color: "text-green-400" },
                { name: "The Rebel", image: "/images/avatars/rebel-avatar.png", color: "text-orange-400" },
                { name: "The Mentor", image: "/images/avatars/mentor-avatar.png", color: "text-green-500" },
                { name: "The Analyst", image: "/images/avatars/analyst-avatar.png", color: "text-blue-400" },
                { name: "The Rookie", image: "/images/avatars/rookie-avatar.png", color: "text-orange-500" },
              ].map((persona, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-border">
                    <Image
                      src={persona.image || "/placeholder.svg"}
                      alt={persona.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className={`font-subheading text-sm ${persona.color}`}>{persona.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-headline text-xl mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

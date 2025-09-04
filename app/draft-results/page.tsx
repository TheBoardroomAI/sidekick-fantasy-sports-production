"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Users, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function DraftResultsPage() {
  // Mock draft results data
  const draftResults = [
    {
      id: 1,
      leagueName: "Championship League",
      draftDate: "2024-08-20",
      draftTime: "7:00 PM EST",
      participants: 12,
      myPosition: 3,
      status: "completed",
      myTeam: [
        { round: 1, pick: 3, player: "Christian McCaffrey", position: "RB", team: "SF" },
        { round: 2, pick: 22, player: "Davante Adams", position: "WR", team: "LV" },
        { round: 3, pick: 27, player: "Travis Kelce", position: "TE", team: "KC" },
        { round: 4, pick: 46, player: "Josh Allen", position: "QB", team: "BUF" },
        { round: 5, pick: 51, player: "Saquon Barkley", position: "RB", team: "PHI" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/draft">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Draft Center
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Draft Results</h1>
              <p className="text-muted-foreground">Review your completed draft summaries</p>
            </div>
          </div>
        </div>

        {/* Draft Results List */}
        <div className="space-y-6">
          {draftResults.map((draft) => (
            <Card key={draft.id} className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Trophy className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle className="text-xl">{draft.leagueName}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{draft.draftDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{draft.draftTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{draft.participants} teams</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Draft Position: {draft.myPosition}</Badge>
                    <Badge variant="default" className="bg-success text-success-foreground">
                      {draft.status === "completed" ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-semibold mb-3">My Draft Picks</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {draft.myTeam.map((pick, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium">{pick.player}</div>
                          <div className="text-sm text-yellow-400">
                            {pick.position} - {pick.team}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">R{pick.round}</div>
                          <div className="text-xs text-yellow-400">#{pick.pick}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <Button variant="outline" size="sm">
                    View Full Draft Board
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {draftResults.length === 0 && (
          <Card className="border-border">
            <CardContent className="text-center py-12">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Draft Results Yet</h3>
              <p className="text-muted-foreground mb-4">Complete your first draft to see results here.</p>
              <Link href="/draft">
                <Button>Start a Draft</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

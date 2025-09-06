"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, RefreshCw, ChevronUp, ChevronDown } from "lucide-react"

// Mock user tier - would come from auth context
const userTier = "" // "Rookie", "Pro", or "Champion"

type SortField =
  | "rank"
  | "player"
  | "position"
  | "team"
  | "projectedPoints"
  | "floor"
  | "ceiling"
  | "snapCount"
  | "usage"
  | "yprr"
  | "expectedFP"
type SortDirection = "asc" | "desc"

const mockRankings: any[] = []

export default function RankingsPage() {
  const [selectedWeek, setSelectedWeek] = useState("draft")
  const [selectedScoring, setSelectedScoring] = useState("ppr")
  const [selectedPosition, setSelectedPosition] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [sortField, setSortField] = useState<SortField>("rank")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const handleGetRankings = () => {
    // Would fetch new rankings based on selections
    console.log("Fetching rankings for:", { selectedWeek, selectedScoring, selectedPosition })
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getPositionLimit = (position: string) => {
    if (position === "all") return 250
    if (["RB", "WR", "TE", "IDP"].includes(position)) return 50
    if (["QB", "K", "DEF"].includes(position)) return 32
    return 250
  }

  const filteredRankings = mockRankings
    .filter((player) => {
      const matchesSearch =
        player.player.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.team.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPosition = selectedPosition === "all" || player.position === selectedPosition
      return matchesSearch && matchesPosition
    })
    .sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortField) {
        case "rank":
          aValue = a.rank
          bValue = b.rank
          break
        case "player":
          aValue = a.player
          bValue = b.player
          break
        case "position":
          aValue = a.position
          bValue = b.position
          break
        case "team":
          aValue = a.team
          bValue = b.team
          break
        case "projectedPoints":
          aValue = a.projectedPoints
          bValue = b.projectedPoints
          break
        case "floor":
          aValue = a.floor
          bValue = b.floor
          break
        case "ceiling":
          aValue = a.ceiling
          bValue = b.ceiling
          break
        case "snapCount":
          aValue = a.advancedMetrics.snapCount
          bValue = b.advancedMetrics.snapCount
          break
        case "usage":
          aValue =
            a.position === "QB"
              ? a.advancedMetrics.passingEPA
              : a.position === "RB"
                ? a.advancedMetrics.touchShare
                : a.advancedMetrics.targetShare
          bValue =
            b.position === "QB"
              ? b.advancedMetrics.passingEPA
              : b.position === "RB"
                ? b.advancedMetrics.touchShare
                : b.advancedMetrics.targetShare
          break
        case "yprr":
          aValue = a.advancedMetrics.yprr || 0
          bValue = b.advancedMetrics.yprr || 0
          break
        case "expectedFP":
          aValue = a.advancedMetrics.expectedFP
          bValue = b.advancedMetrics.expectedFP
          break
        default:
          aValue = a.rank
          bValue = b.rank
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    })
    .slice(0, getPositionLimit(selectedPosition)) // Apply position-specific limits

  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? (
      <ChevronUp className="h-3 w-3 inline ml-1" />
    ) : (
      <ChevronDown className="h-3 w-3 inline ml-1" />
    )
  }

  const getPositionColor = (position: string) => {
    switch (position) {
      case "QB":
        return "bg-red-500/40 text-red-900 border-red-500/20"
      case "RB":
        return "bg-green-500/40 text-green-900 border-green-500/20"
      case "WR":
        return "bg-blue-500/40 text-blue-900 border-blue-500/20"
      case "TE":
        return "bg-purple-500/40 text-purple-900 border-purple-500/20"
      case "DEF":
        return "bg-orange-500/40 text-orange-900 border-orange-500/20"
      case "K":
        return "bg-yellow-500/40 text-yellow-900 border-yellow-500/20"
      case "IDP":
        return "bg-cyan-500/40 text-cyan-900 border-cyan-500/20"
      default:
        return "bg-gray-500/40 text-gray-900 border-gray-500/20"
    }
  }

  const getMatchupColor = (rating: string) => {
    if (rating.includes("A")) return "text-sidekick-success-green"
    if (rating.includes("B")) return "text-sidekick-authority-blue"
    return "text-sidekick-action-orange"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="font-headline text-xl">SideKick Rankings</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={handleGetRankings} size="sm" variant="gradient-blue-green">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Controls */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="font-subheading text-lg">Ranking Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <label className="font-subheading text-sm">Week</label>
                <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                  <SelectTrigger className="font-body">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    {Array.from({ length: 18 }, (_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>
                        Week {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="font-subheading text-sm">Scoring System</label>
                <Select value={selectedScoring} onValueChange={setSelectedScoring}>
                  <SelectTrigger className="font-body">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ppr">PPR</SelectItem>
                    <SelectItem value="half-ppr">Half PPR</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="superflex">Superflex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="font-subheading text-sm">Position</label>
                <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                  <SelectTrigger className="font-body">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Positions</SelectItem>
                    <SelectItem value="QB">Quarterback</SelectItem>
                    <SelectItem value="RB">Running Back</SelectItem>
                    <SelectItem value="WR">Wide Receiver</SelectItem>
                    <SelectItem value="TE">Tight End</SelectItem>
                    <SelectItem value="DEF">Team Defense</SelectItem>
                    <SelectItem value="K">Kickers</SelectItem>
                    <SelectItem value="IDP">Defensive Player</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="font-subheading text-sm">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search players..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 font-body"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button onClick={handleGetRankings} variant="gradient-green-blue" className="font-subheading">
                Get Rankings
              </Button>

              {userTier === "Champion" && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="bg-transparent font-subheading"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {showAdvanced ? "Hide" : "Show"} Advanced Metrics
                  </Button>
                  <Badge
                    variant="secondary"
                    className="bg-sidekick-action-orange/30 text-orange-800 border-sidekick-action-orange/20"
                  >
                    Champion Feature
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Rankings Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="font-headline text-xl">
                {selectedWeek === "draft" ? "Draft" : `Week ${selectedWeek}`} Rankings - {selectedScoring.toUpperCase()}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            {filteredRankings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground font-body">
                  No rankings data available. Click "Get Rankings" to fetch data from the backend.
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Header */}
                <div
                  className={`grid gap-2 text-xs font-subheading text-muted-foreground border-b border-border pb-2 sticky top-0 bg-card z-10 ${
                    showAdvanced ? "grid-cols-12" : "grid-cols-8"
                  }`}
                >
                  <div className="col-span-1">
                    <button
                      onClick={() => handleSort("rank")}
                      className="hover:text-foreground transition-colors flex items-center"
                    >
                      Rank
                      <SortIndicator field="rank" />
                    </button>
                  </div>
                  <div className="col-span-2">
                    <button
                      onClick={() => handleSort("player")}
                      className="hover:text-foreground transition-colors flex items-center"
                    >
                      Player
                      <SortIndicator field="player" />
                    </button>
                  </div>
                  <div className="col-span-1">
                    <button
                      onClick={() => handleSort("position")}
                      className="hover:text-foreground transition-colors flex items-center"
                    >
                      Pos
                      <SortIndicator field="position" />
                    </button>
                  </div>
                  <div className="col-span-1">
                    <button
                      onClick={() => handleSort("team")}
                      className="hover:text-foreground transition-colors flex items-center"
                    >
                      Team
                      <SortIndicator field="team" />
                    </button>
                  </div>
                  <div className="col-span-1">
                    <button
                      onClick={() => handleSort("projectedPoints")}
                      className="hover:text-foreground transition-colors flex items-center"
                    >
                      Proj
                      <SortIndicator field="projectedPoints" />
                    </button>
                  </div>
                  <div className="col-span-1">
                    <button
                      onClick={() => handleSort("floor")}
                      className="hover:text-foreground transition-colors flex items-center"
                    >
                      Floor
                      <SortIndicator field="floor" />
                    </button>
                  </div>
                  <div className="col-span-1">
                    <button
                      onClick={() => handleSort("ceiling")}
                      className="hover:text-foreground transition-colors flex items-center"
                    >
                      Ceiling
                      <SortIndicator field="ceiling" />
                    </button>
                  </div>
                  {showAdvanced && (
                    <>
                      <div className="col-span-1">
                        <button
                          onClick={() => handleSort("snapCount")}
                          className="hover:text-foreground transition-colors flex items-center"
                        >
                          Snap%
                          <SortIndicator field="snapCount" />
                        </button>
                      </div>
                      <div className="col-span-1">
                        <button
                          onClick={() => handleSort("usage")}
                          className="hover:text-foreground transition-colors flex items-center"
                        >
                          Usage
                          <SortIndicator field="usage" />
                        </button>
                      </div>
                      <div className="col-span-1">
                        <button
                          onClick={() => handleSort("yprr")}
                          className="hover:text-foreground transition-colors flex items-center"
                        >
                          YPRR
                          <SortIndicator field="yprr" />
                        </button>
                      </div>
                      <div className="col-span-1">
                        <button
                          onClick={() => handleSort("expectedFP")}
                          className="hover:text-foreground transition-colors flex items-center"
                        >
                          xFP
                          <SortIndicator field="expectedFP" />
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Player Rows */}
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredRankings.map((player) => (
                    <div
                      key={player.rank}
                      className={`grid gap-2 items-center py-3 hover:bg-muted/50 rounded transition-colors border-l-2 ${
                        player.tier === "Elite" ? "border-sidekick-success-green" : "border-transparent"
                      } ${showAdvanced ? "grid-cols-12" : "grid-cols-8"}`}
                    >
                      <div className="col-span-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs font-bold">
                            {player.rank}
                          </Badge>
                          {player.tier === "Elite" && (
                            <div className="w-2 h-2 bg-sidekick-success-green rounded-full" />
                          )}
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="font-subheading text-sm">{player.player}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {player.tier}
                          </Badge>
                          <span className={`text-xs font-body ${getMatchupColor(player.matchupRating)}`}>
                            {player.matchupRating}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-1">
                        <Badge className={`text-xs border ${getPositionColor(player.position)}`}>
                          {player.position}
                        </Badge>
                      </div>

                      <div className="col-span-1 font-body text-sm font-semibold">{player.team}</div>

                      <div className="col-span-1 font-body text-sm font-bold text-sidekick-authority-blue">
                        {player.projectedPoints}
                      </div>

                      <div className="col-span-1 font-body text-xs text-muted-foreground">{player.floor}</div>

                      <div className="col-span-1 font-body text-xs text-muted-foreground">{player.ceiling}</div>

                      {showAdvanced && (
                        <>
                          <div className="col-span-1 font-body text-xs">{player.advancedMetrics.snapCount}%</div>
                          <div className="col-span-1 font-body text-xs">
                            {player.position === "QB"
                              ? `${player.advancedMetrics.passingEPA}`
                              : player.position === "RB"
                                ? `${player.advancedMetrics.touchShare}%`
                                : `${player.advancedMetrics.targetShare}%`}
                          </div>
                          <div className="col-span-1 font-body text-xs">
                            {player.position !== "QB" ? player.advancedMetrics.yprr : "N/A"}
                          </div>
                          <div className="col-span-1 font-body text-xs text-sidekick-success-green">
                            {player.advancedMetrics.expectedFP}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

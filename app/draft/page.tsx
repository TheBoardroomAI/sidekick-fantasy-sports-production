"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Mic,
  MicOff,
  Camera,
  Search,
  Star,
  StarOff,
  MessageCircle,
  TrendingUp,
  Users,
  AlertTriangle,
  Send,
  History,
} from "lucide-react"

// Mock data
const mockPlayers = [
  {
    id: 1,
    name: "Christian McCaffrey",
    position: "RB",
    team: "SF",
    byeWeek: 9,
    rank: 1,
    tier: "Elite",
  },
  {
    id: 2,
    name: "Tyreek Hill",
    position: "WR",
    team: "MIA",
    byeWeek: 6,
    rank: 2,
    tier: "Elite",
  },
  {
    id: 3,
    name: "Josh Allen",
    position: "QB",
    team: "BUF",
    byeWeek: 12,
    rank: 3,
    tier: "Elite",
  },
  {
    id: 4,
    name: "Travis Kelce",
    position: "TE",
    team: "KC",
    byeWeek: 10,
    rank: 4,
    tier: "Elite",
  },
  {
    id: 5,
    name: "Stefon Diggs",
    position: "WR",
    team: "HOU",
    byeWeek: 14,
    rank: 5,
    tier: "Elite",
  },
]

const mockDraftedPlayers = [
  { position: "QB", name: "Josh Allen", byeWeek: 12, round: 1, pick: 3 },
  { position: "RB", name: "Saquon Barkley", byeWeek: 7, round: 2, pick: 18 },
  { position: "WR", name: "Tyreek Hill", byeWeek: 6, round: 3, pick: 23 },
]

const mockQueuePlayers = [
  { name: "Lamar Jackson", position: "QB", team: "BAL", byeWeek: 14, reason: "Backup QB target" },
  { name: "Breece Hall", position: "RB", team: "NYJ", byeWeek: 12, reason: "High upside RB2" },
]

const sidekickData = {
  oracle: {
    name: "THE ORACLE",
    avatar: "/images/avatars/oracle-avatar.webp",
  },
  rebel: {
    name: "THE REBEL",
    avatar: "/images/avatars/rebel-avatar.png",
  },
  mentor: {
    name: "THE MENTOR",
    avatar: "/images/avatars/mentor-avatar.png",
  },
  analyst: {
    name: "THE ANALYST",
    avatar: "/images/avatars/analyst-avatar.png",
  },
  rookie: {
    name: "THE ROOKIE",
    avatar: "/images/avatars/rookie-avatar.png",
  },
}

const conversationStarters = {
  "Draft Strategy": [
    "What's a good strategy for the first round of my draft?",
    "Who should I take with my first pick if I'm drafting 5th?",
    "Is it smarter to draft a running back or a wide receiver first this year?",
    "Should I go for a top QB early or wait until later rounds?",
    "How can I build a balanced team through the draft?",
  ],
  "Player Analysis": [
    "Give me a sleeper pick I can steal in the late rounds.",
    "Which rookies have the most upside to target in my draft?",
    "Who's one sleeper nobody is talking about that I should consider?",
    "What would you do if all your top targets get taken right before my turn?",
    "Who looks like a potential bust that I should avoid?",
  ],
  "Draft Tactics": [
    "Best player available vs. team needs – how should I decide during the draft?",
    "Should I worry about bye weeks when drafting my team?",
    "Is it okay to draft two players from the same NFL team?",
    "When is the right time to draft a defense or kicker?",
    "What's a bold draft move that could give me an edge?",
  ],
}

export default function DraftCommandCenter() {
  const [isDraftActive, setIsDraftActive] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [chatMessage, setChatMessage] = useState("")
  const [selectedSidekick] = useState("mentor") // Changed default to mentor instead of analyst
  const [inputMessage, setInputMessage] = useState("Ask your SideKick anything about the draft...")
  const [isTyping, setIsTyping] = useState(false)
  const [showPlusMenu, setShowPlusMenu] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showConversationStarters, setShowConversationStarters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [queuedPlayers, setQueuedPlayers] = useState<Set<number>>(new Set([2])) // Tyreek Hill starts queued
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "sidekick",
      content: "Ready to dominate this draft! What's your strategy for the first few rounds?",
      timestamp: new Date(Date.now() - 300000),
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentSidekick = sidekickData[selectedSidekick as keyof typeof sidekickData]

  const handleStartDraft = () => {
    setIsDraftActive(true)
  }

  const handleEndDraft = () => {
    setIsDraftActive(false)
  }

  const handleClearDraft = () => {
    // Would clear all draft data
    setIsDraftActive(false)
  }

  const toggleQueue = (playerId: number) => {
    setQueuedPlayers((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(playerId)) {
        newSet.delete(playerId)
      } else {
        newSet.add(playerId)
      }
      return newSet
    })
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim() || inputMessage === "Ask your SideKick anything about the draft...") return

    const newMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInputMessage("Ask your SideKick anything about the draft...")
    setIsTyping(false)

    // Simulate SideKick response
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        type: "sidekick" as const,
        content: "Great draft question! Based on your position and the current board, here's my recommendation...",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, response])
    }, 1500)
  }

  const handleInputFocus = () => {
    if (inputMessage === "Ask your SideKick anything about the draft...") {
      setInputMessage("")
    }
    setIsTyping(true)
    setIsListening(false)
  }

  const handleInputBlur = () => {
    if (!inputMessage.trim()) {
      setInputMessage("Ask your SideKick anything about the draft...")
      setIsTyping(false)
    }
  }

  const toggleListening = () => {
    if (inputMessage.trim() && inputMessage !== "Ask your SideKick anything about the draft...") {
      handleSendMessage()
    } else {
      setIsListening(!isListening)
      setIsTyping(false)
    }
  }

  const toggleHistory = () => {
    setShowHistory(!showHistory)
    setShowPlusMenu(false)
  }

  const togglePlusMenu = () => {
    setShowPlusMenu(!showPlusMenu)
  }

  const toggleConversationStarters = () => {
    setShowConversationStarters(!showConversationStarters)
    setShowPlusMenu(false)
    setSelectedCategory(null)
  }

  const selectCategory = (category: string) => {
    setSelectedCategory(category)
  }

  const selectQuestion = (question: string) => {
    setInputMessage(question)
    setIsTyping(true)
    setShowConversationStarters(false)
    setSelectedCategory(null)
  }

  const latestSidekickMessage = messages.filter((m) => m.type === "sidekick").slice(-1)[0]

  const filteredPlayers = mockPlayers
    .filter(
      (player) =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.team.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const aQueued = queuedPlayers.has(a.id)
      const bQueued = queuedPlayers.has(b.id)

      // If one is queued and the other isn't, queued goes first
      if (aQueued && !bQueued) return -1
      if (!aQueued && bQueued) return 1

      // If both have same queue status, sort by original rank
      return a.rank - b.rank
    })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="min-h-screen bg-background">
      {!isDraftActive ? (
        /* Draft Not Active State */
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="font-headline text-3xl mb-4">Ready to Draft?</h2>
              <p className="font-body text-muted-foreground mb-8">
                Start your draft to activate the command center and get real-time assistance from your SideKick.
              </p>
              <Button
                onClick={handleStartDraft}
                className="bg-sidekick-success-green hover:bg-sidekick-success-green/90 font-subheading px-8 py-3 text-black"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Draft Session
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-subheading text-lg flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-sidekick-authority-blue" />
                    SideKick Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-body text-sm text-muted-foreground">
                    Get real-time advice and recommendations from your chosen AI coach throughout the draft.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-subheading text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-sidekick-success-green" />
                    Live Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-body text-sm text-muted-foreground">
                    Access dynamic player rankings that update based on your team needs and draft position.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-subheading text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-sidekick-action-orange" />
                    Draft Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-body text-sm text-muted-foreground">
                    Track your picks, manage your queue, and get alerts on steals and handcuff opportunities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        /* Active Draft Interface */
        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Column - SideKick Chat Interface */}
            <div className="lg:col-span-3">
              <div className="relative h-[600px] bg-gradient-to-br from-background to-background/50 rounded-lg overflow-hidden border border-border">
                {/* Soundwave Animation Background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-end gap-1 opacity-60">
                        {Array.from({ length: 20 }, (_, i) => (
                          <div
                            key={i}
                            className={`bg-sidekick-authority-blue rounded-full animate-pulse ${
                              isListening ? "animate-bounce" : ""
                            }`}
                            style={{
                              width: "3px",
                              height: `${Math.random() * 40 + 10}px`,
                              animationDelay: `${i * 0.1}s`,
                              animationDuration: `${Math.random() * 0.5 + 0.5}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 border border-sidekick-authority-blue/20 rounded-full animate-ping" />
                      <div className="absolute w-24 h-24 border border-sidekick-authority-blue/30 rounded-full animate-pulse" />
                    </div>

                    <div className="relative z-10 w-20 h-20 rounded-full overflow-hidden border-2 border-sidekick-authority-blue/50">
                      <Image
                        src={currentSidekick.avatar || "/placeholder.svg"}
                        alt={currentSidekick.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
                  <div className="text-center">
                    <h2 className="font-headline text-lg text-muted-foreground tracking-wider">
                      {currentSidekick.name}
                    </h2>
                  </div>
                </div>

                {/* Assistant Response Bubble - Upper Right */}
                {latestSidekickMessage && (
                  <div className="absolute top-4 right-4 max-w-[200px]">
                    <div className="relative bg-card border border-border rounded-xl p-3 shadow-lg">
                      {/* Pointer to avatar */}
                      <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2">
                        <div className="w-3 h-3 bg-card border-l border-b border-border rotate-45" />
                      </div>

                      <div className="space-y-2">
                        <p className="font-body text-xs leading-relaxed">{latestSidekickMessage.content}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modern Voice Assistant Input Bar - Bottom */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-[280px] px-2">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 p-[2px] opacity-80">
                      <div className="h-full w-full rounded-full bg-background" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 blur-sm opacity-60 animate-pulse" />

                    {/* Main input container */}
                    <div className="relative flex items-center gap-2 px-4 py-3 bg-background rounded-full border border-border/50 backdrop-blur-sm shadow-xl">
                      <button
                        onClick={togglePlusMenu}
                        className="flex-shrink-0 w-4 h-4 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>

                      {/* Input field */}
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => {
                          setInputMessage(e.target.value)
                          setIsTyping(
                            e.target.value.trim() !== "" &&
                              e.target.value !== "Ask your SideKick anything about the draft...",
                          )
                        }}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        className="flex-1 bg-transparent border-none outline-none font-body text-xs placeholder:text-muted-foreground"
                        placeholder="Ask your SideKick"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />

                      <button
                        onClick={toggleListening}
                        className={`flex-shrink-0 w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center ${
                          isListening
                            ? "bg-sidekick-authority-blue hover:bg-sidekick-authority-blue/90 scale-110 shadow-lg shadow-sidekick-authority-blue/25"
                            : "bg-sidekick-authority-blue hover:bg-sidekick-authority-blue/90"
                        }`}
                      >
                        {isTyping &&
                        inputMessage.trim() &&
                        inputMessage !== "Ask your SideKick anything about the draft..." ? (
                          <Send className="h-3 w-3 text-white" />
                        ) : isListening ? (
                          <MicOff className="h-3 w-3 text-white" />
                        ) : (
                          <Mic className="h-3 w-3 text-white" />
                        )}
                      </button>
                    </div>

                    {showPlusMenu && (
                      <div className="absolute bottom-full left-4 mb-2 bg-card/95 backdrop-blur border border-border rounded-lg shadow-xl overflow-hidden">
                        <button
                          onClick={toggleHistory}
                          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-body text-foreground hover:bg-muted transition-colors"
                        >
                          <History className="h-3 w-3" />
                          Conversation History
                        </button>
                        <button
                          onClick={toggleConversationStarters}
                          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-body text-foreground hover:bg-muted rounded transition-colors"
                        >
                          <MessageCircle className="h-3 w-3" />
                          Conversation Starters
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {showConversationStarters && (
                  <div className="absolute inset-x-2 bottom-16 top-2 bg-card/95 backdrop-blur border border-border rounded-lg p-3 overflow-y-auto">
                    {!selectedCategory ? (
                      <div className="space-y-2">
                        <h3 className="font-subheading text-sm mb-3">Choose a category:</h3>
                        {Object.keys(conversationStarters).map((category) => (
                          <button
                            key={category}
                            onClick={() => selectCategory(category)}
                            className="w-full text-left p-2 text-xs font-body text-foreground hover:bg-muted rounded transition-colors"
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-3">
                          <button
                            onClick={() => setSelectedCategory(null)}
                            className="text-xs text-muted-foreground hover:text-foreground"
                          >
                            ← Back
                          </button>
                          <h3 className="font-subheading text-sm">{selectedCategory}</h3>
                        </div>
                        {conversationStarters[selectedCategory as keyof typeof conversationStarters].map(
                          (question, index) => (
                            <button
                              key={index}
                              onClick={() => selectQuestion(question)}
                              className="w-full text-left p-2 text-xs font-body text-foreground hover:bg-muted rounded transition-colors"
                            >
                              {question}
                            </button>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* History Panel */}
                {showHistory && (
                  <div className="absolute inset-x-2 bottom-16 top-2 bg-card/95 backdrop-blur border border-border rounded-lg p-3 overflow-y-auto">
                    <div className="space-y-3">
                      {messages
                        .slice(0, -1)
                        .reverse()
                        .map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-2 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] p-2 rounded-lg text-xs ${
                                message.type === "user"
                                  ? "bg-sidekick-authority-blue text-white ml-auto"
                                  : "bg-muted border border-border"
                              }`}
                            >
                              <p className="font-body">{message.content}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Center Column - Draft Board */}
            <div className="lg:col-span-6">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-headline text-xl">Team Value Draft Board</CardTitle>
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search players..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-48 font-body text-sm"
                      />
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-2 text-xs font-subheading text-muted-foreground border-b border-border pb-2">
                      <div className="col-span-1">Rank</div>
                      <div className="col-span-4">Player</div>
                      <div className="col-span-2">Position</div>
                      <div className="col-span-2">Team</div>
                      <div className="col-span-2">Bye</div>
                      <div className="col-span-1">Queue</div>
                    </div>

                    {/* Player Rows */}
                    {filteredPlayers.map((player) => (
                      <div
                        key={player.id}
                        className="grid grid-cols-12 gap-2 items-center py-2 hover:bg-muted/50 rounded transition-colors"
                      >
                        <div className="col-span-1">
                          <Badge variant="outline" className="text-xs">
                            {player.rank}
                          </Badge>
                        </div>
                        <div className="col-span-4">
                          <div className="font-subheading text-sm">{player.name}</div>
                          <div className="text-xs text-muted-foreground">{player.tier}</div>
                        </div>
                        <div className="col-span-2">
                          <Badge
                            variant="secondary"
                            className={`text-xs ${
                              player.position === "QB"
                                ? "bg-red-500/10 text-red-500"
                                : player.position === "RB"
                                  ? "bg-green-500/10 text-green-500"
                                  : player.position === "WR"
                                    ? "bg-blue-500/10 text-blue-500"
                                    : "bg-purple-500/10 text-purple-500"
                            }`}
                          >
                            {player.position}
                          </Badge>
                        </div>
                        <div className="col-span-2 font-body text-sm">{player.team}</div>
                        <div className="col-span-2 font-body text-sm">{player.byeWeek}</div>
                        <div className="col-span-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleQueue(player.id)}
                            className="h-8 w-8 p-0"
                          >
                            {queuedPlayers.has(player.id) ? (
                              <Star className="h-4 w-4 text-sidekick-action-orange fill-current" />
                            ) : (
                              <StarOff className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* OCR button under the Team Value Draft Board */}
                  <div className="pt-4 border-t border-border">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Camera className="h-4 w-4 mr-2" />
                      Upload Screenshot (OCR)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Draft Status */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* AI Sports Reporter */}
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <CardTitle className="font-subheading text-lg">AI Sports Reporter</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="p-2 bg-muted rounded text-xs font-body">
                        <AlertTriangle className="h-3 w-3 inline mr-1 text-sidekick-action-orange" />
                        STEAL ALERT: Breece Hall falling to round 4!
                      </div>
                      <div className="p-2 bg-muted rounded text-xs font-body">
                        Great value pick with Tyreek Hill! His ADP was much higher.
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* My Draft Class */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="font-subheading text-lg">My Draft Class</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockDraftedPlayers.map((player, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <div>
                            <div className="font-subheading text-sm">{player.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {player.position} • Bye {player.byeWeek}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            R{player.round}.{player.pick}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

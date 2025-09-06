"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff, Search, TrendingUp, BarChart3, Send, History, MessageSquare } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

const mockMessages = []

const conversationStarters = {
  "Draft Help": [
    "What's a good strategy for the first round of my draft?",
    "Who should I take with my first pick if I'm drafting 5th?",
    "Is it smarter to draft a running back or a wide receiver first this year?",
    "Should I go for a top QB early or wait until later rounds?",
    "How can I build a balanced team through the draft?",
    "What's one draft tip a beginner like me should know?",
    "I've heard of the 'Zero-RB' draft strategy – is it worth trying and how does it work?",
    "Give me a sleeper pick I can steal in the late rounds.",
    "Which rookies have the most upside to target in my draft?",
    "If I miss out on top players, how do I catch up later in the draft?",
    "Best player available vs. team needs – how should I decide during the draft?",
    "Should I worry about bye weeks when drafting my team?",
    "Is it okay to draft two players from the same NFL team?",
    "When is the right time to draft a defense or kicker?",
    "What's a bold draft move that could give me an edge?",
    "What would you do if all your top targets get taken right before my turn?",
    "Who's one sleeper nobody is talking about that I should consider?",
    "I feel like gambling – what's one risky draft pick that could pay off big?",
    "Which positions should I focus on in the early rounds vs. the later rounds?",
    "I'm new to fantasy – could you guide me through a simple draft game plan?",
  ],
  "Weekly Lineups": [
    "Is it better to start a superstar facing a tough defense or a lesser-known player with an easy matchup?",
    "One of my players is questionable – how should I adjust my lineup?",
    "Should I bench a player if the weather for his game looks bad?",
    "How do I decide between two good players for my flex spot?",
    "Give me a sleeper pick I can plug into my lineup this week.",
    "Which defense should I stream this week?",
    "My star player is facing the best defense – is it crazy to bench him?",
    "Any lineup tweaks you'd suggest to maximize my points this week?",
    "What's a high-upside play I can make in my lineup?",
    "Who looks like a potential bust in my lineup that I should replace?",
    "Can you check if any of my starters have bad matchups this week?",
    "If I'm projected to lose, should I start more boom-or-bust players?",
    "Give me a pep talk – how do I not overthink my lineup this week?",
    "I have two QBs with great matchups – which one do I roll with?",
    "Are there any potential injury replacements I should pick up before Sunday?",
    "Should I trust the weekly projections or go with my gut for my flex?",
    "Who's a must-start player this week that people might overlook?",
    "How do bye weeks affect my lineup decisions for this week?",
    "Help me optimize my lineup – do I have any weak links to swap out?",
    "My opponent's lineup looks strong – any tips to outsmart them with mine?",
  ],
  "Waiver & Trade": [
    "Who are the top waiver wire pickups you recommend this week?",
    "Is it time to drop any underperforming players on my team?",
    "Which player is a good sell-high candidate right now?",
    "Got any buy-low trade targets I should try for?",
    "Should I trade away some depth for a star, or keep my balanced roster?",
    "My top running back is injured – who's the best replacement I can find?",
    "Offer evaluation: I give up my RB2 for a better WR – is that a smart move?",
    "Can you spot any weak areas on my team that I should fix with a trade?",
    "Who has an easy upcoming schedule that I could trade for now?",
    "What do you think of this trade: I give up my top WR and get two solid starters in return – fair deal or not?",
    "Is there anyone on waivers who could be a hidden gem later in the season?",
    "Should I stash a backup QB or use that roster spot for another position?",
    "Am I overreacting, or is it time to shake up my team with a big trade?",
    "How aggressive should I be on the waiver wire each week?",
    "Are there any trade traps I should avoid, like trading for an injury-prone player?",
    "What's a creative trade offer that could improve my team?",
    "Who's a player other managers might undervalue that I can target?",
    "If I'm dominating the league, should I still make moves or just ride my current roster?",
    "Give me one bold move (waiver pickup or trade) that could turn my season around.",
    "The trade deadline is approaching – what last-minute moves should I consider?",
  ],
}

export default function SidekickCentral() {
  const [messages, setMessages] = useState(mockMessages)
  const [inputMessage, setInputMessage] = useState("Ask your SideKick anything about football.")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState("6")
  const [selectedSidekick, setSelectedSidekick] = useState("")
  const [showOptimizedLineup, setShowOptimizedLineup] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showPlusMenu, setShowPlusMenu] = useState(false)
  const [showConversationStarters, setShowConversationStarters] = useState(false)
  const [selectedStarterCategory, setSelectedStarterCategory] = useState<string | null>(null)
  const [teamStatus, setTeamStatus] = useState([])
  const [teamStatusError, setTeamStatusError] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const urlSidekick = searchParams.get("sidekick")

    if (urlSidekick) {
      setSelectedSidekick(urlSidekick)
      localStorage.setItem("selectedSidekick", urlSidekick)
      router.replace("/dashboard", { scroll: false })
    }

    fetchTeamStatus()
  }, [searchParams, router])

  const fetchTeamStatus = async () => {
    try {
      const response = await fetch("/api/team-status")

      if (response.ok) {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          try {
            const data = await response.json()
            setTeamStatus(data.status || [])
          } catch (jsonError) {
            // JSON parsing failed, treat as no data
            setTeamStatus([])
          }
        } else {
          // Not JSON response, treat as no data (expected for missing API)
          setTeamStatus([])
        }
      } else {
        // API call failed, treat as no data
        setTeamStatus([])
      }

      setTeamStatusError(false)
    } catch (error) {
      // Network error or other fetch failure (expected in backend-dependent version)
      setTeamStatus([])
      setTeamStatusError(false)
    }
  }

  const sidekickConfig = {
    mentor: {
      name: "THE MENTOR",
      avatar: "/images/avatars/mentor-avatar.png",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/30",
    },
    analyst: {
      name: "THE ANALYST",
      avatar: "/images/avatars/analyst-avatar.png",
      color: "text-sidekick-authority-blue",
      bgColor: "bg-sidekick-authority-blue/10",
      borderColor: "border-sidekick-authority-blue/30",
    },
    oracle: {
      name: "THE ORACLE",
      avatar: "/images/avatars/oracle-avatar.webp",
      color: "text-sidekick-success-green",
      bgColor: "bg-sidekick-success-green/10",
      borderColor: "border-sidekick-success-green/30",
    },
    rebel: {
      name: "THE REBEL",
      avatar: "/images/avatars/rebel-avatar.png",
      color: "text-sidekick-action-orange",
      bgColor: "bg-sidekick-action-orange/10",
      borderColor: "border-sidekick-action-orange/30",
    },
    rookie: {
      name: "THE ROOKIE",
      avatar: "/images/avatars/rookie-avatar.png",
      color: "text-sidekick-success-green",
      bgColor: "bg-sidekick-success-green/10",
      borderColor: "border-sidekick-success-green/30",
    },
  }

  const currentSidekick = selectedSidekick ? sidekickConfig[selectedSidekick] : null

  const latestUserMessage = messages.filter((m) => m.type === "user").slice(-1)[0]
  const latestSidekickMessage = messages.filter((m) => m.type === "sidekick").slice(-1)[0]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || inputMessage === "Ask your SideKick anything about football.") return

    const newMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInputMessage("Ask your SideKick anything about football.")
    setIsTyping(false)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage.content,
          sidekick: selectedSidekick,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const responseMessage = {
          id: messages.length + 2,
          type: "sidekick" as const,
          content: data.response,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, responseMessage])
      }
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  const handleResearchAlert = async () => {
    try {
      const response = await fetch("/api/research-alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        const alertMessage = {
          id: messages.length + 1,
          type: "sidekick" as const,
          content: data.alert,
          timestamp: new Date(),
        }
        setMessages([...messages, alertMessage])
      }
    } catch (error) {
      console.error("Failed to fetch research alerts:", error)
    }
  }

  const handleOptimizeLineup = async () => {
    try {
      const response = await fetch("/api/optimize-lineup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          week: selectedWeek,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setShowOptimizedLineup(true)
        const lineupMessage = {
          id: messages.length + 1,
          type: "sidekick" as const,
          content: data.optimizedLineup,
          timestamp: new Date(),
        }
        setMessages([...messages, lineupMessage])
      }
    } catch (error) {
      console.error("Failed to optimize lineup:", error)
    }
  }

  const handleStarterClick = (starter: string) => {
    setInputMessage(starter)
  }

  const toggleListening = () => {
    if (inputMessage.trim() && inputMessage !== "Ask your SideKick anything about football.") {
      handleSendMessage()
    } else {
      setIsListening(!isListening)
      setIsTyping(false)
    }
  }

  const handleInputFocus = () => {
    if (inputMessage === "Ask your SideKick anything about football.") {
      setInputMessage("")
    }
    setIsTyping(true)
    setIsListening(false)
  }

  const handleInputBlur = () => {
    if (!inputMessage.trim()) {
      setInputMessage("Ask your SideKick anything about football.")
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

  const handleConversationStarters = () => {
    setShowConversationStarters(true)
    setShowPlusMenu(false)
  }

  const handleStarterCategorySelect = (category: string) => {
    setSelectedStarterCategory(category)
  }

  const handleStarterQuestionSelect = (question: string) => {
    setInputMessage(question)
    setShowConversationStarters(false)
    setSelectedStarterCategory(null)
    setIsTyping(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Team Status */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="font-subheading text-lg">Team Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamStatus.length > 0 ? (
                  teamStatus.map((status, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 ${status.color} rounded-full`} />
                      <span className="font-body">{status.text}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground font-body">
                    No team status data available. Connect your league to see team updates.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Center - Chat Interface */}
          <div className="lg:col-span-6">
            <div className="relative h-[600px] bg-gradient-to-br from-background to-background/50 rounded-lg overflow-hidden">
              {/* Soundwave Animation Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Animated soundwave bars */}
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

                  {/* Concentric rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border border-sidekick-authority-blue/20 rounded-full animate-ping" />
                    <div className="absolute w-24 h-24 border border-sidekick-authority-blue/30 rounded-full animate-pulse" />
                  </div>

                  {currentSidekick ? (
                    <div className="relative z-10 w-20 h-20 rounded-full overflow-hidden border-2 border-sidekick-authority-blue/50">
                      <Image
                        src={currentSidekick.avatar || "/placeholder.svg"}
                        alt={currentSidekick.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="absolute bottom-44 left-1/2 transform -translate-x-1/2">
                <div className="text-center">
                  {currentSidekick ? (
                    <h2 className="font-headline text-lg text-muted-foreground tracking-wider">
                      {currentSidekick.name}
                    </h2>
                  ) : (
                    <div className="space-y-2">
                      <h2 className="font-headline text-lg text-muted-foreground tracking-wider">
                        No SideKick selected
                      </h2>
                      <p className="text-sm text-muted-foreground">Please select a SideKick to continue</p>
                    </div>
                  )}
                </div>
              </div>

              {latestSidekickMessage && (
                <div className="absolute top-8 right-8 max-w-sm">
                  <div className="relative bg-card border border-border rounded-2xl p-4 shadow-lg">
                    {/* Pointer to avatar */}
                    <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2">
                      <div className="w-4 h-4 bg-card border-l border-b border-border rotate-45" />
                    </div>

                    <div className="space-y-2">
                      <p className="font-body text-sm leading-relaxed">{latestSidekickMessage.content}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Modern Voice Assistant Input Bar - Bottom Center */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 p-[3px] opacity-80">
                    <div className="h-full w-full rounded-full bg-background" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 blur-md opacity-60 animate-pulse" />

                  {/* Main input container */}
                  <div className="relative flex items-center gap-3 px-6 py-4 bg-background rounded-full border border-border/50 backdrop-blur-sm shadow-2xl">
                    <button
                      onClick={togglePlusMenu}
                      className="flex-shrink-0 w-6 h-6 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            e.target.value !== "Ask your SideKick anything about football.",
                        )
                      }}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      className="flex-1 bg-transparent border-none outline-none font-body text-sm placeholder:text-muted-foreground"
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
                      className={`flex-shrink-0 w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center ${
                        isListening
                          ? "bg-sidekick-authority-blue hover:bg-sidekick-authority-blue/90 scale-110 shadow-lg shadow-sidekick-authority-blue/25"
                          : "bg-sidekick-authority-blue hover:bg-sidekick-authority-blue/90"
                      }`}
                    >
                      {isTyping &&
                      inputMessage.trim() &&
                      inputMessage !== "Ask your SideKick anything about football." ? (
                        <Send className="h-5 w-5 text-white" />
                      ) : isListening ? (
                        <MicOff className="h-5 w-5 text-white" />
                      ) : (
                        <Mic className="h-5 w-5 text-white" />
                      )}
                    </button>
                  </div>

                  {showPlusMenu && (
                    <div className="absolute bottom-full left-6 mb-2 bg-card/95 backdrop-blur border border-border rounded-lg shadow-xl overflow-hidden">
                      <button
                        onClick={toggleHistory}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-body text-foreground hover:bg-muted transition-colors"
                      >
                        <History className="h-4 w-4" />
                        Conversation History
                      </button>
                      <button
                        onClick={handleConversationStarters}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-body text-foreground hover:bg-muted transition-colors border-t border-border"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Conversation Starters
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Conversation History Toggle */}
              {messages.length > 2 && (
                <div className="absolute bottom-4 left-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleHistory}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    {showHistory ? "+" : "+"}
                  </Button>
                </div>
              )}

              {/* History Panel */}
              {showHistory && (
                <div className="absolute inset-x-4 bottom-20 top-4 bg-card/95 backdrop-blur border border-border rounded-lg p-4 overflow-y-auto">
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={() => setShowHistory(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-4">
                    {messages
                      .slice(0, -2)
                      .reverse()
                      .map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg text-xs ${
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

              {showConversationStarters && (
                <div className="absolute inset-4 bg-card/95 backdrop-blur border border-border rounded-lg overflow-hidden">
                  {!selectedStarterCategory ? (
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-subheading text-lg">Choose a Category</h3>
                        <button
                          onClick={() => setShowConversationStarters(false)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="space-y-3">
                        {Object.keys(conversationStarters).map((category) => (
                          <button
                            key={category}
                            onClick={() => handleStarterCategorySelect(category)}
                            className="w-full flex items-center gap-3 p-4 text-left bg-muted/50 hover:bg-muted rounded-lg transition-colors"
                          >
                            <div className="w-8 h-8 bg-sidekick-authority-blue/20 rounded-lg flex items-center justify-center">
                              {category === "Draft Help" && (
                                <BarChart3 className="h-4 w-4 text-sidekick-authority-blue" />
                              )}
                              {category === "Weekly Lineups" && (
                                <TrendingUp className="h-4 w-4 text-sidekick-success-green" />
                              )}
                              {category === "Waiver & Trade" && (
                                <Search className="h-4 w-4 text-sidekick-action-orange" />
                              )}
                            </div>
                            <span className="font-body">{category}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setSelectedStarterCategory(null)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            ←
                          </button>
                          <h3 className="font-subheading text-lg">{selectedStarterCategory}</h3>
                        </div>
                        <button
                          onClick={() => setShowConversationStarters(false)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="space-y-2 max-h-[400px] overflow-y-auto">
                        {conversationStarters[selectedStarterCategory]?.map((question, index) => (
                          <button
                            key={index}
                            onClick={() => handleStarterQuestionSelect(question)}
                            className="w-full text-left p-3 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                          >
                            "{question}"
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Quick Actions and Tools */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="font-subheading text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handleResearchAlert}
                    className="w-full justify-start bg-sidekick-authority-blue hover:bg-sidekick-authority-blue/90 font-subheading"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Research & Alerts
                  </Button>
                  <Button
                    onClick={handleOptimizeLineup}
                    className="w-full justify-start bg-sidekick-success-green hover:bg-sidekick-success-green/90 font-subheading text-black"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Optimize Lineup
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent font-subheading">
                    <Link href="/rankings">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Rankings
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

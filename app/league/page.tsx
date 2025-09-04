"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Upload, Edit, Save, X } from "lucide-react"

const mockLeagueSettings = {
  leagueName: "Championship Dynasty League",
  teams: 12,
  scoring: "PPR",
  rosterSize: 16,
  startingLineup: {
    QB: 1,
    RB: 2,
    WR: 2,
    TE: 1,
    FLEX: 1,
    DST: 1,
    K: 1,
  },
  waiverType: "FAAB",
  tradeDeadline: "Week 11",
  playoffTeams: 6,
}

const mockTeamRosters = [
  {
    teamName: "Your Team",
    owner: "You",
    record: "4-2",
    players: [
      { name: "Josh Allen", position: "QB", status: "Healthy" },
      { name: "Christian McCaffrey", position: "RB", status: "Healthy" },
      { name: "Saquon Barkley", position: "RB", status: "Questionable" },
      { name: "Tyreek Hill", position: "WR", status: "Bye Week 6" },
      { name: "Stefon Diggs", position: "WR", status: "Healthy" },
      { name: "Travis Kelce", position: "TE", status: "Healthy" },
    ],
  },
  {
    teamName: "The Juggernauts",
    owner: "Mike",
    record: "5-1",
    players: [
      { name: "Lamar Jackson", position: "QB", status: "Healthy" },
      { name: "Derrick Henry", position: "RB", status: "Healthy" },
      { name: "Austin Ekeler", position: "RB", status: "Healthy" },
      { name: "Cooper Kupp", position: "WR", status: "Injured" },
      { name: "Davante Adams", position: "WR", status: "Healthy" },
      { name: "Mark Andrews", position: "TE", status: "Healthy" },
    ],
  },
]

export default function LeagueDetailsPage() {
  const [selectedView, setSelectedView] = useState("settings")
  const [isEditing, setIsEditing] = useState(false)
  const [editedSettings, setEditedSettings] = useState(mockLeagueSettings)

  const [isEditingRosters, setIsEditingRosters] = useState(false)
  const [isEditingDraft, setIsEditingDraft] = useState(false)
  const [editedRosters, setEditedRosters] = useState(mockTeamRosters)
  const [draftBoard, setDraftBoard] = useState([
    { round: 1, pick: 1, player: "Christian McCaffrey", position: "RB", team: "SF", owner: "Team Alpha" },
    { round: 1, pick: 2, player: "Austin Ekeler", position: "RB", team: "LAC", owner: "Team Beta" },
    { round: 1, pick: 3, player: "Cooper Kupp", position: "WR", team: "LAR", owner: "Team Gamma" },
    { round: 1, pick: 4, player: "Derrick Henry", position: "RB", team: "TEN", owner: "Team Delta" },
    { round: 1, pick: 5, player: "Josh Allen", position: "QB", team: "BUF", owner: "Your Team" },
  ])

  const [scoringValues, setScoringValues] = useState({
    // Passing
    passingYards: 0.04,
    tdPass: 5,
    interceptions: -2,
    twoPointPass: 2,
    passing400: 1,
    // Rushing
    rushingYards: 0.1,
    tdRush: 6,
    twoPointRush: 2,
    rushing100: 3,
    // Receiving
    receivingYards: 0.1,
    reception: 0.5,
    tdReception: 6,
    twoPointReceiving: 2,
    receiving100: 2,
    receiving200: 7,
    // Kicking
    patMade: 1,
    patMissed: -2,
    fgMissed: -1,
    fg0to39: 3,
    fg40to49: 4,
    fg50to59: 5,
    fg60plus: 5,
  })

  const handleSaveSettings = () => {
    // Would save settings to backend
    setIsEditing(false)
    console.log("Saving settings:", editedSettings, "Scoring:", scoringValues)
  }

  const handleCancelEdit = () => {
    setEditedSettings(mockLeagueSettings)
    setIsEditing(false)
  }

  const handleScreenshotUpload = () => {
    // Would handle screenshot upload and OCR processing
    console.log("Screenshot upload triggered")
  }

  const handleSaveRosters = () => {
    setIsEditingRosters(false)
    console.log("Saving rosters:", editedRosters)
  }

  const handleCancelRosterEdit = () => {
    setEditedRosters(mockTeamRosters)
    setIsEditingRosters(false)
  }

  const handleSaveDraft = () => {
    setIsEditingDraft(false)
    console.log("Saving draft board:", draftBoard)
  }

  const handleCancelDraftEdit = () => {
    setIsEditingDraft(false)
  }

  const updatePlayerInRoster = (teamIndex: number, playerIndex: number, field: string, value: string) => {
    const newRosters = [...editedRosters]
    newRosters[teamIndex].players[playerIndex] = {
      ...newRosters[teamIndex].players[playerIndex],
      [field]: value,
    }
    setEditedRosters(newRosters)
  }

  const updateDraftPick = (pickIndex: number, field: string, value: string) => {
    const newDraftBoard = [...draftBoard]
    newDraftBoard[pickIndex] = {
      ...newDraftBoard[pickIndex],
      [field]: value,
    }
    setDraftBoard(newDraftBoard)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="font-headline text-xl">League Details</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={handleScreenshotUpload}
                variant="outline"
                size="sm"
                className="bg-transparent font-subheading"
              >
                <Camera className="h-4 w-4 mr-2" />
                Import Screenshot
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent font-subheading">
                <Upload className="h-4 w-4 mr-2" />
                Upload CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* View Selector */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="font-subheading text-lg">League Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger className="w-64 font-body">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="settings">League Scoring System</SelectItem>
                <SelectItem value="rosters">Team Rosters</SelectItem>
                <SelectItem value="draft">Draft Board</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* League Settings */}
        {selectedView === "settings" && (
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="font-headline text-xl">League Scoring System</CardTitle>
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <Button
                        onClick={handleSaveSettings}
                        size="sm"
                        className="bg-sidekick-success-green hover:bg-sidekick-success-green/90 font-subheading"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" size="sm" className="bg-transparent">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                      className="bg-transparent font-subheading"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Basic Settings */}
                <div className="space-y-4">
                  <h3 className="font-subheading text-lg mb-4">Basic Settings</h3>

                  <div className="space-y-2">
                    <Label className="font-subheading text-sm">League Name</Label>
                    {isEditing ? (
                      <Input
                        value={editedSettings.leagueName}
                        onChange={(e) => setEditedSettings({ ...editedSettings, leagueName: e.target.value })}
                        className="font-body"
                      />
                    ) : (
                      <div className="font-body text-sm p-2 bg-muted rounded">{mockLeagueSettings.leagueName}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-subheading text-sm">Teams</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={editedSettings.teams}
                          onChange={(e) =>
                            setEditedSettings({ ...editedSettings, teams: Number.parseInt(e.target.value) })
                          }
                          className="font-body"
                        />
                      ) : (
                        <div className="font-body text-sm p-2 bg-muted rounded">{mockLeagueSettings.teams}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="font-subheading text-sm">Scoring</Label>
                      {isEditing ? (
                        <Select
                          value={editedSettings.scoring}
                          onValueChange={(value) => setEditedSettings({ ...editedSettings, scoring: value })}
                        >
                          <SelectTrigger className="font-body">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PPR">PPR</SelectItem>
                            <SelectItem value="Half PPR">Half PPR</SelectItem>
                            <SelectItem value="Standard">Standard</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="font-body text-sm p-2 bg-muted rounded">{mockLeagueSettings.scoring}</div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-subheading text-sm">Roster Size</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={editedSettings.rosterSize}
                          onChange={(e) =>
                            setEditedSettings({ ...editedSettings, rosterSize: Number.parseInt(e.target.value) })
                          }
                          className="font-body"
                        />
                      ) : (
                        <div className="font-body text-sm p-2 bg-muted rounded">{mockLeagueSettings.rosterSize}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="font-subheading text-sm">Playoff Teams</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={editedSettings.playoffTeams}
                          onChange={(e) =>
                            setEditedSettings({ ...editedSettings, playoffTeams: Number.parseInt(e.target.value) })
                          }
                          className="font-body"
                        />
                      ) : (
                        <div className="font-body text-sm p-2 bg-muted rounded">{mockLeagueSettings.playoffTeams}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Scoring System */}
                <div className="space-y-4">
                  <h3 className="font-subheading text-lg mb-4">Scoring System</h3>

                  {/* Passing */}
                  <div className="space-y-3">
                    <h4 className="font-subheading text-md text-sidekick-authority-blue">Passing</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">Passing Yards (PY)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            step="0.01"
                            value={scoringValues.passingYards}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, passingYards: Number.parseFloat(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.passingYards}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">TD Pass (PTD)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.tdPass}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, tdPass: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.tdPass}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">Interceptions Thrown (INT)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.interceptions}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, interceptions: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.interceptions}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">2pt Passing Conversion (2PC)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.twoPointPass}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, twoPointPass: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.twoPointPass}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">400+ yard passing game (P400)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.passing400}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, passing400: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.passing400}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rushing */}
                  <div className="space-y-3">
                    <h4 className="font-subheading text-md text-sidekick-success-green">Rushing</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">Rushing Yards (RY)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            step="0.01"
                            value={scoringValues.rushingYards}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, rushingYards: Number.parseFloat(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.rushingYards}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">TD Rush (RTD)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.tdRush}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, tdRush: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.tdRush}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">2pt Rushing Conversion (2PR)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.twoPointRush}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, twoPointRush: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.twoPointRush}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">100-199 yard rushing game (RY100)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.rushing100}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, rushing100: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.rushing100}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Receiving */}
                  <div className="space-y-3">
                    <h4 className="font-subheading text-md text-sidekick-action-orange">Receiving</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">Receiving Yards (REY)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            step="0.01"
                            value={scoringValues.receivingYards}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, receivingYards: Number.parseFloat(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.receivingYards}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">Each reception (REC)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            step="0.1"
                            value={scoringValues.reception}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, reception: Number.parseFloat(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.reception}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">TD Reception (RETD)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.tdReception}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, tdReception: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.tdReception}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">2pt Receiving Conversion (2PRE)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.twoPointReceiving}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, twoPointReceiving: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.twoPointReceiving}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">100-199 yard receiving game (REY100)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.receiving100}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, receiving100: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.receiving100}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">200+ yard receiving game (REY200)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.receiving200}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, receiving200: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.receiving200}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Kicking */}
                  <div className="space-y-3">
                    <h4 className="font-subheading text-md text-purple-400">Kicking</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">Each PAT Made (PAT)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.patMade}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, patMade: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.patMade}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">Each PAT Missed (PATM)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.patMissed}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, patMissed: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.patMissed}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">Total FG Missed (FGM)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.fgMissed}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, fgMissed: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.fgMissed}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">FG Made (0-39 yards) (FG0)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.fg0to39}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, fg0to39: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.fg0to39}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">FG Made (40-49 yards) (FG40)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.fg40to49}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, fg40to49: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.fg40to49}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">FG Made (50-59 yards) (FG50)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.fg50to59}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, fg50to59: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.fg50to59}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-sm">FG Made (60+ yards) (FG60)</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={scoringValues.fg60plus}
                            onChange={(e) =>
                              setScoringValues({ ...scoringValues, fg60plus: Number.parseInt(e.target.value) })
                            }
                            className="w-20 h-8 text-right font-body text-sm"
                          />
                        ) : (
                          <div className="font-body text-sm text-yellow-400">{scoringValues.fg60plus}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <Label className="font-subheading text-sm">Waiver Type</Label>
                      {isEditing ? (
                        <Select
                          value={editedSettings.waiverType}
                          onValueChange={(value) => setEditedSettings({ ...editedSettings, waiverType: value })}
                        >
                          <SelectTrigger className="w-32 font-body">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="FAAB">FAAB</SelectItem>
                            <SelectItem value="Rolling">Rolling</SelectItem>
                            <SelectItem value="Reverse">Reverse</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="font-body text-sm p-1 bg-muted rounded">{mockLeagueSettings.waiverType}</div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="font-subheading text-sm">Trade Deadline</Label>
                      {isEditing ? (
                        <Input
                          value={editedSettings.tradeDeadline}
                          onChange={(e) => setEditedSettings({ ...editedSettings, tradeDeadline: e.target.value })}
                          className="w-32 font-body"
                        />
                      ) : (
                        <div className="font-body text-sm p-1 bg-muted rounded">{mockLeagueSettings.tradeDeadline}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Team Rosters */}
        {selectedView === "rosters" && (
          <div className="space-y-6">
            {editedRosters.map((team, index) => (
              <Card key={index}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-headline text-lg">{team.teamName}</CardTitle>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="font-body text-sm text-muted-foreground">Owner: {team.owner}</span>
                        <span className="font-body text-sm text-muted-foreground">Record: {team.record}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditingRosters ? (
                        <>
                          <Button
                            onClick={handleSaveRosters}
                            size="sm"
                            className="bg-sidekick-success-green hover:bg-sidekick-success-green/90 font-subheading"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button
                            onClick={handleCancelRosterEdit}
                            variant="outline"
                            size="sm"
                            className="bg-transparent"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => setIsEditingRosters(true)}
                          variant="outline"
                          size="sm"
                          className="bg-transparent font-subheading"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {team.players.map((player, playerIndex) => (
                      <div key={playerIndex} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="flex-1">
                          {isEditingRosters ? (
                            <div className="space-y-1">
                              <Input
                                value={player.name}
                                onChange={(e) => updatePlayerInRoster(index, playerIndex, "name", e.target.value)}
                                className="h-6 text-sm font-subheading"
                                placeholder="Player name"
                              />
                              <Input
                                value={player.position}
                                onChange={(e) => updatePlayerInRoster(index, playerIndex, "position", e.target.value)}
                                className="h-6 text-xs font-body"
                                placeholder="Position"
                              />
                            </div>
                          ) : (
                            <>
                              <div className="font-subheading text-sm">{player.name}</div>
                              <div className="font-body text-xs text-yellow-400">{player.position}</div>
                            </>
                          )}
                        </div>
                        <div
                          className={`text-xs font-body px-2 py-1 rounded ${
                            player.status === "Healthy"
                              ? "bg-sidekick-success-green/10 text-sidekick-success-green"
                              : player.status.includes("Bye")
                                ? "bg-sidekick-authority-blue/10 text-sidekick-authority-blue"
                                : "bg-sidekick-action-orange/10 text-sidekick-action-orange"
                          }`}
                        >
                          {player.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Draft Board */}
        {selectedView === "draft" && (
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="font-headline text-xl">Draft Board</CardTitle>
                <div className="flex items-center gap-2">
                  {isEditingDraft ? (
                    <>
                      <Button
                        onClick={handleSaveDraft}
                        size="sm"
                        className="bg-sidekick-success-green hover:bg-sidekick-success-green/90 font-subheading"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancelDraftEdit} variant="outline" size="sm" className="bg-transparent">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setIsEditingDraft(true)}
                      variant="outline"
                      size="sm"
                      className="bg-transparent font-subheading"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-6 gap-4 p-3 bg-muted/50 rounded font-subheading text-sm">
                  <div>Round</div>
                  <div>Pick</div>
                  <div>Player</div>
                  <div>Position</div>
                  <div>Team</div>
                  <div>Owner</div>
                </div>
                {draftBoard.map((pick, index) => (
                  <div key={index} className="grid grid-cols-6 gap-4 p-3 border border-border rounded">
                    <div className="font-body text-sm">{pick.round}</div>
                    <div className="font-body text-sm">{pick.pick}</div>
                    <div>
                      {isEditingDraft ? (
                        <Input
                          value={pick.player}
                          onChange={(e) => updateDraftPick(index, "player", e.target.value)}
                          className="h-8 text-sm font-body"
                        />
                      ) : (
                        <div className="font-body text-sm">{pick.player}</div>
                      )}
                    </div>
                    <div>
                      {isEditingDraft ? (
                        <Input
                          value={pick.position}
                          onChange={(e) => updateDraftPick(index, "position", e.target.value)}
                          className="h-8 text-sm font-body"
                        />
                      ) : (
                        <div className="font-body text-sm text-yellow-400">{pick.position}</div>
                      )}
                    </div>
                    <div>
                      {isEditingDraft ? (
                        <Input
                          value={pick.team}
                          onChange={(e) => updateDraftPick(index, "team", e.target.value)}
                          className="h-8 text-sm font-body"
                        />
                      ) : (
                        <div className="font-body text-sm text-yellow-400">{pick.team}</div>
                      )}
                    </div>
                    <div>
                      {isEditingDraft ? (
                        <Input
                          value={pick.owner}
                          onChange={(e) => updateDraftPick(index, "owner", e.target.value)}
                          className="h-8 text-sm font-body"
                        />
                      ) : (
                        <div className="font-body text-sm">{pick.owner}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

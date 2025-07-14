import { useEffect, useState } from "react"

import type { Hunt } from "@/components/ui/hunt-card/hunt-card"
import type { Hint } from "@/components/ui/hint-card"

interface UseHuntDetailsReturn {
  hunt: Hunt | null
  hints: Hint[]
  isJoined: boolean
  hasCurrentHunt: boolean
  setIsJoined: (joined: boolean) => void
  setHasCurrentHunt: (hasHunt: boolean) => void
  setHints: (hints: Hint[]) => void
}

export const useHuntDetails = (huntId: string): UseHuntDetailsReturn => {
  const [hunt, setHunt] = useState<Hunt | null>(null)
  const [hints, setHints] = useState<Hint[]>([])
  const [isJoined, setIsJoined] = useState(false)
  const [hasCurrentHunt, setHasCurrentHunt] = useState(false)

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockHunts: Hunt[] = [
      {
        id: "1",
        title: "City Explorer",
        description: "Explore the hidden gems of downtown",
        isPrivate: false,
        startDate: new Date(),
        maxParticipants: 10,
        worldType: "real",
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        creatorId: "user1",
        latitude: 40.7128,
        longitude: -74.0060,
        location: "New York, NY",
        image: "https://picsum.photos/300/200?random=1"
      },
      {
        id: "2",
        title: "Museum Mystery",
        description: "Solve puzzles in the local museum",
        isPrivate: false,
        startDate: new Date(),
        maxParticipants: 6,
        worldType: "real",
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        creatorId: "user2",
        latitude: 40.7614,
        longitude: -73.9776,
        location: "Manhattan, NY",
        image: "https://picsum.photos/300/200?random=2"
      },
      {
        id: "3",
        title: "Virtual Adventure",
        description: "A digital treasure hunt experience",
        isPrivate: false,
        startDate: new Date(),
        maxParticipants: 20,
        worldType: "cartographic",
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        creatorId: "user3",
        latitude: 40.7505,
        longitude: -73.9934,
        location: "Times Square, NY",
        image: "https://picsum.photos/300/200?random=3"
      },
      {
        id: "4",
        title: "Historic Downtown",
        description: "Discover the historic buildings and monuments",
        isPrivate: false,
        startDate: new Date(),
        maxParticipants: 8,
        worldType: "real",
        endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        creatorId: "user4",
        latitude: 40.7589,
        longitude: -73.9851,
        location: "Downtown NYC",
        image: "https://picsum.photos/300/200?random=4"
      },
      {
        id: "5",
        title: "Park Adventure",
        description: "Nature-based treasure hunt in Central Park",
        isPrivate: false,
        startDate: new Date(),
        maxParticipants: 15,
        worldType: "real",
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        creatorId: "user5",
        latitude: 40.7812,
        longitude: -73.9665,
        location: "Central Park, NY",
        image: "https://picsum.photos/300/200?random=5"
      }
    ]

    const mockHints: Hint[] = [
      {
        id: "hint1",
        title: "The Ancient Library",
        description: "Look for the stone lion guarding the entrance to knowledge. The first clue lies beneath its mighty paw.",
        foundAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: "hint2", 
        title: "The Golden Fountain",
        description: "Where water dances in the moonlight and coins make wishes come true, search for the symbol of the crescent moon.",
        foundAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: "hint3",
        title: "The Secret Garden",
        description: "Behind the rose that never wilts, a secret passage awaits. Count the petals to unlock the mystery."
      }
    ]

    const selectedHunt = mockHunts.find(h => h.id === huntId)
    setHunt(selectedHunt ?? null)
    
    // Mock: Set if user is joined to this hunt (true for hunt "1")
    setIsJoined(huntId === "1")
    
    // Mock: Set if user has any current hunt (true for demonstration)
    setHasCurrentHunt(true)
    
    // Show hints only if joined
    if (huntId === "1") {
      setHints(mockHints)
    } else {
      setHints([])
    }
  }, [huntId])

  return {
    hunt,
    hints,
    isJoined,
    hasCurrentHunt,
    setIsJoined,
    setHasCurrentHunt,
    setHints
  }
}
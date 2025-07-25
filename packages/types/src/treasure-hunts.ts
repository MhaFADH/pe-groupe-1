import type { z } from "zod"

import type {
  treasureHints,
  treasureHintsUser,
  treasureHuntImages,
  treasureHuntLandmarks,
  treasureHuntParticipants,
  treasureHuntSteps,
  treasureHuntWinnings,
  treasureHunts,
} from "@pe/db"
import type { CreateTreasureHuntSchema, HintSchema } from "@pe/schemas"

import { type UserType } from "./user"

export type TreasureHuntType = typeof treasureHunts.$inferSelect
export type TreasureHintUserType = typeof treasureHintsUser.$inferSelect
export type TreasureHintType = typeof treasureHints.$inferSelect
export type TreasureHuntParticipantType =
  typeof treasureHuntParticipants.$inferSelect
export type TreasureHuntImageType = typeof treasureHuntImages.$inferSelect

export type CreateTreasureHunt = z.infer<typeof CreateTreasureHuntSchema>

export type TreasureHuntWinningsType = typeof treasureHuntWinnings.$inferSelect
export type TreasureHuntStepType = typeof treasureHuntSteps.$inferSelect
export type TreasureHuntLandmarkType = typeof treasureHuntLandmarks.$inferSelect

export type FullTreasureHintType = TreasureHintType & {
  users: TreasureHintUserType[]
}

export type FullTreasureHuntType = TreasureHuntType & {
  winner: UserType | null
  creator: UserType
  participants: TreasureHuntParticipantType[]
  images: TreasureHuntImageType[]
  hints: FullTreasureHintType[]
}

export type Hint = z.infer<typeof HintSchema>

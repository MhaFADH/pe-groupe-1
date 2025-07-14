import { relations } from "drizzle-orm"
import {
  boolean,
  doublePrecision,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

import { timestamps } from "../helpers"
import { treasureHints } from "./treasure-hints"
import { treasureHuntImages } from "./treasure-hunt-images"
import { treasureHuntLandmarks } from "./treasure-hunt-landmarks"
import { treasureHuntParticipants } from "./treasure-hunt-participants"
import { treasureHuntSteps } from "./treasure-hunt-steps"
import { treasureHuntWinnings } from "./treasure-hunt-winnings"
import { users } from "./users"

export const treasureHunts = pgTable("treasure_hunts", {
  id: uuid().defaultRandom().primaryKey(),
  title: text().notNull(),
  description: text(),
  latitude: doublePrecision().notNull(),
  longitude: doublePrecision().notNull(),
  // If null there is no limit of participants
  maxParticipants: integer(),
  participationFees: integer().default(0).notNull(),
  // Maximum can be set to one day, so 86400 seconds
  diggingTime: integer().default(60).notNull(),
  // If null the player can not pay to dig again
  diggingCost: integer(),
  // If is private the creator must add the participants manually
  isPrivate: boolean().default(false).notNull(),
  startDate: timestamp().notNull(),
  // If null time is unlimited
  endDate: timestamp(),
  grade: integer(),
  ...timestamps,
  // Only users who are 'players' can be added
  winnerId: uuid().references(() => users.id),
  location: text().notNull(),
  // Only users who are 'organizers' or 'partners' can be added
  creatorId: uuid()
    .references(() => users.id)
    .notNull(),
})

export const treasureHuntsRelations = relations(
  treasureHunts,
  ({ one, many }) => ({
    winner: one(users, {
      fields: [treasureHunts.winnerId],
      references: [users.id],
      relationName: "winner",
    }),
    creator: one(users, {
      fields: [treasureHunts.creatorId],
      references: [users.id],
      relationName: "creator",
    }),
    winnings: many(treasureHuntWinnings),
    steps: many(treasureHuntSteps),
    landmarks: many(treasureHuntLandmarks),
    participants: many(treasureHuntParticipants),
    images: many(treasureHuntImages),
    hints: many(treasureHints),
  }),
)

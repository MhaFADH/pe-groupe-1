import { relations } from "drizzle-orm"
import {
  integer,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

import { treasureHunts } from "./treasure-hunts"
import { users } from "./users"

export const treasureHuntParticipants = pgTable(
  "treasure_hunt_participants",
  {
    treasureHuntId: uuid().references(() => treasureHunts.id),
    // The user who created the treasure hunt cannot participate in it
    userId: uuid().references(() => users.id),
    lastAttempt: timestamp(),
    // If null it means there are no steps for the hunt
    currentStep: integer(),
  },
  (t) => [primaryKey({ columns: [t.treasureHuntId, t.userId] })],
)

export const treasureHuntParticipantsRelations = relations(
  treasureHuntParticipants,
  ({ one }) => ({
    hunt: one(treasureHunts, {
      fields: [treasureHuntParticipants.treasureHuntId],
      references: [treasureHunts.id],
    }),
    user: one(users, {
      fields: [treasureHuntParticipants.userId],
      references: [users.id],
    }),
  }),
)

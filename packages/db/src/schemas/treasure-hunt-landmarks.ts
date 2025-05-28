import { relations } from "drizzle-orm"
import { doublePrecision, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core"

import { treasureHunts } from "./treasure-hunts"
import { users } from "./users"

export const treasureHuntLandmarks = pgTable(
  "treasure_hunt_landmarks",
  {
    treasureHuntId: uuid().references(() => treasureHunts.id),
    // The user who created the treasure hunt cannot be added
    userId: uuid().references(() => users.id),
    latitude: doublePrecision().notNull(),
    longitude: doublePrecision().notNull(),
  },
  (t) => [
    primaryKey({
      columns: [t.treasureHuntId, t.userId, t.latitude, t.longitude],
    }),
  ],
)

export const treasureHuntLandmarksRelations = relations(
  treasureHuntLandmarks,
  ({ one }) => ({
    hunt: one(treasureHunts, {
      fields: [treasureHuntLandmarks.treasureHuntId],
      references: [treasureHunts.id],
    }),
    user: one(users, {
      fields: [treasureHuntLandmarks.userId],
      references: [users.id],
    }),
  }),
)

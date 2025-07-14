import { relations } from "drizzle-orm"
import { doublePrecision, pgTable, uuid } from "drizzle-orm/pg-core"

import { treasureHintsUser } from "./treasure-hints-user"
import { treasureHunts } from "./treasure-hunts"

export const treasureHints = pgTable("treasure_hints", {
  id: uuid().defaultRandom().primaryKey(),
  latitude: doublePrecision().notNull(),
  longitude: doublePrecision().notNull(),
  treasureHuntId: uuid()
    .references(() => treasureHunts.id)
    .notNull(),
})

export const treasureHintsRelations = relations(
  treasureHints,
  ({ many, one }) => ({
    users: many(treasureHintsUser),
    hunt: one(treasureHunts, {
      fields: [treasureHints.id],
      references: [treasureHunts.id],
    }),
  }),
)

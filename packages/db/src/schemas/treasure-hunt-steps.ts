import { relations } from "drizzle-orm"
import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core"

import { treasureHunts } from "./treasure-hunts"

export const validationKeyEnum = pgEnum("validation_key", [
  "hunt_discovery",
  "passphrase",
  "landmark",
])

export const treasureHuntSteps = pgTable("treasure_hunt_steps", {
  treasureHuntId: uuid()
    .references(() => treasureHunts.id)
    .notNull(),
  order: integer().notNull(),
  clue: text().notNull(),
  validationKey: validationKeyEnum().notNull(),
  validationData: text().notNull(),
})

export const treasureHuntStepsRelations = relations(
  treasureHuntSteps,
  ({ one }) => ({
    hunt: one(treasureHunts, {
      fields: [treasureHuntSteps.treasureHuntId],
      references: [treasureHunts.id],
    }),
  }),
)

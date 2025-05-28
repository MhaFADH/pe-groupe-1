import { relations } from "drizzle-orm"
import { integer, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core"

import { treasureHunts } from "./treasure-hunts"
import { winnings } from "./winnings"

export const treasureHuntWinnings = pgTable(
  "treasure_hunt_winnings",
  {
    treasureHuntId: uuid().references(() => treasureHunts.id),
    winningId: integer().references(() => winnings.id),
    coins: integer().default(0).notNull(),
    conditionOfAward: text().notNull(),
  },
  (t) => [primaryKey({ columns: [t.treasureHuntId, t.winningId] })],
)

export const treasureHuntWinningsRelations = relations(
  treasureHuntWinnings,
  ({ one }) => ({
    hunt: one(treasureHunts, {
      fields: [treasureHuntWinnings.treasureHuntId],
      references: [treasureHunts.id],
    }),
    winning: one(winnings, {
      fields: [treasureHuntWinnings.winningId],
      references: [winnings.id],
    }),
  }),
)

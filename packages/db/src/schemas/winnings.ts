import { relations } from "drizzle-orm"
import { pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core"

import { createdAt } from "../helpers"
import { treasureHuntWinnings } from "./treasure-hunt-winnings"
import { userWinnings } from "./user-winnings"

export const categoryEnum = pgEnum("category", ["intern", "extern"])

export const typeEnum = pgEnum("type", ["artefact", "discount", "hardware"])

export const rarityEnum = pgEnum("winning_rarity", [
  "common",
  "rare",
  "epic",
  "legendary",
])

export const winnings = pgTable("winnings", {
  id: serial().primaryKey(),
  category: categoryEnum().notNull(),
  type: typeEnum().notNull(),
  name: text().notNull(),
  description: text(),
  rarity: rarityEnum().default("common").notNull(),
  data: text(),
  createdAt,
})

export const winningsRelations = relations(winnings, ({ many }) => ({
  userWinnings: many(userWinnings),
  huntWinnings: many(treasureHuntWinnings),
}))

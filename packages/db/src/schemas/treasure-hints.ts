import { doublePrecision, pgTable, uuid } from "drizzle-orm/pg-core"

export const treasureHints = pgTable("treasure_hints", {
  id: uuid().defaultRandom().primaryKey(),
  latitude: doublePrecision().notNull(),
  longitude: doublePrecision().notNull(),
})

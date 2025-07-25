import { relations } from "drizzle-orm"
import { date, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core"

import { treasureHints } from "./treasure-hints"
import { users } from "./users"

export const treasureHintsUser = pgTable(
  "treasure_hints_user",
  {
    userId: uuid()
      .references(() => users.id)
      .notNull(),
    hintId: uuid()
      .references(() => treasureHints.id)
      .notNull(),
    foundAt: date("found_at").notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.hintId] })],
)

export const treasureHintsUserRelations = relations(
  treasureHintsUser,
  ({ one }) => ({
    user: one(users, {
      fields: [treasureHintsUser.userId],
      references: [users.id],
    }),
    hint: one(treasureHints, {
      fields: [treasureHintsUser.hintId],
      references: [treasureHints.id],
    }),
  }),
)

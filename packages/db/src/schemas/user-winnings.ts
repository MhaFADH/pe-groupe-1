import { relations } from "drizzle-orm"
import {
  integer,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

import { users } from "./users"
import { winnings } from "./winnings"

export const userWinnings = pgTable(
  "user_winnings",
  {
    userId: uuid().references(() => users.id),
    winningId: integer().references(() => winnings.id),
    obtainedAt: timestamp().defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.winningId] })],
)

export const userWinningsRelations = relations(userWinnings, ({ one }) => ({
  user: one(users, {
    fields: [userWinnings.userId],
    references: [users.id],
  }),
  winning: one(winnings, {
    fields: [userWinnings.winningId],
    references: [winnings.id],
  }),
}))

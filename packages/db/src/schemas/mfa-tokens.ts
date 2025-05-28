import { relations } from "drizzle-orm"
import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core"

import { createdAt } from "../helpers"
import { users } from "./users"

export const mfaTokens = pgTable("mfa_tokens", {
  id: serial().primaryKey(),
  userId: uuid()
    .references(() => users.id)
    .notNull(),
  otpCode: text().notNull(),
  createdAt,
  expiresAt: timestamp().notNull(),
})

export const mfaTokenRelations = relations(mfaTokens, ({ one }) => ({
  user: one(users, { fields: [mfaTokens.userId], references: [users.id] }),
}))

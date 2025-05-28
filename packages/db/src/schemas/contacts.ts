import { pgTable, serial, text } from "drizzle-orm/pg-core"

import { createdAt } from "../helpers"

export const contacts = pgTable("contacts", {
  id: serial().primaryKey(),
  email: text().notNull(),
  content: text().notNull(),
  createdAt,
})

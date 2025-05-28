import { pgTable, serial, text } from "drizzle-orm/pg-core"

import { createdAt } from "../helpers"

export const images = pgTable("images", {
  id: serial().primaryKey(),
  name: text().notNull(),
  key: text().unique().notNull(),
  createdAt,
})

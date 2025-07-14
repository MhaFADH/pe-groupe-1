import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core"

import { timestamps } from "../helpers"
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
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.userId, t.hintId] })],
)

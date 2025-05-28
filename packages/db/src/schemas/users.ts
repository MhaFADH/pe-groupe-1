import { relations } from "drizzle-orm"
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

import { timestamps } from "../helpers"
import { images } from "./images"
import { mfaTokens } from "./mfa-tokens"
import { treasureHuntLandmarks } from "./treasure-hunt-landmarks"
import { treasureHuntParticipants } from "./treasure-hunt-participants"
import { treasureHunts } from "./treasure-hunts"
import { userWinnings } from "./user-winnings"

export const roleEnum = pgEnum("role", [
  "player",
  "organizer",
  "partner",
  "admin",
])

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  role: roleEnum().notNull(),
  nickname: text().notNull(),
  email: text().unique().notNull(),
  password: text().notNull(),
  firstName: text(),
  lastName: text(),
  age: date(),
  coins: integer().default(0).notNull(),
  isMfaEnabled: boolean().default(false).notNull(),
  ...timestamps,
  deletedAt: timestamp(),
  imageId: integer().references(() => images.id),
})

export const usersRelations = relations(users, ({ one, many }) => ({
  image: one(images, { fields: [users.imageId], references: [images.id] }),
  mfaTokens: many(mfaTokens),
  winnings: many(userWinnings),
  wonHunts: many(treasureHunts, { relationName: "winner" }),
  createdHunts: many(treasureHunts, { relationName: "creator" }),
  landmarks: many(treasureHuntLandmarks),
  participations: many(treasureHuntParticipants),
}))

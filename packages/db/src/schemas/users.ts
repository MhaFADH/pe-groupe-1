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
  auth0Id: text().unique().notNull(),
  role: roleEnum().notNull().default("player"),
  email: text().unique().notNull(),
  name: text().notNull(),
  nickname: text(),
  firstName: text(),
  lastName: text(),
  age: date(),
  coins: integer().default(0).notNull(),
  isMfaEnabled: boolean().default(false).notNull(),
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

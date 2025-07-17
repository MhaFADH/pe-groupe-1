import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { logger } from "hono/logger"

import { treasureHintsUser } from "@pe/db"
import { PostTreasureHintsUser } from "@pe/schemas"

import auth from "../middleware/auth"

const treasureHintsUserRoutes = new Hono()

treasureHintsUserRoutes.post(
  "/",
  auth(),
  logger(),
  zValidator("json", PostTreasureHintsUser),
  async ({ req, var: { db, fail, send, user } }) => {
    if (!user) {
      return fail("notFound")
    }

    const { hintId } = req.valid("json")

    const newHint = await db
      .insert(treasureHintsUser)
      .values({ userId: user.id, hintId })
      .returning()

    return send({ newHint })
  },
)

export default treasureHintsUserRoutes

import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"

import { treasureHunts } from "@pe/db"
import { CreateTreasureHuntSchema } from "@pe/schemas"

import auth from "../middleware/auth"

const app = new Hono().post(
  "/",
  auth(),
  zValidator("json", CreateTreasureHuntSchema),
  async ({ req, var: { send, db, authUserId } }) => {
    const {
      title,
      description,
      isPublic,
      maxParticipants,
      endDate,
      latitude,
      longitude,
    } = req.valid("json")

    await db.insert(treasureHunts).values({
      title,
      description,
      isPrivate: !isPublic,
      startDate: new Date(),
      maxParticipants,
      endDate,
      creatorId: authUserId,
      latitude,
      longitude,
      // Placeholder for location, to be replaced with actual logic
      location: "PLACEHOLDER",
    })

    return send("Treasure hunt created successfully")
  },
)

export default app

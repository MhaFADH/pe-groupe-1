import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"

import { treasureHunts } from "@pe/db"
import { CreateTreasureHunt } from "@pe/schemas"

const app = new Hono().post(
  "/",
  zValidator("json", CreateTreasureHunt),
  async ({ req, var: { send, db } }) => {
    const {
      title,
      description,
      isPublic,
      numberOfPlayers,
      worldType,
      endDate,
    } = req.valid("json")

    await db.insert(treasureHunts).values({
      title,
      description,
      isPrivate: !isPublic,
      startDate: new Date(),
      maxParticipants: numberOfPlayers,
      worldType,
      endDate,
      // Add user id when auth is implemented
      creatorId: "1",
      // Add required fields with placeholder values or extract from req.valid("json")
      latitude: 0,
      longitude: 0,
    })

    return send("Treasure hunt created successfully")
  },
)

export default app

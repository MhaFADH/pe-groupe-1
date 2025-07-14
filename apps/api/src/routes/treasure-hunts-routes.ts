import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"

import { treasureHunts } from "@pe/db"
import { CreateTreasureHuntSchema } from "@pe/schemas"

import auth from "../middleware/auth"

const treasureHuntsRoutes = new Hono()

treasureHuntsRoutes.post(
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

treasureHuntsRoutes.get(
  "/",
  auth(),
  async ({ var: { send, db } }) => {
    const hunts = await db.query.treasureHunts.findMany({
      with: {
        creator: true,
        images: true,
        
      },
    })

    return send(hunts)
  },
)



export default treasureHuntsRoutes

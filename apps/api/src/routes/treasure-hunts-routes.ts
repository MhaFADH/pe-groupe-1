import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { logger } from "hono/logger"

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
  logger(),
  async ({ var: { send, db, user } }) => {
    const allHunts = await db.query.treasureHunts.findMany({
      with: {
        winner: true,
        images: true,
        hints: {
          with: {
            users: true,
          },
        },
        participants: true,
      },
    })

    const currentUserHunt =
      allHunts.find((hunt) =>
        hunt.participants.some((p) => p.userId === user?.id),
      ) ?? null

    return send({ allHunts, currentUserHunt })
  },
)

export default treasureHuntsRoutes

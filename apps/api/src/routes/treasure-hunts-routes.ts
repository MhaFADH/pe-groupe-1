import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { logger } from "hono/logger"

import { eq, treasureHunts } from "@pe/db"
import { CreateTreasureHuntSchema } from "@pe/schemas"

import auth from "../middleware/auth"
import participationRoutes from "./hunt/participation-routes"

const treasureHuntsRoutes = new Hono()

treasureHuntsRoutes.route("/participation", participationRoutes)

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

treasureHuntsRoutes.get(
  "/:id",
  auth(),
  logger(),
  async ({ req, var: { send, db, fail } }) => {
    const { id } = req.param()

    const hunt = await db.query.treasureHunts.findFirst({
      where: eq(treasureHunts.id, id),
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

    if (!hunt) {
      return fail("notFound")
    }

    return send(hunt)
  },
)

export default treasureHuntsRoutes

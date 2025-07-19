import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { logger } from "hono/logger"

import { eq, treasureHints, treasureHunts } from "@pe/db"
import { CreateTreasureHuntSchema, PatchTreasureHuntWin } from "@pe/schemas"

import auth from "../middleware/auth"
import participationRoutes from "./hunt/participation-routes"

const treasureHuntsRoutes = new Hono()

treasureHuntsRoutes.route("/participation", participationRoutes)

treasureHuntsRoutes.post(
  "/",
  auth(),
  zValidator("json", CreateTreasureHuntSchema),
  logger(),
  async ({ req, var: { send, fail, db, user } }) => {
    const {
      title,
      description,
      isPublic,
      maxParticipants,
      endDate,
      latitude,
      longitude,
      hints,
    } = req.valid("json")

    if (!user) {
      return fail("notFound")
    }

    const [hunt] = await db
      .insert(treasureHunts)
      .values({
        title,
        description,
        isPrivate: !isPublic,
        startDate: new Date(),
        maxParticipants,
        endDate,
        creatorId: user.id,
        latitude,
        longitude,
        // Placeholder for location, to be replaced with actual logic
        location: "PLACEHOLDER",
      })
      .returning({ id: treasureHunts.id })

    if (!hunt) {
      return fail("failToCreateHunt")
    }

    await db.insert(treasureHints).values(
      hints.map((hint) => ({
        ...hint,
        treasureHuntId: hunt.id,
      })),
    )

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
  async ({ req, var: { send, db, fail, user: userContext } }) => {
    const { id } = req.param()

    if (!id || !userContext) {
      return fail("notFound")
    }

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

    const foundHints = hunt?.hints.filter((hint) =>
      hint.users.some((user) => user.userId === userContext.id),
    )

    if (!hunt) {
      return fail("notFound")
    }

    return send({ hunt, foundHints })
  },
)

treasureHuntsRoutes.patch(
  "/win",
  auth(),
  logger(),
  zValidator("json", PatchTreasureHuntWin),
  async ({ req, var: { db, fail, send, user } }) => {
    if (!user) {
      return fail("notFound")
    }

    const { huntId, latitude, longitude } = req.valid("json")

    const hunt = await db.query.treasureHunts.findFirst({
      columns: { latitude: true, longitude: true, winnerId: true },
      where: eq(treasureHunts.id, huntId),
    })

    if (!hunt) {
      return fail("notFound")
    }

    if (hunt.winnerId) {
      return send({ success: false, message: "Someone already won!" })
    }

    if (hunt.latitude !== latitude || hunt.longitude !== longitude) {
      return send({ success: false, message: "Bad coordinates!" })
    }

    await db
      .update(treasureHunts)
      .set({ winnerId: user.id })
      .where(eq(treasureHunts.id, huntId))

    return send({ success: true, message: "You win!" })
  },
)

export default treasureHuntsRoutes

import { Hono } from "hono"
import { logger } from "hono/logger"

import { and, eq, treasureHuntParticipants } from "@pe/db"

import auth from "../../middleware/auth"

const participationRoutes = new Hono()

participationRoutes.post(
  "/:huntId/join",
  auth(),
  logger(),
  async ({ req, var: { send, db, fail, user } }) => {
    const { huntId } = req.param()

    if (!user || !huntId) {
      return fail("notFound")
    }

    const userParticipations = await db.query.treasureHuntParticipants.findMany(
      {
        where: eq(treasureHuntParticipants.userId, user.id),
        with: {
          hunt: {
            columns: {
              winnerId: true,
            },
          },
        },
      },
    )

    const isInOngoingHunt = userParticipations.some(
      (p) => p.hunt && p.hunt.winnerId === null,
    )

    if (isInOngoingHunt) {
      return fail("alreadyInHunt")
    }

    await db.insert(treasureHuntParticipants).values({
      treasureHuntId: huntId,
      userId: user.id,
    })

    return send("Successfully joined the hunt")
  },
)

participationRoutes.delete(
  "/:huntId/leave",
  auth(),
  logger(),
  async ({ req, var: { send, db, user, fail } }) => {
    const { huntId } = req.param()

    if (!user || !huntId) {
      return fail("notFound")
    }

    const participation = await db.query.treasureHuntParticipants.findFirst({
      where: and(
        eq(treasureHuntParticipants.userId, user.id),
        eq(treasureHuntParticipants.treasureHuntId, huntId),
      ),
      with: {
        hunt: true,
      },
    })

    if (!participation) {
      return fail("notInHunt")
    }

    if (participation.hunt?.winnerId) {
      return fail("huntFinished")
    }

    await db
      .delete(treasureHuntParticipants)
      .where(
        and(
          eq(treasureHuntParticipants.userId, user.id),
          eq(treasureHuntParticipants.treasureHuntId, huntId),
        ),
      )

    return send("Successfully left the hunt")
  },
)

export default participationRoutes

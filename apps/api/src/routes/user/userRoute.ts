import { Hono } from "hono"
import { logger } from "hono/logger"

import { eq, users } from "@pe/db"

import auth from "../../middleware/auth.js"
import auth0ManagementClient from "../../services/userManagementClient.js"
import { type Auth0User } from "./../../types/auth0"

const userRoute = new Hono()

userRoute.basePath("/user")

userRoute.get(
  "/sync",
  auth(false),
  logger(),
  async ({ var: { fail, send, db, authUserId } }) => {
    const dbUser = await db.query.users.findFirst({
      columns: { id: true },
      where: eq(users.auth0Id, authUserId),
    })

    if (dbUser) {
      return send({ message: "User already synced" })
    }

    try {
      const authUser = await auth0ManagementClient
        .get(`users/${authUserId}`)
        .then((response) => response.data as Auth0User)

      await db.insert(users).values({
        auth0Id: authUserId,
        email: authUser.email,
        name: authUser.name,
        nickname: authUser.nickname,
      })

      return send({ message: "User synced successfully" })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to sync user:", err)

      return fail("failedToSync")
    }
  },
)

export default userRoute

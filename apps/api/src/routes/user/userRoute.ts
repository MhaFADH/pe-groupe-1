import { Hono } from "hono"
import { logger } from "hono/logger"

import { eq, users } from "@pe/db"

import auth, { type AuthVariables } from "../../middleware/auth.js"
import auth0ManagementClient from "../../services/userManagementClient.js"
import { type Auth0User } from "./../../types/auth0"

const userRoute = new Hono<{ Variables: AuthVariables }>()

userRoute.basePath("/user")

userRoute.get("/sync", auth(false), logger(), async (c) => {
  const authUserId = c.get("authUserId")
  const db = c.get("db")
  const dbUser = await db.query.users.findFirst({
    columns: { id: true },
    where: eq(users.auth0Id, authUserId),
  })

  if (dbUser) {
    return c.json({ message: "User already synced" }, 200)
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

    return c.json({ message: "User synced successfully" }, 200)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to sync user:", err)

    return c.json({ error: "Failed to sync user" }, 500)
  }
})

export default userRoute

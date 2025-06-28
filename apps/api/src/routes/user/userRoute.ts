import { Hono } from "hono"

import { users as userScheme } from "@pe/db"

import auth, { type AuthVariables } from "../../middleware/auth.js"

const userRoute = new Hono<{ Variables: AuthVariables }>()

userRoute.basePath("/user")

userRoute.get("/sync", auth(false), async (c) => {
  const authUser = c.get("user")
  const db = c.get("db")

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.auth0Id, authUser.sub),
  })

  if (user) {
    return c.json({ message: "User already synced" }, 200)
  }

  await db
    .insert(userScheme)
    .values({
      auth0Id: authUser.sub,
      email: authUser.email!,
      name: authUser.name!,
    })
    .catch(() => c.json({ error: "Failed to sync user" }, 500))

  return c.json({ message: "User synced successfully" }, 200)
})

export default userRoute

import { createMiddleware } from "hono/factory"

import { db, eq, users } from "@pe/db"

import { verifyToken } from "../lib/jwks.js"

export type AuthVariables = {
  authUserId: string
  db: typeof db
}

const auth = (synced = true) =>
  createMiddleware(async (c, next): Promise<Response | void> => {
    const authHeader = c.req.header("Authorization")

    if (!authHeader?.startsWith("Bearer ")) {
      return c.json({ error: "Missing or invalid authorization header" }, 401)
    }

    try {
      const token = authHeader.replace("Bearer ", "")
      const decoded = await verifyToken(token)

      if (!decoded.sub) {
        return c.json({ error: "Invalid token - missing user ID" }, 401)
      }

      c.set("authUserId", decoded.sub)
      c.set("db", db)

      if (synced) {
        const user = await db.query.users.findFirst({
          columns: { id: true },
          where: eq(users.auth0Id, decoded.sub),
        })

        if (!user) {
          return c.json({ error: "User not synced" }, 404)
        }
      }

      return next()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("JWT verification failed:", error)

      return c.json({ error: "Invalid token" }, 401)
    }
  })

export default auth

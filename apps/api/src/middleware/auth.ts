import { createMiddleware } from "hono/factory"

import { eq, users } from "@pe/db"

import { verifyToken } from "../lib/jwks.js"

type Env = {
  Variables: {
    authUserId: string
  }
}

const auth = (synced = true) =>
  createMiddleware<Env>(
    async ({ var: { fail, db }, req, set }, next): Promise<Response | void> => {
      const authHeader = req.header("Authorization")

      if (!authHeader?.startsWith("Bearer ")) {
        return fail("missingAuthHeader")
      }

      try {
        const token = authHeader.replace("Bearer ", "")
        const decoded = await verifyToken(token)

        if (!decoded.sub) {
          return fail("invalidToken")
        }

        set("authUserId", decoded.sub)

        if (synced) {
          const user = await db.query.users.findFirst({
            columns: { id: true },
            where: eq(users.auth0Id, decoded.sub),
          })

          if (!user) {
            return fail("userNotSynced")
          }
        }

        return next()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("JWT verification failed:", error)

        return fail("invalidToken")
      }
    },
  )

export default auth

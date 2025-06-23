import { createMiddleware } from "hono/factory"

import { verifyToken } from "../lib/jwks.js"

type AuthUser = {
  sub: string
  email?: string
  name?: string
  picture?: string
}

export type AuthVariables = {
  user: AuthUser | null
}

const auth = createMiddleware(
  async ({ var: { fail }, set, req }, next): Promise<Response | void> => {
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

      set("user", decoded as AuthUser)

      return next()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("JWT verification failed:", error)

      return fail("invalidToken")
    }
  },
)

export default auth

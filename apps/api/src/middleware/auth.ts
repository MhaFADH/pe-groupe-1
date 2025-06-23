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

const auth = createMiddleware(async (c, next): Promise<Response | void> => {
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

    c.set("user", decoded as AuthUser)

    return next()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("JWT verification failed:", error)

    return c.json({ error: "Invalid token" }, 401)
  }
})

export default auth

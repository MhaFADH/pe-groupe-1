import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"

import auth, { type AuthVariables } from "./middleware/auth"
import userRoute from "./routes/user/userRoute"

const app = new Hono<{ Variables: AuthVariables }>()

app.use(cors())

const api = app.basePath("/api")

api.get("/", (c) =>
  c.json({
    message: "PE Groupe 1 API",
    status: "healthy",
    timestamp: new Date().toISOString(),
  }),
)

api.get("/test-auth", auth(), (c) => {
  const authHeader = c.req.header("Authorization")

  return c.json({
    message: "Auth test endpoint successful",
    token: authHeader
      ? `${authHeader.replace("Bearer ", "").substring(0, 20)}...`
      : null,
  })
})
api.route("/user", userRoute)

serve(
  {
    fetch: app.fetch,
    port: 5001,
  },
  (info) => {
    // eslint-disable-next-line no-console
    console.log(
      `Server running on port ${info.port}, http://localhost:${info.port}/api`,
    )
  },
)

export default app

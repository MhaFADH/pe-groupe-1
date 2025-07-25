import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"

import { Config } from "../utils/config"
import auth from "./middleware/auth"
import treasureHintsUserRoutes from "./routes/treasure-hints-user-routes"
import treasureHuntsRoutes from "./routes/treasure-hunts-routes"
import userRoute from "./routes/user/user-routes"
import { contextVariables, fail, send } from "./utils/context"

const app = new Hono().basePath("/api")

app.use(cors(), (ctx, next) => {
  Object.entries(contextVariables).forEach(([name, value]) => {
    ctx.set(name as never, value as never)
  })
  ctx.set("send", send(ctx))
  ctx.set("fail", fail(ctx))

  return next()
})

app.get("/", (c) => c.text("Hello Hono!"))

app.get("/", (c) =>
  c.json({
    message: "PE Groupe 1 API",
    status: "healthy",
    timestamp: new Date().toISOString(),
  }),
)

app.get("/test-auth", auth(), (c) => {
  const authHeader = c.req.header("Authorization")

  return c.json({
    message: "Auth test endpoint successful",
    token: authHeader
      ? `${authHeader.replace("Bearer ", "").substring(0, 20)}...`
      : null,
  })
})

app.route("/user", userRoute)
app.route("/treasure-hunts", treasureHuntsRoutes)
app.route("/treasure-hints-user", treasureHintsUserRoutes)

serve(
  {
    fetch: app.fetch,
    port: Config.apiPort ? Number(Config.apiPort) : 5001,
  },
  (info) => {
    // eslint-disable-next-line no-console
    console.log(
      `Server running on port ${info.port}, http://localhost:${info.port}/api`,
    )
  },
)

export default app

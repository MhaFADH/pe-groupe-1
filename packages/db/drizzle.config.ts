import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

config({ path: "../../.env" })

export default defineConfig({
  out: "./src/drizzle",
  schema: "./src/schemas/**",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
})

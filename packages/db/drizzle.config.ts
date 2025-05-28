import { defineConfig } from "drizzle-kit"

import { dbConfig } from "./src/config"

export default defineConfig({
  out: "./src/drizzle",
  schema: "./src/schemas/**",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: dbConfig.databaseUrl,
  },
})

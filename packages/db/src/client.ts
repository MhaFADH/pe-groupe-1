import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import { dbConfig } from "./config"
import { schema } from "./schema"

const client = neon(dbConfig.databaseUrl)

export const db = drizzle({
  casing: "snake_case",
  client,
  schema,
})

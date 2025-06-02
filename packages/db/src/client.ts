import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/neon-http"
import { z } from "zod"

import { schema } from "./schema"

config({ path: "../../.env" })

const dbSchema = z.object({
  databaseUrl: z
    .string({
      message: "No 'DATABASE_URL' environment variable is provided!",
    })
    .min(1, "'DATABASE_URL' environment variable is empty!"),
})

const { databaseUrl } = dbSchema.parse({
  databaseUrl: process.env.DATABASE_URL,
})

const client = neon(databaseUrl)

export const db = drizzle({
  casing: "snake_case",
  client,
  schema,
})

import { config } from "dotenv"
import { z } from "zod"

config({ path: "../../.env" })

const dbSchema = z.object({
  databaseUrl: z
    .string({
      message: "No 'DATABASE_URL' environment variable is provided!",
    })
    .min(1, "'DATABASE_URL' environment variable is empty!"),
})

export const dbConfig = dbSchema.parse({
  databaseUrl: process.env.DATABASE_URL,
})

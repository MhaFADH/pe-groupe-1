import { config } from "dotenv"
import { z } from "zod"

config({ path: "../../.env" })

const envSchema = z.object({
  databaseUrl: z.string().min(1, "DATABASE_URL is required"),
  apiPort: z.number().min(4, "API_PORT is required").optional(),
  auth0: z.object({
    domain: z.string().min(1, "AUTH0_DOMAIN is required"),
    audience: z.string().min(1, "AUTH0_AUDIENCE is required"),
  }),
  auth0ManagementApi: z.object({
    clientId: z.string().min(1, "AUTH0_MANAGEMENT_API_CLIENT_ID is required"),
    clientSecret: z
      .string()
      .min(1, "AUTH0_MANAGEMENT_API_CLIENT_SECRET is required"),
  }),
  s3: z.object({
    S3_ACCESS_KEY_ID: z.string().min(1, "S3_ACCESS_KEY_ID is required"),
    S3_ACCESS_KEY_SECRET: z.string().min(1, "S3_SECRET_ACCESS_KEY is required"),
    S3_BUCKET_NAME: z.string().min(1, "S3_BUCKET_NAME is required"),
    S3_REGION: z.string().min(1, "S3_REGION is required"),
    S3_ENDPOINT: z.string().optional(),
  }),
})

export const Config = envSchema.parse({
  databaseUrl: process.env.DATABASE_URL,
  apiPort: process.env.EXPO_PUBLIC_API_PORT ?? "5001",
  auth0: {
    domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN,
    audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
  },
  auth0ManagementApi: {
    clientId: process.env.AUTH0_MANAGEMENT_API_CLIENT_ID,
    clientSecret: process.env.AUTH0_MANAGEMENT_API_CLIENT_SECRET,
  },
  s3: {
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_ACCESS_KEY_SECRET: process.env.S3_ACCESS_KEY_SECRET,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_REGION: process.env.S3_REGION,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
  },
})

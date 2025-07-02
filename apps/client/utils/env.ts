import { z } from "zod"

const envSchema = z.object({
  api: z.object({
    baseUrl: z.string().url(),
    port: z.string().optional(),
  }),
  auth0: z.object({
    domain: z.string(),
    clientId: z.string(),
    audience: z.string(),
    redirectUri: z.object({
      web: z.string(),
      mobile: z.string(),
    }),
  }),
})

const getEnv = () =>
  envSchema.parse({
    api: {
      baseUrl: process.env.EXPO_PUBLIC_API_URL,
      port: process.env.EXPO_PUBLIC_API_PORT,
    },
    auth0: {
      domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN,
      clientId: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID,
      audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
      redirectUri: {
        web: process.env.EXPO_PUBLIC_AUTH0_WEB_REDIRECT_URI,
        mobile: process.env.EXPO_PUBLIC_AUTH0_MOBILE_REDIRECT_URI,
      },
    },
  })

export default getEnv

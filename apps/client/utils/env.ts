import { z } from "zod"

const envSchema = z.object({
  auth0: z.object({
    domain: z.string(),
    clientId: z.string(),
    redirectUri: z.object({
      web: z.string(),
      mobile: z.string(),
    }),
  }),
})

const getEnv = () =>
  envSchema.parse({
    auth0: {
      domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN,
      clientId: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID,
      redirectUri: {
        web: process.env.EXPO_PUBLIC_AUTH0_WEB_REDIRECT_URI,
        mobile: process.env.EXPO_PUBLIC_AUTH0_MOBILE_REDIRECT_URI,
      },
    },
  })

export default getEnv

import { z } from "zod"

const schema = z.object({
  store: z.object({
    theme: z.string(),
  }),
})

const config = schema.parse({
  store: {
    theme: "pe-theme",
  },
})

export default config

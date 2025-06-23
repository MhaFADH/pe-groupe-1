import { z } from "zod"

export const CreateTreasureHunt = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  endDate: z.date().optional(),
  isPublic: z.boolean(),
  numberOfPlayers: z
    .number()
    .min(1)
    .or(z.literal("").transform(() => null)),
  worldType: z.enum(["real", "cartographic"]),
})

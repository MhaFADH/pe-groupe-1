import { z } from "zod"

export const CreateTreasureHunt = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  endDate: z.date().nullable(),
  isPublic: z.boolean(),
  numberOfPlayers: z.number().min(0),
  worldType: z.enum(["real", "cartographic"]),
})

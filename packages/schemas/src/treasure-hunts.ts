import { z } from "zod"

export const CreateTreasureHuntSchema = z.object({
  title: z.string().min(1, "titleRequired").min(3, "titleMinLength"),
  description: z.string().max(500, "descriptionMaxLength").optional(),
  isPublic: z.boolean(),
  maxParticipants: z.number().min(1, "maxParticipantsMin"),
  endDate: z.date().nullable().optional(),
  latitude: z.number(),
  longitude: z.number(),
})

export const PatchTreasureHuntWin = z.object({
  huntId: z.string().uuid(),
  latitude: z.number(),
  longitude: z.number(),
})

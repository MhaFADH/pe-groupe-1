import { z } from "zod"

export const HintSchema = z.object({
  title: z.string().min(1, "hintTitleRequired").min(3, "hintTitleMinLength"),
  description: z
    .string()
    .min(1, "hintDescriptionRequired")
    .max(500, "hintDescriptionMaxLength"),
  latitude: z.number(),
  longitude: z.number(),
})

export const CreateTreasureHuntSchema = z.object({
  title: z.string().min(1, "titleRequired").min(3, "titleMinLength"),
  description: z.string().max(500, "descriptionMaxLength").optional(),
  isPublic: z.boolean(),
  maxParticipants: z.coerce.number().min(1, "maxParticipantsMin"),
  endDate: z.date().nullable().optional(),
  latitude: z.number(),
  longitude: z.number(),
  hints: z.array(HintSchema).optional(),
})

export const PatchTreasureHuntWin = z.object({
  huntId: z.string().uuid(),
  latitude: z.number(),
  longitude: z.number(),
})

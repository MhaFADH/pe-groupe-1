import { z } from "zod"

export const createHuntFormSchema = z.object({
  title: z.string().min(1, "titleRequired").min(3, "titleMinLength"),
  description: z.string().max(500, "descriptionMaxLength").optional(),
  isPublic: z.boolean(),
  maxParticipants: z.number().min(1, "maxParticipantsMin"),
  endDate: z.date().nullable().optional(),
  latitude: z.number(),
  longitude: z.number(),
})

export type CreateHuntFormData = z.infer<typeof createHuntFormSchema>

export const defaultFormValues: CreateHuntFormData = {
  title: "",
  description: "",
  isPublic: true,
  maxParticipants: 10,
  endDate: null,
  // Default to San Francisco
  latitude: 37.78825,
  longitude: -122.4324,
}

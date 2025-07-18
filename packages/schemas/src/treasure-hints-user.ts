import z from "zod"

export const PostTreasureHintsUser = z.object({ hintId: z.string().uuid() })

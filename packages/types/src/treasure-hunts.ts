import type { z } from "zod"

import type { CreateTreasureHuntSchema } from "@pe/schemas"

export type CreateTreasureHunt = z.infer<typeof CreateTreasureHuntSchema>

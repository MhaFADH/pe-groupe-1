import type { z } from "zod"

import type { CreateTreasureHunt } from "@pe/schemas"

export type CreateTreasureHuntInput = z.infer<typeof CreateTreasureHunt>

import { timestamp } from "drizzle-orm/pg-core"

const baseTimestamp = timestamp().defaultNow().notNull()

export const createdAt = baseTimestamp

export const timestamps = {
  createdAt,
  updatedAt: baseTimestamp.$onUpdate(() => new Date()),
}

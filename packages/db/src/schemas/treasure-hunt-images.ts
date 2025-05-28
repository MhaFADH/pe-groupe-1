import { relations } from "drizzle-orm"
import { integer, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core"

import { images } from "./images"
import { treasureHunts } from "./treasure-hunts"

export const treasureHuntImages = pgTable(
  "treasure_hunt_images",
  {
    treasureHuntId: uuid().references(() => treasureHunts.id),
    imageId: integer().references(() => images.id),
  },
  (t) => [primaryKey({ columns: [t.treasureHuntId, t.imageId] })],
)

export const treasureHuntImagesRelations = relations(
  treasureHuntImages,
  ({ one }) => ({
    hunt: one(treasureHunts, {
      fields: [treasureHuntImages.treasureHuntId],
      references: [treasureHunts.id],
    }),
    image: one(images, {
      fields: [treasureHuntImages.imageId],
      references: [images.id],
    }),
  }),
)

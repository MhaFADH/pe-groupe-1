import { type FullTreasureHuntType } from "@pe/types"

export type TreasureHuntFetchResponse = {
  allHunts: FullTreasureHuntType[]
  currentUserHunt: FullTreasureHuntType | null
}

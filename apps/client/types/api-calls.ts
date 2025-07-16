import { type FullTreasureHuntType } from "@pe/types"

export type TreasureHuntFetchResponse = {
  result: {
    allHunts: FullTreasureHuntType[]
    currentUserHunt: FullTreasureHuntType | null
  }
}

export type TreasureHuntDetailsResponse = { result: FullTreasureHuntType }

/* eslint-disable @typescript-eslint/no-floating-promises */
import * as Location from "expo-location"
import { getDistance } from "geolib"
import { useCallback, useEffect, useState } from "react"

import { type TreasureHintType } from "@pe/types"

type Coords = { latitude: number; longitude: number }

const DISTANCE_INTERVAL = 10

const usePlayableMap = (
  hintsData: TreasureHintType[],
  proximityThreshold: number,
) => {
  const [location, setLocation] = useState<Coords | null>(null)
  const [hints, setHints] = useState<TreasureHintType[]>([])
  const [selectedHint, setSelectedHint] = useState<TreasureHintType | null>(
    null,
  )

  const setSelectedHintCallback = useCallback(
    (hint: TreasureHintType | null) => () => setSelectedHint(hint),
    [],
  )

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null

    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== Location.PermissionStatus.GRANTED) {
        return
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: DISTANCE_INTERVAL,
        },
        ({ coords: { latitude, longitude } }) => {
          setLocation({ latitude, longitude })
        },
      )
    })()

    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (!location) {
      return
    }

    const nearbyHints = hintsData.filter(({ latitude, longitude }) => {
      const distance = getDistance(location, { latitude, longitude })

      return distance <= proximityThreshold
    })

    setHints((prev) => {
      const existingIds = new Set(prev.map(({ id }) => id))

      const newHints = nearbyHints.filter(({ id }) => !existingIds.has(id))

      if (newHints.length === 0) {
        return prev
      }

      setSelectedHint(newHints[0]!)

      return [...prev, ...newHints]
    })
  }, [hintsData, location, proximityThreshold])

  return { location, hints, selectedHint, setSelectedHintCallback }
}

export default usePlayableMap

/* eslint-disable @typescript-eslint/no-floating-promises */
import * as Location from "expo-location"
import { getDistance } from "geolib"
import { useCallback, useEffect, useState } from "react"

type Coords = { latitude: number; longitude: number }

export type Marker = { id: number; title: string; description: string } & Coords

const DISTANCE_INTERVAL = 10

const usePlayableMap = (markersData: Marker[], proximityThreshold: number) => {
  const [location, setLocation] = useState<Coords | null>(null)
  const [markers, setMarkers] = useState<Marker[]>([])
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null)

  const setSelectedMarkerCallback = useCallback(
    (marker: Marker | null) => () => setSelectedMarker(marker),
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

    const nearbyMarkers = markersData.filter(({ latitude, longitude }) => {
      const distance = getDistance(location, { latitude, longitude })

      return distance <= proximityThreshold
    })

    setMarkers((prev) => {
      const existingIds = new Set(prev.map((m) => m.id))

      const newMarkers = nearbyMarkers.filter((m) => !existingIds.has(m.id))

      if (newMarkers.length === 0) {
        return prev
      }

      setSelectedMarkerCallback(newMarkers[0]!)()

      return [...prev, ...newMarkers]
    })
  }, [location, markersData, proximityThreshold, setSelectedMarkerCallback])

  return { location, markers, selectedMarker, setSelectedMarkerCallback }
}

export default usePlayableMap

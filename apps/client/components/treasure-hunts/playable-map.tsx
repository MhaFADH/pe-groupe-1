/* eslint-disable @typescript-eslint/no-floating-promises */
import * as Location from "expo-location"
import { getDistance } from "geolib"
import { useEffect, useState } from "react"
import MapView, { Marker as MapMarker } from "react-native-maps"

type Coords = { latitude: number; longitude: number }

type Marker = { id: number; title: string } & Coords

const markersData: Marker[] = [
  { id: 1, title: "Marker 1", latitude: 48.93951, longitude: 2.23559 },
  { id: 2, title: "Marker 2", latitude: 48.93945, longitude: 2.2357 },
  { id: 3, title: "Marker 3", latitude: 48.93947, longitude: 2.23561 },
]

const PROXIMITY_THRESHOLD = 5

const PlayableMap = () => {
  const [location, setLocation] = useState<Coords | null>(null)
  const [markers, setMarkers] = useState<Marker[]>([])

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

      return distance <= PROXIMITY_THRESHOLD
    })

    setMarkers((prev) => {
      const existingIds = new Set(prev.map((m) => m.id))
      const newMarkers = nearbyMarkers.filter((m) => !existingIds.has(m.id))

      if (newMarkers.length === 0) {
        return prev
      }

      return [...prev, ...newMarkers]
    })
  }, [location])

  if (!location) {
    return null
  }

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        ...location,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
      showsUserLocation
    >
      {markers.map(({ id, latitude, longitude, title }) => (
        <MapMarker
          key={id}
          coordinate={{ latitude, longitude }}
          title={title}
          pinColor="gold"
        />
      ))}
    </MapView>
  )
}

export default PlayableMap

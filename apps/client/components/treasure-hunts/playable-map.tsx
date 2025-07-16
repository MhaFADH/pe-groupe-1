import MapView, { Circle, Marker as MapMarker } from "react-native-maps"

import MarkerModal from "@/components/treasure-hunts/marker-modal"
import usePlayableMap, { type Marker } from "@/hooks/use-playable-map"

const markersData: Marker[] = [
  {
    id: 1,
    title: "Marker 1",
    description: "Lorem ipsum 1...",
    latitude: 48.93951,
    longitude: 2.23559,
  },
  {
    id: 2,
    title: "Marker 2",
    description: "Lorem ipsum 2...",
    latitude: 48.93945,
    longitude: 2.2357,
  },
  {
    id: 3,
    title: "Marker 3",
    description: "Lorem ipsum 3...",
    latitude: 48.93947,
    longitude: 2.23561,
  },
  {
    id: 4,
    title: "Marker 4",
    description: "Lorem ipsum 4...",
    latitude: 48.86817,
    longitude: 2.35368,
  },
]

const PROXIMITY_THRESHOLD = 15

const PlayableMap = () => {
  const { location, markers, selectedMarker, setSelectedMarkerCallback } =
    usePlayableMap(markersData, PROXIMITY_THRESHOLD)

  if (!location) {
    return null
  }

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          ...location,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        showsUserLocation
      >
        <Circle
          center={location}
          radius={PROXIMITY_THRESHOLD}
          fillColor="green"
          strokeColor="black"
        />

        {markers.map((marker) => (
          <MapMarker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description="Select marker again to see the details!"
            pinColor="gold"
            onSelect={setSelectedMarkerCallback(marker)}
          />
        ))}
      </MapView>

      <MarkerModal
        marker={selectedMarker}
        onClose={setSelectedMarkerCallback(null)}
      />
    </>
  )
}

export default PlayableMap

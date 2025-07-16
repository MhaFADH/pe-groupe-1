import MapView, { Circle, Marker as MapMarker } from "react-native-maps"

import { type TreasureHintType } from "@pe/types"

import MarkerModal from "@/components/treasure-hunts/marker-modal"
import usePlayableMap from "@/hooks/use-playable-map"

const hintsData: TreasureHintType[] = [
  {
    id: "1",
    title: "Hint 1",
    description: "Lorem ipsum 1...",
    latitude: 48.93951,
    longitude: 2.23559,
    treasureHuntId: "1",
  },
  {
    id: "2",
    title: "Hint 2",
    description: "Lorem ipsum 2...",
    latitude: 48.93945,
    longitude: 2.2357,
    treasureHuntId: "1",
  },
  {
    id: "3",
    title: "Hint 3",
    description: "Lorem ipsum 3...",
    latitude: 48.93947,
    longitude: 2.23561,
    treasureHuntId: "1",
  },
  {
    id: "4",
    title: "Hint 4",
    description: "Lorem ipsum 4...",
    latitude: 48.86817,
    longitude: 2.35368,
    treasureHuntId: "1",
  },
]

const PROXIMITY_THRESHOLD = 15

const PlayableMap = () => {
  const { location, hints, selectedHint, setSelectedHintCallback } =
    usePlayableMap(hintsData, PROXIMITY_THRESHOLD)

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

        {hints.map((hint) => (
          <MapMarker
            key={hint.id}
            coordinate={{
              latitude: hint.latitude,
              longitude: hint.longitude,
            }}
            title={hint.title}
            description="Select hint again to see the details!"
            pinColor="gold"
            onSelect={setSelectedHintCallback(hint)}
          />
        ))}
      </MapView>

      <MarkerModal
        hint={selectedHint}
        onClose={setSelectedHintCallback(null)}
      />
    </>
  )
}

export default PlayableMap

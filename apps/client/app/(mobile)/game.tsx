import { useRef, useState } from "react"
import { View } from "react-native"
import MapView, { Marker as MapMarker } from "react-native-maps"

import { type TreasureHintType } from "@pe/types"

import GameHeader from "@/components/treasure-hunts/game-header"
import MarkerModal from "@/components/treasure-hunts/marker-modal"
import SonarOverlay from "@/components/ui/map/sonar-effect"
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
    treasureHuntId: "4",
  },
  {
    id: "5",
    title: "Hint 5",
    description: "Lorem ipsum 5...",
    latitude: 48.94243,
    longitude: 2.25084,
    treasureHuntId: "1",
  },
  {
    id: "6",
    title: "Hint 6",
    description: "Lorem ipsum 6...",
    latitude: 48.9425,
    longitude: 2.25071,
    treasureHuntId: "1",
  },
]

const PROXIMITY_THRESHOLD = 15

const PlayableMap = () => {
  const { location, hints, selectedHint, setSelectedHintCallback } =
    usePlayableMap(hintsData, PROXIMITY_THRESHOLD)

  const [isARMode, setIsARMode] = useState(false)
  const [mapType, setMapType] = useState<"standard" | "hybrid">("standard")
  const mapRef = useRef<MapView>(null)

  if (!location) {
    return null
  }

  return (
    <>
      <GameHeader
        isARMode={isARMode}
        setIsARMode={setIsARMode}
        mapType={mapType}
        setMapType={setMapType}
      />

      <View className="flex-1 relative">
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            ...location,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          mapType={mapType}
          showsUserLocation
        >
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
        <SonarOverlay mapRef={mapRef} userLocation={location} />
      </View>

      <MarkerModal
        hint={selectedHint}
        onClose={setSelectedHintCallback(null)}
      />
    </>
  )
}

export default PlayableMap

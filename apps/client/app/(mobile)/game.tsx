import { useQuery } from "@tanstack/react-query"
import { useLocalSearchParams } from "expo-router"
import { useRef, useState } from "react"
import { View } from "react-native"

import { type TreasureHintType } from "@pe/types"

import GameHeader from "@/components/treasure-hunts/game-header"
import MarkerModal from "@/components/treasure-hunts/marker-modal"
import SonarOverlay from "@/components/ui/map/sonar-effect"
import usePlayableMap from "@/hooks/use-playable-map"
import MapView, { Marker } from "@/packages/maps/react-native-maps"
import apiClient from "@/services/api/apiClient"
import { type TreasureHuntDetailsResponse } from "@/types/api-calls"

const fetchHuntDetails = async (huntId: string) => {
  const req = await apiClient.get<TreasureHuntDetailsResponse>(
    `/treasure-hunts/${huntId}`,
  )

  const { hunt, foundHints } = req.data.result

  const defaultHints: TreasureHintType[] = foundHints.map(
    ({ users: _, ...hint }) => hint,
  )

  const hintsData: TreasureHintType[] = hunt.hints.map(
    ({ users: _, ...hint }) => hint,
  )

  hintsData.push({
    id: hunt.id,
    title: hunt.title,
    description: "",
    latitude: hunt.latitude,
    longitude: hunt.longitude,
    treasureHuntId: hunt.id,
  })

  return { defaultHints, hintsData }
}

const PROXIMITY_THRESHOLD = 15

type Params = { huntId: string }

const PlayableMap = () => {
  const { huntId } = useLocalSearchParams<Params>()

  const { data, isSuccess } = useQuery({
    queryKey: ["game", huntId],
    queryFn: () => fetchHuntDetails(huntId),
    enabled: Boolean(huntId),
  })

  const defaultHints = data?.defaultHints ?? []
  const hintsData = data?.hintsData ?? []

  const { location, hints, selectedHint, setSelectedHintCallback } =
    usePlayableMap({
      huntId,
      isSuccess,
      defaultHints,
      hintsData,
      proximityThreshold: PROXIMITY_THRESHOLD,
    })

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
            <Marker
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

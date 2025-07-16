import * as Location from "expo-location"
import React, { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Alert, Pressable, Text, TextInput, View } from "react-native"

import { useTheme } from "@/components/contexts"
import MapView, {
  type MapPressEvent,
  Marker,
} from "@/packages/maps/react-native-maps"

import { darkMapStyle } from "./map-styles"

type LocationPickerProps = {
  latitude: number
  longitude: number
  onLocationSelect: (latitude: number, longitude: number) => void
  error?: string
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  latitude,
  longitude,
  onLocationSelect,
  error,
}) => {
  const { t } = useTranslation()
  const { colorScheme } = useTheme()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const getCurrentLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== Location.PermissionStatus.GRANTED) {
        setLoading(false)

        return
      }

      const location = await Location.getCurrentPositionAsync({})
      const { latitude: lat, longitude: lng } = location.coords
      onLocationSelect(lat, lng)
      setLoading(false)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("Error getting current location:", err)
      setLoading(false)
    }
  }, [onLocationSelect])

  useEffect(() => {
    void getCurrentLocation()
  }, [getCurrentLocation])

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude: lat, longitude: lng } = event.nativeEvent.coordinate
    onLocationSelect(lat, lng)
  }

  const searchLocation = async () => {
    if (!searchQuery.trim()) {
      return
    }

    setIsSearching(true)

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery,
        )}&limit=1`,
      )
      const data = (await response.json()) as {
        lat: string
        lon: string
        display_name: string
      }[]

      if (data.length > 0) {
        const [result] = data

        if (result) {
          const lat = parseFloat(result.lat)
          const lng = parseFloat(result.lon)

          onLocationSelect(lat, lng)
          setSearchQuery("")
        }
      } else {
        Alert.alert(t("searchLocationError"), t("searchLocationNotFound"))
      }
    } catch (searchError) {
      // eslint-disable-next-line no-console
      console.warn("Search error:", searchError)
      Alert.alert(t("searchLocationError"), t("searchLocationFailed"))
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <View className="gap-3">
      <View className="flex-row gap-2">
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t("searchLocationPlaceholder")}
          placeholderTextColor="#9CA3AF"
          className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 h-12 text-gray-900 dark:text-white text-base"
          onSubmitEditing={searchLocation}
          returnKeyType="search"
        />
        <Pressable
          onPress={searchLocation}
          disabled={isSearching || !searchQuery.trim()}
          className={`
            bg-primary rounded-xl px-4 py-3 h-12 justify-center items-center min-w-[50px]
            ${isSearching || !searchQuery.trim() ? "opacity-50" : ""}
          `}
        >
          <Text className="text-white font-medium text-base">
            {isSearching ? "..." : "🔍"}
          </Text>
        </Pressable>
      </View>

      <View
        className="rounded-xl overflow-hidden"
        style={{ backgroundColor: "transparent" }}
      >
        <MapView
          style={{ height: 176, width: "100%" }}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleMapPress}
          customMapStyle={colorScheme === "dark" ? darkMapStyle : []}
          showsUserLocation={false}
          showsMyLocationButton={false}
          zoomEnabled={true}
          scrollEnabled={true}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title={t("selectLocation")}
          />
        </MapView>
      </View>

      <Text className="text-xs text-gray-500 dark:text-gray-400 text-center">
        {loading ? "Getting your location..." : t("tapToSelectLocation")}
      </Text>

      <View className="flex-row gap-3">
        <View className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-600">
          <Text className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            {t("latitude")}
          </Text>
          <Text className="text-sm text-gray-900 dark:text-white">
            {latitude.toFixed(6)}
          </Text>
        </View>

        <View className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-600">
          <Text className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            {t("longitude")}
          </Text>
          <Text className="text-sm text-gray-900 dark:text-white">
            {longitude.toFixed(6)}
          </Text>
        </View>
      </View>

      {error && (
        <Text className="text-xs text-primary font-medium text-center">
          {error}
        </Text>
      )}
    </View>
  )
}

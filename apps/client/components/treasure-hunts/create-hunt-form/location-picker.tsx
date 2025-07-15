import Geolocation from "@react-native-community/geolocation"
import React, { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Alert,
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native"
import MapView, { type MapPressEvent, Marker } from "react-native-maps"

import { useTheme } from "@/components/contexts"

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

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION

        if (!permission) {
          return false
        }

        const granted = await PermissionsAndroid.request(permission, {
          title: "Location Permission",
          message:
            "This app needs access to location to show your current position.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        })

        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(err)

        return false
      }
    }

    return true
  }

  const getCurrentLocation = useCallback(async () => {
    const hasPermission = await requestLocationPermission()

    if (!hasPermission) {
      setLoading(false)

      return
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords
        onLocationSelect(lat, lng)
        setLoading(false)
      },
      (locationError) => {
        // eslint-disable-next-line no-console
        console.warn("Error getting location:", locationError)
        // Silently fail - just set loading to false and keep default location
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    )
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
      // Use Nominatim OpenStreetMap geocoding service (free)
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
      {/* Search Bar */}
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

      {/* Map */}
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

import * as Location from "expo-location"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Alert, Pressable, Text, TextInput, View } from "react-native"

import { useTheme } from "@/components/contexts"

type LocationPickerProps = {
  latitude: number
  longitude: number
  onLocationSelect: (latitude: number, longitude: number) => void
  error?: string
}

export const LocationPickerWeb: React.FC<LocationPickerProps> = ({
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
  const isMounted = useRef(false)
  const mapRef = useRef<HTMLDivElement>(null)

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
      console.warn("Error getting current location:", err)
      setLoading(false)
    }
  }, [onLocationSelect])

  useEffect(() => {
    if (isMounted.current) {
      return
    }

    isMounted.current = true
    void getCurrentLocation()
  }, [getCurrentLocation])

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
      console.warn("Search error:", searchError)
      Alert.alert(t("searchLocationError"), t("searchLocationFailed"))
    } finally {
      setIsSearching(false)
    }
  }

  // Store map and marker references
  const mapInstanceRef = useRef<any>(null)
  const markerRef = useRef<any>(null)

  // Initialize interactive map using Leaflet (only once)
  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && !mapInstanceRef.current) {
      // Load Leaflet CSS and JS
      const loadLeaflet = async () => {
        // Check if Leaflet is already loaded
        if (!(window as any).L) {
          // Load CSS
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          document.head.appendChild(link)

          // Load JS
          const script = document.createElement('script')
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
          script.onload = initMap
          document.head.appendChild(script)
        } else {
          initMap()
        }
      }

      const initMap = () => {
        const L = (window as any).L
        if (!L || !mapRef.current || mapInstanceRef.current) return

        // Create map only once
        const map = L.map(mapRef.current).setView([latitude, longitude], 15)
        mapInstanceRef.current = map

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map)

        // Add marker
        const marker = L.marker([latitude, longitude], {
          draggable: true
        }).addTo(map)
        markerRef.current = marker

        // Handle marker drag
        marker.on('dragend', (e: any) => {
          const position = e.target.getLatLng()
          onLocationSelect(position.lat, position.lng)
        })

        // Handle map click
        map.on('click', (e: any) => {
          const { lat, lng } = e.latlng
          marker.setLatLng([lat, lng])
          onLocationSelect(lat, lng)
        })
      }

      loadLeaflet()
    }
  }, []) // Remove dependencies to initialize only once

  // Update marker position when coordinates change (separate effect)
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      markerRef.current.setLatLng([latitude, longitude])
      mapInstanceRef.current.setView([latitude, longitude])
    }
  }, [latitude, longitude])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        markerRef.current = null
      }
    }
  }, [])

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

      {/* Interactive Map */}
      <View className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
        <div
          ref={mapRef}
          style={{
            width: '100%',
            height: 300,
            background: '#f3f4f6'
          }}
        />
      </View>

      {/* Coordinate Display and Manual Input */}
      <View className="flex-row gap-3">
        <View className="flex-1">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("latitude")}
          </Text>
          <TextInput
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-900 dark:text-white text-base"
            placeholder="37.78825"
            value={latitude.toFixed(6)}
            onChangeText={(text) => {
              const lat = parseFloat(text)
              if (!isNaN(lat) && lat >= -90 && lat <= 90) {
                onLocationSelect(lat, longitude)
              }
            }}
            keyboardType="numeric"
          />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("longitude")}
          </Text>
          <TextInput
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-900 dark:text-white text-base"
            placeholder="-122.4324"
            value={longitude.toFixed(6)}
            onChangeText={(text) => {
              const lng = parseFloat(text)
              if (!isNaN(lng) && lng >= -180 && lng <= 180) {
                onLocationSelect(latitude, lng)
              }
            }}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Text className="text-xs text-gray-500 dark:text-gray-400 text-center">
        {loading ? "Getting your location..." : "Click on the map to select a location, drag the marker, or enter coordinates manually"}
      </Text>

      {error && (
        <Text className="text-xs text-red-500 font-medium text-center">
          {error}
        </Text>
      )}
    </View>
  )
}
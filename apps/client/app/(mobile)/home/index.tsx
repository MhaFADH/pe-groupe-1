import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { t } from "i18next"
import { useEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import type { FullTreasureHuntType } from "@pe/types"

import { CurrentHuntBox, HuntCard } from "@/components"
import { useAuthManager } from "@/components/contexts"
import { ErrorDisplay } from "@/components/ui/error-display"
import { LoadingIndicator } from "@/components/ui/loading-indicator"
import apiClient from "@/services/api/apiClient"
import type { TreasureHuntFetchResponse } from "@/types/api-calls"
import { useThemeColor } from "@/utils/colors"

const HomePage = () => {
  const { isAuthenticated } = useAuthManager()
  const { getThemeColor } = useThemeColor()
  const router = useRouter()

  const [currentHunt, setCurrentHunt] = useState<FullTreasureHuntType | null>(
    null,
  )
  const [availableHunts, setAvailableHunts] = useState<FullTreasureHuntType[]>(
    [],
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(mobile)")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true)
      setError(null)

      void apiClient
        .get<TreasureHuntFetchResponse>("/treasure-hunts")
        .then((result) => {
          const { allHunts, currentUserHunt } = result.data
          setAvailableHunts(allHunts)
          setCurrentHunt(currentUserHunt)
        })
        .catch(() => {
          setError("Failed to fetch hunts. Please try again later.")
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [isAuthenticated])

  if (loading) {
    return <LoadingIndicator />
  }

  if (error) {
    return <ErrorDisplay message={error} />
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView
        className="flex-1 px-6 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.delay(100)} className="mb-6">
          <Text className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {t("welcomeHome")}
          </Text>
          <Text className="text-gray-600 dark:text-gray-300">
            {t("readyForAdventure")}
          </Text>
        </Animated.View>

        <CurrentHuntBox currentHunt={currentHunt} />

        <Animated.View entering={FadeIn.delay(400)} className="w-full">
          <Text className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            {t("availableHunts")}
          </Text>
          {availableHunts.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
              contentContainerStyle={{ paddingRight: 24 }}
            >
              {availableHunts.map((hunt) => (
                <HuntCard
                  key={hunt.id}
                  hunt={hunt}
                  onPress={() => router.push(`/explore/${hunt.id}`)}
                  width={264}
                />
              ))}
            </ScrollView>
          ) : (
            <View className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 items-center">
              <View className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 items-center justify-center mb-4">
                <Ionicons
                  name="compass-outline"
                  size={32}
                  color={getThemeColor("gray-400", "gray-500")}
                />
              </View>
              <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-2 text-center">
                {t("noHuntsAvailable")}
              </Text>
              <Text className="text-gray-600 dark:text-gray-300 text-center mb-6 text-sm">
                {t("noHuntsMessage")}
              </Text>
              <TouchableOpacity
                className="bg-primary-600 dark:bg-primary-500 py-2 px-4 rounded-lg"
                onPress={() => router.replace("/create-hunts")}
              >
                <Text className="text-white font-semibold text-center">
                  {t("createHunt")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  )
}

export default HomePage

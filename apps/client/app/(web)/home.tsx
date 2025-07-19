import { Ionicons } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { t } from "i18next"
import { useEffect } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import { CurrentHuntBox, HuntCard } from "@/components"
import { useAuthManager } from "@/components/contexts"
import { ErrorDisplay } from "@/components/ui/error-display"
import { LoadingIndicator } from "@/components/ui/loading-indicator"
import apiClient from "@/services/api/apiClient"
import type { TreasureHuntFetchResponse } from "@/types/api-calls"
import { useThemeColor } from "@/utils/colors"

export const fetchHunts = async () => {
  const response =
    await apiClient.get<TreasureHuntFetchResponse>("/treasure-hunts")

  return response.data.result
}

const HomeWeb = () => {
  const { isAuthenticated } = useAuthManager()
  const { getThemeColor } = useThemeColor()
  const router = useRouter()

  const {
    data: hunts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hunts"],
    queryFn: fetchHunts,
    enabled: isAuthenticated,
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [])

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (error) {
    return <ErrorDisplay message={t("errorLoadingHunts")} />
  }

  const currentHunt = hunts?.currentUserHunt
  const availableHunts = hunts?.allHunts

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView
        className="flex-1 px-6 md:px-24 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.delay(100)} className="mb-6">
          <Text className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {t("welcomeHome")}
          </Text>
          <Text className="text-gray-600 dark:text-gray-300 text-lg">
            {t("readyForAdventure")}
          </Text>
        </Animated.View>

        <CurrentHuntBox currentHunt={currentHunt ?? null} />

        <Animated.View entering={FadeIn.delay(400)} className="w-full">
          <Text className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {t("availableHunts")}
          </Text>
          {availableHunts && availableHunts.length > 0 ? (
            <View className="flex-row flex-wrap gap-6 justify-center md:justify-start">
              {availableHunts.map((hunt) => (
                <View key={hunt.id} className="w-full md:w-80">
                  <HuntCard
                    hunt={hunt}
                    onPress={() =>
                      router.push({
                        pathname: "/explore/hunt-details",
                        params: {
                          huntId: hunt.id,
                          currentHuntId: currentHunt?.id,
                        },
                      })
                    }
                  />
                </View>
              ))}
            </View>
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
                className="bg-primary-600 dark:bg-primary-500 py-3 px-6 rounded-lg"
                onPress={() => router.push("/create-hunt")}
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

export default HomeWeb

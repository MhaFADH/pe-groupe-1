import { Ionicons } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { t } from "i18next"
import { useEffect } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import { HuntCard, LoadingIndicator } from "@/components"
import { useAuthManager } from "@/components/contexts"
import { ErrorDisplay } from "@/components/ui/error-display"
import { useThemeColor } from "@/utils/colors"

import { fetchHunts } from "./home"

const ExploreWeb = () => {
  const { getThemeColor } = useThemeColor()
  const { isAuthenticated } = useAuthManager()
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

  const handleHuntPress = (huntId: string) => {
    if (!huntId) {
      return
    }

    router.push({
      pathname: "/explore/hunt-details",
      params: {
        huntId,
        currentHuntId: hunts?.currentUserHunt?.id,
      },
    })
  }

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (error) {
    return <ErrorDisplay message={t("errorLoadingHunts")} />
  }

  if (!hunts) {
    return <ErrorDisplay message={t("noHuntsAvailable")} />
  }

  const CurrentHuntHeader = () => {
    if (!hunts.currentUserHunt) {
      return null
    }

    return (
      <Animated.View entering={FadeIn.delay(100)} className="mb-6">
        <View className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6 border border-primary-200 dark:border-primary-700">
          <View className="flex-row items-center mb-2">
            <Ionicons
              name="play-circle"
              size={24}
              color={getThemeColor("primary-600", "primary-400")}
            />
            <Text className="text-primary-700 dark:text-primary-300 ml-2 font-semibold text-lg">
              {t("yourCurrentHunt")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleHuntPress(hunts.currentUserHunt?.id ?? "")}
            className="flex-row items-center justify-between"
          >
            <Text className="text-xl font-bold text-primary-800 dark:text-primary-200">
              {hunts.currentUserHunt.title}
            </Text>
            <Ionicons
              name="arrow-forward"
              size={24}
              color={getThemeColor("primary-600", "primary-400")}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView
        className="flex-1 px-6 md:px-24 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.delay(100)} className="mb-6">
          <Text className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {t("exploreHunts")}
          </Text>
          <Text className="text-gray-600 dark:text-gray-300 text-lg">
            {t("exploreHuntsDescription")}
          </Text>
        </Animated.View>

        <CurrentHuntHeader />

        <Animated.View entering={FadeIn.delay(200)} className="mb-6">
          <Text className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {t("availableHunts")}
          </Text>
        </Animated.View>

        <View className="flex-row flex-wrap gap-6 justify-center md:justify-start mb-6">
          {hunts.allHunts.map((hunt) => (
            <View key={hunt.id} className="relative w-full md:w-80">
              <HuntCard hunt={hunt} onPress={() => handleHuntPress(hunt.id)} />
              {hunts.currentUserHunt?.id === hunt.id && (
                <View className="absolute top-2 right-2 bg-primary-600 dark:bg-primary-500 px-3 py-1 rounded-full">
                  <View className="flex-row items-center">
                    <Ionicons name="checkmark-circle" size={14} color="white" />
                    <Text className="text-white ml-1 font-medium text-sm">
                      {t("joined")}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-8 right-8 z-10">
        <TouchableOpacity
          onPress={() => router.push("/create-hunt")}
          className="bg-primary-600 dark:bg-primary-500 rounded-full w-16 h-16 items-center justify-center shadow-lg"
          accessibilityLabel={t("createHunt")}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ExploreWeb

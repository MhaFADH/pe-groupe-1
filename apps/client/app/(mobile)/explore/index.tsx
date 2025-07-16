import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { t } from "i18next"
import { useEffect, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import type { FullTreasureHuntType, TreasureHuntType } from "@pe/types"

import { HuntCard, LoadingIndicator } from "@/components"
import { useAuthManager } from "@/components/contexts"
import { ErrorDisplay } from "@/components/ui/error-display"
import apiClient from "@/services/api/apiClient"
import { type TreasureHuntFetchResponse } from "@/types/api-calls"
import { useThemeColor } from "@/utils/colors"

const ExplorePage = () => {
  const { getThemeColor } = useThemeColor()
  const { isAuthenticated } = useAuthManager()
  const router = useRouter()

  const [currentHunt, setCurrentHunt] = useState<FullTreasureHuntType | null>(
    null,
  )
  const [availableHunts, setAvailableHunts] = useState<
    FullTreasureHuntType[] | null
  >(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(mobile)")
    }

    setLoading(true)
    setError(null)

    void apiClient
      .get<TreasureHuntFetchResponse>("/treasure-hunts")
      .then((result) => {
        const { allHunts, currentUserHunt } = result.data.result
        setAvailableHunts(allHunts)
        setCurrentHunt(currentUserHunt)
      })
      .catch(() => {
        setError("Failed to fetch hunts. Please try again later.")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [isAuthenticated, router])

  const handleHuntPress = (huntId: string) => {
    router.push({
      pathname: "/explore/hunt-details",
      params: {
        huntId,
        currentHuntId: currentHunt?.id,
      },
    })
  }

  if (loading) {
    return <LoadingIndicator />
  }

  if (error) {
    return <ErrorDisplay message={error} />
  }

  const renderHuntItem = ({ item }: { item: TreasureHuntType }) => (
    <View className="px-4 mb-4">
      <View
        className={
          currentHunt?.id === item.id
            ? "border-2 border-primary-500 rounded-2xl"
            : ""
        }
      >
        <HuntCard hunt={item} onPress={() => handleHuntPress(item.id)} />
        {currentHunt?.id === item.id && (
          <View className="absolute top-2 right-2 bg-primary-600 dark:bg-primary-500 px-2 py-1 rounded-full">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={12} color="white" />
              <Text className="text-white ml-1 font-medium text-xs">
                {t("joined")}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )

  const CurrentHuntHeader = () => {
    if (!currentHunt) {
      return null
    }

    return (
      <Animated.View entering={FadeIn.delay(100)} className="px-6 py-4">
        <View className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-4 border border-primary-200 dark:border-primary-700">
          <View className="flex-row items-center mb-2">
            <Ionicons
              name="play-circle"
              size={20}
              color={getThemeColor("primary-600", "primary-400")}
            />
            <Text className="text-primary-700 dark:text-primary-300 ml-2 font-semibold">
              {t("yourCurrentHunt")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleHuntPress(currentHunt.id)}
            className="flex-row items-center justify-between"
          >
            <Text className="text-lg font-bold text-primary-800 dark:text-primary-200">
              {currentHunt.title}
            </Text>
            <Ionicons
              name="arrow-forward"
              size={20}
              color={getThemeColor("primary-600", "primary-400")}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <FlatList
        data={availableHunts}
        renderItem={renderHuntItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <CurrentHuntHeader />
            <Animated.View entering={FadeIn.delay(200)} className="px-6 py-2">
              <Text className="text-xl font-bold text-gray-800 dark:text-white">
                {t("availableHunts")}
              </Text>
            </Animated.View>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
      <TouchableOpacity
        onPress={() => router.push("/create-hunts")}
        className="absolute bottom-8 right-8 bg-primary-600 dark:bg-primary-500 rounded-full w-16 h-16 items-center justify-center shadow-lg"
        accessibilityLabel={t("createHunt")}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default ExplorePage

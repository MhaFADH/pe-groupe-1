import { Ionicons } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { t } from "i18next"
import { useEffect } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import type { TreasureHuntType } from "@pe/types"

import { HuntCard, LoadingIndicator } from "@/components"
import { useAuthManager } from "@/components/contexts"
import { ErrorDisplay } from "@/components/ui/error-display"
import { useThemeColor } from "@/utils/colors"

import { fetchHunts } from "../home"

const ExplorePage = () => {
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
      router.replace("/(mobile)/login")
    }
  }, [isAuthenticated, router])

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

  const renderHuntItem = ({ item }: { item: TreasureHuntType }) => (
    <View className="px-4 mb-4">
      <View
        className={
          hunts.currentUserHunt?.id === item.id
            ? "border-2 border-primary-500 rounded-2xl"
            : ""
        }
      >
        <HuntCard hunt={item} onPress={() => handleHuntPress(item.id)} />
        {hunts.currentUserHunt?.id === item.id && (
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
    if (!hunts.currentUserHunt) {
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
            onPress={() => handleHuntPress(hunts.currentUserHunt?.id ?? "")}
            className="flex-row items-center justify-between"
          >
            <Text className="text-lg font-bold text-primary-800 dark:text-primary-200">
              {hunts.currentUserHunt.title}
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
        data={hunts.allHunts}
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

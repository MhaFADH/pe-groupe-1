import { useLocalSearchParams, useRouter } from "expo-router"
import { t } from "i18next"
import { useEffect, useState } from "react"
import { Alert, ScrollView, Text, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import { type FullTreasureHuntType } from "@pe/types"

import { LoadingIndicator } from "@/components"
import { useAuthManager } from "@/components/contexts"
import { ErrorDisplay } from "@/components/ui/error-display"
import {
  HintsSection,
  HuntActions,
  HuntHeader,
  HuntInfo,
} from "@/components/ui/hunt-details"
import apiClient from "@/services/api/apiClient"
import { type TreasureHuntDetailsResponse } from "@/types/api-calls"

const HuntDetailsPage = () => {
  const { huntId, currentHuntId } = useLocalSearchParams<{
    huntId: string
    currentHuntId: string
  }>()

  const { isAuthenticated } = useAuthManager()
  const router = useRouter()
  const [hunt, setHunt] = useState<FullTreasureHuntType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isJoined, setIsJoined] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(mobile)")
    }

    void apiClient
      .get<TreasureHuntDetailsResponse>(`/treasure-hunts/${huntId}`)
      .then((response) => {
        const { result } = response.data
        setHunt(result)
        setIsLoading(false)
        setIsJoined(currentHuntId === result.id)
      })
      .catch(() => {
        setError("Failed to fetch hunts. Please try again later.")
        setIsLoading(false)
      })
  }, [huntId, isAuthenticated, router, currentHuntId])

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (error) {
    return <ErrorDisplay message={error} />
  }

  const handleJoinHunt = () => {
    if (currentHuntId) {
      Alert.alert(t("alreadyJoinedHunt"), t("mustLeaveCurrentHunt"), [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("viewCurrentHunt"),
          onPress: () =>
            router.push({
              pathname: "/explore/hunt-details",
              params: {
                huntId: currentHuntId,
                currentHuntId,
              },
            }),
        },
      ])

      return
    }

    Alert.alert(t("success"), t("youHaveJoinedHunt"))
  }

  const handleLeaveHunt = () => {
    Alert.alert(t("leaveHunt"), t("areYouSureLeaveHunt"), [
      {
        text: t("cancel"),
        style: "cancel",
      },
      {
        text: t("leaveHunt"),
        style: "destructive",
        onPress: () => {
          Alert.alert(t("leftHunt"), t("youHaveLeftHunt"))
        },
      },
    ])
  }

  const handlePlayHunt = () => {
    Alert.alert(t("playHuntTitle"), t("huntGameplayStart"))
  }

  if (!hunt) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Text className="text-gray-600 dark:text-gray-300">Hunt not found</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HuntHeader hunt={hunt} />

        <View className="px-6 py-6">
          <Animated.View entering={FadeIn.delay(200)}>
            <HuntInfo hunt={hunt} />

            <HuntActions
              isJoined={isJoined}
              onJoinHunt={handleJoinHunt}
              onLeaveHunt={handleLeaveHunt}
              onPlayHunt={handlePlayHunt}
            />

            <HintsSection hints={hunt.hints} isJoined={isJoined} />
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  )
}

export default HuntDetailsPage

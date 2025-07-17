import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useLocalSearchParams, useRouter } from "expo-router"
import { t } from "i18next"
import { useEffect, useState } from "react"
import { Alert, ScrollView, Text, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

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
  const queryClient = useQueryClient()
  const [isJoined, setIsJoined] = useState(huntId === currentHuntId)

  const fetchHuntDetails = async () => {
    const response = await apiClient.get<TreasureHuntDetailsResponse>(
      `/treasure-hunts/${huntId}`,
    )

    return {
      foundHints: response.data.result.foundHints,
      hunt: response.data.result.hunt,
    }
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["hunt-details", huntId],
    queryFn: fetchHuntDetails,
    enabled: isAuthenticated,
  })

  const joinHuntMutation = useMutation({
    mutationFn: async () => {
      await apiClient.post(`/treasure-hunts/participation/${huntId}/join`)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["hunts"] })
      await refetch()
    },
    onError: () => {
      Alert.alert(t("error"), t("failedToJoinHunt"))
    },
  })

  const leaveHuntMutation = useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/treasure-hunts/participation/${huntId}/leave`)
    },
    onSuccess: async () => {
      setIsJoined(false)
      await queryClient.invalidateQueries({ queryKey: ["hunts"] })
      router.back()
    },
    onError: () => {
      Alert.alert(t("error"), t("failedToLeaveHunt"))
    },
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(mobile)")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (data?.hunt && joinHuntMutation.isSuccess) {
      setIsJoined(true)
    }
  }, [data?.hunt, joinHuntMutation.isSuccess])

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (error) {
    return <ErrorDisplay message={t("errorLoadingHunts")} />
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

    joinHuntMutation.mutate()
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
          leaveHuntMutation.mutate()
        },
      },
    ])
  }

  const handlePlayHunt = () => {
    router.push({
      pathname: "/game",
      params: { huntId: currentHuntId },
    })
  }

  if (!data?.hunt) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Text className="text-gray-600 dark:text-gray-300">
          {t("noHuntsAvailable")}
        </Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HuntHeader hunt={data.hunt} />

        <View className="px-6 py-6">
          <Animated.View entering={FadeIn.delay(200)}>
            <HuntInfo hunt={data.hunt} />

            <HuntActions
              isJoined={isJoined}
              onJoinHunt={handleJoinHunt}
              onLeaveHunt={handleLeaveHunt}
              onPlayHunt={handlePlayHunt}
            />

            <HintsSection hints={data.foundHints} isJoined={isJoined} />
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  )
}

export default HuntDetailsPage

import { Ionicons } from "@expo/vector-icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useLocalSearchParams, useRouter } from "expo-router"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { Alert, ScrollView, Text, View, TouchableOpacity, Image } from "react-native"

import { useAuthManager } from "@/components/contexts"
import { ErrorDisplay } from "@/components/ui/error-display"
import { LoadingIndicator } from "@/components/ui/loading-indicator"
import { Button } from "@/components/ui/button"
import apiClient from "@/services/api/apiClient"
import { type TreasureHuntDetailsResponse } from "@/types/api-calls"
import { useThemeColor } from "@/utils/colors"

const HuntDetailsWeb = () => {
  const { t } = useTranslation()
  const { getThemeColor } = useThemeColor()
  const { huntId, currentHuntId } = useLocalSearchParams<{
    huntId: string
    currentHuntId: string
  }>()

  const { isAuthenticated } = useAuthManager()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isJoined, setIsJoined] = useState(huntId === currentHuntId)

  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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
      router.replace("/")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (data?.hunt && joinHuntMutation.isSuccess) {
      setIsJoined(true)
    }
  }, [data?.hunt, joinHuntMutation.isSuccess])

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

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (error) {
    return <ErrorDisplay message={t("errorLoadingHunts")} />
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

  const hunt = data.hunt
  const foundHints = data.foundHints

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <View className="w-full h-80 relative">
            <Image
              source={{ uri: `https://picsum.photos/800/400?random=${hunt.id}` }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-black/40" />
            <View className="absolute inset-0 flex-1 items-center justify-center px-6">
              <Text className="text-4xl md:text-5xl font-bold text-white mt-4 text-center">
                {hunt.title}
              </Text>
              {isJoined && (
                <View className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mt-4">
                  <View className="flex-row items-center">
                    <Ionicons name="checkmark-circle" size={20} color="white" />
                    <Text className="text-white ml-2 font-semibold">
                      {t("joined")}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute top-8 left-6 bg-white/20 backdrop-blur-sm rounded-full p-3"
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </motion.div>

        <View className="px-6 md:px-12 lg:px-24 py-8">
          <View className="grid gap-8" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 32 }}>
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Hunt Info */}
              <View className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  {t("huntDetails")}
                </Text>
                
                {hunt.description && (
                  <View className="mb-6">
                    <Text className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {hunt.description}
                    </Text>
                  </View>
                )}

                <View className="grid gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <View className="flex-row items-center">
                    <View className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 items-center justify-center mr-4">
                      <Ionicons
                        name="people"
                        size={20}
                        color={getThemeColor("primary-600", "primary-400")}
                      />
                    </View>
                    <View>
                      <Text className="text-sm text-gray-500 dark:text-gray-400">
                        Max Participants
                      </Text>
                      <Text className="text-lg font-semibold text-gray-800 dark:text-white">
                        {hunt.maxParticipants}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center">
                    <View className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 items-center justify-center mr-4">
                      <Ionicons
                        name="location"
                        size={20}
                        color={getThemeColor("primary-600", "primary-400")}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm text-gray-500 dark:text-gray-400">
                        Location
                      </Text>
                      <Text 
                        className="text-lg font-semibold text-gray-800 dark:text-white"
                        numberOfLines={2}
                      >
                        {hunt.location}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center">
                    <View className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 items-center justify-center mr-4">
                      <Ionicons
                        name="help-circle"
                        size={20}
                        color={getThemeColor("primary-600", "primary-400")}
                      />
                    </View>
                    <View>
                      <Text className="text-sm text-gray-500 dark:text-gray-400">
                        Hints Available
                      </Text>
                      <Text className="text-lg font-semibold text-gray-800 dark:text-white">
                        {hunt.hints?.length || 0}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center">
                    <View className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 items-center justify-center mr-4">
                      <Ionicons
                        name="trophy"
                        size={20}
                        color={getThemeColor("primary-600", "primary-400")}
                      />
                    </View>
                    <View>
                      <Text className="text-sm text-gray-500 dark:text-gray-400">
                        Status
                      </Text>
                      <Text className="text-lg font-semibold text-gray-800 dark:text-white">
                        {hunt.winnerId ? "Completed" : "Active"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Hints Section */}
              <View className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  {t("hints")} ({foundHints.length}/{hunt.hints?.length || 0})
                </Text>
                
                {isJoined ? (
                  foundHints.length > 0 ? (
                    <View className="space-y-4">
                      {foundHints.map((hint, index) => (
                        <motion.div
                          key={hint.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * index }}
                        >
                          <View className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                            <View className="flex-row items-start">
                              <View className="w-8 h-8 rounded-full bg-primary-600 items-center justify-center mr-4 mt-1">
                                <Text className="text-white font-bold text-sm">
                                  {index + 1}
                                </Text>
                              </View>
                              <View className="flex-1">
                                <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                  {hint.title}
                                </Text>
                                <Text className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                  {hint.description}
                                </Text>
                                {hint.location && (
                                  <View className="flex-row items-center mt-3">
                                    <Ionicons
                                      name="location-outline"
                                      size={16}
                                      color={getThemeColor("gray-500", "gray-400")}
                                    />
                                    <Text className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                                      {hint.location}
                                    </Text>
                                  </View>
                                )}
                              </View>
                            </View>
                          </View>
                        </motion.div>
                      ))}
                    </View>
                  ) : (
                    <View className="text-center py-8">
                      <Ionicons
                        name="search"
                        size={48}
                        color={getThemeColor("gray-400", "gray-500")}
                      />
                      <Text className="text-lg font-semibold text-gray-800 dark:text-white mt-4 mb-2">
                        No hints discovered yet
                      </Text>
                      <Text className="text-gray-600 dark:text-gray-300">
                        Start playing to discover hints and find the treasure!
                      </Text>
                    </View>
                  )
                ) : (
                  <View className="text-center py-8">
                    <Ionicons
                      name="lock-closed"
                      size={48}
                      color={getThemeColor("gray-400", "gray-500")}
                    />
                    <Text className="text-lg font-semibold text-gray-800 dark:text-white mt-4 mb-2">
                      Hints are locked
                    </Text>
                    <Text className="text-gray-600 dark:text-gray-300">
                      Join this hunt to see the hints you've discovered
                    </Text>
                  </View>
                )}
              </View>
            </motion.div>

            {/* Sidebar Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 sticky top-8">
                <Text className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Actions
                </Text>
                
                <View className="space-y-4">
                  {isJoined ? (
                    <>
                      <Button
                        title={t("playHunt")}
                        variant="primary"
                        size="lg"
                        onPress={handlePlayHunt}
                        fullWidth
                      />
                      <Button
                        title={t("leaveHunt")}
                        variant="destructive"
                        size="md"
                        onPress={handleLeaveHunt}
                        fullWidth
                      />
                    </>
                  ) : (
                    <Button
                      title={t("joinHunt")}
                      variant="primary"
                      size="lg"
                      onPress={handleJoinHunt}
                      fullWidth
                      loading={joinHuntMutation.isPending}
                    />
                  )}
                </View>

                {hunt.winnerId && (
                  <View className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
                    <View className="flex-row items-center">
                      <Ionicons
                        name="trophy"
                        size={20}
                        color={getThemeColor("yellow-600", "yellow-400")}
                      />
                      <Text className="text-yellow-700 dark:text-yellow-300 ml-2 font-semibold">
                        Hunt Completed
                      </Text>
                    </View>
                    <Text className="text-yellow-600 dark:text-yellow-400 text-sm mt-1">
                      This treasure hunt has been completed
                    </Text>
                  </View>
                )}
              </View>
            </motion.div>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default HuntDetailsWeb
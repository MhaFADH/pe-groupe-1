/* eslint-disable max-lines-per-function */
import { Ionicons } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"

import { useAuthManager } from "@/components/contexts"
import { Button } from "@/components/ui/button"
import { ErrorDisplay } from "@/components/ui/error-display"
import { LoadingIndicator } from "@/components/ui/loading-indicator"
import apiClient from "@/services/api/apiClient"
import type {
  TreasureHuntFetchResponse,
  TreasureHuntType,
} from "@/types/api-calls"
import { useThemeColor } from "@/utils/colors"

export const fetchHunts = async () => {
  const response =
    await apiClient.get<TreasureHuntFetchResponse>("/treasure-hunts")
  return response.data.result
}

const SingleHuntCarousel = ({
  hunts,
  onHuntPress,
}: {
  hunts: TreasureHuntType[]
  onHuntPress: (huntId: string) => void
}) => {
  const { t } = useTranslation()
  const { getThemeColor } = useThemeColor()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (hunts.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hunts.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [hunts.length])

  if (hunts.length === 0) return null

  const currentHunt = hunts[currentIndex]

  return (
    <View className="w-full">
      {/* Carousel Indicators - Above the carousel */}
      {hunts.length > 1 && (
        <View className="flex-row justify-center mb-6">
          {hunts.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full mx-1 transition-colors duration-200 ${
                index === currentIndex
                  ? "bg-primary-600"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </View>
      )}

      {/* Main Carousel Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 relative"
        style={{ height: 400, minHeight: 400 }}
      >
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full"
        >
          <View className="flex-row h-full">
            {/* Image Section - Left Half */}
            <View 
              className="relative"
              style={{ width: '50%' }}
            >
              <Image
                source={{ uri: `https://picsum.photos/700/500?random=${currentHunt.id}` }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
            </View>

            {/* Information Section - Right Half */}
            <View 
              className="p-10 flex flex-col justify-between"
              style={{ width: '50%', minHeight: 400 }}
            >
              {/* Content Area */}
              <View className="flex-1 flex flex-col justify-start">
                <Text className="text-4xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
                  {currentHunt.title}
                </Text>
                
                {currentHunt.description && (
                  <Text 
                    className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8"
                    numberOfLines={4}
                  >
                    {currentHunt.description}
                  </Text>
                )}

                <View className="space-y-4 mb-8">
                  <View className="flex-row items-center">
                    <Ionicons
                      name="people"
                      size={22}
                      color={getThemeColor("primary-600", "primary-400")}
                    />
                    <Text className="text-gray-700 dark:text-gray-300 ml-4 text-lg font-medium">
                      {currentHunt.maxParticipants} {t("participants")}
                    </Text>
                  </View>
                  
                  <View className="flex-row items-center">
                    <Ionicons
                      name="location"
                      size={22}
                      color={getThemeColor("primary-600", "primary-400")}
                    />
                    <Text 
                      className="text-gray-700 dark:text-gray-300 ml-4 text-lg font-medium"
                      numberOfLines={1}
                    >
                      {currentHunt.location}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Action Button - Fixed at bottom */}
              <View className="flex-shrink-0">
                <Button
                  title={t("viewHunt")}
                  variant="primary"
                  size="lg"
                  onPress={() => onHuntPress(currentHunt.id)}
                />
              </View>
            </View>
          </View>
        </motion.div>
      </motion.div>
    </View>
  )
}

const StatsCard = ({
  icon,
  label,
  value,
}: {
  icon: string
  label: string
  value: string
}) => {
  const { getThemeColor } = useThemeColor()

  return (
    <View className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <View className="flex-row items-center">
        <View className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 items-center justify-center mr-4">
          <Ionicons
            name={icon as any}
            size={24}
            color={getThemeColor("primary-600", "primary-400")}
          />
        </View>
        <View>
          <Text className="text-2xl font-bold text-gray-800 dark:text-white">
            {value}
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-sm">
            {label}
          </Text>
        </View>
      </View>
    </View>
  )
}


const HomeWeb = () => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthManager()
  const { getThemeColor } = useThemeColor()
  const router = useRouter()

  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (error) {
    return <ErrorDisplay message={t("errorLoadingHunts")} />
  }

  const currentHunt = hunts?.currentUserHunt
  const availableHunts = hunts?.allHunts ?? []

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
          <View className="absolute inset-0 bg-black/10" />
          <View className="px-6 md:px-12 lg:px-24 py-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center flex flex-col items-center"
            >
              <Text className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {t("welcomeHome")}
              </Text>
              <Text className="text-xl text-primary-100 mb-8 leading-relaxed max-w-2xl mx-auto">
                {t("readyForAdventure")}
              </Text>

              <View className="flex-row gap-4 justify-center">
                <Button
                  title={t("exploreHunts")}
                  variant="secondary"
                  size="lg"
                  onPress={() => router.push("/explore")}
                />
                <Button
                  title={t("createHunt")}
                  variant="outline"
                  size="lg"
                  onPress={() => router.push("/create-hunts")}
                />
              </View>
            </motion.div>
          </View>
        </View>

        <View className="px-6 md:px-12 lg:px-24 py-12">
          <View className="max-w-7xl mx-auto">
            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <View className="flex-row gap-6 mb-8 justify-center md:justify-start flex-wrap">
                <View className="flex-1 min-w-64">
                  <StatsCard
                    icon="compass"
                    label={t("availableHunts")}
                    value={availableHunts.length.toString()}
                  />
                </View>
                <View className="flex-1 min-w-64">
                  <StatsCard
                    icon="trophy"
                    label={t("currentHunt")}
                    value={currentHunt ? "1" : "0"}
                  />
                </View>
                <View className="flex-1 min-w-64">
                  <StatsCard
                    icon="people"
                    label={t("participants")}
                    value={availableHunts
                      .reduce((sum, hunt) => sum + (hunt.maxParticipants || 0), 0)
                      .toString()}
                  />
                </View>
              </View>
            </motion.div>

            {currentHunt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  {t("yourCurrentHunt")}
                </Text>
                <View className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 shadow-xl">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1">
                      <Text className="text-3xl font-bold text-white mb-3">
                        {currentHunt.title}
                      </Text>
                      {currentHunt.description && (
                        <Text className="text-primary-100 mb-6 text-lg leading-relaxed">
                          {currentHunt.description}
                        </Text>
                      )}
                      <View className="flex-row items-center mb-6">
                        <Ionicons
                          name="people"
                          size={20}
                          color="rgba(255,255,255,0.8)"
                        />
                        <Text className="text-primary-100 ml-3 text-base">
                          {`${t("maxParticipants")}: ${currentHunt.maxParticipants}`}
                        </Text>
                      </View>
                      <Button
                        title={t("resumeHunt")}
                        variant="secondary"
                        size="lg"
                        onPress={() => {
                          router.push({
                            pathname: "/game",
                            params: { huntId: currentHunt.id },
                          })
                        }}
                      />
                    </View>
                    <View className="ml-8">
                      <Image
                        source={{
                          uri: `https://picsum.photos/200/150?random=${currentHunt.id}`,
                        }}
                        className="w-32 h-24 rounded-xl"
                        resizeMode="cover"
                      />
                    </View>
                  </View>
                </View>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <View className="flex-row items-center justify-between mb-8">
                <View>
                  <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {t("availableHunts")}
                  </Text>
                  <Text className="text-gray-600 dark:text-gray-400">
                    {t("exploreHuntsDescription")}
                  </Text>
                </View>
                <Button
                  title={t("exploreHunts")}
                  variant="outline"
                  size="md"
                  onPress={() => router.push("/explore")}
                />
              </View>

              {availableHunts.length > 0 ? (
                <SingleHuntCarousel
                  hunts={availableHunts}
                  onHuntPress={(huntId) =>
                    router.push({
                      pathname: "/explore/hunt-details",
                      params: {
                        huntId,
                        currentHuntId: currentHunt?.id,
                      },
                    })
                  }
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <View className="bg-white dark:bg-gray-800 rounded-2xl p-16 border border-gray-200 dark:border-gray-700 text-center">
                    <View className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 items-center justify-center mb-6 mx-auto">
                      <Ionicons
                        name="compass-outline"
                        size={40}
                        color={getThemeColor("gray-400", "gray-500")}
                      />
                    </View>
                    <Text className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                      {t("noHuntsAvailable")}
                    </Text>
                    <Text className="text-gray-600 dark:text-gray-300 text-center mb-8 text-lg max-w-lg mx-auto">
                      {t("noHuntsMessage")}
                    </Text>
                    <Button
                      title={t("createHunt")}
                      variant="primary"
                      size="lg"
                      onPress={() => router.push("/create-hunts")}
                    />
                  </View>
                </motion.div>
              )}
            </motion.div>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeWeb

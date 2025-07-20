/* eslint-disable max-lines */
import { Ionicons } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

import type { TreasureHuntType } from "@pe/types"

import { useAuthManager } from "@/components/contexts"
import { Button } from "@/components/ui/button"
import { ErrorDisplay } from "@/components/ui/error-display"
import { LoadingIndicator } from "@/components/ui/loading-indicator"
import { useThemeColor } from "@/utils/colors"

import { fetchHunts } from "../home"

const HuntGridCard = ({
  hunt,
  onPress,
  isCurrentHunt = false,
}: {
  hunt: TreasureHuntType
  onPress: () => void
  isCurrentHunt?: boolean
}) => {
  const { getThemeColor } = useThemeColor()

  return (
    <TouchableOpacity onPress={onPress} className="w-full h-full">
      <View
        className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border-2 h-full ${
          isCurrentHunt
            ? "border-primary-500 dark:border-primary-400"
            : "border-gray-200 dark:border-gray-700"
        } relative`}
      >
        {isCurrentHunt && (
          <View className="absolute top-3 right-3 bg-primary-600 dark:bg-primary-500 px-3 py-1 rounded-full z-10">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={14} color="white" />
              <Text className="text-white ml-1 font-medium text-xs">
                {t("joined")}
              </Text>
            </View>
          </View>
        )}
        <Image
          source={{ uri: `https://picsum.photos/400/200?random=${hunt.id}` }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="p-6 flex-1">
          <Text
            className="text-xl font-bold text-gray-800 dark:text-white mb-3"
            numberOfLines={2}
          >
            {hunt.title}
          </Text>
          {hunt.description && (
            <Text
              className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4"
              numberOfLines={3}
            >
              {hunt.description}
            </Text>
          )}
          <View className="flex-row items-center justify-between mt-auto">
            <View className="flex-row items-center">
              <Ionicons
                name="people"
                size={16}
                color={getThemeColor("gray-500", "gray-400")}
              />
              <Text className="text-gray-500 dark:text-gray-400 ml-2 text-sm font-medium">
                {hunt.maxParticipants}
              </Text>
            </View>
            <View className="flex-row items-center flex-1 ml-4">
              <Ionicons
                name="location-outline"
                size={16}
                color={getThemeColor("gray-500", "gray-400")}
              />
              <Text
                className="text-gray-500 dark:text-gray-400 ml-2 text-sm font-medium flex-1"
                numberOfLines={1}
              >
                {hunt.location}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const ExploreWeb = () => {
  const { t } = useTranslation()
  const { getThemeColor } = useThemeColor()
  const { isAuthenticated } = useAuthManager()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

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

  const filteredHunts = hunts.allHunts.filter(
    (hunt) =>
      hunt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hunt.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hunt.location?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const CurrentHuntHeader = () => {
    if (!hunts.currentUserHunt) {
      return null
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <View className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6 border border-primary-200 dark:border-primary-700">
          <View className="flex-row items-center mb-4">
            <Ionicons
              name="play-circle"
              size={24}
              color={getThemeColor("primary-600", "primary-400")}
            />
            <Text className="text-primary-700 dark:text-primary-300 ml-3 font-semibold text-lg">
              {t("yourCurrentHunt")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleHuntPress(hunts.currentUserHunt?.id ?? "")}
            className="flex-row items-center justify-between"
          >
            <View className="flex-1">
              <Text className="text-2xl font-bold text-primary-800 dark:text-primary-200 mb-2">
                {hunts.currentUserHunt.title}
              </Text>
              {hunts.currentUserHunt.description && (
                <Text className="text-primary-700 dark:text-primary-300 text-base">
                  {hunts.currentUserHunt.description}
                </Text>
              )}
            </View>
            <Ionicons
              name="arrow-forward-circle"
              size={32}
              color={getThemeColor("primary-600", "primary-400")}
            />
          </TouchableOpacity>
        </View>
      </motion.div>
    )
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView
        className="flex-1 px-6 md:px-12 lg:px-24 pt-8"
        showsVerticalScrollIndicator={false}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=" text-center flex flex-col"
        >
          <Text className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            {t("exploreHunts")}
          </Text>
          <Text className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {t("exploreHuntsDescription")}
          </Text>

          <View className="flex-row items-center gap-4 mb-6">
            <View className="flex-1 relative">
              <View className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <Ionicons
                  name="search"
                  size={20}
                  color={getThemeColor("gray-400", "gray-500")}
                />
              </View>
              <TextInput
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-12 py-4 text-gray-800 dark:text-white text-base"
                placeholder="Search hunts..."
                placeholderTextColor={getThemeColor("gray-400", "gray-500")}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <Button
              title={t("createHunt")}
              variant="primary"
              size="lg"
              onPress={() => router.push("/create-hunts")}
            />
          </View>
        </motion.div>

        <CurrentHuntHeader />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full"
        >
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              {searchQuery
                ? `${t("availableHunts")} (${filteredHunts.length})`
                : t("availableHunts")}
            </Text>
            <Text className="text-gray-500 dark:text-gray-400 text-base">
              {filteredHunts.length}{" "}
              {filteredHunts.length === 1
                ? t("createHunt").toLowerCase()
                : t("availableHunts").toLowerCase()}
            </Text>
          </View>

          {filteredHunts.length > 0 ? (
            <View
              className="grid gap-6"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: 24,
              }}
            >
              {filteredHunts.map((hunt, index) => (
                <motion.div
                  key={hunt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-full"
                >
                  <HuntGridCard
                    hunt={hunt}
                    onPress={() => handleHuntPress(hunt.id)}
                    isCurrentHunt={hunts.currentUserHunt?.id === hunt.id}
                  />
                </motion.div>
              ))}
            </View>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <View className="bg-white dark:bg-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-gray-700 items-center">
                <View className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 items-center justify-center mb-6">
                  <Ionicons
                    name={searchQuery ? "search" : "compass-outline"}
                    size={40}
                    color={getThemeColor("gray-400", "gray-500")}
                  />
                </View>
                <Text className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                  {t("noHuntsAvailable")}
                </Text>
                <Text className="text-gray-600 dark:text-gray-300 text-center mb-8 text-lg max-w-lg">
                  {t("noHuntsMessage")}
                </Text>
                {!searchQuery && (
                  <Button
                    title={t("createHunt")}
                    variant="primary"
                    size="lg"
                    onPress={() => router.push("/create-hunts")}
                  />
                )}
              </View>
            </motion.div>
          )}
        </motion.div>
      </ScrollView>
    </View>
  )
}

export default ExploreWeb

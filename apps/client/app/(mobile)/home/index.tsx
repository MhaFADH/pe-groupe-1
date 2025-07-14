import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { t } from "i18next"
import { useEffect, useState } from "react"
import { Text, View, ScrollView, TouchableOpacity } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import { useAuthManager } from "@/components/contexts"
import { CurrentHuntBox, HuntCard } from "@/components"
import { useThemeColor } from "@/utils/colors"

import type { Hunt } from "@/components/ui/hunt-card/hunt-card"

const HomePage = () => {
  const { isAuthenticated } = useAuthManager()
  const { getThemeColor } = useThemeColor()
  const router = useRouter()
  
  const [currentHunt, setCurrentHunt] = useState<Hunt | null>(null)
  const [availableHunts, setAvailableHunts] = useState<Hunt[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(mobile)")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    const mockHunts: Hunt[] = [
      {
        id: "1",
        title: "City Explorer",
        description: "Explore the hidden gems of downtown",
        isPrivate: false,
        startDate: new Date(),
        maxParticipants: 10,
        worldType: "real",
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        creatorId: "user1",
        latitude: 40.7128,
        longitude: -74.0060,
      },
      {
        id: "2",
        title: "Museum Mystery",
        description: "Solve puzzles in the local museum",
        isPrivate: false,
        startDate: new Date(),
        maxParticipants: 6,
        worldType: "real",
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        creatorId: "user2",
        latitude: 40.7614,
        longitude: -73.9776      },
      {
        id: "3",
        title: "Virtual Adventure",
        description: "A digital treasure hunt experience",
        isPrivate: false,
        startDate: new Date(),
        maxParticipants: 20,
        worldType: "cartographic",
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        creatorId: "user3",
        latitude: 40.7505,
        longitude: -73.9934,
      }
    ]
        
    setCurrentHunt(mockHunts[0] ?? null)
    
    setAvailableHunts(mockHunts)
  }, [])


  const HuntCarousel = () => (
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
              onPress={() => router.replace("/explore")}
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
  )

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
        <HuntCarousel />
      </ScrollView>
    </View>
  )
}

export default HomePage

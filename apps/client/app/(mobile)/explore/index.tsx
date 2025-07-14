import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { t } from "i18next"
import { useEffect, useState } from "react"
import { Text, View, FlatList, TouchableOpacity } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import { useAuthManager } from "@/components/contexts"
import { HuntCard } from "@/components"
import { useThemeColor } from "@/utils/colors"

import type { Hunt } from "@/components/ui/hunt-card/hunt-card"

const ExplorePage = () => {
  const { getThemeColor } = useThemeColor()
  const { isAuthenticated } = useAuthManager()
  const router = useRouter()
  
  const [hunts, setHunts] = useState<Hunt[]>([])
  const [currentHuntId, setCurrentHuntId] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(mobile)")
    }
  }, [isAuthenticated, router])

  // Mock data initialization
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
        location: "New York, NY",
        image: "https://picsum.photos/300/200?random=1"
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
        longitude: -73.9776,
        location: "Manhattan, NY",
        image: "https://picsum.photos/300/200?random=2"
      },
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
        location: "Times Square, NY",
        image: "https://picsum.photos/300/200?random=3"
      },
      {
        id: "4",
        title: "Historic Downtown",
        description: "Discover the historic buildings and monuments",
        isPrivate: false,
        startDate: new Date(),
        maxParticipants: 8,
        worldType: "real",
        endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        creatorId: "user4",
        latitude: 40.7589,
        longitude: -73.9851,
        location: "Downtown NYC",
        image: "https://picsum.photos/300/200?random=4"
      },
      {
        id: "5",
        title: "Park Adventure",
        description: "Nature-based treasure hunt in Central Park",
        isPrivate: false,
        startDate: new Date(),
        maxParticipants: 15,
        worldType: "real",
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        creatorId: "user5",
        latitude: 40.7812,
        longitude: -73.9665,
        location: "Central Park, NY",
        image: "https://picsum.photos/300/200?random=5"
      }
    ]
    
    setHunts(mockHunts)
    // Mock: User is currently joined to hunt "1"
    setCurrentHuntId("1")
  }, [])

  const handleHuntPress = (huntId: string) => {
    router.push(`/explore/${huntId}`)
  }

  const renderHuntItem = ({ item }: { item: Hunt }) => (
    <View className="px-4 mb-4">
      <View className={currentHuntId === item.id ? "border-2 border-primary-500 rounded-2xl" : ""}>
        <HuntCard
          hunt={item}
          onPress={() => handleHuntPress(item.id)}
        />
        {currentHuntId === item.id && (
          <View className="absolute top-2 right-2 bg-primary-600 dark:bg-primary-500 px-2 py-1 rounded-full">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={12} color="white" />
              <Text className="text-white ml-1 font-medium text-xs">
                Joined
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )

  const CurrentHuntHeader = () => {
    if (!currentHuntId) {
      return null
    }
    
    const currentHunt = hunts.find(h => h.id === currentHuntId)
    
    if (!currentHunt) {
      return null
    }

    return (
      <Animated.View entering={FadeIn.delay(100)} className="px-6 py-4">
        <View className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-4 border border-primary-200 dark:border-primary-700">
          <View className="flex-row items-center mb-2">
            <Ionicons name="play-circle" size={20} color={getThemeColor("primary-600", "primary-400")} />
            <Text className="text-primary-700 dark:text-primary-300 ml-2 font-semibold">
              Your Current Hunt
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleHuntPress(currentHuntId)}
            className="flex-row items-center justify-between"
          >
            <Text className="text-lg font-bold text-primary-800 dark:text-primary-200">
              {currentHunt.title}
            </Text>
            <Ionicons name="arrow-forward" size={20} color={getThemeColor("primary-600", "primary-400")} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <FlatList
        data={hunts}
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
    </View>
  )
}

export default ExplorePage

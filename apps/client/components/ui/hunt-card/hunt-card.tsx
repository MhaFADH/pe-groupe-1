import { Ionicons } from "@expo/vector-icons"
import { Image, Text, TouchableOpacity, View } from "react-native"

import { useThemeColor } from "@/utils/colors"

export type Hunt = {
  id: string
  title: string
  description?: string
  isPrivate: boolean
  startDate: Date
  maxParticipants: number
  worldType: "real" | "cartographic"
  endDate?: Date
  creatorId: string
  latitude: number
  longitude: number
  image?: string
}

type HuntCardProps = {
  hunt: Hunt
  onPress: () => void
  width?: number
}

export const HuntCard = ({ hunt, onPress, width = 264 }: HuntCardProps) => {
  const { getThemeColor } = useThemeColor()

  return (
    <TouchableOpacity
      style={{ width }}
      onPress={onPress}
      className="mr-4"
    >
      <View className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 h-72">
        <Image
          source={{ uri: hunt.image ?? `https://picsum.photos/300/200?random=${hunt.id}` }}
          className="w-full h-32"
          resizeMode="cover"
        />
        <View className="p-4 flex-1 justify-between">
          <View>
            <Text
              className="text-lg font-bold text-gray-800 dark:text-white mb-2"
              numberOfLines={1}
            >
              {hunt.title}
            </Text>
            {hunt.description && (
              <Text
                className="text-gray-600 dark:text-gray-300 text-sm mb-2"
                numberOfLines={2}
              >
                {hunt.description}
              </Text>
            )}
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons
                name="people"
                size={14}
                color={getThemeColor("gray-500", "gray-400")}
              />
              <Text className="text-gray-500 dark:text-gray-400 ml-1 text-xs">
                {hunt.maxParticipants}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons
                name={hunt.worldType === "real" ? "location" : "map"}
                size={14}
                color={getThemeColor("gray-500", "gray-400")}
              />
              <Text className="text-gray-500 dark:text-gray-400 ml-1 text-xs capitalize">
                {hunt.worldType}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

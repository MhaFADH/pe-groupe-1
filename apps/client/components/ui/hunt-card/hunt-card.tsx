import { Ionicons } from "@expo/vector-icons"
import { Image, Text, TouchableOpacity, View } from "react-native"

import { type FullTreasureHuntType } from "@pe/types"

import { useThemeColor } from "@/utils/colors"

type HuntCardProps = {
  hunt: FullTreasureHuntType
  onPress: () => void
  width?: number
}

export const HuntCard = ({ hunt, onPress, width }: HuntCardProps) => {
  const { getThemeColor } = useThemeColor()

  return (
    <TouchableOpacity
      style={width ? { width } : null}
      onPress={onPress}
      className={width ? "mr-4" : ""}
    >
      <View className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 h-72">
        <Image
          source={{ uri: `https://picsum.photos/300/200?random=${hunt.id}` }}
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
            <View className="flex-row items-center mb-3">
              <Ionicons
                name="location-outline"
                size={14}
                color={getThemeColor("gray-500", "gray-400")}
              />
              <Text
                className="text-gray-500 dark:text-gray-400 ml-1 text-xs"
                numberOfLines={1}
              >
                {hunt.location}
              </Text>
            </View>
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
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

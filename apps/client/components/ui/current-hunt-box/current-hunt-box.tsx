import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { t } from "i18next"
import { Text, TouchableOpacity, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import { type TreasureHuntType } from "@pe/types"

import { useThemeColor } from "@/utils/colors"

type CurrentHuntBoxProps = {
  currentHunt: TreasureHuntType | null
}

export const CurrentHuntBox = ({ currentHunt }: CurrentHuntBoxProps) => {
  const { getThemeColor } = useThemeColor()
  const router = useRouter()

  if (currentHunt) {
    return (
      <Animated.View
        entering={FadeIn.delay(200)}
        className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <Text className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
          {currentHunt.title}
        </Text>
        {currentHunt.description && (
          <Text className="text-gray-600 dark:text-gray-300 mb-4">
            {currentHunt.description}
          </Text>
        )}
        <View className="flex-row items-center mb-4">
          <Ionicons
            name="people"
            size={16}
            color={getThemeColor("gray-500", "gray-400")}
          />
          <Text className="text-gray-500 dark:text-gray-400 ml-2">
            {`${t("maxParticipants")} ${currentHunt.maxParticipants}`}
          </Text>
        </View>
        <TouchableOpacity
          className="bg-primary-600 dark:bg-primary-500 py-3 px-6 rounded-xl"
          onPress={() => {
            // Navigate to hunt details or resume hunt
          }}
        >
          <Text className="text-white font-semibold text-center">
            {t("resumeHunt")}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  return (
    <Animated.View
      entering={FadeIn.delay(200)}
      className="w-full bg-white dark:bg-gray-800 rounded-2xl p-8 mb-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <View className="items-center">
        <View className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 items-center justify-center mb-4">
          <Ionicons
            name="search"
            size={24}
            color={getThemeColor("gray-400", "gray-500")}
          />
        </View>
        <Text className="text-gray-500 dark:text-gray-400 text-center mb-4">
          {t("pleaseJoinHunt")}
        </Text>
        <TouchableOpacity
          className="bg-primary-600 dark:bg-primary-500 py-2 px-4 rounded-lg"
          onPress={() => router.replace("/explore")}
        >
          <Text className="text-white font-semibold text-center">
            {t("exploreHunts")}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

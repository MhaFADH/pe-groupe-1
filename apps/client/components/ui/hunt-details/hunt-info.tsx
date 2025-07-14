import { Ionicons } from "@expo/vector-icons"
import { t } from "i18next"
import { Text, View } from "react-native"

import { useThemeColor } from "@/utils/colors"

import type { Hunt } from "@/components/ui/hunt-card/hunt-card"

interface HuntInfoProps {
  hunt: Hunt
}

export const HuntInfo = ({ hunt }: HuntInfoProps) => {
  const { getThemeColor } = useThemeColor()

  return (
    <View>
      <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        {t("huntDetails")}
      </Text>
      
      {hunt.description && (
        <Text className="text-gray-600 dark:text-gray-300 mb-4 leading-6">
          {hunt.description}
        </Text>
      )}

      {/* Hunt Info Card */}
      <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <Ionicons name="people" size={20} color={getThemeColor("gray-600", "gray-400")} />
            <Text className="text-gray-700 dark:text-gray-300 ml-2 font-medium">
              {t("participants")}
            </Text>
          </View>
          <Text className="text-gray-900 dark:text-white font-semibold">
            {hunt.maxParticipants}
          </Text>
        </View>
        
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <Ionicons 
              name={hunt.worldType === "real" ? "location" : "map"} 
              size={20} 
              color={getThemeColor("gray-600", "gray-400")} 
            />
            <Text className="text-gray-700 dark:text-gray-300 ml-2 font-medium">
              Type
            </Text>
          </View>
          <Text className="text-gray-900 dark:text-white font-semibold capitalize">
            {hunt.worldType}
          </Text>
        </View>

        {hunt.endDate && (
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="calendar" size={20} color={getThemeColor("gray-600", "gray-400")} />
              <Text className="text-gray-700 dark:text-gray-300 ml-2 font-medium">
                Ends
              </Text>
            </View>
            <Text className="text-gray-900 dark:text-white font-semibold">
              {hunt.endDate.toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}
import { Ionicons } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"

import { type TreasureHuntType } from "@pe/types"

import { useThemeColor } from "@/utils/colors"

type HuntInfoProps = {
  hunt: TreasureHuntType
}

export const HuntInfo = ({ hunt }: HuntInfoProps) => {
  const { getThemeColor } = useThemeColor()
  const { t, i18n } = useTranslation()

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
            <Ionicons
              name="people"
              size={20}
              color={getThemeColor("gray-600", "gray-400")}
            />
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
              name={!hunt.isPrivate ? "earth" : "lock-closed"}
              size={20}
              color={getThemeColor("gray-600", "gray-400")}
            />
            <Text className="text-gray-700 dark:text-gray-300 ml-2 font-medium">
              Type
            </Text>
          </View>
          <Text className="text-gray-900 dark:text-white font-semibold capitalize">
            {!hunt.isPrivate ? "Public" : "Private"}
          </Text>
        </View>

        {hunt.endDate && (
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons
                name="calendar"
                size={20}
                color={getThemeColor("gray-600", "gray-400")}
              />
              <Text className="text-gray-700 dark:text-gray-300 ml-2 font-medium">
                {t("ends")}
              </Text>
            </View>
            <Text className="text-gray-900 dark:text-white font-semibold">
              {new Date(hunt.endDate).toLocaleString(i18n.language, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

import { Ionicons } from "@expo/vector-icons"
import { t } from "i18next"
import { Text, View } from "react-native"

import { type TreasureHintType } from "@pe/types"

import { HintCard } from "@/components/ui/hint-card"
import { useThemeColor } from "@/utils/colors"

type HintsSectionProps = {
  hints: TreasureHintType[]
  isJoined: boolean
}

export const HintsSection = ({ hints, isJoined }: HintsSectionProps) => {
  const { getThemeColor } = useThemeColor()

  if (!isJoined) {
    return null
  }

  return (
    <View>
      <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        {t("hintsFound")}
      </Text>

      {hints.length > 0 ? (
        hints.map((hint) => <HintCard key={hint.id} hint={hint} />)
      ) : (
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 items-center">
          <Ionicons
            name="search-outline"
            size={48}
            color={getThemeColor("gray-400", "gray-500")}
          />
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mt-4 mb-2">
            {t("noHintsYet")}
          </Text>
          <Text className="text-gray-600 dark:text-gray-300 text-center">
            {t("startExploring")}
          </Text>
        </View>
      )}
    </View>
  )
}

import { t } from "i18next"
import { Text, TouchableOpacity, View } from "react-native"

type HuntActionsProps = {
  isJoined: boolean
  onJoinHunt: () => void
  onLeaveHunt: () => void
  onPlayHunt: () => void
}

export const HuntActions = ({
  isJoined,
  onJoinHunt,
  onLeaveHunt,
  onPlayHunt,
}: HuntActionsProps) => (
  <View className="flex-row gap-3 mb-6">
    {!isJoined ? (
      <TouchableOpacity
        className="flex-1 bg-primary-600 dark:bg-primary-500 py-4 px-6 rounded-xl"
        onPress={onJoinHunt}
      >
        <Text className="text-white font-semibold text-center text-lg">
          {t("joinHunt")}
        </Text>
      </TouchableOpacity>
    ) : (
      <>
        <TouchableOpacity
          className="flex-1 bg-primary py-4 px-6 rounded-xl"
          onPress={onPlayHunt}
        >
          <Text className="text-white font-semibold text-center text-lg">
            {t("playHunt")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-600 dark:bg-red-500 py-4 px-6 rounded-xl"
          onPress={onLeaveHunt}
        >
          <Text className="text-white font-semibold text-center text-lg">
            {t("leaveHunt")}
          </Text>
        </TouchableOpacity>
      </>
    )}
  </View>
)

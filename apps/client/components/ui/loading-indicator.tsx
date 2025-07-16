import { ActivityIndicator, View } from "react-native"

import { useThemeColor } from "@/utils/colors"

type LoadingIndicatorProps = {
  size?: "small" | "large"
}

export const LoadingIndicator = ({ size = "large" }: LoadingIndicatorProps) => {
  const { getThemeColor } = useThemeColor()

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900">
      <ActivityIndicator
        size={size}
        color={getThemeColor("primary-500", "primary-400")}
      />
    </View>
  )
}

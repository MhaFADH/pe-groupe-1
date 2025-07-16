import { Text, View } from "react-native"

type ErrorDisplayProps = {
  message: string
}

export const ErrorDisplay = ({ message }: ErrorDisplayProps) => (
  <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900">
    <Text className="text-primary-400">{message}</Text>
  </View>
)

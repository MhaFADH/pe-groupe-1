import React from "react"
import { Switch as RNSwitch, Text, View } from "react-native"

type SwitchProps = {
  label?: string
  description?: string
  value: boolean
  onValueChange: (value: boolean) => void
  className?: string
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  description,
  value,
  onValueChange,
  className = "",
}) => (
  <View
    className={`
    flex-row items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600
    ${className}
  `}
  >
    <View className="flex-1 pr-4">
      {label && (
        <Text className="text-base font-medium text-gray-900 dark:text-white mb-1">
          {label}
        </Text>
      )}
      {description && (
        <Text className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </Text>
      )}
    </View>
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      trackColor={{
        false: "#D1D5DB",
        true: "hsl(var(--primary) / 0.7)",
      }}
      thumbColor={value ? "hsl(var(--primary))" : "#F3F4F6"}
      ios_backgroundColor="#D1D5DB"
    />
  </View>
)

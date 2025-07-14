import React from "react"
import { Text, TextInput, View } from "react-native"

type InputProps = {
  label?: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  multiline?: boolean
  numberOfLines?: number
  error?: string
  required?: boolean
  className?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines,
  error,
  required = false,
  className = "",
}) => (
  <View className={`gap-2 ${className}`}>
    {label && (
      <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <Text className="text-primary"> *</Text>}
      </Text>
    )}      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        multiline={multiline}
        numberOfLines={numberOfLines}
        className={`
          bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3
          text-gray-900 dark:text-white text-base
          focus:border-primary/40
          ${multiline ? "min-h-[80px] py-3" : "h-12"}
          ${error ? "border-primary/50" : ""}
        `}
        style={{
          textAlignVertical: multiline ? "top" : "center",
        }}
      />
    {error && (
      <Text className="text-xs text-primary font-medium">{error}</Text>
    )}
  </View>
)

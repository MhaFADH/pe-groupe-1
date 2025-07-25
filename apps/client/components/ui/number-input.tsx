import React from "react"
import { Text, TextInput, View } from "react-native"

type NumberInputProps = {
  label?: string
  value: number
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  required?: boolean
  className?: string
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
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
    )}
    <TextInput
      value={value.toString()}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      keyboardType="numeric"
      className={`
          bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 h-12
          text-gray-900 dark:text-white text-base
          focus:border-primary/40
          ${error ? "border-primary/50" : ""}
        `}
    />
    {error && <Text className="text-xs text-primary font-medium">{error}</Text>}
  </View>
)

import React from "react"
import { Pressable, Text, View } from "react-native"

type SegmentedControlOption = {
  label: string
  value: string
}

type SegmentedControlProps = {
  label?: string
  options: SegmentedControlOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  label,
  options,
  value,
  onChange,
  className = "",
}) => (
  <View className={`gap-2 ${className}`}>
    {label && (
      <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </Text>
    )}
    
    <View className="flex-row bg-white dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-600">
      {options.map((option) => (
        <Pressable
          key={option.value}
          onPress={() => onChange(option.value)}
          className={`
            flex-1 py-2 px-3 rounded-lg
            ${value === option.value 
              ? "bg-primary" 
              : "bg-transparent"
            }
          `}
        >
          <Text className={`
            text-center font-medium text-sm
            ${value === option.value 
              ? "text-white" 
              : "text-gray-600 dark:text-gray-400"
            }
          `}>
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  </View>
)

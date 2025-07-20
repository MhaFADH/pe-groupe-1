import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Pressable, Text, TextInput, View } from "react-native"

type DatePickerProps = {
  label?: string
  value: Date | null
  onChange: (date: Date | null) => void
  error?: string
  optional?: boolean
  className?: string
}

export const DatePickerWeb: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  optional = false,
  className = "",
}) => {
  const { t } = useTranslation()

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return ""
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const handleDateChange = (dateString: string) => {
    if (!dateString) {
      onChange(null)
      return
    }

    const selectedDate = new Date(dateString)
    if (!isNaN(selectedDate.getTime())) {
      onChange(selectedDate)
    }
  }

  const today = new Date()
  const minDate = formatDateForInput(today)

  return (
    <View className={`gap-2 ${className}`}>
      {label && (
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {optional && (
            <Text className="text-gray-400 dark:text-gray-500">
              {" "}
              (Optional)
            </Text>
          )}
        </Text>
      )}
      
      <View className="flex-row gap-2">
        <View className="flex-1">
          {typeof window !== 'undefined' ? (
            <input
              type="date"
              min={minDate}
              value={formatDateForInput(value)}
              onChange={(e) => handleDateChange(e.target.value)}
              placeholder={t("selectEndDate")}
              className={`
                w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 h-12
                text-gray-900 dark:text-white text-base
                ${error ? "border-red-500 dark:border-red-400" : ""}
              `}
              style={{
                colorScheme: 'light dark',
                fontFamily: 'inherit'
              }}
            />
          ) : (
            <TextInput
              className={`
                bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 h-12
                text-gray-900 dark:text-white text-base
                ${error ? "border-red-500 dark:border-red-400" : ""}
              `}
              placeholder={t("selectEndDate")}
              placeholderTextColor="#9CA3AF"
              value={formatDateForInput(value)}
              onChangeText={handleDateChange}
            />
          )}
        </View>
        
        {value && (
          <Pressable
            onPress={() => onChange(null)}
            className="bg-gray-200 dark:bg-gray-700 rounded-xl px-4 py-3 h-12 justify-center items-center"
          >
            <Text className="text-gray-600 dark:text-gray-400 font-medium">
              {t("clear")}
            </Text>
          </Pressable>
        )}
      </View>


      {error && (
        <Text className="text-xs text-red-500 font-medium">{error}</Text>
      )}
    </View>
  )
}
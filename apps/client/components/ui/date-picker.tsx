import React, { useState } from "react"
import { Modal, Platform, Pressable, Text, View } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useTranslation } from "react-i18next"

type DatePickerProps = {
  label?: string
  value: Date | null
  onChange: (date: Date | null) => void
  error?: string
  optional?: boolean
  className?: string
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  optional = false,
  className = "",
}) => {
  const { t } = useTranslation()
  const [showPicker, setShowPicker] = useState(false)
  const [tempDate, setTempDate] = useState<Date | null>(value)

  const handleOpenPicker = () => {
    setTempDate(value)
    setShowPicker(true)
  }

  return (
    <View className={`gap-2 ${className}`}>    {label && (
      <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {optional && <Text className="text-gray-400 dark:text-gray-500"> (Optional)</Text>}
      </Text>
    )}
      
      <Pressable
        onPress={handleOpenPicker}
        className={`
          bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 h-12
          justify-center
          ${error ? "border-primary/50" : ""}
        `}
      >
        <Text className={`text-base ${value ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>
          {value ? value.toLocaleDateString() : t("selectEndDate")}
        </Text>
      </Pressable>

      {showPicker && (
        <Modal transparent animationType="fade">
          <View className="flex-1 justify-center bg-black/50">
            <View className="bg-white dark:bg-gray-800 mx-5 rounded-2xl p-6">
              <DateTimePicker
                value={tempDate ?? new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                minimumDate={new Date()}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setTempDate(selectedDate)
                  }
                }}
              />
              <View className="flex-row gap-3 mt-4">
                <Pressable
                  onPress={() => {
                    setShowPicker(false)
                    setTempDate(null)
                    onChange(null)
                  }}
                  className="flex-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3"
                >
                  <Text className="text-gray-900 dark:text-white text-center font-medium">
                    {t("clear")}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setShowPicker(false)
                    
                    if (tempDate) {
                      onChange(tempDate)
                    }
                  }}
                  className="flex-1 bg-primary rounded-xl p-3"
                >
                  <Text className="text-white text-center font-medium">
                    {t("validate")}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {error && (
        <Text className="text-xs text-primary font-medium">{error}</Text>
      )}
    </View>
  )
}

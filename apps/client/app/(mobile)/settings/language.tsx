import { Ionicons } from "@expo/vector-icons"
import { cssInterop } from "nativewind"
import React from "react"
import { Pressable, Text, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import { useLanguage } from "@/components/contexts"
import { useThemeColor } from "@/utils/colors"

const LanguageSettingNative: React.FC = () => {
  const { getThemeColor } = useThemeColor()
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  ]

  const handleLanguageSelect = async (languageCode: "en" | "fr") => {
    await setLanguage(languageCode)
  }

  cssInterop(Pressable, { className: "style" })

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <Animated.ScrollView
        entering={FadeIn.delay(200)}
        className="flex-1 p-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="space-y-4">
          {languages.map((lang) => {
            const isSelected = language === lang.code

            return (
              <Pressable
                key={lang.code}
                className={[
                  "w-full rounded-2xl p-6 border-2 transition-all duration-200 mb-4",
                  isSelected
                    ? "bg-primary/10 border-primary shadow-lg"
                    : "bg-background dark:bg-backgroundDark border-gray-300 dark:border-gray-600",
                ].join(" ")}
                onPress={() => handleLanguageSelect(lang.code as "en" | "fr")}
              >
                <View className="flex-row items-center">
                  <Text className="text-4xl mr-4">{lang.flag}</Text>
                  <View className="flex-1">
                    <Text
                      className={[
                        "text-xl font-semibold",
                        isSelected
                          ? "text-primary"
                          : "text-text dark:text-textDark",
                      ].join(" ")}
                    >
                      {lang.nativeName}
                    </Text>
                  </View>
                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={28}
                      color={getThemeColor("primary", "primary")}
                    />
                  )}
                </View>
              </Pressable>
            )
          })}
        </View>
      </Animated.ScrollView>
    </View>
  )
}

export default LanguageSettingNative

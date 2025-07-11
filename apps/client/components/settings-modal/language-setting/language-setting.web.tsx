import { Ionicons } from "@expo/vector-icons"
import { motion } from "framer-motion"
import React from "react"
import { useTranslation } from "react-i18next"
import { Pressable, Text, View } from "react-native"

import { useLanguage } from "@/components/contexts"
import { getColor } from "@/utils/colors"

export const LanguageSettingWeb: React.FC = () => {
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()

  const languages = [
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  ]

  const handleLanguageSelect = async (languageCode: "en" | "fr") => {
    try {
      await setLanguage(languageCode)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error changing language:", error)
    }
  }

  return (
    <motion.div
      key="language"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`h-full`}
    >
      <View className={`p-8`}>
        <View className={`mb-8`}>
          <Text
            className={`text-3xl font-bold mb-2 text-gray-900 dark:text-white`}
          >
            {t("language")}
          </Text>
          <Text className={`text-gray-600 dark:text-gray-300`}>
            {t("languageDescription")}
          </Text>
        </View>

        <View>
          {languages.map((lang) => {
            const isSelected = language === lang.code

            return (
              <Pressable
                key={lang.code}
                className={`w-full rounded-2xl p-6 border-2 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-white dark:bg-gray-800 ${
                  isSelected
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
                onPress={() => handleLanguageSelect(lang.code as "en" | "fr")}
              >
                <View className={`flex-row items-center`}>
                  <Text className={`text-4xl mr-4`}>{lang.flag}</Text>
                  <View className={`flex-1`}>
                    <Text
                      className={`text-xl font-semibold ${
                        isSelected
                          ? "text-primary"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {lang.nativeName}
                    </Text>
                    <Text
                      className={`text-sm text-gray-500 dark:text-gray-400`}
                    >
                      {lang.name}
                    </Text>
                  </View>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.1 }}
                    >
                      <Ionicons
                        name="checkmark-circle"
                        size={28}
                        color={getColor("primary")}
                      />
                    </motion.div>
                  )}
                </View>
              </Pressable>
            )
          })}
        </View>
      </View>
    </motion.div>
  )
}

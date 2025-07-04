import { Ionicons } from "@expo/vector-icons"
import { motion } from "framer-motion"
import React from "react"
import { useTranslation } from "react-i18next"
import { Pressable, Text, View } from "react-native"

import { useTheme } from "@/components/contexts"
import { getColor } from "@/utils/colors"

export const ThemeSettingWeb: React.FC = () => {
  const { colorScheme, setTheme } = useTheme()
  const { t } = useTranslation()

  const changeTheme = (theme: "light" | "dark") => {
    if (theme === colorScheme) {
      return null
    }

    setTheme(theme)

    return null
  }

  return (
    <motion.div
      key="theme"
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
            {t("darkMode")}
          </Text>
          <Text className={`text-gray-600 dark:text-gray-300`}>
            {t("themeDescription")}
          </Text>
        </View>

        <View className={`space-y-6`}>
          <View
            className={`rounded-2xl p-6 border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}
          >
            <Text
              className={`text-lg font-semibold mb-4 text-gray-900 dark:text-white`}
            >
              {t("selectTheme")}
            </Text>
            <View className="flex flex-col gap-4">
              <Pressable
                className={`rounded-xl p-4 border-2 transition-all duration-200 hover:scale-[1.02] relative bg-gray-100 ${
                  colorScheme === "light"
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-gray-200 dark:border-gray-600"
                }`}
                onPress={() => changeTheme("light")}
              >
                <View className={`w-full h-3 rounded mb-2 bg-white`} />
                <View className={`w-3/4 h-2 rounded mb-1 bg-gray-300`} />
                <View className={`w-1/2 h-2 rounded mb-3 bg-gray-300`} />

                {colorScheme === "light" && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    className={`absolute top-2 right-2`}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={getColor("primary")}
                    />
                  </motion.div>
                )}
              </Pressable>

              <Pressable
                className={`rounded-xl p-4 border-2 transition-all duration-200 hover:scale-[1.02] relative bg-gray-700 ${
                  colorScheme === "dark"
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-gray-500"
                }`}
                onPress={() => changeTheme("dark")}
              >
                <View className={`w-full h-3 rounded mb-2 bg-gray-600`} />
                <View className={`w-3/4 h-2 rounded mb-1 bg-gray-500`} />
                <View className={`w-1/2 h-2 rounded mb-3 bg-gray-500`} />

                {colorScheme === "dark" && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    className={`absolute top-2 right-2`}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={getColor("primary")}
                    />
                  </motion.div>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </motion.div>
  )
}

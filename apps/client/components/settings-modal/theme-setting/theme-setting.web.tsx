import { Ionicons } from "@expo/vector-icons"
import { motion } from "framer-motion"
import React from "react"
import { useTranslation } from "react-i18next"
import { Pressable, Text, View } from "react-native"

import { useTheme } from "@/components/contexts"
import tw from "@/tailwind"

export const ThemeSettingWeb: React.FC = () => {
  const { colorScheme, setTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <motion.div
      key="theme"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={tw`h-full`}
    >
      <View style={tw`p-8`}>
        <View style={tw`mb-8`}>
          <Text
            style={tw`text-3xl font-bold mb-2 text-gray-900 dark:text-white`}
          >
            {t("darkMode")}
          </Text>
          <Text style={tw`text-gray-600 dark:text-gray-300`}>
            {t("themeDescription")}
          </Text>
        </View>

        <View style={tw`space-y-6`}>
          <View
            style={tw`rounded-2xl p-6 border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}
          >
            <Text
              style={tw`text-lg font-semibold mb-4 text-gray-900 dark:text-white`}
            >
              {t("selectTheme")}
            </Text>
            <View style={tw`grid grid-cols-2 gap-4`}>
              {/* Light Theme Option */}
              <Pressable
                style={tw`rounded-xl p-4 border-2 transition-all duration-200 hover:scale-[1.02] relative bg-gray-50 dark:bg-gray-600 ${
                  colorScheme === "light"
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-gray-200 dark:border-gray-600"
                }`}
                onPress={() => setTheme("light")}
              >
                <View style={tw`w-full h-3 rounded mb-2 bg-white`} />
                <View style={tw`w-3/4 h-2 rounded mb-1 bg-gray-300`} />
                <View style={tw`w-1/2 h-2 rounded mb-3 bg-gray-300`} />
                <Text
                  style={tw`text-sm text-center font-medium ${
                    colorScheme === "light"
                      ? "text-primary"
                      : "text-gray-500 dark:text-gray-300"
                  }`}
                >
                  {t("lightTheme")}
                </Text>
                {colorScheme === "light" && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    style={tw`absolute top-2 right-2`}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={tw.color("primary")}
                    />
                  </motion.div>
                )}
              </Pressable>

              {/* Dark Theme Option */}
              <Pressable
                style={tw`rounded-xl p-4 border-2 transition-all duration-200 hover:scale-[1.02] relative bg-gray-700 ${
                  colorScheme === "dark"
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-gray-500"
                }`}
                onPress={() => setTheme("dark")}
              >
                <View style={tw`w-full h-3 rounded mb-2 bg-gray-600`} />
                <View style={tw`w-3/4 h-2 rounded mb-1 bg-gray-500`} />
                <View style={tw`w-1/2 h-2 rounded mb-3 bg-gray-500`} />
                <Text
                  style={tw`text-sm text-center font-medium ${
                    colorScheme === "dark"
                      ? "text-primary-300"
                      : "text-gray-300"
                  }`}
                >
                  {t("darkTheme")}
                </Text>
                {colorScheme === "dark" && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    style={tw`absolute top-2 right-2`}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={tw.color("primary")}
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

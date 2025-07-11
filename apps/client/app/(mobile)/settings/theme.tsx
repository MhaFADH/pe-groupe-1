import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { useTranslation } from "react-i18next"
import { Pressable, Text, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import { useTheme } from "@/components/contexts"
import { useThemeColor } from "@/utils/colors"

const ThemeSettingNative: React.FC = () => {
  const { colorScheme, setTheme } = useTheme()
  const { t } = useTranslation()
  const { getThemeColor } = useThemeColor()

  return (
    <View className={`flex-1 bg-white dark:bg-gray-900`}>
      <Animated.ScrollView
        entering={FadeIn.delay(200)}
        className={`flex-1 p-6`}
        showsVerticalScrollIndicator={false}
      >
        <View className={`space-y-6`}>
          <View
            className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm`}
          >
            <Text
              className={`text-lg font-semibold text-gray-900 dark:text-white mb-6`}
            >
              {t("selectTheme")}
            </Text>
            <View className={`space-y-4`}>
              <Pressable
                className={`rounded-2xl p-4 border-2 ${
                  colorScheme === "light"
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                    : "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                } transition-all duration-200 mb-4`}
                onPress={() => setTheme("light")}
              >
                <View className={`flex-row items-start`}>
                  <View
                    className={`w-16 h-12 rounded-lg bg-white border border-gray-200 mr-4 overflow-hidden`}
                  >
                    <View className={`flex-1 bg-white`}>
                      <View
                        className={`h-3 bg-gray-100 rounded-full mx-1 mt-1`}
                      />
                      <View
                        className={`h-2 bg-gray-200 rounded-full mx-1 mt-1 w-2/3`}
                      />
                      <View
                        className={`h-2 bg-gray-200 rounded-full mx-1 mt-1 w-1/2`}
                      />
                    </View>
                    <View
                      className={`h-3 bg-gray-50 border-t border-gray-200`}
                    />
                  </View>

                  <View className={`flex-1`}>
                    <Text
                      className={`text-lg font-semibold ${
                        colorScheme === "light"
                          ? "text-purple-700 dark:text-purple-300"
                          : "text-gray-900 dark:text-white"
                      } mb-1`}
                    >
                      {t("lightTheme")}
                    </Text>
                    <Text
                      className={`text-sm text-gray-600 dark:text-gray-400`}
                    >
                      {t("lightThemeDescription")}
                    </Text>
                  </View>

                  {colorScheme === "light" && (
                    <View className={`ml-3`}>
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color={getThemeColor("purple-600", "purple-400")}
                      />
                    </View>
                  )}
                </View>
              </Pressable>

              <Pressable
                className={`rounded-2xl p-4 border-2 ${
                  colorScheme === "dark"
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                    : "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                } transition-all duration-200`}
                onPress={() => setTheme("dark")}
              >
                <View className={`flex-row items-start`}>
                  <View
                    className={`w-16 h-12 rounded-lg bg-gray-900 border border-gray-700 mr-4 overflow-hidden`}
                  >
                    <View className={`flex-1 bg-gray-900`}>
                      <View
                        className={`h-3 bg-gray-700 rounded-full mx-1 mt-1`}
                      />
                      <View
                        className={`h-2 bg-gray-600 rounded-full mx-1 mt-1 w-2/3`}
                      />
                      <View
                        className={`h-2 bg-gray-600 rounded-full mx-1 mt-1 w-1/2`}
                      />
                    </View>
                    <View
                      className={`h-3 bg-gray-800 border-t border-gray-700`}
                    />
                  </View>

                  <View className={`flex-1`}>
                    <Text
                      className={`text-lg font-semibold ${
                        colorScheme === "dark"
                          ? "text-purple-700 dark:text-purple-300"
                          : "text-gray-900 dark:text-white"
                      } mb-1`}
                    >
                      {t("darkTheme")}
                    </Text>
                    <Text
                      className={`text-sm text-gray-600 dark:text-gray-400`}
                    >
                      {t("darkThemeDescription")}
                    </Text>
                  </View>

                  {colorScheme === "dark" && (
                    <View className={`ml-3`}>
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color={getThemeColor("purple-600", "purple-400")}
                      />
                    </View>
                  )}
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  )
}
export default ThemeSettingNative

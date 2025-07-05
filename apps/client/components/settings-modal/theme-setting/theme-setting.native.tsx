import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { useTranslation } from "react-i18next"
import { Pressable, ScrollView, Text, View } from "react-native"

import { useTheme } from "@/components/contexts"
import tw from "@/tailwind"

export const ThemeSettingNative: React.FC = () => {
  const { colorScheme, setTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <View style={tw`flex-1`}>
      <ScrollView style={tw`flex-1 p-6`} showsVerticalScrollIndicator={false}>
        <View style={tw`mb-6`}>
          <Text
            style={tw`text-gray-600 dark:text-gray-400 text-base leading-relaxed`}
          >
            {t("themeDescription")}
          </Text>
        </View>

        <View style={tw`space-y-6`}>
          <View
            style={tw`bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm`}
          >
            <Text
              style={tw`text-lg font-semibold text-gray-900 dark:text-white mb-6`}
            >
              {t("selectTheme")}
            </Text>
            <View style={tw`space-y-4`}>
              <Pressable
                style={tw`rounded-2xl p-4 border-2 ${
                  colorScheme === "light"
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                    : "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                } transition-all duration-200`}
                onPress={() => setTheme("light")}
              >
                <View style={tw`flex-row items-start`}>
                  <View
                    style={tw`w-16 h-12 rounded-lg bg-white border border-gray-200 mr-4 overflow-hidden`}
                  >
                    <View style={tw`flex-1 bg-white`}>
                      <View
                        style={tw`h-3 bg-gray-100 rounded-full mx-1 mt-1`}
                      />
                      <View
                        style={tw`h-2 bg-gray-200 rounded-full mx-1 mt-1 w-2/3`}
                      />
                      <View
                        style={tw`h-2 bg-gray-200 rounded-full mx-1 mt-1 w-1/2`}
                      />
                    </View>
                    <View style={tw`h-3 bg-gray-50 border-t border-gray-200`} />
                  </View>

                  <View style={tw`flex-1`}>
                    <Text
                      style={tw`text-lg font-semibold ${
                        colorScheme === "light"
                          ? "text-purple-700 dark:text-purple-300"
                          : "text-gray-900 dark:text-white"
                      } mb-1`}
                    >
                      {t("lightTheme")}
                    </Text>
                    <Text style={tw`text-sm text-gray-600 dark:text-gray-400`}>
                      {t("lightThemeDescription")}
                    </Text>
                  </View>

                  {colorScheme === "light" && (
                    <View style={tw`ml-3`}>
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color={tw.color("purple-600")}
                      />
                    </View>
                  )}
                </View>
              </Pressable>

              <Pressable
                style={tw`rounded-2xl p-4 border-2 ${
                  colorScheme === "dark"
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                    : "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                } transition-all duration-200`}
                onPress={() => setTheme("dark")}
              >
                <View style={tw`flex-row items-start`}>
                  <View
                    style={tw`w-16 h-12 rounded-lg bg-gray-900 border border-gray-700 mr-4 overflow-hidden`}
                  >
                    <View style={tw`flex-1 bg-gray-900`}>
                      <View
                        style={tw`h-3 bg-gray-700 rounded-full mx-1 mt-1`}
                      />
                      <View
                        style={tw`h-2 bg-gray-600 rounded-full mx-1 mt-1 w-2/3`}
                      />
                      <View
                        style={tw`h-2 bg-gray-600 rounded-full mx-1 mt-1 w-1/2`}
                      />
                    </View>
                    <View
                      style={tw`h-3 bg-gray-800 border-t border-gray-700`}
                    />
                  </View>

                  <View style={tw`flex-1`}>
                    <Text
                      style={tw`text-lg font-semibold ${
                        colorScheme === "dark"
                          ? "text-purple-700 dark:text-purple-300"
                          : "text-gray-900 dark:text-white"
                      } mb-1`}
                    >
                      {t("darkTheme")}
                    </Text>
                    <Text style={tw`text-sm text-gray-600 dark:text-gray-400`}>
                      {t("darkThemeDescription")}
                    </Text>
                  </View>

                  {colorScheme === "dark" && (
                    <View style={tw`ml-3`}>
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color={tw.color("purple-600")}
                      />
                    </View>
                  )}
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

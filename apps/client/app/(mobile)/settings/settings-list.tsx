import { Ionicons } from "@expo/vector-icons"
import { type RelativePathString, useRouter } from "expo-router"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Pressable, Text, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"

import { useAuthManager } from "@/components/contexts"
import { useThemeColor } from "@/utils/colors"

export type SettingsScreen =
  | "theme"
  | "language"
  | "about"
  | "notifications"
  | "privacy"
  | "help"

const SettingsPage = () => {
  const { t } = useTranslation()
  const { getThemeColor } = useThemeColor()
  const { signOut, isAuthenticated } = useAuthManager()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(mobile)")
    }
  }, [isAuthenticated, router])

  const settingsItems = [
    {
      id: "theme" as SettingsScreen,
      label: t("darkMode"),
      icon: "color-palette" as const,
      description: t("themeDescription"),
      color: "purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: "language" as SettingsScreen,
      label: t("language"),
      icon: "language" as const,
      description: t("languageDescription"),
      color: "blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: "notifications" as SettingsScreen,
      label: t("notifications"),
      icon: "notifications" as const,
      description: t("notificationsDescription"),
      color: "green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: "privacy" as SettingsScreen,
      label: t("privacy"),
      icon: "shield-checkmark" as const,
      description: t("privacyDescription"),
      color: "red-600",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
    {
      id: "about" as SettingsScreen,
      label: t("about"),
      icon: "information-circle" as const,
      description: t("aboutDescription"),
      color: "orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
      id: "help" as SettingsScreen,
      label: t("helpSupport"),
      icon: "help-circle" as const,
      description: t("helpDescription"),
      color: "indigo-600",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    },
  ]

  return (
    <SafeAreaView
      edges={["left", "right"]}
      className={`flex-1 bg-gray-50 dark:bg-gray-900`}
    >
      <Animated.ScrollView
        entering={FadeIn.delay(200)}
        className={`flex-1 px-6 py-4`}
        showsVerticalScrollIndicator={false}
      >
        <View className={`space-y-6`}>
          {settingsItems.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => router.push(`./${item.id}` as RelativePathString)}
              className={`bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 mb-4`}
            >
              <View className={`flex-row items-center`}>
                <View
                  className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${item.bgColor}`}
                >
                  <Ionicons
                    name={item.icon}
                    size={24}
                    color={getThemeColor(item.color, item.color)}
                  />
                </View>
                <View className={`flex-1`}>
                  <Text
                    className={`text-lg font-semibold text-gray-900 dark:text-white mb-1`}
                  >
                    {item.label}
                  </Text>
                  <Text className={`text-gray-500 dark:text-gray-400 text-sm`}>
                    {item.description}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
        <View className="mt-5">
          <Pressable
            onPress={signOut}
            className="flex-row items-center justify-center p-4 rounded-xl bg-red-50 dark:bg-red-900/20 mt-2"
          >
            <Ionicons
              name="log-out-outline"
              className="mr-2"
              size={18}
              color={getThemeColor("red-600", "red-400")}
            />
            <Text className="text-lg font-medium text-red-600 dark:text-red-400">
              {t("logout")}
            </Text>
          </Pressable>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

export default SettingsPage

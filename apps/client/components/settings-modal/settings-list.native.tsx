import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { useTranslation } from "react-i18next"
import { Pressable, ScrollView, Text, View } from "react-native"
import Animated, { FadeIn, SlideInRight } from "react-native-reanimated"

import tw from "@/tailwind"

export type SettingsScreen =
  | "theme"
  | "language"
  | "about"
  | "notifications"
  | "privacy"
  | "help"

type SettingsListProps = {
  onSettingPress: (setting: SettingsScreen) => void
  onLogout: () => void
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const SettingsListNative: React.FC<SettingsListProps> = ({
  onSettingPress,
  onLogout,
}) => {
  const { t } = useTranslation()

  const settingsItems = [
    {
      id: "theme" as SettingsScreen,
      label: t("darkMode"),
      icon: "color-palette" as const,
      description: t("themeDescription"),
      color: "purple",
    },
    {
      id: "language" as SettingsScreen,
      label: t("language"),
      icon: "language" as const,
      description: t("languageDescription"),
      color: "blue",
    },
    {
      id: "notifications" as SettingsScreen,
      label: t("notifications"),
      icon: "notifications" as const,
      description: t("notificationsDescription"),
      color: "green",
    },
    {
      id: "privacy" as SettingsScreen,
      label: t("privacy"),
      icon: "shield-checkmark" as const,
      description: t("privacyDescription"),
      color: "red",
    },
    {
      id: "about" as SettingsScreen,
      label: t("about"),
      icon: "information-circle" as const,
      description: t("aboutDescription"),
      color: "yellow",
    },
    {
      id: "help" as SettingsScreen,
      label: t("helpSupport"),
      icon: "help-circle" as const,
      description: t("helpDescription"),
      color: "indigo",
    },
  ]

  return (
    <View style={tw`flex-1 bg-gray-50 dark:bg-gray-900`}>
      <View
        style={tw`bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700`}
      >
        <Text style={tw`text-2xl font-bold text-gray-900 dark:text-white`}>
          {t("settings")}
        </Text>
        <Text style={tw`text-gray-600 dark:text-gray-400 mt-1`}>
          {t("settingsSubtitle")}
        </Text>
      </View>

      <ScrollView
        style={tw`flex-1 px-6 py-4`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`space-y-6`}>
          {settingsItems.map((item, index) => (
            <AnimatedPressable
              key={item.id}
              entering={SlideInRight.delay(index * 150)}
              onPress={() => onSettingPress(item.id)}
              style={tw`bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700`}
            >
              <View style={tw`flex-row items-center`}>
                <View
                  style={tw`w-12 h-12 rounded-xl bg-${item.color}-100 dark:bg-${item.color}-900/30 items-center justify-center mr-4`}
                >
                  <Ionicons
                    name={item.icon}
                    size={24}
                    color={tw.color(`${item.color}-600`)}
                  />
                </View>
                <View style={tw`flex-1`}>
                  <Text
                    style={tw`text-lg font-semibold text-gray-900 dark:text-white mb-1`}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={tw`text-sm text-gray-600 dark:text-gray-400 leading-relaxed`}
                  >
                    {item.description}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={tw.color("gray-400")}
                />
              </View>
            </AnimatedPressable>
          ))}
        </View>

        <View
          style={tw`mt-8 pt-6 border-t border-gray-200 dark:border-gray-700`}
        >
          <AnimatedPressable
            entering={FadeIn.delay(settingsItems.length * 100)}
            onPress={onLogout}
            style={tw`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-red-200 dark:border-red-800`}
          >
            <View style={tw`flex-row items-center justify-center`}>
              <View
                style={tw`w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 items-center justify-center mr-3`}
              >
                <Ionicons
                  name="log-out"
                  size={20}
                  color={tw.color("red-500")}
                />
              </View>
              <Text
                style={tw`text-lg font-semibold text-red-600 dark:text-red-400`}
              >
                {t("logout")}
              </Text>
            </View>
          </AnimatedPressable>
        </View>
      </ScrollView>
    </View>
  )
}

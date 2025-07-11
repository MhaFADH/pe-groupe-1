import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { useTranslation } from "react-i18next"
import { Linking, Pressable, ScrollView, Text, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import { useConditionalColor, useThemeColor } from "@/utils/colors"

const HelpSettingNative: React.FC = () => {
  const { t } = useTranslation()
  const { getThemeColor } = useThemeColor()
  const iconColor = useConditionalColor("gray-600 dark:gray-300")

  const helpOptions = [
    {
      id: "faq",
      title: t("faq"),
      description: t("faqDescription"),
      icon: "help-circle" as const,
      action: () => void 0,
    },
    {
      id: "contactSupport",
      title: t("contactSupport"),
      description: t("contactSupportDescription"),
      icon: "mail" as const,
      action: () => void 0,
    },
    {
      id: "reportBug",
      title: t("reportBug"),
      description: t("reportBugDescription"),
      icon: "bug" as const,
      action: () => void 0,
    },
    {
      id: "featureRequest",
      title: t("featureRequest"),
      description: t("featureRequestDescription"),
      icon: "bulb" as const,
      action: () => void 0,
    },
  ]

  const quickLinks = [
    {
      id: "userGuide",
      title: t("userGuide"),
      icon: "book" as const,
      url: "https://example.com/guide",
    },
    {
      id: "videoTutorials",
      title: t("videoTutorials"),
      icon: "play-circle" as const,
      url: "https://example.com/tutorials",
    },
    {
      id: "community",
      title: t("community"),
      icon: "people" as const,
      url: "https://example.com/community",
    },
  ]

  const handleLinkPress = (url: string) => {
    void Linking.openURL(url)
  }

  return (
    <ScrollView
      className={`flex-1 p-6 bg-white dark:bg-gray-900`}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeIn.delay(200)} className={`space-y-6`}>
        <View>
          <Text
            className={`text-lg font-semibold text-gray-900 dark:text-white mb-4`}
          >
            {t("getHelp")}
          </Text>
          <View className={`space-y-4`}>
            {helpOptions.map((option) => (
              <Pressable
                key={option.id}
                className={`flex-row mb-4 items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800`}
                onPress={option.action}
              >
                <View className={`flex-row items-center flex-1`}>
                  <View
                    className={`w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 items-center justify-center mr-3`}
                  >
                    <Ionicons name={option.icon} size={20} color={iconColor} />
                  </View>
                  <View className={`flex-1`}>
                    <Text
                      className={`text-base font-semibold text-gray-900 dark:text-white mb-1`}
                    >
                      {option.title}
                    </Text>
                    <Text
                      className={`text-sm text-gray-600 dark:text-gray-400 leading-relaxed`}
                    >
                      {option.description}
                    </Text>
                  </View>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={getThemeColor("gray-400", "gray-400")}
                />
              </Pressable>
            ))}
          </View>
        </View>

        <View
          className={`mt-6 pt-6 border-t border-gray-200 dark:border-gray-700`}
        >
          <Text
            className={`text-lg font-semibold text-gray-900 dark:text-white mb-4`}
          >
            {t("quickLinks")}
          </Text>
          <View className={`space-y-3`}>
            {quickLinks.map((link) => (
              <Pressable
                key={link.id}
                className={`flex-row mb-4 items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800`}
                onPress={() => handleLinkPress(link.url)}
              >
                <View className={`flex-row items-center`}>
                  <View
                    className={`w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 items-center justify-center mr-3`}
                  >
                    <Ionicons
                      name={link.icon}
                      size={18}
                      color={getThemeColor("blue-600", "blue-400")}
                    />
                  </View>
                  <Text
                    className={`text-base font-medium text-gray-900 dark:text-white`}
                  >
                    {link.title}
                  </Text>
                </View>
                <Ionicons
                  name="open"
                  size={16}
                  color={getThemeColor("gray-400", "gray-400")}
                />
              </Pressable>
            ))}
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  )
}

export default HelpSettingNative

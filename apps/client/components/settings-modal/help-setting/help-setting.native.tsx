import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { useTranslation } from "react-i18next"
import { Linking, Pressable, ScrollView, Text, View } from "react-native"

import tw from "@/tailwind"

export const HelpSettingNative: React.FC = () => {
  const { t } = useTranslation()

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
    <ScrollView style={tw`flex-1 p-6`} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={tw`mb-6`}>
        <View style={tw`flex-row items-center mb-3`}>
          <View
            style={tw`w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 items-center justify-center mr-4`}
          >
            <Ionicons
              name="help-circle"
              size={24}
              color={tw.color("orange-600")}
            />
          </View>
          <Text style={tw`text-2xl font-bold text-gray-900 dark:text-white`}>
            {t("helpSupport")}
          </Text>
        </View>
        <Text
          style={tw`text-gray-600 dark:text-gray-400 text-base leading-relaxed`}
        >
          {t("helpDescription")}
        </Text>
      </View>

      {/* Help Options */}
      <View style={tw`space-y-6`}>
        <View>
          <Text
            style={tw`text-lg font-semibold text-gray-900 dark:text-white mb-4`}
          >
            {t("getHelp")}
          </Text>
          <View style={tw`space-y-4`}>
            {helpOptions.map((option) => (
              <Pressable
                key={option.id}
                style={tw`flex-row items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800`}
                onPress={option.action}
              >
                <View style={tw`flex-row items-center flex-1`}>
                  <View
                    style={tw`w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 items-center justify-center mr-3`}
                  >
                    <Ionicons
                      name={option.icon}
                      size={20}
                      color={tw.color("dark:gray-300 gray-600")}
                    />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text
                      style={tw`text-base font-semibold text-gray-900 dark:text-white mb-1`}
                    >
                      {option.title}
                    </Text>
                    <Text
                      style={tw`text-sm text-gray-600 dark:text-gray-400 leading-relaxed`}
                    >
                      {option.description}
                    </Text>
                  </View>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={tw.color("gray-400")}
                />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Quick Links */}
        <View
          style={tw`mt-6 pt-6 border-t border-gray-200 dark:border-gray-700`}
        >
          <Text
            style={tw`text-lg font-semibold text-gray-900 dark:text-white mb-4`}
          >
            {t("quickLinks")}
          </Text>
          <View style={tw`space-y-3`}>
            {quickLinks.map((link) => (
              <Pressable
                key={link.id}
                style={tw`flex-row items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800`}
                onPress={() => handleLinkPress(link.url)}
              >
                <View style={tw`flex-row items-center`}>
                  <View
                    style={tw`w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 items-center justify-center mr-3`}
                  >
                    <Ionicons
                      name={link.icon}
                      size={18}
                      color={tw.color("blue-600")}
                    />
                  </View>
                  <Text
                    style={tw`text-base font-medium text-gray-900 dark:text-white`}
                  >
                    {link.title}
                  </Text>
                </View>
                <Ionicons name="open" size={16} color={tw.color("gray-400")} />
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

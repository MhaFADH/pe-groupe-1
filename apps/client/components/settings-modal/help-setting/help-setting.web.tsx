import { Ionicons } from "@expo/vector-icons"
import { motion } from "framer-motion"
import React from "react"
import { useTranslation } from "react-i18next"
import { Linking, Pressable, ScrollView, Text, View } from "react-native"

import { useTheme } from "@/components/contexts"
import { getColor } from "@/utils/colors"

export const HelpSettingWeb: React.FC = () => {
  const { t } = useTranslation()
  const { colorScheme } = useTheme()

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
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className={`flex-1 flex flex-col h-full`}
    >
      <View className={`p-8 border-b border-gray-200 dark:border-gray-700`}>
        <View className={`flex-row items-center mb-3`}>
          <View
            className={`w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 items-center justify-center mr-4`}
          >
            <Ionicons
              name="help-circle"
              size={24}
              color={getColor("orange-600")}
            />
          </View>
          <Text className={`text-2xl font-bold text-gray-900 dark:text-white`}>
            {t("helpSupport")}
          </Text>
        </View>
        <Text
          className={`text-gray-600 dark:text-gray-400 text-base leading-relaxed`}
        >
          {t("helpDescription")}
        </Text>
      </View>

      <ScrollView className={`flex-1 p-8`} showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <Text
              className={`text-lg font-semibold text-gray-900 dark:text-white mb-4`}
            >
              {t("getHelp")}
            </Text>
            <View>
              {helpOptions.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Pressable
                    className={`flex-row items-center justify-between p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200`}
                    onPress={option.action}
                  >
                    <View className={`flex-row items-center flex-1`}>
                      <View
                        className={`w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 items-center justify-center mr-4`}
                      >
                        <Ionicons
                          name={option.icon}
                          size={24}
                          color={
                            colorScheme === "dark"
                              ? getColor("gray-300")
                              : getColor("gray-600")
                          }
                        />
                      </View>
                      <View className={`flex-1`}>
                        <Text
                          className={`text-lg font-semibold text-gray-900 dark:text-white mb-1`}
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
                      color={getColor("gray-400")}
                    />
                  </Pressable>
                </motion.div>
              ))}
            </View>
          </View>

          <View
            className={`mt-8 pt-6 border-t border-gray-200 dark:border-gray-700`}
          >
            <Text
              className={`text-lg font-semibold text-gray-900 dark:text-white mb-4`}
            >
              {t("quickLinks")}
            </Text>
            <View className={`flex-row flex-wrap gap-4`}>
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (helpOptions.length + index) * 0.1 }}
                >
                  <Pressable
                    className={`flex-1 min-w-[200px] flex-row items-center p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200`}
                    onPress={() => handleLinkPress(link.url)}
                  >
                    <View
                      className={`w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 items-center justify-center mr-3`}
                    >
                      <Ionicons
                        name={link.icon}
                        size={20}
                        color={getColor("blue-600")}
                      />
                    </View>
                    <View className={`flex-1`}>
                      <Text
                        className={`text-base font-medium text-gray-900 dark:text-white`}
                      >
                        {link.title}
                      </Text>
                    </View>
                  </Pressable>
                </motion.div>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </motion.div>
  )
}

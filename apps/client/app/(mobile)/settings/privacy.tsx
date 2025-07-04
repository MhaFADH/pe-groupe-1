import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { useTranslation } from "react-i18next"
import { Pressable, ScrollView, Switch, Text, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import { useConditionalColor, useThemeColor } from "@/utils/colors"

const PrivacySettingNative: React.FC = () => {
  const { t } = useTranslation()
  const { getThemeColor } = useThemeColor()
  const iconColor = useConditionalColor("gray-600 dark:gray-300")

  const [dataCollection, setDataCollection] = React.useState(false)
  const [analytics, setAnalytics] = React.useState(true)
  const [crashReporting, setCrashReporting] = React.useState(true)
  const [locationSharing, setLocationSharing] = React.useState(false)

  const privacySettings = [
    {
      id: "dataCollection",
      title: t("dataCollection"),
      description: t("dataCollectionDescription"),
      icon: "server" as const,
      enabled: dataCollection,
      onToggle: setDataCollection,
    },
    {
      id: "analytics",
      title: t("analytics"),
      description: t("analyticsDescription"),
      icon: "analytics" as const,
      enabled: analytics,
      onToggle: setAnalytics,
    },
    {
      id: "crashReporting",
      title: t("crashReporting"),
      description: t("crashReportingDescription"),
      icon: "bug" as const,
      enabled: crashReporting,
      onToggle: setCrashReporting,
    },
    {
      id: "locationSharing",
      title: t("locationSharing"),
      description: t("locationSharingDescription"),
      icon: "location" as const,
      enabled: locationSharing,
      onToggle: setLocationSharing,
    },
  ]

  const privacyActions = [
    {
      id: "exportData",
      title: t("exportData"),
      description: t("exportDataDescription"),
      icon: "download" as const,
      action: () => void 0,
    },
    {
      id: "deleteData",
      title: t("deleteData"),
      description: t("deleteDataDescription"),
      icon: "trash" as const,
      action: () => void 0,
      danger: true,
    },
  ]

  return (
    <ScrollView
      className={`flex-1 p-6 bg-white dark:bg-gray-900 `}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeIn.delay(200)} className={`space-y-6`}>
        <View>
          <Text
            className={`text-lg font-semibold text-gray-900 dark:text-white mb-4`}
          >
            {t("dataPrivacy")}
          </Text>
          <View className={`space-y-4`}>
            {privacySettings.map((setting) => (
              <View
                key={setting.id}
                className={`flex-row mb-4 items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800`}
              >
                <View className={`flex-row items-center flex-1`}>
                  <View
                    className={`w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 items-center justify-center mr-3`}
                  >
                    <Ionicons name={setting.icon} size={20} color={iconColor} />
                  </View>
                  <View className={`flex-1`}>
                    <Text
                      className={`text-base font-semibold text-gray-900 dark:text-white mb-1`}
                    >
                      {setting.title}
                    </Text>
                    <Text
                      className={`text-sm text-gray-600 dark:text-gray-400 leading-relaxed`}
                    >
                      {setting.description}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={setting.enabled}
                  onValueChange={setting.onToggle}
                  trackColor={{
                    false: getThemeColor("gray-300", "gray-600"),
                    true: getThemeColor("green-500", "green-400"),
                  }}
                  thumbColor={
                    setting.enabled
                      ? getThemeColor("white", "white")
                      : getThemeColor("gray-400", "gray-300")
                  }
                />
              </View>
            ))}
          </View>
        </View>

        <View
          className={`mt-6 pt-6 border-t border-gray-200 dark:border-gray-700`}
        >
          <Text
            className={`text-lg font-semibold text-gray-900 dark:text-white mb-4`}
          >
            {t("dataManagement")}
          </Text>
          <View className={`space-y-3`}>
            {privacyActions.map((action) => (
              <Pressable
                key={action.id}
                className={`flex-row mb-4 items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800`}
                onPress={action.action}
              >
                <View className={`flex-row items-center`}>
                  <Ionicons
                    name={action.icon}
                    size={20}
                    color={
                      action.danger
                        ? getThemeColor("red-500", "red-400")
                        : iconColor
                    }
                  />
                  <View className={`ml-3`}>
                    <Text
                      className={`text-base font-medium ${
                        action.danger
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {action.title}
                    </Text>
                    <Text
                      className={`text-sm text-gray-500 dark:text-gray-400`}
                    >
                      {action.description}
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
      </Animated.View>
    </ScrollView>
  )
}
export default PrivacySettingNative

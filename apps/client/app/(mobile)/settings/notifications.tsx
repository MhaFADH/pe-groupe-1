import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { useTranslation } from "react-i18next"
import { ScrollView, Switch, Text, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import { useConditionalColor, useThemeColor } from "@/utils/colors"

const NotificationsSettingNative: React.FC = () => {
  const { t } = useTranslation()
  const { getThemeColor } = useThemeColor()
  const iconColor = useConditionalColor("gray-600 dark:gray-300")

  const [pushNotifications, setPushNotifications] = React.useState(true)
  const [emailNotifications, setEmailNotifications] = React.useState(false)
  const [inAppNotifications, setInAppNotifications] = React.useState(true)
  const [soundEnabled, setSoundEnabled] = React.useState(true)

  const notificationSettings = [
    {
      id: "push",
      title: t("pushNotifications"),
      description: t("pushNotificationsDescription"),
      icon: "notifications" as const,
      enabled: pushNotifications,
      onToggle: setPushNotifications,
    },
    {
      id: "email",
      title: t("emailNotifications"),
      description: t("emailNotificationsDescription"),
      icon: "mail" as const,
      enabled: emailNotifications,
      onToggle: setEmailNotifications,
    },
    {
      id: "inApp",
      title: t("inAppNotifications"),
      description: t("inAppNotificationsDescription"),
      icon: "phone-portrait" as const,
      enabled: inAppNotifications,
      onToggle: setInAppNotifications,
    },
    {
      id: "sound",
      title: t("notificationSounds"),
      description: t("notificationSoundsDescription"),
      icon: "volume-high" as const,
      enabled: soundEnabled,
      onToggle: setSoundEnabled,
    },
  ]

  return (
    <ScrollView
      className={`flex-1 p-6 bg-white dark:bg-gray-900`}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeIn.delay(200)} className={`space-y-4`}>
        {notificationSettings.map((setting) => (
          <View
            key={setting.id}
            className={`flex-row items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mb-4`}
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
                true: getThemeColor("blue-500", "blue-400"),
              }}
              thumbColor={
                setting.enabled
                  ? getThemeColor("white", "white")
                  : getThemeColor("gray-400", "gray-300")
              }
            />
          </View>
        ))}
      </Animated.View>
    </ScrollView>
  )
}

export default NotificationsSettingNative

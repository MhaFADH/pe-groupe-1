import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { useTranslation } from "react-i18next"
import { ScrollView, Switch, Text, View } from "react-native"

import tw from "@/tailwind"

export const NotificationsSettingNative: React.FC = () => {
  const { t } = useTranslation()

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
    <ScrollView style={tw`flex-1 p-6`} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={tw`mb-6`}>
        <View style={tw`flex-row items-center mb-3`}>
          <View
            style={tw`w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 items-center justify-center mr-4`}
          >
            <Ionicons
              name="notifications"
              size={24}
              color={tw.color("blue-600")}
            />
          </View>
          <Text style={tw`text-2xl font-bold text-gray-900 dark:text-white`}>
            {t("notifications")}
          </Text>
        </View>
        <Text
          style={tw`text-gray-600 dark:text-gray-400 text-base leading-relaxed`}
        >
          {t("notificationsDescription")}
        </Text>
      </View>

      {/* Settings List */}
      <View style={tw`space-y-4`}>
        {notificationSettings.map((setting) => (
          <View
            key={setting.id}
            style={tw`flex-row items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800`}
          >
            <View style={tw`flex-row items-center flex-1`}>
              <View
                style={tw`w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 items-center justify-center mr-3`}
              >
                <Ionicons
                  name={setting.icon}
                  size={20}
                  color={tw.color("dark:gray-300 gray-600")}
                />
              </View>
              <View style={tw`flex-1`}>
                <Text
                  style={tw`text-base font-semibold text-gray-900 dark:text-white mb-1`}
                >
                  {setting.title}
                </Text>
                <Text
                  style={tw`text-sm text-gray-600 dark:text-gray-400 leading-relaxed`}
                >
                  {setting.description}
                </Text>
              </View>
            </View>
            <Switch
              value={setting.enabled}
              onValueChange={setting.onToggle}
              trackColor={{
                false: tw.color("gray-300"),
                true: tw.color("blue-500"),
              }}
              thumbColor={
                setting.enabled ? tw.color("white") : tw.color("gray-400")
              }
            />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

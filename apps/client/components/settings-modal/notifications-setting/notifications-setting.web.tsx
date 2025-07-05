import { Ionicons } from "@expo/vector-icons"
import { motion } from "framer-motion"
import React from "react"
import { useTranslation } from "react-i18next"
import { Pressable, ScrollView, Switch, Text, View } from "react-native"

import tw from "@/tailwind"

export const NotificationsSettingWeb: React.FC = () => {
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
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      style={tw`flex-1 flex flex-col h-full`}
    >
      {/* Header */}
      <View style={tw`p-8 border-b border-gray-200 dark:border-gray-700`}>
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
      <ScrollView style={tw`flex-1 p-8`} showsVerticalScrollIndicator={false}>
        <View style={tw`space-y-6`}>
          {notificationSettings.map((setting, index) => (
            <motion.div
              key={setting.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <View
                style={tw`flex-row items-center justify-between p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800`}
              >
                <View style={tw`flex-row items-center flex-1`}>
                  <View
                    style={tw`w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 items-center justify-center mr-4`}
                  >
                    <Ionicons
                      name={setting.icon}
                      size={24}
                      color={tw.color("dark:gray-300 gray-600")}
                    />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text
                      style={tw`text-lg font-semibold text-gray-900 dark:text-white mb-1`}
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
            </motion.div>
          ))}
        </View>

        {/* Additional Options */}
        <View
          style={tw`mt-8 pt-6 border-t border-gray-200 dark:border-gray-700`}
        >
          <Text
            style={tw`text-lg font-semibold text-gray-900 dark:text-white mb-4`}
          >
            {t("additionalOptions")}
          </Text>
          <Pressable
            style={tw`flex-row items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200`}
          >
            <View style={tw`flex-row items-center`}>
              <Ionicons
                name="time"
                size={20}
                color={tw.color("dark:gray-400 gray-600")}
              />
              <Text
                style={tw`ml-3 text-base font-medium text-gray-700 dark:text-gray-300`}
              >
                {t("quietHours")}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={tw.color("gray-400")}
            />
          </Pressable>
        </View>
      </ScrollView>
    </motion.div>
  )
}

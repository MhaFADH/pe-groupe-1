import { Ionicons } from "@expo/vector-icons"
import { motion } from "framer-motion"
import React from "react"
import { useTranslation } from "react-i18next"
import { Pressable, ScrollView, Switch, Text, View } from "react-native"

import { getColor, useThemeColor } from "@/utils/colors"

export const NotificationsSettingWeb: React.FC = () => {
  const { t } = useTranslation()
  const { getThemeColor } = useThemeColor()

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
      className={`flex-1 flex flex-col h-full`}
    >
      <View className={`p-8 border-b border-gray-200 dark:border-gray-700`}>
        <View className={`flex-row items-center mb-3`}>
          <View
            className={`w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 items-center justify-center mr-4`}
          >
            <Ionicons
              name="notifications"
              size={24}
              color={getColor("blue-600")}
            />
          </View>
          <Text className={`text-2xl font-bold text-gray-900 dark:text-white`}>
            {t("notifications")}
          </Text>
        </View>
        <Text
          className={`text-gray-600 dark:text-gray-400 text-base leading-relaxed`}
        >
          {t("notificationsDescription")}
        </Text>
      </View>

      <ScrollView className={`flex-1 p-8`} showsVerticalScrollIndicator={false}>
        <View>
          {notificationSettings.map((setting, index) => (
            <motion.div
              key={setting.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <View
                className={`flex-row items-center justify-between p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800`}
              >
                <View className={`flex-row items-center flex-1`}>
                  <View
                    className={`w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 items-center justify-center mr-4`}
                  >
                    <Ionicons
                      name={setting.icon}
                      size={24}
                      color={getThemeColor("gray-600", "gray-300")}
                    />
                  </View>
                  <View className={`flex-1`}>
                    <Text
                      className={`text-lg font-semibold text-gray-900 dark:text-white mb-1`}
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
                    false: "#d1d5db",
                    true: "#3b82f6",
                  }}
                  thumbColor="#ffffff"
                  ios_backgroundColor="#d1d5db"
                />
              </View>
            </motion.div>
          ))}
        </View>

        <View
          className={`mt-8 pt-6 border-t border-gray-200 dark:border-gray-700`}
        >
          <Text
            className={`text-lg font-semibold text-gray-900 dark:text-white mb-4`}
          >
            {t("additionalOptions")}
          </Text>
          <Pressable
            className={`flex-row items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200`}
          >
            <View className={`flex-row items-center`}>
              <Ionicons
                name="time"
                size={20}
                color={getThemeColor("gray-600", "gray-400")}
              />
              <Text
                className={`ml-3 text-base font-medium text-gray-700 dark:text-gray-300`}
              >
                {t("quietHours")}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={getColor("gray-400")}
            />
          </Pressable>
        </View>
      </ScrollView>
    </motion.div>
  )
}

import { Ionicons } from "@expo/vector-icons"
import { motion } from "framer-motion"
import React from "react"
import { useTranslation } from "react-i18next"
import { Pressable, ScrollView, Switch, Text, View } from "react-native"

import { useTheme } from "@/components/contexts"
import { getColor } from "@/utils/colors"

export const PrivacySettingWeb: React.FC = () => {
  const { t } = useTranslation()
  const { colorScheme } = useTheme()

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
            className={`w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 items-center justify-center mr-4`}
          >
            <Ionicons
              name="shield-checkmark"
              size={24}
              color={getColor("green-600")}
            />
          </View>
          <Text className={`text-2xl font-bold text-gray-900 dark:text-white`}>
            {t("privacy")}
          </Text>
        </View>
        <Text
          className={`text-gray-600 dark:text-gray-400 text-base leading-relaxed`}
        >
          {t("privacyDescription")}
        </Text>
      </View>

      <ScrollView className={`flex-1 p-8`} showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <Text
              className={`text-lg font-semibold text-gray-900 dark:text-white mb-4`}
            >
              {t("dataPrivacy")}
            </Text>
            <View>
              {privacySettings.map((setting, index) => (
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
                        true: "#22c55e",
                      }}
                      thumbColor="#ffffff"
                      ios_backgroundColor="#d1d5db"
                    />
                  </View>
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
              {t("dataManagement")}
            </Text>
            <View>
              {privacyActions.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (privacySettings.length + index) * 0.1 }}
                >
                  <Pressable
                    className={`flex-row items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 ${
                      action.danger
                        ? "hover:bg-red-50 dark:hover:bg-red-900/20"
                        : ""
                    }`}
                    onPress={action.action}
                  >
                    <View className={`flex-row items-center`}>
                      <Ionicons
                        name={action.icon}
                        size={20}
                        color={
                          action.danger
                            ? getColor("red-500")
                            : getColor(
                                colorScheme === "dark"
                                  ? "gray-400"
                                  : "gray-600",
                              )
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
                      color={getColor("gray-400")}
                    />
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

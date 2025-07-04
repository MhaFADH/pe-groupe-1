import React from "react";
import { View, Text, Pressable, Switch, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context";
import tw from "../../../lib/tailwind";

export const PrivacySettingWeb: React.FC = () => {
  const { t } = useTranslation();
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";

  const [dataCollection, setDataCollection] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(true);
  const [crashReporting, setCrashReporting] = React.useState(true);
  const [locationSharing, setLocationSharing] = React.useState(false);

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
  ];

  const privacyActions = [
    {
      id: "exportData",
      title: t("exportData"),
      description: t("exportDataDescription"),
      icon: "download" as const,
      action: () => console.log("Export data"),
    },
    {
      id: "deleteData",
      title: t("deleteData"),
      description: t("deleteDataDescription"),
      icon: "trash" as const,
      action: () => console.log("Delete data"),
      danger: true,
    },
  ];

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
            style={tw`w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 items-center justify-center mr-4`}
          >
            <Ionicons
              name="shield-checkmark"
              size={24}
              color={tw.color("green-600")}
            />
          </View>
          <Text style={tw`text-2xl font-bold text-gray-900 dark:text-white`}>
            {t("privacy")}
          </Text>
        </View>
        <Text
          style={tw`text-gray-600 dark:text-gray-400 text-base leading-relaxed`}
        >
          {t("privacyDescription")}
        </Text>
      </View>

      {/* Settings List */}
      <ScrollView style={tw`flex-1 p-8`} showsVerticalScrollIndicator={false}>
        <View style={tw`space-y-6`}>
          <View>
            <Text
              style={tw`text-lg font-semibold text-gray-900 dark:text-white mb-4`}
            >
              {t("dataPrivacy")}
            </Text>
            <View style={tw`space-y-4`}>
              {privacySettings.map((setting, index) => (
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
                          color={tw.color(isDark ? "gray-300" : "gray-600")}
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
                        true: tw.color("green-500"),
                      }}
                      thumbColor={
                        setting.enabled
                          ? tw.color("white")
                          : tw.color("gray-400")
                      }
                    />
                  </View>
                </motion.div>
              ))}
            </View>
          </View>

          {/* Privacy Actions */}
          <View
            style={tw`mt-8 pt-6 border-t border-gray-200 dark:border-gray-700`}
          >
            <Text
              style={tw`text-lg font-semibold text-gray-900 dark:text-white mb-4`}
            >
              {t("dataManagement")}
            </Text>
            <View style={tw`space-y-4`}>
              {privacyActions.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (privacySettings.length + index) * 0.1 }}
                >
                  <Pressable
                    style={tw`flex-row items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 ${
                      action.danger
                        ? "hover:bg-red-50 dark:hover:bg-red-900/20"
                        : ""
                    }`}
                    onPress={action.action}
                  >
                    <View style={tw`flex-row items-center`}>
                      <Ionicons
                        name={action.icon}
                        size={20}
                        color={tw.color(
                          action.danger
                            ? "red-500"
                            : isDark
                            ? "gray-400"
                            : "gray-600"
                        )}
                      />
                      <View style={tw`ml-3`}>
                        <Text
                          style={tw`text-base font-medium ${
                            action.danger
                              ? "text-red-600 dark:text-red-400"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {action.title}
                        </Text>
                        <Text
                          style={tw`text-sm text-gray-500 dark:text-gray-400`}
                        >
                          {action.description}
                        </Text>
                      </View>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color={tw.color("gray-400")}
                    />
                  </Pressable>
                </motion.div>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </motion.div>
  );
};

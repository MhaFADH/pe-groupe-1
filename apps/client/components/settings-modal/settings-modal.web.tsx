/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Ionicons } from "@expo/vector-icons"
import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Modal, Pressable, ScrollView, Text, View } from "react-native"

import {
  AboutSetting,
  DefaultSetting,
  HelpSetting,
  LanguageSetting,
  NotificationsSetting,
  PrivacySetting,
  ThemeSetting,
} from "@/components/settings-modal"
import tw from "@/tailwind"

type SettingsModalProps = {
  isVisible: boolean
  onClose: () => void
}

type SettingsTab =
  | "theme"
  | "language"
  | "about"
  | "notifications"
  | "privacy"
  | "help"

export const SettingsModalWeb: React.FC<SettingsModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<SettingsTab>("theme")

  const settingsItems = [
    {
      id: "theme",
      label: t("darkMode"),
      icon: "color-palette",
      description: t("themeDescription"),
    },
    {
      id: "language",
      label: t("language"),
      icon: "language",
      description: t("languageDescription"),
    },
    {
      id: "notifications",
      label: t("notifications"),
      icon: "notifications",
      description: t("notificationsDescription"),
    },
    {
      id: "privacy",
      label: t("privacy"),
      icon: "shield-checkmark",
      description: t("privacyDescription"),
    },
    {
      id: "about",
      label: t("about"),
      icon: "information-circle",
      description: t("aboutDescription"),
    },
    {
      id: "help",
      label: t("helpSupport"),
      icon: "help-circle",
      description: t("helpDescription"),
    },
  ]

  const handleLogout = () => {
    onClose()
  }

  const renderContent = () => {
    switch (activeTab) {
      case "theme":
        return <ThemeSetting />

      case "language":
        return <LanguageSetting />

      case "notifications":
        return <NotificationsSetting />

      case "privacy":
        return <PrivacySetting />

      case "about":
        return <AboutSetting />

      case "help":
        return <HelpSetting />

      default: {
        const speItem = settingsItems.find((item) => item.id === activeTab)

        return (
          <DefaultSetting
            title={speItem?.label ?? "Setting"}
            description={speItem?.description ?? "Setting description"}
          />
        )
      }
    }
  }

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              willChange: "opacity",
            }}
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "75%",
                maxWidth: 1200,
                height: "80%",
                maxHeight: "85vh",
                minHeight: 600,
                backgroundColor: tw.color("white dark:gray-900"),
                borderRadius: 24,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                overflow: "hidden",
                display: "flex",
                zIndex: 10,
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                perspective: 1000,
              }}
            >
              <View
                style={tw`w-1/3 min-w-[280px] bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}
              >
                <View
                  style={tw`p-6 border-b border-gray-200 dark:border-gray-700`}
                >
                  <View style={tw`flex-row items-center justify-between`}>
                    <Text
                      style={tw`text-2xl font-bold text-gray-900 dark:text-white`}
                    >
                      Settings
                    </Text>
                    <Pressable
                      onPress={onClose}
                      style={tw`p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200`}
                    >
                      <Ionicons
                        name="close"
                        size={24}
                        color={tw.color("gray-500")}
                      />
                    </Pressable>
                  </View>
                </View>

                <ScrollView
                  style={tw`flex-1 p-4`}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={tw`space-y-2`}>
                    {settingsItems.map((item) => {
                      const isActive = activeTab === item.id

                      return (
                        <Pressable
                          key={item.id}
                          style={tw`relative w-full`}
                          onPress={() => setActiveTab(item.id as SettingsTab)}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="activeTab"
                              style={tw`absolute inset-0 bg-purple-100 dark:bg-purple-900/20 rounded-xl`}
                              initial={false}
                              transition={{ duration: 0.15, ease: "easeOut" }}
                            />
                          )}

                          <View
                            style={tw`relative flex-row items-center p-4 rounded-xl transition-all duration-200 min-h-[72px] ${
                              isActive
                                ? "bg-transparent"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            <View
                              style={tw`w-8 h-8 rounded-lg ${
                                isActive
                                  ? "bg-purple-600"
                                  : "bg-gray-200 dark:bg-gray-600"
                              } items-center justify-center mr-3 flex-shrink-0`}
                            >
                              <Ionicons
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                                name={item.icon as any}
                                size={18}
                                color={
                                  isActive ? "white" : tw.color("gray-500")
                                }
                              />
                            </View>
                            <View style={tw`flex-1 min-w-0`}>
                              <Text
                                style={tw`text-sm font-semibold ${
                                  isActive
                                    ? "text-purple-600 dark:text-purple-400"
                                    : "text-gray-700 dark:text-gray-300"
                                } leading-tight`}
                              >
                                {item.label}
                              </Text>
                              <Text
                                style={tw`text-xs text-gray-500 dark:text-gray-400 mt-1 leading-tight`}
                              >
                                {item.description}
                              </Text>
                            </View>
                            <View style={tw`w-4 flex-shrink-0 ml-2`}>
                              {isActive && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.1 }}
                                >
                                  <Ionicons
                                    name="chevron-forward"
                                    size={16}
                                    color={tw.color("purple-500")}
                                  />
                                </motion.div>
                              )}
                            </View>
                          </View>
                        </Pressable>
                      )
                    })}
                  </View>

                  <View
                    style={tw`mt-8 pt-6 border-t border-gray-200 dark:border-gray-700`}
                  >
                    <Pressable
                      style={tw`flex-row items-center p-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 w-full`}
                      onPress={handleLogout}
                    >
                      <View
                        style={tw`w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 items-center justify-center mr-3 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors duration-200`}
                      >
                        <Ionicons
                          name="log-out"
                          size={18}
                          color={tw.color("red-500")}
                        />
                      </View>
                      <Text
                        style={tw`text-sm font-semibold text-red-600 dark:text-red-400`}
                      >
                        {t("logout")}
                      </Text>
                    </Pressable>
                  </View>
                </ScrollView>
              </View>

              <View
                style={tw`flex-1 flex flex-col bg-gray-50 dark:bg-gray-900`}
              >
                <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
              </View>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  )
}

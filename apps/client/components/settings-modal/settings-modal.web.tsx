/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Ionicons } from "@expo/vector-icons"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Modal, Pressable, ScrollView, Text, View } from "react-native"

import { getColor, useThemeColor } from "@/utils/colors"

import { useAuthManager } from "../contexts"
import { useModalPersistence } from "../contexts/modal-persistence"
import { AboutSettingWeb } from "./about-setting/about-setting.web"
import { HelpSettingWeb } from "./help-setting/help-setting.web"
import { LanguageSettingWeb } from "./language-setting/language-setting.web"
import { NotificationsSettingWeb } from "./notifications-setting/notifications-setting.web"
import { PrivacySettingWeb } from "./privacy-setting/privacy-setting.web"
import { ThemeSettingWeb } from "./theme-setting/theme-setting.web"

type SettingsTab =
  | "theme"
  | "language"
  | "about"
  | "notifications"
  | "privacy"
  | "help"

export const SettingsModalWeb = () => {
  const { t } = useTranslation()
  const { getThemeColor } = useThemeColor()
  const [activeTab, setActiveTab] = useState<SettingsTab>("theme")
  const { signOut } = useAuthManager()
  const { isModalVisible, setModalVisibility } = useModalPersistence()

  const handleClose = () => {
    setModalVisibility(false)
  }

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
    void signOut()
  }

  const renderContent = () => {
    switch (activeTab) {
      case "theme":
        return <ThemeSettingWeb />

      case "language":
        return <LanguageSettingWeb />

      case "notifications":
        return <NotificationsSettingWeb />

      case "privacy":
        return <PrivacySettingWeb />

      case "about":
        return <AboutSettingWeb />

      case "help":
        return <HelpSettingWeb />

      default: {
        return <></>
      }
    }
  }

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <AnimatePresence>
        {isModalVisible && (
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
            onClick={handleClose}
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
                backgroundColor: getColor("white dark:gray-900"),
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
                className={`w-1/3 min-w-[280px] bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}
              >
                <View
                  className={`p-6 border-b border-gray-200 dark:border-gray-700`}
                >
                  <View className={`flex-row items-center justify-between`}>
                    <Text
                      className={`text-2xl font-bold text-gray-900 dark:text-white`}
                    >
                      Settings
                    </Text>
                    <Pressable
                      onPress={handleClose}
                      className={`p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200`}
                    >
                      <Ionicons
                        name="close"
                        size={24}
                        color={getColor("gray-500")}
                      />
                    </Pressable>
                  </View>
                </View>

                <ScrollView
                  className={`flex-1 p-4`}
                  showsVerticalScrollIndicator={false}
                >
                  <View>
                    {settingsItems.map((item) => {
                      const isActive = activeTab === item.id

                      return (
                        <Pressable
                          key={item.id}
                          className={`relative w-full`}
                          onPress={() => setActiveTab(item.id as SettingsTab)}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="activeTab"
                              className={`absolute inset-0 bg-purple-100 dark:bg-purple-900/20 rounded-xl`}
                              initial={false}
                              transition={{ duration: 0.15, ease: "easeOut" }}
                            />
                          )}

                          <View
                            className={`relative flex-row items-center p-4 rounded-xl transition-all duration-200 min-h-[72px] ${
                              isActive
                                ? "bg-transparent"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            <View
                              className={`w-8 h-8 rounded-lg ${
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
                                  isActive ? "white" : getColor("gray-500")
                                }
                              />
                            </View>
                            <View className={`flex-1 min-w-0`}>
                              <Text
                                className={`text-sm font-semibold ${
                                  isActive
                                    ? "text-purple-600 dark:text-purple-400"
                                    : "text-gray-700 dark:text-gray-300"
                                } leading-tight`}
                              >
                                {item.label}
                              </Text>
                              <Text
                                className={`text-xs text-gray-500 dark:text-gray-400 mt-1 leading-tight`}
                              >
                                {item.description}
                              </Text>
                            </View>
                            <View className={`w-4 flex-shrink-0 ml-2`}>
                              {isActive && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.1 }}
                                >
                                  <Ionicons
                                    name="chevron-forward"
                                    size={16}
                                    color={getColor("purple-500")}
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
                    className={`mt-8 pt-6 border-t border-gray-200 dark:border-gray-700`}
                  >
                    <Pressable
                      className={`flex-row items-center p-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 w-full`}
                      onPress={handleLogout}
                    >
                      <View
                        className={`w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 items-center justify-center mr-3 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors duration-200`}
                      >
                        <Ionicons
                          name="log-out"
                          size={18}
                          color={getThemeColor("red-500", "red-400")}
                        />
                      </View>
                      <Text
                        className={`text-sm font-semibold text-red-600 dark:text-red-400`}
                      >
                        {t("logout")}
                      </Text>
                    </Pressable>
                  </View>
                </ScrollView>
              </View>

              <View
                className={`flex-1 flex flex-col bg-gray-50 dark:bg-gray-900`}
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

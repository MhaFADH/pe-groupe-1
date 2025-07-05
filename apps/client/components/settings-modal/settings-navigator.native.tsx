import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { AboutSetting } from "./about-setting"
import { HelpSetting } from "./help-setting"
import { LanguageSetting } from "./language-setting"
import { NotificationsSetting } from "./notifications-setting"
import { PrivacySetting } from "./privacy-setting"
import { SettingsListNative, type SettingsScreen } from "./settings-list.native"
import { SettingsScreenNative } from "./settings-screen.native"
import { ThemeSetting } from "./theme-setting"

export const SettingsNavigatorNative: React.FC = () => {
  const { t } = useTranslation()
  const [currentScreen, setCurrentScreen] = useState<SettingsScreen | null>(
    null,
  )

  const handleSettingPress = (setting: SettingsScreen) => {
    setCurrentScreen(setting)
  }

  const handleBack = () => {
    setCurrentScreen(null)
  }

  const handleLogout = () => {
    // Handle logout logic here
  }

  const getScreenTitle = (screen: SettingsScreen): string => {
    switch (screen) {
      case "theme":
        return t("darkMode")

      case "language":
        return t("language")

      case "notifications":
        return t("notifications")

      case "privacy":
        return t("privacy")

      case "about":
        return t("about")

      case "help":
        return t("helpSupport")

      default:
        return t("settings")
    }
  }

  const renderSettingScreen = (screen: SettingsScreen) => {
    switch (screen) {
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

      default:
        return null
    }
  }

  if (currentScreen) {
    return (
      <SettingsScreenNative
        title={getScreenTitle(currentScreen)}
        onBack={handleBack}
      >
        {renderSettingScreen(currentScreen)}
      </SettingsScreenNative>
    )
  }

  return (
    <SettingsListNative
      onSettingPress={handleSettingPress}
      onLogout={handleLogout}
    />
  )
}

import React, { useState } from "react";
import { View } from "react-native";
import { SettingsListNative, SettingsScreen } from "./settings-list.native";
import { SettingsScreenNative } from "./settings-screen.native";
import { ThemeSettingNative } from "./theme-setting";
import { LanguageSettingNative } from "./language-setting";
import { AboutSettingNative } from "./about-setting";
import { NotificationsSettingNative } from "./notifications-setting";
import { PrivacySettingNative } from "./privacy-setting";
import { HelpSettingNative } from "./help-setting";
import { useTranslation } from "react-i18next";

export const SettingsNavigatorNative: React.FC = () => {
  const { t } = useTranslation();
  const [currentScreen, setCurrentScreen] = useState<SettingsScreen | null>(
    null
  );

  const handleSettingPress = (setting: SettingsScreen) => {
    setCurrentScreen(setting);
  };

  const handleBack = () => {
    setCurrentScreen(null);
  };

  const handleLogout = () => {
    console.log("Logout pressed");
    // Handle logout logic here
  };

  const getScreenTitle = (screen: SettingsScreen): string => {
    switch (screen) {
      case "theme":
        return t("darkMode");
      case "language":
        return t("language");
      case "notifications":
        return t("notifications");
      case "privacy":
        return t("privacy");
      case "about":
        return t("about");
      case "help":
        return t("helpSupport");
      default:
        return t("settings");
    }
  };

  const renderSettingScreen = (screen: SettingsScreen) => {
    switch (screen) {
      case "theme":
        return <ThemeSettingNative />;
      case "language":
        return <LanguageSettingNative />;
      case "notifications":
        return <NotificationsSettingNative />;
      case "privacy":
        return <PrivacySettingNative />;
      case "about":
        return <AboutSettingNative />;
      case "help":
        return <HelpSettingNative />;
      default:
        return null;
    }
  };

  if (currentScreen) {
    return (
      <SettingsScreenNative
        title={getScreenTitle(currentScreen)}
        onBack={handleBack}
      >
        {renderSettingScreen(currentScreen)}
      </SettingsScreenNative>
    );
  }

  return (
    <SettingsListNative
      onSettingPress={handleSettingPress}
      onLogout={handleLogout}
    />
  );
};

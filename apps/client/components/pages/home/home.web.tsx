import React, { useState, useMemo } from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { HeaderWeb as Header } from "../../components/header/header.web";
import { FooterWeb as Footer } from "../../components/footer/footer.web";
import { ButtonWeb as Button } from "../../components/button/button.web";
import { SettingsModalWeb as SettingsModal } from "../../components/settings-modal/settings-modal.web";
import { useTheme } from "../../context/ThemeContext";
import tw from "../../lib/tailwind";

export interface HomeProps {
  onNavigate?: (page: "login" | "home") => void;
  appName?: string;
  onBackToLogin?: () => void;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const HomeWeb: React.FC<HomeProps> = ({
  onNavigate,
  appName,
  onBackToLogin,
  className = "",
  contentClassName = "",
  titleClassName = "",
  subtitleClassName = "",
}) => {
  const { t } = useTranslation();
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  // Use theme context to force re-renders when theme changes
  const { version } = useTheme();

  const settingsModal = useMemo(
    () => (
      <SettingsModal
        isVisible={isSettingsVisible}
        onClose={() => setIsSettingsVisible(false)}
      />
    ),
    [isSettingsVisible]
  );

  const handleBackToLogin = () => {
    if (onBackToLogin) {
      onBackToLogin();
    } else {
      console.log("Back to login pressed");
      onNavigate?.("login");
    }
  };

  const handleLogoPress = () => {
    // Navigate to home - if already on home, scroll to top
    if (onNavigate) {
      onNavigate("home");
    }
    // On web, also scroll to top smoothly
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-50 dark:bg-gray-900 ${className}`}>
      <Header
        appName={appName || t("appName")}
        onSettingsPress={() => setIsSettingsVisible(true)}
        onLogoPress={handleLogoPress}
      />

      <View
        style={tw`flex-1 items-center justify-center px-6 md:px-24 bg-gray-50 dark:bg-gray-900 ${contentClassName}`}
      >
        <View style={tw`items-center gap-4`}>
          <Text
            style={tw`text-lg text-gray-700 dark:text-gray-300 text-center font-medium mb-2 ${titleClassName}`}
          >
            {t("welcomeHome")}
          </Text>
          <Text
            style={tw`text-sm text-gray-600 dark:text-gray-400 text-center mb-4 ${subtitleClassName}`}
          >
            {t("contentComingSoon")}
          </Text>

          <Button
            title={t("backToLogin")}
            variant="outline"
            size="md"
            onPress={handleBackToLogin}
          />
        </View>
      </View>

      <Footer
        appName={appName || t("appName")}
        copyright={t("copyright")}
        links={[
          {
            title: t("contactUs"),
            onPress: () => console.log("Contact Us pressed"),
          },
          {
            title: t("termsConditions"),
            onPress: () => console.log("Terms & Conditions pressed"),
          },
          {
            title: t("privacyPolicy"),
            onPress: () => console.log("Privacy Policy pressed"),
          },
        ]}
      />

      {settingsModal}
    </View>
  );
};

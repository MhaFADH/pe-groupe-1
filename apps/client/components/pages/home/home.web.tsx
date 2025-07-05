import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"

import { Button, Footer, Header } from "@/components"
import { SettingsModalWeb } from "@/components/settings-modal/settings-modal.web"
import tw from "@/tailwind"

export type HomeProps = {
  onNavigate?: (page: "login" | "home") => void
  appName?: string
  onBackToLogin?: () => void
  className?: string
  contentClassName?: string
  titleClassName?: string
  subtitleClassName?: string
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
  const { t } = useTranslation()
  const [isSettingsVisible, setIsSettingsVisible] = useState(false)

  const settingsModal = useMemo(
    () => (
      <SettingsModalWeb
        isVisible={isSettingsVisible}
        onClose={() => setIsSettingsVisible(false)}
      />
    ),
    [isSettingsVisible],
  )

  const handleBackToLogin = () => {
    if (onBackToLogin) {
      onBackToLogin()
    } else {
      onNavigate?.("login")
    }
  }

  const handleLogoPress = () => {
    if (onNavigate) {
      onNavigate("home")
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <View style={tw`flex-1 bg-gray-50 dark:bg-gray-900 ${className}`}>
      <Header
        appName={appName ?? t("appName")}
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
        appName={appName ?? t("appName")}
        copyright={t("copyright")}
        links={[
          {
            title: t("contactUs"),
            onPress: () => void 0,
          },
          {
            title: t("termsConditions"),
            onPress: () => void 0,
          },
          {
            title: t("privacyPolicy"),
            onPress: () => void 0,
          },
        ]}
      />

      {settingsModal}
    </View>
  )
}

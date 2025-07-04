import { usePathname } from "expo-router"
import React from "react"
import { useTranslation } from "react-i18next"
import { Pressable, Text, View } from "react-native"

const FooterLinkComponent: React.FC<{
  title: string
  onPress: () => void
  className?: string
}> = ({ title, onPress, className = "" }) => (
  <Pressable
    onPress={onPress}
    className={`px-2 py-2 opacity-100 active:opacity-70 ${className}`}
  >
    <Text className={`text-base text-gray-500 dark:text-gray-400 font-medium`}>
      {title}
    </Text>
  </Pressable>
)

export const FooterWeb = () => {
  const { t } = useTranslation()

  const links = [
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
  ]

  if (usePathname() === "/") {
    return null
  }

  return (
    <View
      className={`bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-6 w-full `}
    >
      <View
        className={`flex-row flex-wrap md:flex-nowrap items-center justify-between max-w-screen-xl mx-auto w-full`}
      >
        <View className={`mb-4 md:mb-0`}>
          <Text
            className={`text-lg font-semibold text-gray-900 dark:text-white mb-1`}
          >
            {t("appName")}
          </Text>
          <Text className={`text-xs text-gray-500 dark:text-gray-400 `}>
            {t("copyright")}
          </Text>
        </View>
        <View className={`flex-row flex-wrap gap-6`}>
          {links.map((link, index) => (
            <FooterLinkComponent
              key={index}
              title={link.title}
              onPress={link.onPress}
            />
          ))}
        </View>
      </View>
    </View>
  )
}

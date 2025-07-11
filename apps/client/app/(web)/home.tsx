import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"

const HomeWeb = () => {
  const { t } = useTranslation()

  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <View className={`flex-1 bg-gray-50 dark:bg-gray-900 `}>
      <View
        className={`flex-1 items-center justify-center px-6 md:px-24 bg-gray-50 dark:bg-gray-900 `}
      >
        <View className="items-center gap-4">
          <Text
            className={`text-lg text-gray-700 dark:text-gray-300 text-center font-medium mb-2 `}
          >
            {t("welcomeHome")}
          </Text>
          <Text
            className={`text-sm text-gray-600 dark:text-gray-400 text-center mb-4`}
          >
            {t("contentComingSoon")}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default HomeWeb

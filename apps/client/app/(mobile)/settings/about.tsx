import React from "react"
import { useTranslation } from "react-i18next"
import { ScrollView, Text, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

const AboutSettingNative: React.FC = () => {
  const { t } = useTranslation()

  return (
    <ScrollView
      className={`flex-1 p-6 bg-white dark:bg-gray-900`}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeIn.delay(200)} className={`space-y-6`}>
        <View
          className={`bg-white mb-4 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm`}
        >
          <Text
            className={`text-lg font-semibold text-gray-900 dark:text-white mb-4`}
          >
            {t("appInformation")}
          </Text>
          <View className={`space-y-3`}>
            <View className={`flex-row justify-between`}>
              <Text className={`text-gray-600 dark:text-gray-400`}>
                {t("version")}
              </Text>
              <Text className={`font-medium text-gray-900 dark:text-white`}>
                1.0.0
              </Text>
            </View>
            <View className={`flex-row justify-between`}>
              <Text className={`text-gray-600 dark:text-gray-400`}>
                {t("buildNumber")}
              </Text>
              <Text className={`font-medium text-gray-900 dark:text-white`}>
                2025.01
              </Text>
            </View>
            <View className={`flex-row justify-between`}>
              <Text className={`text-gray-600 dark:text-gray-400`}>
                {t("lastUpdate")}
              </Text>
              <Text className={`font-medium text-gray-900 dark:text-white`}>
                January 2025
              </Text>
            </View>
          </View>
        </View>

        <View
          className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm`}
        >
          <Text
            className={`text-lg font-semibold text-gray-900 dark:text-white mb-3`}
          >
            {t("appName")}
          </Text>
          <Text
            className={`text-gray-600 dark:text-gray-400 leading-relaxed mb-4`}
          >
            {t("appDescription")}
          </Text>
          <Text className={`text-gray-600 dark:text-gray-400 leading-relaxed`}>
            {t("appSubtitle")}
          </Text>
        </View>

        <View
          className={`mt-6 pt-6 border-t border-gray-200 dark:border-gray-700`}
        >
          <Text
            className={`text-center text-gray-500 dark:text-gray-400 text-sm`}
          >
            {t("copyright")}
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
  )
}

export default AboutSettingNative

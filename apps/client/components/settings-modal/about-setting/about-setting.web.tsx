import { motion } from "framer-motion"
import React from "react"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"

export const AboutSettingWeb: React.FC = () => {
  const { t } = useTranslation()

  return (
    <motion.div
      key="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`h-full`}
    >
      <View className={`p-8`}>
        <View className={`mb-8`}>
          <Text
            className={`text-3xl font-bold mb-2 text-gray-900 dark:text-white`}
          >
            {t("about")}
          </Text>
          <Text className={`text-gray-600 dark:text-gray-300`}>
            {t("aboutDescription")}
          </Text>
        </View>

        <View>
          <View
            className={`rounded-2xl p-6 border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}
          >
            <Text
              className={`text-xl font-semibold mb-4 text-gray-900 dark:text-white`}
            >
              {t("appName")}
            </Text>
            <View>
              <View className={`flex-row justify-between`}>
                <Text className={`text-gray-600 dark:text-gray-300`}>
                  Version
                </Text>
                <Text className={`font-medium text-gray-900 dark:text-white`}>
                  1.0.0
                </Text>
              </View>
              <View className={`flex-row justify-between`}>
                <Text className={`text-gray-600 dark:text-gray-300`}>
                  Build
                </Text>
                <Text className={`font-medium text-gray-900 dark:text-white`}>
                  2024.01
                </Text>
              </View>
              <View className={`flex-row justify-between`}>
                <Text className={`text-gray-600 dark:text-gray-300`}>
                  Platform
                </Text>
                <Text className={`font-medium text-gray-900 dark:text-white`}>
                  Web
                </Text>
              </View>
            </View>
          </View>

          <View
            className={`rounded-2xl p-6 border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}
          >
            <Text
              className={`text-lg font-semibold mb-3 text-gray-900 dark:text-white`}
            >
              Description
            </Text>
            <Text
              className={`leading-relaxed text-gray-600 dark:text-gray-300`}
            >
              {t("appDescription")}
            </Text>
          </View>
        </View>
      </View>
    </motion.div>
  )
}

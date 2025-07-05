import { motion } from "framer-motion"
import React from "react"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"

import tw from "@/tailwind"

export const AboutSettingWeb: React.FC = () => {
  const { t } = useTranslation()

  return (
    <motion.div
      key="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={tw`h-full`}
    >
      <View style={tw`p-8`}>
        <View style={tw`mb-8`}>
          <Text
            style={tw`text-3xl font-bold mb-2 text-gray-900 dark:text-white`}
          >
            {t("about")}
          </Text>
          <Text style={tw`text-gray-600 dark:text-gray-300`}>
            {t("aboutDescription")}
          </Text>
        </View>

        <View style={tw`space-y-6`}>
          <View
            style={tw`rounded-2xl p-6 border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}
          >
            <Text
              style={tw`text-xl font-semibold mb-4 text-gray-900 dark:text-white`}
            >
              {t("appName")}
            </Text>
            <View style={tw`space-y-3`}>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-gray-600 dark:text-gray-300`}>
                  Version
                </Text>
                <Text style={tw`font-medium text-gray-900 dark:text-white`}>
                  1.0.0
                </Text>
              </View>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-gray-600 dark:text-gray-300`}>Build</Text>
                <Text style={tw`font-medium text-gray-900 dark:text-white`}>
                  2024.01
                </Text>
              </View>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-gray-600 dark:text-gray-300`}>
                  Platform
                </Text>
                <Text style={tw`font-medium text-gray-900 dark:text-white`}>
                  Web
                </Text>
              </View>
            </View>
          </View>

          <View
            style={tw`rounded-2xl p-6 border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}
          >
            <Text
              style={tw`text-lg font-semibold mb-3 text-gray-900 dark:text-white`}
            >
              Description
            </Text>
            <Text style={tw`leading-relaxed text-gray-600 dark:text-gray-300`}>
              {t("appDescription")}
            </Text>
          </View>
        </View>
      </View>
    </motion.div>
  )
}

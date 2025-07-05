import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { useTranslation } from "react-i18next"
import { ScrollView, Text, View } from "react-native"

import tw from "@/tailwind"

export const AboutSettingNative: React.FC = () => {
  const { t } = useTranslation()

  return (
    <ScrollView style={tw`flex-1 p-6`} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={tw`mb-6`}>
        <View style={tw`flex-row items-center mb-3`}>
          <View
            style={tw`w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 items-center justify-center mr-4`}
          >
            <Ionicons
              name="information-circle"
              size={24}
              color={tw.color("blue-600")}
            />
          </View>
          <Text style={tw`text-2xl font-bold text-gray-900 dark:text-white`}>
            {t("about")}
          </Text>
        </View>
        <Text
          style={tw`text-gray-600 dark:text-gray-400 text-base leading-relaxed`}
        >
          {t("aboutDescription")}
        </Text>
      </View>

      {/* App Information */}
      <View style={tw`space-y-6`}>
        <View
          style={tw`bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm`}
        >
          <Text
            style={tw`text-lg font-semibold text-gray-900 dark:text-white mb-4`}
          >
            {t("appInformation")}
          </Text>
          <View style={tw`space-y-3`}>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600 dark:text-gray-400`}>
                {t("version")}
              </Text>
              <Text style={tw`font-medium text-gray-900 dark:text-white`}>
                1.0.0
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600 dark:text-gray-400`}>
                {t("buildNumber")}
              </Text>
              <Text style={tw`font-medium text-gray-900 dark:text-white`}>
                2025.01
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600 dark:text-gray-400`}>
                {t("lastUpdate")}
              </Text>
              <Text style={tw`font-medium text-gray-900 dark:text-white`}>
                January 2025
              </Text>
            </View>
          </View>
        </View>

        <View
          style={tw`bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm`}
        >
          <Text
            style={tw`text-lg font-semibold text-gray-900 dark:text-white mb-3`}
          >
            {t("appName")}
          </Text>
          <Text
            style={tw`text-gray-600 dark:text-gray-400 leading-relaxed mb-4`}
          >
            {t("appDescription")}
          </Text>
          <Text style={tw`text-gray-600 dark:text-gray-400 leading-relaxed`}>
            {t("appSubtitle")}
          </Text>
        </View>

        {/* Footer */}
        <View
          style={tw`mt-6 pt-6 border-t border-gray-200 dark:border-gray-700`}
        >
          <Text
            style={tw`text-center text-gray-500 dark:text-gray-400 text-sm`}
          >
            {t("copyright")}
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

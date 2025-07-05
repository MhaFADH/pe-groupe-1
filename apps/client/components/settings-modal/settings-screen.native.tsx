import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Pressable, Text, View } from "react-native"

import tw from "@/tailwind"

type SettingsScreenProps = {
  title: string
  onBack: () => void
  children: React.ReactNode
}

export const SettingsScreenNative: React.FC<SettingsScreenProps> = ({
  title,
  onBack,
  children,
}) => (
  <View style={tw`flex-1 bg-gray-50 dark:bg-gray-900`}>
    <View
      style={tw`bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700`}
    >
      <View style={tw`flex-row items-center`}>
        <Pressable
          onPress={onBack}
          style={tw`mr-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-700`}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={tw.color("dark:white gray-900")}
          />
        </Pressable>
        <View style={tw`flex-1`}>
          <Text style={tw`text-xl font-bold text-gray-900 dark:text-white`}>
            {title}
          </Text>
        </View>
      </View>
    </View>

    {/* Content */}
    <View style={tw`flex-1`}>{children}</View>
  </View>
)

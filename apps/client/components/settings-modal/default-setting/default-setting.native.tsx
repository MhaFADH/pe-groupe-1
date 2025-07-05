import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Text, View } from "react-native"

import tw from "@/tailwind"

export type DefaultSettingProps = {
  title: string
  description: string
}

export const DefaultSettingNative: React.FC<DefaultSettingProps> = ({
  title,
  description,
}) => (
  <View style={tw`h-full`}>
    <View style={tw`p-8`}>
      <View style={tw`mb-8`}>
        <Text style={tw`text-3xl font-bold text-text dark:text-textDark mb-2`}>
          {title}
        </Text>
        <Text style={tw`text-textSecondary dark:text-textSecondaryDark`}>
          {description}
        </Text>
      </View>

      <View
        style={tw`bg-background dark:bg-backgroundDark rounded-2xl p-8 border border-border dark:border-borderDark shadow-sm items-center`}
      >
        <View style={tw`mb-4`}>
          <Ionicons name="construct" size={48} color={tw.color("gray-400")} />
        </View>
        <Text
          style={tw`text-xl font-semibold text-text dark:text-textDark mb-2`}
        >
          Coming Soon
        </Text>
        <Text
          style={tw`text-textSecondary dark:text-textSecondaryDark text-center`}
        >
          This feature is currently under development and will be available in a
          future update.
        </Text>
      </View>
    </View>
  </View>
)

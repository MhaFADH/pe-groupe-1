import { Ionicons } from "@expo/vector-icons"
import { motion } from "framer-motion"
import React from "react"
import { Text, View } from "react-native"

import tw from "@/tailwind"

import { type DefaultSettingProps } from "./default-setting.native"

export const DefaultSettingWeb: React.FC<DefaultSettingProps> = ({
  title,
  description,
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.15, ease: "easeOut" }}
    style={tw`h-full`}
  >
    <View style={tw`p-8`}>
      <View style={tw`mb-8`}>
        <Text style={tw`text-3xl font-bold mb-2 text-gray-900 dark:text-white`}>
          {title}
        </Text>
        <Text style={tw`text-gray-600 dark:text-gray-300`}>{description}</Text>
      </View>

      <View
        style={tw`rounded-2xl p-8 border shadow-sm items-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}
      >
        <View style={tw`mb-4`}>
          <Ionicons name="construct" size={48} color={tw.color("gray-400")} />
        </View>
        <Text
          style={tw`text-xl font-semibold mb-2 text-gray-900 dark:text-white`}
        >
          Coming Soon
        </Text>
        <Text style={tw`text-center text-gray-600 dark:text-gray-300`}>
          This feature is currently under development and will be available in a
          future update.
        </Text>
      </View>
    </View>
  </motion.div>
)

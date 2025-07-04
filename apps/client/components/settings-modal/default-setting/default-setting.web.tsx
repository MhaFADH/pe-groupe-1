import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { motion } from "framer-motion";
import { useTheme } from "../../../context";
import tw from "../../../lib/tailwind";

interface DefaultSettingProps {
  title: string;
  description: string;
}

export const DefaultSettingWeb: React.FC<DefaultSettingProps> = ({
  title,
  description,
}) => {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={tw`h-full`}
    >
      <View style={tw`p-8`}>
        <View style={tw`mb-8`}>
          <Text
            style={[
              tw`text-3xl font-bold mb-2`,
              { color: isDark ? "#ffffff" : "#111827" },
            ]}
          >
            {title}
          </Text>
          <Text style={[tw``, { color: isDark ? "#d1d5db" : "#6b7280" }]}>
            {description}
          </Text>
        </View>

        <View
          style={[
            tw`rounded-2xl p-8 border shadow-sm items-center`,
            {
              backgroundColor: isDark ? "#374151" : "#ffffff",
              borderColor: isDark ? "#4b5563" : "#e5e7eb",
            },
          ]}
        >
          <View style={tw`mb-4`}>
            <Ionicons name="construct" size={48} color="#9ca3af" />
          </View>
          <Text
            style={[
              tw`text-xl font-semibold mb-2`,
              { color: isDark ? "#ffffff" : "#111827" },
            ]}
          >
            Coming Soon
          </Text>
          <Text
            style={[tw`text-center`, { color: isDark ? "#d1d5db" : "#6b7280" }]}
          >
            This feature is currently under development and will be available in
            a future update.
          </Text>
        </View>
      </View>
    </motion.div>
  );
};

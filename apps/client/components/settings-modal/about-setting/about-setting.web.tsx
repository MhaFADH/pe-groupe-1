import React from "react";
import { View, Text } from "react-native";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context";
import tw from "../../../lib/tailwind";

export const AboutSettingWeb: React.FC = () => {
  const { colorScheme } = useTheme();
  const { t } = useTranslation();
  const isDark = colorScheme === "dark";

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
            style={[
              tw`text-3xl font-bold mb-2`,
              { color: isDark ? "#ffffff" : "#111827" },
            ]}
          >
            {t("about")}
          </Text>
          <Text style={[tw``, { color: isDark ? "#d1d5db" : "#6b7280" }]}>
            {t("aboutDescription")}
          </Text>
        </View>

        <View style={tw`space-y-6`}>
          <View
            style={[
              tw`rounded-2xl p-6 border shadow-sm`,
              {
                backgroundColor: isDark ? "#374151" : "#ffffff",
                borderColor: isDark ? "#4b5563" : "#e5e7eb",
              },
            ]}
          >
            <Text
              style={[
                tw`text-xl font-semibold mb-4`,
                { color: isDark ? "#ffffff" : "#111827" },
              ]}
            >
              {t("appName")}
            </Text>
            <View style={tw`space-y-3`}>
              <View style={tw`flex-row justify-between`}>
                <Text style={[tw``, { color: isDark ? "#d1d5db" : "#6b7280" }]}>
                  Version
                </Text>
                <Text
                  style={[
                    tw`font-medium`,
                    { color: isDark ? "#ffffff" : "#111827" },
                  ]}
                >
                  1.0.0
                </Text>
              </View>
              <View style={tw`flex-row justify-between`}>
                <Text style={[tw``, { color: isDark ? "#d1d5db" : "#6b7280" }]}>
                  Build
                </Text>
                <Text
                  style={[
                    tw`font-medium`,
                    { color: isDark ? "#ffffff" : "#111827" },
                  ]}
                >
                  2024.01
                </Text>
              </View>
              <View style={tw`flex-row justify-between`}>
                <Text style={[tw``, { color: isDark ? "#d1d5db" : "#6b7280" }]}>
                  Platform
                </Text>
                <Text
                  style={[
                    tw`font-medium`,
                    { color: isDark ? "#ffffff" : "#111827" },
                  ]}
                >
                  Web
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              tw`rounded-2xl p-6 border shadow-sm`,
              {
                backgroundColor: isDark ? "#374151" : "#ffffff",
                borderColor: isDark ? "#4b5563" : "#e5e7eb",
              },
            ]}
          >
            <Text
              style={[
                tw`text-lg font-semibold mb-3`,
                { color: isDark ? "#ffffff" : "#111827" },
              ]}
            >
              Description
            </Text>
            <Text
              style={[
                tw`leading-relaxed`,
                { color: isDark ? "#d1d5db" : "#6b7280" },
              ]}
            >
              {t("appDescription")}
            </Text>
          </View>
        </View>
      </View>
    </motion.div>
  );
};

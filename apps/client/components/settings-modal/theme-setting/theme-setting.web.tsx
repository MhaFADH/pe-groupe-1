import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context";
import tw from "../../../lib/tailwind";

export const ThemeSettingWeb: React.FC = () => {
  const { colorScheme, setTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = colorScheme === "dark";

  return (
    <motion.div
      key="theme"
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
            {t("darkMode")}
          </Text>
          <Text style={[tw``, { color: isDark ? "#d1d5db" : "#6b7280" }]}>
            {t("themeDescription")}
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
                tw`text-lg font-semibold mb-4`,
                { color: isDark ? "#ffffff" : "#111827" },
              ]}
            >
              {t("selectTheme")}
            </Text>
            <View style={tw`grid grid-cols-2 gap-4`}>
              {/* Light Theme Option */}
              <Pressable
                style={[
                  tw`rounded-xl p-4 border-2 transition-all duration-200 hover:scale-[1.02] relative`,
                  {
                    backgroundColor: isDark ? "#4b5563" : "#f9fafb",
                    borderColor:
                      colorScheme === "light"
                        ? "#8b5cf6"
                        : isDark
                        ? "#6b7280"
                        : "#e5e7eb",
                    shadowColor:
                      colorScheme === "light" ? "#8b5cf6" : "transparent",
                    shadowOpacity: colorScheme === "light" ? 0.2 : 0,
                    shadowRadius: colorScheme === "light" ? 10 : 0,
                  },
                ]}
                onPress={() => setTheme("light")}
              >
                <View
                  style={[
                    tw`w-full h-3 rounded mb-2`,
                    { backgroundColor: "#ffffff" },
                  ]}
                />
                <View
                  style={[
                    tw`w-3/4 h-2 rounded mb-1`,
                    { backgroundColor: "#d1d5db" },
                  ]}
                />
                <View
                  style={[
                    tw`w-1/2 h-2 rounded mb-3`,
                    { backgroundColor: "#d1d5db" },
                  ]}
                />
                <Text
                  style={[
                    tw`text-sm text-center font-medium`,
                    {
                      color:
                        colorScheme === "light"
                          ? isDark
                            ? "#c084fc"
                            : "#8b5cf6"
                          : isDark
                          ? "#d1d5db"
                          : "#6b7280",
                    },
                  ]}
                >
                  {t("lightTheme")}
                </Text>
                {colorScheme === "light" && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    style={tw`absolute top-2 right-2`}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#8b5cf6"
                    />
                  </motion.div>
                )}
              </Pressable>

              {/* Dark Theme Option */}
              <Pressable
                style={[
                  tw`rounded-xl p-4 border-2 transition-all duration-200 hover:scale-[1.02] relative`,
                  {
                    backgroundColor: "#374151",
                    borderColor: colorScheme === "dark" ? "#8b5cf6" : "#6b7280",
                    shadowColor:
                      colorScheme === "dark" ? "#8b5cf6" : "transparent",
                    shadowOpacity: colorScheme === "dark" ? 0.2 : 0,
                    shadowRadius: colorScheme === "dark" ? 10 : 0,
                  },
                ]}
                onPress={() => setTheme("dark")}
              >
                <View
                  style={[
                    tw`w-full h-3 rounded mb-2`,
                    { backgroundColor: "#4b5563" },
                  ]}
                />
                <View
                  style={[
                    tw`w-3/4 h-2 rounded mb-1`,
                    { backgroundColor: "#6b7280" },
                  ]}
                />
                <View
                  style={[
                    tw`w-1/2 h-2 rounded mb-3`,
                    { backgroundColor: "#6b7280" },
                  ]}
                />
                <Text
                  style={[
                    tw`text-sm text-center font-medium`,
                    {
                      color: colorScheme === "dark" ? "#c084fc" : "#d1d5db",
                    },
                  ]}
                >
                  {t("darkTheme")}
                </Text>
                {colorScheme === "dark" && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    style={tw`absolute top-2 right-2`}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#8b5cf6"
                    />
                  </motion.div>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </motion.div>
  );
};

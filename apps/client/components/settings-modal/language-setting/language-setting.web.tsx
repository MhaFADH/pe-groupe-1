import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage, useTheme } from "../../../context";
import tw from "../../../lib/tailwind";

export const LanguageSettingWeb: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { colorScheme } = useTheme();
  const { t } = useTranslation();
  const isDark = colorScheme === "dark";

  const languages = [
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  ];

  const handleLanguageSelect = async (languageCode: "en" | "fr") => {
    try {
      await setLanguage(languageCode);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  return (
    <motion.div
      key="language"
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
            {t("language")}
          </Text>
          <Text style={[tw``, { color: isDark ? "#d1d5db" : "#6b7280" }]}>
            {t("languageDescription")}
          </Text>
        </View>

        <View style={tw`space-y-4`}>
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <Pressable
                key={lang.code}
                style={[
                  tw`w-full rounded-2xl p-6 border-2 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`,
                  {
                    backgroundColor: isDark ? "#374151" : "#ffffff",
                    borderColor: isSelected
                      ? "#8b5cf6"
                      : isDark
                      ? "#4b5563"
                      : "#e5e7eb",
                    shadowColor: isSelected ? "#8b5cf6" : "transparent",
                    shadowOpacity: isSelected ? 0.2 : 0,
                    shadowRadius: isSelected ? 10 : 0,
                  },
                ]}
                onPress={() => handleLanguageSelect(lang.code as "en" | "fr")}
              >
                <View style={tw`flex-row items-center`}>
                  <Text style={tw`text-4xl mr-4`}>{lang.flag}</Text>
                  <View style={tw`flex-1`}>
                    <Text
                      style={[
                        tw`text-xl font-semibold`,
                        {
                          color: isSelected
                            ? isDark
                              ? "#c084fc"
                              : "#8b5cf6"
                            : isDark
                            ? "#ffffff"
                            : "#111827",
                        },
                      ]}
                    >
                      {lang.nativeName}
                    </Text>
                    <Text
                      style={[
                        tw`text-sm`,
                        { color: isDark ? "#9ca3af" : "#6b7280" },
                      ]}
                    >
                      {lang.name}
                    </Text>
                  </View>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.1 }}
                    >
                      <Ionicons
                        name="checkmark-circle"
                        size={28}
                        color="#8b5cf6"
                      />
                    </motion.div>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </motion.div>
  );
};

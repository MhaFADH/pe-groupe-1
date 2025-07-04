import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../context";
import tw from "../../../lib/tailwind";

export const LanguageSettingNative: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

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
    <View style={tw`flex-1`}>
      <ScrollView style={tw`flex-1 p-6`} showsVerticalScrollIndicator={false}>
        {/* Description */}
        <View style={tw`mb-6`}>
          <Text
            style={tw`text-gray-600 dark:text-gray-400 text-base leading-relaxed`}
          >
            {t("languageDescription")}
          </Text>
        </View>

        <View style={tw`space-y-4`}>
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <Pressable
                key={lang.code}
                style={tw`w-full bg-background dark:bg-backgroundDark rounded-2xl p-6 border-2 ${
                  isSelected
                    ? "border-primary shadow-lg"
                    : "border-border dark:border-borderDark"
                } transition-all duration-200`}
                onPress={() => handleLanguageSelect(lang.code as "en" | "fr")}
              >
                <View style={tw`flex-row items-center`}>
                  <Text style={tw`text-4xl mr-4`}>{lang.flag}</Text>
                  <View style={tw`flex-1`}>
                    <Text
                      style={tw`text-xl font-semibold ${
                        isSelected
                          ? "text-primary"
                          : "text-text dark:text-textDark"
                      }`}
                    >
                      {lang.nativeName}
                    </Text>
                    <Text
                      style={tw`text-sm text-textSecondary dark:text-textSecondaryDark`}
                    >
                      {lang.name}
                    </Text>
                  </View>
                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={28}
                      color={tw.color("primary")}
                    />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

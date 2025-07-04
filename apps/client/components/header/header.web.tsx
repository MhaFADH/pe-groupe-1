import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../lib/tailwind";

export interface HeaderProps {
  appName?: string;
  showSettings?: boolean;
  onSettingsPress?: () => void;
  onLogoPress?: () => void;
  className?: string;
  logoClassName?: string;
  titleClassName?: string;
}

export const HeaderWeb: React.FC<HeaderProps> = ({
  appName = "Lootopia",
  showSettings = true,
  onSettingsPress,
  onLogoPress,
  className = "",
  logoClassName = "",
  titleClassName = "",
}) => {
  const [isSettingsHovered, setIsSettingsHovered] = useState(false);

  return (
    <View
      style={tw`flex-row items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 ${className}`}
    >
      <Pressable onPress={onLogoPress} style={tw`flex-row items-center`}>
        <View
          style={tw`bg-primary rounded-lg p-2 items-center justify-center mr-3 ${logoClassName}`}
        >
          <Image
            source={require("../../../assets/scroll_256.png")}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
        </View>
        <Text
          style={tw`text-2xl font-bold text-gray-900 dark:text-white tracking-tight ${titleClassName}`}
        >
          {appName}
        </Text>
      </Pressable>

      <View style={tw`flex-row items-center gap-3`}>
        {showSettings && (
          <Pressable
            onPress={onSettingsPress}
            style={tw`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
            onHoverIn={() => setIsSettingsHovered(true)}
            onHoverOut={() => setIsSettingsHovered(false)}
          >
            <Ionicons
              name="settings"
              size={24}
              color={tw.color("gray-500 dark:gray-400")}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

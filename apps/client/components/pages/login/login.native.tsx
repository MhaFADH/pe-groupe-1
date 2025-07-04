import React from "react";
import { Dimensions, Image, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { ButtonNative as Button } from "../../components/button/button.native";
import { useTheme } from "../../context";
import tw from "../../lib/tailwind";

export interface LoginProps {
  onNavigate?: (page: "login" | "home") => void;
  appName?: string;
  logoIcon?: any;
  onSignIn?: () => void;
  onSignUp?: () => void;
  className?: string;
  logoClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const LoginNative: React.FC<LoginProps> = ({
  onNavigate,
  appName,
  logoIcon = "gift",
  onSignIn,
  onSignUp,
  className = "",
  logoClassName = "",
  titleClassName = "",
  subtitleClassName = "",
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleSignIn = () => {
    console.log("Resume Exploring pressed - navigating to home");
    if (onSignIn) {
      onSignIn();
    } else {
      onNavigate?.("home");
    }
  };

  const handleSignUp = () => {
    console.log("Join Adventure pressed - navigating to home");
    if (onSignUp) {
      onSignUp();
    } else {
      onNavigate?.("home");
    }
  };

  return (
    <SafeAreaView
      style={tw`flex-1 ${isDark ? "bg-gray-900" : "bg-white"}`}
      edges={["top", "bottom"]}
    >
      <View style={tw`flex-1 justify-center items-center px-6 ${className}`}>
        <View style={tw`w-full items-center justify-center flex-1`}>
          <View style={tw`mb-8 items-center w-full`}>
            <View
              style={tw`bg-primary rounded-3xl p-6 mb-4 shadow-lg shadow-primary/40 ${logoClassName}`}
            >
              <Image
                source={require("../../../assets/scroll_256.png")}
                style={{ width: 48, height: 48 }}
                resizeMode="contain"
              />
            </View>

            <Text
              style={tw`text-4xl font-extrabold ${
                isDark ? "text-white" : "text-gray-800"
              } tracking-tight text-center mb-2 w-full ${titleClassName}`}
            >
              {appName || t("appName")}
            </Text>

            <View style={tw`h-1 w-15 bg-primary rounded-full self-center`} />
          </View>

          <View style={tw`items-center mb-8 w-full`}>
            <Text
              style={tw`text-2xl font-bold ${
                isDark ? "text-gray-300" : "text-gray-700"
              } text-center leading-tight mb-4 max-w-lg w-full ${subtitleClassName}`}
            >
              {t("appDescription")}
            </Text>

            <Text
              style={tw`text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              } text-center leading-relaxed max-w-md mb-2 w-full`}
            >
              {t("appSubtitle")}
            </Text>

            <Text
              style={tw`text-base text-primary text-center font-semibold w-full`}
            >
              {t("appCta")}
            </Text>
          </View>

          <View style={tw`gap-4 w-full max-w-sm items-center mb-8`}>
            <Button
              title={t("resumeExploring")}
              variant="primary"
              size="lg"
              onPress={handleSignIn}
              fullWidth
            />

            <Button
              title={t("joinAdventure")}
              variant="outline"
              size="lg"
              onPress={handleSignUp}
              fullWidth
            />

            <Text
              style={tw`text-xs ${
                isDark ? "text-gray-400" : "text-gray-600"
              } text-center mt-2`}
            >
              {t("bothOptionsText")}
            </Text>
          </View>

          <View style={tw`items-center`}>
            <View style={tw`flex-row items-center justify-center gap-8`}>
              <View style={tw`items-center gap-2 flex-1 max-w-20`}>
                <Ionicons name="map" size={20} color="#8B5CF6" />
                <Text
                  style={tw`text-xs ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  } font-medium text-center`}
                >
                  {t("interactiveMaps")}
                </Text>
              </View>

              <View style={tw`items-center gap-2 flex-1 max-w-20`}>
                <Ionicons name="people" size={20} color="#8B5CF6" />
                <Text
                  style={tw`text-xs ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  } font-medium text-center`}
                >
                  {t("teamAdventures")}
                </Text>
              </View>

              <View style={tw`items-center gap-2 flex-1 max-w-20`}>
                <Ionicons name="trophy" size={20} color="#8B5CF6" />
                <Text
                  style={tw`text-xs ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  } font-medium text-center`}
                >
                  {t("epicRewards")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

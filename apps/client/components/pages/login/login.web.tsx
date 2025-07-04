import { Ionicons } from "@expo/vector-icons"
import { motion } from "framer-motion"
import React from "react"
import { useTranslation } from "react-i18next"
import { Dimensions, Image, ScrollView, Text, View } from "react-native"

import { ButtonWeb as Button } from "@/components/ui/button/button.web"
import tw from "@/tailwind"

const { height: screenHeight } = Dimensions.get("window")

export type LoginProps = {
  onNavigate?: (page: "login" | "home") => void
  appName?: string
  onSignIn?: () => void
  onSignUp?: () => void
  className?: string
  logoClassName?: string
  titleClassName?: string
  subtitleClassName?: string
}

export const LoginWeb: React.FC<LoginProps> = ({
  onNavigate,
  appName,
  onSignIn,
  onSignUp,
  className = "",
  logoClassName = "",
  titleClassName = "",
  subtitleClassName = "",
}) => {
  const { t } = useTranslation()
  const handleSignIn = () => {
    if (onSignIn) {
      onSignIn()
    } else {
      onNavigate?.("home")
    }
  }

  const handleSignUp = () => {
    if (onSignUp) {
      onSignUp()
    } else {
      onNavigate?.("home")
    }
  }

  return (
    <View style={tw`flex-1 bg-white dark:bg-gray-900 ${className}`}>
      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={[
          tw`flex-grow justify-center items-center px-6 md:px-24`,
          { minHeight: screenHeight },
        ]}
      >
        <View style={tw`max-w-2xl w-full items-center`}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={tw`mb-6 items-center`}
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              style={tw`bg-primary rounded-3xl p-6 mb-3 shadow-lg shadow-primary/40 flex items-center justify-center ${logoClassName}`}
            >
              <Image
                // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
                source={require("@/assets/images/scroll_256.png")}
                style={{ width: 48, height: 48 }}
                resizeMode="contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={tw`flex flex-col items-center justify-center w-full`}
            >
              <Text
                style={tw`text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight text-center mb-3 w-full ${titleClassName}`}
              >
                {appName ?? t("appName")}
              </Text>

              <View
                style={tw`h-1 w-16 bg-primary rounded-full self-center mb-1`}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={tw`items-center mb-8 flex flex-col w-full`}
          >
            <Text
              style={tw`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center leading-tight mb-4 max-w-lg w-full ${subtitleClassName}`}
            >
              {t("appDescription")}
            </Text>

            <Text
              style={tw`text-lg text-gray-600 dark:text-gray-300 text-center leading-relaxed max-w-md mb-2 w-full`}
            >
              {t("appSubtitle")}
            </Text>

            <Text
              style={tw`text-base text-primary text-center font-semibold w-full`}
            >
              {t("appCta")}
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={tw`gap-4 w-full max-w-sm items-center flex flex-col`}
          >
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
              style={tw`text-xs text-gray-500 dark:text-gray-400 text-center mt-2`}
            >
              {t("bothOptionsText")}
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={tw`mt-12 items-center`}
          >
            <View
              style={tw`flex-row items-center gap-6 flex-wrap justify-center`}
            >
              <View style={tw`items-center gap-2 min-w-20`}>
                <Ionicons name="map" size={20} color={tw.color("primary")} />
                <Text
                  style={tw`text-xs text-gray-500 dark:text-gray-400 font-medium text-center`}
                >
                  {t("interactiveMaps")}
                </Text>
              </View>

              <View style={tw`items-center gap-2 min-w-20`}>
                <Ionicons name="people" size={20} color={tw.color("primary")} />
                <Text
                  style={tw`text-xs text-gray-500 dark:text-gray-400 font-medium text-center`}
                >
                  {t("teamAdventures")}
                </Text>
              </View>

              <View style={tw`items-center gap-2 min-w-20`}>
                <Ionicons name="trophy" size={20} color={tw.color("primary")} />
                <Text
                  style={tw`text-xs text-gray-500 dark:text-gray-400 font-medium text-center`}
                >
                  {t("epicRewards")}
                </Text>
              </View>
            </View>
          </motion.div>
        </View>
      </ScrollView>
    </View>
  )
}

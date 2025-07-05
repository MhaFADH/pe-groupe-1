import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Pressable, Text, View } from "react-native"
import Animated, {
  FadeIn,
  SlideInRight,
  SlideOutLeft,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"

import { Button } from "@/components"
import { SettingsNavigatorNative } from "@/components/settings-modal/settings-navigator.native"
import tw from "@/tailwind"

export type HomeProps = {
  onNavigate?: (page: "login" | "home") => void
  onBackToLogin?: () => void
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

type TabType = "home" | "explore" | "profile" | "settings"

export const HomeNative: React.FC<HomeProps> = ({
  onNavigate,
  onBackToLogin,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<TabType>("home")
  const [isTabChanging, setIsTabChanging] = useState(false)

  const tabScale = useSharedValue(1)

  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab || isTabChanging) {
      return
    }

    setIsTabChanging(true)
    setActiveTab(tab)

    tabScale.value = withSpring(0.95, { duration: 100 }, (finished) => {
      if (finished) {
        tabScale.value = withSpring(1, { duration: 200 }, () => {
          runOnJS(setIsTabChanging)(false)
        })
      }
    })
  }

  const handleBackToLogin = () => {
    if (onBackToLogin) {
      onBackToLogin()
    } else {
      onNavigate?.("login")
    }
  }

  const renderTabContent = () => {
    const key = `tab-${activeTab}`

    switch (activeTab) {
      case "home":
        return (
          <Animated.View
            key={key}
            entering={SlideInRight.springify().damping(15)}
            exiting={SlideOutLeft.springify().damping(15)}
            style={tw`flex-1 items-center justify-center px-6`}
          >
            <Animated.View
              entering={FadeIn.delay(200)}
              style={tw`items-center gap-4`}
            >
              <Text
                style={tw`text-2xl font-bold text-gray-800 dark:text-white text-center mb-2 ${titleClassName}`}
              >
                {t("welcomeHome")}
              </Text>
              <Text
                style={tw`text-base text-gray-600 dark:text-gray-300 text-center mb-6 ${subtitleClassName}`}
              >
                {t("contentComingSoon")}
              </Text>
              <Button
                title={t("backToLogin")}
                variant="outline"
                size="md"
                onPress={handleBackToLogin}
              />
            </Animated.View>
          </Animated.View>
        )

      case "explore":
        return (
          <Animated.View
            key={key}
            entering={SlideInRight.springify().damping(15)}
            exiting={SlideOutLeft.springify().damping(15)}
            style={tw`flex-1 items-center justify-center px-6`}
          >
            <Animated.View
              entering={FadeIn.delay(200)}
              style={tw`items-center gap-4`}
            >
              <Ionicons name="map" size={64} color={tw.color("primary")} />
              <Text
                style={tw`text-2xl font-bold text-gray-800 dark:text-white text-center`}
              >
                {t("interactiveMaps")}
              </Text>
              <Text
                style={tw`text-base text-gray-600 dark:text-gray-300 text-center`}
              >
                {t("exploreComingSoon")}
              </Text>
            </Animated.View>
          </Animated.View>
        )

      case "profile":
        return (
          <Animated.View
            key={key}
            entering={SlideInRight.springify().damping(15)}
            exiting={SlideOutLeft.springify().damping(15)}
            style={tw`flex-1 items-center justify-center px-6`}
          >
            <Animated.View
              entering={FadeIn.delay(200)}
              style={tw`items-center gap-4`}
            >
              <Ionicons
                name="person-circle"
                size={64}
                color={tw.color("primary")}
              />
              <Text
                style={tw`text-2xl font-bold text-gray-800 dark:text-white text-center`}
              >
                {t("profile")}
              </Text>
              <Text
                style={tw`text-base text-gray-600 dark:text-gray-300 text-center`}
              >
                {t("profileComingSoon")}
              </Text>
            </Animated.View>
          </Animated.View>
        )

      case "settings":
        return <SettingsNavigatorNative />

      default:
        return null
    }
  }

  const TabButton = ({
    tab,
    icon,
    label,
  }: {
    tab: TabType
    icon: string
    label: string
  }) => {
    const isActive = activeTab === tab
    const buttonScale = useSharedValue(1)

    const animatedButtonStyle = useAnimatedStyle(() => ({
      transform: [{ scale: buttonScale.value }],
    }))

    const handlePress = () => {
      if (!isTabChanging) {
        buttonScale.value = withSpring(0.9, { duration: 100 }, () => {
          buttonScale.value = withSpring(1, { duration: 200 })
        })
        handleTabChange(tab)
      }
    }

    return (
      <Animated.View style={tw.style(animatedButtonStyle, "flex-1")}>
        <Pressable style={tw`items-center py-2 px-1`} onPress={handlePress}>
          <Ionicons
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
            name={icon as any}
            size={24}
            color={isActive ? tw.color("primary") : tw.color("gray-400")}
          />
          <Text
            style={tw`text-xs mt-1 ${
              isActive ? "text-primary font-semibold" : "text-gray-400"
            }`}
          >
            {label}
          </Text>
        </Pressable>
      </Animated.View>
    )
  }

  return (
    <SafeAreaView
      style={tw`flex-1 bg-white dark:bg-gray-900 ${className}`}
      edges={["top"]}
    >
      <View style={tw`flex-1`}>{renderTabContent()}</View>

      {/* Bottom Tab Navigation */}
      <View
        style={tw`border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg min-h-[80px]`}
      >
        <SafeAreaView edges={["bottom"]}>
          <View
            style={tw`flex-row items-center justify-around py-3 px-4 min-h-[60px] pb-1`}
          >
            <TabButton tab="home" icon="home" label={t("home")} />
            <TabButton tab="explore" icon="map" label={t("explore")} />
            <TabButton tab="profile" icon="person" label={t("profile")} />
            <TabButton tab="settings" icon="settings" label={t("settings")} />
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  )
}

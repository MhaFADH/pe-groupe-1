import { Ionicons } from "@expo/vector-icons"
import { type RelativePathString, useRouter } from "expo-router"
import { useTranslation } from "react-i18next"
import { Image, Pressable, ScrollView, Text, View } from "react-native"
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideOutLeft,
} from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"

import { useThemeColor } from "@/utils/colors"

type BurgerMenuProps = {
  isVisible: boolean
  onClose: () => void
  onLogout?: () => void
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({
  isVisible,
  onClose,
  onLogout,
}) => {
  const { getThemeColor } = useThemeColor()
  const { t } = useTranslation()
  const router = useRouter()

  const menuItems = [
    {
      id: "home",
      title: t("home", { defaultValue: "Home" }),
      icon: "home",
      description: t("dashboard", { defaultValue: "Dashboard" }),
    },
    {
      id: "explore",
      title: t("explore", { defaultValue: "Explore" }),
      icon: "map",
      description: t("exploreHuntsDescription", { defaultValue: "Discover new treasure hunts" }),
    },
    {
      id: "create-hunts",
      title: t("profile", { defaultValue: "Profile" }),
      icon: "person",
      description: t("yourProfile", { defaultValue: "Your Profile" }),
    },
    {
      id: "settings",
      title: t("settings", { defaultValue: "Settings" }),
      icon: "settings",
      description: t("appSettings", { defaultValue: "App Settings" }),
    },
  ]

  if (!isVisible) {
    return null
  }

  return (
    <>
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        className="absolute inset-0 bg-black/50 z-40"
      >
        <Pressable className="flex-1" onPress={onClose} />
      </Animated.View>

      <Animated.View
        entering={SlideInLeft.duration(300).springify().damping(20)}
        exiting={SlideOutLeft.duration(250)}
        className="absolute top-0 left-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-2xl z-50"
      >
        <SafeAreaView className="flex-1" edges={["top", "left", "bottom"]}>
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <View className="relative flex-row justify-between items-center">
                <View className="flex-row items-center gap-3">
                  <View className="bg-primary rounded-2xl p-2 items-center justify-center mr-1">
                    <Image
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
                      source={require("@/assets/images/scroll_256.png")}
                      style={{ width: 24, height: 24 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                      {t("appName")}
                    </Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {t("appDescriptionShort")}
                    </Text>
                  </View>
                </View>
                <Pressable
                  onPress={onClose}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700"
                >
                  <Ionicons
                    name="close"
                    size={20}
                    color={getThemeColor("gray-600", "gray-400")}
                  />
                </Pressable>
              </View>
            </View>

            <View className="px-4 py-6">
              {menuItems.map((item) => (
                <Animated.View key={item.id} className="mb-2">
                  <Pressable
                    onPress={() => {
                      router.replace(item.id as RelativePathString)
                      onClose()
                    }}
                    className={
                      "flex-row items-center p-4 mx-2 rounded-xl bg-transparent active:bg-gray-50 dark:active:bg-gray-800"
                    }
                  >
                    <View
                      className={
                        "w-11 h-11 rounded-xl items-center justify-center mr-4 bg-gray-100 dark:bg-gray-700"
                      }
                    >
                      <Ionicons
                        name={
                          item.icon as "home" | "map" | "person" | "settings"
                        }
                        size={22}
                        color={getThemeColor("gray-600", "gray-400")}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {item.title}
                      </Text>
                      <Text className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {item.description}
                      </Text>
                    </View>
                  </Pressable>
                </Animated.View>
              ))}
            </View>

            <View className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
              <Animated.View>
                <Pressable
                  onPress={() => {
                    onLogout?.()
                    onClose()
                  }}
                  className="flex-row items-center p-3 mx-2 rounded-xl bg-red-50 dark:bg-red-900/20 active:bg-red-100 dark:active:bg-red-900/30"
                >
                  <View className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 items-center justify-center mr-3">
                    <Ionicons
                      name="log-out"
                      size={18}
                      color={getThemeColor("red-600", "red-400")}
                    />
                  </View>
                  <Text className="text-lg font-medium text-red-600 dark:text-red-400">
                    {t("logout", { defaultValue: "Logout" })}
                  </Text>
                </Pressable>
              </Animated.View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
    </>
  )
}

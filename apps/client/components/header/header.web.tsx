import { Ionicons } from "@expo/vector-icons"
import { usePathname, useRouter } from "expo-router"
import { useTranslation } from "react-i18next"
import { Image, Pressable, Text, View } from "react-native"

import { useAuthManager } from "@/components/contexts"
import { getColor } from "@/utils/colors"

import { useTheme } from "../contexts"
import { useModalPersistence } from "../contexts/modal-persistence"

export const HeaderWeb = () => {
  const { colorScheme } = useTheme()
  const { setModalVisibility } = useModalPersistence()
  const { isAuthenticated } = useAuthManager()
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === "/" || !isAuthenticated) {
    return null
  }

  const isActive = (path: string) => pathname === path

  return (
    <View
      className={`flex-row items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700`}
    >
      <Pressable
        onPress={() => router.navigate("/(web)/home")}
        className={`flex-row items-center`}
      >
        <View
          className={`bg-primary rounded-lg p-2 items-center justify-center mr-3`}
        >
          <Image
            // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
            source={require("@/assets/images/scroll_256.png")}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
        </View>
        <Text
          className={`text-2xl font-bold text-gray-900 dark:text-white tracking-tight`}
        >
          {t("appName")}
        </Text>
      </Pressable>

      {/* Navigation Links */}
      <View className={`flex-row items-center gap-1`}>
        <Pressable
          onPress={() => router.navigate("/(web)/home")}
          className={`px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isActive("/(web)/home") ? "bg-primary-50 dark:bg-primary-900/20" : ""
          }`}
        >
          <Text
            className={`font-medium ${
              isActive("/(web)/home")
                ? "text-primary-600 dark:text-primary-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {t("home")}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.navigate("/(web)/explore")}
          className={`px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isActive("/(web)/explore") ? "bg-primary-50 dark:bg-primary-900/20" : ""
          }`}
        >
          <Text
            className={`font-medium ${
              isActive("/(web)/explore")
                ? "text-primary-600 dark:text-primary-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {t("explore")}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.navigate("/(web)/create-hunt")}
          className={`px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isActive("/(web)/create-hunt") ? "bg-primary-50 dark:bg-primary-900/20" : ""
          }`}
        >
          <Text
            className={`font-medium ${
              isActive("/(web)/create-hunt")
                ? "text-primary-600 dark:text-primary-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {t("createHunt")}
          </Text>
        </Pressable>
      </View>

      <View className={`flex-row items-center gap-3`}>
        <Pressable
          onPress={() => setModalVisibility(true)}
          className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
        >
          <Ionicons
            name="settings"
            size={24}
            color={
              colorScheme === "dark"
                ? getColor("gray-400")
                : getColor("gray-600")
            }
          />
        </Pressable>
      </View>
    </View>
  )
}

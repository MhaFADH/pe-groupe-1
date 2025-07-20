import { Ionicons } from "@expo/vector-icons"
import { usePathname, useRouter } from "expo-router"
import { useTranslation } from "react-i18next"
import { Image, Pressable, Text, View } from "react-native"

import { getColor } from "@/utils/colors"

import { useTheme } from "../contexts"
import { useModalPersistence } from "../contexts/modal-persistence"

export const HeaderWeb = () => {
  const { colorScheme } = useTheme()
  const { setModalVisibility } = useModalPersistence()
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === "/") {
    return null
  }

  const isActiveRoute = (route: string) => {
    if (route === "/home" && pathname === "/(web)/home") return true
    if (route === "/explore" && pathname.includes("/explore")) return true
    if (route === "/create-hunts" && pathname.includes("/create-hunts")) return true
    return false
  }

  const NavButton = ({ route, label, icon }: { route: string; label: string; icon: string }) => {
    const isActive = isActiveRoute(route)
    
    return (
      <Pressable
        onPress={() => router.navigate(route as any)}
        className={`flex-row items-center px-4 py-2 rounded-lg transition-colors ${
          isActive 
            ? "bg-primary-100 dark:bg-primary-900/30" 
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        <Ionicons
          name={icon as any}
          size={20}
          color={
            isActive
              ? getColor("primary-600")
              : colorScheme === "dark"
              ? getColor("gray-400")
              : getColor("gray-600")
          }
        />
        <Text
          className={`ml-2 font-medium ${
            isActive
              ? "text-primary-600 dark:text-primary-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {label}
        </Text>
      </Pressable>
    )
  }

  return (
    <View
      className={`flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm`}
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
      <View className={`flex-row items-center gap-2`}>
        <NavButton route="/(web)/home" label={t("home")} icon="home" />
        <NavButton route="/(web)/explore" label={t("explore")} icon="search" />
        <NavButton route="/(web)/create-hunts" label={t("createHunt")} icon="add-circle" />
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

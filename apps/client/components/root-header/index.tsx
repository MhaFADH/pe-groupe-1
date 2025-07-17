import { Ionicons } from "@expo/vector-icons"
import { type NativeStackHeaderProps } from "@react-navigation/native-stack"
import { usePathname, useRouter } from "expo-router"
import { useTranslation } from "react-i18next"
import { Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { useThemeColor } from "@/utils/colors"

type RootHeaderProps = NativeStackHeaderProps & {
  onOpenDrawer?: () => void
}

const RootHeader: React.FC<RootHeaderProps> = ({ route, onOpenDrawer }) => {
  const { getThemeColor } = useThemeColor()

  const { t } = useTranslation()
  const router = useRouter()

  const goBackRoutes = [
    "/settings/notifications",
    "/settings/language",
    "/settings/privacy",
    "/settings/about",
    "/settings/help",
    "/settings/theme",
    "/explore/[huntId]",
    "/create-hunts",
  ]

  const currentPath = usePathname()
  const canGoBack =
    goBackRoutes.includes(currentPath) || currentPath.includes("/explore/")

  if (currentPath === "/game") {
    return null
  }

  const handlePress = () => {
    if (canGoBack) {
      router.back()
    } else {
      onOpenDrawer?.()
    }
  }

  return (
    <SafeAreaView
      edges={["top"]}
      className="px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
      style={{ zIndex: 20, elevation: 20 }}
      pointerEvents="box-none"
    >
      <View className="flex-row items-center">
        <Pressable
          onPress={handlePress}
          className="mr-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
        >
          <Ionicons
            name={canGoBack ? "arrow-back" : "menu"}
            size={24}
            color={getThemeColor("gray-600", "gray-400")}
          />
        </Pressable>

        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-900 dark:text-white">
            {t(route.name)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default RootHeader

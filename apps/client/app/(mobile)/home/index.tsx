import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { t } from "i18next"
import { useEffect } from "react"
import { Text, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import { useAuthManager } from "@/components/contexts"
import { useThemeColor } from "@/utils/colors"

const HomePage = () => {
  const { getThemeColor } = useThemeColor()
  const { isAuthenticated } = useAuthManager()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(mobile)")
    }
  }, [isAuthenticated, router])

  return (
    <View className="flex-1 items-center justify-center px-6 bg-white dark:bg-gray-900">
      <Animated.View
        entering={FadeIn.delay(200)}
        className="items-center gap-4"
      >
        <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center mb-4">
          <Ionicons
            name="home"
            size={32}
            color={getThemeColor("primary", "primary")}
          />
        </View>
        <Text
          className={`text-3xl font-bold text-gray-800 dark:text-white text-center mb-2`}
        >
          {t("welcomeHome")}
        </Text>
        <Text
          className={`text-base text-gray-600 dark:text-gray-300 text-center mb-6 max-w-sm`}
        >
          {t("contentComingSoon")}
        </Text>
      </Animated.View>
    </View>
  )
}

export default HomePage

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Image, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { useAuthManager } from "@/components/contexts"
import { Button } from "@/components/ui/button"

const LoginNative = () => {
  const { t } = useTranslation()
  const { signIn, isAuthenticated } = useAuthManager()
  const router = useRouter()

  const handleSignIn = async () => {
    await signIn()
  }

  const handleSignUp = async () => {
    await signIn(true)
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(mobile)/home")
    }
  }, [isAuthenticated, router])

  return (
    <SafeAreaView
      className={`flex-1 dark:bg-gray-900 bg-white`}
      edges={["top", "bottom"]}
    >
      <View className={`flex-1 justify-center items-center px-6 `}>
        <View className={`w-full items-center justify-center flex-1`}>
          <View className={`mb-8 items-center w-full`}>
            <View
              className={`bg-primary rounded-3xl p-6 mb-4 shadow-lg shadow-primary/40 `}
            >
              <Image
                // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
                source={require("@/assets/images/scroll_256.png")}
                style={{ width: 48, height: 48 }}
                resizeMode="contain"
              />
            </View>

            <Text
              className={`text-4xl font-extrabold dark:text-white text-gray-800 tracking-tight text-center mb-2 w-full`}
            >
              {t("appName")}
            </Text>

            <View className={`h-1 w-15 bg-primary rounded-full self-center`} />
          </View>

          <View className={`items-center mb-8 w-full px-4`}>
            <Text
              className={`text-2xl font-bold dark:text-gray-300 text-gray-700 text-center leading-tight mb-4 max-w-sm `}
            >
              {t("appDescription")}
            </Text>

            <Text
              className={`text-lg dark:text-gray-400 text-gray-600 text-center leading-relaxed max-w-xs mb-2`}
            >
              {t("appSubtitle")}
            </Text>

            <Text
              className={`text-base text-primary text-center font-semibold max-w-sm`}
            >
              {t("appCta")}
            </Text>
          </View>

          <View className={`gap-4 w-full max-w-sm items-center mb-8`}>
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
              className={`text-xs dark:text-gray-400 text-gray-600 text-center mt-2`}
            >
              {t("bothOptionsText")}
            </Text>
          </View>

          <View className={`items-center`}>
            <View className={`flex-row items-center justify-center gap-8`}>
              <View className={`items-center gap-2 flex-1 max-w-20`}>
                <Ionicons name="map" size={20} color="#8B5CF6" />
                <Text
                  className={`text-xs dark:text-gray-400 text-gray-600 font-medium text-center`}
                >
                  {t("interactiveMaps")}
                </Text>
              </View>

              <View className={`items-center gap-2 flex-1 max-w-20`}>
                <Ionicons name="people" size={20} color="#8B5CF6" />
                <Text
                  className={`text-xs dark:text-gray-400 text-gray-600 font-medium text-center`}
                >
                  {t("teamAdventures")}
                </Text>
              </View>

              <View className={`items-center gap-2 flex-1 max-w-20`}>
                <Ionicons name="trophy" size={20} color="#8B5CF6" />
                <Text
                  className={`text-xs dark:text-gray-400 text-gray-600 font-medium text-center`}
                >
                  {t("epicRewards")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginNative

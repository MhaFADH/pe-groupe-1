import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Dimensions, Image, ScrollView, Text, View } from "react-native"

import { useAuthManager } from "@/components/contexts"
import { Button } from "@/components/ui/button"
import { getColor } from "@/utils/colors"

const { height: screenHeight } = Dimensions.get("window")

const LoginWeb = () => {
  const { signIn, isAuthenticated } = useAuthManager()
  const { t } = useTranslation()
  const router = useRouter()

  if (isAuthenticated) {
    router.navigate("/home")
  }

  return (
    <View className={`flex-1 bg-white dark:bg-gray-900`}>
      <ScrollView
        className={`flex-1`}
        contentContainerStyle={[
          {
            minHeight: screenHeight,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
          },
        ]}
      >
        <View className={`max-w-2xl w-full items-center`}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`mb-6 items-center`}
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className={`bg-primary rounded-3xl p-6 mb-3 shadow-lg shadow-primary/40 flex items-center justify-center`}
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
              className={`flex flex-col items-center justify-center w-full`}
            >
              <Text
                className={`text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight text-center mb-3 w-full`}
              >
                {t("appName")}
              </Text>

              <View
                className={`h-1 w-16 bg-primary rounded-full self-center mb-1`}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`items-center mb-8 flex flex-col w-full`}
          >
            <Text
              className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center leading-tight mb-4 max-w-lg w-full`}
            >
              {t("appDescription")}
            </Text>

            <Text
              className={`text-lg text-gray-600 dark:text-gray-300 text-center leading-relaxed max-w-md mb-2 w-full`}
            >
              {t("appSubtitle")}
            </Text>

            <Text
              className={`text-base text-primary text-center font-semibold w-full`}
            >
              {t("appCta")}
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`gap-4 w-full max-w-sm items-center flex flex-col`}
          >
            <Button
              title={t("resumeExploring")}
              variant="primary"
              size="lg"
              onPress={() => signIn()}
              fullWidth
            />

            <Button
              title={t("joinAdventure")}
              variant="outline"
              size="lg"
              onPress={() => signIn(true)}
              fullWidth
            />

            <Text
              className={`text-xs text-gray-500 dark:text-gray-400 text-center mt-2`}
            >
              {t("bothOptionsText")}
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className={`mt-12 items-center`}
          >
            <View
              className={`flex-row items-center gap-6 flex-wrap justify-center`}
            >
              <View className={`items-center gap-2 min-w-20`}>
                <Ionicons name="map" size={20} color={getColor("primary")} />
                <Text
                  className={`text-xs text-gray-500 dark:text-gray-400 font-medium text-center`}
                >
                  {t("interactiveMaps")}
                </Text>
              </View>

              <View className={`items-center gap-2 min-w-20`}>
                <Ionicons name="people" size={20} color={getColor("primary")} />
                <Text
                  className={`text-xs text-gray-500 dark:text-gray-400 font-medium text-center`}
                >
                  {t("teamAdventures")}
                </Text>
              </View>

              <View className={`items-center gap-2 min-w-20`}>
                <Ionicons name="trophy" size={20} color={getColor("primary")} />
                <Text
                  className={`text-xs text-gray-500 dark:text-gray-400 font-medium text-center`}
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

export default LoginWeb

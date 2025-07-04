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

  if (usePathname() === "/") {
    return null
  }

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

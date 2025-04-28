import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useCallback, useEffect, useState } from "react"
import "react-native-reanimated"

import type { Theme } from "@/components/contexts/theme-context"
import Providers from "@/components/providers"
import config from "@/utils/config"

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [theme, setTheme] = useState<Theme>("system")

  const getTheme = useCallback(async () => {
    const savedTheme = (await AsyncStorage.getItem(
      config.store.theme,
    )) as Theme | null

    return savedTheme ?? "system"
  }, [])

  useEffect(() => {
    void (async () => {
      const currentTheme = await getTheme()
      setTheme(currentTheme)

      await SplashScreen.hideAsync()
    })()
  }, [getTheme, setTheme])

  const [loaded] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Providers theme={theme}>
      <Slot />
    </Providers>
  )
}

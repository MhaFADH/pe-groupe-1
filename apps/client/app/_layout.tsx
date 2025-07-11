import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-gesture-handler"
import "react-native-reanimated"

import Providers from "@/components/providers"

import "../global.css"

void SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
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
    <Providers>
      <Slot />
    </Providers>
  )
}

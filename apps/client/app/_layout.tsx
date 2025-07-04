import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"

import Auth0ProviderWrapper from "@/components/allPlatformsWrappers/auth"
import { AuthManagerProvider } from "@/components/contexts/authManager"

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
    <Auth0ProviderWrapper>
      <AuthManagerProvider>
        <Slot />
      </AuthManagerProvider>
    </Auth0ProviderWrapper>
  )
}

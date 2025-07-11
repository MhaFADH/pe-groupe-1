import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { I18nextProvider } from "react-i18next"
import "react-native-gesture-handler"
import "react-native-reanimated"

import Auth0ProviderWrapper from "@/components/allPlatformsWrappers/auth"
import {
  AuthManagerProvider,
  CustomThemeProvider,
  LanguageProvider,
} from "@/components/contexts"
import i18n from "@/utils/i18n"

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
    <I18nextProvider i18n={i18n}>
      <Auth0ProviderWrapper>
        <AuthManagerProvider>
          <LanguageProvider>
            <CustomThemeProvider>
              <Slot />
            </CustomThemeProvider>
          </LanguageProvider>
        </AuthManagerProvider>
      </Auth0ProviderWrapper>
    </I18nextProvider>
  )
}

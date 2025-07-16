import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { I18nextProvider } from "react-i18next"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import Auth0ProviderWrapper from "@/components/allPlatformsWrappers/auth"
import {
  AuthManagerProvider,
  CustomThemeProvider,
  LanguageProvider,
} from "@/components/contexts"
import i18n from "@/utils/i18n"

type Props = {
  children: ReactNode
}

const queryClient = new QueryClient()

const Providers = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <Auth0ProviderWrapper>
        <AuthManagerProvider>
          <LanguageProvider>
            <CustomThemeProvider>
              <GestureHandlerRootView>{children}</GestureHandlerRootView>
            </CustomThemeProvider>
          </LanguageProvider>
        </AuthManagerProvider>
      </Auth0ProviderWrapper>
    </I18nextProvider>
  </QueryClientProvider>
)

export default Providers

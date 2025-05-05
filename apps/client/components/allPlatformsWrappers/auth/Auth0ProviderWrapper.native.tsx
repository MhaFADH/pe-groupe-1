import { Auth0Provider } from "react-native-auth0"

import getEnv from "@/utils/env"

const env = getEnv()

type Props = {
  children: React.ReactNode
}

export default function Auth0ProviderWrapper({ children }: Props) {
  return (
    <Auth0Provider domain={env.auth0.domain} clientId={env.auth0.clientId}>
      {children}
    </Auth0Provider>
  )
}

import { Slot } from "expo-router"
import { Auth0Provider } from "react-native-auth0"

import getEnv from "@/utils/env"

const MobileApp = () => {
  const env = getEnv()

  return (
    <Auth0Provider domain={env.auth0.domain} clientId={env.auth0.clientId}>
      <Slot />
    </Auth0Provider>
  )
}

export default MobileApp

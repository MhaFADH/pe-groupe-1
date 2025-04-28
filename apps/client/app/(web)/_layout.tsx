import { Auth0Provider } from "@auth0/auth0-react"
import { Slot } from "expo-router"

import getEnv from "@/utils/env"

const WebApp = () => {
  const env = getEnv()

  return (
    <Auth0Provider
      domain={env.auth0.domain}
      clientId={env.auth0.clientId}
      authorizationParams={{
        // eslint-disable-next-line camelcase
        redirect_uri: env.auth0.redirectUri.web,
      }}
    >
      <Slot />
    </Auth0Provider>
  )
}

export default WebApp

import { Auth0Provider } from "@auth0/auth0-react"

import getEnv from "@/utils/env"

const env = getEnv()

type Props = {
  children: React.ReactNode
}

export default function Auth0ProviderWrapper({ children }: Props) {
  return (
    <Auth0Provider
      domain={env.auth0.domain}
      clientId={env.auth0.clientId}
      authorizationParams={{
        audience: env.auth0.audience,
        scope: "openid profile email offline_access",
        // eslint-disable-next-line camelcase
        redirect_uri: env.auth0.redirectUri.web,
      }}
      cacheLocation="localstorage"
      useRefreshTokens
    >
      {children}
    </Auth0Provider>
  )
}

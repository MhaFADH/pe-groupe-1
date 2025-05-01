import { type InternalAxiosRequestConfig } from "axios"
import * as SecureStore from "expo-secure-store"
import { jwtDecode } from "jwt-decode"
import Auth0 from "react-native-auth0"

import { signOut } from "@/services/auth/authBridge"
import getEnv from "@/utils/env"

export class RefreshInterceptorError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "RefreshInterceptorError"
  }
}

const env = getEnv()

const auth0 = new Auth0({
  domain: env.auth0.domain,
  clientId: env.auth0.clientId,
})

const TIME_EXPIRATION_BUFFER = 15

export default async (config: InternalAxiosRequestConfig) => {
  const accessToken = SecureStore.getItem("accessToken")

  if (!accessToken) {
    throw new RefreshInterceptorError("No access token found")
  }

  const decodedToken = jwtDecode(accessToken)
  const currentTime = Math.floor(Date.now() / 1000) + TIME_EXPIRATION_BUFFER

  if (!decodedToken.exp) {
    throw new RefreshInterceptorError(
      "No expiration time found in token, token might be non-existent",
    )
  }

  if (decodedToken.exp < currentTime) {
    const refreshToken = await SecureStore.getItemAsync("refreshToken")

    if (!refreshToken) {
      throw new RefreshInterceptorError("No refresh token found")
    }

    const newTokens = await auth0.auth
      .refreshToken({
        refreshToken,
        scope: "openid profile email offline_access",
      })
      .catch(async (error) => {
        await signOut()
        throw new RefreshInterceptorError(`Error refreshing token: ${error}`)
      })

    await SecureStore.setItemAsync("accessToken", newTokens.accessToken)
    await SecureStore.setItemAsync("idToken", newTokens.idToken)

    if (newTokens.refreshToken) {
      await SecureStore.setItemAsync("refreshToken", newTokens.refreshToken)
    }

    config.headers.Authorization = `Bearer ${newTokens.accessToken}`
  }

  return config
}

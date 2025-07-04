import * as SecureStore from "expo-secure-store"
import { useCallback, useEffect, useState } from "react"
import { type User, useAuth0 } from "react-native-auth0"

import auth0Client from "@/services/auth/auth0Client"
import {
  AuthManagerError,
  type IAuthManager,
} from "@/services/auth/platformBasedAuth/authManager.web"
import getEnv from "@/utils/env"

const env = getEnv()

const useAuthManagerMobile = () => {
  const { authorize, clearSession, getCredentials, error } = useAuth0()

  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const signIn = async (signUp = false) => {
    await authorize({
      scope: "openid profile email offline_access",
      audience: env.auth0.audience,
      // eslint-disable-next-line camelcase
      additionalParameters: { screen_hint: signUp ? "signup" : "" },
    }).catch((err) => {
      throw new AuthManagerError(`Error signing in:${err}`)
    })

    const credentials = await getCredentials()

    if (!credentials) {
      throw new AuthManagerError("Error sign in: No credentials found")
    }

    await SecureStore.setItemAsync("accessToken", credentials.accessToken)
    await SecureStore.setItemAsync("idToken", credentials.idToken)
    await SecureStore.setItemAsync(
      "refreshToken",
      credentials.refreshToken ?? "",
    )
    setIsAuthenticated(true)
  }

  const removeTokens = () => {
    ;["accessToken", "idToken", "refreshToken"].forEach((key) => {
      void SecureStore.deleteItemAsync(key)
    })
  }

  const signOut = async () => {
    await clearSession().catch((err) => {
      throw new AuthManagerError(`Error signing out:${err}`)
    })
    removeTokens()
    setIsAuthenticated(false)
  }

  const getUser = async () => {
    const rawResponse = await auth0Client.get("userinfo").catch((err) => {
      throw new AuthManagerError(`Error getting user:${err}`)
    })

    return rawResponse.data as User
  }

  const initIsAuthenticated = useCallback((): void => {
    const accessToken = SecureStore.getItem("accessToken")
    const idToken = SecureStore.getItem("idToken")
    const refreshToken = SecureStore.getItem("refreshToken")

    if (!accessToken || !idToken || !refreshToken) {
      removeTokens()
      setIsAuthenticated(false)

      return
    }

    setIsAuthenticated(true)
  }, [])

  const getTokens = async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken")
    const idToken = await SecureStore.getItemAsync("idToken")
    const refreshToken = await SecureStore.getItemAsync("refreshToken")

    if (!accessToken || !idToken || !refreshToken) {
      throw new AuthManagerError("Error getting tokens: No credentials found")
    }

    return {
      accessToken,
      idToken,
      refreshToken,
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usr = await getUser()
        setUser(usr)
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new AuthManagerError(`Failed to fetch user: ${err}`)
      }
    }
    initIsAuthenticated()

    if (!isAuthenticated) {
      return
    }

    void fetchUser()
  }, [initIsAuthenticated, isAuthenticated])

  return {
    signIn,
    signOut,
    getUser,
    getTokens,
    isAuthenticated,
    user,
    error,
  } as IAuthManager
}

export default useAuthManagerMobile

import { useAuth0 } from "@auth0/auth0-react"
import { type User } from "react-native-auth0"

const useAuthManagerWeb = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    getAccessTokenSilently,
    getIdTokenClaims,
    isAuthenticated,
    error,
  } = useAuth0()

  const signIn = async () => {
    await loginWithRedirect().catch((err) => {
      throw new AuthManagerError(`Error signing in:${err}`)
    })
  }

  const signOut = async () => {
    await logout().catch((err) => {
      throw new AuthManagerError(`Error signing out:${err}`)
    })
  }

  const getUser = () => {
    if (!user) {
      throw new AuthManagerError("User not found")
    }

    return user
  }

  const getTokens = async () => {
    const accessToken = await getAccessTokenSilently()

    if (!accessToken) {
      throw new AuthManagerError("Error getting access token: No access token")
    }

    const idToken = await getIdTokenClaims()

    if (!idToken) {
      throw new AuthManagerError("Error getting id token: No id token")
    }

    return {
      accessToken,
      // eslint-disable-next-line no-underscore-dangle
      idToken: idToken.__raw,
      refreshToken: "",
    }
  }

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

export type IAuthManager = {
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  getUser: () => Promise<User>
  getTokens: () => Promise<Tokens | undefined>
  isAuthenticated: boolean
  error: Error | null
  user: User | null
}

export type Tokens = {
  accessToken: string
  idToken: string | undefined
  refreshToken: string | undefined
}

export class AuthManagerError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "AuthManagerError"
  }
}

export default useAuthManagerWeb

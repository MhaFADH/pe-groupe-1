import { type IAuthManager } from "@/services/auth/platformBasedAuth/authManager.web"

let authManagerHolder: IAuthManager | null = null

export const registerAuthManager = (authManager: IAuthManager) => {
  authManagerHolder = authManager
}

export const getAuthManager = () => {
  if (!authManagerHolder) {
    throw new Error("AuthManager not registered")
  }

  return authManagerHolder
}

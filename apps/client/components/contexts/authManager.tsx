import { createContext, useContext, useEffect } from "react"
import { Platform } from "react-native"

import { registerSignOut } from "@/services/auth/authBridge"
import useAuthManagerMobile from "@/services/auth/platformBasedAuth/authManager.native"
import useAuthManagerWeb, {
  type IAuthManager,
} from "@/services/auth/platformBasedAuth/authManager.web"

export const AuthManagerContext = createContext<IAuthManager | null>(null)

export const AuthManagerProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // This rule is disabled because the hook is conditionally called based on the platform, which is a safe call since the entirety of the app is platform-based
  const authManager =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    Platform.OS === "web" ? useAuthManagerWeb() : useAuthManagerMobile()

  useEffect(() => {
    registerSignOut(authManager.signOut)
  }, [authManager])

  return (
    <AuthManagerContext.Provider value={authManager}>
      {children}
    </AuthManagerContext.Provider>
  )
}

export const useAuthManager = () => {
  const context = useContext(AuthManagerContext)

  if (!context) {
    throw new Error("useAuthManager must be used within an AuthManagerProvider")
  }

  return context
}

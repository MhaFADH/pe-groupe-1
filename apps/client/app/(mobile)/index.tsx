import { useAuthManager } from "@/components/contexts"
import { Home } from "@/components/pages/home"
import { Login } from "@/components/pages/login"

const MobileRoot = () => {
  const { isAuthenticated, signIn } = useAuthManager()

  if (!isAuthenticated) {
    return <Login onSignIn={() => signIn()} onSignUp={() => signIn(true)} />
  }

  return <Home />
}

export default MobileRoot

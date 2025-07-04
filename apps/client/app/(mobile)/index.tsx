import { useAuthManager } from "@/components/contexts"
import { Home } from "@/components/pages/home"
import { Login } from "@/components/pages/login"

const MobileRoot = () => {
  const { isAuthenticated } = useAuthManager()

  if (!isAuthenticated) {
    return <Login />
  }

  return <Home />
}

export default MobileRoot

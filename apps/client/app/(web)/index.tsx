import tailwind from "twrnc"

import { useAuthManager } from "@/components/contexts/authManager"
import { LoginWeb } from "@/components/pages/login/login.web"

const WebRoot = () => {
  const { signOut, user, error, isAuthenticated } = useAuthManager()

  return (
    <div
      style={tailwind.style("flex flex-col items-center justify-center h-full")}
    >
      {user && (
        <>
          <span>Logged in as {user.name}</span>
          <button onClick={() => signOut()}>Log out</button>
        </>
      )}
      {!isAuthenticated && <LoginWeb />}
      {error && <span>{error.message}</span>}
    </div>
  )
}

export default WebRoot

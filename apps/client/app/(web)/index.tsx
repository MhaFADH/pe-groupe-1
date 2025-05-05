import tailwind from "twrnc"

import { useAuthManager } from "@/components/contexts/authManager"

const WebRoot = () => {
  const { signIn, signOut, user, error } = useAuthManager()

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
      {!user && (
        <>
          <span>Not logged in</span>
          <button onClick={() => signIn()}>Log In</button>
        </>
      )}
      {error && <span>{error.message}</span>}
    </div>
  )
}

export default WebRoot

import { useAuth0 } from "@auth0/auth0-react"
import tailwind from "twrnc"

const WebRoot = () => {
  const { logout, loginWithRedirect, user, error } = useAuth0()

  return (
    <div
      style={tailwind.style(
        "flex flex-col items-center justify-center h-full bg-red-500",
      )}
    >
      {user && (
        <>
          <span>Logged in as {user.name}</span>
          <button onClick={() => logout()}>Log out</button>
        </>
      )}
      {!user && (
        <>
          <span>Not logged in</span>
          <button onClick={() => loginWithRedirect()}>Log In</button>
        </>
      )}
      {error && <span>{error.message}</span>}
    </div>
  )
}

export default WebRoot

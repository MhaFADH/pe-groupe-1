import { Button, Text, View } from "react-native"
import tailwind from "twrnc"

import { useAuthManager } from "@/components/contexts/authManager"

const MobileRoot = () => {
  const { signIn, signOut, user, error, isAuthenticated, getTokens } =
    useAuthManager()

  return (
    <View style={tailwind.style("flex-1 items-center justify-center bg-white")}>
      {!isAuthenticated && (
        <>
          <Text>Not logged in</Text>
          <Button onPress={signIn} title="Sign in" />
        </>
      )}
      {isAuthenticated && (
        <>
          <Text>Logged in as {user?.name}</Text>
          <Button
            onPress={async () => {
              try {
                const tokens = await getTokens()

                if (tokens?.accessToken) {
                  // eslint-disable-next-line no-console
                  console.error(tokens.accessToken)
                }
              } catch (err) {
                // eslint-disable-next-line no-console
                console.error("Failed to copy access token:", err)
              }
            }}
            title="Get access token"
          />
          <Button onPress={signOut} title="Sign out" />
        </>
      )}

      {error && <Text>{error.message}</Text>}
    </View>
  )
}

export default MobileRoot

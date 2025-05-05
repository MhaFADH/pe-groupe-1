import { Button, Text, View } from "react-native"
import tailwind from "twrnc"

import { useAuthManager } from "@/components/contexts/authManager"

const MobileRoot = () => {
  const { signIn, signOut, user, error, isAuthenticated } = useAuthManager()

  return (
    <View style={tailwind.style("flex-1 items-center justify-center")}>
      {!isAuthenticated && (
        <>
          <Text>Not logged in</Text>
          <Button onPress={signIn} title="Sign in" />
        </>
      )}
      {isAuthenticated && (
        <>
          <Text>Logged in as {user?.name}</Text>
          <Button onPress={signOut} title="Sign out" />
        </>
      )}

      {error && <Text>{error.message}</Text>}
    </View>
  )
}

export default MobileRoot

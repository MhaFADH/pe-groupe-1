/* eslint-disable no-console */
import { Button, Text, View } from "react-native"
import { useAuth0 } from "react-native-auth0"
import tailwind from "twrnc"

const MobileRoot = () => {
  const { user, error } = useAuth0()

  const { clearSession, authorize } = useAuth0()

  const signOut = async () => {
    try {
      await clearSession()
    } catch (e) {
      console.log(e)
    }
  }

  const signIn = async () => {
    try {
      await authorize()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={tailwind.style("flex-1 items-center justify-center")}>
      {!user && (
        <>
          <Text>Not logged in</Text>
          <Button onPress={signIn} title="Sign in" />
        </>
      )}
      {user && (
        <>
          <Text>Logged in as {user.name}</Text>
          <Button onPress={signOut} title="Sign out" />
        </>
      )}

      {error && <Text>{error.message}</Text>}
    </View>
  )
}

export default MobileRoot

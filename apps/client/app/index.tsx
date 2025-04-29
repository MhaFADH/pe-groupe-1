import { Redirect } from "expo-router"
import { Platform } from "react-native"

const PlatformRedirection = () => {
  if (Platform.OS === "web") {
    return <Redirect href="/(web)" />
  }

  return <Redirect href="/(mobile)" />
}

export default PlatformRedirection

import { Platform } from "react-native"

import Auth0ProviderWrapperNative from "@/components/allPlatformsWrappers/auth/Auth0ProviderWrapper.native"
import Auth0ProviderWrapperWeb from "@/components/allPlatformsWrappers/auth/Auth0ProviderWrapper.web"

export default Platform.OS === "web"
  ? Auth0ProviderWrapperWeb
  : Auth0ProviderWrapperNative

import { Platform } from "react-native"

import { LoginNative } from "./login.native"
import { LoginWeb } from "./login.web"

let LoginComponent = null

if (Platform.OS === "web") {
  LoginComponent = LoginWeb
} else {
  LoginComponent = LoginNative
}

export const Login = LoginComponent

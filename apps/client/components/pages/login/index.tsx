import { Platform } from "react-native"

import { LoginNative } from "./login.native"
import { LoginWeb } from "./login.web"

export const Login = Platform.OS === "web" ? LoginWeb : LoginNative

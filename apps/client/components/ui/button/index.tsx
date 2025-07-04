import { Platform } from "react-native"

import { ButtonNative } from "./button.native"
import { ButtonWeb } from "./button.web"

let ButtonComponent = null

if (Platform.OS === "web") {
  ButtonComponent = ButtonWeb
} else {
  ButtonComponent = ButtonNative
}

export const Button = ButtonComponent

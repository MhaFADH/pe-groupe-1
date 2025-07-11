import { Platform } from "react-native"

import { ButtonNative } from "./button.native"
import { ButtonWeb } from "./button.web"

export const Button = Platform.OS === "web" ? ButtonWeb : ButtonNative

import { Platform } from "react-native"

import { ThemeSettingNative } from "./theme-setting.native"
import { ThemeSettingWeb } from "./theme-setting.web"

let ThemeSettingComponent = null

if (Platform.OS === "web") {
  ThemeSettingComponent = ThemeSettingWeb
} else {
  ThemeSettingComponent = ThemeSettingNative
}

export const ThemeSetting = ThemeSettingComponent

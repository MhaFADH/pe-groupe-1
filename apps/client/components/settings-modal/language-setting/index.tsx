import { Platform } from "react-native"

import { LanguageSettingNative } from "./language-setting.native"
import { LanguageSettingWeb } from "./language-setting.web"

let LanguageSettingComponent = null

if (Platform.OS === "web") {
  LanguageSettingComponent = LanguageSettingWeb
} else {
  LanguageSettingComponent = LanguageSettingNative
}

export const LanguageSetting = LanguageSettingComponent

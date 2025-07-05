import { Platform } from "react-native"

import { PrivacySettingNative } from "./privacy-setting.native"
import { PrivacySettingWeb } from "./privacy-setting.web"

let PrivacySettingComponent = null

if (Platform.OS === "web") {
  PrivacySettingComponent = PrivacySettingWeb
} else {
  PrivacySettingComponent = PrivacySettingNative
}

export const PrivacySetting = PrivacySettingComponent

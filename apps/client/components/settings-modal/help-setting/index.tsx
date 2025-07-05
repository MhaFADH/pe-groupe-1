import { Platform } from "react-native"

import { HelpSettingNative } from "./help-setting.native"
import { HelpSettingWeb } from "./help-setting.web"

let HelpSettingComponent = null

if (Platform.OS === "web") {
  HelpSettingComponent = HelpSettingWeb
} else {
  HelpSettingComponent = HelpSettingNative
}

export const HelpSetting = HelpSettingComponent

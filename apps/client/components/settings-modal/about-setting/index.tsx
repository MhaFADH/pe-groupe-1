import { Platform } from "react-native"

import { AboutSettingNative } from "./about-setting.native"
import { AboutSettingWeb } from "./about-setting.web"

let AboutSettingComponent = null

if (Platform.OS === "web") {
  AboutSettingComponent = AboutSettingWeb
} else {
  AboutSettingComponent = AboutSettingNative
}

export const AboutSetting = AboutSettingComponent

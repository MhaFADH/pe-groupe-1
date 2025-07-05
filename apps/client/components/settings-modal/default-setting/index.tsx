import { Platform } from "react-native"

import { DefaultSettingNative } from "./default-setting.native"
import { DefaultSettingWeb } from "./default-setting.web"

let DefaultSettingComponent = null

if (Platform.OS === "web") {
  DefaultSettingComponent = DefaultSettingWeb
} else {
  DefaultSettingComponent = DefaultSettingNative
}

export const DefaultSetting = DefaultSettingComponent

import { Platform } from "react-native"

import { NotificationsSettingNative } from "./notifications-setting.native"
import { NotificationsSettingWeb } from "./notifications-setting.web"

let NotificationsSettingComponent = null

if (Platform.OS === "web") {
  NotificationsSettingComponent = NotificationsSettingWeb
} else {
  NotificationsSettingComponent = NotificationsSettingNative
}

export const NotificationsSetting = NotificationsSettingComponent

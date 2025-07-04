import { Platform } from "react-native";

export const NotificationsSettingWeb = Platform.select({
  web: () => require("./notifications-setting.web").NotificationsSettingWeb,
  default: () =>
    require("./notifications-setting.native").NotificationsSettingNative,
})();

export const NotificationsSettingNative = Platform.select({
  web: () => require("./notifications-setting.web").NotificationsSettingWeb,
  default: () =>
    require("./notifications-setting.native").NotificationsSettingNative,
})();

export const NotificationsSetting = Platform.select({
  web: () => require("./notifications-setting.web").NotificationsSettingWeb,
  default: () =>
    require("./notifications-setting.native").NotificationsSettingNative,
})();

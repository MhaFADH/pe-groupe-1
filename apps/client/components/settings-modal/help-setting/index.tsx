import { Platform } from "react-native";

export const HelpSettingWeb = Platform.select({
  web: () => require("./help-setting.web").HelpSettingWeb,
  default: () => require("./help-setting.native").HelpSettingNative,
})();

export const HelpSettingNative = Platform.select({
  web: () => require("./help-setting.web").HelpSettingWeb,
  default: () => require("./help-setting.native").HelpSettingNative,
})();

export const HelpSetting = Platform.select({
  web: () => require("./help-setting.web").HelpSettingWeb,
  default: () => require("./help-setting.native").HelpSettingNative,
})();

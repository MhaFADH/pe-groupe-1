import { Platform } from "react-native";

export const PrivacySettingWeb = Platform.select({
  web: () => require("./privacy-setting.web").PrivacySettingWeb,
  default: () => require("./privacy-setting.native").PrivacySettingNative,
})();

export const PrivacySettingNative = Platform.select({
  web: () => require("./privacy-setting.web").PrivacySettingWeb,
  default: () => require("./privacy-setting.native").PrivacySettingNative,
})();

export const PrivacySetting = Platform.select({
  web: () => require("./privacy-setting.web").PrivacySettingWeb,
  default: () => require("./privacy-setting.native").PrivacySettingNative,
})();

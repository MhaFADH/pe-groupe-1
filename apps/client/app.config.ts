import { config } from "dotenv"
import { ConfigContext, ExpoConfig } from "expo/config"

config({ path: "../../.env" })

const bundleId = process.env.EXPO_PUBLIC_BUNDLE_ID || "lootopia.dev"

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "client",
  slug: "client",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: bundleId,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: bundleId,
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#AAAAAA",
      },
    ],
    [
      "react-native-auth0",
      {
        domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN,
      },
    ],
    "expo-system-ui",
    "expo-updates",
    "expo-secure-store",
    "@reactvision/react-viro",
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Allow $(PRODUCT_NAME) to use your location.",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },

  extra: {
    eas: {
      projectId: "7676e82c-dc45-43b2-ac94-80b5eb7f88a4",
    },
  },
})

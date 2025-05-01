import { config } from "dotenv"
import { ConfigContext, ExpoConfig } from "expo/config"

config({ path: "../../.env" })

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
    bundleIdentifier: "lootopia.dev",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "lootopia.dev",
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
  ],
  experiments: {
    typedRoutes: true,
  },
})

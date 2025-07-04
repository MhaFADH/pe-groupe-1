import { Platform } from "react-native"

import { HomeNative } from "./home.native"
import { HomeWeb } from "./home.web"

export type HomeProps = {
  onNavigate?: (page: "login" | "home") => void
  appName?: string
  onBackToLogin?: () => void
  className?: string
  contentClassName?: string
  titleClassName?: string
  subtitleClassName?: string
}

let HomeComponent = null

if (Platform.OS === "web") {
  HomeComponent = HomeWeb
} else {
  HomeComponent = HomeNative
}

export const Home = HomeComponent

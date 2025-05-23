import type { Theme } from "@react-navigation/native"
import type { Config } from "tailwindcss"

import baseConfig from "../tailwind.config"

export const DarkTheme: Theme["colors"] = {
  primary: "#E94E4E",
  background: "#000000",
  card: "#3f3f46",
  text: "#FFF",
  border: "#E94E4E",
  notification: "#E94E4E",
}

export const LightTheme: Theme["colors"] = {
  primary: "#E94E4E",
  background: "#FFFFFF",
  card: "#3F3F46",
  text: "#000000",
  border: "#E94E4E",
  notification: "#E94E4E",
}

export const darkConfig = {
  content: [...baseConfig.content],
  theme: {
    extend: {
      colors: {
        foreground: "#FFF",
        background: "#000000",
        card: { DEFAULT: "#18181B", foreground: "#FFF" },
        content: { DEFAULT: "#3f3f46", foreground: "#FFF" },
      },
    },
  },
  presets: [baseConfig],
} satisfies Config

export const lightConfig = {
  content: [...baseConfig.content],
  theme: {},
  presets: [baseConfig],
} satisfies Config

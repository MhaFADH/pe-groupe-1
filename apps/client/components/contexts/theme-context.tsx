import * as SecureStore from "expo-secure-store"
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { Platform } from "react-native"
import { type RnColorScheme, useAppColorScheme } from "twrnc"

import tw from "@/tailwind"

export type Theme = "light" | "dark"

type ThemeContextType = {
  colorScheme: RnColorScheme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  version: number
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}

type ThemeProviderProps = {
  children: ReactNode
}

const persistTheme = (theme: RnColorScheme) => {
  if (Platform.OS === "web") {
    localStorage.setItem("colorScheme", theme ?? "light")

    return null
  }

  SecureStore.setItem("colorScheme", theme ?? "light")

  return null
}

const getThemeFromStorage = () => {
  if (Platform.OS === "web") {
    return localStorage.getItem("colorScheme") ?? "light"
  }

  return SecureStore.getItem("colorScheme") ?? "light"
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [colorScheme, toggleScheme, setScheme] = useAppColorScheme(tw)
  const [version, setVersion] = useState(0)

  const toggleTheme = () => {
    toggleScheme()
    setVersion((prev) => prev + 1)
    persistTheme(colorScheme)
  }

  const setTheme = (newTheme: Theme) => {
    setScheme(newTheme)
    setVersion((prev) => prev + 1)
    persistTheme(colorScheme)
  }

  useEffect(() => {
    const storedTheme = getThemeFromStorage()
    setScheme(storedTheme as RnColorScheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        toggleTheme,
        setTheme,
        version,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

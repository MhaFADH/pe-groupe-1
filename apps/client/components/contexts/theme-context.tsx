import * as SecureStore from "expo-secure-store"
import { useColorScheme } from "nativewind"
import { type ReactNode, createContext, useContext, useEffect } from "react"
import { Platform } from "react-native"

type Theme = "light" | "dark" | "system"

type ThemeContextType = {
  colorScheme: Theme
  setTheme: (theme: Theme) => void
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

const persistTheme = (theme: Theme) => {
  if (Platform.OS === "web") {
    localStorage.setItem("colorScheme", theme)

    return
  }

  void SecureStore.setItemAsync("colorScheme", theme)
}

const getThemeFromStorage = async (): Promise<Theme> => {
  if (Platform.OS === "web") {
    const stored = localStorage.getItem("colorScheme")

    return stored ? (stored as Theme) : "system"
  }

  const stored = await SecureStore.getItemAsync("colorScheme")

  return stored ? (stored as Theme) : "system"
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, setColorScheme } = useColorScheme()

  const setTheme = (newTheme: Theme) => {
    setColorScheme(newTheme)
    persistTheme(newTheme)
  }

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await getThemeFromStorage()
      setColorScheme(storedTheme)
    }

    void loadTheme()
  }, [setColorScheme])

  return (
    <ThemeContext.Provider
      value={{
        colorScheme: colorScheme ?? "system",
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

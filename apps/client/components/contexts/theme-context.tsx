import { type ReactNode, createContext, useContext, useState } from "react"
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

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [colorScheme, toggleScheme, setScheme] = useAppColorScheme(tw)
  const [version, setVersion] = useState(0)

  const toggleTheme = () => {
    toggleScheme()
    setVersion((prev) => prev + 1)
  }

  const setTheme = (newTheme: Theme) => {
    setScheme(newTheme)
    setVersion((prev) => prev + 1)
  }

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

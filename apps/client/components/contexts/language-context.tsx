import * as SecureStore from "expo-secure-store"
import React, {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import { Platform } from "react-native"

type Language = "en" | "fr"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => Promise<void>
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | null>(null)

const LANGUAGE_STORAGE_KEY = "app_language"

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en")
  const [isLoading, setIsLoading] = useState(true)
  const { i18n } = useTranslation()
  const getStoredLanguage = async (): Promise<Language | null> => {
    try {
      if (Platform.OS === "web") {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)

        return stored as Language
      }

      const stored = await SecureStore.getItemAsync(LANGUAGE_STORAGE_KEY)

      return stored as Language
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error getting stored language:", error)

      return null
    }
  }

  const storeLanguage = async (lang: Language): Promise<void> => {
    try {
      if (Platform.OS === "web") {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
      } else {
        await SecureStore.setItemAsync(LANGUAGE_STORAGE_KEY, lang)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error storing language:", error)
    }
  }

  const setLanguage = async (newLanguage: Language): Promise<void> => {
    try {
      setLanguageState(newLanguage)
      await i18n.changeLanguage(newLanguage)
      await storeLanguage(newLanguage)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error setting language:", error)
    }
  }

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const storedLanguage = await getStoredLanguage()
        const initialLanguage = storedLanguage ?? "en"
        setLanguageState(initialLanguage)
        await i18n.changeLanguage(initialLanguage)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error initializing language:", error)
        setLanguageState("en")
        await i18n.changeLanguage("en")
      } finally {
        setIsLoading(false)
      }
    }

    void initializeLanguage()
  }, [i18n])

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }

  return context
}

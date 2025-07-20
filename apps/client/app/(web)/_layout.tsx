import { Slot } from "expo-router"
import { Platform, ScrollView } from "react-native"

import { Footer, Header } from "@/components"
import { ModalPersistenceProvider } from "@/components/contexts/modal-persistence"
import { SettingsModalWeb } from "@/components/settings-modal/settings-modal.web"

const WebApp = () => {
  if (Platform.OS !== "web") {
    return null
  }

  return (
    <ModalPersistenceProvider>
      <Header />
      <ScrollView className="bg-gray-50 dark:bg-gray-900">
        <Slot />
      </ScrollView>
      <Footer />
      <SettingsModalWeb />
    </ModalPersistenceProvider>
  )
}

export default WebApp

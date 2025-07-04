import { Slot } from "expo-router"
import { Platform } from "react-native"

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
      <Slot />
      <Footer />
      <SettingsModalWeb />
    </ModalPersistenceProvider>
  )
}

export default WebApp

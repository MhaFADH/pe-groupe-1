import { Stack } from "expo-router/stack"
import { useCallback, useState } from "react"
import { Platform } from "react-native"
import {
  ReanimatedLogLevel,
  configureReanimatedLogger,
} from "react-native-reanimated"

import { BurgerMenu } from "@/components/burger-menu"
import { useAuthManager } from "@/components/contexts"
import RootHeader from "@/components/root-header/index"

const MobileApp = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { signOut, isAuthenticated } = useAuthManager()

  const openDrawer = useCallback(() => setIsDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])

  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
  })

  if (Platform.OS === "web") {
    return null
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: isAuthenticated,
          header: (props) => (
            <RootHeader {...props} onOpenDrawer={openDrawer} />
          ),
        }}
      >
        <Stack.Screen name="home" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="explore" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="game" />
      </Stack>
      <BurgerMenu
        isVisible={isDrawerOpen}
        onClose={closeDrawer}
        onLogout={signOut}
      />
    </>
  )
}

export default MobileApp

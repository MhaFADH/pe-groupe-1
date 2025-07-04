import { Stack } from "expo-router"

const SettingsRoot = () => (
  <>
    <Stack
      initialRouteName="settings-list"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="settings-list" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="theme" />
      <Stack.Screen name="language" />
      <Stack.Screen name="about" />
      <Stack.Screen name="help" />
    </Stack>
  </>
)

export default SettingsRoot

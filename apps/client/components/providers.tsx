import type { ComponentProps, ReactNode } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { ThemeProvider } from "@/components/contexts/theme-context"

type Props = {
  children: ReactNode
} & ComponentProps<typeof ThemeProvider>

const Providers = ({ children, ...props }: Props) => (
  <ThemeProvider {...props}>
    <GestureHandlerRootView>{children}</GestureHandlerRootView>
  </ThemeProvider>
)

export default Providers

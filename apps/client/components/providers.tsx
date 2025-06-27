import type { ReactNode } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"

type Props = {
  children: ReactNode
}

const Providers = ({ children }: Props) => (
  <GestureHandlerRootView>{children}</GestureHandlerRootView>
)

export default Providers

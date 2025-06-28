import { forwardRef } from "react"
import { View } from "react-native"
import { Switch as RNSwitch } from "react-native-gesture-handler"

import useSwitch, {
  type UseSwitchProps,
} from "@/components/ui/switch/use-switch"
import { Text } from "@/components/ui/text"

export type SwitchProps = UseSwitchProps

const Switch = forwardRef<RNSwitch, SwitchProps>((props, ref) => {
  const {
    getLeftTextProps,
    getRightTextProps,
    getWrapperProps,
    getSwitchProps,
  } = useSwitch({
    ...props,
    ref,
  })

  return (
    <View {...getWrapperProps()}>
      <Text {...getLeftTextProps()} />
      <RNSwitch {...getSwitchProps()} />
      <Text {...getRightTextProps()} />
    </View>
  )
})

Switch.displayName = "Text"

export default Switch

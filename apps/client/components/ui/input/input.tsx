import { Eye, EyeOff } from "lucide-react-native"
import { forwardRef } from "react"
import { Pressable, TextInput, TouchableOpacity, View } from "react-native"
import Animated from "react-native-reanimated"

import { useTheme } from "@/components/contexts/theme-context"
import useInput, { type UseInputProps } from "@/components/ui/input/use-input"
import { Text } from "@/components/ui/text"

export type InputProps = UseInputProps

const TextInputAnimated = Animated.createAnimatedComponent(TextInput)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  const { tw } = useTheme()
  const {
    wrapperStyle,
    errorMessage,
    containerRef,
    errorRef,
    isPassword,
    handleShowPassword,
    showPassword,
    handleFocusPressable,
    getInputProps,
    label,
  } = useInput({ ...props, ref })

  return (
    <View style={tw.style("gap-1 w-full")} ref={containerRef}>
      {label && <Text>{label}</Text>}
      <AnimatedPressable onPress={handleFocusPressable}>
        <Animated.View style={wrapperStyle}>
          <TextInputAnimated {...getInputProps()} />
          {isPassword && (
            <TouchableOpacity onPress={handleShowPassword}>
              {showPassword ? (
                <Eye color={tw.color("card-foreground")} size={22} />
              ) : (
                <EyeOff color={tw.color("card-foreground")} size={22} />
              )}
            </TouchableOpacity>
          )}
        </Animated.View>
      </AnimatedPressable>

      {errorMessage && (
        <Text color="danger" ref={errorRef}>
          {errorMessage}
        </Text>
      )}
    </View>
  )
})

Input.displayName = "Input"

export default Input

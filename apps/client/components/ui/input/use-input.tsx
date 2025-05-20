/* eslint-disable max-lines */
import {
  type ComponentPropsWithoutRef,
  type Ref,
  useCallback,
  useMemo,
  useState,
} from "react"
import {
  type NativeSyntheticEvent,
  type Text as RNText,
  type TextInput,
  type TextInputEndEditingEventData,
  type TextInputFocusEventData,
  type TextInputProps,
  type View,
} from "react-native"
import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated"

import { useTheme } from "@/components/contexts/theme-context"
import {
  type InputVariantsProps,
  inputVariants,
} from "@/components/ui/input/variants"
import useDOMRef from "@/hooks/use-dom-ref"

type Event<T> = NativeSyntheticEvent<T>

export type UseInputProps = {
  errorMessage?: string
  errorRef?: Ref<RNText>
  containerRef?: Ref<View>
  ref?: Ref<TextInput>
  isPassword?: boolean
  label?: string
} & Omit<ComponentPropsWithoutRef<typeof TextInput>, "style"> &
  Pick<InputVariantsProps, "color"> &
  Pick<ComponentPropsWithoutRef<typeof View>, "style">

// eslint-disable-next-line max-lines-per-function
const useInput = ({
  isPassword,
  textContentType,
  autoComplete,
  color = "card",
  errorMessage,
  onFocus,
  onEndEditing,
  ref,
  style,
  label,
  containerRef,
  errorRef,
  ...props
}: UseInputProps) => {
  const { tw } = useTheme()
  const inputRef = useDOMRef(ref)
  const slots = useMemo(() => inputVariants({ color }), [color])
  const errorSlots = useMemo(() => inputVariants({ color: "danger" }), [])

  const inputColor = tw.color(slots.color())
  const inputFocusedColor = tw.color(slots.focused())
  const errorColor = tw.color(errorSlots.color())
  const errorFocusedColor = tw.color(errorSlots.focused())

  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleOnEndEditing = useCallback(
    (event: Event<TextInputEndEditingEventData>) => {
      setIsFocused(false)
      onEndEditing?.(event)
    },
    [onEndEditing],
  )
  const handleOnFocus = useCallback(
    (event: Event<TextInputFocusEventData>) => {
      setIsFocused(true)
      onFocus?.(event)
    },
    [onFocus],
  )

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const correctTextContentType = useMemo<typeof textContentType>(() => {
    if (textContentType) {
      return textContentType
    }

    if (isPassword) {
      return "password"
    }

    // eslint-disable-next-line no-undefined
    return undefined
  }, [isPassword, textContentType])

  const correctAutoComplete = useMemo<typeof autoComplete>(() => {
    if (autoComplete) {
      return autoComplete
    }

    if (isPassword) {
      return "password"
    }

    // eslint-disable-next-line no-undefined
    return undefined
  }, [autoComplete, isPassword])

  const progress = useDerivedValue(() => withTiming(isFocused ? 1 : 0))
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 1], [
      inputColor,
      inputFocusedColor,
    ] as string[])

    return {
      backgroundColor,
    }
  }, [inputColor, inputFocusedColor, progress])
  const animatedErrorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 1], [
      errorColor,
      errorFocusedColor,
    ] as string[])

    return {
      backgroundColor,
    }
  }, [errorColor, errorFocusedColor, progress])

  const handleFocusPressable = () => inputRef.current?.focus()

  const getInputProps = useCallback<() => TextInputProps>(
    () => ({
      textContentType: correctTextContentType,
      autoComplete: correctAutoComplete,
      onFocus: handleOnFocus,
      onEndEditing: handleOnEndEditing,
      placeholderTextColor: tw.color(
        errorMessage ? errorSlots.placeholder() : slots.placeholder(),
      ),
      secureTextEntry: isPassword && !showPassword,
      onBlur: handleOnEndEditing,
      showPassword,
      ref: inputRef,
      style: tw.style(slots.base()),
      ...props,
    }),
    [
      correctAutoComplete,
      correctTextContentType,
      errorMessage,
      errorSlots,
      handleOnEndEditing,
      handleOnFocus,
      inputRef,
      isPassword,
      props,
      showPassword,
      slots,
      tw,
    ],
  )

  return {
    isPassword,
    handleShowPassword,
    showPassword,
    errorMessage,
    handleFocusPressable,
    getInputProps,
    wrapperStyle: [
      errorMessage ? animatedErrorStyle : animatedStyle,
      tw.style(slots.wrapper()),
      style,
    ],
    label,
    containerRef,
    errorRef,
  }
}

export default useInput

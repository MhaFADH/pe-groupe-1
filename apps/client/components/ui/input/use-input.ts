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
  type InputVariantsProps,
  inputVariants,
} from "@/components/ui/input/variants"
import useDOMRef from "@/hooks/use-dom-ref"
import cn from "@/utils/cn"

type Event<T> = NativeSyntheticEvent<T>

export type UseInputProps = {
  errorMessage?: string
  errorRef?: Ref<RNText>
  containerRef?: Ref<View>
  ref?: Ref<TextInput>
  isPassword?: boolean
  label?: string
} & Omit<ComponentPropsWithoutRef<typeof TextInput>, "style"> &
  Pick<InputVariantsProps, "color">

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
  className,
  label,
  containerRef,
  errorRef,
  ...props
}: UseInputProps) => {
  const inputRef = useDOMRef(ref)
  const slots = useMemo(() => inputVariants({ color }), [color])
  const errorSlots = useMemo(() => inputVariants({ color: "danger" }), [])

  const inputColor = slots.color()
  const inputFocusedColor = slots.focused()
  const errorColor = errorSlots.color()
  const errorFocusedColor = errorSlots.focused()

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

  const handleFocusPressable = () => inputRef.current?.focus()

  const getInputProps = useCallback<() => TextInputProps>(
    () => ({
      textContentType: correctTextContentType,
      autoComplete: correctAutoComplete,
      onFocus: handleOnFocus,
      onEndEditing: handleOnEndEditing,
      placeholderClassName: errorMessage
        ? errorSlots.placeholder()
        : slots.placeholder(),
      secureTextEntry: isPassword && !showPassword,
      onBlur: handleOnEndEditing,
      showPassword,
      ref: inputRef,
      className: slots.base(),
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
    ],
  )

  return {
    isPassword,
    handleShowPassword,
    showPassword,
    errorMessage,
    handleFocusPressable,
    getInputProps,
    wrapperClassName: cn(
      isFocused && inputFocusedColor,
      !isFocused && inputColor,
      errorMessage && errorFocusedColor,
      !errorMessage && errorColor,
      slots.wrapper(),
      className,
    ),
    label,
    containerRef,
    errorRef,
  }
}

export default useInput

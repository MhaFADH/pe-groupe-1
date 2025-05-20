import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
  useCallback,
  useMemo,
} from "react"
import type { GestureResponderEvent, Pressable, View } from "react-native"
import { Gesture } from "react-native-gesture-handler"
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

import { useTheme } from "@/components/contexts/theme-context"
import {
  type ButtonVariantsProps,
  buttonVariants,
} from "@/components/ui/button/variants"

export type UseButtonProps = {
  ref?: Ref<View> | null
  isLoading?: boolean
  isDisabled?: boolean
  isText?: boolean
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<typeof Pressable>, "children"> &
  ButtonVariantsProps

const useButton = ({
  style,
  radius,
  color = "primary",
  role,
  isLoading = false,
  isDisabled: isDisabledProp,
  isFullWidth,
  isIconOnly,
  children,
  isText,
  onPress,
  ...props
}: UseButtonProps) => {
  const scaleDownAnimation = useSharedValue(1)
  const { tw } = useTheme()
  const slots = useMemo(
    () => buttonVariants({ color, isFullWidth, isIconOnly, radius }),
    [color, isFullWidth, isIconOnly, radius],
  )

  const isDisabled = isDisabledProp ?? isLoading

  const scaleHandler = Gesture.LongPress()
    .onBegin(() => {
      if (isDisabled) {
        return
      }

      scaleDownAnimation.value = withSpring(0.95)
    })
    .onFinalize(() => {
      scaleDownAnimation.value = withSpring(1)
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleDownAnimation.value }],
  }))

  const getGestureProps = useCallback(
    () => ({ gesture: scaleHandler }),
    [scaleHandler],
  )

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (isDisabled) {
        return
      }

      onPress?.(event)
    },
    [isDisabled, onPress],
  )

  const getButtonProps = useCallback(
    () => ({
      style: [
        animatedStyle,
        tw.style(slots, {
          "opacity-disabled": isDisabled,
        }),
        style,
      ],
      role: role ?? "button",
      disabled: isLoading,
      onPress: handlePress,
      ...props,
    }),
    [
      animatedStyle,
      handlePress,
      isDisabled,
      isLoading,
      props,
      role,
      slots,
      style,
      tw,
    ],
  )

  const getTextProps = useCallback(() => {
    if (!isText) {
      return {}
    }

    return {
      color: `${color}-foreground` as const,
    }
  }, [color, isText])

  const getSpinnerProps = useCallback(
    () => ({
      color: `${color}-foreground` as const,
    }),
    [color],
  )

  return {
    isLoading,
    children,
    isText,
    getButtonProps,
    getGestureProps,
    getSpinnerProps,
    getTextProps,
  }
}

export default useButton

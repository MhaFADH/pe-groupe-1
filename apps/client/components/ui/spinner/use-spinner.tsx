import {
  type ComponentPropsWithoutRef,
  type Ref,
  useCallback,
  useMemo,
} from "react"
import type { ActivityIndicatorProps, View } from "react-native"
import {
  Easing,
  type EasingFunction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"

import { useTheme } from "@/components/contexts/theme-context"
import {
  type SpinnerVariantsProps,
  activitySize,
  spinnerVariants,
} from "@/components/ui/spinner/variants"

const DURATION = 1000

export type UseSpinnerProps = {
  ref?: Ref<View>
} & ComponentPropsWithoutRef<typeof View> &
  SpinnerVariantsProps

const useSpinner = ({
  style,
  color = "primary",
  size = "md",
  ...props
}: UseSpinnerProps) => {
  const { tw } = useTheme()
  const slots = useMemo(() => spinnerVariants({ color, size }), [color, size])

  const useAnimationStyle = (easing: EasingFunction) => {
    const rotation = useSharedValue(0)
    rotation.value = withRepeat(
      withTiming(360, {
        duration: DURATION,
        easing,
      }),
      -1,
    )

    return useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }))
  }

  const circleAnimationStyle = useAnimationStyle(Easing.linear)
  const circle2AnimationStyle = useAnimationStyle(Easing.ease)

  const ariaLabel = useMemo(() => props["aria-label"] ?? "Loading", [props])

  const getCircle1Props = useCallback(
    () => ({
      style: [circleAnimationStyle, tw.style(slots.base())],
    }),
    [circleAnimationStyle, slots, tw],
  )

  const getCircle2Props = useCallback(
    () => ({
      style: [circle2AnimationStyle, tw.style(slots.base(), "opacity-60")],
    }),
    [circle2AnimationStyle, slots, tw],
  )

  const getWrapperProps = useCallback<() => UseSpinnerProps>(
    () => ({
      style: [tw.style(slots.wrapper()), style],
      "aria-label": ariaLabel,
      ...props,
    }),
    [ariaLabel, props, slots, style, tw],
  )

  const getActivityIndicatorProps = useCallback<() => ActivityIndicatorProps>(
    () => ({
      color: tw.color(color),
      size: activitySize[size],
    }),
    [color, size, tw],
  )

  return {
    getWrapperProps,
    getCircle1Props,
    getCircle2Props,
    getActivityIndicatorProps,
  }
}

export default useSpinner

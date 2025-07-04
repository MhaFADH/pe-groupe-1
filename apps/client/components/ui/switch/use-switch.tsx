import {
  type ComponentPropsWithoutRef,
  type Ref,
  useCallback,
  useMemo,
} from "react"
import type { View, ViewProps } from "react-native"
import { type Switch } from "react-native-gesture-handler"

import { useTheme } from "@/components/contexts/theme-context"
import {
  type SwitchVariantsProps,
  switchVariants,
} from "@/components/ui/switch/variants"
import type { Text, TextProps } from "@/components/ui/text"

type SwitchProps = ComponentPropsWithoutRef<typeof Switch>

export type UseSwitchProps = {
  ref?: Ref<Switch>
  leftTextProps?: ComponentPropsWithoutRef<typeof Text>
  rightTextProps?: ComponentPropsWithoutRef<typeof Text>
  wrapperProps?: ComponentPropsWithoutRef<typeof View>
  leftText?: string
  rightText?: string
} & SwitchProps &
  SwitchVariantsProps

const useSwitch = ({
  color,
  leftTextProps,
  rightTextProps,
  leftText,
  rightText,
  wrapperProps: { style: wrapperStyle, ...wrapperProps } = {},
  ...props
}: UseSwitchProps) => {
  const { tw } = useTheme()
  const slots = useMemo(() => switchVariants({ color }), [color])

  const getWrapperProps = useCallback<() => ViewProps>(
    () => ({
      style: [tw.style(slots.wrapper()), wrapperStyle],
      ...wrapperProps,
    }),
    [slots, tw, wrapperProps, wrapperStyle],
  )

  const getLeftTextProps = useCallback<() => TextProps>(
    () => ({
      children: leftText,
      ...leftTextProps,
    }),
    [leftText, leftTextProps],
  )

  const getRightTextProps = useCallback<() => TextProps>(
    () => ({
      children: rightText,
      ...rightTextProps,
    }),
    [rightText, rightTextProps],
  )

  const getSwitchProps = useCallback<() => SwitchProps>(
    () => ({
      trackColor: {
        false: tw.color("card"),
        true: tw.color(slots.trackColor()),
      },
      thumbColor: tw.color(slots.thumbColor()),
      // eslint-disable-next-line camelcase
      ios_backgroundColor: tw.color("card"),
      ...props,
    }),
    [props, slots, tw],
  )

  return {
    getLeftTextProps,
    getRightTextProps,
    getWrapperProps,
    getSwitchProps,
  }
}

export default useSwitch

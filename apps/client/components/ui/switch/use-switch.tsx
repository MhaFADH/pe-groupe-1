import { useColorScheme } from "nativewind"
import {
  type ComponentPropsWithoutRef,
  type Ref,
  useCallback,
  useMemo,
} from "react"
import type { Switch, View, ViewProps } from "react-native"

import {
  type SwitchVariantsProps,
  switchVariants,
} from "@/components/ui/switch/variants"
import type { Text, TextProps } from "@/components/ui/text"
import cn from "@/utils/cn"
import { COLORS } from "@/utils/colors"

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
  color = "primary",
  leftTextProps,
  rightTextProps,
  leftText,
  rightText,
  wrapperProps: { className: wrapperClassname, ...wrapperProps } = {},
  ...props
}: UseSwitchProps) => {
  const slots = useMemo(() => switchVariants({ color }), [color])
  const { colorScheme = "light" } = useColorScheme()

  const getWrapperProps = useCallback<() => ViewProps>(
    () => ({
      className: cn(slots.wrapper(), wrapperClassname),
      ...wrapperProps,
    }),
    [slots, wrapperProps, wrapperClassname],
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
        false: COLORS[colorScheme].card.DEFAULT,
        true: COLORS[colorScheme].danger.DEFAULT,
      },
      thumbColor: COLORS[colorScheme][color].DEFAULT,
      // eslint-disable-next-line camelcase
      ios_backgroundColor: COLORS[colorScheme].card.DEFAULT,
      ...props,
    }),
    [color, colorScheme, props],
  )

  return {
    getLeftTextProps,
    getRightTextProps,
    getWrapperProps,
    getSwitchProps,
  }
}

export default useSwitch

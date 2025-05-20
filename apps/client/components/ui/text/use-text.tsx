import { type ComponentPropsWithoutRef, type Ref, useCallback } from "react"
import type { Text as RNText } from "react-native"

import { useTheme } from "@/components/contexts/theme-context"
import {
  type TextVariantsProps,
  textVariants,
} from "@/components/ui/text/variants"

export type UseTextProps = {
  ref?: Ref<RNText>
} & ComponentPropsWithoutRef<typeof RNText> &
  TextVariantsProps

const useText = ({ style, color, ...props }: UseTextProps) => {
  const { tw } = useTheme()

  const getProps = useCallback(
    () => ({
      style: [tw.style(textVariants({ color })), style],
      ...props,
    }),
    [color, props, style, tw],
  )

  return { getProps }
}

export default useText

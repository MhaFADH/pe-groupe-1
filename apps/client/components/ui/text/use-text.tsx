import { type ComponentPropsWithoutRef, type Ref, useCallback } from "react"
import type { Text as RNText, TextProps } from "react-native"

import {
  type TextVariantsProps,
  textVariants,
} from "@/components/ui/text/variants"
import cn from "@/utils/cn"

export type UseTextProps = {
  ref?: Ref<RNText>
} & ComponentPropsWithoutRef<typeof RNText> &
  TextVariantsProps

const useText = ({ color, className, ...props }: UseTextProps) => {
  const getProps = useCallback<() => TextProps>(
    () => ({
      className: cn(textVariants({ color }), className),
      ...props,
    }),
    [color, className, props],
  )

  return { getProps }
}

export default useText

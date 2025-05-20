import {
  Controller,
  type ControllerProps,
  type FieldValues,
} from "react-hook-form"

import { Input, type InputProps } from "@/components/ui/input"

type Props<TFieldValues extends FieldValues> = Omit<
  ControllerProps<TFieldValues>,
  "render"
> &
  Omit<InputProps, "onBlur" | "onChangeText" | "value">

const FormField = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...props
}: Props<TFieldValues>) => (
  <Controller
    defaultValue={defaultValue}
    control={control}
    disabled={disabled}
    rules={rules}
    shouldUnregister={shouldUnregister}
    render={({ field: { onChange, onBlur, value } }) => (
      <Input onBlur={onBlur} onChangeText={onChange} value={value} {...props} />
    )}
    name={name}
  />
)

export default FormField

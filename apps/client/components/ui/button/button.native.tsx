import React from "react"
import { Pressable, Text } from "react-native"

import { type ButtonProps } from "./button.web"

export const ButtonNative: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  className = "",
  textClassName = "",
}) => {
  const getButtonClasses = () => {
    const baseClasses = "rounded-xl items-center justify-center"

    const variantClasses = {
      primary: "bg-primary shadow-lg shadow-primary/25",
      secondary: "bg-secondary shadow-lg shadow-secondary/25",
      outline:
        "bg-transparent border-2 border-primary shadow-lg shadow-primary/10",
    }

    const sizeClasses = {
      sm: "px-4 py-2 min-h-9",
      md: "px-6 py-3 min-h-11",
      lg: "px-8 py-4 min-h-13",
    }

    const disabledClasses = disabled ? "opacity-50" : ""
    const widthClasses = fullWidth ? "w-full" : ""

    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClasses} ${className}`.trim()
  }

  const getTextClasses = () => {
    const baseTextClasses = "font-semibold text-center"

    const variantTextClasses = {
      primary: "text-white",
      secondary: "text-white",
      outline: "text-primary",
    }

    const sizeTextClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    }

    return `${baseTextClasses} ${variantTextClasses[variant]} ${sizeTextClasses[size]} ${textClassName}`.trim()
  }

  return (
    <Pressable
      onPress={disabled ? null : onPress}
      className={`${getButtonClasses()} ${disabled ? "" : "active:opacity-80"}`}
    >
      <Text className={`${getTextClasses()}`}>{title}</Text>
    </Pressable>
  )
}

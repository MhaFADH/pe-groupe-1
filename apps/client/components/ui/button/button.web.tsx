import { motion } from "framer-motion"
import React from "react"
import { Pressable, Text } from "react-native"

export type ButtonProps = {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  fullWidth?: boolean
  className?: string
  textClassName?: string
}

export const ButtonWeb: React.FC<ButtonProps> = ({
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
    <motion.div
      style={{
        display: fullWidth ? "block" : "inline-block",
        width: fullWidth ? "100%" : "auto",
      }}
      whileHover={
        disabled
          ? {}
          : {
              scale: 1.05,
              y: -2,
            }
      }
      whileTap={
        disabled
          ? {}
          : {
              scale: 0.98,
              y: 0,
            }
      }
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
        mass: 0.8,
      }}
      initial={{ scale: 1, y: 0 }}
    >
      <Pressable
        onPress={disabled ? null : onPress}
        className={`${getButtonClasses()}`}
      >
        <Text className={`${getTextClasses()}`}>{title}</Text>
      </Pressable>
    </motion.div>
  )
}

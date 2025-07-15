import React from "react"
import { View } from "react-native"

type CardProps = {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <View
    className={`
      bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700
      ${className}
    `}
  >
    {children}
  </View>
)

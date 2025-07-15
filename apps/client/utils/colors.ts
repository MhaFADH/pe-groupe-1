import { useTheme } from "@/components/contexts"

export const getColor = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    primary: "#8B5CF6",
    "primary-50": "#F3F0FF",
    "primary-100": "#E9E2FF",
    "primary-200": "#D4C9FF",
    "primary-300": "#BFA8FF",
    "primary-400": "#A78BFA",
    "primary-500": "#8B5CF6",
    "primary-600": "#7C3AED",
    "primary-700": "#6D28D9",
    "primary-800": "#5B21B6",
    "primary-900": "#4C1D95",

    secondary: "#F59E0B",
    "secondary-50": "#FFFBEB",
    "secondary-100": "#FEF3C7",
    "secondary-200": "#FDE68A",
    "secondary-300": "#FCD34D",
    "secondary-400": "#FBBF24",
    "secondary-500": "#F59E0B",
    "secondary-600": "#D97706",
    "secondary-700": "#B45309",
    "secondary-800": "#92400E",
    "secondary-900": "#78350F",

    "gray-50": "#F9FAFB",
    "gray-100": "#F3F4F6",
    "gray-200": "#E5E7EB",
    "gray-300": "#D1D5DB",
    "gray-400": "#9CA3AF",
    "gray-500": "#6B7280",
    "gray-600": "#4B5563",
    "gray-700": "#374151",
    "gray-800": "#1F2937",
    "gray-900": "#111827",

    accent: "#10B981",
    "accent-50": "#ECFDF5",
    "accent-100": "#D1FAE5",
    "accent-200": "#A7F3D0",
    "accent-300": "#6EE7B7",
    "accent-400": "#34D399",
    "accent-500": "#10B981",
    "accent-600": "#059669",
    "accent-700": "#047857",
    "accent-800": "#065F46",
    "accent-900": "#064E3B",

    "red-50": "#FEF2F2",
    "red-100": "#FEE2E2",
    "red-200": "#FECACA",
    "red-300": "#FCA5A5",
    "red-400": "#F87171",
    "red-500": "#EF4444",
    "red-600": "#DC2626",
    "red-700": "#B91C1C",
    "red-800": "#991B1B",
    "red-900": "#7F1D1D",

    "blue-50": "#EFF6FF",
    "blue-100": "#DBEAFE",
    "blue-200": "#BFDBFE",
    "blue-300": "#93C5FD",
    "blue-400": "#60A5FA",
    "blue-500": "#3B82F6",
    "blue-600": "#2563EB",
    "blue-700": "#1D4ED8",
    "blue-800": "#1E40AF",
    "blue-900": "#1E3A8A",

    "green-50": "#F0FDF4",
    "green-100": "#DCFCE7",
    "green-200": "#BBF7D0",
    "green-300": "#86EFAC",
    "green-400": "#4ADE80",
    "green-500": "#22C55E",
    "green-600": "#16A34A",
    "green-700": "#15803D",
    "green-800": "#166534",
    "green-900": "#14532D",

    "purple-50": "#FAF5FF",
    "purple-100": "#F3E8FF",
    "purple-200": "#E9D5FF",
    "purple-300": "#D8B4FE",
    "purple-400": "#C084FC",
    "purple-500": "#A855F7",
    "purple-600": "#9333EA",
    "purple-700": "#7C2D12",
    "purple-800": "#6B21A8",
    "purple-900": "#581C87",

    "orange-50": "#FFF7ED",
    "orange-100": "#FFEDD5",
    "orange-200": "#FED7AA",
    "orange-300": "#FDBA74",
    "orange-400": "#FB923C",
    "orange-500": "#F97316",
    "orange-600": "#EA580C",
    "orange-700": "#C2410C",
    "orange-800": "#9A3412",
    "orange-900": "#7C2D12",

    "indigo-50": "#EEF2FF",
    "indigo-100": "#E0E7FF",
    "indigo-200": "#C7D2FE",
    "indigo-300": "#A5B4FC",
    "indigo-400": "#818CF8",
    "indigo-500": "#6366F1",
    "indigo-600": "#4F46E5",
    "indigo-700": "#4338CA",
    "indigo-800": "#3730A3",
    "indigo-900": "#312E81",

    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent",
  }

  return colorMap[colorName] ?? colorName
}

export const useThemeColor = () => {
  const { colorScheme } = useTheme()

  const getThemeColor = (lightColor: string, darkColor: string): string =>
    colorScheme === "dark" ? getColor(darkColor) : getColor(lightColor)

  return { getThemeColor, colorScheme }
}

export const useConditionalColor = (colorName: string): string => {
  const { colorScheme } = useTheme()

  if (colorName.includes("dark:") && colorName.includes(" ")) {
    const parts = colorName.split(" ")
    const darkColor = parts
      .find((part) => part.startsWith("dark:"))
      ?.replace("dark:", "")
    const lightColor = parts.find((part) => !part.startsWith("dark:"))

    if (colorScheme === "dark") {
      return getColor(darkColor ?? "gray-400")
    }

    return getColor(lightColor ?? "gray-600")
  }

  return getColor(colorName)
}

import { type VariantProps, tv } from "tailwind-variants"

export const textVariants = tv({
  variants: {
    color: {
      primary: "text-primary",
      success: "text-success",
      danger: "text-danger",
      foreground: "text-foreground",
      warning: "text-warning",
      "primary-foreground": "text-primary-foreground",
      "success-foreground": "text-success-foreground",
      "danger-foreground": "text-danger-foreground",
      "warning-foreground": "text-warning-foreground",
      card: "text-card",
      "card-foreground": "text-card-foreground",
    },
  },
  defaultVariants: {
    color: "foreground",
  },
})

export type TextVariantsProps = VariantProps<typeof textVariants>

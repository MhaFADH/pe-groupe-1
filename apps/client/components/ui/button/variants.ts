import { type VariantProps, tv } from "tailwind-variants"

export const buttonVariants = tv({
  base: "flex flex-row items-center justify-center p-3",
  variants: {
    radius: {
      small: "rounded-sm",
      medium: "rounded-md",
      large: "rounded-lg",
      full: "rounded-full",
    },
    color: {
      primary: "bg-primary",
      success: "bg-success",
      danger: "bg-danger",
      warning: "bg-warning",
      card: "bg-card",
    },
    isFullWidth: {
      true: "w-full",
    },
    isIconOnly: {
      true: "p-2",
    },
  },
  defaultVariants: {
    radius: "medium",
    color: "primary",
  },
})

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>

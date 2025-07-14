import { type VariantProps, tv } from "tailwind-variants"

export const inputVariants = tv({
  slots: {
    base: "flex-1",
    color: "",
    focused: "",
    placeholder: "",
    wrapper:
      "shadow-sm px-3 py-2 min-h-10 rounded-md flex-row justify-between items-center",
  },
  variants: {
    color: {
      primary: {
        color: "text-primary",
        focused: "text-primary/80",
        placeholder: "text-primary-foreground/70",
        base: "text-primary-foreground",
      },
      secondary: {
        color: "text-secondary",
        focused: "text-secondary/80",
        placeholder: "text-secondary-foreground/70",
        base: "text-secondary-foreground",
      },
      danger: {
        color: "text-danger",
        focused: "text-danger/80",
        placeholder: "text-danger-foreground/70",
        base: "text-danger-foreground",
      },
      success: {
        color: "text-success",
        focused: "text-success/80",
        placeholder: "text-success-foreground/70",
        base: "text-success-foreground",
      },
      warning: {
        color: "text-warning",
        focused: "text-warning/80",
        placeholder: "text-warning-foreground/70",
        base: "text-warning-foreground",
      },
      content: {
        color: "text-content",
        focused: "text-content/80",
        placeholder: "text-content-foreground/70",
        base: "text-content-foreground",
      },
      card: {
        color: "text-card",
        focused: "text-card/80",
        placeholder: "text-card-foreground/70",
        base: "text-card-foreground",
      },
    },
  },
  defaultVariants: {
    color: "card",
  },
})

export type InputVariantsProps = VariantProps<typeof inputVariants>

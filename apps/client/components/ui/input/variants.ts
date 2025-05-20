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
        color: "primary",
        focused: "primary/80",
        placeholder: "primary-foreground/70",
        base: "text-primary-foreground",
      },
      secondary: {
        color: "secondary",
        focused: "secondary/80",
        placeholder: "secondary-foreground/70",
        base: "text-secondary-foreground",
      },
      danger: {
        color: "danger",
        focused: "danger/80",
        placeholder: "danger-foreground/70",
        base: "text-danger-foreground",
      },
      success: {
        color: "success",
        focused: "success/80",
        placeholder: "success-foreground/70",
        base: "text-success-foreground",
      },
      warning: {
        color: "warning",
        focused: "warning/80",
        placeholder: "warning-foreground/70",
        base: "text-warning-foreground",
      },
      content: {
        color: "content",
        focused: "content/80",
        placeholder: "content-foreground/70",
        base: "text-content-foreground",
      },
      card: {
        color: "card",
        focused: "card/80",
        placeholder: "card-foreground/70",
        base: "text-card-foreground",
      },
    },
  },
  defaultVariants: {
    color: "card",
  },
})

export type InputVariantsProps = VariantProps<typeof inputVariants>

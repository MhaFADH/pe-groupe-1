import { type VariantProps, tv } from "tailwind-variants"

export const switchVariants = tv({
  slots: {
    trackColor: "",
    thumbColor: "",
    wrapper: "flex-row items-center gap-2",
  },
  variants: {
    color: {
      primary: {
        thumbColor: "primary",
        trackColor: "primary/50",
      },
      secondary: {
        thumbColor: "secondary",
        trackColor: "secondary/50",
      },
      danger: {
        thumbColor: "danger",
        trackColor: "danger/50",
      },
      success: {
        thumbColor: "success",
        trackColor: "success/50",
      },
      warning: {
        thumbColor: "warning",
        trackColor: "warning/50",
      },
      content: {
        thumbColor: "content",
        trackColor: "content/50",
      },
      card: {
        thumbColor: "card",
        trackColor: "card/50",
      },
    },
  },
  defaultVariants: {
    color: "primary",
  },
})

export type SwitchVariantsProps = VariantProps<typeof switchVariants>

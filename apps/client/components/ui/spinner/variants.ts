import { type VariantProps, tv } from "tailwind-variants"

export const spinnerVariants = tv({
  slots: {
    base: "absolute h-full w-full rounded-full border-solid border-l-transparent border-r-transparent border-t-transparent",
    wrapper: "",
  },
  variants: {
    color: {
      primary: { base: "border-b-primary" },
      success: { base: "border-b-success" },
      danger: { base: "border-b-danger" },
      card: { base: "border-b-card" },
      warning: { base: "border-b-warning" },
      "primary-foreground": { base: "border-b-primary-foreground" },
      "success-foreground": { base: "border-b-success-foreground" },
      "danger-foreground": { base: "border-b-danger-foreground" },
      "card-foreground": { base: "border-b-card-foreground" },
      "warning-foreground": { base: "border-b-warning-foreground" },
    },
    size: {
      sm: { base: "border-2", wrapper: "h-4 w-4" },
      md: {
        base: "border-2",
        wrapper: "ios:w-6 ios:h-6 android:w-8 android:h-8",
      },
      lg: {
        base: "border-[2.5px]",
        wrapper: "ios:w-10 ios:h-10 android:w-12 android:h-12",
      },
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
})

export type SpinnerVariantsProps = VariantProps<typeof spinnerVariants>

export const activitySize = {
  sm: 16,
  md: 32,
  lg: 48,
}

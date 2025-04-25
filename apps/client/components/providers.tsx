import type { ComponentProps, ReactNode } from "react"

import { ThemeProvider } from "@/components/contexts/theme-context"

type Props = {
  children: ReactNode
} & ComponentProps<typeof ThemeProvider>

const Providers = (props: Props) => <ThemeProvider {...props} />

export default Providers

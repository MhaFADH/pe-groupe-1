import type { Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
      },
      opacity: {
        disabled: "0.5",
      },
      maxWidth: {
        "2xs": "16rem",
      },
      colors: {
        primary: {
          DEFAULT: "#E94E4E",
          foreground: "#FFF",
        },
        secondary: {
          DEFAULT: "#F5C28B",
          foreground: "#FFF",
        },
        success: {
          DEFAULT: "#71C285",
          foreground: "#FFF",
        },
        danger: {
          DEFAULT: "#B22222",
          foreground: "#FFF",
        },
        warning: {
          DEFAULT: "#F9A825",
          foreground: "#FFF",
        },
        foreground: "#000000",
        background: "#FFF",
        card: { DEFAULT: "#3F3F46", foreground: "#000000" },
        content: { DEFAULT: "#d4d4d8", foreground: "#000000" },
      },
    },
  },
} satisfies Config

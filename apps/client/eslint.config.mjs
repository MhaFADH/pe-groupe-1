import baseConfig from "@pe/eslint/base"
import reactConfig from "@pe/eslint/react"

/** @type {import('@pe/eslint').Config} */
export default [
  {
    ignores: [".expo"],
  },
  ...baseConfig,
  ...reactConfig,
  {
    rules: {
      "new-cap": "off",
    },
  },
]

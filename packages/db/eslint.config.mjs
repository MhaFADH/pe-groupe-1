import baseConfig from "@pe/eslint/base"

/** @type {import('@pe/eslint').Config} */
export default [
  ...baseConfig,
  {
    ignores: ["src/drizzle/**"],
  },
]

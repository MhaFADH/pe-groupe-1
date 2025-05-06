import pluginJest from "eslint-plugin-jest"

import baseConfig from "@pe/eslint/base"
import reactConfig from "@pe/eslint/react"

/** @type {import('@pe/eslint').Config} */
export default [
  {
    ignores: [".expo/**", "dist/**", "node_modules/**"],
  },

  {
    files: ["**/*.spec.ts", "**/*.test.ts"],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: { ...pluginJest.environments.globals.globals },
    },
  },

  ...baseConfig,
  ...reactConfig,
  {
    rules: {
      "new-cap": "off",
    },
  },
  {
    files: [
      "**/*.spec.js",
      "**/*.test.js",
      "**/*.spec.ts",
      "**/*.test.ts",
      "**/*.spec.tsx",
      "**/*.test.tsx",
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-empty-function": "off",
      "no-empty-function": "off",
      "require-await": "off",
      "no-undefined": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },
]

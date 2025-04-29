import type { KnipConfig } from "knip"

const config: KnipConfig = {
  // Use workspaces as an object, not array
  workspaces: {
    "apps/api": {
      entry: ["src/index.ts", "eslint.config.js"],
      project: ["src/**/*.ts"],
    },
    "apps/client": {
      entry: [
        "app/index.tsx",
        "app/(mobile)/**/*.tsx",
        "app/(web)/**/*.tsx",
        "eslint.config.mjs",
        "app.config.ts",
        "tailwind.config.ts",
      ],
      project: [
        "app/**/*.{ts,tsx}",
        "components/**/*.{ts,tsx}",
        "constants/**/*.ts",
        "hooks/**/*.ts",
        "utils/**/*.ts",
      ],
      expo: {
        config: ["app.json", "app.config.{ts,js}"],
        entry: ["app/**/*.{js,jsx,ts,tsx}", "src/app/**/*.{js,jsx,ts,tsx}"],
      },
    },
    "tooling/eslint": {
      entry: ["index.ts", "base.js", "react.js"],
      project: ["**/*.{js,ts}"],
    },
    "tooling/typescript": {
      entry: ["base.json"],
      project: ["**/*.json"],
    },
  },

  // File extensions to consider
  // Directories and files to ignore
  ignore: [
    "**/node_modules",
    "**/dist",
    "**/build",
    "**/.turbo",
    "**/.expo",
    "**/.next",
    "**/coverage",
    "apps/client/ios/Pods/**",
    "apps/client/ios/build/**",
    "apps/client/android/build/**",
    "apps/client/expo-env.d.ts",
    "apps/client/tsconfig.tsbuildinfo",
  ],

  // Dependencies that are used by the tooling but not imported directly

  ignoreBinaries: ["jest", "web", "ios", "android", "dev"],

  ignoreDependencies: ["@babel/runtime"],

  prettier: {
    config: [
      ".prettierrc",
      ".prettierrc.{json,js,cjs,mjs,yml,yaml,toml,json5}",
      "prettier.config.{js,cjs,mjs}",
      "package.{json,yaml}",
    ],
  },
  eslint: {
    config: [
      ".eslintrc",
      ".eslintrc.{js,json,cjs}",
      ".eslintrc.{yml,yaml}",
      "package.json",
    ],
    entry: ["eslint.config.{js,cjs,mjs,ts,cts,mts}"],
  },

  node: {
    config: ["package.json"],
  },
  jest: {
    config: ["jest.config.{js,ts,mjs,cjs,json}", "package.json"],
    entry: [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[jt]s?(x)",
      "**/__mocks__/**/*.[jt]s",
    ],
  },

  babel: {
    config: [
      "babel.config.{json,js,cjs,mjs,cts}",
      ".babelrc.{json,js,cjs,mjs,cts}",
      ".babelrc",
      "package.json",
    ],
  },
}

export default config

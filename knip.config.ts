import type { KnipConfig } from "knip"

const config: KnipConfig = {
  workspaces: {
    "apps/api": {
      entry: ["src/index.ts", "eslint.config.js"],
      project: ["src/**/*.ts"],
    },
    "apps/client": {
      entry: ["**/*.{ts,tsx}", "eslint.config.mjs"],
      project: [
        "app/**/*.{ts,tsx}",
        "components/**/*.{ts,tsx}",
        "constants/**/*.ts",
        "hooks/**/*.ts",
        "utils/**/*.ts",
        "services/**/*.ts",
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

  ignoreBinaries: ["web", "ios", "android", "dev", "build:web"],

  ignoreDependencies: ["@babel/runtime", "@testing-library/*"],

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

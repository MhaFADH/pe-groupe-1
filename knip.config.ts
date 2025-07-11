import type { KnipConfig } from "knip"

const config: KnipConfig = {
  workspaces: {
    "apps/client": {
      entry: ["app/**/*.tsx", "components/ui/**/index.tsx"],
    },
  },
  ignore: ["packages/db/src/drizzle/**", "tailwind.config.js"],
  ignoreDependencies: ["@babel/runtime", "@testing-library/*"],
  ignoreBinaries: ["web", "ios", "android", "dev"],
}

export default config

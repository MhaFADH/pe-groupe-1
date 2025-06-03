import type { KnipConfig } from "knip"

const config: KnipConfig = {
  workspaces: {
    "apps/client": {
      entry: ["app/**/*.tsx", "components/ui/**/index.tsx"],
    },
  },
  ignoreBinaries: ["web", "ios", "android", "dev"],
  ignoreDependencies: ["@babel/runtime", "@testing-library/*"],
}

export default config

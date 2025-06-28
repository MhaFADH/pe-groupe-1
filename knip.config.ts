import type { KnipConfig } from "knip"

const config: KnipConfig = {
  workspaces: {
    "apps/client": {
      entry: ["app/**/*.tsx", "components/ui/**/index.tsx"],
    },
  },
  ignore: ["packages/db/src/drizzle/**"],
  ignoreDependencies: ["@babel/runtime", "@testing-library/*", "expo-asset"],
}

export default config

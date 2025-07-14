import type { KnipConfig } from "knip"

const config: KnipConfig = {
  workspaces: {
    "apps/client": {
      entry: [
        "app/**/*.tsx",
        "components/ui/**/index.tsx",
        "components/ar/**/*.tsx",
      ],
    },
  },
  ignore: ["packages/db/src/drizzle/**", "tailwind.config.js"],
  ignoreDependencies: ["@babel/runtime", "@testing-library/*"],
}

export default config

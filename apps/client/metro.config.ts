const { getDefaultConfig } = require("expo/metro-config")
const path = require("path")

// Monorepo root
const projectRoot = __dirname

// Point to node_modules at root and handle symlinks
const watchFolders = [
  path.resolve(__dirname, "../../node_modules"),
  path.resolve(__dirname, "../../"), // add monorepo root as a watchFolder
]

const config = getDefaultConfig(projectRoot)

// Add workaround for pnpm (symlinked deps)
config.watchFolders = watchFolders

module.exports = config

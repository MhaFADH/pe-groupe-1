const { getDefaultConfig } = require("expo/metro-config")
const { withNativeWind } = require("nativewind/metro")

const config = getDefaultConfig(__dirname)

config.resolver.assetExts.push(
  "obj",
  "mtl",
  "mp3",
  "JPG",
  "vrx",
  "hdr",
  "gltf",
  "glb",
  "bin",
  "arobject",
  "gif",
)

module.exports = withNativeWind(config, { input: "./global.css" })

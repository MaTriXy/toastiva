const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);
const toastivaSourceEntry = path.resolve(
  __dirname,
  "../packages/toastiva/src/index.ts",
);
const toastivaPackageRoot = path.resolve(__dirname, "../packages/toastiva");

config.resolver.assetExts.push("glb", "gltf", "bin");
config.watchFolders = Array.from(
  new Set([...(config.watchFolders ?? []), toastivaPackageRoot]),
);
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "toastiva") {
    return {
      type: "sourceFile",
      filePath: toastivaSourceEntry,
    };
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;

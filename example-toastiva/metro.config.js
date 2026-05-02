const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const toastivaRoot = path.resolve(projectRoot, "../packages/toastiva");
const toastivaSource = path.resolve(toastivaRoot, "src/index.ts");

const config = getDefaultConfig(projectRoot);
config.watchFolders = [...(config.watchFolders ?? []), toastivaRoot];
config.resolver.assetExts.push("glb", "gltf", "bin");
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(toastivaRoot, "node_modules"),
];
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "toastiva") {
    return {
      filePath: toastivaSource,
      type: "sourceFile",
    };
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;

import createMDX from "@next/mdx";
import path from "node:path";

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

const docsRoot =
  path.basename(process.cwd()) === "docs" ?
    process.cwd()
  : path.resolve(process.cwd(), "apps/docs");
const expoBlurShim = path.resolve(docsRoot, "src/lib/expo-blur.tsx");
const reactNativeWeb = path.resolve(
  docsRoot,
  "node_modules/react-native-web",
);
const reactNativeGestureHandler = path.resolve(
  docsRoot,
  "node_modules/react-native-gesture-handler",
);
const reactNativeReanimated = path.resolve(
  docsRoot,
  "node_modules/react-native-reanimated",
);
const reactNativeSafeAreaContext = path.resolve(
  docsRoot,
  "node_modules/react-native-safe-area-context",
);
const reactNativeSvg = path.resolve(docsRoot, "node_modules/react-native-svg");
const reactNativeWorklets = path.resolve(
  docsRoot,
  "node_modules/react-native-worklets",
);
const tailwindMerge = path.resolve(docsRoot, "node_modules/tailwind-merge");

const resolveAlias = {
  "expo-blur": expoBlurShim,
  "react-native": reactNativeWeb,
  "react-native$": reactNativeWeb,
  "react-native-gesture-handler": reactNativeGestureHandler,
  "react-native-reanimated": reactNativeReanimated,
  "react-native-safe-area-context": reactNativeSafeAreaContext,
  "react-native-svg": reactNativeSvg,
  "react-native-worklets": reactNativeWorklets,
  "tailwind-merge": tailwindMerge,
};

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  transpilePackages: [
    "react-native",
    "react-native-web",
    "react-native-svg",
    "react-native-reanimated",
    "react-native-gesture-handler",
    "react-native-worklets",
  ],
  turbopack: {
    resolveAlias,
    resolveExtensions: [
      ".web.tsx",
      ".web.ts",
      ".web.jsx",
      ".web.js",
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".mjs",
      ".json",
    ],
  },
  webpack: (config, { webpack, isServer }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ...resolveAlias,
    };
    config.resolve.extensions = [
      ".web.tsx",
      ".web.ts",
      ".web.jsx",
      ".web.js",
      ...(config.resolve.extensions || []),
    ];
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
      }),
    );
    return config;
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
initOpenNextCloudflareForDev();

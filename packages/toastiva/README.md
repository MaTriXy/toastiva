<p align="center">
  <img src="https://i.ibb.co/1tvtSW0Z/toastiva-cover-1x.png" alt="Toastiva" width="100%" />
</p>

<h1 align="center">toastiva</h1>

<p align="center">
  Morphing toast notifications for React Native &mdash; iOS &amp; Android.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/toastiva"><img src="https://img.shields.io/npm/v/toastiva?style=flat-square&color=000" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/toastiva"><img src="https://img.shields.io/npm/dm/toastiva?style=flat-square&color=000" alt="npm downloads"></a>
  <img src="https://img.shields.io/badge/platforms-iOS%20%7C%20Android-000?style=flat-square" alt="platforms">
  <img src="https://img.shields.io/npm/l/toastiva?style=flat-square&color=000" alt="license">
</p>

---

> [!IMPORTANT]
> iOS and Android only &mdash; not built for React Native Web.
> Android blur (`filter: [{ blur }]`) requires **RN 0.76+** with the **New Architecture (Fabric)**.

## Install

```bash
npx expo install react-native-gesture-handler react-native-reanimated react-native-worklets react-native-safe-area-context react-native-svg expo-blur
npm install toastiva
```

## Quick start

```tsx
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastivaProvider, toastiva } from "toastiva";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ToastivaProvider position="top-center">
          <RootNavigator />
        </ToastivaProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

toastiva.success("Saved", { description: "Your changes are ready." });
```

## Docs &amp; preview

Full guides, video previews, and the API reference live in the GitHub repo:

<p>
  <a href="https://github.com/rit3zh/expo-gooey-toast#readme">→ Preview videos (iOS &amp; Android)</a><br/>
  <a href="https://github.com/rit3zh/expo-gooey-toast/tree/main/docs">→ Documentation</a>
</p>

## License

MIT &copy; [Ritesh](https://github.com/rit3zh)

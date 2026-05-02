# toastiva

> [!CAUTION]
> THIS PACKAGE IS STILL IN A TESTING PHASE. DO NOT CLONE OR SUBMIT PULL REQUEST. AS IT IS STILL A WIP.

Morphing toast notifications for React Native and React Native Web.

## Install

For Expo apps, install the native peer dependencies with Expo so Reanimated and
Worklets stay on the versions supported by your SDK:

```bash
npx expo install react-native-gesture-handler react-native-reanimated react-native-worklets react-native-safe-area-context react-native-svg expo-blur
npm install toastiva
```

For bare React Native apps, install `toastiva` with the native peers required by
your React Native version:

```bash
npm install toastiva react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-svg expo-blur
```

If you use Reanimated 4, install the `react-native-worklets` version required
by your Reanimated version. For example, Reanimated `4.2.1` supports
`react-native-worklets@0.7.x`, while Reanimated `4.3.0` requires
`react-native-worklets@0.8.x`.

## Usage

Wrap your app root with `GestureHandlerRootView`, then render `ToastivaProvider`
inside your safe area provider. Toastive does not add the gesture root for you.

```tsx
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastivaProvider, toastiva } from "toastiva";

export function App() {
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

toastiva.success("Saved", {
  description: "Your changes are ready.",
});
```

## Styling

Use `fill`, `stroke`, and `styles` globally on `ToastivaProvider`, or per toast
from `toastiva.success`, `toastiva.error`, `toastiva.info`, `toastiva.warning`,
and `toastiva.custom`.

On iOS, the header morph blur can be tinted with `iosBlurTint` or removed with
`disableIOSBlur`. Both options work globally on `ToastivaProvider` or per toast.

```tsx
<ToastivaProvider
  fill="#171717"
  iosBlurTint="dark"
  stroke="rgba(255,255,255,0.12)"
  styles={{
    title: { color: "#fff" },
    description: { color: "rgba(255,255,255,0.72)" },
    badge: { backgroundColor: "rgba(255,255,255,0.10)" },
    action: { backgroundColor: "rgba(255,255,255,0.10)" },
    actionText: { color: "#fff" },
  }}
>
  <RootNavigator />
</ToastivaProvider>

toastiva.success("Saved", {
  fill: "#0f172a",
  bodyRadius: 24,
  animationPreset: "snappy",
  disableIOSBlur: true,
  expandedHeight: 128,
  styles: {
    title: { color: "#f8fafc", fontWeight: "800" },
    description: { color: "rgba(248,250,252,0.72)" },
  },
});
```

Animation can also be customized globally or per toast:

```tsx
<ToastivaProvider
  animation={{
    preset: "snappy",
    mount: { axis: "x", offset: 24, duration: 260 },
    morph: { collapseDuration: 190, squishDuration: 44 },
    springs: {
      morph: { damping: 20, stiffness: 360, mass: 0.8 },
    },
  }}
>
  <RootNavigator />
</ToastivaProvider>
```

## Build

```bash
pnpm --filter toastiva build
pnpm --filter toastiva typecheck
pnpm --filter toastiva pack:dry-run
```

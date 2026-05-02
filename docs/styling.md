# Styling

<sub><a href="./README.md">← Docs</a></sub>

---

Use `fill`, `stroke`, and `styles` globally on `ToastivaProvider`, or per toast on any `toastiva.*` call.

## Global theme

```tsx
<ToastivaProvider
  fill="#171717"
  stroke="rgba(255,255,255,0.12)"
  iosBlurTint="dark"
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
```

## Per toast

```tsx
toastiva.success("Saved", {
  fill: "#0f172a",
  bodyRadius: 24,
  expandedHeight: 128,
  disableIOSBlur: true,
  styles: {
    title: { color: "#f8fafc", fontWeight: "800" },
    description: { color: "rgba(248,250,252,0.72)" },
  },
});
```

## Blur on iOS

<table>
  <tr>
    <td><code>iosBlurTint</code></td>
    <td>Tint the header morph blur &mdash; <code>"light"</code>, <code>"dark"</code>, <code>"default"</code>, etc.</td>
  </tr>
  <tr>
    <td><code>disableIOSBlur</code></td>
    <td>Render a solid surface instead of the blurred header.</td>
  </tr>
</table>

Both options work globally on `ToastivaProvider` or per toast. iOS uses `expo-blur` under the hood.

## Blur on Android

Android uses the React Native `filter: [{ blur }]` style prop for the morph header.

> [!WARNING]
> `filter: [{ blur }]` only renders on **React Native 0.76+** with the **New Architecture (Fabric)** enabled. On RN &lt; 0.76 (or legacy Paper renderer), the prop is a no-op on Android &mdash; the toast renders correctly, but the blurred header layer will be flat. There is no JS-side fallback for older versions; upgrade RN if the blur is required on Android.

## Style slots

<table>
  <tr><td><code>title</code></td><td>Toast title text.</td></tr>
  <tr><td><code>description</code></td><td>Secondary line beneath the title.</td></tr>
  <tr><td><code>badge</code></td><td>Leading icon badge.</td></tr>
  <tr><td><code>action</code></td><td>Action button container.</td></tr>
  <tr><td><code>actionText</code></td><td>Action button label.</td></tr>
</table>

---

<sub>Next: <a href="./animations.md">Animations →</a></sub>

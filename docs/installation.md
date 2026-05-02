# Installation

<sub><a href="./README.md">← Docs</a></sub>

---

## Supported platforms

<table>
  <tr>
    <th align="left">Platform</th>
    <th align="left">Status</th>
    <th align="left">Notes</th>
  </tr>
  <tr>
    <td>iOS</td>
    <td>Supported</td>
    <td>Uses <code>expo-blur</code> for the morph header.</td>
  </tr>
  <tr>
    <td>Android</td>
    <td>Supported</td>
    <td>Uses RN <code>filter: [{ blur }]</code> &mdash; see version note below.</td>
  </tr>
  <tr>
    <td>Web</td>
    <td>Not supported</td>
    <td>Toastiva is built for native iOS and Android only.</td>
  </tr>
</table>

> [!WARNING]
> **Android blur requires React Native 0.76+ with the New Architecture (Fabric).**
> The `filter: [{ blur: ... }]` style prop was added in RN 0.76 and only renders on Android when Fabric is enabled. On RN &lt; 0.76, or with the legacy renderer, `filter` is silently ignored on Android &mdash; the toast still works, but without the blurred morph header. iOS is unaffected (it uses `expo-blur`).

---

## Expo

Install the native peers with Expo so Reanimated and Worklets stay on versions supported by your SDK.

```bash
npx expo install \
  react-native-gesture-handler \
  react-native-reanimated \
  react-native-worklets \
  react-native-safe-area-context \
  react-native-svg \
  expo-blur

npm install toastiva
```

## Bare React Native

```bash
npm install toastiva \
  react-native-gesture-handler \
  react-native-reanimated \
  react-native-safe-area-context \
  react-native-svg \
  expo-blur
```

Follow each library's native install steps (pod install on iOS, Reanimated Babel plugin, etc).

## Reanimated &amp; Worklets

If you use Reanimated 4, install the `react-native-worklets` version required by your Reanimated version.

<table>
  <tr>
    <th>Reanimated</th>
    <th>Worklets</th>
  </tr>
  <tr>
    <td>4.2.x</td>
    <td>0.7.x</td>
  </tr>
  <tr>
    <td>4.3.x</td>
    <td>0.8.x</td>
  </tr>
</table>

## Peer dependencies

<table>
  <tr><td><code>react</code></td><td>&gt;= 18</td></tr>
  <tr><td><code>react-native</code></td><td>&gt;= 0.72</td></tr>
  <tr><td><code>react-native-gesture-handler</code></td><td>&gt;= 2</td></tr>
  <tr><td><code>react-native-reanimated</code></td><td>&gt;= 3 &lt; 5</td></tr>
  <tr><td><code>react-native-safe-area-context</code></td><td>&gt;= 4</td></tr>
  <tr><td><code>react-native-svg</code></td><td>&gt;= 13</td></tr>
  <tr><td><code>expo-blur</code></td><td>&gt;= 14</td></tr>
</table>

---

<sub>Next: <a href="./usage.md">Usage →</a></sub>

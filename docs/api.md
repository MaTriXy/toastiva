# API reference

<sub><a href="./README.md">← Docs</a></sub>

---

## `toastiva`

<table>
  <tr>
    <th align="left">Method</th>
    <th align="left">Signature</th>
  </tr>
  <tr>
    <td><code>success</code></td>
    <td><code>(title, options?) =&gt; id</code></td>
  </tr>
  <tr>
    <td><code>error</code></td>
    <td><code>(title, options?) =&gt; id</code></td>
  </tr>
  <tr>
    <td><code>info</code></td>
    <td><code>(title, options?) =&gt; id</code></td>
  </tr>
  <tr>
    <td><code>warning</code></td>
    <td><code>(title, options?) =&gt; id</code></td>
  </tr>
  <tr>
    <td><code>custom</code></td>
    <td><code>(render, options?) =&gt; id</code></td>
  </tr>
  <tr>
    <td><code>promise</code></td>
    <td><code>(promise, data) =&gt; id</code></td>
  </tr>
  <tr>
    <td><code>update</code></td>
    <td><code>(id, options) =&gt; void</code></td>
  </tr>
  <tr>
    <td><code>dismiss</code></td>
    <td><code>(id) =&gt; void</code></td>
  </tr>
  <tr>
    <td><code>dismissAll</code></td>
    <td><code>() =&gt; void</code></td>
  </tr>
</table>

## `<ToastivaProvider />`

Common props:

<table>
  <tr><td><code>position</code></td><td>e.g. <code>"top-center"</code>, <code>"bottom-right"</code>.</td></tr>
  <tr><td><code>fill</code></td><td>Surface fill color.</td></tr>
  <tr><td><code>stroke</code></td><td>Surface stroke color.</td></tr>
  <tr><td><code>iosBlurTint</code></td><td>iOS blur tint — <code>"light"</code>, <code>"dark"</code>, etc.</td></tr>
  <tr><td><code>disableIOSBlur</code></td><td>Disable the iOS blur layer.</td></tr>
  <tr><td><code>styles</code></td><td>Style overrides — see <a href="./styling.md">Styling</a>.</td></tr>
  <tr><td><code>animation</code></td><td>Animation config — see <a href="./animations.md">Animations</a>.</td></tr>
</table>

## Exported types

```ts
import type {
  IToastivaAction,
  IToastivaAnimationConfig,
  IToastivaConfig,
  IToastivaOptions,
  IToastivaPromiseData,
  IToastivaProviderProps,
  IToastivaStyleOverrides,
  IToastivaTheme,
  TToastivaAnimationPreset,
  TToastivaPosition,
  TToastivaType,
} from "toastiva";
```

## Exported enums

```ts
import {
  ToastivaAnimationPreset,
  ToastivaBodyLayout,
  ToastivaMode,
  ToastivaPosition,
  ToastivaType,
  ToastivaVerticalPosition,
} from "toastiva";
```

---

<sub><a href="./README.md">← Back to docs</a></sub>

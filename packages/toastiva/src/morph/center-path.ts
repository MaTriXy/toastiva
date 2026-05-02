import { PH } from "../constants";

function morphPathCenter(
  pw: number,
  bw: number,
  th: number,
  t: number,
  cw?: number,
  radius = 16,
  noHeader = false,
): string {
  "worklet";
  const pr = PH / 2;
  if (noHeader) {
    const h = Math.max(PH + (th - PH) * t, PH);
    const canvasW0 = cw ?? bw;
    const left = (canvasW0 - bw) / 2;
    const right = left + bw;
    const startR = PH / 2;
    const cr = startR + (Math.min(radius, bw / 2) - startR) * t;
    const safeR = Math.min(cr, bw / 2, h / 2);
    return [
      `M ${left + safeR},0`,
      `H ${right - safeR}`,
      `A ${safeR},${safeR} 0 0 1 ${right},${safeR}`,
      `L ${right},${h - safeR}`,
      `A ${safeR},${safeR} 0 0 1 ${right - safeR},${h}`,
      `H ${left + safeR}`,
      `A ${safeR},${safeR} 0 0 1 ${left},${h - safeR}`,
      `L ${left},${safeR}`,
      `A ${safeR},${safeR} 0 0 1 ${left + safeR},0`,
      "Z",
    ].join(" ");
  }
  // Use static canvas width (cw) for pill positioning so pillOffset stays
  // constant during expansion (bw springs from pillWidth → expandedWidth).
  // Do not clamp pillW — clipContainer clips visually; SVG uses overflow=visible.
  const canvasW = cw ?? bw;
  const pillW = pw;
  const pillOffset = (canvasW - pillW) / 2;
  const bodyH = PH + (th - PH) * t;

  if (t <= 0 || bodyH - PH < 8) {
    return [
      `M ${pillOffset},${pr}`,
      `A ${pr},${pr} 0 0 1 ${pillOffset + pr},0`,
      `H ${pillOffset + pillW - pr}`,
      `A ${pr},${pr} 0 0 1 ${pillOffset + pillW},${pr}`,
      `A ${pr},${pr} 0 0 1 ${pillOffset + pillW - pr},${PH}`,
      `H ${pillOffset + pr}`,
      `A ${pr},${pr} 0 0 1 ${pillOffset},${pr}`,
      "Z",
    ].join(" ");
  }

  const curve = 14 * t;
  const cr = Math.min(Math.max(0, radius), (bodyH - PH) * 0.45);
  const halfWidth = pillW / 2 + ((bw - pillW) / 2) * t;
  const bodyLeft = bw / 2 - halfWidth;
  const bodyRight = bw / 2 + halfWidth;
  const bodyTop = PH - curve;
  const qLeftX = Math.max(bodyLeft + cr, pillOffset - curve);
  const qRightX = Math.min(bodyRight - cr, pillOffset + pillW + curve);

  return [
    `M ${pillOffset},${pr}`,
    `A ${pr},${pr} 0 0 1 ${pillOffset + pr},0`,
    `H ${pillOffset + pillW - pr}`,
    `A ${pr},${pr} 0 0 1 ${pillOffset + pillW},${pr}`,
    `L ${pillOffset + pillW},${bodyTop}`,
    `Q ${pillOffset + pillW},${bodyTop + curve} ${qRightX},${bodyTop + curve}`,
    `H ${bodyRight - cr}`,
    `A ${cr},${cr} 0 0 1 ${bodyRight},${bodyTop + curve + cr}`,
    `L ${bodyRight},${bodyH - cr}`,
    `A ${cr},${cr} 0 0 1 ${bodyRight - cr},${bodyH}`,
    `H ${bodyLeft + cr}`,
    `A ${cr},${cr} 0 0 1 ${bodyLeft},${bodyH - cr}`,
    `L ${bodyLeft},${bodyTop + curve + cr}`,
    `A ${cr},${cr} 0 0 1 ${bodyLeft + cr},${bodyTop + curve}`,
    `H ${qLeftX}`,
    `Q ${pillOffset},${bodyTop + curve} ${pillOffset},${bodyTop}`,
    "Z",
  ].join(" ");
}

export { morphPathCenter };

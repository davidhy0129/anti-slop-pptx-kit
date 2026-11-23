/**
 * anti-slop-pptx-kit — Lightweight Technical Primitives (v9.0)
 * Shadow-free flat shapes, translucent industry background layers, SVG icons, and clean native charts.
 */

export const SLIDE = { w: 13.333, h: 7.5 };
export const NO_SHADOW = { type: "none" };

/** Compute W3C relative luminance and WCAG contrast ratio (L1 + 0.05) / (L2 + 0.05) */
export function getRelativeLuminance(hex) {
  const clean = hex.replace("#", "").trim();
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(clean.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(hex1, hex2) {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/** Verify WCAG 2.1 AA contrast (>=4.5:1 normal text, >=3.0:1 large text/icons) */
export function assertContrast(fgHex, bgHex, { large = false, label = "" } = {}) {
  const ratio = contrastRatio(fgHex, bgHex);
  const min = large ? 3.0 : 4.5;
  if (ratio < min) {
    throw new Error(`WCAG Contrast Fail${label ? ` (${label})` : ""}: #${fgHex} on #${bgHex} = ${ratio.toFixed(2)}:1 (min ${min}:1)`);
  }
  return ratio;
}

/** Add a flat shape with PowerPoint's default drop shadow explicitly disabled */
export function addFlatShape(slide, shapeType, opts) {
  return slide.addShape(shapeType, { shadow: NO_SHADOW, ...opts });
}

/** Add a borderless translucent background shape for layered depth & industry atmosphere */
export function addTranslucentAccent(slide, shapeType, { x, y, w, h, color, transparency = 88, rectRadius = 0.12 }) {
  return slide.addShape(shapeType, {
    shadow: NO_SHADOW,
    x,
    y,
    w,
    h,
    rectRadius,
    fill: { color, transparency },
    line: { color, width: 0, transparency: 100 },
  });
}

/** Build a crisp SVG icon data URI colored dynamically to any hex palette */
export function svgIconUri(pathsSvg, strokeHex, size = 64) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#${strokeHex.replace("#", "")}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${pathsSvg}</svg>`;
  return "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
}

/** Clean defaults for native editable PowerPoint charts (zero gridlines, zero border clutter) */
export function cleanChartOptions({ x, y, w, h, chartColors, labelColor, fontFace, valFontSize = 14, catFontSize = 14, barDir = "bar" }) {
  return {
    x,
    y,
    w,
    h,
    barDir,
    barGrouping: "clustered",
    chartColors,
    showLegend: false,
    showTitle: false,
    showValue: true,
    dataLabelPosition: "outEnd",
    dataLabelColor: labelColor,
    dataLabelFontFace: fontFace,
    dataLabelFontSize: valFontSize,
    dataLabelFontBold: true,
    catAxisLabelColor: labelColor,
    catAxisLabelFontFace: fontFace,
    catAxisLabelFontSize: catFontSize,
    catAxisLineShow: false,
    valAxisHidden: true,
    catGridLine: { style: "none" },
    valGridLine: { style: "none" },
  };
}

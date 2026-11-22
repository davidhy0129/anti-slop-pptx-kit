/**
 * anti-slop-pptx-kit — Lightweight Technical Primitives (v9.0)
 * Shadow-free flat shapes, translucent industry background layers, SVG icons, and clean native charts.
 */

export const SLIDE = { w: 13.333, h: 7.5 };
export const NO_SHADOW = { type: "none" };

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

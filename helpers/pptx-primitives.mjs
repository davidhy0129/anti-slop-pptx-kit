/**
 * anti-slop-pptx-kit — Lightweight Technical Primitives (v8.0)
 * NO fixed slide layouts or templates here — only clean utilities so bespoke layouts
 * never inherit PowerPoint drop shadows, encoding bugs, or cluttered default charts.
 */

export const SLIDE = { w: 13.333, h: 7.5 };
export const NO_SHADOW = { type: "none" };

/** Add a flat shape with PowerPoint's default drop shadow explicitly disabled */
export function addFlatShape(slide, shapeType, opts) {
  return slide.addShape(shapeType, { shadow: NO_SHADOW, ...opts });
}

/** Add a clean hairline divider (horizontal or vertical) with zero shadow */
export function addHairline(slide, pptx, { x, y, w = 0, h = 0, color, width = 1 }) {
  return slide.addShape(pptx.ShapeType.line, {
    shadow: NO_SHADOW,
    x,
    y,
    w,
    h,
    line: { color, width },
  });
}

/** Build a crisp SVG icon data URI colored dynamically to any hex palette */
export function svgIconUri(pathsSvg, strokeHex, size = 64) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#${strokeHex.replace("#", "")}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${pathsSvg}</svg>`;
  return "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
}

/** Clean defaults for native editable PowerPoint charts (zero gridlines, zero border clutter) */
export function cleanChartOptions({ x, y, w, h, chartColors, labelColor, fontFace, valFontSize = 13, catFontSize = 13, barDir = "bar" }) {
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

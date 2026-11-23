/**
 * anti-slop-pptx-kit — Lightweight Technical Primitives (v9.0)
 * Shadow-free flat shapes, translucent industry background layers, SVG icons, and clean native charts.
 */

export const SLIDE = { w: 13.333, h: 7.5 };
export const NO_SHADOW = { type: "none" };

/** Initialize a PptxGenJS deck locked to 13.333" x 7.5" (LAYOUT_WIDE) so coordinates never clip at 10"x5.625". */
export function createDeck(PptxGenJS, { title = "", author = "", company = "" } = {}) {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  if (title) pptx.title = title;
  if (author) pptx.author = author;
  if (company) pptx.company = company;
  return pptx;
}

/** Fail fast at build time if an element overflows the 13.333" x 7.5" canvas. */
export function assertSlideBounds({ x = 0, y = 0, w = 0, h = 0, allowBleed = false }, label = "element") {
  if (allowBleed) return;
  if (x < -0.01 || y < -0.01 || x + w > SLIDE.w + 0.02 || y + h > SLIDE.h + 0.02) {
    throw new Error(
      `Slide Bounds Overflow (${label}): x=${x}, y=${y}, w=${w}, h=${h} exceeds ${SLIDE.w}"x${SLIDE.h}" canvas`
    );
  }
}

/** Add a text box with safe defaults (valign: "top", wrap: true, margin: 0) and canvas-bounds check. */
export function addTextBox(slide, text, opts = {}) {
  assertSlideBounds(opts, typeof text === "string" ? text.slice(0, 32) : "rich-text");
  return slide.addText(text, {
    valign: "top",
    wrap: true,
    margin: 0,
    ...opts,
  });
}

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

/**
 * @deprecated PowerPoint renders a broken red [X] box for `data:image/svg+xml` passed to `addImage`.
 * Use `renderSvgIconsToPng(iconSpecs, outDir)` instead to emit real transparent PNGs.
 */
export function svgIconUri(pathsSvg, strokeHex, size = 64) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#${strokeHex.replace("#", "")}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${pathsSvg}</svg>`;
  return "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
}

/**
 * Batch-render crisp transparent-background PNG icons from SVG path fragments via headless Edge/Chrome.
 * PowerPoint does NOT render `data:image/svg+xml` in `addImage`; real `.png` files eliminate `[X]` broken-image boxes.
 *
 * @param {Array<{name: string, pathsSvg: string, strokeHex: string}>} iconSpecs
 * @param {string} outDir Directory where `<name>.png` files will be written
 * @param {number} [size=128] Pixel dimensions (width & height) for crisp Retina rendering
 * @returns {Promise<Record<string, string>>} Map of `{ [name]: absolutePngPath }`
 */
export async function renderSvgIconsToPng(iconSpecs, outDir, size = 128) {
  const fs = await import("node:fs");
  const path = await import("node:path");
  const { execFileSync } = await import("node:child_process");
  const os = await import("node:os");

  fs.mkdirSync(outDir, { recursive: true });
  const browserCandidates = [
    process.env.CHROME_PATH,
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "google-chrome",
    "chromium",
  ].filter(Boolean);

  const browser = browserCandidates.find((p) => (p.includes("/") || p.includes("\\") ? fs.existsSync(p) : true));
  if (!browser) throw new Error("No headless Chromium/Edge binary found for renderSvgIconsToPng");

  const payload = iconSpecs.map((spec) => {
    const hex = `#${spec.strokeHex.replace("#", "")}`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${hex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${spec.pathsSvg}</svg>`;
    return {
      name: spec.name,
      svgDataUri: "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64"),
    };
  });

  const tmpHtml = path.join(os.tmpdir(), `pptx-icons-${Date.now()}.html`);
  const html = `<!doctype html><html><body><pre id="out"></pre><script>
const specs = ${JSON.stringify(payload)};
const size = ${size};
Promise.all(specs.map(s => new Promise((resolve) => {
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = size; c.height = size;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, size, size);
    resolve([s.name, c.toDataURL('image/png')]);
  };
  img.onerror = () => resolve([s.name, null]);
  img.src = s.svgDataUri;
}))).then(entries => {
  document.getElementById('out').textContent = JSON.stringify(Object.fromEntries(entries));
});
</script></body></html>`;

  fs.writeFileSync(tmpHtml, html, "utf8");
  try {
    const dom = execFileSync(
      browser,
      ["--headless=new", "--disable-gpu", "--no-sandbox", "--virtual-time-budget=2000", "--dump-dom", `file://${tmpHtml.replace(/\\/g, "/")}`],
      { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 }
    );
    const match = dom.match(/<pre id="out">([\s\S]*?)<\/pre>/);
    if (!match) throw new Error("Failed to extract PNG icon data from headless browser");
    const dataMap = JSON.parse(match[1]);
    const outPaths = {};
    for (const [name, dataUri] of Object.entries(dataMap)) {
      if (!dataUri) throw new Error(`Failed to render SVG icon: ${name}`);
      const base64 = dataUri.replace(/^data:image\/png;base64,/, "");
      const outPath = path.join(outDir, `${name}.png`);
      fs.writeFileSync(outPath, Buffer.from(base64, "base64"));
      outPaths[name] = outPath;
    }
    return outPaths;
  } finally {
    try { fs.unlinkSync(tmpHtml); } catch {}
  }
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

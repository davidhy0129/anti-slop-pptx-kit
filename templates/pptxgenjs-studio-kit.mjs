/**
 * anti-slop-pptx-kit — PptxGenJS Studio Component Library (v6.0)
 * Industry-aware palettes, 1 cohesive 2-font system per deck, high-contrast >=14pt typography,
 * native editable PowerPoint charts, crisp SVG icon badges, zero drop shadows, balanced framing.
 */

export const SLIDE = { w: 13.333, h: 7.5, mx: 0.75, my: 0.65, gap: 0.35 };
const NO_SHADOW = { type: "none" };

export const PALETTES = {
  INDUSTRIAL_ENGINEERING: {
    darkBg: "0F172A", darkSurface: "1E293B", lightBg: "F8FAFC", lightSurface: "FFFFFF",
    inkOnDark: "FFFFFF", mutedOnDark: "CBD5E1", ruleOnDark: "334155",
    inkOnLight: "0F172A", mutedOnLight: "334155", ruleOnLight: "CBD5E1",
    accent: "EA580C", secondary: "1D4ED8", inkOnAccent: "FFFFFF",
  },
  EXECUTIVE_MIDNIGHT: {
    darkBg: "0B1325", darkSurface: "16223D", lightBg: "F6F5F1", lightSurface: "FFFFFF",
    inkOnDark: "FFFFFF", mutedOnDark: "CBD5E1", ruleOnDark: "2B3A5C",
    inkOnLight: "0B1325", mutedOnLight: "334155", ruleOnLight: "DDD9CE",
    accent: "D97706", secondary: "059669", inkOnAccent: "FFFFFF",
  },
  SAAS_COBALT: {
    darkBg: "111827", darkSurface: "1F2937", lightBg: "F9FAFB", lightSurface: "FFFFFF",
    inkOnDark: "FFFFFF", mutedOnDark: "D1D5DB", ruleOnDark: "374151",
    inkOnLight: "111827", mutedOnLight: "374151", ruleOnLight: "E5E7EB",
    accent: "2563EB", secondary: "10B981", inkOnAccent: "FFFFFF",
  },
  HOSPITALITY_TERRACOTTA: {
    darkBg: "1E2923", darkSurface: "2C3B33", lightBg: "FAF5EB", lightSurface: "FFFFFF",
    inkOnDark: "FAF5EB", mutedOnDark: "D6D3CD", ruleOnDark: "3E5146",
    inkOnLight: "1E2923", mutedOnLight: "44403C", ruleOnLight: "E7DFD1",
    accent: "C2410C", secondary: "B45309", inkOnAccent: "FFFFFF",
  },
  HEALTH_TEAL: {
    darkBg: "134E4A", darkSurface: "1D635E", lightBg: "FFFBF5", lightSurface: "FFFFFF",
    inkOnDark: "FFFFFF", mutedOnDark: "CCFBF1", ruleOnDark: "2B7A74",
    inkOnLight: "134E4A", mutedOnLight: "334155", ruleOnLight: "DCECE9",
    accent: "E11D48", secondary: "0284C7", inkOnAccent: "FFFFFF",
  },
  LUXURY_OBSIDIAN: {
    darkBg: "18181B", darkSurface: "27272A", lightBg: "F4F1EA", lightSurface: "FFFFFF",
    inkOnDark: "FAF8F5", mutedOnDark: "D4D4D8", ruleOnDark: "3F3F46",
    inkOnLight: "18181B", mutedOnLight: "3F3F46", ruleOnLight: "E4DFD4",
    accent: "B91C1C", secondary: "71717A", inkOnAccent: "FFFFFF",
  },
};

export const FONT_SYSTEMS = {
  ENGINEERING_PRO: { display: "Montserrat", body: "Calibri" },
  MODERN_CLEAN: { display: "Montserrat", body: "DM Sans" },
  EDITORIAL_CLASSIC: { display: "Georgia", body: "DM Sans" },
  FRIENDLY_MODERN: { display: "Poppins", body: "Calibri" },
};

export const FONTS = FONT_SYSTEMS.ENGINEERING_PRO;

const SVG_ICONS = {
  clock: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
};

function svgIconDataUri(name, strokeHex) {
  const inner = SVG_ICONS[name] || SVG_ICONS.check;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#${strokeHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  return "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
}

function flatShape(slide, shapeType, opts) {
  return slide.addShape(shapeType, { shadow: NO_SHADOW, ...opts });
}

function addTurnTitle(slide, parts, { x, y, w, h, fontSize = 28, ink, accent, fonts = FONTS }) {
  const runs = parts.map((p) => ({
    text: p.text,
    options: { fontFace: fonts.display, fontSize, bold: true, color: p.accent ? accent : ink },
  }));
  slide.addText(runs, { x, y, w, h, valign: "top", wrap: true, lineSpacingMultiple: 1.12 });
}

function addQuietPageNumber(slide, pageNum, mutedColor, fonts = FONTS) {
  if (!pageNum) return;
  slide.addText(String(pageNum).padStart(2, "0"), {
    x: SLIDE.w - SLIDE.mx - 0.7,
    y: SLIDE.h - 0.48,
    w: 0.7,
    h: 0.3,
    align: "right",
    fontFace: fonts.body,
    fontSize: 11,
    bold: true,
    color: mutedColor,
  });
}

/** 1. Rich Cover Slide (Balanced asymmetric split with dark hero panel + key summary strip) */
export function renderCoverSlide(pptx, palette, { titleParts, subtitle, contextPill = "", statsStrip = [], imagePath = null, speakerNotes = "", fonts = FONTS }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.darkBg };

  // Right visual block (photo with dark scrim OR bold geometric accent panel)
  if (imagePath) {
    slide.addImage({ path: imagePath, x: 7.7, y: 0, w: 5.633, h: SLIDE.h, sizing: { type: "cover", w: 5.633, h: SLIDE.h } });
    flatShape(slide, pptx.ShapeType.rect, { x: 7.7, y: 0, w: 5.633, h: SLIDE.h, fill: { color: palette.darkBg, transparency: 45 }, line: { color: palette.darkBg, width: 0 } });
  } else {
    flatShape(slide, pptx.ShapeType.rect, { x: 8.5, y: 0, w: 4.833, h: SLIDE.h, fill: { color: palette.darkSurface }, line: { color: palette.darkSurface, width: 0 } });
    flatShape(slide, pptx.ShapeType.rect, { x: 8.5, y: 0, w: 0.12, h: SLIDE.h, fill: { color: palette.accent }, line: { color: palette.accent, width: 0 } });
    if (statsStrip.length > 0) {
      statsStrip.slice(0, 3).forEach((st, idx) => {
        const sy = 1.65 + idx * 1.65;
        slide.addText(st.value, { x: 9.05, y: sy, w: 3.8, h: 0.7, fontFace: fonts.display, fontSize: 34, bold: true, color: palette.accent });
        slide.addText(st.label, { x: 9.05, y: sy + 0.68, w: 3.8, h: 0.55, fontFace: fonts.body, fontSize: 14, color: palette.mutedOnDark, wrap: true });
      });
    }
  }

  if (contextPill) {
    slide.addText(contextPill, {
      x: SLIDE.mx, y: 1.15, w: 7.2, h: 0.38,
      fontFace: fonts.body, fontSize: 13, bold: true, color: palette.accent,
    });
  }

  addTurnTitle(slide, titleParts, {
    x: SLIDE.mx, y: 1.7, w: 7.3, h: 2.5, fontSize: 40, ink: palette.inkOnDark, accent: palette.accent, fonts,
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: SLIDE.mx, y: 4.45, w: 7.1, h: 1.4,
      fontFace: fonts.body, fontSize: 16, color: palette.mutedOnDark, wrap: true, lineSpacingMultiple: 1.35,
    });
  }

  if (speakerNotes) slide.addNotes(speakerNotes);
  return slide;
}

/** 2. Hero Stat + Supporting Context Cards (balanced 2-column — never empty bottom half) */
export function renderMetricPlusCards(pptx, palette, { titleParts, heroStat, heroCaption, heroFootnote = "", cards, dark = false, pageNum, speakerNotes = "", fonts = FONTS }) {
  const slide = pptx.addSlide();
  const bg = dark ? palette.darkBg : palette.lightBg;
  const surface = dark ? palette.darkSurface : palette.lightSurface;
  const ink = dark ? palette.inkOnDark : palette.inkOnLight;
  const muted = dark ? palette.mutedOnDark : palette.mutedOnLight;
  slide.background = { color: bg };

  addTurnTitle(slide, titleParts, { x: SLIDE.mx, y: SLIDE.my, w: SLIDE.w - SLIDE.mx * 2, h: 1.05, fontSize: 28, ink, accent: palette.accent, fonts });

  // Left dark focal panel
  const topY = 1.95;
  const panelH = 4.65;
  flatShape(slide, pptx.ShapeType.roundRect, { x: SLIDE.mx, y: topY, w: 5.1, h: panelH, rectRadius: 0.08, fill: { color: palette.darkBg }, line: { color: palette.darkBg, width: 0 } });
  slide.addText(heroStat, { x: SLIDE.mx + 0.45, y: topY + 0.65, w: 4.2, h: 1.25, fontFace: fonts.display, fontSize: 56, bold: true, color: palette.accent });
  slide.addText(heroCaption, { x: SLIDE.mx + 0.45, y: topY + 2.05, w: 4.2, h: 1.35, fontFace: fonts.display, fontSize: 18, bold: true, color: palette.inkOnDark, wrap: true, lineSpacingMultiple: 1.2 });
  if (heroFootnote) {
    slide.addText(heroFootnote, { x: SLIDE.mx + 0.45, y: topY + 3.55, w: 4.2, h: 0.85, fontFace: fonts.body, fontSize: 13, color: palette.mutedOnDark, wrap: true });
  }

  // Right clean tonal cards (no shadows, no vertical red stripes!)
  const rightX = SLIDE.mx + 5.45;
  const rightW = SLIDE.w - rightX - SLIDE.mx;
  const list = cards.slice(0, 3);
  const gapY = 0.25;
  const cardH = (panelH - gapY * (list.length - 1)) / list.length;

  list.forEach((c, i) => {
    const cy = topY + i * (cardH + gapY);
    flatShape(slide, pptx.ShapeType.roundRect, {
      x: rightX, y: cy, w: rightW, h: cardH, rectRadius: 0.06,
      fill: { color: surface },
      line: { color: dark ? palette.ruleOnDark : palette.ruleOnLight, width: 1 },
    });
    if (c.icon) {
      slide.addImage({ data: svgIconDataUri(c.icon, palette.accent), x: rightX + 0.3, y: cy + (cardH - 0.45) / 2, w: 0.45, h: 0.45 });
    }
    const tx = c.icon ? rightX + 0.95 : rightX + 0.35;
    const tw = rightW - (c.icon ? 1.25 : 0.7);
    slide.addText(c.title, { x: tx, y: cy + 0.22, w: tw, h: 0.38, fontFace: fonts.display, fontSize: 16, bold: true, color: ink });
    slide.addText(c.detail, { x: tx, y: cy + 0.62, w: tw, h: cardH - 0.78, fontFace: fonts.body, fontSize: 14, color: muted, wrap: true, lineSpacingMultiple: 1.2 });
  });

  addQuietPageNumber(slide, pageNum, muted, fonts);
  if (speakerNotes) slide.addNotes(speakerNotes);
  return slide;
}

/** 3. Native Editable PowerPoint Bar Chart + Right Insight Panel */
export function renderNativeBarChartSlide(pptx, palette, { titleParts, chartData, insightStat, insightTitle, insightDetail, sourceLine = "", dark = false, pageNum, speakerNotes = "", fonts = FONTS }) {
  const slide = pptx.addSlide();
  const bg = dark ? palette.darkBg : palette.lightBg;
  const ink = dark ? palette.inkOnDark : palette.inkOnLight;
  const muted = dark ? palette.mutedOnDark : palette.mutedOnLight;
  slide.background = { color: bg };

  addTurnTitle(slide, titleParts, { x: SLIDE.mx, y: SLIDE.my, w: SLIDE.w - SLIDE.mx * 2, h: 1.05, fontSize: 28, ink, accent: palette.accent, fonts });

  // Native editable PowerPoint Bar Chart (zero gridlines, direct value labels)
  const chartColors = chartData.map((d) => (d.highlight ? palette.accent : (dark ? "475569" : "94A3B8")));
  slide.addChart(
    pptx.ChartType.bar,
    [
      {
        name: "Comparativa",
        labels: chartData.map((d) => d.label),
        values: chartData.map((d) => d.value),
      },
    ],
    {
      x: SLIDE.mx,
      y: 1.95,
      w: 7.4,
      h: 4.65,
      barDir: "bar",
      barGrouping: "clustered",
      chartColors,
      showLegend: false,
      showTitle: false,
      showValue: true,
      dataLabelPosition: "outEnd",
      dataLabelColor: ink,
      dataLabelFontFace: fonts.display,
      dataLabelFontSize: 13,
      dataLabelFontBold: true,
      catAxisLabelColor: ink,
      catAxisLabelFontFace: fonts.body,
      catAxisLabelFontSize: 13,
      catAxisLineShow: false,
      valAxisHidden: true,
      catGridLine: { style: "none" },
      valGridLine: { style: "none" },
    }
  );

  // Right bold insight callout card
  const rx = 8.55;
  const rw = SLIDE.w - rx - SLIDE.mx;
  flatShape(slide, pptx.ShapeType.roundRect, { x: rx, y: 1.95, w: rw, h: 4.65, rectRadius: 0.08, fill: { color: palette.darkBg }, line: { color: palette.darkBg, width: 0 } });
  slide.addText(insightStat, { x: rx + 0.38, y: 2.45, w: rw - 0.76, h: 1.15, fontFace: fonts.display, fontSize: 38, bold: true, color: palette.accent, wrap: true });
  slide.addText(insightTitle, { x: rx + 0.38, y: 3.7, w: rw - 0.76, h: 0.7, fontFace: fonts.display, fontSize: 17, bold: true, color: palette.inkOnDark, wrap: true });
  slide.addText(insightDetail, { x: rx + 0.38, y: 4.45, w: rw - 0.76, h: 1.7, fontFace: fonts.body, fontSize: 14, color: palette.mutedOnDark, wrap: true, lineSpacingMultiple: 1.3 });

  if (sourceLine) {
    slide.addText(sourceLine, { x: SLIDE.mx, y: SLIDE.h - 0.48, w: 9.5, h: 0.3, fontFace: fonts.body, fontSize: 11, color: muted });
  }
  addQuietPageNumber(slide, pageNum, muted, fonts);
  if (speakerNotes) slide.addNotes(speakerNotes);
  return slide;
}

/** 4. Clean High-Contrast Table + Bottom Highlight Strip */
export function renderCleanTableSlide(pptx, palette, { titleParts, headers, rows, colW, highlightCol = 1, bottomHighlight = "", pageNum, speakerNotes = "", fonts = FONTS }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.lightBg };

  addTurnTitle(slide, titleParts, { x: SLIDE.mx, y: SLIDE.my, w: SLIDE.w - SLIDE.mx * 2, h: 1.05, fontSize: 28, ink: palette.inkOnLight, accent: palette.accent, fonts });

  const tableRows = [
    headers.map((h, cIdx) => ({
      text: h,
      options: {
        bold: true, fontFace: fonts.display, fontSize: 13.5,
        color: cIdx === highlightCol ? palette.inkOnAccent : palette.inkOnDark,
        fill: { color: cIdx === highlightCol ? palette.accent : palette.darkBg },
        margin: [10, 12, 10, 12],
      },
    })),
    ...rows.map((r, rIdx) =>
      r.map((cell, cIdx) => ({
        text: cell,
        options: {
          fontFace: fonts.body, fontSize: 13, bold: cIdx === highlightCol || cIdx === 0,
          color: palette.inkOnLight,
          fill: { color: rIdx % 2 === 1 ? palette.lightSurface : palette.lightBg },
          border: [{ pt: 0, color: palette.lightBg }, { pt: 0, color: palette.lightBg }, { pt: 1, color: palette.ruleOnLight }, { pt: 0, color: palette.lightBg }],
          margin: [9, 12, 9, 12],
        },
      }))
    ),
  ];

  slide.addTable(tableRows, { x: SLIDE.mx, y: 1.9, w: SLIDE.w - SLIDE.mx * 2, colW, valign: "middle" });

  if (bottomHighlight) {
    flatShape(slide, pptx.ShapeType.roundRect, { x: SLIDE.mx, y: 5.9, w: SLIDE.w - SLIDE.mx * 2, h: 0.78, rectRadius: 0.06, fill: { color: palette.darkBg }, line: { color: palette.darkBg, width: 0 } });
    slide.addText(bottomHighlight, { x: SLIDE.mx + 0.3, y: 5.9, w: SLIDE.w - SLIDE.mx * 2 - 0.6, h: 0.78, fontFace: fonts.display, fontSize: 15.5, bold: true, color: palette.accent, valign: "middle", align: "center" });
  }

  addQuietPageNumber(slide, pageNum, palette.mutedOnLight, fonts);
  if (speakerNotes) slide.addNotes(speakerNotes);
  return slide;
}

/** 5. Two-Column Contrast Cards + Bottom Pull Quote (replaces broken iceberg & boring text lists) */
export function renderContrastTwoColumn(pptx, palette, { titleParts, leftCol, rightCol, bottomQuote = "", pageNum, speakerNotes = "", fonts = FONTS }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.lightBg };
  addTurnTitle(slide, titleParts, { x: SLIDE.mx, y: SLIDE.my, w: SLIDE.w - SLIDE.mx * 2, h: 1.05, fontSize: 28, ink: palette.inkOnLight, accent: palette.accent, fonts });

  const colW = (SLIDE.w - SLIDE.mx * 2 - 0.4) / 2;
  const topY = 1.95;
  const cardH = bottomQuote ? 3.65 : 4.65;

  [
    { col: leftCol, x: SLIDE.mx, isDark: false },
    { col: rightCol, x: SLIDE.mx + colW + 0.4, isDark: true },
  ].forEach(({ col, x, isDark }) => {
    const fill = isDark ? palette.darkBg : palette.lightSurface;
    const hColor = isDark ? palette.accent : palette.inkOnLight;
    const bColor = isDark ? palette.inkOnDark : palette.mutedOnLight;
    flatShape(slide, pptx.ShapeType.roundRect, {
      x, y: topY, w: colW, h: cardH, rectRadius: 0.08,
      fill: { color: fill },
      line: { color: isDark ? palette.darkBg : palette.ruleOnLight, width: 1 },
    });
    slide.addText(col.heading, { x: x + 0.4, y: topY + 0.35, w: colW - 0.8, h: 0.45, fontFace: fonts.display, fontSize: 19, bold: true, color: hColor });
    const bulletText = col.items.map((it) => `•  ${it}`).join("\n\n");
    slide.addText(bulletText, { x: x + 0.4, y: topY + 0.95, w: colW - 0.8, h: cardH - 1.2, fontFace: fonts.body, fontSize: 14.5, color: bColor, wrap: true, lineSpacingMultiple: 1.25 });
  });

  if (bottomQuote) {
    flatShape(slide, pptx.ShapeType.roundRect, { x: SLIDE.mx, y: 5.85, w: SLIDE.w - SLIDE.mx * 2, h: 0.85, rectRadius: 0.06, fill: { color: palette.accent }, line: { color: palette.accent, width: 0 } });
    slide.addText(bottomQuote, { x: SLIDE.mx + 0.35, y: 5.85, w: SLIDE.w - SLIDE.mx * 2 - 0.7, h: 0.85, fontFace: fonts.display, fontSize: 15, bold: true, color: palette.inkOnAccent, valign: "middle", align: "center", wrap: true });
  }

  addQuietPageNumber(slide, pageNum, palette.mutedOnLight, fonts);
  if (speakerNotes) slide.addNotes(speakerNotes);
  return slide;
}

/** 6. 2x2 Icon Feature Grid (crisp SVG icons, high-contrast cards, zero shadows) */
export function renderIconFeatureGrid(pptx, palette, { titleParts, items, dark = true, pageNum, speakerNotes = "", fonts = FONTS }) {
  const slide = pptx.addSlide();
  const bg = dark ? palette.darkBg : palette.lightBg;
  const surface = dark ? palette.darkSurface : palette.lightSurface;
  const ink = dark ? palette.inkOnDark : palette.inkOnLight;
  const muted = dark ? palette.mutedOnDark : palette.mutedOnLight;
  const border = dark ? palette.ruleOnDark : palette.ruleOnLight;
  slide.background = { color: bg };

  addTurnTitle(slide, titleParts, { x: SLIDE.mx, y: SLIDE.my, w: SLIDE.w - SLIDE.mx * 2, h: 1.05, fontSize: 28, ink, accent: palette.accent, fonts });

  const gapX = 0.35, gapY = 0.32;
  const cardW = (SLIDE.w - SLIDE.mx * 2 - gapX) / 2;
  const cardH = 2.15;
  const startY = 1.95;

  items.slice(0, 4).forEach((item, idx) => {
    const col = idx % 2, row = Math.floor(idx / 2);
    const x = SLIDE.mx + col * (cardW + gapX);
    const y = startY + row * (cardH + gapY);

    flatShape(slide, pptx.ShapeType.roundRect, { x, y, w: cardW, h: cardH, rectRadius: 0.08, fill: { color: surface }, line: { color: border, width: 1 } });
    slide.addImage({ data: svgIconDataUri(item.icon || "zap", palette.accent), x: x + 0.35, y: y + 0.35, w: 0.48, h: 0.48 });
    slide.addText(item.title, { x: x + 1.02, y: y + 0.35, w: cardW - 1.35, h: 0.45, fontFace: fonts.display, fontSize: 17, bold: true, color: ink });
    slide.addText(item.detail, { x: x + 1.02, y: y + 0.88, w: cardW - 1.35, h: 1.05, fontFace: fonts.body, fontSize: 14, color: muted, wrap: true, lineSpacingMultiple: 1.25 });
  });

  addQuietPageNumber(slide, pageNum, muted, fonts);
  if (speakerNotes) slide.addNotes(speakerNotes);
  return slide;
}

/** 7. Centered Hero Statement + 3 Supporting Pillars (never looks empty or top-heavy) */
export function renderHeroCenteredStatement(pptx, palette, { figure, headline, pillars, pageNum, speakerNotes = "", fonts = FONTS }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.darkBg };

  slide.addText(figure, { x: SLIDE.mx, y: 1.05, w: SLIDE.w - SLIDE.mx * 2, h: 1.25, align: "center", fontFace: fonts.display, fontSize: 68, bold: true, color: palette.accent });
  slide.addText(headline, { x: 1.6, y: 2.4, w: SLIDE.w - 3.2, h: 1.1, align: "center", fontFace: fonts.display, fontSize: 26, bold: true, color: palette.inkOnDark, wrap: true });

  const gap = 0.3;
  const colW = (SLIDE.w - SLIDE.mx * 2 - gap * 2) / 3;
  pillars.slice(0, 3).forEach((p, idx) => {
    const x = SLIDE.mx + idx * (colW + gap);
    flatShape(slide, pptx.ShapeType.roundRect, { x, y: 3.95, w: colW, h: 2.55, rectRadius: 0.08, fill: { color: palette.darkSurface }, line: { color: palette.ruleOnDark, width: 1 } });
    slide.addImage({ data: svgIconDataUri(p.icon || "shield", palette.accent), x: x + 0.32, y: 4.25, w: 0.42, h: 0.42 });
    slide.addText(p.title, { x: x + 0.32, y: 4.82, w: colW - 0.64, h: 0.42, fontFace: fonts.display, fontSize: 15.5, bold: true, color: palette.inkOnDark });
    slide.addText(p.detail, { x: x + 0.32, y: 5.3, w: colW - 0.64, h: 1.0, fontFace: fonts.body, fontSize: 13.5, color: palette.mutedOnDark, wrap: true, lineSpacingMultiple: 1.2 });
  });

  addQuietPageNumber(slide, pageNum, palette.mutedOnDark, fonts);
  if (speakerNotes) slide.addNotes(speakerNotes);
  return slide;
}

/** 8. Roadmap + Bottom Concrete Decisions Bar */
export function renderRoadmapWithActions(pptx, palette, { titleParts, steps, decisionsTitle, decisions, pageNum, speakerNotes = "", fonts = FONTS }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.lightBg };
  addTurnTitle(slide, titleParts, { x: SLIDE.mx, y: SLIDE.my, w: SLIDE.w - SLIDE.mx * 2, h: 1.05, fontSize: 28, ink: palette.inkOnLight, accent: palette.accent, fonts });

  const gap = 0.3;
  const cardW = (SLIDE.w - SLIDE.mx * 2 - gap * (steps.length - 1)) / steps.length;
  steps.forEach((st, i) => {
    const x = SLIDE.mx + i * (cardW + gap);
    flatShape(slide, pptx.ShapeType.roundRect, { x, y: 1.95, w: cardW, h: 2.35, rectRadius: 0.08, fill: { color: palette.lightSurface }, line: { color: palette.ruleOnLight, width: 1 } });
    flatShape(slide, pptx.ShapeType.roundRect, { x: x + 0.3, y: 2.22, w: 1.45, h: 0.34, rectRadius: 0.04, fill: { color: i === 0 ? palette.accent : palette.darkBg }, line: { color: i === 0 ? palette.accent : palette.darkBg, width: 0 } });
    slide.addText(st.tag, { x: x + 0.3, y: 2.22, w: 1.45, h: 0.34, align: "center", valign: "middle", fontFace: fonts.display, fontSize: 11.5, bold: true, color: palette.inkOnDark });
    slide.addText(st.title, { x: x + 0.3, y: 2.7, w: cardW - 0.6, h: 0.45, fontFace: fonts.display, fontSize: 16.5, bold: true, color: palette.inkOnLight });
    slide.addText(st.detail, { x: x + 0.3, y: 3.22, w: cardW - 0.6, h: 0.9, fontFace: fonts.body, fontSize: 14, color: palette.mutedOnLight, wrap: true });
  });

  flatShape(slide, pptx.ShapeType.roundRect, { x: SLIDE.mx, y: 4.65, w: SLIDE.w - SLIDE.mx * 2, h: 2.05, rectRadius: 0.08, fill: { color: palette.darkBg }, line: { color: palette.darkBg, width: 0 } });
  slide.addText(decisionsTitle, { x: SLIDE.mx + 0.4, y: 4.88, w: 11, h: 0.4, fontFace: fonts.display, fontSize: 15, bold: true, color: palette.accent });
  slide.addText(decisions.map((d, idx) => `${idx + 1}.  ${d}`).join("\n"), {
    x: SLIDE.mx + 0.4, y: 5.35, w: SLIDE.w - SLIDE.mx * 2 - 0.8, h: 1.2,
    fontFace: fonts.body, fontSize: 14.5, color: palette.inkOnDark, wrap: true, lineSpacingMultiple: 1.35,
  });

  addQuietPageNumber(slide, pageNum, palette.mutedOnLight, fonts);
  if (speakerNotes) slide.addNotes(speakerNotes);
  return slide;
}

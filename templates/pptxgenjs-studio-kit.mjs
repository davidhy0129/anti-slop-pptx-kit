/**
 * anti-slop-pptx-kit — PptxGenJS Studio Component Library (v2.1)
 * Includes:
 * - 8 Color-Harmony Palettes (60-30-10 + Warm-vs-Cool contrast)
 * - 4 Curated Font Systems (non-AI typography)
 * - 11 Graphic-Design Slide Archetypes + Vector Motifs (CAD boxes, concentric rings, diagrams, optional photo scrims)
 */

export const SLIDE = { w: 13.333, h: 7.5, mx: 0.8, my: 0.7, gap: 0.35 };

export const PALETTES = {
  OBSIDIAN_CITRINE: {
    darkBg: "0B0C0E", darkSurface: "17191D", lightBg: "F4F5F3", lightSurface: "FFFFFF",
    inkOnDark: "F7F7F5", mutedOnDark: "8F949E", ruleOnDark: "262930",
    inkOnLight: "121316", mutedOnLight: "5C616B", ruleOnLight: "E0E2DF",
    accent: "C8D636", inkOnAccent: "0B0C0E",
  },
  SWISS_ORANGE: {
    darkBg: "111111", darkSurface: "1D1D1D", lightBg: "F5F4F0", lightSurface: "FFFFFF",
    inkOnDark: "FAF9F6", mutedOnDark: "94918B", ruleOnDark: "2A2927",
    inkOnLight: "141413", mutedOnLight: "63605A", ruleOnLight: "E2DFD7",
    accent: "FF4D00", inkOnAccent: "FFFFFF",
  },
  INDIGO_BONE: {
    darkBg: "0B1325", darkSurface: "14203B", lightBg: "F6F5F1", lightSurface: "FFFFFF",
    inkOnDark: "FAFAF8", mutedOnDark: "919DB5", ruleOnDark: "223152",
    inkOnLight: "0B1325", mutedOnLight: "586174", ruleOnLight: "E3E1D8",
    accent: "F2B53A", inkOnAccent: "0B1325",
  },
  DEEP_TEAL_CREAM: {
    darkBg: "013330", darkSurface: "084743", lightBg: "F3EBDD", lightSurface: "FAF6EE",
    inkOnDark: "F7F3EA", mutedOnDark: "9CC2BE", ruleOnDark: "135954",
    inkOnLight: "013330", mutedOnLight: "4A6B67", ruleOnLight: "DDD2BF",
    accent: "FF6A1F", inkOnAccent: "FFFFFF",
  },
  NAVY_STEEL: {
    darkBg: "26364D", darkSurface: "324561", lightBg: "F4F7F9", lightSurface: "FFFFFF",
    inkOnDark: "FFFFFF", mutedOnDark: "9DB4BE", ruleOnDark: "435A7A",
    inkOnLight: "26364D", mutedOnLight: "547182", ruleOnLight: "D8E2E7",
    accent: "547182", inkOnAccent: "FFFFFF",
  },
  PLUM_LAVENDER: {
    darkBg: "342952", darkSurface: "4E4074", lightBg: "F7F5FC", lightSurface: "FFFFFF",
    inkOnDark: "F7F5FC", mutedOnDark: "BEB5D9", ruleOnDark: "5E4F87",
    inkOnLight: "2A2042", mutedOnLight: "6E628C", ruleOnLight: "E5DFF2",
    accent: "4E4074", inkOnAccent: "FFFFFF",
  },
  BLUSH_OLIVE: {
    darkBg: "2E3320", darkSurface: "3E452C", lightBg: "FAF3F4", lightSurface: "FFFFFF",
    inkOnDark: "F9CDD5", mutedOnDark: "B8C0A2", ruleOnDark: "51593C",
    inkOnLight: "2E3320", mutedOnLight: "666B54", ruleOnLight: "EAD9DC",
    accent: "7A8450", inkOnAccent: "FFFFFF",
  },
  CERULEAN_BUTTER: {
    darkBg: "183145", darkSurface: "23445E", lightBg: "FFF9E6", lightSurface: "FFFFFF",
    inkOnDark: "FFEDA2", mutedOnDark: "9CBBD1", ruleOnDark: "335B7A",
    inkOnLight: "183145", mutedOnLight: "4C6B82", ruleOnLight: "F0E2B6",
    accent: "4282AA", inkOnAccent: "FFFFFF",
  },
  OFFWHITE_TEAL_INTRO: {
    darkBg: "1A365D", darkSurface: "254B80", lightBg: "F7FAFC", lightSurface: "FFFFFF",
    inkOnDark: "F7FAFC", mutedOnDark: "A0C4DF", ruleOnDark: "315C96",
    inkOnLight: "1A365D", mutedOnLight: "4A5568", ruleOnLight: "DCE6F0",
    accent: "38B2AC", inkOnAccent: "0F2928",
  },
  NAVY_CORAL_PROPOSAL: {
    darkBg: "0F2A44", darkSurface: "193D61", lightBg: "FAF8F3", lightSurface: "FFFFFF",
    inkOnDark: "FAF8F3", mutedOnDark: "9FB7CC", ruleOnDark: "26517A",
    inkOnLight: "0F2A44", mutedOnLight: "52657A", ruleOnLight: "E6E0D3",
    accent: "F06A3A", inkOnAccent: "FFFFFF",
  },
  WARM_CORAL_TEACH: {
    darkBg: "2D3748", darkSurface: "3E4C63", lightBg: "FFF8F0", lightSurface: "FFFFFF",
    inkOnDark: "FFF8F0", mutedOnDark: "CBD5E0", ruleOnDark: "4A5568",
    inkOnLight: "2D3748", mutedOnLight: "5A6577", ruleOnLight: "EFE3D4",
    accent: "E53E3E", inkOnAccent: "FFFFFF",
  },
  CHARCOAL_MINT_TECH: {
    darkBg: "1A202C", darkSurface: "252E3F", lightBg: "F4F6F8", lightSurface: "FFFFFF",
    inkOnDark: "F7FAFC", mutedOnDark: "A0AEC0", ruleOnDark: "344054",
    inkOnLight: "1A202C", mutedOnLight: "4A5568", ruleOnLight: "DDE3EA",
    accent: "48BB78", inkOnAccent: "0F291A",
  },
  BLACK_YELLOW_MORPH: {
    darkBg: "111111", darkSurface: "1F1F1F", lightBg: "F2F2F0", lightSurface: "FFFFFF",
    inkOnDark: "FFFFFF", mutedOnDark: "9E9E9E", ruleOnDark: "2E2E2E",
    inkOnLight: "111111", mutedOnLight: "555555", ruleOnLight: "DCDCD8",
    accent: "F5D000", inkOnAccent: "111111",
  },
};

export const FONT_SYSTEMS = {
  SWISS_TECH: { display: "Switzer", body: "Poppins", mono: "Consolas" },
  BOLD_PRODUCT: { display: "Montserrat", body: "Poppins", mono: "Consolas" },
  EDITORIAL_LUXURY: { display: "Georgia", body: "DM Sans", mono: "Consolas" },
  MODERN_STUDIO: { display: "Familjen Grotesk", body: "DM Sans", mono: "Consolas" },
};

export const FONTS = FONT_SYSTEMS.BOLD_PRODUCT;

function addTurnTitle(slide, parts, { x, y, w, h, fontSize = 30, ink, accent, fonts = FONTS }) {
  const runs = parts.map((p) => ({
    text: p.text,
    options: { fontFace: fonts.display, fontSize, bold: true, color: p.accent ? accent : ink },
  }));
  slide.addText(runs, { x, y, w, h, valign: "top", wrap: true, lineSpacingMultiple: 1.08 });
}

function addQuietPageNumber(slide, pageNum, mutedColor, fonts = FONTS) {
  if (!pageNum) return;
  slide.addText(String(pageNum).padStart(2, "0"), {
    x: SLIDE.w - SLIDE.mx - 0.8,
    y: SLIDE.h - 0.52,
    w: 0.8,
    h: 0.3,
    align: "right",
    fontFace: fonts.mono,
    fontSize: 9,
    color: mutedColor,
  });
}

/** Vector Motif: CAD/Figma Selection Box with 4px corner handles */
export function addCadCallout(slide, pptx, { x, y, w, h, label, accent, ink, fonts = FONTS }) {
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w, h,
    fill: { color: "FFFFFF", transparency: 100 },
    line: { color: accent, width: 0.75 },
  });
  const hs = 0.07;
  [[x - hs / 2, y - hs / 2], [x + w - hs / 2, y - hs / 2], [x - hs / 2, y + h - hs / 2], [x + w - hs / 2, y + h - hs / 2]].forEach(([hx, hy]) => {
    slide.addShape(pptx.ShapeType.rect, { x: hx, y: hy, w: hs, h: hs, fill: { color: accent }, line: { color: accent, width: 0 } });
  });
  slide.addText(label.toUpperCase(), {
    x: x + 0.08, y: y + 0.03, w: w - 0.16, h: h - 0.06,
    fontFace: fonts.mono, fontSize: 9, bold: true, color: ink, valign: "middle", align: "center",
  });
}

/** Vector Motif: Concentric Target Rings (instead of fat block arrows) */
export function addConcentricTarget(slide, pptx, { cx, cy, outerR = 0.45, color }) {
  [1, 0.62, 0.28].forEach((scale, idx) => {
    const d = outerR * 2 * scale;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: cx - d / 2,
      y: cy - d / 2,
      w: d,
      h: d,
      fill: { color: idx === 2 ? color : "FFFFFF", transparency: idx === 2 ? 0 : 100 },
      line: { color, width: idx === 0 ? 1 : 1.5, transparency: idx === 0 ? 60 : 0 },
    });
  });
}

/** 1. Minimalist Cover (supports optional right-side image or clean architectural target) */
export function renderCoverSlide(pptx, palette, { titleParts, subtitle, metaLine = "", imagePath = null, fonts = FONTS }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.darkBg };

  if (imagePath) {
    slide.addImage({ path: imagePath, x: 7.4, y: 0, w: 5.933, h: SLIDE.h, sizing: { type: "cover", w: 5.933, h: SLIDE.h } });
    slide.addShape(pptx.ShapeType.rect, {
      x: 7.4, y: 0, w: 5.933, h: SLIDE.h,
      fill: { color: palette.darkBg, transparency: 55 },
      line: { color: palette.darkBg, width: 0 },
    });
  } else {
    addConcentricTarget(slide, pptx, { cx: 11.2, cy: 3.75, outerR: 1.55, color: palette.accent });
  }

  if (metaLine) {
    slide.addText(metaLine.toUpperCase(), {
      x: SLIDE.mx, y: SLIDE.my, w: 7.5, h: 0.3,
      fontFace: fonts.mono, fontSize: 9, color: palette.mutedOnDark, charSpacing: 2,
    });
  }

  addTurnTitle(slide, titleParts, {
    x: SLIDE.mx, y: 1.95, w: imagePath ? 6.2 : 9.2, h: 2.6, fontSize: 46, ink: palette.inkOnDark, accent: palette.accent, fonts,
  });

  slide.addShape(pptx.ShapeType.line, {
    x: SLIDE.mx, y: 4.95, w: 1.4, h: 0, line: { color: palette.accent, width: 2.5 },
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: SLIDE.mx, y: 5.2, w: imagePath ? 6.0 : 7.5, h: 0.95,
      fontFace: fonts.body, fontSize: 14.5, color: palette.mutedOnDark, wrap: true, lineSpacingMultiple: 1.25,
    });
  }
  return slide;
}

/** 2. Editorial Split (with optional CAD tag + hairline rows, zero card boxes) */
export function renderEditorialSplit(pptx, palette, { titleParts, leadText, rows, tagLabel = "", dark = false, pageNum, fonts = FONTS }) {
  const slide = pptx.addSlide();
  const bg = dark ? palette.darkBg : palette.lightBg;
  const ink = dark ? palette.inkOnDark : palette.inkOnLight;
  const muted = dark ? palette.mutedOnDark : palette.mutedOnLight;
  const rule = dark ? palette.ruleOnDark : palette.ruleOnLight;
  slide.background = { color: bg };

  if (tagLabel) {
    addCadCallout(slide, pptx, { x: SLIDE.mx, y: SLIDE.my, w: 1.85, h: 0.32, label: tagLabel, accent: palette.accent, ink, fonts });
  }

  addTurnTitle(slide, titleParts, {
    x: SLIDE.mx, y: tagLabel ? 1.25 : SLIDE.my + 0.1, w: 4.8, h: 2.3, fontSize: 27, ink, accent: palette.accent, fonts,
  });

  if (leadText) {
    slide.addText(leadText, {
      x: SLIDE.mx, y: 3.7, w: 4.6, h: 1.8, fontFace: fonts.body, fontSize: 13.5, color: muted, wrap: true, lineSpacingMultiple: 1.35,
    });
  }

  const rightX = 6.2;
  const rightW = SLIDE.w - rightX - SLIDE.mx;
  const rowH = Math.min(1.18, (SLIDE.h - SLIDE.my * 2 - 0.5) / Math.max(rows.length, 1));

  rows.forEach((row, i) => {
    const y = SLIDE.my + 0.15 + i * rowH;
    if (i > 0) {
      slide.addShape(pptx.ShapeType.line, { x: rightX, y: y - 0.12, w: rightW, h: 0, line: { color: rule, width: 1 } });
    }
    slide.addText(row.label, { x: rightX, y, w: rightW, h: 0.34, fontFace: fonts.display, fontSize: 14, bold: true, color: ink });
    slide.addText(row.detail, { x: rightX, y: y + 0.36, w: rightW, h: rowH - 0.48, fontFace: fonts.body, fontSize: 12, color: muted, wrap: true });
  });

  addQuietPageNumber(slide, pageNum, muted, fonts);
  return slide;
}

/** 3. Hero KPI Breather */
export function renderHeroKpiBreather(pptx, palette, { figure, caption, footnote = "", pageNum, fonts = FONTS }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.darkBg };
  slide.addText(figure, { x: SLIDE.mx, y: 1.8, w: SLIDE.w - SLIDE.mx * 2, h: 2.1, fontFace: fonts.display, fontSize: 102, bold: true, color: palette.accent });
  slide.addText(caption, { x: SLIDE.mx, y: 4.15, w: 8.6, h: 1.2, fontFace: fonts.display, fontSize: 26, bold: true, color: palette.inkOnDark, wrap: true, lineSpacingMultiple: 1.15 });
  if (footnote) {
    slide.addText(footnote, { x: SLIDE.mx, y: 5.55, w: 8.0, h: 0.6, fontFace: fonts.body, fontSize: 12.5, color: palette.mutedOnDark, wrap: true });
  }
  addQuietPageNumber(slide, pageNum, palette.mutedOnDark, fonts);
  return slide;
}

/** 4. Dot-Matrix / Waffle Chart */
export function renderDotMatrixSlide(pptx, palette, { titleParts, bigPercent, filledDots, totalDots = 40, caption, pageNum, fonts = FONTS }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.darkBg };
  addTurnTitle(slide, titleParts, { x: SLIDE.mx, y: SLIDE.my, w: 10.5, h: 1.1, fontSize: 26, ink: palette.inkOnDark, accent: palette.accent, fonts });
  slide.addText(bigPercent, { x: SLIDE.mx, y: 2.35, w: 4.5, h: 1.5, fontFace: fonts.display, fontSize: 76, bold: true, color: palette.accent });
  slide.addText(caption, { x: SLIDE.mx, y: 4.05, w: 4.3, h: 1.4, fontFace: fonts.body, fontSize: 14, color: palette.mutedOnDark, wrap: true, lineSpacingMultiple: 1.3 });

  const cols = 10, dotSize = 0.36, dotGap = 0.16, startX = 6.2, startY = 2.45;
  for (let i = 0; i < totalDots; i++) {
    const r = Math.floor(i / cols), c = i % cols;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: startX + c * (dotSize + dotGap), y: startY + r * (dotSize + dotGap), w: dotSize, h: dotSize,
      fill: { color: i < filledDots ? palette.accent : palette.darkSurface },
      line: { color: i < filledDots ? palette.accent : palette.ruleOnDark, width: 1 },
    });
  }
  addQuietPageNumber(slide, pageNum, palette.mutedOnDark, fonts);
  return slide;
}

/** 5. Axis-Free Milestone Curve (native vector line segments + labeled nodes) */
export function renderMilestoneCurve(pptx, palette, { titleParts, points, dark = false, pageNum, fonts = FONTS }) {
  const slide = pptx.addSlide();
  const bg = dark ? palette.darkBg : palette.lightBg;
  const ink = dark ? palette.inkOnDark : palette.inkOnLight;
  const muted = dark ? palette.mutedOnDark : palette.mutedOnLight;
  const rule = dark ? palette.ruleOnDark : palette.ruleOnLight;
  slide.background = { color: bg };

  addTurnTitle(slide, titleParts, { x: SLIDE.mx, y: SLIDE.my, w: 10.8, h: 1.15, fontSize: 26, ink, accent: palette.accent, fonts });

  const chartX = SLIDE.mx + 0.4;
  const chartW = SLIDE.w - SLIDE.mx * 2 - 0.8;
  const baseBottomY = 5.6;
  const maxH = 2.7;
  const maxVal = Math.max(...points.map((p) => p.value), 1);
  const coords = points.map((p, i) => ({
    ...p,
    x: chartX + (i * chartW) / Math.max(points.length - 1, 1),
    y: baseBottomY - (p.value / maxVal) * maxH,
  }));

  slide.addShape(pptx.ShapeType.line, { x: SLIDE.mx, y: baseBottomY + 0.3, w: SLIDE.w - SLIDE.mx * 2, h: 0, line: { color: rule, width: 1 } });

  coords.forEach((pt, i) => {
    if (i < coords.length - 1) {
      const next = coords[i + 1];
      slide.addShape(pptx.ShapeType.line, {
        x: Math.min(pt.x, next.x),
        y: Math.min(pt.y, next.y),
        w: Math.abs(next.x - pt.x),
        h: Math.abs(next.y - pt.y),
        flipV: next.y < pt.y,
        line: { color: palette.accent, width: 2.5 },
      });
    }
    const isLast = i === coords.length - 1;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: pt.x - 0.11, y: pt.y - 0.11, w: 0.22, h: 0.22,
      fill: { color: isLast ? palette.accent : bg },
      line: { color: palette.accent, width: 2 },
    });
    slide.addText(pt.displayValue, {
      x: pt.x - 0.65, y: pt.y - 0.5, w: 1.3, h: 0.34, align: "center",
      fontFace: fonts.display, fontSize: 13, bold: true, color: isLast ? palette.accent : ink,
    });
    slide.addText(pt.label, {
      x: pt.x - 0.75, y: baseBottomY + 0.42, w: 1.5, h: 0.35, align: "center",
      fontFace: fonts.mono, fontSize: 10, color: muted,
    });
  });

  addQuietPageNumber(slide, pageNum, muted, fonts);
  return slide;
}

/** 6. Architecture / Hard-Gate Vector Diagram (replaces 4 BLOQUEO boxes) */
export function renderArchitectureGateDiagram(pptx, palette, { titleParts, gates, dark = true, pageNum, fonts = FONTS }) {
  const slide = pptx.addSlide();
  const bg = dark ? palette.darkBg : palette.lightBg;
  const ink = dark ? palette.inkOnDark : palette.inkOnLight;
  const muted = dark ? palette.mutedOnDark : palette.mutedOnLight;
  const rule = dark ? palette.ruleOnDark : palette.ruleOnLight;
  slide.background = { color: bg };

  addTurnTitle(slide, titleParts, { x: SLIDE.mx, y: SLIDE.my, w: 10.8, h: 1.15, fontSize: 26, ink, accent: palette.accent, fonts });

  const spineX = 1.65;
  const topY = 2.3;
  const rowH = 1.12;
  slide.addShape(pptx.ShapeType.line, {
    x: spineX, y: topY + 0.15, w: 0, h: (gates.length - 1) * rowH, line: { color: rule, width: 1.5 },
  });

  gates.slice(0, 4).forEach((g, i) => {
    const cy = topY + i * rowH;
    addConcentricTarget(slide, pptx, { cx: spineX, cy: cy + 0.15, outerR: 0.2, color: palette.accent });
    slide.addShape(pptx.ShapeType.line, { x: spineX + 0.25, y: cy + 0.15, w: 0.75, h: 0, line: { color: rule, width: 1 } });
    slide.addText(g.domain.toUpperCase(), {
      x: 2.8, y: cy - 0.02, w: 2.6, h: 0.34, fontFace: fonts.mono, fontSize: 10, bold: true, color: palette.accent,
    });
    slide.addText(g.rule, {
      x: 5.55, y: cy - 0.04, w: 6.9, h: 0.65, fontFace: fonts.body, fontSize: 13.5, color: ink, wrap: true,
    });
  });

  addQuietPageNumber(slide, pageNum, muted, fonts);
  return slide;
}

/** 7. Horizontal Node-and-Line Timeline */
export function renderNodeTimeline(pptx, palette, { titleParts, steps, activeIndex = 0, dark = false, pageNum, fonts = FONTS }) {
  const slide = pptx.addSlide();
  const bg = dark ? palette.darkBg : palette.lightBg;
  const ink = dark ? palette.inkOnDark : palette.inkOnLight;
  const muted = dark ? palette.mutedOnDark : palette.mutedOnLight;
  const rule = dark ? palette.ruleOnDark : palette.ruleOnLight;
  slide.background = { color: bg };

  addTurnTitle(slide, titleParts, { x: SLIDE.mx, y: SLIDE.my, w: 10.5, h: 1.2, fontSize: 28, ink, accent: palette.accent, fonts });

  const lineY = 3.2, lineW = SLIDE.w - SLIDE.mx * 2;
  slide.addShape(pptx.ShapeType.line, { x: SLIDE.mx, y: lineY, w: lineW, h: 0, line: { color: rule, width: 1.5 } });

  const stepW = lineW / steps.length;
  steps.forEach((step, i) => {
    const x = SLIDE.mx + i * stepW, isActive = i === activeIndex;
    slide.addShape(pptx.ShapeType.ellipse, {
      x, y: lineY - 0.14, w: 0.28, h: 0.28,
      fill: { color: isActive ? palette.accent : bg },
      line: { color: isLastOrActive(isActive) ? palette.accent : ink, width: 2 },
    });
    slide.addText(step.tag || String(i + 1).padStart(2, "0"), {
      x, y: lineY - 0.62, w: stepW - 0.25, h: 0.3, fontFace: fonts.mono, fontSize: 10, bold: true, color: isActive ? palette.accent : muted,
    });
    slide.addText(step.title, { x, y: lineY + 0.35, w: stepW - 0.3, h: 0.55, fontFace: fonts.display, fontSize: 15, bold: true, color: ink, wrap: true });
    slide.addText(step.detail, { x, y: lineY + 0.95, w: stepW - 0.3, h: 1.6, fontFace: fonts.body, fontSize: 12, color: muted, wrap: true, lineSpacingMultiple: 1.3 });
  });

  addQuietPageNumber(slide, pageNum, muted, fonts);
  return slide;
}

function isLastOrActive(flag) { return Boolean(flag); }

/** 8. Clean Hairline Table */
export function renderCleanTable(pptx, palette, { titleParts, headers, rows, colW, highlightCol = 1, pageNum, fonts = FONTS }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.lightBg };
  addTurnTitle(slide, titleParts, { x: SLIDE.mx, y: SLIDE.my, w: 11, h: 1.1, fontSize: 26, ink: palette.inkOnLight, accent: palette.accent, fonts });

  const tableRows = [
    headers.map((h, cIdx) => ({
      text: h,
      options: {
        bold: true, fontFace: fonts.display, fontSize: 11,
        color: cIdx === highlightCol ? palette.inkOnAccent : palette.inkOnDark,
        fill: { color: cIdx === highlightCol ? palette.accent : palette.darkBg },
        margin: [10, 12, 10, 12],
      },
    })),
    ...rows.map((r, rIdx) =>
      r.map((cell, cIdx) => ({
        text: cell,
        options: {
          fontFace: fonts.body, fontSize: 11, bold: cIdx === highlightCol, color: palette.inkOnLight,
          fill: { color: rIdx % 2 === 1 ? palette.lightSurface : palette.lightBg },
          border: [{ pt: 0, color: palette.lightBg }, { pt: 0, color: palette.lightBg }, { pt: 1, color: palette.ruleOnLight }, { pt: 0, color: palette.lightBg }],
          margin: [9, 12, 9, 12],
        },
      }))
    ),
  ];

  slide.addTable(tableRows, { x: SLIDE.mx, y: 2.05, w: SLIDE.w - SLIDE.mx * 2, colW, valign: "middle" });
  addQuietPageNumber(slide, pageNum, palette.mutedOnLight, fonts);
  return slide;
}

/** 9. Asymmetric 2x1 Bento */
export function renderAsymmetricBento(pptx, palette, { titleParts, heroBlock, sideBlocks, pageNum, fonts = FONTS }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.lightBg };
  addTurnTitle(slide, titleParts, { x: SLIDE.mx, y: SLIDE.my, w: 11, h: 1.05, fontSize: 26, ink: palette.inkOnLight, accent: palette.accent, fonts });

  const topY = 2.0, totalH = 4.65, leftW = 6.7, rightX = SLIDE.mx + leftW + 0.3, rightW = SLIDE.w - rightX - SLIDE.mx;
  slide.addShape(pptx.ShapeType.rect, { x: SLIDE.mx, y: topY, w: leftW, h: totalH, fill: { color: palette.darkBg }, line: { color: palette.darkBg, width: 0 } });
  slide.addText(heroBlock.stat || "", { x: SLIDE.mx + 0.45, y: topY + 0.45, w: leftW - 0.9, h: 1.1, fontFace: fonts.display, fontSize: 54, bold: true, color: palette.accent });
  slide.addText(heroBlock.title, { x: SLIDE.mx + 0.45, y: topY + 1.8, w: leftW - 0.9, h: 0.7, fontFace: fonts.display, fontSize: 20, bold: true, color: palette.inkOnDark });
  slide.addText(heroBlock.detail, { x: SLIDE.mx + 0.45, y: topY + 2.55, w: leftW - 0.9, h: 1.6, fontFace: fonts.body, fontSize: 13, color: palette.mutedOnDark, wrap: true, lineSpacingMultiple: 1.3 });

  const halfH = (totalH - 0.3) / 2;
  sideBlocks.slice(0, 2).forEach((blk, idx) => {
    const y = topY + idx * (halfH + 0.3);
    slide.addShape(pptx.ShapeType.rect, { x: rightX, y, w: rightW, h: halfH, fill: { color: palette.lightSurface }, line: { color: palette.ruleOnLight, width: 1 } });
    slide.addText(blk.title, { x: rightX + 0.35, y: y + 0.3, w: rightW - 0.7, h: 0.45, fontFace: fonts.display, fontSize: 15, bold: true, color: palette.inkOnLight });
    slide.addText(blk.detail, { x: rightX + 0.35, y: y + 0.85, w: rightW - 0.7, h: halfH - 1.05, fontFace: fonts.body, fontSize: 12, color: palette.mutedOnLight, wrap: true, lineSpacingMultiple: 1.25 });
  });
  addQuietPageNumber(slide, pageNum, palette.mutedOnLight, fonts);
  return slide;
}

/** 10. Quote / Human Breather Slide (oversized opposing quotes, optional photo) */
export function renderQuoteBreather(pptx, palette, { quote, author, imagePath = null, dark = false, pageNum, fonts = FONTS }) {
  const slide = pptx.addSlide();
  const bg = dark ? palette.darkBg : palette.lightBg;
  const ink = dark ? palette.inkOnDark : palette.inkOnLight;
  const muted = dark ? palette.mutedOnDark : palette.mutedOnLight;
  slide.background = { color: bg };

  if (imagePath) {
    slide.addImage({ path: imagePath, x: 1.0, y: 1.5, w: 3.4, h: 4.5, sizing: { type: "cover", w: 3.4, h: 4.5 } });
  }
  const qx = imagePath ? 5.0 : 1.6;
  const qw = imagePath ? 7.4 : 10.1;

  slide.addText("“", { x: qx - 0.45, y: 1.45, w: 0.8, h: 1.0, fontFace: fonts.display, fontSize: 84, bold: true, color: palette.accent });
  slide.addText(quote, { x: qx, y: 2.35, w: qw, h: 2.3, fontFace: fonts.display, fontSize: 26, bold: true, color: ink, wrap: true, lineSpacingMultiple: 1.2 });
  slide.addText(author, { x: qx, y: 4.95, w: qw, h: 0.4, fontFace: fonts.mono, fontSize: 11, color: muted });
  addQuietPageNumber(slide, pageNum, muted, fonts);
  return slide;
}

/** 11. Consulting Pyramid Columns (McKinsey/BCG style — hairline headers, keyword bolding, ZERO boxes) */
export function renderConsultingColumns(pptx, palette, { titleParts, columns, dark = false, pageNum, fonts = FONTS }) {
  const slide = pptx.addSlide();
  const bg = dark ? palette.darkBg : palette.lightBg;
  const ink = dark ? palette.inkOnDark : palette.inkOnLight;
  const muted = dark ? palette.mutedOnDark : palette.mutedOnLight;
  const rule = dark ? palette.ruleOnDark : palette.ruleOnLight;
  slide.background = { color: bg };

  addTurnTitle(slide, titleParts, { x: SLIDE.mx, y: SLIDE.my, w: 11.2, h: 1.15, fontSize: 27, ink, accent: palette.accent, fonts });

  const cols = columns.slice(0, 3);
  const gap = 0.5;
  const totalW = SLIDE.w - SLIDE.mx * 2;
  const colW = (totalW - gap * (cols.length - 1)) / cols.length;
  const topY = 2.3;

  cols.forEach((col, i) => {
    const x = SLIDE.mx + i * (colW + gap);
    slide.addShape(pptx.ShapeType.line, { x, y: topY, w: colW, h: 0, line: { color: col.highlight ? palette.accent : ink, width: col.highlight ? 2.5 : 1.5 } });
    slide.addText(col.heading, { x, y: topY + 0.18, w: colW, h: 0.5, fontFace: fonts.display, fontSize: 16, bold: true, color: col.highlight ? palette.accent : ink, wrap: true });

    (col.points || []).slice(0, 3).forEach((pt, pIdx) => {
      const py = topY + 0.85 + pIdx * 1.15;
      if (pIdx > 0) {
        slide.addShape(pptx.ShapeType.line, { x, y: py - 0.12, w: colW, h: 0, line: { color: rule, width: 0.75 } });
      }
      slide.addText(
        [
          { text: pt.lead + " ", options: { fontFace: fonts.body, fontSize: 12.5, bold: true, color: ink } },
          { text: pt.body, options: { fontFace: fonts.body, fontSize: 12.5, color: muted } },
        ],
        { x, y: py, w: colW, h: 0.95, wrap: true, valign: "top", lineSpacingMultiple: 1.25 }
      );
    });
  });

  addQuietPageNumber(slide, pageNum, muted, fonts);
  return slide;
}

/** 12. Single-Focus Horizontal Bar Chart (9 gray bars + 1 accent bar, direct labels, zero gridlines) */
export function renderSingleFocusBarChart(pptx, palette, { titleParts, bars, dark = false, pageNum, fonts = FONTS }) {
  const slide = pptx.addSlide();
  const bg = dark ? palette.darkBg : palette.lightBg;
  const ink = dark ? palette.inkOnDark : palette.inkOnLight;
  const muted = dark ? palette.mutedOnDark : palette.mutedOnLight;
  const neutralBar = dark ? palette.darkSurface : palette.ruleOnLight;
  slide.background = { color: bg };

  addTurnTitle(slide, titleParts, { x: SLIDE.mx, y: SLIDE.my, w: 11.0, h: 1.15, fontSize: 27, ink, accent: palette.accent, fonts });

  const list = bars.slice(0, 7);
  const maxVal = Math.max(...list.map((b) => b.value), 1);
  const labelW = 3.2;
  const barMaxW = 6.6;
  const startY = 2.25;
  const rowH = Math.min(0.68, 4.4 / Math.max(list.length, 1));

  list.forEach((b, i) => {
    const y = startY + i * rowH;
    const bw = Math.max(0.25, (b.value / maxVal) * barMaxW);
    slide.addText(b.label, { x: SLIDE.mx, y, w: labelW, h: 0.38, fontFace: fonts.body, fontSize: 12.5, bold: Boolean(b.highlight), color: b.highlight ? ink : muted, valign: "middle" });
    slide.addShape(pptx.ShapeType.rect, {
      x: SLIDE.mx + labelW + 0.25, y: y + 0.06, w: bw, h: 0.26,
      fill: { color: b.highlight ? palette.accent : neutralBar },
      line: { color: b.highlight ? palette.accent : neutralBar, width: 0 },
    });
    slide.addText(b.displayValue, {
      x: SLIDE.mx + labelW + 0.4 + bw, y, w: 1.5, h: 0.38,
      fontFace: fonts.display, fontSize: 13, bold: true, color: b.highlight ? palette.accent : muted, valign: "middle",
    });
  });

  addQuietPageNumber(slide, pageNum, muted, fonts);
  return slide;
}

/** 13. Split-Slide Color Swap (Figma Idea 13 — 50/50 contrasting panels that swap sides on callouts) */
export function renderSplitColorSwap(pptx, palette, { leftTitle, leftBody, rightTitle, rightBody, swap = false, pageNum, speakerNotes = "", fonts = FONTS }) {
  const slide = pptx.addSlide();
  const halfW = SLIDE.w / 2;
  const leftBg = swap ? palette.lightBg : palette.darkBg;
  const leftInk = swap ? palette.inkOnLight : palette.inkOnDark;
  const leftMuted = swap ? palette.mutedOnLight : palette.mutedOnDark;
  const rightBg = swap ? palette.darkBg : palette.lightBg;
  const rightInk = swap ? palette.inkOnDark : palette.inkOnLight;
  const rightMuted = swap ? palette.mutedOnDark : palette.mutedOnLight;

  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: halfW, h: SLIDE.h, fill: { color: leftBg }, line: { color: leftBg, width: 0 } });
  slide.addShape(pptx.ShapeType.rect, { x: halfW, y: 0, w: halfW, h: SLIDE.h, fill: { color: rightBg }, line: { color: rightBg, width: 0 } });

  slide.addText(leftTitle, { x: SLIDE.mx, y: 1.9, w: halfW - SLIDE.mx * 1.6, h: 1.5, fontFace: fonts.display, fontSize: 28, bold: true, color: swap ? leftInk : palette.accent, wrap: true });
  slide.addText(leftBody, { x: SLIDE.mx, y: 3.6, w: halfW - SLIDE.mx * 1.6, h: 2.2, fontFace: fonts.body, fontSize: 14, color: leftMuted, wrap: true, lineSpacingMultiple: 1.35 });

  slide.addText(rightTitle, { x: halfW + SLIDE.mx * 0.8, y: 1.9, w: halfW - SLIDE.mx * 1.6, h: 1.5, fontFace: fonts.display, fontSize: 28, bold: true, color: swap ? palette.accent : rightInk, wrap: true });
  slide.addText(rightBody, { x: halfW + SLIDE.mx * 0.8, y: 3.6, w: halfW - SLIDE.mx * 1.6, h: 2.2, fontFace: fonts.body, fontSize: 14, color: rightMuted, wrap: true, lineSpacingMultiple: 1.35 });

  addQuietPageNumber(slide, pageNum, rightMuted, fonts);
  if (speakerNotes) slide.addNotes(speakerNotes);
  return slide;
}

/** 14. Waterfall Bridge Chart (native vector bridge bars, direct labels, optional source line) */
export function renderWaterfallBridge(pptx, palette, { titleParts, steps, sourceLine = "", dark = false, pageNum, speakerNotes = "", fonts = FONTS }) {
  const slide = pptx.addSlide();
  const bg = dark ? palette.darkBg : palette.lightBg;
  const ink = dark ? palette.inkOnDark : palette.inkOnLight;
  const muted = dark ? palette.mutedOnDark : palette.mutedOnLight;
  const rule = dark ? palette.ruleOnDark : palette.ruleOnLight;
  slide.background = { color: bg };

  addTurnTitle(slide, titleParts, { x: SLIDE.mx, y: SLIDE.my, w: 11.2, h: 1.15, fontSize: 26, ink, accent: palette.accent, fonts });

  let running = 0;
  const computed = steps.map((s) => {
    if (s.type === "total") {
      running = s.value;
      return { ...s, low: 0, high: s.value };
    }
    const low = Math.min(running, running + s.value);
    const high = Math.max(running, running + s.value);
    running += s.value;
    return { ...s, low, high };
  });

  const maxV = Math.max(...computed.map((c) => c.high), 1);
  const baseBottomY = 5.65;
  const maxH = 2.85;
  const areaW = SLIDE.w - SLIDE.mx * 2;
  const slotW = areaW / Math.max(computed.length, 1);
  const barW = Math.min(1.15, slotW * 0.56);

  slide.addShape(pptx.ShapeType.line, { x: SLIDE.mx, y: baseBottomY, w: areaW, h: 0, line: { color: rule, width: 1 } });

  computed.forEach((c, i) => {
    const x = SLIDE.mx + i * slotW + (slotW - barW) / 2;
    const yTop = baseBottomY - (c.high / maxV) * maxH;
    const hBar = Math.max(0.18, ((c.high - c.low) / maxV) * maxH);
    const fill = c.type === "total" ? ink : c.value < 0 ? palette.accent : (dark ? palette.darkSurface : rule);

    slide.addShape(pptx.ShapeType.rect, { x, y: yTop, w: barW, h: hBar, fill: { color: fill }, line: { color: fill, width: 0 } });
    slide.addText(c.displayValue, {
      x: x - 0.2, y: yTop - 0.42, w: barW + 0.4, h: 0.34, align: "center",
      fontFace: fonts.display, fontSize: 12, bold: true, color: c.value < 0 ? palette.accent : ink,
    });
    slide.addText(c.label, {
      x: x - 0.25, y: baseBottomY + 0.14, w: barW + 0.5, h: 0.5, align: "center",
      fontFace: fonts.body, fontSize: 10.5, color: muted, wrap: true,
    });
  });

  if (sourceLine) {
    slide.addText(sourceLine, { x: SLIDE.mx, y: SLIDE.h - 0.52, w: 9.0, h: 0.3, fontFace: fonts.mono, fontSize: 9, color: muted });
  }
  addQuietPageNumber(slide, pageNum, muted, fonts);
  if (speakerNotes) slide.addNotes(speakerNotes);
  return slide;
}

/** 15. Statement Breather Slide (Ines Montani bold 1-sentence impact) */
export function renderStatementSlide(pptx, palette, { titleParts, dark = true, pageNum, speakerNotes = "", fonts = FONTS }) {
  const slide = pptx.addSlide();
  const bg = dark ? palette.darkBg : palette.lightBg;
  const ink = dark ? palette.inkOnDark : palette.inkOnLight;
  const muted = dark ? palette.mutedOnDark : palette.mutedOnLight;
  slide.background = { color: bg };
  addTurnTitle(slide, titleParts, { x: SLIDE.mx, y: 2.2, w: SLIDE.w - SLIDE.mx * 2, h: 3.0, fontSize: 42, ink, accent: palette.accent, fonts });
  addQuietPageNumber(slide, pageNum, muted, fonts);
  if (speakerNotes) slide.addNotes(speakerNotes);
  return slide;
}

/** 16. Minimalist Closing Slide */
export function renderClosingSlide(pptx, palette, { headline, contactLine = "", fonts = FONTS }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.darkBg };
  slide.addText(headline, { x: SLIDE.mx, y: 2.3, w: SLIDE.w - SLIDE.mx * 2, h: 1.8, align: "center", fontFace: fonts.display, fontSize: 62, bold: true, color: palette.inkOnDark });
  if (contactLine) {
    slide.addText(contactLine, { x: SLIDE.mx, y: 4.5, w: SLIDE.w - SLIDE.mx * 2, h: 0.5, align: "center", fontFace: fonts.mono, fontSize: 11, color: palette.accent });
  }
  return slide;
}

/**
 * anti-slop-pptx-kit — PptxGenJS Studio Component Library (v2.0)
 * Drop-in 16:9 graphic-design slide archetypes. Import instead of writing drawCard() loops.
 */

export const SLIDE = { w: 13.333, h: 7.5, mx: 0.8, my: 0.7, gap: 0.35 };

export const PALETTES = {
  OBSIDIAN_CITRINE: {
    darkBg: "0B0C0E",
    darkSurface: "17191D",
    lightBg: "F4F5F3",
    lightSurface: "FFFFFF",
    inkOnDark: "F7F7F5",
    mutedOnDark: "8F949E",
    ruleOnDark: "262930",
    inkOnLight: "121316",
    mutedOnLight: "5C616B",
    ruleOnLight: "E0E2DF",
    accent: "C8D636",
    inkOnAccent: "0B0C0E",
  },
  SWISS_ORANGE: {
    darkBg: "111111",
    darkSurface: "1D1D1D",
    lightBg: "F5F4F0",
    lightSurface: "FFFFFF",
    inkOnDark: "FAF9F6",
    mutedOnDark: "94918B",
    ruleOnDark: "2A2927",
    inkOnLight: "141413",
    mutedOnLight: "63605A",
    ruleOnLight: "E2DFD7",
    accent: "FF4D00",
    inkOnAccent: "FFFFFF",
  },
  INDIGO_BONE: {
    darkBg: "0B1325",
    darkSurface: "14203B",
    lightBg: "F6F5F1",
    lightSurface: "FFFFFF",
    inkOnDark: "FAFAF8",
    mutedOnDark: "919DB5",
    ruleOnDark: "223152",
    inkOnLight: "0B1325",
    mutedOnLight: "586174",
    ruleOnLight: "E3E1D8",
    accent: "F2B53A",
    inkOnAccent: "0B1325",
  },
};

export const FONTS = {
  display: "Montserrat",
  body: "Poppins",
  mono: "Consolas",
};

function addTurnTitle(slide, parts, { x, y, w, h, fontSize = 30, ink, accent }) {
  const runs = parts.map((p) => ({
    text: p.text,
    options: {
      fontFace: FONTS.display,
      fontSize,
      bold: true,
      color: p.accent ? accent : ink,
    },
  }));
  slide.addText(runs, { x, y, w, h, valign: "top", wrap: true, lineSpacingMultiple: 1.08 });
}

function addQuietPageNumber(slide, pageNum, mutedColor) {
  if (!pageNum) return;
  slide.addText(String(pageNum).padStart(2, "0"), {
    x: SLIDE.w - SLIDE.mx - 0.8,
    y: SLIDE.h - 0.52,
    w: 0.8,
    h: 0.3,
    align: "right",
    fontFace: FONTS.mono,
    fontSize: 9,
    color: mutedColor,
  });
}

/** 1. Minimalist Full-Bleed Cover (Dark) */
export function renderCoverSlide(pptx, palette, { titleParts, subtitle, metaLine = "" }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.darkBg };

  if (metaLine) {
    slide.addText(metaLine.toUpperCase(), {
      x: SLIDE.mx,
      y: SLIDE.my,
      w: 8,
      h: 0.3,
      fontFace: FONTS.mono,
      fontSize: 9,
      color: palette.mutedOnDark,
      charSpacing: 2,
    });
  }

  addTurnTitle(slide, titleParts, {
    x: SLIDE.mx,
    y: 2.05,
    w: SLIDE.w - SLIDE.mx * 2 - 1.2,
    h: 2.5,
    fontSize: 48,
    ink: palette.inkOnDark,
    accent: palette.accent,
  });

  slide.addShape(pptx.ShapeType.line, {
    x: SLIDE.mx,
    y: 5.05,
    w: 1.4,
    h: 0,
    line: { color: palette.accent, width: 2.5 },
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: SLIDE.mx,
      y: 5.3,
      w: 7.5,
      h: 0.9,
      fontFace: FONTS.body,
      fontSize: 15,
      color: palette.mutedOnDark,
      wrap: true,
      lineSpacingMultiple: 1.25,
    });
  }
  return slide;
}

/** 2. Editorial Split (Hairline-separated rows on right, bold thesis on left — NO boxes) */
export function renderEditorialSplit(pptx, palette, { titleParts, leadText, rows, dark = false, pageNum }) {
  const slide = pptx.addSlide();
  const bg = dark ? palette.darkBg : palette.lightBg;
  const ink = dark ? palette.inkOnDark : palette.inkOnLight;
  const muted = dark ? palette.mutedOnDark : palette.mutedOnLight;
  const rule = dark ? palette.ruleOnDark : palette.ruleOnLight;
  slide.background = { color: bg };

  addTurnTitle(slide, titleParts, {
    x: SLIDE.mx,
    y: SLIDE.my + 0.1,
    w: 4.8,
    h: 2.4,
    fontSize: 28,
    ink,
    accent: palette.accent,
  });

  if (leadText) {
    slide.addText(leadText, {
      x: SLIDE.mx,
      y: 3.3,
      w: 4.6,
      h: 1.8,
      fontFace: FONTS.body,
      fontSize: 13.5,
      color: muted,
      wrap: true,
      lineSpacingMultiple: 1.35,
    });
  }

  const rightX = 6.2;
  const rightW = SLIDE.w - rightX - SLIDE.mx;
  const rowH = Math.min(1.15, (SLIDE.h - SLIDE.my * 2 - 0.5) / Math.max(rows.length, 1));

  rows.forEach((row, i) => {
    const y = SLIDE.my + 0.15 + i * rowH;
    if (i > 0) {
      slide.addShape(pptx.ShapeType.line, {
        x: rightX,
        y: y - 0.12,
        w: rightW,
        h: 0,
        line: { color: rule, width: 1 },
      });
    }
    slide.addText(row.label, {
      x: rightX,
      y,
      w: rightW,
      h: 0.34,
      fontFace: FONTS.display,
      fontSize: 14,
      bold: true,
      color: ink,
    });
    slide.addText(row.detail, {
      x: rightX,
      y: y + 0.36,
      w: rightW,
      h: rowH - 0.48,
      fontFace: FONTS.body,
      fontSize: 12,
      color: muted,
      wrap: true,
    });
  });

  addQuietPageNumber(slide, pageNum, muted);
  return slide;
}

/** 3. Hero KPI Breather (1 massive standalone metric, zero cards) */
export function renderHeroKpiBreather(pptx, palette, { figure, caption, footnote = "", pageNum }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.darkBg };

  slide.addText(figure, {
    x: SLIDE.mx,
    y: 1.8,
    w: SLIDE.w - SLIDE.mx * 2,
    h: 2.1,
    fontFace: FONTS.display,
    fontSize: 104,
    bold: true,
    color: palette.accent,
  });

  slide.addText(caption, {
    x: SLIDE.mx,
    y: 4.15,
    w: 8.6,
    h: 1.2,
    fontFace: FONTS.display,
    fontSize: 26,
    bold: true,
    color: palette.inkOnDark,
    wrap: true,
    lineSpacingMultiple: 1.15,
  });

  if (footnote) {
    slide.addText(footnote, {
      x: SLIDE.mx,
      y: 5.55,
      w: 8.0,
      h: 0.6,
      fontFace: FONTS.body,
      fontSize: 12.5,
      color: palette.mutedOnDark,
      wrap: true,
    });
  }

  addQuietPageNumber(slide, pageNum, palette.mutedOnDark);
  return slide;
}

/** 4. Dot-Matrix / Waffle Chart (10x4 circles, zero clutter) */
export function renderDotMatrixSlide(pptx, palette, { titleParts, bigPercent, filledDots, totalDots = 40, caption, pageNum }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.darkBg };

  addTurnTitle(slide, titleParts, {
    x: SLIDE.mx,
    y: SLIDE.my,
    w: 10.5,
    h: 1.1,
    fontSize: 26,
    ink: palette.inkOnDark,
    accent: palette.accent,
  });

  slide.addText(bigPercent, {
    x: SLIDE.mx,
    y: 2.35,
    w: 4.5,
    h: 1.5,
    fontFace: FONTS.display,
    fontSize: 78,
    bold: true,
    color: palette.accent,
  });

  slide.addText(caption, {
    x: SLIDE.mx,
    y: 4.05,
    w: 4.3,
    h: 1.4,
    fontFace: FONTS.body,
    fontSize: 14,
    color: palette.mutedOnDark,
    wrap: true,
    lineSpacingMultiple: 1.3,
  });

  const cols = 10;
  const dotSize = 0.36;
  const dotGap = 0.16;
  const startX = 6.2;
  const startY = 2.45;

  for (let i = 0; i < totalDots; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: startX + c * (dotSize + dotGap),
      y: startY + r * (dotSize + dotGap),
      w: dotSize,
      h: dotSize,
      fill: { color: i < filledDots ? palette.accent : palette.darkSurface },
      line: { color: i < filledDots ? palette.accent : palette.ruleOnDark, width: 1 },
    });
  }

  addQuietPageNumber(slide, pageNum, palette.mutedOnDark);
  return slide;
}

/** 5. Horizontal Node-and-Line Timeline (replaces PASO 01/02/03 box spam) */
export function renderNodeTimeline(pptx, palette, { titleParts, steps, activeIndex = 0, dark = false, pageNum }) {
  const slide = pptx.addSlide();
  const bg = dark ? palette.darkBg : palette.lightBg;
  const ink = dark ? palette.inkOnDark : palette.inkOnLight;
  const muted = dark ? palette.mutedOnDark : palette.mutedOnLight;
  const rule = dark ? palette.ruleOnDark : palette.ruleOnLight;
  slide.background = { color: bg };

  addTurnTitle(slide, titleParts, {
    x: SLIDE.mx,
    y: SLIDE.my,
    w: 10.5,
    h: 1.2,
    fontSize: 28,
    ink,
    accent: palette.accent,
  });

  const lineY = 3.2;
  const lineW = SLIDE.w - SLIDE.mx * 2;
  slide.addShape(pptx.ShapeType.line, {
    x: SLIDE.mx,
    y: lineY,
    w: lineW,
    h: 0,
    line: { color: rule, width: 1.5 },
  });

  const stepW = lineW / steps.length;
  steps.forEach((step, i) => {
    const x = SLIDE.mx + i * stepW;
    const isActive = i === activeIndex;
    slide.addShape(pptx.ShapeType.ellipse, {
      x,
      y: lineY - 0.14,
      w: 0.28,
      h: 0.28,
      fill: { color: isActive ? palette.accent : bg },
      line: { color: isActive ? palette.accent : ink, width: 2 },
    });

    slide.addText(step.tag || String(i + 1).padStart(2, "0"), {
      x,
      y: lineY - 0.62,
      w: stepW - 0.25,
      h: 0.3,
      fontFace: FONTS.mono,
      fontSize: 10,
      bold: true,
      color: isActive ? palette.accent : muted,
    });

    slide.addText(step.title, {
      x,
      y: lineY + 0.35,
      w: stepW - 0.3,
      h: 0.55,
      fontFace: FONTS.display,
      fontSize: 15,
      bold: true,
      color: ink,
      wrap: true,
    });

    slide.addText(step.detail, {
      x,
      y: lineY + 0.95,
      w: stepW - 0.3,
      h: 1.6,
      fontFace: FONTS.body,
      fontSize: 12,
      color: muted,
      wrap: true,
      lineSpacingMultiple: 1.3,
    });
  });

  addQuietPageNumber(slide, pageNum, muted);
  return slide;
}

/** 6. Clean Hairline Table (horizontal rules only, highlighted winning column) */
export function renderCleanTable(pptx, palette, { titleParts, headers, rows, colW, highlightCol = 1, pageNum }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.lightBg };

  addTurnTitle(slide, titleParts, {
    x: SLIDE.mx,
    y: SLIDE.my,
    w: 11,
    h: 1.1,
    fontSize: 26,
    ink: palette.inkOnLight,
    accent: palette.accent,
  });

  const tableRows = [
    headers.map((h, cIdx) => ({
      text: h,
      options: {
        bold: true,
        fontFace: FONTS.display,
        fontSize: 11,
        color: cIdx === highlightCol ? palette.inkOnAccent : palette.inkOnDark,
        fill: { color: cIdx === highlightCol ? palette.accent : palette.darkBg },
        margin: [10, 12, 10, 12],
      },
    })),
    ...rows.map((r, rIdx) =>
      r.map((cell, cIdx) => ({
        text: cell,
        options: {
          fontFace: FONTS.body,
          fontSize: 11,
          bold: cIdx === highlightCol,
          color: palette.inkOnLight,
          fill: { color: rIdx % 2 === 1 ? palette.lightSurface : palette.lightBg },
          border: [
            { pt: 0, color: palette.lightBg },
            { pt: 0, color: palette.lightBg },
            { pt: 1, color: palette.ruleOnLight },
            { pt: 0, color: palette.lightBg },
          ],
          margin: [9, 12, 9, 12],
        },
      }))
    ),
  ];

  slide.addTable(tableRows, {
    x: SLIDE.mx,
    y: 2.05,
    w: SLIDE.w - SLIDE.mx * 2,
    colW,
    valign: "middle",
  });

  addQuietPageNumber(slide, pageNum, palette.mutedOnLight);
  return slide;
}

/** 7. Asymmetric 2x1 Bento (1 dominant hero block + 2 compact supporting blocks) */
export function renderAsymmetricBento(pptx, palette, { titleParts, heroBlock, sideBlocks, pageNum }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.lightBg };

  addTurnTitle(slide, titleParts, {
    x: SLIDE.mx,
    y: SLIDE.my,
    w: 11,
    h: 1.05,
    fontSize: 26,
    ink: palette.inkOnLight,
    accent: palette.accent,
  });

  const topY = 2.0;
  const totalH = 4.65;
  const leftW = 6.7;
  const rightX = SLIDE.mx + leftW + 0.3;
  const rightW = SLIDE.w - rightX - SLIDE.mx;

  slide.addShape(pptx.ShapeType.rect, {
    x: SLIDE.mx,
    y: topY,
    w: leftW,
    h: totalH,
    fill: { color: palette.darkBg },
    line: { color: palette.darkBg, width: 0 },
  });
  slide.addText(heroBlock.stat || "", {
    x: SLIDE.mx + 0.45,
    y: topY + 0.45,
    w: leftW - 0.9,
    h: 1.1,
    fontFace: FONTS.display,
    fontSize: 54,
    bold: true,
    color: palette.accent,
  });
  slide.addText(heroBlock.title, {
    x: SLIDE.mx + 0.45,
    y: topY + 1.8,
    w: leftW - 0.9,
    h: 0.7,
    fontFace: FONTS.display,
    fontSize: 20,
    bold: true,
    color: palette.inkOnDark,
  });
  slide.addText(heroBlock.detail, {
    x: SLIDE.mx + 0.45,
    y: topY + 2.55,
    w: leftW - 0.9,
    h: 1.6,
    fontFace: FONTS.body,
    fontSize: 13,
    color: palette.mutedOnDark,
    wrap: true,
    lineSpacingMultiple: 1.3,
  });

  const halfH = (totalH - 0.3) / 2;
  sideBlocks.slice(0, 2).forEach((blk, idx) => {
    const y = topY + idx * (halfH + 0.3);
    slide.addShape(pptx.ShapeType.rect, {
      x: rightX,
      y,
      w: rightW,
      h: halfH,
      fill: { color: palette.lightSurface },
      line: { color: palette.ruleOnLight, width: 1 },
    });
    slide.addText(blk.title, {
      x: rightX + 0.35,
      y: y + 0.3,
      w: rightW - 0.7,
      h: 0.45,
      fontFace: FONTS.display,
      fontSize: 15,
      bold: true,
      color: palette.inkOnLight,
    });
    slide.addText(blk.detail, {
      x: rightX + 0.35,
      y: y + 0.85,
      w: rightW - 0.7,
      h: halfH - 1.05,
      fontFace: FONTS.body,
      fontSize: 12,
      color: palette.mutedOnLight,
      wrap: true,
      lineSpacingMultiple: 1.25,
    });
  });

  addQuietPageNumber(slide, pageNum, palette.mutedOnLight);
  return slide;
}

/** 8. Minimalist Closing Slide */
export function renderClosingSlide(pptx, palette, { headline, contactLine = "" }) {
  const slide = pptx.addSlide();
  slide.background = { color: palette.darkBg };

  slide.addText(headline, {
    x: SLIDE.mx,
    y: 2.3,
    w: SLIDE.w - SLIDE.mx * 2,
    h: 1.8,
    align: "center",
    fontFace: FONTS.display,
    fontSize: 64,
    bold: true,
    color: palette.inkOnDark,
  });

  if (contactLine) {
    slide.addText(contactLine, {
      x: SLIDE.mx,
      y: 4.5,
      w: SLIDE.w - SLIDE.mx * 2,
      h: 0.5,
      align: "center",
      fontFace: FONTS.mono,
      fontSize: 11,
      color: palette.accent,
    });
  }
  return slide;
}

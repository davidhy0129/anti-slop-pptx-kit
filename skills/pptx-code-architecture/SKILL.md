---
name: pptx-code-architecture
description: Engineering architecture for programmatic PptxGenJS and python-pptx generation: Slide Masters, centralized design tokens, dynamic grid math, overflow protection, and headless LibreOffice PDF/PNG visual QA loops.
---

# Programmatic PPTX Code Architecture (`PptxGenJS` & `python-pptx`)

Generating `.pptx` files via code often produces overlapping text, clipped tables, or inconsistent margins when coordinates are hardcoded per slide. Follow this modular architecture.

## 1. Modular Project Structure

Never put 1,000 lines of slide coordinates into one script. Separate data, tokens, masters, and layout components:

```text
deck-project/
├── data/          # Structured JSON/TS/Python slide payloads (Action Titles, metrics, tables)
├── styles/        # Single source of truth: HEX palette, opacity ramps, font names, safe margins
├── templates/     # Base .pptx master template (for python-pptx) or master definitions (PptxGenJS)
├── components/    # Reusable slide builders (coverSlide, heroKpiSlide, dotMatrixSlide, tableSlide)
└── build-deck.ts  # (or build_deck.py) Orchestrates slide sequence + exports .pptx
```

---

## 2. Foundation Rules (`PptxGenJS` & `python-pptx`)

### Always Use Slide Masters / Templates
- **PptxGenJS:** Call `pptx.defineSlideMaster({ title: "MASTER_DARK", background: { color: TOKENS.dark }, objects: [...] })` and `MASTER_LIGHT` so slide numbers, hairline rules, and safe margins live in one place.
- **python-pptx:** Load a clean 16:9 (`13.333" × 7.5"`) base `.pptx` template or configure slide master placeholders rather than redrawing chrome manually on every slide.

### Dynamic Grid Math (Zero Magic Coordinates)
Compute column positions from constants:
```js
const SLIDE = { w: 13.333, h: 7.5, marginX: 0.75, marginY: 0.65, gap: 0.35 };
const contentW = SLIDE.w - SLIDE.marginX * 2;
const colW = (cols, span = 1, totalCols = 12) =>
  ((contentW - SLIDE.gap * (totalCols - 1)) / totalCols) * span + SLIDE.gap * (span - 1);
const colX = (colIndex, totalCols = 12) =>
  SLIDE.marginX + colIndex * ((contentW - SLIDE.gap * (totalCols - 1)) / totalCols + SLIDE.gap);
```

### Text Wrapping & Overflow Protection
- **python-pptx:** Always set `tf.word_wrap = True` and explicit `margin_left / margin_right / margin_top / margin_bottom`. Estimate line count from character length vs box width and cap bullets (`<= 15 words`) so text never collides with lower elements.
- **PptxGenJS:** Always specify `w`, `h`, `valign: "top"`, `wrap: true`, and `shrinkText: false` (adjust copy instead of letting PowerPoint auto-shrink body text below `12pt`).
- **Tables:** Always pass explicit `colW` arrays (`[2.8, 3.2, 2.0, 2.0]`) and explicit `margin` padding inside every cell.
- **Read-vs-Speak & Source Grounding:** Pass `speakerNotes` / `speaker_notes` (60–100 word talking points, legal citations, Q&A) into PowerPoint's native notes slide, and pass `sourceLine` on data slides so every chart cites its exact origin.

---

## 3. Mandatory Headless Visual QA & Pre-Send Gate

Because code cannot show visual overlaps in stdout, **always render and inspect** before delivering:
1. Run static code audit: `node scripts/audit-pptx-code.mjs .`
2. Convert `.pptx` -> `.pdf` -> `.png` using headless LibreOffice + `pdftoppm` (when installed):
   ```bash
   soffice --headless --convert-to pdf output.pptx
   pdftoppm -png -r 150 output.pdf slide_preview
   ```
3. **Thumbnail View Test & Visual Inspection:** Check all rendered PNGs together at thumbnail scale for:
   - Text overlapping shapes, truncated labels (`"..."`), or overflowing slide margins.
   - Visually identical consecutive slides (break up any 2+ identical layouts in a row).
   - Missing custom fonts falling back to Arial/Calibri or unexpected line-wrap shifts.
   - Cramped margins (`< 0.6"`), missing axis-break markers on non-zero baselines, or ungrounded stats.
4. **Data Governance:** Never send unapproved PII, confidential financials, or client secrets to public AI web tools. Fix any visual defect in `styles/` or `components/` and re-render until clean.

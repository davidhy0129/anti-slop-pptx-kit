# Workflow: Create a Studio-Grade Presentation (`PDF` + `PPTX`) from Scratch (`v17.0`)

Follow `agents/orchestrator.md` strictly in 6 phases. Never jump directly to coding.

## Phase 1 — Narrative & Density (`agents/deck-narrative-strategist.md`)
- Define 8–14 slides tailored to the user's prompt density.
- Assign 1 clear takeaway + 1 distinct layout archetype per slide (never repeat the same layout on adjacent slides).

## Phase 2 — Art Direction, Colorimetry & Typography
- **`agents/slide-art-director.md`:** Write 3 visual metaphors and pick 1 bespoke moodboard.
- **`agents/color-contrast-specialist.md`:** Build a 60-30-10 + chapter-shift palette and verify every pair with `assertContrast()` (`>= 4.5:1` body, `>= 3.0:1` large display).
- **`agents/typography-spacing-specialist.md`:** Choose 2 harmonious industry fonts (never `Inter`/`Arial`/`Calibri`/`Roboto`/`Space Grotesk`), leading (`1.4–1.6` body, `1.05–1.25` display), and `4/8/16/24/32/48 px` padding.

## Phase 3 — Real Photography, PNG Icons & Visual Elements (`agents/imagery-elements-specialist.md`)
- Include real industry photography (`sizing: { type: "cover" }` / CSS `object-fit: cover`, `16:9`, `4:3`, `1:1`, `3:4`, `4:5`) — never stretch images and never deliver a 100% text-only deck.
- Render custom vector icons to `.png` via `renderSvgIconsToPng()`.

## Phase 4 — Layout Organization (`agents/layout-organizer.md`)
- Use `LAYOUT_WIDE` (`13.333" × 7.5"`), borderless tonal blocks (`line: { width: 0 }` / `border: none`), translucent background shapes (`82–92%` transparency), and zero overlapping text boxes.

## Phase 5 — Dual Build (`HTML -> PDF + PNGs` and `PPTX`)
1. Write `deck.html` (`@page { size: 13.333in 7.5in; margin: 0; }`) and run:
   ```bash
   node scripts/render-deck-pdf-and-pngs.mjs deck.html <Deck>.pdf qa-slides
   ```
2. Write the PPTX builder importing `createDeck`, `addTextBox`, `addFlatShape`, `addTranslucentAccent`, `assertContrast`, `renderSvgIconsToPng`, and `cleanChartOptions` from `./helpers/pptx-primitives.mjs`, and generate `<Deck>.pptx`.

## Phase 6 — Audit & Visual QA Gate (`agents/deck-auditor.md`)
1. Run `node scripts/audit-pptx-code.mjs .` (`exit 0`).
2. Run `node scripts/validate-pptx.mjs <Deck>.pptx` (`exit 0`).
3. Visually inspect `qa-slides/slide-*.png` to confirm zero overlaps, zero stretched images, and crisp typography before delivering **both** `<Deck>.pdf` and `<Deck>.pptx`.

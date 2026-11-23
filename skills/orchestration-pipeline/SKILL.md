---
name: orchestration-pipeline
description: Mandatory 6-phase multi-agent orchestration workflow for anti-slop-pptx-kit. Prevents skipping colorimetry, WCAG contrast, typography, real imagery, layout organization, or PPTX validation.
---

# Orchestration Pipeline (`anti-slop-pptx-kit` v16.0)

Whenever a user asks for a presentation, **never** jump straight into generating `.mjs` code. Execute these 6 phases in order:

## Phase 1: Narrative & Density (`agents/deck-narrative-strategist.md`)
- Analyze the prompt's depth and audience. Choose **8–14 slides** for rich business/educational/brand decks (never 6 bare slides).
- Assign each slide a unique layout archetype (Cover, Timeline, Split Photo + Story, Native Chart + Hero Metric, Editorial Comparison, Process/Pillars, Centered Quote, Closing).

## Phase 2: Art Direction, Colorimetry & Typography
- **`agents/slide-art-director.md`:** Write 3 visual metaphors and select 1 bespoke Creative Brief tailored to the industry.
- **`agents/color-contrast-specialist.md`:** Build a 60-30-10 + chapter-shift palette and list every text/surface pair to pass `assertContrast()`.
- **`agents/typography-spacing-specialist.md`:** Select 2 harmonious industry fonts (never `Inter`/`Arial`/`Calibri`/`Roboto`/`Space Grotesk`), leading (`1.4–1.6` body, `1.05–1.25` display), and padding scale (`4/8/16/24/32/48 px`).

## Phase 3: Imagery, PNG Icons & Elements (`agents/imagery-elements-specialist.md`)
- Generate or stage real `.jpg`/`.png` photography (`16:9` cover, `4:3` split, `1:1` square/circle) — **never** build a 100% flat text-only deck.
- Render custom vector icons to `.png` via `renderSvgIconsToPng()`.

## Phase 4: Spatial Organization (`agents/layout-organizer.md`)
- Lay out all coordinates for `13.333" × 7.5"` (`LAYOUT_WIDE`), safe margins `0.75"–0.9"`, `valign: "top"`, and `>= 0.2"` clearance between headings and body text.

## Phase 5: Build (`agents/pptx-code-builder.md`)
- Use `createDeck()`, `addTextBox()`, `addFlatShape()`, `addTranslucentAccent()`, `assertContrast()`, `renderSvgIconsToPng()`, and `cleanChartOptions()`.

## Phase 6: Audit & QA Gate (`agents/deck-auditor.md`)
- Run `node scripts/audit-pptx-code.mjs .` AND `node scripts/validate-pptx.mjs <deck.pptx>`. Both must exit `0` with `0 CRITICAL` errors.

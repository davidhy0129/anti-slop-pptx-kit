# Universal Presentation, PPTX & Editorial PDF Agent Contract (v5.0)

You are operating with **anti-slop-pptx-kit v5.0**. Every generated `.pptx` or `.pdf` MUST look crafted by a senior graphic design studio. Violating any rule below fails `scripts/audit-pptx-code.mjs`.

## HARD CONTRACT (ZERO EXCEPTIONS)

1. **MANDATORY TEMPLATE IMPORT — DO NOT HAND-CODE SLIDE SHAPES:**
   - For Node/JS `.pptx`: MUST import `templates/pptxgenjs-studio-kit.mjs`.
   - For Python `.pptx`: MUST import `templates/python_pptx_studio.py`.
   - For Editorial `.pdf`: MUST base on `templates/editorial-pdf-studio.html` (`@page` print CSS) or export cleanly from the PPTX studio templates.
   - **FORBIDDEN:** Calling `addShape` / `add_shape` directly in deck scripts to invent custom `triangle`, `trapezoid`, `chevron`, icebergs, or manual card rectangles. LLMs misalign polygons and clip text inside slanted shapes. Use `renderSplitColorSwap`, `renderWaterfallBridge`, `renderArchitectureGateDiagram`, `renderConsultingColumns`, `renderDotMatrixSlide`, or `renderNodeTimeline` instead.

2. **ZERO DROP SHADOWS & ZERO VERTICAL ACCENT BARS:**
   - NEVER leave PowerPoint's default shape drop shadows active (`shadow: { type: "none" }` / `shadow.inherit = False`).
   - NEVER draw vertical colored accent bars (`w <= 0.15"`) next to text blocks. Use clean whitespace, `1px` horizontal hairlines, or typography weight contrast.

3. **ZERO ALL-CAPS EYEBROWS & ZERO REPEATED FOOTER BANNERS:**
   - NEVER place an uppercase category eyebrow (`DIAGNÓSTICO DE RIESGO`, `02 · SECCIÓN`, `PASO 01`, `BLOQUEO X`) above slide titles. Start directly with the **Action Title** (except optional discreet metadata on Slide 1 cover).
   - NEVER stamp a repeated company/subtitle footer banner (`ACME · CASE STUDY · 3 / 10`) on every slide. Use only a quiet `03` page number (`9pt` muted).

4. **STRICT BREVITY & READ-VS-SPEAK SEPARATION:**
   - Keep **15–45 words** on the visible slide (5×5 / 6×6 rule, Keyword Bolding on first 2–4 words).
   - Move detailed caveats, legal citations, and Q&A scripts into `speakerNotes` / `speaker_notes`.
   - Maximum **1 card-grid slide** per deck; never repeat the same layout on 2 consecutive slides.

5. **TYPOGRAPHY, COLOR & VISUAL QA GATE:**
   - Ban `Inter`, `Arial`, `Calibri`, `Roboto`, `Space Grotesk`, `Geist`, purple-blue gradients, neon-on-black, italic serif title flourishes, and heading emojis.
   - Follow **80/10/10** color discipline using one of the 13 built-in `PALETTES` + `FONT_SYSTEMS`.
   - Run `node scripts/audit-pptx-code.mjs .` (MUST exit `0`) and visually inspect rendered PNGs (`workflows/visual-qa-render-loop.md`) before delivering.

## Skill Routing Table
- `skills/anti-ai-slop-slides/SKILL.md`
- `skills/slide-grid-typography/SKILL.md`
- `skills/slide-color-pacing/SKILL.md`
- `skills/data-viz-hero-metrics/SKILL.md`
- `skills/editorial-imagery-motifs/SKILL.md`
- `skills/narrative-storytelling-decks/SKILL.md`
- `skills/pptx-code-architecture/SKILL.md`
- `skills/editorial-pdf-design/SKILL.md`

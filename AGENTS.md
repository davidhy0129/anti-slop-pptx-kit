# Universal Presentation & PPTX Design Engineering Instructions (v2.0)

You are operating with **anti-slop-pptx-kit** — a strict studio-grade presentation design and programmatic PPTX (`PptxGenJS` / `python-pptx`) engineering kit.

## HARD ANTI-SLOP CONTRACT (VIOLATIONS FAIL AUDIT)

1. **BAN THE "CARD-GRID LOOP" (THE #1 AI GIVEAWAY):**
   - **NEVER** build a deck where 3+ slides use `forEach`/`for` loops to stamp 3, 4, 6, or 7 identical bordered/filled rectangle cards (`01..07`, `PASO 01..03`, `BLOQUEO X`).
   - **Maximum 1 card-grid slide in an entire 10–12 slide deck.** Every other slide MUST use a distinct visual archetype (Editorial Split, Giant Standalone KPI, Dot-Matrix Chart, Axis-Free Curve, Horizontal Node Timeline, Borderless Comparison Table, Asymmetric 2×1 Bento, Quote Breather, Minimalist Closing).
   - **Zero consecutive slides** may share the same layout structure or background polarity if avoidable.

2. **BAN ALL EYEBROW CHROME & REPEATED HEADERS/FOOTERS:**
   - **NEVER** put `02 · SECTION NAME`, `03 · BUSINESS COMPLEXITY`, `PASO 01`, `BLOQUEO FINANCIERO`, or colored pill badges above slide titles.
   - **NEVER** stamp a repeated company/subtitle banner (`ACME CORP | INTERNAL DECK | 04 / 12`) across every slide. Use at most a whisper-quiet slide number (`04`) at 35% opacity.

3. **STRICT SLIDE WORD BUDGET (MAX 35–50 WORDS PER VISUAL SLIDE):**
   - Slides are visual anchors, not Word documents. Cap each block to `1–2` crisp lines (`6–14` words).
   - Never dump 6 modules × 20 words onto one slide. Compress into a visual architecture diagram, a clean table, or split across focused slides.

4. **USE THE STUDIO COMPONENT TEMPLATES — DO NOT INVENT `drawCard()`:**
   - Import and use `templates/pptxgenjs-studio-kit.mjs` (Node) or `templates/python_pptx_studio.py` (Python), which provide 10 non-AI graphic-design archetypes (`renderCoverSlide`, `renderEditorialSplit`, `renderHeroKpiBreather`, `renderDotMatrixSlide`, `renderMilestoneCurve`, `renderNodeTimeline`, `renderCleanTable`, `renderAsymmetricBento`, `renderQuoteBreather`, `renderClosingSlide`).

5. **TYPOGRAPHY, COLOR & VISUAL QA:**
   - Ban `Inter`, `Arial`, `Calibri`, `Roboto`, `Space Grotesk`, `Geist`, purple-blue gradients, neon-on-black, glassmorphism, and heading emojis (`🚀`, `✨`).
   - Enforce **5x–10x scale contrast** (`56–110pt` hero figures vs `12–14pt` body), flush-left alignment, **35–55% negative space**, and **60-30-10 palettes** with 4-step opacity ramps (`100%/60%/30%/10%`).
   - Always run `node scripts/audit-pptx-code.mjs .` (must exit `0`) and visually inspect rendered PNGs (`workflows/visual-qa-render-loop.md`) before delivering.

## Skill Routing Table

| Domain | Skill Path |
|---|---|
| Removing AI slide giveaways & card-grid loops | `skills/anti-ai-slop-slides/SKILL.md` |
| Grids, typography, scale, negative space | `skills/slide-grid-typography/SKILL.md` |
| Color palettes, opacity ramps & pacing | `skills/slide-color-pacing/SKILL.md` |
| Charts, hero KPIs, dot-matrix & tables | `skills/data-viz-hero-metrics/SKILL.md` |
| Cutouts, masking, photos & studio motifs | `skills/editorial-imagery-motifs/SKILL.md` |
| PptxGenJS / python-pptx templates & visual QA | `skills/pptx-code-architecture/SKILL.md` |
| Deck structure & Action Title narrative | `skills/narrative-storytelling-decks/SKILL.md` |

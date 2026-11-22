---
name: anti-ai-slop-slides
description: Eliminates tell-tale "AI-generated presentation" giveaways (repetitive card-grid loops, NN · EYEBROW labels, PASO 01 boxes, purple-blue gradients, emoji headings, bullet walls) and enforces studio layout diversity.
---

# Anti-AI-Slop Slide Design (v2.0)

The #1 reason AI presentations look amateur is **not just color or fonts** — it is **structural monotony**: stamping the same `drawCard()` rectangle 3, 4, 6, or 7 times on every slide with `01..07` numbers and `02 · SECTION` eyebrows.

## 1. The AI Slide Blacklist (Strictly Forbidden)

### Structural Giveaways (Highest Priority)
- **The Card-Grid Loop:** Putting 4 boxes on Slide 2, 7 boxes on Slide 3, 4 boxes on Slide 5, 6 boxes on Slide 7, 4 boxes on Slide 8, 3 `PASO 01–03` boxes on Slide 11, and 4 `01–04` boxes on Slide 12. **Max 1 card-grid slide per deck.**
- **Eyebrow Prefixes:** `02 · DIAGNÓSTICO OPERATIVO`, `03 · COMPLEJIDAD`, `BLOQUEO FINANCIERO`, `PASO 01`, `● INFORME Q3`. Delete all numbered/dot eyebrow chrome above titles.
- **Repeated Banner Footers:** Stamping `COMPANY S.A.S. | DECK SUBTITLE | 04 / 12` on every slide. Use at most a subtle `04` page number at 35% opacity.
- **Dense Text-in-Boxes:** Putting 80–120 words across 4–6 cards on one slide. Cap visual slides to **35–50 words total**.

### Color, Typography & Clutter Giveaways
- Purple-to-blue gradients (`#6366F1` -> `#8B5CF6`), neon-on-black glow, or glassmorphism KPI boxes.
- Default fonts (`Inter`, `Arial`, `Calibri`, `Roboto`, `Space Grotesk`, `Geist`).
- Emojis on headings or bullets (`🚀`, `✨`, `💡`, `🎯`).

---

## 2. How Graphic Designers Structure Those Exact Slides Instead

Instead of stamping 4–7 boxes on every slide, map each content type to a **distinct studio archetype**:

| What you want to show | AI Slop (DON'T) | Studio Graphic Design (DO) |
|---|---|---|
| **3–4 problems / pains** | 4 bordered boxes with titles + paragraphs | **Editorial Split:** Bold Action Title left + 1 sharp visual/callout stat right, or 3 borderless flush-left rows separated by `1px` hairlines |
| **7 business lines / services** | 7 numbered cards (`01`..`07`) in a grid | **Typographic Index / Spectrum Strip:** Oversized statement + clean 2-column hairline index with generous whitespace |
| **4 security / compliance gates** | 4 identical `BLOQUEO X` pill cards | **Architecture Gate Diagram / Node Matrix:** Horizontal or vertical flow with `1px` connector lines, concentric nodes, and 5-word labels |
| **3-step roadmap** | 3 equal `PASO 01 / 02 / 03` boxes | **Horizontal Node Timeline:** Single `1px` hairline across the slide with 3 glowing accent nodes and concise captions below |
| **10–20 year retention / big metric** | Small number inside a card + 4 sub-cards | **Hero KPI Breather:** Matte dark slide, **1 giant `100pt` number** (`10–20 años`), 1-line subtitle, zero boxes |
| **Competitor comparison** | Heavy 4-column grid with thick borders | **Borderless Hairline Table:** Horizontal `1px` dividers only, subtle highlight tint on your column, right-aligned numbers |

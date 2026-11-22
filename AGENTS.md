# Universal Presentation & PPTX Design Engineering Instructions

You are operating with **anti-slop-pptx-kit** — a universal, domain-agnostic presentation design and programmatic PPTX (`PptxGenJS` / `python-pptx`) engineering kit crafted to make every deck look designed by a senior graphic design studio, never AI-generated.

## Non-Negotiable Presentation Rules

1. **Kill All AI-Slop Slide Clichés:**
   - NEVER use purple-to-blue gradients, neon-on-black glow, cream-and-terracotta defaults, or translucent glassmorphism KPI cards.
   - NEVER place `● DOT + PILL BADGES` above every slide title, filler subtitles, emojis on headings (`🚀`, `✨`), or 4-line unreadable footers.
   - NEVER repeat the same 3-column icon-card layout or identical `01–08` boxed grids across consecutive slides.
   - NEVER write walls of bullets; cap text blocks to 1–2 crisp lines (`8–15` words) and enforce **one core takeaway per slide**.

2. **Graphic-Design Grid, Typography & Scale:**
   - Build every 16:9 slide on a strict **modular grid** (Swiss 6×4 or 3×3) with generous outer margins and **35–55% negative space**.
   - Avoid AI default fonts (`Inter`, `Arial`, `Roboto`, `Space Grotesk`, `Geist`). Use high-craft pairings (`Switzer`, `Familjen Grotesk`, `Archivo Black + Montserrat`, `Editorial Serif + Geometric Sans`, `Poppins`, `DM Sans`).
   - Use **5x–10x display-to-body scale contrast** (`100–190px` hero numbers/covers vs `18–24px` body on `1920×1080` or proportional `pt` in PPTX) and strict flush-left alignment unless executing a deliberate centered focal quote/closing.

3. **Studio Color & Pacing Discipline:**
   - Follow the **60-30-10 rule** and **2–3 color limits** with **4-step opacity ramps (`100% / 60% / 30% / 10%`)** instead of gradients.
   - Alternate cleanly between **deep matte dark slides** (covers, dividers, hero KPIs) and **warm off-white slides** (`#F5F4F0`, `#F4F5F3`) for reading-heavy agendas, timelines, and tables.

4. **Action Titles & Decluttered Data Viz:**
   - Every slide header must be an **insight-driven Action Title**, never a lazy topic label (`"Q3 Revenue"` -> `"Enterprise drove 12% Q3 revenue acceleration"`).
   - Strip chart junk: remove default axes, gridlines, borders, and redundant legends; use **One Number Per Slide**, **dot-matrix/waffle grids**, **axis-free milestone curves**, or **direct-labeled horizontal bars**.

5. **Programmatic PPTX Engineering & Visual QA:**
   - Always use `Slide Master` / `.pptx` templates + centralized design tokens; never hardcode magic coordinates everywhere.
   - Run `node scripts/audit-pptx-code.mjs .` and visually inspect rendered slides (LibreOffice headless -> PDF -> PNG) before delivering any `.pptx`.

## Skill Routing Table

| Domain | Skill Path |
|---|---|
| Removing AI slide giveaways & motifs | `skills/anti-ai-slop-slides/SKILL.md` |
| Grids, typography, scale, negative space | `skills/slide-grid-typography/SKILL.md` |
| Color palettes, opacity ramps & pacing | `skills/slide-color-pacing/SKILL.md` |
| Charts, hero KPIs, dot-matrix & tables | `skills/data-viz-hero-metrics/SKILL.md` |
| Cutouts, masking, photos & studio motifs | `skills/editorial-imagery-motifs/SKILL.md` |
| PptxGenJS / python-pptx & visual QA | `skills/pptx-code-architecture/SKILL.md` |
| Deck structure & Action Title narrative | `skills/narrative-storytelling-decks/SKILL.md` |

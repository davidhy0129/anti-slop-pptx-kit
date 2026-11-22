---
name: editorial-pdf-design
description: Designs publication-grade editorial PDFs (executive reports, proposals, one-pagers, whitepapers, and 16:9 slide PDFs) using HTML/CSS @page print rules, SVG charts, zero drop shadows, and strict pagination control.
---

# Editorial PDF Design (Reports, Proposals & Slide PDFs)

Use this skill whenever the deliverable is a **PDF** (standalone executive report, commercial proposal, whitepaper, one-pager, or 16:9 presentation PDF).

## 1. Two PDF Modes

| PDF Type | Page Setup (`@page`) | Best Generation Stack |
|---|---|---|
| **Editorial Report / Proposal / Whitepaper** | `@page { size: A4; margin: 18mm 18mm 20mm 18mm; }` (or `letter`) | HTML/CSS Print -> Playwright/Chrome `page.pdf({ printBackground: true })` or WeasyPrint using `templates/editorial-pdf-studio.html` |
| **16:9 Presentation Deck PDF** | `@page { size: 13.333in 7.5in; margin: 0; }` | Build `.pptx` with `templates/pptxgenjs-studio-kit.mjs` / `python_pptx_studio.py` -> `soffice --headless --convert-to pdf`, OR HTML Print with `13.333in × 7.5in` `.slide` sections |

---

## 2. Anti-AI-Slop Rules for PDFs

- **Print Color Precision:** Always enable `print-color-adjust: exact; -webkit-print-color-adjust: exact;` and `printBackground: true` so dark cover pages and accent highlights render faithfully.
- **Pagination Discipline:**
  - Put `break-inside: avoid; page-break-inside: avoid;` on every table row, KPI block, callout, and diagram so cards/tables never split awkwardly across pages.
  - Put `break-after: page;` after full-bleed covers or intentional section dividers.
  - Never leave an orphan heading at the bottom of a page (`break-after: avoid;` on `h1, h2, h3`).
- **Crisp Vector SVG Charts & Diagrams:** In HTML-to-PDF, draw charts, timelines, and architecture diagrams in inline `<svg>` rather than raster PNGs so every line, bar, and label stays infinitely sharp at 400% zoom.
- **Same Studio Restraint:**
  - Zero drop shadows, zero vertical accent bars beside text boxes, zero ALL-CAPS eyebrows above every heading, zero repeated long footer banners (use clean `@page { @bottom-right { content: counter(page, decimal-leading-zero); } }`).
  - Use the exact same **80/10/10 color discipline** and `tabular-nums` on all financial tables and KPIs.

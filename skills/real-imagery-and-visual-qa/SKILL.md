---
name: real-imagery-and-visual-qa
description: Eliminates "blind code generation" and flat box-only decks by sourcing/generating cohesive industry photography and using headless Edge/Chrome rendering (scripts/render-html-slides.mjs) to visually inspect slides and PDFs before delivery.
---

# Real Industry Imagery & Visual Render QA (v12.0)

Two things separate amateur code-generated slides from Dribbble/Behance studio decks:
1. **Real, cohesive imagery** instead of empty colored rectangles.
2. **Visual inspection of the rendered output** instead of coding coordinates blindly.

---

## 1. Sourcing & Integrating Real Industry Imagery

- **Match the Industry:** Never use abstract 3D blobs or generic office handshakes. Use real, domain-authentic visuals:
  - *Food / Restaurant:* Overhead flat-lay photography on slate/ceramic with natural negative space.
  - *Fashion / Brand:* Moody editorial portraits or textured lookbook crops.
  - *Engineering / Industrial:* High-contrast facility/machinery photography with directional dark scrims.
  - *SaaS / Product:* Crisp UI screenshots or focused product mockups.
- **Cohesion Rules:** Keep one consistent color grading/temperature across all photos (or apply uniform B&W 0% saturation + accent overlay). Always hard-bound images inside the `13.333" × 7.5"` frame—never let shapes/photos overhang edges.
- **When AI Image Tools Are Available:** Generate 2–4 bespoke editorial photos/backgrounds matching the deck's exact palette (`Creative Brief`), avoiding garbled text or distorted hands/faces.

---

## 2. Visual Verification (Never Deliver Blindly)

### Option A: HTML/CSS 16:9 or A4 -> Pixel-Perfect PDF & PNG (`scripts/render-html-slides.mjs`)
When Google Fonts, exact CSS Flexbox/Grid centering, and pixel-accurate visual polish matter most, build the presentation/report in HTML/CSS (`templates/editorial-pdf-studio.html` for A4, or `1280×720` / `13.333in×7.5in` `.slide` pages for decks) and render it with headless Edge/Chrome:
```bash
node scripts/render-html-slides.mjs deck.html output.pdf
```
Inspect the generated PDF/PNGs visually (using `read_file` on the PNG or opening the PDF) to catch any overlap, bad contrast, or off-center text before delivering.

### Option B: PPTX Visual Inspection
If delivering `.pptx`, convert via LibreOffice (`soffice --headless --convert-to pdf`) when installed, or run `node scripts/audit-pptx-code.mjs .` (`exit 0`) and verify every coordinate mathematically (`x + w <= 13.333`, `y + h <= 7.5`, center-aligned inside containers).

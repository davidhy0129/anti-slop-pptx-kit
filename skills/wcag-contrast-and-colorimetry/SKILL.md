---
name: wcag-contrast-and-colorimetry
description: Executable colorimetry and WCAG 2.1 contrast verification skill. Enforces color-wheel harmony, chapter color shifts, photo scrims, and assertContrast() in every deck script.
---

# Colorimetry & WCAG Contrast Calculator

## 1. Color Wheel & 60-30-10 Harmony
- Pick a chromatic relationship suited to the industry:
  - **Hospitality / Gastronomy:** Warm Charcoal `#181412` + Warm Bone `#F7F3EB` + Botanical Emerald `#12352A` + Terracotta `#B83B1D` / Gold `#F0B949`.
  - **Tech / Product:** Warm Slate `#161922` + Off-White `#F5F7FA` + Cobalt/Cyan `#1D4ED8` + Amber `#D97706`.
  - **Luxury / Fashion:** Espresso `#1C1613` + Ivory `#FAF6F0` + Champagne `#C8A46B` + Burgundy `#6E1E2A`.
  - **Sustainability / Health:** Deep Forest `#102A22` + Cream `#F4F7F2` + Sage `#2E6F5E` + Warm Clay `#C2593F`.
- **Banned Cliché:** `#0A111E` + `#059669` (generic AI dark-navy + emerald) and `#6366F1`/`#8B5CF6` purple-blue.

## 2. Mandatory `assertContrast()` Calls in Every Script
Every deck builder MUST import `assertContrast` from `./helpers/pptx-primitives.mjs` and verify its palette at the top of the script:
```js
assertContrast(C.inkLight, C.charcoal, { label: "Light text on dark canvas" }); // >= 4.5:1
assertContrast(C.inkDark, C.bone, { label: "Dark ink on light canvas" });      // >= 4.5:1
assertContrast(C.accent, C.charcoal, { large: true, label: "Accent headline on dark" }); // >= 3.0:1
```

## 3. Photo Overlay Scrim Rule (WCAG G18 / F83)
Never place text directly over an un-scrimmed photo. Either:
- Add a dark scrim (`#181412` at `70–85%` opacity) over the photo before adding `#F5F2EC` text, OR
- Use a **Split Slide** where text sits on a solid `#181412` / `#F7F3EB` panel and the photo sits cleanly in its own framed half.

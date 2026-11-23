---
name: slide-color-pacing
description: Google Design & Adobe Color Systems: Color Wheel (6 Harmonies), HSL, Material Tonal Scales, Dark Theme Elevation (no pure black/neon), WCAG 2.1 exact contrast (4.5:1 / 3:1 / 7:1), Photo-Overlay protection (G18/F83), and 60-30-10 pacing.
---

# Color Theory, Systems & WCAG Accessibility (v13.0)

First **legibility**, then **identity**, then **emotion**, and last decoration.

## 1. HSL & The 3-Step Color Balancing System (Google Design)

- **Hue (Matiz):** Brand family; **Saturation:** Purity (keep low on large backgrounds, reserve high saturation for small accents); **Value / Luminance (Luminosidad):** Controls readability (`yellow ≈ white`, `purple ≈ black`).
- **3-Step Balancing:** (1) *Balance Stimulation* (avoid equal-lightness vibrant pairs that vibrate); (2) *Relate* (unify via shared temperature or a muted bridge color); (3) *Complete* (add a complementary temperature/lightness accent in unequal `60-30-10` proportions).
- **6 Wheel Harmonies:** Monochromatic, Analogous, Complementary, Split-Complementary, Triadic, Tetradic.
- **Material Tonal Scale:** Anchor primary at `500`, darken to `700` for structural surfaces, lighten to `300` for secondary info; add 2 lighter + 2 darker variants per hue.

---

## 2. Dark Theme & Photo-Overlay Contrast Rules (W3C WCAG 2.1 + Google Design)

- **No Pure `#000000` & No Neon:** Use deep charcoal/smoky gray (`#121212`–`#1E1E1E`) with subtle elevated steps (`#242424`) and **desaturated accents** (never glaring neon). Use crisp off-white (`#F3F1ED`) instead of blinding pure white on small dark-mode text to prevent pixel-bleed.
- **Strict WCAG 2.1 Luminance Ratios (`(L1 + 0.05) / (L2 + 0.05)`):**
  - **Normal text (`<18pt` or `<14pt` bold):** **`>= 4.5:1`** (`7.0:1` AAA).
  - **Large text (`>=18pt` or `>=14pt` bold) & UI/Chart elements (`SC 1.4.11`):** **`>= 3.0:1`**.
  - Use `assertContrast(fg, bg)` in `helpers/pptx-primitives.mjs` (or `assert_contrast` in Python) to verify every color pair mathematically!
- **Photo-Overlay Protection (`WCAG G18 / F83`):** Foreground text over photos is **NOT** exempt. Never put colored/amber text (`12–15pt`) directly over a busy or warm photo with a weak transparent overlay! Always use an opaque or `>= 90%` solid local scrim/panel behind text (`4.5:1` against worst-case photo pixels).

---

## 3. 11 Amateur Color Mistakes to Ban

1. Exceeding 3–5 core colors (plus 2–3 optional functional status colors: green/amber/red).
2. Using saturated colors across large background areas.
3. Placing vibrant contrasting hues of **equal lightness** side-by-side (visual vibration).
4. **Red on dark/black** (invisible to protanopia).
5. Using color alone to convey meaning (`WCAG 1.4.1`) — always pair with labels, icons, or patterns.
6. White text on yellow, light cyan, or light orange.
7. Failing to test in **grayscale** and color-blind simulation before finalizing.
8. Choosing trend colors over audience/brand fit.

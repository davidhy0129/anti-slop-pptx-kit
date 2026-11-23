# `anti-slop-pptx-kit` (v17.0 — Multi-Agent Art Direction, HTML/PDF & PPTX Studio)

> **Sistema multi-agente de dirección de arte, colorimetría WCAG, tipografía por industria, fotografía real y validación geométrica para que cualquier IA cree presentaciones únicas, vivas y libres de errores — entregando siempre `.pdf` editorial + `.pptx` editable.**

Compatible con **Antigravity** (descubrimiento automático vía `.agents/rules/` + `.agents/skills/`), **Claude Code**, **OpenAI Codex**, **Cursor** y **Gemini CLI**.

---

## Cómo funciona el flujo `v17.0` (Orquestador en 6 Fases)

Cuando pides una presentación, el repositorio activa **`agents/orchestrator.md`** y coordina a los especialistas antes de escribir código:

1. **Narrativa y Densidad (`agents/deck-narrative-strategist.md`):** Define 8–14 diapositivas con 1 idea fuerte por lámina y cero repetición de layouts consecutivos.
2. **Dirección de Arte, Colorimetría y Tipografía:**
   - `agents/slide-art-director.md`: 3 metáforas visuales + moodboard propio (cero plantillas).
   - `agents/color-contrast-specialist.md`: armonía 60-30-10, cambio de color por capítulo y cálculo matemático obligatorio con `assertContrast()` (`>= 4.5:1` texto, `>= 3.0:1` títulos grandes).
   - `agents/typography-spacing-specialist.md`: máximo 2 fuentes reales por industria, interlineado (`1.4–1.6` cuerpo, `1.05–1.25` títulos), tracking y escala de padding (`4/8/16/24/32/48 px`).
3. **Imágenes, Iconos PNG y Elementos (`agents/imagery-elements-specialist.md`):** Fotografías reales sin estirar (`sizing: { type: "cover" }` / CSS `object-fit: cover`), iconos PNG vía `renderSvgIconsToPng()` (cero `[X]`) y capas translúcidas (`82–92%`).
4. **Organización Espacial (`agents/layout-organizer.md`):** Grilla de 12 columnas en `13.333" × 7.5"` (`LAYOUT_WIDE`), cero tarjetas con bordes ("cuadritos"), cero líneas `1px` repetitivas y cero solapamientos.
5. **Entrega Dual (`PDF` + `PPTX`):**
   - `deck.html` -> **`<Deck>.pdf`** + **`qa-slides/*.png`** vía `node scripts/render-deck-pdf-and-pngs.mjs`.
   - **`<Deck>.pptx`** vía `createDeck()`, `addTextBox()`, `addFlatShape()`, `assertContrast()`, `renderSvgIconsToPng()` y `cleanChartOptions()`.
6. **Doble Gate Bloqueante (`agents/deck-auditor.md`):**
   - `node scripts/audit-pptx-code.mjs .` (`exit 0`)
   - `node scripts/validate-pptx.mjs <Deck>.pptx` (`exit 0` — valida lienzo `13.333" × 7.5"`, límites, solapamientos y proporción de imágenes)

---

## Instalación en 1 comando

### Windows (PowerShell)
```powershell
Remove-Item -Recurse -Force "$env:TEMP\anti-slop-pptx-kit" -ErrorAction SilentlyContinue
git clone https://github.com/davidhy0129/anti-slop-pptx-kit.git "$env:TEMP\anti-slop-pptx-kit"
powershell -ExecutionPolicy Bypass -File "$env:TEMP\anti-slop-pptx-kit\scripts\install.ps1" -Target all -Scope project -Force
npm install
```

### macOS / Linux (Bash)
```bash
rm -rf /tmp/anti-slop-pptx-kit
git clone https://github.com/davidhy0129/anti-slop-pptx-kit.git /tmp/anti-slop-pptx-kit
bash /tmp/anti-slop-pptx-kit/scripts/install.sh --target all --scope project --force
npm install
```

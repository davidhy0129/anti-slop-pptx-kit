# `anti-slop-pptx-kit` (v5.0 — PPTX & Editorial PDF Studio Kit)

> **Kit universal de dirección de arte, diseño editorial, narrativa ejecutiva e ingeniería de código para generar presentaciones `.pptx` (`PptxGenJS` / `python-pptx`) y documentos `PDF` (HTML/CSS `@page` / LibreOffice) con acabado de estudio gráfico — jamás hechos con estética genérica de IA.**

Compatible desde el minuto cero con **Antigravity**, **Claude Code**, **OpenAI Codex**, **Cursor**, **Windsurf** y **Gemini CLI**.  
**100% agnóstico de industria:** sirve para *pitch decks*, reportes de junta directiva, propuestas comerciales, documentos ejecutivos en PDF, restaurantes, clubes, SaaS o ERPs.

---

## Qué prohíbe y qué exige `v5.0` (Cero Estética IA)

- **Prohibido dibujar ilustraciones con formas básicas (`triangle`, `trapezoid`, icebergs, embudos):** Las IAs desalinean polígonos y desbordan el texto. Usa componentes matemáticos probados (`renderWaterfallBridge`, `renderSplitColorSwap`, `renderArchitectureGateDiagram`, `renderConsultingColumns`).
- **Cero sombras por defecto de PowerPoint:** Todas las líneas, barras y contenedores son planos y nítidos (`shadow.inherit = False` / `shadow: { type: "none" }`).
- **Cero barras verticales de acento junto al texto** y **cero eyebrows en MAYÚSCULAS** (`DIAGNÓSTICO DE RIESGO`) encima de los títulos.
- **Cero pies de página largos repetidos** (`EMPRESA · TÍTULO · 3 / 10`) en cada diapositiva: solo un número discreto (`03`).
- **Soporte dual PPTX + PDF:** Incluye librería JS (`PptxGenJS`), librería Python (`python-pptx`) y **sistema editorial HTML/CSS `@page` para PDFs** (A4 / Letter / 16:9).
- **Auditor estricto (`scripts/audit-pptx-code.mjs`):** Falla con `exit 1` si el código no importa los templates del kit, si dibuja triángulos/trapecios o barras verticales a mano, si mete eyebrows en mayúsculas o fuentes cliché (`Inter`, `Arial`, `Calibri`, `Roboto`, `Space Grotesk`).

---

## Orden de Diseño y Arquitectura del Repositorio (7 Pilares)

El repositorio estructura el flujo profesional exactamente en el orden en que trabaja un diseñador gráfico senior:
1. **Fundamentos del Diseño** (`skills/graphic-design-fundamentals/`) — Jerarquía, Contraste, Alineación, Proximidad/Contiguidad Espacial, Repetición, Balance y Espacio en Blanco.
2. **Teoría del Color y Paletas** (`skills/slide-color-pacing/` + `references/color-typography-systems.md`) — Círculo cromático (complementarios, análogos, tríadas, monocromáticos), Matiz/Saturación/Valor, accesibilidad WCAG y psicología del color por industria.
3. **Tipografía y Jerarquía** (`skills/slide-grid-typography/`) — Serif vs. Sans-Serif, máximo 2 familias, tamaños legibles en sala (`14–16pt+` cuerpo, `28–40pt` títulos), peso, interlineado y tracking.
4. **Imágenes, Iconos, Gráficos y Diagramas** (`skills/editorial-imagery-motifs/` + `skills/data-viz-hero-metrics/`) — Diferenciación clara entre foto, ilustración, icono, diagrama, gráfico nativo editable (`addChart`) y captura de pantalla.
5. **Retículas, Márgenes y Layouts** (`skills/domain-art-direction-router/` + `references/industry-design-matrix.md`) — Selección automática de paleta, fuentes y composición según la industria del prompt.
6. **Ritmo Visual y Anti-AI-Slop** (`skills/anti-ai-slop-slides/` + `skills/narrative-storytelling-decks/`) — SCQA, Minto Pyramid, 1 elemento dominante, asimetría controlada, bloques de color y `speakerNotes`.
7. **Ingeniería PPTX y PDF Editorial** (`skills/pptx-code-architecture/` + `skills/editorial-pdf-design/` + `templates/`) — Librerías listas en `PptxGenJS`, `python-pptx` y HTML/CSS `@page` para PDFs, más el auditor `scripts/audit-pptx-code.mjs`.

---

## Instalación en 1 comando

### Windows (PowerShell)
```powershell
Remove-Item -Recurse -Force "$env:TEMP\anti-slop-pptx-kit" -ErrorAction SilentlyContinue
git clone https://github.com/davidhy0129/anti-slop-pptx-kit.git "$env:TEMP\anti-slop-pptx-kit"
powershell -ExecutionPolicy Bypass -File "$env:TEMP\anti-slop-pptx-kit\scripts\install.ps1" -Target all -Scope project -Force
```

### macOS / Linux (Bash)
```bash
rm -rf /tmp/anti-slop-pptx-kit
git clone https://github.com/davidhy0129/anti-slop-pptx-kit.git /tmp/anti-slop-pptx-kit
bash /tmp/anti-slop-pptx-kit/scripts/install.sh --target all --scope project --force
```

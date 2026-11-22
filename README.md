# `anti-slop-pptx-kit` (v8.0 — Zero-Template Creative Art Direction Kit)

> **Sistema universal de dirección de arte, diseño gráfico, narrativa ejecutiva e ingeniería PPTX/PDF para que cualquier IA cree presentaciones y PDFs únicos, vivos y personalizados al prompt — sin plantillas repetitivas ni estética genérica de IA.**

Compatible desde el minuto cero con **Antigravity**, **Claude Code**, **OpenAI Codex**, **Cursor**, **Windsurf** y **Gemini CLI**.

---

## Filosofía v8.0: Cero Plantillas Fijas, 100% Diseño a Medida

Las presentaciones de IA se ven iguales cuando el código usa funciones de plantilla fijas para todo. **`anti-slop-pptx-kit` no impone plantillas**: le entrega a la IA las leyes reales del diseño gráfico, teoría del color, tipografía, composición, visualización de datos y herramientas técnicas para que **construya una propuesta visual distinta para cada tema**:

- **Ranking Corporativo / Economía** (ej. *Top 5 Empresas de Colombia*): Estética editorial financiera (*Financial Times / The Economist*), tipografía con carácter, gráficos nativos comparativos, tablas limpias y aire asimétrico.
- **Gastronomía / Restaurantes**: Fotografía protagonista a sangre, armonía cálida, tipografía editorial *serif + sans*, recortes y bloques de color orgánicos.
- **Moda / Lanzamiento de Marca**: Lookbook minimalista de alto contraste, espacio negativo dramático, asimetría y titulares de gran escala.
- **Ingeniería / SaaS / Industria**: Retícula suiza precisa, diagramas de arquitectura, datos limpios y contraste técnico.

---

## Estructura (Los 7 Pilares del Diseño)

1. **`skills/domain-art-direction-router/`** — Paso 0: lee el prompt del usuario y define un *Creative Brief* único (paleta, tipografías, estrategia de fotos/íconos/diagramas y ritmo de láminas).
2. **`skills/graphic-design-fundamentals/`** — Jerarquía, Contraste, Alineación, Proximidad (contiguidad espacial), Repetición, Balance simétrico/asimétrico, Peso Visual y diferenciación de los 6 recursos visuales (Foto, Ilustración, Icono, Diagrama, Gráfico, Captura).
3. **`skills/slide-color-pacing/`** — Círculo cromático (complementarios, análogos, tríadas, monocromáticos), Matiz/Saturación/Valor, accesibilidad WCAG/APCA y psicología del color.
4. **`skills/slide-grid-typography/`** — Retícula modular (Suiza / Tercios 3×3), *Serif vs. Sans-Serif*, máximo 2 familias, tamaños legibles en sala (`14–16pt+` cuerpo, `28–44pt` títulos), interlineado, tracking y ancho de línea.
5. **`skills/editorial-imagery-motifs/` & `skills/data-viz-hero-metrics/`** — Fotos a sangre sin *efecto pegote*, B&N + acento, recorte/superposición controlada, gráficos nativos editables de PowerPoint y regla `<2 segundos`.
6. **`skills/narrative-storytelling-decks/` & `skills/anti-ai-slop-slides/`** — SCQA, Pirámide de Minto, *Action Titles*, Regla 5×5 / 6×6, `speakerNotes` y purga total de clichés IA.
7. **`skills/pptx-code-architecture/` & `skills/editorial-pdf-design/`** — Primitivas técnicas sin sombras (`helpers/`), PDFs editoriales (`@page` print CSS) y auditor estático (`scripts/audit-pptx-code.mjs`).

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

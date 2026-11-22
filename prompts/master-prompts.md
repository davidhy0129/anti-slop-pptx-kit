# Prompts Maestros Creativos (v9.0 — PPTX & PDF Editorial)

Copia y pega cualquiera de estos prompts en **Antigravity, Claude Code, Codex, Cursor o Gemini CLI** dentro de un proyecto con `anti-slop-pptx-kit` instalado.

---

## 1. Prompt Creativo de Director de Arte (Español — Cero Plantillas)
```markdown
Lee `AGENTS.md`, `skills/creative-art-direction/SKILL.md`, `skills/graphic-design-fundamentals/SKILL.md` y `skills/slide-color-pacing/SKILL.md`.

Actúa como director de arte y diseñador de presentaciones. No hagas una presentación genérica ni basada en plantillas.
Voy a crear una presentación sobre **[TEMA]** para **[AUDIENCIA]**. El objetivo es **[ACCIÓN O EMOCIÓN]**.

1. **Propón 3 conceptos creativos distintos** (cada uno con metáfora visual, tono emocional e idea de dirección de arte) y elige el mejor.
2. **Muéstrame primero un moodboard textual:** referencias de estilo, palabras clave visuales, paleta de color con **cambio de color por capítulo/emoción** (alto contraste real), **1 familia tipográfica multi-peso** o 2 fuentes que armonicen de verdad (`>=14pt` cuerpo), tratamiento de fondos (**formas translúcidas relacionadas a la industria**, bordes redondeados sin contorno o fotos reales), iconos y gráficos nativos editables (`addChart`).
3. **Crea una narrativa de 8 a 12 diapositivas** alternando layouts: portada conceptual, declaración, dato gigante, gráfico nativo, comparación asimétrica, proceso, cita y cierre.
4. **Evita:** cuadrados repetitivos con borde, líneas divisorias random, cajas centradas repetitivas, barras verticales de acento, eyebrows en MAYÚSCULAS, sombras por defecto de PowerPoint, neones y texto largo sin aire.
5. **Pasa el Filtro Final de Calidad (10 preguntas)** de `skills/creative-art-direction/SKILL.md` y ejecuta `node scripts/audit-pptx-code.mjs .` hasta obtener **exit 0**.
```

## 2. Prompt para PDF Editorial (`@page` Print CSS)
```markdown
Lee `AGENTS.md`, `skills/editorial-pdf-design/SKILL.md` y `skills/creative-art-direction/SKILL.md`.
Usa `templates/editorial-pdf-studio.html` como punto de partida técnico (`@page`, `print-color-adjust: exact`, `break-inside: avoid`, gráficos `<svg>`), pero diseña una identidad visual única según la industria y metáfora del tema: **[TEMA, CLIENTE Y OBJETIVO]**.
```

## 3. Creative Art Director Prompt (English — Zero Templates)
```markdown
Read `AGENTS.md` and `skills/creative-art-direction/SKILL.md`. Act as a senior Art Director — do NOT use rigid templates.
Create a bespoke presentation on **[TOPIC]** for **[AUDIENCE]** to achieve **[GOAL]**.
1. Propose 3 creative visual metaphors, pick the strongest, and define a textual moodboard (editorial references, high-contrast color harmony with chapter shifts, 1 multi-weight font family or 2 harmonious fonts `>=14pt`, translucent industry background shapes/photos, native `addChart` graphs).
2. Vary every slide layout (cover, bold statement, hero data, native chart, asymmetrical split, process, quote, action close) using borderless rounded tonal layers, controlled overlap, and real breathing room — zero random hairline dividers, zero bordered-box spam, zero PowerPoint drop shadows.
3. Pass the 10-Question Quality Filter and `node scripts/audit-pptx-code.mjs .` (`exit 0`).
```

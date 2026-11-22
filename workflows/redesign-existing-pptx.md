# Workflow: Redesign an Existing AI-Looking PPTX / Script

Usa este flujo cuando ya tengas un script (`PptxGenJS` / `python-pptx`) o una presentación existente que se ve genérica, saturada o "hecha con IA".

## Fase 1 — Auditoría Rápida
1. Ejecuta:
   ```bash
   node scripts/audit-pptx-code.mjs .
   ```
2. Identifica los 5 síntomas principales:
   - Fuentes genéricas (`Inter`, `Arial`, `Roboto`, `Space Grotesk`).
   - Degradados morado-azul, cajas *glassmorphism* o exceso de sombras.
   - Emojis (`🚀`, `✨`) o píldoras con punto (`●`) encima de cada título.
   - Repetición de la misma plantilla de 3 tarjetas con íconos en varias slides seguidas.
   - Gráficos con líneas de cuadrícula, ejes Y saturados y bordes por defecto.

## Fase 2 — Reestructuración Visual
1. Reescribe todos los encabezados a **Action Titles** con *inline turn highlighting*.
2. Parte cualquier slide con más de 3 viñetas en **2 slides más limpias** (o en un layout asimétrico Bento / Timeline nodal).
3. Aplica una **paleta 60-30-10** con rampa de opacidad (`100%/60%/30%/10%`) y alterna slides oscuros mate con slides blanco hueso cálido (`#F5F4F0`).
4. Aplica `35–55%` de espacio negativo y alineación estricta a la izquierda en retícula 16:9.

## Fase 3 — Verificación
1. Ejecuta `node scripts/audit-pptx-code.mjs .` hasta obtener 0 alertas críticas/diseño.
2. Genera el `.pptx` y valida visualmente con `workflows/visual-qa-render-loop.md`.

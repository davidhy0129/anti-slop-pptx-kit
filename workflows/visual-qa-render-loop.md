# Workflow: Headless Visual QA Render Loop

Nunca entregues un `.pptx` generado por código sin ver cómo quedó renderizado.

## 1. Auditoría estática del código
```bash
node scripts/audit-pptx-code.mjs .
```

## 2. Generar el `.pptx` y convertir a imágenes
Si tienes LibreOffice (`soffice`) y `pdftoppm` instalados:
```bash
soffice --headless --convert-to pdf ./output/deck.pptx --outdir ./preview
pdftoppm -png -r 150 ./preview/deck.pdf ./preview/slide
```
*(En Windows PowerShell, si LibreOffice está en `C:\Program Files\LibreOffice\program\soffice.exe`, invócalo con `& "C:\Program Files\LibreOffice\program\soffice.exe" --headless --convert-to pdf ...`.)*

## 3. Checklist visual sobre cada PNG
- [ ] ¿Algún texto se corta, choca con otra caja o invade los márgenes (`< 0.5"`)?
- [ ] ¿Se siente al menos `35–55%` de aire/espacio negativo en cada slide?
- [ ] ¿Hay variación real entre slides consecutivas (no todas iguales)?
- [ ] ¿Los gráficos y tablas están libres de cuadrículas pesadas y alineados a la retícula?
- [ ] Si ves cualquier defecto, corrige el componente/token y vuelve a renderizar.

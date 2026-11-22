/**
 * Reference Example (v6.0): Industrial Engineering Executive Deck
 * Uses INDUSTRIAL_ENGINEERING palette, ENGINEERING_PRO fonts, native PowerPoint chart,
 * crisp SVG icons, high-contrast >=14pt body copy, and balanced compositions.
 */

import PptxGenJS from "pptxgenjs";
import {
  PALETTES,
  FONT_SYSTEMS,
  renderCoverSlide,
  renderMetricPlusCards,
  renderNativeBarChartSlide,
  renderCleanTableSlide,
  renderContrastTwoColumn,
  renderIconFeatureGrid,
  renderHeroCenteredStatement,
  renderRoadmapWithActions,
} from "../templates/pptxgenjs-studio-kit.mjs";

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
const pal = PALETTES.INDUSTRIAL_ENGINEERING;
const fonts = FONT_SYSTEMS.ENGINEERING_PRO;

renderCoverSlide(pptx, pal, {
  contextPill: "Comité Directivo · Noviembre 2026",
  titleParts: [
    { text: "Consolidar nuestro sistema ", accent: false },
    { text: "o alquilar un ERP externo", accent: true },
  ],
  subtitle: "Análisis financiero a 5 años (45 usuarios), control operativo en obra y continuidad tecnológica para INTECKNO S.A.S.",
  statsStrip: [
    { value: "~250 h/mes", label: "reprocesos eliminables hoy" },
    { value: "$350M–$1.8B", label: "ahorro proyectado a 5 años" },
    { value: "100%", label: "propiedad del código y datos" },
  ],
  fonts,
});

renderMetricPlusCards(pptx, pal, {
  titleParts: [
    { text: "Operar sin sistema integrado ", accent: false },
    { text: "cuesta más de un puesto al mes", accent: true },
  ],
  heroStat: "~250 h/mes",
  heroCaption: "perdidas en doble digitación entre Excel, papel y WhatsApp",
  heroFootnote: "Base conservadora: 25 de 45 usuarios perdiendo 30 min/día.",
  cards: [
    { icon: "clock", title: "Tiempo pagado sin valor", detail: "Doble trabajo entre Proyectos, Compras y Bodega." },
    { icon: "chart", title: "Fugas de margen", detail: "Desviaciones de costo o anticipos detectadas tarde." },
    { icon: "shield", title: "Exposición legal", detail: "PILA, pólizas y alturas difíciles de rastrear a tiempo." },
  ],
  pageNum: 2,
  fonts,
});

renderNativeBarChartSlide(pptx, pal, {
  titleParts: [
    { text: "Ahorro de $350M a $1.855M COP ", accent: false },
    { text: "en 5 años con usuarios ilimitados", accent: true },
  ],
  chartData: [
    { label: "SAP B1 / Oracle", value: 1914, highlight: false },
    { label: "Odoo Enterprise", value: 660, highlight: false },
    { label: "Inteckno ERP", value: 59, highlight: true },
  ],
  insightStat: ">85% a >94%",
  insightTitle: "de ahorro neto proyectado",
  insightDetail: "Con 45 usuarios (TRM $3.300), el costo de licencias por empleado nuevo se mantiene en $0.",
  sourceLine: "Cifras en millones de COP (techo estimado a 5 años · 45 usuarios · TRM $3.300).",
  pageNum: 3,
  fonts,
});

renderCleanTableSlide(pptx, pal, {
  titleParts: [
    { text: "Comparativa financiera y de ", accent: false },
    { text: "propiedad tecnológica", accent: true },
  ],
  headers: ["Criterio (45 usuarios)", "Inteckno ERP", "Odoo Enterprise", "SAP / Oracle"],
  rows: [
    ["Licencias / Año", "$0 (Ilimitado)", "USD $14k–$19k", "USD $45k–$70k"],
    ["Implementación Año 1", "$0 (Interno)", "USD $25k–$45k", "USD $65k–$120k"],
    ["Total 5 Años (COP)", "$26,4M–$59,4M", "$412,5M–$660M", "$1.155M–$1.914M"],
    ["Crecer a 80 personas", "$0 adicional", "Sube factura mensual", "Sube factura mensual"],
    ["Cambios internos", "Horas o días", "Semanas + cobro", "Meses + SLA"],
  ],
  colW: [3.2, 2.9, 2.9, 2.8],
  highlightCol: 1,
  bottomHighlight: "Ahorro neto a 5 años: $350M – $1.855M COP manteniendo el 100% del código en Inteckno",
  pageNum: 4,
  fonts,
});

renderContrastTwoColumn(pptx, pal, {
  titleParts: [
    { text: "Comprar un ERP comercial ", accent: false },
    { text: "no evita programar ni pagar de más", accent: true },
  ],
  leftCol: {
    heading: "Lo que te venden al inicio",
    items: [
      "Cuota mensual por usuario que parece manejable",
      "Promesa de arranque estándar sin tocar código",
      "Dependencia de un partner externo para cada cambio",
    ],
  },
  rightCol: {
    heading: "Lo que realmente terminas pagando",
    items: [
      "6 a 24 meses de consultora para adaptar ingeniería STC",
      "Desarrollos a medida obligatorios y cobros extra",
      "Alquiler eterno: si dejas de pagar, pierdes el acceso",
    ],
  },
  bottomQuote: "Con un ERP comercial pagaríamos cientos de millones para adaptarlo igual — pero sin ser dueños de nada.",
  pageNum: 5,
  fonts,
});

renderIconFeatureGrid(pptx, pal, {
  titleParts: [
    { text: "Cuatro cambios inmediatos ", accent: false },
    { text: "en la operación diaria", accent: true },
  ],
  items: [
    { icon: "layers", title: "Una sola verdad", detail: "Comercial, Proyectos, Compras y Bodega ven el mismo dato al instante." },
    { icon: "users", title: "Cero persecución", detail: "Lo que pasa en obra o compras actualiza automáticamente a Gerencia." },
    { icon: "lock", title: "Frenos automáticos", detail: "Bloquea sobrecostos, pagos sin PILA o permisos vencidos antes de ocurrir." },
    { icon: "zap", title: "IA integrada al equipo", detail: "Lee facturas, analiza documentos y responde consultas en segundos." },
  ],
  dark: true,
  pageNum: 6,
  fonts,
});

renderHeroCenteredStatement(pptx, pal, {
  figure: "10–20 años",
  headline: "de retención fiscal y legal sin borrado accidental",
  pillars: [
    { icon: "shield", title: "100% Nube Google", detail: "0% en equipos locales. Si un PC falla, no se pierde un dato." },
    { icon: "lock", title: "Bloqueo anti-borrado", detail: "Facturas y actas solo se anulan con motivo y responsable." },
    { icon: "check", title: "Propiedad y salida libre", detail: "Backups continuos y descarga directa a Excel cuando auditoría pida." },
  ],
  pageNum: 7,
  fonts,
});

renderRoadmapWithActions(pptx, pal, {
  titleParts: [
    { text: "Plan de arranque en ", accent: false },
    { text: "30 días y decisiones para hoy", accent: true },
  ],
  steps: [
    { tag: "SEMANA 1", title: "Validación por áreas", detail: "15 min con cada área para cerrar topes, aprobaciones y formatos." },
    { tag: "SEMANA 2–3", title: "Saldos iniciales", detail: "Carga de inventario real, contratos vigentes y consecutivos." },
    { tag: "SEMANA 4", title: "Primer bloque en vivo", detail: "Puesta en marcha gradual con acompañamiento interno directo." },
  ],
  decisionsTitle: "3 DECISIONES CONCRETAS PARA HOY",
  decisions: [
    "Dar luz verde oficial a Inteckno ERP como plataforma de la compañía.",
    "Asignar 15 minutos esta semana con Administrativa, Proyectos y Comercial.",
    "Autorizar cotización de proveedor DIAN y definir fecha de corte.",
  ],
  pageNum: 8,
  fonts,
});

await pptx.writeFile({ fileName: "demo-executive-deck.pptx" });
console.log("Generated demo-executive-deck.pptx");

/**
 * Reference Example: Executive Deck using anti-slop-pptx-kit v2.2
 * Notice: ZERO drawCard() loops, ZERO "02 · SECTION" eyebrows, ZERO emoji clutter.
 * Usage (in a project with pptxgenjs installed): node examples/demo-executive-deck.mjs
 */

import PptxGenJS from "pptxgenjs";
import {
  PALETTES,
  FONT_SYSTEMS,
  renderCoverSlide,
  renderEditorialSplit,
  renderHeroKpiBreather,
  renderSingleFocusBarChart,
  renderArchitectureGateDiagram,
  renderConsultingColumns,
  renderNodeTimeline,
  renderCleanTable,
  renderClosingSlide,
} from "../templates/pptxgenjs-studio-kit.mjs";

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
const pal = PALETTES.OBSIDIAN_CITRINE;
const fonts = FONT_SYSTEMS.SWISS_TECH;

// 1. Cover
renderCoverSlide(pptx, pal, {
  metaLine: "Executive Review · 2026",
  titleParts: [
    { text: "Unified Operations: ", accent: false },
    { text: "Full Control Without Lock-In", accent: true },
  ],
  subtitle: "20-year auditability, real-time field control, and zero per-seat licensing.",
  fonts,
});

// 2. Editorial Split (Diagnóstico sin cajas)
renderEditorialSplit(pptx, pal, {
  tagLabel: "Current Risk",
  titleParts: [
    { text: "Spreadsheets fragment ", accent: false },
    { text: "daily cost control", accent: true },
  ],
  leadText: "Local files create duplicate versions, blind compliance gaps, and manual rework across teams.",
  rows: [
    { label: "Duplicate Versions", detail: "Budget, warehouse, and site logs drift out of sync." },
    { label: "Compliance Blind Spots", detail: "Expired safety permits slip past manual checks." },
    { label: "Local File Risk", detail: "Critical project costs live on individual laptops." },
  ],
  dark: false,
  pageNum: 2,
  fonts,
});

// 3. Hero KPI Breather (10-20 años sin cajas)
renderHeroKpiBreather(pptx, pal, {
  figure: "20 Years",
  caption: "Immutable fiscal & legal retention built in from day one",
  footnote: "Soft-delete policy, multi-zone cloud backups, and instant CSV/Excel export.",
  pageNum: 3,
  fonts,
});

// 4. Single-Focus Bar Chart (5-year TCO comparison)
renderSingleFocusBarChart(pptx, pal, {
  titleParts: [
    { text: "Proprietary stack cuts 5-year TCO by ", accent: false },
    { text: "85% vs commercial ERPs", accent: true },
  ],
  bars: [
    { label: "SAP B1 / NetSuite", value: 180, displayValue: "$180K+", highlight: false },
    { label: "Odoo Enterprise", value: 75, displayValue: "$75K", highlight: false },
    { label: "In-House Cloud ERP", value: 3, displayValue: "$3K", highlight: true },
  ],
  dark: false,
  pageNum: 4,
  fonts,
});

// 5. Architecture Gate Diagram (Hard Gates sin 4 cajas BLOQUEO)
renderArchitectureGateDiagram(pptx, pal, {
  titleParts: [
    { text: "Automated hard gates ", accent: false },
    { text: "block costly errors before execution", accent: true },
  ],
  gates: [
    { domain: "Finance Gate", rule: "Blocks purchase orders without available budget or cleared advance." },
    { domain: "Safety Gate", rule: "Halts height permits if certification expired or wind exceeds 40 km/h." },
    { domain: "Legal Gate", rule: "Stops contractor payments when social security filings lapse." },
    { domain: "Technical Gate", rule: "Blocks obsolete blueprints and flags uncalibrated instruments." },
  ],
  dark: true,
  pageNum: 5,
  fonts,
});

// 6. Consulting Pyramid Columns (McKinsey-style impact by area)
renderConsultingColumns(pptx, pal, {
  titleParts: [
    { text: "Every department gains ", accent: false },
    { text: "real-time operational clarity", accent: true },
  ],
  columns: [
    {
      heading: "Executive & Finance",
      highlight: true,
      points: [
        { lead: "Live margin visibility.", body: "Track EAC and 30/60/90-day cashflow." },
        { lead: "Zero lock-in.", body: "Full source ownership in corporate GitHub." },
      ],
    },
    {
      heading: "Project Delivery",
      highlight: false,
      points: [
        { lead: "Connected WBS & cost.", body: "Site logs tied directly to budgets." },
        { lead: "Current blueprints.", body: "Versioned EDMS stops outdated builds." },
      ],
    },
    {
      heading: "Supply & HR",
      highlight: false,
      points: [
        { lead: "Multi-warehouse Kardex.", body: "Real-time landed cost and transfers." },
        { lead: "Pre-payroll accuracy.", body: "Verified labor hours and certifications." },
      ],
    },
  ],
  dark: false,
  pageNum: 6,
  fonts,
});

// 7. Comparison Table
renderCleanTable(pptx, pal, {
  titleParts: [
    { text: "Native industry fit ", accent: false },
    { text: "without 12-month consulting queues", accent: true },
  ],
  headers: ["Criterion", "In-House ERP", "Odoo", "SAP / Oracle"],
  rows: [
    ["Deployment", "Live Today", "6–12 months", "12–24 months"],
    ["Code Ownership", "100% Owned", "Partner Lock-In", "Zero"],
    ["Change Speed", "Hours / Days", "Weeks", "Months"],
  ],
  colW: [2.7, 3.0, 3.0, 3.0],
  highlightCol: 1,
  pageNum: 7,
  fonts,
});

// 8. Horizontal Node Timeline
renderNodeTimeline(pptx, pal, {
  titleParts: [
    { text: "Three-phase rollout ", accent: false },
    { text: "without halting daily operations", accent: true },
  ],
  steps: [
    { tag: "PHASE 01", title: "Field Validation", detail: "Confirm real forms and approval rules per area." },
    { tag: "PHASE 02", title: "Opening Balances", detail: "Migrate active projects, Kardex, and contracts." },
    { tag: "PHASE 03", title: "Phased Go-Live", detail: "Roll out module by module with direct support." },
  ],
  activeIndex: 0,
  dark: false,
  pageNum: 8,
  fonts,
});

// 9. Closing
renderClosingSlide(pptx, pal, {
  headline: "Ready for Phase 01.",
  contactLine: "Approve focal points · Set cut-off date · Confirm e-invoicing quote",
  fonts,
});

await pptx.writeFile({ fileName: "demo-executive-deck.pptx" });
console.log("Generated demo-executive-deck.pptx");

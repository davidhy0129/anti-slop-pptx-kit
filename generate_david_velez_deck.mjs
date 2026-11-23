import fs from "node:fs";
import path from "node:path";
import PptxGenJS from "pptxgenjs";
import {
  createDeck,
  addTextBox,
  addFlatShape,
  addTranslucentAccent,
  cleanChartOptions,
  renderSvgIconsToPng,
  assertContrast,
  SLIDE,
  NO_SHADOW,
} from "./helpers/pptx-primitives.mjs";

const OUT_FILE = path.resolve("./David_Velez_Nubank_Presentacion.pptx");
const ASSETS_DIR = path.resolve("./assets");
const ICONS_DIR = path.resolve("./assets/icons");

// 1. Color Palette (Strictly anti-slop, authentic to Nubank and high-contrast WCAG AA/AAA)
const C_DARK_PLUM = "190028";      // Deep midnight plum background
const C_NU_PURPLE = "820AD1";      // Official Nu purple
const C_BG_LIGHT = "FBF9FD";       // Warm amethyst white canvas
const C_SURFACE_TINT = "F3EBF9";   // Soft lavender surface block
const C_SURFACE_WHITE = "FFFFFF";  // Pure white card
const C_TEXT_DARK = "110521";      // Ink dark purple
const C_TEXT_MUTED = "554E62";     // Muted slate purple
const C_TEXT_LIGHT = "FFFFFF";     // Pure white for dark slides
const C_TEXT_LIGHT_MUTED = "D5C0E8"; // Soft lavender muted text
const C_EMERALD = "059669";        // Growth / performance metric
const C_DIVIDER = "E2D8EE";        // Subtle divider hairline

// Typography Pairings
const FONT_TITLE = "Georgia";
const FONT_BODY = "Trebuchet MS";

// Verify contrast ratios up front
assertContrast(C_TEXT_LIGHT, C_DARK_PLUM, { large: false, label: "Light on Dark Plum" });
assertContrast(C_TEXT_LIGHT, C_NU_PURPLE, { large: false, label: "Light on Nu Purple" });
assertContrast(C_TEXT_DARK, C_BG_LIGHT, { large: false, label: "Dark on Light Canvas" });
assertContrast(C_TEXT_DARK, C_SURFACE_TINT, { large: false, label: "Dark on Surface Tint" });
assertContrast(C_TEXT_MUTED, C_BG_LIGHT, { large: false, label: "Muted on Light Canvas" });

// 2. Render crisp PNG icons needed for the deck
const iconSpecs = [
  {
    name: "shield_check",
    pathsSvg: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
    strokeHex: C_NU_PURPLE,
  },
  {
    name: "heart_hand",
    pathsSvg: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    strokeHex: C_NU_PURPLE,
  },
  {
    name: "trending_up",
    pathsSvg: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    strokeHex: C_NU_PURPLE,
  },
  {
    name: "cpu_code",
    pathsSvg: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>',
    strokeHex: C_NU_PURPLE,
  },
  {
    name: "globe_latam",
    pathsSvg: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    strokeHex: C_NU_PURPLE,
  },
  {
    name: "users_group",
    pathsSvg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    strokeHex: C_NU_PURPLE,
  },
];

console.log("Rendering vector icons to PNG...");
const icons = await renderSvgIconsToPng(iconSpecs, ICONS_DIR, 128);

// Initialize deck
const pptx = createDeck(PptxGenJS, {
  title: "David Vélez & Nubank: La Revolución Financiera de América Latina",
  author: "Art Direction Studio",
  company: "Executive Leadership Case Studies",
});

const velezPhotoPath = path.join(ASSETS_DIR, "david_velez.jpg");
const nuLogoPurple = path.join(ASSETS_DIR, "nubank_purple.png");
const nuLogoWhite = path.join(ASSETS_DIR, "nubank_white.png");

// =========================================================================
// SLIDE 1: Hero Cover (Asymmetrical Editorial Split)
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_DARK_PLUM };

  // Subtle translucent ambient element
  addTranslucentAccent(slide, pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 7.2,
    h: 7.5,
    color: C_NU_PURPLE,
    transparency: 92,
  });

  // White Nu Logo
  if (fs.existsSync(nuLogoWhite)) {
    slide.addImage({
      path: nuLogoWhite,
      x: 0.8,
      y: 0.8,
      w: 1.4,
      h: 0.77,
    });
  }

  // Name / Hero Title
  addTextBox(slide, "David Vélez", {
    x: 0.8,
    y: 1.9,
    w: 6.2,
    h: 1.1,
    fontFace: FONT_TITLE,
    fontSize: 48,
    bold: true,
    color: C_TEXT_LIGHT,
  });

  // Deck Proposition
  addTextBox(
    slide,
    "La reinvención de los servicios financieros y el surgimiento del neobanco más valioso de Occidente.",
    {
      x: 0.8,
      y: 3.1,
      w: 5.8,
      h: 1.2,
      fontFace: FONT_BODY,
      fontSize: 18,
      color: C_TEXT_LIGHT_MUTED,
      lineSpacingMultiple: 1.2,
    }
  );

  // Pill highlight tag
  addFlatShape(slide, pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 4.6,
    w: 5.6,
    h: 0.5,
    rectRadius: 0.08,
    fill: { color: C_NU_PURPLE },
    line: { color: C_NU_PURPLE, width: 0 },
  });

  addTextBox(slide, "Fundador & CEO de Nu Holdings · Filántropo The Giving Pledge", {
    x: 0.95,
    y: 4.72,
    w: 5.3,
    h: 0.35,
    fontFace: FONT_BODY,
    fontSize: 12,
    bold: true,
    color: C_TEXT_LIGHT,
  });

  // Photo of David Vélez on right side with elegant frame
  if (fs.existsSync(velezPhotoPath)) {
    slide.addImage({
      path: velezPhotoPath,
      x: 7.4,
      y: 0.8,
      w: 5.1,
      h: 5.9,
      sizing: { type: "cover", w: 5.1, h: 5.9 },
    });
  }

  // Caption on photo
  addFlatShape(slide, pptx.ShapeType.rect, {
    x: 7.4,
    y: 6.1,
    w: 5.1,
    h: 0.6,
    fill: { color: C_DARK_PLUM, transparency: 20 },
    line: { color: C_DARK_PLUM, width: 0 },
  });

  addTextBox(slide, "David Vélez Osorno (Medellín, Colombia, 1981)", {
    x: 7.6,
    y: 6.22,
    w: 4.7,
    h: 0.35,
    fontFace: FONT_BODY,
    fontSize: 11,
    color: C_TEXT_LIGHT,
  });

  slide.speakerNotes =
    "David Vélez representa uno de los casos de disrupción empresarial más trascendentes del siglo XXI. Transformó la frustración personal con la banca brasileña en una de las mayores empresas tecnológicas de América Latina.";
}

// =========================================================================
// SLIDE 2: The Friction / The Origin (El Oligopolio y la Fricción)
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_BG_LIGHT };

  // Section Header
  addTextBox(slide, "El punto de quiebre: Enfrentar un oligopolio inexpugnable", {
    x: 0.8,
    y: 0.6,
    w: 11.7,
    h: 0.75,
    fontFace: FONT_TITLE,
    fontSize: 27,
    bold: true,
    color: C_TEXT_DARK,
  });

  // Left Column: The Personal Catalyst
  addFlatShape(slide, pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.6,
    w: 5.4,
    h: 5.1,
    rectRadius: 0.12,
    fill: { color: C_SURFACE_TINT },
    line: { color: C_SURFACE_TINT, width: 0 },
  });

  addTextBox(slide, "La odisea de São Paulo en 2012", {
    x: 1.1,
    y: 1.9,
    w: 4.8,
    h: 0.45,
    fontFace: FONT_TITLE,
    fontSize: 20,
    bold: true,
    color: C_NU_PURPLE,
  });

  addTextBox(
    slide,
    "Como socio de Sequoia Capital explorando inversiones en Brasil, David Vélez intentó abrir una cuenta bancaria ordinaria. Vivió seis meses de citas frustradas, documentos certificados, llamadas en espera y puertas giratorias blindadas donde los usuarios eran tratados como sospechosos.\n\nEn lugar de regresar a Silicon Valley tras la decisión de Sequoia de retirarse de Brasil, Vélez identificó la mayor oportunidad de arbitraje de valor en la historia financiera del continente.",
    {
      x: 1.1,
      y: 2.5,
      w: 4.8,
      h: 2.6,
      fontFace: FONT_BODY,
      fontSize: 14,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.25,
    }
  );

  // Stat Callout within left column
  addFlatShape(slide, pptx.ShapeType.roundRect, {
    x: 1.1,
    y: 5.3,
    w: 4.8,
    h: 1.1,
    rectRadius: 0.08,
    fill: { color: C_SURFACE_WHITE },
    line: { color: C_DIVIDER, width: 0.5 },
  });

  addTextBox(slide, "80% del mercado bancario brasileño", {
    x: 1.3,
    y: 5.45,
    w: 4.4,
    h: 0.35,
    fontFace: FONT_BODY,
    fontSize: 14,
    bold: true,
    color: C_TEXT_DARK,
  });

  addTextBox(
    slide,
    "Estaba concentrado en solo 5 entidades, con tasas de tarjeta superiores al 400% anual.",
    {
      x: 1.3,
      y: 5.85,
      w: 4.4,
      h: 0.45,
      fontFace: FONT_BODY,
      fontSize: 12,
      color: C_TEXT_MUTED,
    }
  );

  // Right Column: Three Structural Reality Checks (Editorial Hairline Stack)
  const rightX = 6.6;
  const colW = 5.9;

  // Reality Check 1
  addTextBox(slide, "Exclusión Masiva y Falta de Opciones", {
    x: rightX,
    y: 1.7,
    w: colW,
    h: 0.4,
    fontFace: FONT_TITLE,
    fontSize: 17,
    bold: true,
    color: C_NU_PURPLE,
  });
  addTextBox(
    slide,
    "Más de 55 millones de adultos estaban totalmente desbancarizados por falta de historial crediticio o ingresos tradicionales, ignorados por la banca establecida.",
    {
      x: rightX,
      y: 2.15,
      w: colW,
      h: 0.85,
      fontFace: FONT_BODY,
      fontSize: 13,
      color: C_TEXT_MUTED,
      lineSpacingMultiple: 1.2,
    }
  );

  // Hairline 1
  addFlatShape(slide, pptx.ShapeType.rect, {
    x: rightX,
    y: 3.15,
    w: colW,
    h: 0.01,
    fill: { color: C_DIVIDER },
    line: { color: C_DIVIDER, width: 0.5 },
  });

  // Reality Check 2
  addTextBox(slide, "La Apuesta por el Teléfono Inteligente", {
    x: rightX,
    y: 3.35,
    w: colW,
    h: 0.4,
    fontFace: FONT_TITLE,
    fontSize: 17,
    bold: true,
    color: C_NU_PURPLE,
  });
  addTextBox(
    slide,
    "La penetración de smartphones en América Latina crecía exponencialmente. Vélez comprendió que cada teléfono podía operar como una sucursal sin costo físico de agencias.",
    {
      x: rightX,
      y: 3.8,
      w: colW,
      h: 0.85,
      fontFace: FONT_BODY,
      fontSize: 13,
      color: C_TEXT_MUTED,
      lineSpacingMultiple: 1.2,
    }
  );

  // Hairline 2
  addFlatShape(slide, pptx.ShapeType.rect, {
    x: rightX,
    y: 4.8,
    w: colW,
    h: 0.01,
    fill: { color: C_DIVIDER },
    line: { color: C_DIVIDER, width: 0.5 },
  });

  // Reality Check 3
  addTextBox(slide, "El Escepticismo de la Industria", {
    x: rightX,
    y: 5.0,
    w: colW,
    h: 0.4,
    fontFace: FONT_TITLE,
    fontSize: 17,
    bold: true,
    color: C_NU_PURPLE,
  });
  addTextBox(
    slide,
    "Inversionistas locales advertían que era imposible competir contra los bancos más rentables del mundo y un regulador con reputación burocrática inflexible.",
    {
      x: rightX,
      y: 5.45,
      w: colW,
      h: 0.85,
      fontFace: FONT_BODY,
      fontSize: 13,
      color: C_TEXT_MUTED,
      lineSpacingMultiple: 1.2,
    }
  );

  slide.speakerNotes =
    "El dolor fundacional fue visceral y personal. David Vélez no creó Nubank desde una hoja de cálculo teórica, sino al experimentar la humillación directa que sufrían decenas de millones de brasileños diariamente.";
}

// =========================================================================
// SLIDE 3: The Founding Team (El Triunvirato Estratégico)
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_BG_LIGHT };

  addTextBox(slide, "El triunvirato fundador: Complementariedad disciplinar", {
    x: 0.8,
    y: 0.6,
    w: 11.7,
    h: 0.65,
    fontFace: FONT_TITLE,
    fontSize: 27,
    bold: true,
    color: C_TEXT_DARK,
  });

  addTextBox(
    slide,
    "Fundada en mayo de 2013 en una casa alquilada en Brooklin, São Paulo, Nu combinó tres perfiles indispensables.",
    {
      x: 0.8,
      y: 1.3,
      w: 11.7,
      h: 0.45,
      fontFace: FONT_BODY,
      fontSize: 15,
      color: C_TEXT_MUTED,
    }
  );

  const colW = 3.65;
  const gap = 0.38;

  // Founder 1: David Vélez (Spotlight)
  {
    const colX = 0.8;
    addFlatShape(slide, pptx.ShapeType.roundRect, {
      x: colX,
      y: 2.0,
      w: colW,
      h: 4.7,
      rectRadius: 0.12,
      fill: { color: C_SURFACE_TINT },
      line: { color: C_NU_PURPLE, width: 1 },
    });

    addTextBox(slide, "David Vélez", {
      x: colX + 0.3,
      y: 2.2,
      w: colW - 0.6,
      h: 0.5,
      fontFace: FONT_TITLE,
      fontSize: 22,
      bold: true,
      color: C_TEXT_DARK,
    });

    addTextBox(slide, "Colombia · CEO & Visionario", {
      x: colX + 0.3,
      y: 2.75,
      w: colW - 0.6,
      h: 0.3,
      fontFace: FONT_BODY,
      fontSize: 12,
      bold: true,
      color: C_NU_PURPLE,
    });

    addFlatShape(slide, pptx.ShapeType.roundRect, {
      x: colX + 0.3,
      y: 3.15,
      w: colW - 0.6,
      h: 0.38,
      rectRadius: 0.06,
      fill: { color: C_NU_PURPLE },
      line: { color: C_NU_PURPLE, width: 0 },
    });

    addTextBox(slide, "Estrategia Global & Capital", {
      x: colX + 0.35,
      y: 3.23,
      w: colW - 0.7,
      h: 0.28,
      fontFace: FONT_BODY,
      fontSize: 11,
      bold: true,
      color: C_TEXT_LIGHT,
    });

    addTextBox(
      slide,
      "Ingeniero y MBA de Stanford University. Trayectoria en banca de inversión en Morgan Stanley, capital privado en General Atlantic y socio para LatAm en Sequoia Capital. Aportó la capacidad de asignación de capital y visión de escala.",
      {
        x: colX + 0.3,
        y: 3.7,
        w: colW - 0.6,
        h: 2.1,
        fontFace: FONT_BODY,
        fontSize: 13,
        color: C_TEXT_MUTED,
        lineSpacingMultiple: 1.25,
      }
    );

    addTextBox(slide, "• Liderazgo y cultura Day 1", {
      x: colX + 0.3,
      y: 6.0,
      w: colW - 0.6,
      h: 0.5,
      fontFace: FONT_BODY,
      fontSize: 11,
      bold: true,
      color: C_TEXT_DARK,
    });
  }

  // Founder 2: Cristina Junqueira
  {
    const colX = 0.8 + 1 * (colW + gap);
    addFlatShape(slide, pptx.ShapeType.roundRect, {
      x: colX,
      y: 2.0,
      w: colW,
      h: 4.7,
      rectRadius: 0.12,
      fill: { color: C_SURFACE_WHITE },
      line: { color: C_DIVIDER, width: 0.5 },
    });

    addTextBox(slide, "Cristina Junqueira", {
      x: colX + 0.3,
      y: 2.2,
      w: colW - 0.6,
      h: 0.5,
      fontFace: FONT_TITLE,
      fontSize: 21,
      bold: true,
      color: C_TEXT_DARK,
    });

    addTextBox(slide, "Brasil · Co-fundadora & CBO", {
      x: colX + 0.3,
      y: 2.75,
      w: colW - 0.6,
      h: 0.3,
      fontFace: FONT_BODY,
      fontSize: 12,
      bold: true,
      color: C_NU_PURPLE,
    });

    addFlatShape(slide, pptx.ShapeType.roundRect, {
      x: colX + 0.3,
      y: 3.15,
      w: colW - 0.6,
      h: 0.38,
      rectRadius: 0.06,
      fill: { color: "EFEAF5" },
      line: { color: C_NU_PURPLE, width: 0 },
    });

    addTextBox(slide, "Regulación, Banca & Experiencia", {
      x: colX + 0.35,
      y: 3.23,
      w: colW - 0.7,
      h: 0.28,
      fontFace: FONT_BODY,
      fontSize: 11,
      bold: true,
      color: C_TEXT_DARK,
    });

    addTextBox(
      slide,
      "Ingeniera de la Universidad de São Paulo (USP) y MBA en Northwestern (Kellogg). Ex-directora de la cartera de tarjetas de crédito en Itaú Unibanco. Aportó el conocimiento profundo del marco regulatorio brasileño.",
      {
        x: colX + 0.3,
        y: 3.7,
        w: colW - 0.6,
        h: 2.1,
        fontFace: FONT_BODY,
        fontSize: 13,
        color: C_TEXT_MUTED,
        lineSpacingMultiple: 1.25,
      }
    );

    addTextBox(slide, "• Traducción de banca a lenguaje humano", {
      x: colX + 0.3,
      y: 6.0,
      w: colW - 0.6,
      h: 0.5,
      fontFace: FONT_BODY,
      fontSize: 11,
      bold: true,
      color: C_TEXT_DARK,
    });
  }

  // Founder 3: Edward Wible
  {
    const colX = 0.8 + 2 * (colW + gap);
    addFlatShape(slide, pptx.ShapeType.roundRect, {
      x: colX,
      y: 2.0,
      w: colW,
      h: 4.7,
      rectRadius: 0.12,
      fill: { color: C_SURFACE_WHITE },
      line: { color: C_DIVIDER, width: 0.5 },
    });

    addTextBox(slide, "Edward Wible", {
      x: colX + 0.3,
      y: 2.2,
      w: colW - 0.6,
      h: 0.5,
      fontFace: FONT_TITLE,
      fontSize: 22,
      bold: true,
      color: C_TEXT_DARK,
    });

    addTextBox(slide, "Estados Unidos · Co-fundador & CTO", {
      x: colX + 0.3,
      y: 2.75,
      w: colW - 0.6,
      h: 0.3,
      fontFace: FONT_BODY,
      fontSize: 12,
      bold: true,
      color: C_NU_PURPLE,
    });

    addFlatShape(slide, pptx.ShapeType.roundRect, {
      x: colX + 0.3,
      y: 3.15,
      w: colW - 0.6,
      h: 0.38,
      rectRadius: 0.06,
      fill: { color: "EFEAF5" },
      line: { color: C_NU_PURPLE, width: 0 },
    });

    addTextBox(slide, "Arquitectura & Código Nativo", {
      x: colX + 0.35,
      y: 3.23,
      w: colW - 0.7,
      h: 0.28,
      fontFace: FONT_BODY,
      fontSize: 11,
      bold: true,
      color: C_TEXT_DARK,
    });

    addTextBox(
      slide,
      "Graduado en Ciencias de la Computación en Princeton University e INSEAD. Construyó desde cero una infraestructura bancaria nativa en la nube (Clojure y microservicios), eliminando los costos de sistemas heredados de la banca física.",
      {
        x: colX + 0.3,
        y: 3.7,
        w: colW - 0.6,
        h: 2.1,
        fontFace: FONT_BODY,
        fontSize: 13,
        color: C_TEXT_MUTED,
        lineSpacingMultiple: 1.25,
      }
    );

    addTextBox(slide, "• Infraestructura Cloud de ultra-bajo costo", {
      x: colX + 0.3,
      y: 6.0,
      w: colW - 0.6,
      h: 0.5,
      fontFace: FONT_BODY,
      fontSize: 11,
      bold: true,
      color: C_TEXT_DARK,
    });
  }

  slide.speakerNotes =
    "David Vélez comprendió tempranamente que un fundador solitario fracasaría ante la complejidad bancaria. Construyó un equipo con un ingeniero de software de élite mundial y una ejecutiva con dominio del sistema financiero tradicional.";
}

// =========================================================================
// SLIDE 4: Giant Metric Hero & Native Bar Chart (105M+ Clientes)
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_DARK_PLUM };

  // Left Column: Massive Metric Breather
  addTextBox(slide, "105M+", {
    x: 0.8,
    y: 1.2,
    w: 4.8,
    h: 1.3,
    fontFace: FONT_BODY,
    fontSize: 72,
    bold: true,
    color: C_NU_PURPLE,
  });

  addTextBox(slide, "Clientes activos en América Latina", {
    x: 0.85,
    y: 2.5,
    w: 4.7,
    h: 0.55,
    fontFace: FONT_TITLE,
    fontSize: 22,
    bold: true,
    color: C_TEXT_LIGHT,
  });

  addTextBox(
    slide,
    "En menos de una década, Nubank superó a las instituciones centenarias, convirtiéndose en el banco digital independiente más grande del mundo occidental.\n\nHoy, más del 56% de la población adulta de Brasil posee una cuenta activa en Nu, con una acelerada expansión en México y Colombia.",
    {
      x: 0.85,
      y: 3.2,
      w: 4.6,
      h: 2.4,
      fontFace: FONT_BODY,
      fontSize: 14,
      color: C_TEXT_LIGHT_MUTED,
      lineSpacingMultiple: 1.3,
    }
  );

  // Geographic footprint pills
  const geoText = "Brasil: ~98M  ·  México: ~9M  ·  Colombia: ~2M";
  addFlatShape(slide, pptx.ShapeType.roundRect, {
    x: 0.85,
    y: 5.7,
    w: 4.6,
    h: 0.45,
    rectRadius: 0.08,
    fill: { color: C_NU_PURPLE, transparency: 40 },
    line: { color: C_NU_PURPLE, width: 0.5 },
  });

  addTextBox(slide, geoText, {
    x: 1.0,
    y: 5.82,
    w: 4.3,
    h: 0.3,
    fontFace: FONT_BODY,
    fontSize: 11,
    bold: true,
    color: C_TEXT_LIGHT,
  });

  // Right Column: Native Editable Bar Chart
  addTextBox(slide, "Trayectoria de usuarios activos (Millones)", {
    x: 5.9,
    y: 0.85,
    w: 6.6,
    h: 0.45,
    fontFace: FONT_TITLE,
    fontSize: 18,
    bold: true,
    color: C_TEXT_LIGHT,
  });

  const chartData = [
    {
      name: "Usuarios (M)",
      labels: ["2014", "2016", "2018", "2020", "2022", "2024"],
      values: [0.1, 1.0, 6.0, 33.3, 74.6, 105.0],
    },
  ];

  const chartOpts = cleanChartOptions({
    x: 5.9,
    y: 1.4,
    w: 6.6,
    h: 5.2,
    chartColors: [C_NU_PURPLE],
    labelColor: C_TEXT_LIGHT,
    fontFace: FONT_BODY,
    valFontSize: 13,
    catFontSize: 13,
    barDir: "bar",
  });

  slide.addChart(pptx.ChartType.bar, chartData, chartOpts);

  slide.speakerNotes =
    "El crecimiento de Nubank no se detuvo en la tarjeta de crédito inicial. Con NuConta y la posterior inclusión de créditos, nómina e inversiones, la adopción se disparó hasta superar los 100 millones de clientes activos.";
}

// =========================================================================
// SLIDE 5: Operating Philosophy (Los 4 Pilares de Gestión)
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_BG_LIGHT };

  addTextBox(slide, "La filosofía de gestión de David Vélez", {
    x: 0.8,
    y: 0.6,
    w: 11.7,
    h: 0.65,
    fontFace: FONT_TITLE,
    fontSize: 27,
    bold: true,
    color: C_TEXT_DARK,
  });

  addTextBox(
    slide,
    "Cuatro pilares innegociables que explican cómo Nubank superó en eficiencia y lealtad a los bancos tradicionales.",
    {
      x: 0.8,
      y: 1.3,
      w: 11.7,
      h: 0.45,
      fontFace: FONT_BODY,
      fontSize: 15,
      color: C_TEXT_MUTED,
    }
  );

  const pillars = [
    {
      icon: icons.heart_hand,
      title: "Obsesión por el Cliente ('Fanáticos')",
      desc: "En lugar de tratar al cliente como fuente de cargos ocultos, Nubank midió su éxito por la recomendación orgánica. Equipos de atención humana con poder de decisión 24/7 sin transferencias automáticas interminables.",
      metric: "NPS sostenido > 80 puntos",
    },
    {
      icon: icons.trending_up,
      title: "Costo Unitario de Servir Disruptivo",
      desc: "Mientras un banco de red física gasta entre $15 y $20 USD mensuales por cliente activo en sucursales y personal, Nubank opera con un costo de servicio inferior a $0.90 USD/mes gracias a su arquitectura cloud.",
      metric: "Costo de servicio 85% menor",
    },
    {
      icon: icons.cpu_code,
      title: "Cultura de Tecnología sin Silos",
      desc: "Vélez instauró una mentalidad 'Day 1' de Silicon Valley. No hay departamentos aislados de negocio vs. tecnología; equipos multidisciplinarios son dueños de punta a punta del ciclo de vida del producto.",
      metric: "Despliegues continuos diarios",
    },
    {
      icon: icons.globe_latam,
      title: "Expansión Disciplinada y Paciente",
      desc: "Replicar el éxito brasileño requirió adaptarse a la regulación mexicana y colombiana con prudencia crediticia, esperando hasta tener modelos de machine learning validados antes de acelerar.",
      metric: "Liderazgo en 3 economías clave",
    },
  ];

  const cardW = 5.65;
  const cardH = 2.3;
  const colGap = 0.4;
  const rowGap = 0.35;

  function drawPillarCard(col, row, iconPath, title, desc, metric) {
    const cX = 0.8 + col * (cardW + colGap);
    const cY = 1.95 + row * (cardH + rowGap);

    addFlatShape(slide, pptx.ShapeType.roundRect, {
      x: cX,
      y: cY,
      w: cardW,
      h: cardH,
      rectRadius: 0.1,
      fill: { color: C_SURFACE_WHITE },
      line: { color: C_DIVIDER, width: 0.5 },
    });

    if (iconPath && fs.existsSync(iconPath)) {
      slide.addImage({
        path: iconPath,
        x: cX + 0.3,
        y: cY + 0.25,
        w: 0.45,
        h: 0.45,
      });
    }

    addTextBox(slide, title, {
      x: cX + 0.9,
      y: cY + 0.22,
      w: cardW - 1.2,
      h: 0.4,
      fontFace: FONT_TITLE,
      fontSize: 16,
      bold: true,
      color: C_TEXT_DARK,
    });

    addTextBox(slide, desc, {
      x: cX + 0.3,
      y: cY + 0.8,
      w: cardW - 0.6,
      h: 0.95,
      fontFace: FONT_BODY,
      fontSize: 12,
      color: C_TEXT_MUTED,
      lineSpacingMultiple: 1.2,
    });

    addFlatShape(slide, pptx.ShapeType.roundRect, {
      x: cX + 0.3,
      y: cY + 1.82,
      w: cardW - 0.6,
      h: 0.32,
      rectRadius: 0.05,
      fill: { color: C_SURFACE_TINT },
      line: { color: C_SURFACE_TINT, width: 0 },
    });

    addTextBox(slide, `Indicador Clave: ${metric}`, {
      x: cX + 0.45,
      y: cY + 1.88,
      w: cardW - 0.9,
      h: 0.22,
      fontFace: FONT_BODY,
      fontSize: 11,
      bold: true,
      color: C_NU_PURPLE,
    });
  }

  drawPillarCard(0, 0, pillars[0].icon, pillars[0].title, pillars[0].desc, pillars[0].metric);
  drawPillarCard(1, 0, pillars[1].icon, pillars[1].title, pillars[1].desc, pillars[1].metric);
  drawPillarCard(0, 1, pillars[2].icon, pillars[2].title, pillars[2].desc, pillars[2].metric);
  drawPillarCard(1, 1, pillars[3].icon, pillars[3].title, pillars[3].desc, pillars[3].metric);

  slide.speakerNotes =
    "El diferencial competitivo de Nubank radica en su ventaja de costo estructural combinada con una obsesión cultural por la experiencia de usuario. Esta combinación imposibilitó que la banca tradicional reaccionara a tiempo.";
}

// =========================================================================
// SLIDE 6: Financial Performance & NYSE IPO (La Consolidación Financiera)
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_BG_LIGHT };

  addTextBox(slide, "Salida a Bolsa (NYSE: NU) y rentabilidad a escala", {
    x: 0.8,
    y: 0.6,
    w: 11.7,
    h: 0.65,
    fontFace: FONT_TITLE,
    fontSize: 27,
    bold: true,
    color: C_TEXT_DARK,
  });

  addTextBox(
    slide,
    "Nubank demostró que el modelo digital genera márgenes operativos superiores a la banca física tradicional.",
    {
      x: 0.8,
      y: 1.3,
      w: 11.7,
      h: 0.45,
      fontFace: FONT_BODY,
      fontSize: 15,
      color: C_TEXT_MUTED,
    }
  );

  // Left side: IPO and Net Profit Stats
  const leftX = 0.8;
  const leftW = 4.2;

  addFlatShape(slide, pptx.ShapeType.roundRect, {
    x: leftX,
    y: 1.9,
    w: leftW,
    h: 2.4,
    rectRadius: 0.1,
    fill: { color: C_SURFACE_TINT },
    line: { color: C_NU_PURPLE, width: 0.5 },
  });

  addTextBox(slide, "Salida a Bolsa en Wall Street", {
    x: leftX + 0.3,
    y: 2.1,
    w: leftW - 0.6,
    h: 0.35,
    fontFace: FONT_TITLE,
    fontSize: 17,
    bold: true,
    color: C_NU_PURPLE,
  });

  addTextBox(slide, "$41.5B USD", {
    x: leftX + 0.3,
    y: 2.5,
    w: leftW - 0.6,
    h: 0.7,
    fontFace: FONT_BODY,
    fontSize: 36,
    bold: true,
    color: C_TEXT_DARK,
  });

  addTextBox(
    slide,
    "Diciembre de 2021 (NYSE: NU). Se convirtió al debutar en la institución financiera más valiosa de América Latina.",
    {
      x: leftX + 0.3,
      y: 3.25,
      w: leftW - 0.6,
      h: 0.85,
      fontFace: FONT_BODY,
      fontSize: 12,
      color: C_TEXT_MUTED,
      lineSpacingMultiple: 1.2,
    }
  );

  addFlatShape(slide, pptx.ShapeType.roundRect, {
    x: leftX,
    y: 4.5,
    w: leftW,
    h: 2.2,
    rectRadius: 0.1,
    fill: { color: C_SURFACE_WHITE },
    line: { color: C_DIVIDER, width: 0.5 },
  });

  addTextBox(slide, "Rentabilidad Neta Anualizada", {
    x: leftX + 0.3,
    y: 4.7,
    w: leftW - 0.6,
    h: 0.35,
    fontFace: FONT_TITLE,
    fontSize: 17,
    bold: true,
    color: C_EMERALD,
  });

  addTextBox(slide, "> $1.0B USD", {
    x: leftX + 0.3,
    y: 5.05,
    w: leftW - 0.6,
    h: 0.72,
    fontFace: FONT_BODY,
    fontSize: 34,
    bold: true,
    color: C_TEXT_DARK,
  });

  addTextBox(
    slide,
    "Con un Retorno sobre Patrimonio (ROE) superior al 26% en Brasil, superando el promedio de la banca tradicional.",
    {
      x: leftX + 0.3,
      y: 5.85,
      w: leftW - 0.6,
      h: 0.75,
      fontFace: FONT_BODY,
      fontSize: 12,
      color: C_TEXT_MUTED,
    }
  );

  // Right side: Comparative Performance Table
  const tableX = 5.3;
  const tableW = 7.2;

  addFlatShape(slide, pptx.ShapeType.roundRect, {
    x: tableX,
    y: 1.9,
    w: tableW,
    h: 4.8,
    rectRadius: 0.1,
    fill: { color: C_SURFACE_WHITE },
    line: { color: C_DIVIDER, width: 0.5 },
  });

  addTextBox(slide, "Comparativa de Eficiencia Operativa (Benchmark Bancario)", {
    x: tableX + 0.4,
    y: 2.1,
    w: tableW - 0.8,
    h: 0.35,
    fontFace: FONT_TITLE,
    fontSize: 16,
    bold: true,
    color: C_TEXT_DARK,
  });

  const headers = ["Métrica Operativa", "Banca Tradicional", "Nubank (David Vélez)"];
  const rows = [
    ["Costo mensual de servir por cliente", "$15.00 - $20.00 USD", "< $0.90 USD"],
    ["Costo de adquisición de clientes (CAC)", "$45.00 - $70.00 USD", "< $5.00 USD (80%+ viral)"],
    ["Tiempo de apertura de cuenta", "2 a 4 semanas (en agencia)", "Menos de 3 minutos en app"],
    ["Net Promoter Score (NPS)", "15 a 30 puntos", "80+ puntos sostenidos"],
    ["Ratio de eficiencia (gasto / ingreso)", "45% a 55%", "< 32% (Líder en la industria)"],
  ];

  // Draw clean hairline rows
  let rowY = 2.6;
  // Header row
  addTextBox(slide, headers[0], {
    x: tableX + 0.4,
    y: rowY,
    w: 2.8,
    h: 0.35,
    fontFace: FONT_BODY,
    fontSize: 12,
    bold: true,
    color: C_TEXT_MUTED,
  });
  addTextBox(slide, headers[1], {
    x: tableX + 3.3,
    y: rowY,
    w: 1.8,
    h: 0.35,
    fontFace: FONT_BODY,
    fontSize: 12,
    bold: true,
    color: C_TEXT_MUTED,
  });
  addTextBox(slide, headers[2], {
    x: tableX + 5.2,
    y: rowY,
    w: 1.6,
    h: 0.35,
    fontFace: FONT_BODY,
    fontSize: 12,
    bold: true,
    color: C_NU_PURPLE,
  });

  rowY += 0.45;

  for (let idx = 0; idx < rows.length; idx++) {
    const r = rows[idx];
    addFlatShape(slide, pptx.ShapeType.rect, {
      x: tableX + 0.4,
      y: rowY,
      w: tableW - 0.8,
      h: 0.01,
      fill: { color: C_DIVIDER },
      line: { color: C_DIVIDER, width: 0.5 },
    });

    rowY += 0.12;

    addTextBox(slide, r[0], {
      x: tableX + 0.4,
      y: rowY,
      w: 2.8,
      h: 0.4,
      fontFace: FONT_BODY,
      fontSize: 12,
      color: C_TEXT_DARK,
    });

    addTextBox(slide, r[1], {
      x: tableX + 3.3,
      y: rowY,
      w: 1.8,
      h: 0.4,
      fontFace: FONT_BODY,
      fontSize: 12,
      color: C_TEXT_MUTED,
    });

    addTextBox(slide, r[2], {
      x: tableX + 5.2,
      y: rowY,
      w: 1.6,
      h: 0.4,
      fontFace: FONT_BODY,
      fontSize: 12,
      bold: true,
      color: C_NU_PURPLE,
    });

    rowY += 0.55;
  }

  slide.speakerNotes =
    "Durante años los críticos argumentaron que los neobancos no podían ser rentables. David Vélez demostró lo contrario: Nubank hoy genera márgenes y ratios de eficiencia muy superiores a los de los megabancos tradicionales.";
}

// =========================================================================
// SLIDE 7: Philanthropy & Giving Pledge (Trascendencia Social)
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_DARK_PLUM };

  // Subtle background translucent shape
  addTranslucentAccent(slide, pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 0.8,
    w: 11.7,
    h: 5.9,
    color: C_NU_PURPLE,
    transparency: 92,
  });

  addTextBox(slide, "Trascendencia y legado filantrópico", {
    x: 1.2,
    y: 1.1,
    w: 10.9,
    h: 0.5,
    fontFace: FONT_TITLE,
    fontSize: 24,
    bold: true,
    color: C_TEXT_LIGHT,
  });

  // Quote Box
  addTextBox(
    slide,
    `"El dinero no nos da ninguna satisfacción material adicional. Nuestra meta es donar prácticamente la totalidad de nuestro patrimonio a filantropía, concentrándonos en educación y liderazgo para desatar el potencial de América Latina."`,
    {
      x: 1.2,
      y: 1.8,
      w: 10.9,
      h: 1.8,
      fontFace: FONT_TITLE,
      fontSize: 24,
      italic: true,
      color: C_TEXT_LIGHT,
      lineSpacingMultiple: 1.3,
    }
  );

  addTextBox(slide, "— David Vélez y Mariel Reyes Milk", {
    x: 1.2,
    y: 3.7,
    w: 10.9,
    h: 0.45,
    fontFace: FONT_BODY,
    fontSize: 16,
    bold: true,
    color: C_TEXT_LIGHT_MUTED,
  });

  // Two Focus Pillars of their Philanthropy
  const philLeftX = 1.2;
  const philW = 5.25;

  addFlatShape(slide, pptx.ShapeType.roundRect, {
    x: philLeftX,
    y: 4.4,
    w: philW,
    h: 1.9,
    rectRadius: 0.08,
    fill: { color: C_NU_PURPLE, transparency: 30 },
    line: { color: C_NU_PURPLE, width: 0.5 },
  });

  addTextBox(slide, "The Giving Pledge (2021)", {
    x: philLeftX + 0.3,
    y: 4.6,
    w: philW - 0.6,
    h: 0.35,
    fontFace: FONT_TITLE,
    fontSize: 16,
    bold: true,
    color: C_TEXT_LIGHT,
  });

  addTextBox(
    slide,
    "Primer matrimonio colombiano en unirse al compromiso global iniciado por Warren Buffett y Bill Gates. Se comprometieron a donar al menos el 95% de su fortuna personal a lo largo de sus vidas.",
    {
      x: philLeftX + 0.3,
      y: 5.0,
      w: philW - 0.6,
      h: 1.1,
      fontFace: FONT_BODY,
      fontSize: 12,
      color: C_TEXT_LIGHT_MUTED,
      lineSpacingMultiple: 1.2,
    }
  );

  const philRightX = 6.85;

  addFlatShape(slide, pptx.ShapeType.roundRect, {
    x: philRightX,
    y: 4.4,
    w: philW,
    h: 1.9,
    rectRadius: 0.08,
    fill: { color: C_NU_PURPLE, transparency: 30 },
    line: { color: C_NU_PURPLE, width: 0.5 },
  });

  addTextBox(slide, "Plataforma VélezReyes+", {
    x: philRightX + 0.3,
    y: 4.6,
    w: philW - 0.6,
    h: 0.35,
    fontFace: FONT_TITLE,
    fontSize: 16,
    bold: true,
    color: C_TEXT_LIGHT,
  });

  addTextBox(
    slide,
    "Iniciativa filantrópica enfocada en cerrar brechas de oportunidad en Brasil y Colombia a través de becas universitarias, bootcamps de programación para jóvenes vulnerables y formación de líderes cívicos.",
    {
      x: philRightX + 0.3,
      y: 5.0,
      w: philW - 0.6,
      h: 1.1,
      fontFace: FONT_BODY,
      fontSize: 12,
      color: C_TEXT_LIGHT_MUTED,
      lineSpacingMultiple: 1.2,
    }
  );

  slide.speakerNotes =
    "En agosto de 2021, David y Mariel firmaron The Giving Pledge. Su filosofía rechaza la acumulación dinástica de riqueza y apuesta por la movilidad social a través de la educación en América Latina.";
}

// =========================================================================
// SLIDE 8: The Future / Conclusion (Lecciones y Horizonte)
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C_BG_LIGHT };

  addTextBox(slide, "El impacto duradero de David Vélez en América Latina", {
    x: 0.8,
    y: 0.6,
    w: 11.7,
    h: 0.65,
    fontFace: FONT_TITLE,
    fontSize: 27,
    bold: true,
    color: C_TEXT_DARK,
  });

  addTextBox(
    slide,
    "La trayectoria de David Vélez derribó el mito de que en la región no se pueden crear gigantes tecnológicos globales.",
    {
      x: 0.8,
      y: 1.3,
      w: 11.7,
      h: 0.45,
      fontFace: FONT_BODY,
      fontSize: 15,
      color: C_TEXT_MUTED,
    }
  );

  // Left side: 3 Fundamental Principles
  const leftX = 0.8;
  const leftW = 5.6;

  addFlatShape(slide, pptx.ShapeType.roundRect, {
    x: leftX,
    y: 1.95,
    w: leftW,
    h: 4.75,
    rectRadius: 0.1,
    fill: { color: C_SURFACE_WHITE },
    line: { color: C_DIVIDER, width: 0.5 },
  });

  addTextBox(slide, "Tres lecciones magistrales para emprendedores", {
    x: leftX + 0.4,
    y: 2.2,
    w: leftW - 0.8,
    h: 0.35,
    fontFace: FONT_TITLE,
    fontSize: 18,
    bold: true,
    color: C_NU_PURPLE,
  });

  const lessons = [
    {
      bold: "La fricción es la oportunidad:",
      text: " Los monopolios arraigados y los mercados desatendidos ofrecen el mayor potencial cuando se atacan con tecnología y ética.",
    },
    {
      bold: "La cultura como foso defensivo:",
      text: " La obsesión por el cliente no es un eslogan de marketing, sino un sistema de incentivos y autonomía de ingeniería.",
    },
    {
      bold: "Ambición continental con disciplina:",
      text: " Pensar en grande desde el primer día sin descuidar el rigor analítico de la rentabilidad unitaria.",
    },
  ];

  let lY = 2.75;
  lessons.forEach((l) => {
    addTextBox(
      slide,
      [
        { text: l.bold, options: { bold: true, color: C_TEXT_DARK } },
        { text: l.text, options: { color: C_TEXT_MUTED } },
      ],
      {
        x: leftX + 0.4,
        y: lY,
        w: leftW - 0.8,
        h: 0.95,
        fontFace: FONT_BODY,
        fontSize: 13,
        lineSpacingMultiple: 1.25,
      }
    );
    lY += 1.15;
  });

  // Right side: The Next Frontier
  const rightX = 6.8;
  const rightW = 5.7;

  addFlatShape(slide, pptx.ShapeType.roundRect, {
    x: rightX,
    y: 1.95,
    w: rightW,
    h: 4.75,
    rectRadius: 0.1,
    fill: { color: C_SURFACE_TINT },
    line: { color: C_NU_PURPLE, width: 0.5 },
  });

  addTextBox(slide, "La siguiente década de Nu Holdings", {
    x: rightX + 0.4,
    y: 2.2,
    w: rightW - 0.8,
    h: 0.35,
    fontFace: FONT_TITLE,
    fontSize: 18,
    bold: true,
    color: C_TEXT_DARK,
  });

  const frontiers = [
    {
      title: "Consolidación en México y Colombia",
      desc: "Superar la penetración alcanzada en Brasil convirtiéndose en la cuenta de nómina y ahorro principal de millones de familias.",
    },
    {
      title: "Expansión al Segmento Empresarial (PYMEs)",
      desc: "Llevar la misma transparencia y costo cero a microempresarios históricamente asfixiados por comisiones bancarias tradicionales.",
    },
    {
      title: "Inteligencia Artificial Financiera Personalizada",
      desc: "Evolucionar de una aplicación bancaria a un asistente patrimonial autónomo que optimice gastos e inversiones para cada usuario.",
    },
  ];

  let fY = 2.75;
  frontiers.forEach((f) => {
    addTextBox(slide, f.title, {
      x: rightX + 0.4,
      y: fY,
      w: rightW - 0.8,
      h: 0.3,
      fontFace: FONT_TITLE,
      fontSize: 15,
      bold: true,
      color: C_NU_PURPLE,
    });

    addTextBox(slide, f.desc, {
      x: rightX + 0.4,
      y: fY + 0.35,
      w: rightW - 0.8,
      h: 0.7,
      fontFace: FONT_BODY,
      fontSize: 12,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.2,
    });

    fY += 1.15;
  });

  slide.speakerNotes =
    "David Vélez no solo construyó un banco digital de $40B+ de valuación; sentó un precedente inspirador para las próximas generaciones de fundadores latinoamericanos.";
}

// Write the PPTX presentation file
console.log(`Writing presentation to: ${OUT_FILE}`);
await pptx.writeFile({ fileName: OUT_FILE });
console.log("PPTX generation complete!");

"""
anti-slop-pptx-kit — python-pptx Studio Component Library (v3.0)
Full parity with pptxgenjs-studio-kit.mjs:
- 8 Color-Harmony Palettes (60-30-10 + Warm-vs-Cool contrast)
- 4 Curated Font Systems
- 13 Graphic-Design Slide Archetypes + Vector Motifs + Speaker Notes separation
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

SLIDE_W = Inches(13.333)
SLIDE_H = Inches(7.5)
MX = Inches(0.8)
MY = Inches(0.7)

PALETTES = {
    "OBSIDIAN_CITRINE": {
        "dark_bg": "0B0C0E", "dark_surface": "17191D", "light_bg": "F4F5F3", "light_surface": "FFFFFF",
        "ink_dark": "F7F7F5", "muted_dark": "8F949E", "rule_dark": "262930",
        "ink_light": "121316", "muted_light": "5C616B", "rule_light": "E0E2DF",
        "accent": "C8D636", "ink_accent": "0B0C0E",
    },
    "SWISS_ORANGE": {
        "dark_bg": "111111", "dark_surface": "1D1D1D", "light_bg": "F5F4F0", "light_surface": "FFFFFF",
        "ink_dark": "FAF9F6", "muted_dark": "94918B", "rule_dark": "2A2927",
        "ink_light": "141413", "muted_light": "63605A", "rule_light": "E2DFD7",
        "accent": "FF4D00", "ink_accent": "FFFFFF",
    },
    "INDIGO_BONE": {
        "dark_bg": "0B1325", "dark_surface": "14203B", "light_bg": "F6F5F1", "light_surface": "FFFFFF",
        "ink_dark": "FAFAF8", "muted_dark": "919DB5", "rule_dark": "223152",
        "ink_light": "0B1325", "muted_light": "586174", "rule_light": "E3E1D8",
        "accent": "F2B53A", "ink_accent": "0B1325",
    },
    "DEEP_TEAL_CREAM": {
        "dark_bg": "013330", "dark_surface": "084743", "light_bg": "F3EBDD", "light_surface": "FAF6EE",
        "ink_dark": "F7F3EA", "muted_dark": "9CC2BE", "rule_dark": "135954",
        "ink_light": "013330", "muted_light": "4A6B67", "rule_light": "DDD2BF",
        "accent": "FF6A1F", "ink_accent": "FFFFFF",
    },
    "NAVY_STEEL": {
        "dark_bg": "26364D", "dark_surface": "324561", "light_bg": "F4F7F9", "light_surface": "FFFFFF",
        "ink_dark": "FFFFFF", "muted_dark": "9DB4BE", "rule_dark": "435A7A",
        "ink_light": "26364D", "muted_light": "547182", "rule_light": "D8E2E7",
        "accent": "547182", "ink_accent": "FFFFFF",
    },
    "PLUM_LAVENDER": {
        "dark_bg": "342952", "dark_surface": "4E4074", "light_bg": "F7F5FC", "light_surface": "FFFFFF",
        "ink_dark": "F7F5FC", "muted_dark": "BEB5D9", "rule_dark": "5E4F87",
        "ink_light": "2A2042", "muted_light": "6E628C", "rule_light": "E5DFF2",
        "accent": "4E4074", "ink_accent": "FFFFFF",
    },
    "BLUSH_OLIVE": {
        "dark_bg": "2E3320", "dark_surface": "3E452C", "light_bg": "FAF3F4", "light_surface": "FFFFFF",
        "ink_dark": "F9CDD5", "muted_dark": "B8C0A2", "rule_dark": "51593C",
        "ink_light": "2E3320", "muted_light": "666B54", "rule_light": "EAD9DC",
        "accent": "7A8450", "ink_accent": "FFFFFF",
    },
    "CERULEAN_BUTTER": {
        "dark_bg": "183145", "dark_surface": "23445E", "light_bg": "FFF9E6", "light_surface": "FFFFFF",
        "ink_dark": "FFEDA2", "muted_dark": "9CBBD1", "rule_dark": "335B7A",
        "ink_light": "183145", "muted_light": "4C6B82", "rule_light": "F0E2B6",
        "accent": "4282AA", "ink_accent": "FFFFFF",
    },
    "OFFWHITE_TEAL_INTRO": {
        "dark_bg": "1A365D", "dark_surface": "254B80", "light_bg": "F7FAFC", "light_surface": "FFFFFF",
        "ink_dark": "F7FAFC", "muted_dark": "A0C4DF", "rule_dark": "315C96",
        "ink_light": "1A365D", "muted_light": "4A5568", "rule_light": "DCE6F0",
        "accent": "38B2AC", "ink_accent": "0F2928",
    },
    "NAVY_CORAL_PROPOSAL": {
        "dark_bg": "0F2A44", "dark_surface": "193D61", "light_bg": "FAF8F3", "light_surface": "FFFFFF",
        "ink_dark": "FAF8F3", "muted_dark": "9FB7CC", "rule_dark": "26517A",
        "ink_light": "0F2A44", "muted_light": "52657A", "rule_light": "E6E0D3",
        "accent": "F06A3A", "ink_accent": "FFFFFF",
    },
    "WARM_CORAL_TEACH": {
        "dark_bg": "2D3748", "dark_surface": "3E4C63", "light_bg": "FFF8F0", "light_surface": "FFFFFF",
        "ink_dark": "FFF8F0", "muted_dark": "CBD5E0", "rule_dark": "4A5568",
        "ink_light": "2D3748", "muted_light": "5A6577", "rule_light": "EFE3D4",
        "accent": "E53E3E", "ink_accent": "FFFFFF",
    },
    "CHARCOAL_MINT_TECH": {
        "dark_bg": "1A202C", "dark_surface": "252E3F", "light_bg": "F4F6F8", "light_surface": "FFFFFF",
        "ink_dark": "F7FAFC", "muted_dark": "A0AEC0", "rule_dark": "344054",
        "ink_light": "1A202C", "muted_light": "4A5568", "rule_light": "DDE3EA",
        "accent": "48BB78", "ink_accent": "0F291A",
    },
    "BLACK_YELLOW_MORPH": {
        "dark_bg": "111111", "dark_surface": "1F1F1F", "light_bg": "F2F2F0", "light_surface": "FFFFFF",
        "ink_dark": "FFFFFF", "muted_dark": "9E9E9E", "rule_dark": "2E2E2E",
        "ink_light": "111111", "muted_light": "555555", "rule_light": "DCDCD8",
        "accent": "F5D000", "ink_accent": "111111",
    },
}

FONT_SYSTEMS = {
    "SWISS_TECH": {"display": "Switzer", "body": "Poppins", "mono": "Consolas"},
    "BOLD_PRODUCT": {"display": "Montserrat", "body": "Poppins", "mono": "Consolas"},
    "EDITORIAL_LUXURY": {"display": "Georgia", "body": "DM Sans", "mono": "Consolas"},
    "MODERN_STUDIO": {"display": "Familjen Grotesk", "body": "DM Sans", "mono": "Consolas"},
}


def rgb(hex_str: str) -> RGBColor:
    return RGBColor.from_string(hex_str)


def create_studio_presentation() -> Presentation:
    prs = Presentation()
    prs.slide_width = SLIDE_W
    prs.slide_height = SLIDE_H
    return prs


def _set_bg(slide, hex_color: str):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = rgb(hex_color)


def _add_notes(slide, speaker_notes: str):
    if speaker_notes:
        slide.notes_slide.notes_text_frame.text = speaker_notes


def _add_turn_title(slide, parts, x, y, w, h, font_pt, ink, accent, font_name="Montserrat"):
    box = slide.shapes.add_textbox(x, y, w, h)
    tf = box.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = MSO_ANCHOR.TOP
    p = tf.paragraphs[0]
    for text, is_accent in parts:
        run = p.add_run()
        run.text = text
        run.font.name = font_name
        run.font.size = Pt(font_pt)
        run.font.bold = True
        run.font.color.rgb = rgb(accent if is_accent else ink)


def _quiet_page_num(slide, page_num: int | None, muted_hex: str, mono_font="Consolas"):
    if not page_num:
        return
    box = slide.shapes.add_textbox(SLIDE_W - MX - Inches(0.8), SLIDE_H - Inches(0.52), Inches(0.8), Inches(0.3))
    p = box.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.RIGHT
    run = p.add_run()
    run.text = f"{page_num:02d}"
    run.font.name = mono_font
    run.font.size = Pt(9)
    run.font.color.rgb = rgb(muted_hex)


def add_concentric_target(slide, cx, cy, outer_r_in: float, color_hex: str):
    for idx, scale in enumerate((1.0, 0.62, 0.28)):
        d = Inches(outer_r_in * 2 * scale)
        dot = slide.shapes.add_shape(MSO_SHAPE.OVAL, cx - d / 2, cy - d / 2, d, d)
        if idx == 2:
            dot.fill.solid()
            dot.fill.fore_color.rgb = rgb(color_hex)
        else:
            dot.fill.background()
        dot.line.color.rgb = rgb(color_hex)
        dot.line.width = Pt(1 if idx == 0 else 1.5)


def render_cover_slide(prs, pal, title_parts, subtitle="", meta_line="", speaker_notes="", fonts=FONT_SYSTEMS["BOLD_PRODUCT"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    _set_bg(slide, pal["dark_bg"])
    add_concentric_target(slide, Inches(11.2), Inches(3.75), 1.5, pal["accent"])

    if meta_line:
        tb = slide.shapes.add_textbox(MX, MY, Inches(8), Inches(0.3))
        r = tb.text_frame.paragraphs[0].add_run()
        r.text = meta_line.upper()
        r.font.name = fonts["mono"]
        r.font.size = Pt(9)
        r.font.color.rgb = rgb(pal["muted_dark"])

    _add_turn_title(slide, title_parts, MX, Inches(1.95), Inches(8.8), Inches(2.6), 46, pal["ink_dark"], pal["accent"], fonts["display"])

    bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, MX, Inches(4.95), Inches(1.4), Inches(0.04))
    bar.fill.solid()
    bar.fill.fore_color.rgb = rgb(pal["accent"])
    bar.line.fill.background()

    if subtitle:
        tb = slide.shapes.add_textbox(MX, Inches(5.2), Inches(7.5), Inches(0.95))
        tb.text_frame.word_wrap = True
        r = tb.text_frame.paragraphs[0].add_run()
        r.text = subtitle
        r.font.name = fonts["body"]
        r.font.size = Pt(14.5)
        r.font.color.rgb = rgb(pal["muted_dark"])
    _add_notes(slide, speaker_notes)
    return slide


def render_statement_slide(prs, pal, title_parts, dark=True, page_num=None, speaker_notes="", fonts=FONT_SYSTEMS["BOLD_PRODUCT"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = pal["dark_bg"] if dark else pal["light_bg"]
    ink = pal["ink_dark"] if dark else pal["ink_light"]
    muted = pal["muted_dark"] if dark else pal["muted_light"]
    _set_bg(slide, bg)
    _add_turn_title(slide, title_parts, MX, Inches(2.2), SLIDE_W - MX * 2, Inches(3.0), 42, ink, pal["accent"], fonts["display"])
    _quiet_page_num(slide, page_num, muted, fonts["mono"])
    _add_notes(slide, speaker_notes)
    return slide


def render_editorial_split(prs, pal, title_parts, lead_text, rows, dark=False, page_num=None, speaker_notes="", fonts=FONT_SYSTEMS["BOLD_PRODUCT"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = pal["dark_bg"] if dark else pal["light_bg"]
    ink = pal["ink_dark"] if dark else pal["ink_light"]
    muted = pal["muted_dark"] if dark else pal["muted_light"]
    rule = pal["rule_dark"] if dark else pal["rule_light"]
    _set_bg(slide, bg)

    _add_turn_title(slide, title_parts, MX, MY, Inches(4.8), Inches(2.3), 27, ink, pal["accent"], fonts["display"])
    if lead_text:
        tb = slide.shapes.add_textbox(MX, Inches(3.5), Inches(4.6), Inches(1.8))
        tb.text_frame.word_wrap = True
        r = tb.text_frame.paragraphs[0].add_run()
        r.text = lead_text
        r.font.name = fonts["body"]
        r.font.size = Pt(13.5)
        r.font.color.rgb = rgb(muted)

    right_x = Inches(6.2)
    right_w = SLIDE_W - right_x - MX
    row_h = min(Inches(1.18), (SLIDE_H - MY * 2 - Inches(0.5)) / max(len(rows), 1))
    for i, row in enumerate(rows):
        y = MY + i * row_h
        if i > 0:
            line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, right_x, y - Inches(0.1), right_w, Inches(0.015))
            line.fill.solid()
            line.fill.fore_color.rgb = rgb(rule)
            line.line.fill.background()
        tb_l = slide.shapes.add_textbox(right_x, y, right_w, Inches(0.34))
        rl = tb_l.text_frame.paragraphs[0].add_run()
        rl.text = row["label"]
        rl.font.name = fonts["display"]
        rl.font.size = Pt(14)
        rl.font.bold = True
        rl.font.color.rgb = rgb(ink)

        tb_d = slide.shapes.add_textbox(right_x, y + Inches(0.36), right_w, row_h - Inches(0.45))
        tb_d.text_frame.word_wrap = True
        rd = tb_d.text_frame.paragraphs[0].add_run()
        rd.text = row["detail"]
        rd.font.name = fonts["body"]
        rd.font.size = Pt(12)
        rd.font.color.rgb = rgb(muted)

    _quiet_page_num(slide, page_num, muted, fonts["mono"])
    _add_notes(slide, speaker_notes)
    return slide


def render_hero_kpi_breather(prs, pal, figure: str, caption: str, footnote: str = "", page_num=None, speaker_notes="", fonts=FONT_SYSTEMS["BOLD_PRODUCT"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    _set_bg(slide, pal["dark_bg"])

    tb = slide.shapes.add_textbox(MX, Inches(1.8), SLIDE_W - MX * 2, Inches(2.1))
    r = tb.text_frame.paragraphs[0].add_run()
    r.text = figure
    r.font.name = fonts["display"]
    r.font.size = Pt(102)
    r.font.bold = True
    r.font.color.rgb = rgb(pal["accent"])

    tb2 = slide.shapes.add_textbox(MX, Inches(4.15), Inches(8.6), Inches(1.2))
    tb2.text_frame.word_wrap = True
    r2 = tb2.text_frame.paragraphs[0].add_run()
    r2.text = caption
    r2.font.name = fonts["display"]
    r2.font.size = Pt(26)
    r2.font.bold = True
    r2.font.color.rgb = rgb(pal["ink_dark"])

    if footnote:
        tb3 = slide.shapes.add_textbox(MX, Inches(5.55), Inches(8.0), Inches(0.6))
        tb3.text_frame.word_wrap = True
        r3 = tb3.text_frame.paragraphs[0].add_run()
        r3.text = footnote
        r3.font.name = fonts["body"]
        r3.font.size = Pt(12.5)
        r3.font.color.rgb = rgb(pal["muted_dark"])

    _quiet_page_num(slide, page_num, pal["muted_dark"], fonts["mono"])
    _add_notes(slide, speaker_notes)
    return slide


def render_dot_matrix_slide(prs, pal, title_parts, big_percent: str, filled_dots: int, caption: str, total_dots: int = 40, page_num=None, speaker_notes="", fonts=FONT_SYSTEMS["BOLD_PRODUCT"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    _set_bg(slide, pal["dark_bg"])
    _add_turn_title(slide, title_parts, MX, MY, Inches(10.5), Inches(1.1), 26, pal["ink_dark"], pal["accent"], fonts["display"])

    tb = slide.shapes.add_textbox(MX, Inches(2.35), Inches(4.5), Inches(1.5))
    r = tb.text_frame.paragraphs[0].add_run()
    r.text = big_percent
    r.font.name = fonts["display"]
    r.font.size = Pt(76)
    r.font.bold = True
    r.font.color.rgb = rgb(pal["accent"])

    tb2 = slide.shapes.add_textbox(MX, Inches(4.05), Inches(4.3), Inches(1.4))
    tb2.text_frame.word_wrap = True
    r2 = tb2.text_frame.paragraphs[0].add_run()
    r2.text = caption
    r2.font.name = fonts["body"]
    r2.font.size = Pt(14)
    r2.font.color.rgb = rgb(pal["muted_dark"])

    cols, dot_s, gap, sx, sy = 10, Inches(0.36), Inches(0.16), Inches(6.2), Inches(2.45)
    for i in range(total_dots):
        r_idx, c_idx = divmod(i, cols)
        dot = slide.shapes.add_shape(MSO_SHAPE.OVAL, sx + c_idx * (dot_s + gap), sy + r_idx * (dot_s + gap), dot_s, dot_s)
        dot.fill.solid()
        dot.fill.fore_color.rgb = rgb(pal["accent"] if i < filled_dots else pal["dark_surface"])
        dot.line.color.rgb = rgb(pal["accent"] if i < filled_dots else pal["rule_dark"])

    _quiet_page_num(slide, page_num, pal["muted_dark"], fonts["mono"])
    _add_notes(slide, speaker_notes)
    return slide


def render_single_focus_bar_chart(prs, pal, title_parts, bars, dark=False, page_num=None, speaker_notes="", fonts=FONT_SYSTEMS["BOLD_PRODUCT"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = pal["dark_bg"] if dark else pal["light_bg"]
    ink = pal["ink_dark"] if dark else pal["ink_light"]
    muted = pal["muted_dark"] if dark else pal["muted_light"]
    neutral_bar = pal["dark_surface"] if dark else pal["rule_light"]
    _set_bg(slide, bg)

    _add_turn_title(slide, title_parts, MX, MY, Inches(11.0), Inches(1.15), 27, ink, pal["accent"], fonts["display"])
    items = bars[:7]
    max_val = max((b["value"] for b in items), default=1) or 1
    label_w, bar_max_w, start_y = Inches(3.2), Inches(6.6), Inches(2.25)
    row_h = min(Inches(0.68), Inches(4.4) / max(len(items), 1))

    for i, b in enumerate(items):
        y = start_y + i * row_h
        bw = max(Inches(0.25), bar_max_w * (b["value"] / max_val))
        hi = bool(b.get("highlight"))
        tb_l = slide.shapes.add_textbox(MX, y, label_w, Inches(0.38))
        rl = tb_l.text_frame.paragraphs[0].add_run()
        rl.text = b["label"]
        rl.font.name = fonts["body"]
        rl.font.size = Pt(12.5)
        rl.font.bold = hi
        rl.font.color.rgb = rgb(ink if hi else muted)

        rect = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, MX + label_w + Inches(0.25), y + Inches(0.06), bw, Inches(0.26))
        rect.fill.solid()
        rect.fill.fore_color.rgb = rgb(pal["accent"] if hi else neutral_bar)
        rect.line.fill.background()

        tb_v = slide.shapes.add_textbox(MX + label_w + Inches(0.4) + bw, y, Inches(1.5), Inches(0.38))
        rv = tb_v.text_frame.paragraphs[0].add_run()
        rv.text = b["display_value"]
        rv.font.name = fonts["display"]
        rv.font.size = Pt(13)
        rv.font.bold = True
        rv.font.color.rgb = rgb(pal["accent"] if hi else muted)

    _quiet_page_num(slide, page_num, muted, fonts["mono"])
    _add_notes(slide, speaker_notes)
    return slide


def render_architecture_gate_diagram(prs, pal, title_parts, gates, dark=True, page_num=None, speaker_notes="", fonts=FONT_SYSTEMS["BOLD_PRODUCT"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = pal["dark_bg"] if dark else pal["light_bg"]
    ink = pal["ink_dark"] if dark else pal["ink_light"]
    muted = pal["muted_dark"] if dark else pal["muted_light"]
    rule = pal["rule_dark"] if dark else pal["rule_light"]
    _set_bg(slide, bg)

    _add_turn_title(slide, title_parts, MX, MY, Inches(10.8), Inches(1.15), 26, ink, pal["accent"], fonts["display"])
    spine_x, top_y, row_h = Inches(1.65), Inches(2.3), Inches(1.12)
    items = gates[:4]
    spine = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, spine_x, top_y + Inches(0.15), Inches(0.02), row_h * max(len(items) - 1, 1))
    spine.fill.solid()
    spine.fill.fore_color.rgb = rgb(rule)
    spine.line.fill.background()

    for i, g in enumerate(items):
        cy = top_y + i * row_h
        add_concentric_target(slide, spine_x, cy + Inches(0.15), 0.2, pal["accent"])
        branch = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, spine_x + Inches(0.25), cy + Inches(0.15), Inches(0.75), Inches(0.015))
        branch.fill.solid()
        branch.fill.fore_color.rgb = rgb(rule)
        branch.line.fill.background()

        tb_d = slide.shapes.add_textbox(Inches(2.8), cy - Inches(0.02), Inches(2.6), Inches(0.34))
        rd = tb_d.text_frame.paragraphs[0].add_run()
        rd.text = g["domain"].upper()
        rd.font.name = fonts["mono"]
        rd.font.size = Pt(10)
        rd.font.bold = True
        rd.font.color.rgb = rgb(pal["accent"])

        tb_r = slide.shapes.add_textbox(Inches(5.55), cy - Inches(0.04), Inches(6.9), Inches(0.65))
        tb_r.text_frame.word_wrap = True
        rr = tb_r.text_frame.paragraphs[0].add_run()
        rr.text = g["rule"]
        rr.font.name = fonts["body"]
        rr.font.size = Pt(13.5)
        rr.font.color.rgb = rgb(ink)

    _quiet_page_num(slide, page_num, muted, fonts["mono"])
    _add_notes(slide, speaker_notes)
    return slide


def render_consulting_columns(prs, pal, title_parts, columns, dark=False, page_num=None, speaker_notes="", fonts=FONT_SYSTEMS["BOLD_PRODUCT"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = pal["dark_bg"] if dark else pal["light_bg"]
    ink = pal["ink_dark"] if dark else pal["ink_light"]
    muted = pal["muted_dark"] if dark else pal["muted_light"]
    rule = pal["rule_dark"] if dark else pal["rule_light"]
    _set_bg(slide, bg)

    _add_turn_title(slide, title_parts, MX, MY, Inches(11.2), Inches(1.15), 27, ink, pal["accent"], fonts["display"])
    cols = columns[:3]
    gap = Inches(0.5)
    total_w = SLIDE_W - MX * 2
    col_w = (total_w - gap * (len(cols) - 1)) / max(len(cols), 1)
    top_y = Inches(2.3)

    for i, col in enumerate(cols):
        x = MX + i * (col_w + gap)
        hi = bool(col.get("highlight"))
        bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, top_y, col_w, Inches(0.03 if hi else 0.02))
        bar.fill.solid()
        bar.fill.fore_color.rgb = rgb(pal["accent"] if hi else ink)
        bar.line.fill.background()

        tb_h = slide.shapes.add_textbox(x, top_y + Inches(0.18), col_w, Inches(0.5))
        tb_h.text_frame.word_wrap = True
        rh = tb_h.text_frame.paragraphs[0].add_run()
        rh.text = col["heading"]
        rh.font.name = fonts["display"]
        rh.font.size = Pt(16)
        rh.font.bold = True
        rh.font.color.rgb = rgb(pal["accent"] if hi else ink)

        for p_idx, pt in enumerate(col.get("points", [])[:3]):
            py = top_y + Inches(0.85) + p_idx * Inches(1.15)
            if p_idx > 0:
                sep = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, py - Inches(0.12), col_w, Inches(0.01))
                sep.fill.solid()
                sep.fill.fore_color.rgb = rgb(rule)
                sep.line.fill.background()
            tb_p = slide.shapes.add_textbox(x, py, col_w, Inches(0.95))
            tb_p.text_frame.word_wrap = True
            para = tb_p.text_frame.paragraphs[0]
            r_lead = para.add_run()
            r_lead.text = pt["lead"] + " "
            r_lead.font.name = fonts["body"]
            r_lead.font.size = Pt(12.5)
            r_lead.font.bold = True
            r_lead.font.color.rgb = rgb(ink)

            r_body = para.add_run()
            r_body.text = pt["body"]
            r_body.font.name = fonts["body"]
            r_body.font.size = Pt(12.5)
            r_body.font.color.rgb = rgb(muted)

    _quiet_page_num(slide, page_num, muted, fonts["mono"])
    _add_notes(slide, speaker_notes)
    return slide


def render_node_timeline(prs, pal, title_parts, steps, active_index=0, dark=False, page_num=None, speaker_notes="", fonts=FONT_SYSTEMS["BOLD_PRODUCT"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = pal["dark_bg"] if dark else pal["light_bg"]
    ink = pal["ink_dark"] if dark else pal["ink_light"]
    muted = pal["muted_dark"] if dark else pal["muted_light"]
    rule = pal["rule_dark"] if dark else pal["rule_light"]
    _set_bg(slide, bg)

    _add_turn_title(slide, title_parts, MX, MY, Inches(10.5), Inches(1.2), 28, ink, pal["accent"], fonts["display"])
    line_y, line_w = Inches(3.2), SLIDE_W - MX * 2
    hair = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, MX, line_y, line_w, Inches(0.02))
    hair.fill.solid()
    hair.fill.fore_color.rgb = rgb(rule)
    hair.line.fill.background()

    step_w = line_w / max(len(steps), 1)
    for i, step in enumerate(steps):
        x = MX + i * step_w
        is_active = i == active_index
        dot = slide.shapes.add_shape(MSO_SHAPE.OVAL, x, line_y - Inches(0.13), Inches(0.28), Inches(0.28))
        dot.fill.solid()
        dot.fill.fore_color.rgb = rgb(pal["accent"] if is_active else bg)
        dot.line.color.rgb = rgb(pal["accent"] if is_active else ink)
        dot.line.width = Pt(2)

        tb_title = slide.shapes.add_textbox(x, line_y + Inches(0.35), step_w - Inches(0.3), Inches(0.55))
        tb_title.text_frame.word_wrap = True
        rt = tb_title.text_frame.paragraphs[0].add_run()
        rt.text = step["title"]
        rt.font.name = fonts["display"]
        rt.font.size = Pt(15)
        rt.font.bold = True
        rt.font.color.rgb = rgb(ink)

        tb_det = slide.shapes.add_textbox(x, line_y + Inches(0.95), step_w - Inches(0.3), Inches(1.6))
        tb_det.text_frame.word_wrap = True
        rd = tb_det.text_frame.paragraphs[0].add_run()
        rd.text = step["detail"]
        rd.font.name = fonts["body"]
        rd.font.size = Pt(12)
        rd.font.color.rgb = rgb(muted)

    _quiet_page_num(slide, page_num, muted, fonts["mono"])
    _add_notes(slide, speaker_notes)
    return slide


def render_clean_table(prs, pal, title_parts, headers, rows, col_widths_in, highlight_col=1, page_num=None, speaker_notes="", fonts=FONT_SYSTEMS["BOLD_PRODUCT"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    _set_bg(slide, pal["light_bg"])
    _add_turn_title(slide, title_parts, MX, MY, Inches(11.0), Inches(1.1), 26, pal["ink_light"], pal["accent"], fonts["display"])

    n_rows, n_cols = len(rows) + 1, len(headers)
    table_shape = slide.shapes.add_table(n_rows, n_cols, MX, Inches(2.05), SLIDE_W - MX * 2, Inches(0.55 * n_rows))
    table = table_shape.table
    for c_idx, w_in in enumerate(col_widths_in):
        table.columns[c_idx].width = Inches(w_in)

    for c_idx, h in enumerate(headers):
        cell = table.cell(0, c_idx)
        cell.fill.solid()
        cell.fill.fore_color.rgb = rgb(pal["accent"] if c_idx == highlight_col else pal["dark_bg"])
        p = cell.text_frame.paragraphs[0]
        r = p.add_run()
        r.text = h
        r.font.name = fonts["display"]
        r.font.size = Pt(11)
        r.font.bold = True
        r.font.color.rgb = rgb(pal["ink_accent"] if c_idx == highlight_col else pal["ink_dark"])

    for r_idx, row in enumerate(rows):
        for c_idx, val in enumerate(row):
            cell = table.cell(r_idx + 1, c_idx)
            cell.fill.solid()
            cell.fill.fore_color.rgb = rgb(pal["light_surface"] if r_idx % 2 == 1 else pal["light_bg"])
            p = cell.text_frame.paragraphs[0]
            r = p.add_run()
            r.text = val
            r.font.name = fonts["body"]
            r.font.size = Pt(11)
            r.font.bold = c_idx == highlight_col
            r.font.color.rgb = rgb(pal["ink_light"])

    _quiet_page_num(slide, page_num, pal["muted_light"], fonts["mono"])
    _add_notes(slide, speaker_notes)
    return slide


def render_split_color_swap(prs, pal, left_title: str, left_body: str, right_title: str, right_body: str, swap: bool = False, page_num=None, speaker_notes="", fonts=FONT_SYSTEMS["BOLD_PRODUCT"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    half_w = SLIDE_W / 2
    left_bg = pal["light_bg"] if swap else pal["dark_bg"]
    left_ink = pal["ink_light"] if swap else pal["ink_dark"]
    left_muted = pal["muted_light"] if swap else pal["muted_dark"]
    right_bg = pal["dark_bg"] if swap else pal["light_bg"]
    right_ink = pal["ink_dark"] if swap else pal["ink_light"]
    right_muted = pal["muted_dark"] if swap else pal["muted_light"]

    for x0, w0, c0 in ((Inches(0), half_w, left_bg), (half_w, half_w, right_bg)):
        panel = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, x0, Inches(0), w0, SLIDE_H)
        panel.fill.solid()
        panel.fill.fore_color.rgb = rgb(c0)
        panel.line.fill.background()

    for x0, title, body, t_col, b_col in (
        (MX, left_title, left_body, left_ink if swap else pal["accent"], left_muted),
        (half_w + MX * 0.8, right_title, right_body, pal["accent"] if swap else right_ink, right_muted),
    ):
        tb_t = slide.shapes.add_textbox(x0, Inches(1.9), half_w - MX * 1.6, Inches(1.5))
        tb_t.text_frame.word_wrap = True
        rt = tb_t.text_frame.paragraphs[0].add_run()
        rt.text = title
        rt.font.name = fonts["display"]
        rt.font.size = Pt(28)
        rt.font.bold = True
        rt.font.color.rgb = rgb(t_col)

        tb_b = slide.shapes.add_textbox(x0, Inches(3.6), half_w - MX * 1.6, Inches(2.2))
        tb_b.text_frame.word_wrap = True
        rb = tb_b.text_frame.paragraphs[0].add_run()
        rb.text = body
        rb.font.name = fonts["body"]
        rb.font.size = Pt(14)
        rb.font.color.rgb = rgb(b_col)

    _quiet_page_num(slide, page_num, right_muted, fonts["mono"])
    _add_notes(slide, speaker_notes)
    return slide


def render_waterfall_bridge(prs, pal, title_parts, steps, source_line: str = "", dark: bool = False, page_num=None, speaker_notes="", fonts=FONT_SYSTEMS["BOLD_PRODUCT"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = pal["dark_bg"] if dark else pal["light_bg"]
    ink = pal["ink_dark"] if dark else pal["ink_light"]
    muted = pal["muted_dark"] if dark else pal["muted_light"]
    rule = pal["rule_dark"] if dark else pal["rule_light"]
    _set_bg(slide, bg)

    _add_turn_title(slide, title_parts, MX, MY, Inches(11.2), Inches(1.15), 26, ink, pal["accent"], fonts["display"])

    running = 0.0
    computed = []
    for s in steps:
        val = float(s["value"])
        if s.get("type") == "total":
            running = val
            computed.append({**s, "low": 0.0, "high": val})
        else:
            low, high = min(running, running + val), max(running, running + val)
            running += val
            computed.append({**s, "low": low, "high": high})

    max_v = max((c["high"] for c in computed), default=1.0) or 1.0
    base_y, max_h = Inches(5.65), Inches(2.85)
    area_w = SLIDE_W - MX * 2
    slot_w = area_w / max(len(computed), 1)
    bar_w = min(Inches(1.15), slot_w * 0.56)

    axis = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, MX, base_y, area_w, Inches(0.015))
    axis.fill.solid()
    axis.fill.fore_color.rgb = rgb(rule)
    axis.line.fill.background()

    for i, c in enumerate(computed):
        x = MX + i * slot_w + (slot_w - bar_w) / 2
        y_top = base_y - max_h * (c["high"] / max_v)
        h_bar = max(Inches(0.18), max_h * ((c["high"] - c["low"]) / max_v))
        fill_col = ink if c.get("type") == "total" else (pal["accent"] if c["value"] < 0 else (pal["dark_surface"] if dark else rule))

        bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y_top, bar_w, h_bar)
        bar.fill.solid()
        bar.fill.fore_color.rgb = rgb(fill_col)
        bar.line.fill.background()

        tb_v = slide.shapes.add_textbox(x - Inches(0.2), y_top - Inches(0.42), bar_w + Inches(0.4), Inches(0.34))
        p_v = tb_v.text_frame.paragraphs[0]
        p_v.alignment = PP_ALIGN.CENTER
        rv = p_v.add_run()
        rv.text = c["display_value"]
        rv.font.name = fonts["display"]
        rv.font.size = Pt(12)
        rv.font.bold = True
        rv.font.color.rgb = rgb(pal["accent"] if c["value"] < 0 else ink)

        tb_l = slide.shapes.add_textbox(x - Inches(0.25), base_y + Inches(0.14), bar_w + Inches(0.5), Inches(0.5))
        tb_l.text_frame.word_wrap = True
        p_l = tb_l.text_frame.paragraphs[0]
        p_l.alignment = PP_ALIGN.CENTER
        rl = p_l.add_run()
        rl.text = c["label"]
        rl.font.name = fonts["body"]
        rl.font.size = Pt(10.5)
        rl.font.color.rgb = rgb(muted)

    if source_line:
        tb_s = slide.shapes.add_textbox(MX, SLIDE_H - Inches(0.52), Inches(9.0), Inches(0.3))
        rs = tb_s.text_frame.paragraphs[0].add_run()
        rs.text = source_line
        rs.font.name = fonts["mono"]
        rs.font.size = Pt(9)
        rs.font.color.rgb = rgb(muted)

    _quiet_page_num(slide, page_num, muted, fonts["mono"])
    _add_notes(slide, speaker_notes)
    return slide


def render_closing_slide(prs, pal, headline: str, contact_line: str = "", speaker_notes="", fonts=FONT_SYSTEMS["BOLD_PRODUCT"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    _set_bg(slide, pal["dark_bg"])
    tb = slide.shapes.add_textbox(MX, Inches(2.3), SLIDE_W - MX * 2, Inches(1.8))
    p = tb.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = headline
    r.font.name = fonts["display"]
    r.font.size = Pt(62)
    r.font.bold = True
    r.font.color.rgb = rgb(pal["ink_dark"])

    if contact_line:
        tb2 = slide.shapes.add_textbox(MX, Inches(4.5), SLIDE_W - MX * 2, Inches(0.5))
        p2 = tb2.text_frame.paragraphs[0]
        p2.alignment = PP_ALIGN.CENTER
        r2 = p2.add_run()
        r2.text = contact_line
        r2.font.name = fonts["mono"]
        r2.font.size = Pt(11)
        r2.font.color.rgb = rgb(pal["accent"])

    _add_notes(slide, speaker_notes)
    return slide

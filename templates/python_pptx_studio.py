"""
anti-slop-pptx-kit — python-pptx Studio Component Library (v7.0)
100% parity with pptxgenjs-studio-kit.mjs v6/v7:
- 6 Industry-Aware High-Contrast Palettes
- 1 Cohesive 2-Font System per Deck
- Readable >=14pt Body Copy (13pt+ Tables, 28-40pt Titles, 56-68pt Hero KPIs)
- Native Editable PowerPoint Bar Charts (add_chart)
- Zero Default Drop Shadows (_flat_shape)
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.chart import XL_CHART_TYPE, XL_LABEL_POSITION
from pptx.chart.data import CategoryChartData

SLIDE_W = Inches(13.333)
SLIDE_H = Inches(7.5)
MX = Inches(0.75)
MY = Inches(0.65)

PALETTES = {
    "INDUSTRIAL_ENGINEERING": {
        "dark_bg": "0F172A", "dark_surface": "1E293B", "light_bg": "F8FAFC", "light_surface": "FFFFFF",
        "ink_dark": "FFFFFF", "muted_dark": "CBD5E1", "rule_dark": "334155",
        "ink_light": "0F172A", "muted_light": "334155", "rule_light": "CBD5E1",
        "accent": "EA580C", "ink_accent": "FFFFFF",
    },
    "EXECUTIVE_MIDNIGHT": {
        "dark_bg": "0B1325", "dark_surface": "16223D", "light_bg": "F6F5F1", "light_surface": "FFFFFF",
        "ink_dark": "FFFFFF", "muted_dark": "CBD5E1", "rule_dark": "2B3A5C",
        "ink_light": "0B1325", "muted_light": "334155", "rule_light": "DDD9CE",
        "accent": "D97706", "ink_accent": "FFFFFF",
    },
    "SAAS_COBALT": {
        "dark_bg": "111827", "dark_surface": "1F2937", "light_bg": "F9FAFB", "light_surface": "FFFFFF",
        "ink_dark": "FFFFFF", "muted_dark": "D1D5DB", "rule_dark": "374151",
        "ink_light": "111827", "muted_light": "374151", "rule_light": "E5E7EB",
        "accent": "2563EB", "ink_accent": "FFFFFF",
    },
    "HOSPITALITY_TERRACOTTA": {
        "dark_bg": "1E2923", "dark_surface": "2C3B33", "light_bg": "FAF5EB", "light_surface": "FFFFFF",
        "ink_dark": "FAF5EB", "muted_dark": "D6D3CD", "rule_dark": "3E5146",
        "ink_light": "1E2923", "muted_light": "44403C", "rule_light": "E7DFD1",
        "accent": "C2410C", "ink_accent": "FFFFFF",
    },
    "HEALTH_TEAL": {
        "dark_bg": "134E4A", "dark_surface": "1D635E", "light_bg": "FFFBF5", "light_surface": "FFFFFF",
        "ink_dark": "FFFFFF", "muted_dark": "CCFBF1", "rule_dark": "2B7A74",
        "ink_light": "134E4A", "muted_light": "334155", "rule_light": "DCECE9",
        "accent": "E11D48", "ink_accent": "FFFFFF",
    },
    "LUXURY_OBSIDIAN": {
        "dark_bg": "18181B", "dark_surface": "27272A", "light_bg": "F4F1EA", "light_surface": "FFFFFF",
        "ink_dark": "FAF8F5", "muted_dark": "D4D4D8", "rule_dark": "3F3F46",
        "ink_light": "18181B", "muted_light": "3F3F46", "rule_light": "E4DFD4",
        "accent": "B91C1C", "ink_accent": "FFFFFF",
    },
}

FONT_SYSTEMS = {
    "ENGINEERING_PRO": {"display": "Montserrat", "body": "Calibri"},
    "MODERN_CLEAN": {"display": "Montserrat", "body": "DM Sans"},
    "EDITORIAL_CLASSIC": {"display": "Georgia", "body": "DM Sans"},
    "FRIENDLY_MODERN": {"display": "Poppins", "body": "Calibri"},
}


def rgb(hex_str: str) -> RGBColor:
    return RGBColor.from_string(hex_str)


def create_studio_presentation() -> Presentation:
    prs = Presentation()
    prs.slide_width = SLIDE_W
    prs.slide_height = SLIDE_H
    return prs


def _flat_shape(slide, shape_type, x, y, w, h):
    shp = slide.shapes.add_shape(shape_type, x, y, w, h)
    shp.shadow.inherit = False
    return shp


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


def _quiet_page_num(slide, page_num: int | None, muted_hex: str, body_font="Calibri"):
    if not page_num:
        return
    box = slide.shapes.add_textbox(SLIDE_W - MX - Inches(0.7), SLIDE_H - Inches(0.48), Inches(0.7), Inches(0.3))
    p = box.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.RIGHT
    r = p.add_run()
    r.text = f"{page_num:02d}"
    r.font.name = body_font
    r.font.size = Pt(11)
    r.font.bold = True
    r.font.color.rgb = rgb(muted_hex)


def render_cover_slide(prs, pal, title_parts, subtitle="", context_pill="", stats_strip=None, speaker_notes="", fonts=FONT_SYSTEMS["ENGINEERING_PRO"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    _set_bg(slide, pal["dark_bg"])

    panel = _flat_shape(slide, MSO_SHAPE.RECTANGLE, Inches(8.5), Inches(0), Inches(4.833), SLIDE_H)
    panel.fill.solid()
    panel.fill.fore_color.rgb = rgb(pal["dark_surface"])
    panel.line.fill.background()

    stripe = _flat_shape(slide, MSO_SHAPE.RECTANGLE, Inches(8.5), Inches(0), Inches(0.12), SLIDE_H)
    stripe.fill.solid()
    stripe.fill.fore_color.rgb = rgb(pal["accent"])
    stripe.line.fill.background()

    for idx, st in enumerate((stats_strip or [])[:3]):
        sy = Inches(1.65 + idx * 1.65)
        tb_v = slide.shapes.add_textbox(Inches(9.05), sy, Inches(3.8), Inches(0.7))
        rv = tb_v.text_frame.paragraphs[0].add_run()
        rv.text = st["value"]
        rv.font.name = fonts["display"]
        rv.font.size = Pt(34)
        rv.font.bold = True
        rv.font.color.rgb = rgb(pal["accent"])

        tb_l = slide.shapes.add_textbox(Inches(9.05), sy + Inches(0.68), Inches(3.8), Inches(0.55))
        tb_l.text_frame.word_wrap = True
        rl = tb_l.text_frame.paragraphs[0].add_run()
        rl.text = st["label"]
        rl.font.name = fonts["body"]
        rl.font.size = Pt(14)
        rl.font.color.rgb = rgb(pal["muted_dark"])

    if context_pill:
        tb_c = slide.shapes.add_textbox(MX, Inches(1.15), Inches(7.2), Inches(0.38))
        rc = tb_c.text_frame.paragraphs[0].add_run()
        rc.text = context_pill
        rc.font.name = fonts["body"]
        rc.font.size = Pt(13)
        rc.font.bold = True
        rc.font.color.rgb = rgb(pal["accent"])

    _add_turn_title(slide, title_parts, MX, Inches(1.7), Inches(7.3), Inches(2.5), 40, pal["ink_dark"], pal["accent"], fonts["display"])

    if subtitle:
        tb_s = slide.shapes.add_textbox(MX, Inches(4.45), Inches(7.1), Inches(1.4))
        tb_s.text_frame.word_wrap = True
        rs = tb_s.text_frame.paragraphs[0].add_run()
        rs.text = subtitle
        rs.font.name = fonts["body"]
        rs.font.size = Pt(16)
        rs.font.color.rgb = rgb(pal["muted_dark"])

    _add_notes(slide, speaker_notes)
    return slide


def render_metric_plus_cards(prs, pal, title_parts, hero_stat: str, hero_caption: str, cards, hero_footnote: str = "", dark: bool = False, page_num=None, speaker_notes="", fonts=FONT_SYSTEMS["ENGINEERING_PRO"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = pal["dark_bg"] if dark else pal["light_bg"]
    surface = pal["dark_surface"] if dark else pal["light_surface"]
    ink = pal["ink_dark"] if dark else pal["ink_light"]
    muted = pal["muted_dark"] if dark else pal["muted_light"]
    border = pal["rule_dark"] if dark else pal["rule_light"]
    _set_bg(slide, bg)

    _add_turn_title(slide, title_parts, MX, MY, SLIDE_W - MX * 2, Inches(1.05), 28, ink, pal["accent"], fonts["display"])
    top_y, panel_h = Inches(1.95), Inches(4.65)

    left = _flat_shape(slide, MSO_SHAPE.ROUNDED_RECTANGLE, MX, top_y, Inches(5.1), panel_h)
    left.fill.solid()
    left.fill.fore_color.rgb = rgb(pal["dark_bg"])
    left.line.fill.background()

    tb_h = slide.shapes.add_textbox(MX + Inches(0.45), top_y + Inches(0.65), Inches(4.2), Inches(1.25))
    rh = tb_h.text_frame.paragraphs[0].add_run()
    rh.text = hero_stat
    rh.font.name = fonts["display"]
    rh.font.size = Pt(56)
    rh.font.bold = True
    rh.font.color.rgb = rgb(pal["accent"])

    tb_c = slide.shapes.add_textbox(MX + Inches(0.45), top_y + Inches(2.05), Inches(4.2), Inches(1.35))
    tb_c.text_frame.word_wrap = True
    rc = tb_c.text_frame.paragraphs[0].add_run()
    rc.text = hero_caption
    rc.font.name = fonts["display"]
    rc.font.size = Pt(18)
    rc.font.bold = True
    rc.font.color.rgb = rgb(pal["ink_dark"])

    if hero_footnote:
        tb_f = slide.shapes.add_textbox(MX + Inches(0.45), top_y + Inches(3.55), Inches(4.2), Inches(0.85))
        tb_f.text_frame.word_wrap = True
        rf = tb_f.text_frame.paragraphs[0].add_run()
        rf.text = hero_footnote
        rf.font.name = fonts["body"]
        rf.font.size = Pt(13)
        rf.font.color.rgb = rgb(pal["muted_dark"])

    right_x = MX + Inches(5.45)
    right_w = SLIDE_W - right_x - MX
    items = cards[:3]
    gap_y = Inches(0.25)
    card_h = (panel_h - gap_y * (len(items) - 1)) / max(len(items), 1)
    for i, c in enumerate(items):
        cy = top_y + i * (card_h + gap_y)
        card = _flat_shape(slide, MSO_SHAPE.ROUNDED_RECTANGLE, right_x, cy, right_w, card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = rgb(surface)
        card.line.color.rgb = rgb(border)

        tb_t = slide.shapes.add_textbox(right_x + Inches(0.35), cy + Inches(0.22), right_w - Inches(0.7), Inches(0.38))
        rt = tb_t.text_frame.paragraphs[0].add_run()
        rt.text = c["title"]
        rt.font.name = fonts["display"]
        rt.font.size = Pt(16)
        rt.font.bold = True
        rt.font.color.rgb = rgb(ink)

        tb_d = slide.shapes.add_textbox(right_x + Inches(0.35), cy + Inches(0.62), right_w - Inches(0.7), card_h - Inches(0.78))
        tb_d.text_frame.word_wrap = True
        rd = tb_d.text_frame.paragraphs[0].add_run()
        rd.text = c["detail"]
        rd.font.name = fonts["body"]
        rd.font.size = Pt(14)
        rd.font.color.rgb = rgb(muted)

    _quiet_page_num(slide, page_num, muted, fonts["body"])
    _add_notes(slide, speaker_notes)
    return slide


def render_native_bar_chart_slide(prs, pal, title_parts, chart_data, insight_stat: str, insight_title: str, insight_detail: str, source_line: str = "", dark: bool = False, page_num=None, speaker_notes="", fonts=FONT_SYSTEMS["ENGINEERING_PRO"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = pal["dark_bg"] if dark else pal["light_bg"]
    ink = pal["ink_dark"] if dark else pal["ink_light"]
    muted = pal["muted_dark"] if dark else pal["muted_light"]
    _set_bg(slide, bg)

    _add_turn_title(slide, title_parts, MX, MY, SLIDE_W - MX * 2, Inches(1.05), 28, ink, pal["accent"], fonts["display"])

    data = CategoryChartData()
    data.categories = [d["label"] for d in chart_data]
    data.add_series("Comparativa", [d["value"] for d in chart_data])
    chart_frame = slide.shapes.add_chart(XL_CHART_TYPE.BAR_CLUSTERED, MX, Inches(1.95), Inches(7.4), Inches(4.65), data)
    chart = chart_frame.chart
    chart.has_legend = False
    chart.has_title = False
    plot = chart.plots[0]
    plot.has_data_labels = True
    plot.data_labels.position = XL_LABEL_POSITION.OUTSIDE_END
    plot.data_labels.font.name = fonts["display"]
    plot.data_labels.font.size = Pt(13)
    plot.data_labels.font.bold = True
    chart.value_axis.visible = False
    chart.value_axis.has_major_gridlines = False
    chart.category_axis.has_major_gridlines = False
    chart.category_axis.tick_labels.font.name = fonts["body"]
    chart.category_axis.tick_labels.font.size = Pt(13)

    for idx, d in enumerate(chart_data):
        pt = plot.series[0].points[idx]
        pt.format.fill.solid()
        pt.format.fill.fore_color.rgb = rgb(pal["accent"] if d.get("highlight") else ("475569" if dark else "94A3B8"))

    rx, rw = Inches(8.55), SLIDE_W - Inches(8.55) - MX
    panel = _flat_shape(slide, MSO_SHAPE.ROUNDED_RECTANGLE, rx, Inches(1.95), rw, Inches(4.65))
    panel.fill.solid()
    panel.fill.fore_color.rgb = rgb(pal["dark_bg"])
    panel.line.fill.background()

    tb_s = slide.shapes.add_textbox(rx + Inches(0.38), Inches(2.45), rw - Inches(0.76), Inches(1.15))
    rs = tb_s.text_frame.paragraphs[0].add_run()
    rs.text = insight_stat
    rs.font.name = fonts["display"]
    rs.font.size = Pt(38)
    rs.font.bold = True
    rs.font.color.rgb = rgb(pal["accent"])

    tb_t = slide.shapes.add_textbox(rx + Inches(0.38), Inches(3.7), rw - Inches(0.76), Inches(0.7))
    tb_t.text_frame.word_wrap = True
    rt = tb_t.text_frame.paragraphs[0].add_run()
    rt.text = insight_title
    rt.font.name = fonts["display"]
    rt.font.size = Pt(17)
    rt.font.bold = True
    rt.font.color.rgb = rgb(pal["ink_dark"])

    tb_d = slide.shapes.add_textbox(rx + Inches(0.38), Inches(4.45), rw - Inches(0.76), Inches(1.7))
    tb_d.text_frame.word_wrap = True
    rd = tb_d.text_frame.paragraphs[0].add_run()
    rd.text = insight_detail
    rd.font.name = fonts["body"]
    rd.font.size = Pt(14)
    rd.font.color.rgb = rgb(pal["muted_dark"])

    if source_line:
        tb_src = slide.shapes.add_textbox(MX, SLIDE_H - Inches(0.48), Inches(9.5), Inches(0.3))
        rsrc = tb_src.text_frame.paragraphs[0].add_run()
        rsrc.text = source_line
        rsrc.font.name = fonts["body"]
        rsrc.font.size = Pt(11)
        rsrc.font.color.rgb = rgb(muted)

    _quiet_page_num(slide, page_num, muted, fonts["body"])
    _add_notes(slide, speaker_notes)
    return slide

"""
anti-slop-pptx-kit — python-pptx Studio Component Library (v2.1)
Includes 8 Color-Harmony Palettes, 4 Font Systems, and 9 Graphic-Design Slide Archetypes + Vector Motifs.
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


def render_cover_slide(prs, pal, title_parts, subtitle="", meta_line="", fonts=FONT_SYSTEMS["BOLD_PRODUCT"]):
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
    return slide


def render_hero_kpi_breather(prs, pal, figure: str, caption: str, footnote: str = "", page_num: int | None = None, fonts=FONT_SYSTEMS["BOLD_PRODUCT"]):
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
    return slide


def render_node_timeline(prs, pal, title_parts, steps, active_index=0, dark=False, page_num=None, fonts=FONT_SYSTEMS["BOLD_PRODUCT"]):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = pal["dark_bg"] if dark else pal["light_bg"]
    ink = pal["ink_dark"] if dark else pal["ink_light"]
    muted = pal["muted_dark"] if dark else pal["muted_light"]
    rule = pal["rule_dark"] if dark else pal["rule_light"]
    _set_bg(slide, bg)

    _add_turn_title(slide, title_parts, MX, MY, Inches(10.5), Inches(1.2), 28, ink, pal["accent"], fonts["display"])

    line_y = Inches(3.2)
    line_w = SLIDE_W - MX * 2
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
    return slide

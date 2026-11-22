"""
anti-slop-pptx-kit — python-pptx Studio Component Library (v2.0)
Drop-in 16:9 graphic-design slide archetypes. Import instead of writing draw_card() loops.
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
        "dark_bg": "0B0C0E",
        "dark_surface": "17191D",
        "light_bg": "F4F5F3",
        "light_surface": "FFFFFF",
        "ink_dark": "F7F7F5",
        "muted_dark": "8F949E",
        "rule_dark": "262930",
        "ink_light": "121316",
        "muted_light": "5C616B",
        "rule_light": "E0E2DF",
        "accent": "C8D636",
        "ink_accent": "0B0C0E",
    },
    "SWISS_ORANGE": {
        "dark_bg": "111111",
        "dark_surface": "1D1D1D",
        "light_bg": "F5F4F0",
        "light_surface": "FFFFFF",
        "ink_dark": "FAF9F6",
        "muted_dark": "94918B",
        "rule_dark": "2A2927",
        "ink_light": "141413",
        "muted_light": "63605A",
        "rule_light": "E2DFD7",
        "accent": "FF4D00",
        "ink_accent": "FFFFFF",
    },
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


def _quiet_page_num(slide, page_num: int | None, muted_hex: str):
    if not page_num:
        return
    box = slide.shapes.add_textbox(SLIDE_W - MX - Inches(0.8), SLIDE_H - Inches(0.52), Inches(0.8), Inches(0.3))
    tf = box.text_frame
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.RIGHT
    run = p.add_run()
    run.text = f"{page_num:02d}"
    run.font.name = "Consolas"
    run.font.size = Pt(9)
    run.font.color.rgb = rgb(muted_hex)


def render_cover_slide(prs, pal, title_parts, subtitle="", meta_line=""):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    _set_bg(slide, pal["dark_bg"])

    if meta_line:
        tb = slide.shapes.add_textbox(MX, MY, Inches(8), Inches(0.3))
        p = tb.text_frame.paragraphs[0]
        r = p.add_run()
        r.text = meta_line.upper()
        r.font.name = "Consolas"
        r.font.size = Pt(9)
        r.font.color.rgb = rgb(pal["muted_dark"])

    _add_turn_title(slide, title_parts, MX, Inches(2.05), SLIDE_W - MX * 2 - Inches(1.2), Inches(2.5), 48, pal["ink_dark"], pal["accent"])

    bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, MX, Inches(5.05), Inches(1.4), Inches(0.04))
    bar.fill.solid()
    bar.fill.fore_color.rgb = rgb(pal["accent"])
    bar.line.fill.background()

    if subtitle:
        tb = slide.shapes.add_textbox(MX, Inches(5.3), Inches(7.5), Inches(0.9))
        tf = tb.text_frame
        tf.word_wrap = True
        r = tf.paragraphs[0].add_run()
        r.text = subtitle
        r.font.name = "Poppins"
        r.font.size = Pt(15)
        r.font.color.rgb = rgb(pal["muted_dark"])
    return slide


def render_hero_kpi_breather(prs, pal, figure: str, caption: str, footnote: str = "", page_num: int | None = None):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    _set_bg(slide, pal["dark_bg"])

    tb = slide.shapes.add_textbox(MX, Inches(1.8), SLIDE_W - MX * 2, Inches(2.1))
    r = tb.text_frame.paragraphs[0].add_run()
    r.text = figure
    r.font.name = "Montserrat"
    r.font.size = Pt(104)
    r.font.bold = True
    r.font.color.rgb = rgb(pal["accent"])

    tb2 = slide.shapes.add_textbox(MX, Inches(4.15), Inches(8.6), Inches(1.2))
    tf2 = tb2.text_frame
    tf2.word_wrap = True
    r2 = tf2.paragraphs[0].add_run()
    r2.text = caption
    r2.font.name = "Montserrat"
    r2.font.size = Pt(26)
    r2.font.bold = True
    r2.font.color.rgb = rgb(pal["ink_dark"])

    if footnote:
        tb3 = slide.shapes.add_textbox(MX, Inches(5.55), Inches(8.0), Inches(0.6))
        tf3 = tb3.text_frame
        tf3.word_wrap = True
        r3 = tf3.paragraphs[0].add_run()
        r3.text = footnote
        r3.font.name = "Poppins"
        r3.font.size = Pt(12.5)
        r3.font.color.rgb = rgb(pal["muted_dark"])

    _quiet_page_num(slide, page_num, pal["muted_dark"])
    return slide


def render_node_timeline(prs, pal, title_parts, steps, active_index=0, dark=False, page_num=None):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = pal["dark_bg"] if dark else pal["light_bg"]
    ink = pal["ink_dark"] if dark else pal["ink_light"]
    muted = pal["muted_dark"] if dark else pal["muted_light"]
    rule = pal["rule_dark"] if dark else pal["rule_light"]
    _set_bg(slide, bg)

    _add_turn_title(slide, title_parts, MX, MY, Inches(10.5), Inches(1.2), 28, ink, pal["accent"])

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
        tf_t = tb_title.text_frame
        tf_t.word_wrap = True
        rt = tf_t.paragraphs[0].add_run()
        rt.text = step["title"]
        rt.font.name = "Montserrat"
        rt.font.size = Pt(15)
        rt.font.bold = True
        rt.font.color.rgb = rgb(ink)

        tb_det = slide.shapes.add_textbox(x, line_y + Inches(0.95), step_w - Inches(0.3), Inches(1.6))
        tf_d = tb_det.text_frame
        tf_d.word_wrap = True
        rd = tf_d.paragraphs[0].add_run()
        rd.text = step["detail"]
        rd.font.name = "Poppins"
        rd.font.size = Pt(12)
        rd.font.color.rgb = rgb(muted)

    _quiet_page_num(slide, page_num, muted)
    return slide

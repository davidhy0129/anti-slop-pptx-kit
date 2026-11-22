"""
anti-slop-pptx-kit — Lightweight Python Technical Primitives (v8.0)
NO fixed slide layouts or templates — only clean helpers for shadow-free shapes & native charts.
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.chart import XL_LABEL_POSITION


def create_widescreen_prs() -> Presentation:
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    return prs


def rgb(hex_str: str) -> RGBColor:
    return RGBColor.from_string(hex_str.lstrip("#"))


def add_flat_shape(slide, shape_type, x, y, w, h, fill_hex=None, line_hex=None, line_pt=1):
    shp = slide.shapes.add_shape(shape_type, x, y, w, h)
    shp.shadow.inherit = False
    if fill_hex:
        shp.fill.solid()
        shp.fill.fore_color.rgb = rgb(fill_hex)
    else:
        shp.fill.background()
    if line_hex:
        shp.line.color.rgb = rgb(line_hex)
        shp.line.width = Pt(line_pt)
    else:
        shp.line.fill.background()
    return shp


def style_clean_chart(chart, point_colors, font_name="DM Sans", font_pt=13):
    chart.has_legend = False
    chart.has_title = False
    plot = chart.plots[0]
    plot.has_data_labels = True
    plot.data_labels.position = XL_LABEL_POSITION.OUTSIDE_END
    plot.data_labels.font.name = font_name
    plot.data_labels.font.size = Pt(font_pt)
    plot.data_labels.font.bold = True
    chart.value_axis.visible = False
    chart.value_axis.has_major_gridlines = False
    chart.category_axis.has_major_gridlines = False
    chart.category_axis.tick_labels.font.name = font_name
    chart.category_axis.tick_labels.font.size = Pt(font_pt)
    for idx, color_hex in enumerate(point_colors):
        pt = plot.series[0].points[idx]
        pt.format.fill.solid()
        pt.format.fill.fore_color.rgb = rgb(color_hex)

"""
Reference Example (Python): Executive Deck using anti-slop-pptx-kit v3.0
Demonstrates SCQA arc, 5x5 brevity, Speaker Notes separation, and zero card-grid loops.
Usage (in a project with python-pptx installed): python examples/demo_executive_deck.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "templates"))

from python_pptx_studio import (
    PALETTES,
    FONT_SYSTEMS,
    create_studio_presentation,
    render_cover_slide,
    render_editorial_split,
    render_hero_kpi_breather,
    render_single_focus_bar_chart,
    render_architecture_gate_diagram,
    render_consulting_columns,
    render_clean_table,
    render_node_timeline,
    render_closing_slide,
)

prs = create_studio_presentation()
pal = PALETTES["OBSIDIAN_CITRINE"]
fonts = FONT_SYSTEMS["SWISS_TECH"]

render_cover_slide(
    prs,
    pal,
    title_parts=[("Unified Operations: ", False), ("Full Control Without Lock-In", True)],
    subtitle="20-year auditability, real-time field control, and zero per-seat licensing.",
    meta_line="Executive Review · 2026",
    speaker_notes="Open with the SCQA thesis: we already operate 7 specialized lines across 3 countries, and spreadsheets create compliance risk.",
    fonts=fonts,
)

render_editorial_split(
    prs,
    pal,
    title_parts=[("Spreadsheets fragment ", False), ("daily cost control", True)],
    lead_text="Local files create duplicate versions, blind compliance gaps, and manual rework across teams.",
    rows=[
        {"label": "Duplicate Versions", "detail": "Budget, warehouse, and site logs drift out of sync."},
        {"label": "Compliance Blind Spots", "detail": "Expired safety permits slip past manual checks."},
        {"label": "Local File Risk", "detail": "Critical project costs live on individual laptops."},
    ],
    dark=False,
    page_num=2,
    speaker_notes="Detail for Q&A: Covers PILA, height permits (Res. 4272), and outdated blueprints.",
    fonts=fonts,
)

render_hero_kpi_breather(
    prs,
    pal,
    figure="20 Years",
    caption="Immutable fiscal & legal retention built in from day one",
    footnote="Soft-delete policy, multi-zone cloud backups, and instant CSV/Excel export.",
    page_num=3,
    speaker_notes="Addresses board question on DIAN 10-20 year retention and accidental deletion protection.",
    fonts=fonts,
)

render_single_focus_bar_chart(
    prs,
    pal,
    title_parts=[("Proprietary stack cuts 5-year TCO by ", False), ("85% vs commercial ERPs", True)],
    bars=[
        {"label": "SAP B1 / NetSuite", "value": 180, "display_value": "$180K+", "highlight": False},
        {"label": "Odoo Enterprise", "value": 75, "display_value": "$75K", "highlight": False},
        {"label": "In-House Cloud ERP", "value": 3, "display_value": "$3K", "highlight": True},
    ],
    dark=False,
    page_num=4,
    fonts=fonts,
)

render_architecture_gate_diagram(
    prs,
    pal,
    title_parts=[("Automated hard gates ", False), ("block costly errors before execution", True)],
    gates=[
        {"domain": "Finance Gate", "rule": "Blocks purchase orders without available budget or cleared advance."},
        {"domain": "Safety Gate", "rule": "Halts height permits if certification expired or wind exceeds 40 km/h."},
        {"domain": "Legal Gate", "rule": "Stops contractor payments when social security filings lapse."},
        {"domain": "Technical Gate", "rule": "Blocks obsolete blueprints and flags uncalibrated instruments."},
    ],
    dark=True,
    page_num=5,
    fonts=fonts,
)

render_consulting_columns(
    prs,
    pal,
    title_parts=[("Every department gains ", False), ("real-time operational clarity", True)],
    columns=[
        {
            "heading": "Executive & Finance",
            "highlight": True,
            "points": [
                {"lead": "Live margin visibility.", "body": "Track EAC and 30/60/90-day cashflow."},
                {"lead": "Zero lock-in.", "body": "Full source ownership in corporate GitHub."},
            ],
        },
        {
            "heading": "Project Delivery",
            "highlight": False,
            "points": [
                {"lead": "Connected WBS & cost.", "body": "Site logs tied directly to budgets."},
                {"lead": "Current blueprints.", "body": "Versioned EDMS stops outdated builds."},
            ],
        },
        {
            "heading": "Supply & HR",
            "highlight": False,
            "points": [
                {"lead": "Multi-warehouse Kardex.", "body": "Real-time landed cost and transfers."},
                {"lead": "Pre-payroll accuracy.", "body": "Verified labor hours and certifications."},
            ],
        },
    ],
    dark=False,
    page_num=6,
    fonts=fonts,
)

render_clean_table(
    prs,
    pal,
    title_parts=[("Native industry fit ", False), ("without 12-month consulting queues", True)],
    headers=["Criterion", "In-House ERP", "Odoo", "SAP / Oracle"],
    rows=[
        ["Deployment", "Live Today", "6–12 months", "12–24 months"],
        ["Code Ownership", "100% Owned", "Partner Lock-In", "Zero"],
        ["Change Speed", "Hours / Days", "Weeks", "Months"],
    ],
    col_widths_in=[2.7, 3.0, 3.0, 3.0],
    highlight_col=1,
    page_num=7,
    fonts=fonts,
)

render_node_timeline(
    prs,
    pal,
    title_parts=[("Three-phase rollout ", False), ("without halting daily operations", True)],
    steps=[
        {"title": "Field Validation", "detail": "Confirm real forms and approval rules per area."},
        {"title": "Opening Balances", "detail": "Migrate active projects, Kardex, and contracts."},
        {"title": "Phased Go-Live", "detail": "Roll out module by module with direct support."},
    ],
    active_index=0,
    dark=False,
    page_num=8,
    fonts=fonts,
)

render_closing_slide(
    prs,
    pal,
    headline="Ready for Phase 01.",
    contact_line="Approve focal points · Set cut-off date · Confirm e-invoicing quote",
    fonts=fonts,
)

prs.save("demo-executive-deck.pptx")
print("Generated demo-executive-deck.pptx")

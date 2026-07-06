from pathlib import Path
import re

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    KeepTogether,
)


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "Admin_UI_Trace_Manual.md"
OUTPUT_DIR = ROOT / "output" / "pdf"
OUTPUT = OUTPUT_DIR / "Admin_UI_Trace_Manual.pdf"

PURPLE = colors.HexColor("#24123A")
PURPLE_MUTED = colors.HexColor("#5B476E")
PURPLE_LIGHT = colors.HexColor("#F5F0FA")
PURPLE_HEADER = colors.HexColor("#EEE4F7")
BORDER = colors.HexColor("#D8CBE5")
WHITE = colors.white


def clean_inline(text: str) -> str:
    text = text.strip()
    if not text:
        return '<font color="#FFFFFF">.</font>'
    text = re.sub(r"`([^`]+)`", r"<font face='Courier'>\1</font>", text)
    text = text.replace("&", "&amp;")
    text = text.replace("<font face='Courier'>", "___FONT_START___")
    text = text.replace("</font>", "___FONT_END___")
    text = text.replace("<", "&lt;").replace(">", "&gt;")
    text = text.replace("___FONT_START___", "<font face='Courier'>")
    text = text.replace("___FONT_END___", "</font>")
    return text


def split_table_row(line: str) -> list[str]:
    line = line.strip()
    if line.startswith("|"):
        line = line[1:]
    if line.endswith("|"):
        line = line[:-1]
    return [cell.strip() for cell in line.split("|")]


def is_separator(line: str) -> bool:
    cells = split_table_row(line)
    return all(re.fullmatch(r":?-{3,}:?", cell.strip()) for cell in cells if cell.strip())


def page_decor(canvas, doc):
    canvas.saveState()
    width, height = landscape(A4)
    canvas.setFillColor(PURPLE)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawString(16 * mm, height - 10 * mm, "SSF Alparamba Unit - Admin UI Trace Manual")
    canvas.setStrokeColor(BORDER)
    canvas.line(16 * mm, height - 13 * mm, width - 16 * mm, height - 13 * mm)
    canvas.setFillColor(PURPLE_MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(width - 16 * mm, 9 * mm, f"Page {doc.page}")
    canvas.restoreState()


def make_styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "TitlePurple",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=25,
            leading=30,
            textColor=PURPLE,
            alignment=TA_CENTER,
            spaceAfter=10,
        ),
        "h2": ParagraphStyle(
            "H2Purple",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13.5,
            leading=17,
            textColor=PURPLE,
            spaceBefore=12,
            spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "BodyPurple",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.8,
            leading=12,
            textColor=PURPLE,
            spaceAfter=5,
        ),
        "bullet": ParagraphStyle(
            "BulletPurple",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11.5,
            leftIndent=10,
            firstLineIndent=-6,
            textColor=PURPLE,
            spaceAfter=3,
        ),
        "table": ParagraphStyle(
            "TablePurple",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=6.6,
            leading=8.3,
            textColor=PURPLE,
            alignment=TA_LEFT,
        ),
        "table_header": ParagraphStyle(
            "TableHeaderPurple",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=6.7,
            leading=8.4,
            textColor=PURPLE,
            alignment=TA_LEFT,
        ),
        "small": ParagraphStyle(
            "SmallPurple",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7,
            leading=9,
            textColor=PURPLE_MUTED,
            alignment=TA_CENTER,
        ),
    }


def column_widths(column_count: int, available_width: float) -> list[float]:
    if column_count == 2:
        weights = [0.30, 0.70]
    elif column_count == 3:
        weights = [0.32, 0.28, 0.40]
    elif column_count == 4:
        weights = [0.25, 0.38, 0.17, 0.20]
    elif column_count == 5:
        weights = [0.16, 0.22, 0.25, 0.20, 0.17]
    elif column_count == 6:
        weights = [0.12, 0.20, 0.24, 0.20, 0.12, 0.12]
    else:
        weights = [1 / column_count] * column_count
    total = sum(weights)
    return [available_width * weight / total for weight in weights]


def build_table(rows: list[list[str]], styles, available_width: float):
    rendered = []
    row_heights = []
    for row_index, row in enumerate(rows):
        style = styles["table_header"] if row_index == 0 else styles["table"]
        rendered.append([Paragraph(clean_inline(cell), style) for cell in row])
        row_heights.append(14 * mm if row_index > 0 and all(not cell.strip() for cell in row) else None)
    widths = column_widths(len(rows[0]), available_width)
    table = Table(rendered, colWidths=widths, rowHeights=row_heights, repeatRows=1, hAlign="LEFT", splitByRow=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PURPLE_HEADER),
                ("TEXTCOLOR", (0, 0), (-1, -1), PURPLE),
                ("GRID", (0, 0), (-1, -1), 0.35, BORDER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, PURPLE_LIGHT]),
            ]
        )
    )
    return table


def parse_markdown(markdown: str, styles, available_width: float):
    story = []
    lines = markdown.splitlines()
    i = 0
    first_title = True

    while i < len(lines):
        line = lines[i].rstrip()
        stripped = line.strip()

        if not stripped:
            i += 1
            continue

        if stripped.startswith("# "):
            if first_title:
                story.append(Spacer(1, 16))
                story.append(Paragraph(clean_inline(stripped[2:]), styles["title"]))
                story.append(Paragraph("Manual checklist for tracing Admin Panel Phase 3 and Phase 4 implementation", styles["small"]))
                story.append(Spacer(1, 12))
                first_title = False
            else:
                story.append(Paragraph(clean_inline(stripped[2:]), styles["h2"]))
            i += 1
            continue

        if stripped.startswith("## "):
            story.append(Paragraph(clean_inline(stripped[3:]), styles["h2"]))
            i += 1
            continue

        if stripped.startswith("- "):
            story.append(Paragraph("- " + clean_inline(stripped[2:]), styles["bullet"]))
            i += 1
            continue

        if stripped.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                current = lines[i].strip()
                if not is_separator(current):
                    rows.append(split_table_row(current))
                i += 1
            if rows:
                story.append(build_table(rows, styles, available_width))
                story.append(Spacer(1, 7))
            continue

        story.append(Paragraph(clean_inline(stripped), styles["body"]))
        i += 1

    return story


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    markdown = SOURCE.read_text(encoding="utf-8")

    page_size = landscape(A4)
    margin_x = 15 * mm
    margin_top = 18 * mm
    margin_bottom = 14 * mm
    frame_width = page_size[0] - (2 * margin_x)
    frame_height = page_size[1] - margin_top - margin_bottom

    styles = make_styles()
    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=page_size,
        leftMargin=margin_x,
        rightMargin=margin_x,
        topMargin=margin_top,
        bottomMargin=margin_bottom,
        title="Admin UI Trace Manual",
        author="SSF Alparamba Unit",
    )
    frame = Frame(margin_x, margin_bottom, frame_width, frame_height, id="normal")
    doc.addPageTemplates([PageTemplate(id="trace", frames=[frame], onPage=page_decor)])

    story = parse_markdown(markdown, styles, frame_width)
    doc.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    main()

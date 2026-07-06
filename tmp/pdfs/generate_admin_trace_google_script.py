from pathlib import Path
import json


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "Admin_UI_Trace_Manual.md"
OUTPUT = ROOT / "Admin_UI_Trace_Manual_Google_Sheets.gs"


def build_script(markdown: str) -> str:
    markdown_json = json.dumps(markdown, ensure_ascii=False)
    return f"""/**
 * Admin UI Trace Manual - Google Sheets Recreator
 *
 * Paste this complete file into Google Apps Script and run:
 *   createAdminUiTraceManualSpreadsheet()
 *
 * It recreates Admin_UI_Trace_Manual.md in Google Sheets with:
 * - one Full Manual sheet containing every original markdown line
 * - one Index sheet
 * - one checklist sheet per markdown table
 * - dark-purple text/theme
 * - frozen headers
 * - status dropdowns
 *
 * Source file: Admin_UI_Trace_Manual.md
 */

const ADMIN_TRACE_MARKDOWN = {markdown_json};

const ADMIN_TRACE_STATUS_VALUES = [
  "Not Started",
  "In Progress",
  "UI Done",
  "Logic Done",
  "Tested",
  "Approved",
  "Needs Fix"
];

const ADMIN_TRACE_THEME = {{
  purple: "#24123A",
  mutedPurple: "#5B476E",
  lightPurple: "#F5F0FA",
  headerPurple: "#EEE4F7",
  borderPurple: "#D8CBE5",
  white: "#FFFFFF"
}};

function onOpen() {{
  SpreadsheetApp.getUi()
    .createMenu("Admin Trace Manual")
    .addItem("Recreate manual in this sheet", "recreateAdminUiTraceManualInActiveSpreadsheet")
    .addItem("Create new trace manual spreadsheet", "createAdminUiTraceManualSpreadsheet")
    .addToUi();
}}

function createAdminUiTraceManualSpreadsheet() {{
  const ss = SpreadsheetApp.create("Admin UI Trace Manual");
  buildAdminTraceManual_(ss);
  Logger.log("Created Admin UI Trace Manual: " + ss.getUrl());
  return ss.getUrl();
}}

function recreateAdminUiTraceManualInActiveSpreadsheet() {{
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  buildAdminTraceManual_(ss);
  Logger.log("Recreated Admin UI Trace Manual: " + ss.getUrl());
  return ss.getUrl();
}}

function buildAdminTraceManual_(ss) {{
  const parsed = parseAdminTraceMarkdown_(ADMIN_TRACE_MARKDOWN);
  clearSpreadsheet_(ss);
  createIndexSheet_(ss, parsed);
  createFullManualSheet_(ss, ADMIN_TRACE_MARKDOWN);
  parsed.tables.forEach((table, index) => createChecklistSheet_(ss, table, index + 1));
  ss.setActiveSheet(ss.getSheetByName("Index"));
}}

function parseAdminTraceMarkdown_(markdown) {{
  const lines = markdown.replace(/\\r\\n/g, "\\n").split("\\n");
  const sections = [];
  const tables = [];
  let currentHeading = "Manual";

  for (let i = 0; i < lines.length; i++) {{
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {{
      currentHeading = trimmed.replace(/^##\\s+/, "").trim();
      sections.push(currentHeading);
      continue;
    }}

    if (trimmed.startsWith("|")) {{
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {{
        tableLines.push(lines[i]);
        i++;
      }}
      i--;

      const rows = tableLines
        .filter(row => !isMarkdownSeparatorRow_(row))
        .map(row => splitMarkdownTableRow_(row));

      if (rows.length > 0) {{
        tables.push({{
          title: currentHeading,
          rows: rows
        }});
      }}
    }}
  }}

  return {{ sections, tables }};
}}

function splitMarkdownTableRow_(line) {{
  let value = line.trim();
  if (value.startsWith("|")) value = value.slice(1);
  if (value.endsWith("|")) value = value.slice(0, -1);
  return value.split("|").map(cell => cleanMarkdownCell_(cell.trim()));
}}

function isMarkdownSeparatorRow_(line) {{
  const cells = splitMarkdownTableRowRaw_(line);
  return cells.length > 0 && cells.every(cell => /^:?-{{3,}}:?$/.test(cell.trim()));
}}

function splitMarkdownTableRowRaw_(line) {{
  let value = line.trim();
  if (value.startsWith("|")) value = value.slice(1);
  if (value.endsWith("|")) value = value.slice(0, -1);
  return value.split("|");
}}

function cleanMarkdownCell_(value) {{
  return value.replace(/`/g, "");
}}

function clearSpreadsheet_(ss) {{
  const existingSheets = ss.getSheets();
  let temp = ss.getSheetByName("__TEMP__");
  if (!temp) temp = ss.insertSheet("__TEMP__");
  existingSheets.forEach(sheet => {{
    if (sheet.getName() !== "__TEMP__") ss.deleteSheet(sheet);
  }});
  temp.clear();
}}

function createIndexSheet_(ss, parsed) {{
  const sheet = getOrCreateSheet_(ss, "Index");
  sheet.clear();

  const rows = [
    ["Admin UI Trace Manual"],
    ["Google Sheets recreation of Admin_UI_Trace_Manual.md"],
    [""],
    ["How to use"],
    ["1. Open each checklist tab."],
    ["2. Update the Status column manually."],
    ["3. Add review notes in the Notes column."],
    ["4. Use Full Manual tab to verify no source line was skipped."],
    [""],
    ["Checklist Sheets", "Rows"]
  ];

  parsed.tables.forEach((table, index) => {{
    rows.push([sheetNameForTable_(table.title, index + 1), Math.max(table.rows.length - 1, 0)]);
  }});

  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
  sheet.getRange("A1:B1").merge();
  sheet.getRange("A1")
    .setFontSize(22)
    .setFontWeight("bold")
    .setFontColor(ADMIN_TRACE_THEME.purple)
    .setHorizontalAlignment("center");
  sheet.getRange("A2:B2").merge();
  sheet.getRange("A2")
    .setFontColor(ADMIN_TRACE_THEME.mutedPurple)
    .setHorizontalAlignment("center");
  sheet.getRange("A4:A8").setFontColor(ADMIN_TRACE_THEME.purple);
  sheet.getRange("A10:B10")
    .setFontWeight("bold")
    .setBackground(ADMIN_TRACE_THEME.headerPurple)
    .setFontColor(ADMIN_TRACE_THEME.purple);
  sheet.getRange(10, 1, Math.max(rows.length - 9, 1), 2)
    .setBorder(true, true, true, true, true, true, ADMIN_TRACE_THEME.borderPurple, SpreadsheetApp.BorderStyle.SOLID);

  sheet.setColumnWidth(1, 360);
  sheet.setColumnWidth(2, 120);
  sheet.setFrozenRows(10);
  sheet.setTabColor(ADMIN_TRACE_THEME.purple);
}}

function createFullManualSheet_(ss, markdown) {{
  const sheet = getOrCreateSheet_(ss, "Full Manual");
  sheet.clear();

  const lines = markdown.replace(/\\r\\n/g, "\\n").split("\\n").map((line, index) => [index + 1, line]);
  sheet.getRange(1, 1, 1, 2).setValues([["Line", "Original Markdown"]]);
  sheet.getRange(2, 1, lines.length, 2).setValues(lines);

  sheet.getRange(1, 1, 1, 2)
    .setFontWeight("bold")
    .setBackground(ADMIN_TRACE_THEME.headerPurple)
    .setFontColor(ADMIN_TRACE_THEME.purple);
  sheet.getRange(2, 1, lines.length, 2)
    .setFontColor(ADMIN_TRACE_THEME.purple)
    .setWrap(true)
    .setVerticalAlignment("top");
  sheet.getRange(1, 1, lines.length + 1, 2)
    .setBorder(true, true, true, true, true, true, ADMIN_TRACE_THEME.borderPurple, SpreadsheetApp.BorderStyle.SOLID);

  sheet.setColumnWidth(1, 70);
  sheet.setColumnWidth(2, 900);
  sheet.setFrozenRows(1);
  sheet.setTabColor("#6B21A8");
}}

function createChecklistSheet_(ss, table, tableNumber) {{
  const sheetName = sheetNameForTable_(table.title, tableNumber);
  const sheet = getOrCreateSheet_(ss, sheetName);
  sheet.clear();

  const rows = table.rows;
  const colCount = rows[0].length;
  const rowCount = rows.length;

  sheet.getRange(1, 1, 1, colCount).merge();
  sheet.getRange(1, 1).setValue(table.title);
  sheet.getRange(2, 1, rowCount, colCount).setValues(rows);

  sheet.getRange(1, 1)
    .setFontSize(16)
    .setFontWeight("bold")
    .setFontColor(ADMIN_TRACE_THEME.purple)
    .setBackground(ADMIN_TRACE_THEME.white);

  sheet.getRange(2, 1, 1, colCount)
    .setFontWeight("bold")
    .setBackground(ADMIN_TRACE_THEME.headerPurple)
    .setFontColor(ADMIN_TRACE_THEME.purple);

  if (rowCount > 1) {{
    sheet.getRange(3, 1, rowCount - 1, colCount)
      .setFontColor(ADMIN_TRACE_THEME.purple)
      .setWrap(true)
      .setVerticalAlignment("top");
    applyAlternatingRows_(sheet, 3, rowCount - 1, colCount);
  }}

  sheet.getRange(2, 1, rowCount, colCount)
    .setBorder(true, true, true, true, true, true, ADMIN_TRACE_THEME.borderPurple, SpreadsheetApp.BorderStyle.SOLID);

  applyStatusDropdown_(sheet, rows);
  sizeColumns_(sheet, rows[0]);

  sheet.setFrozenRows(2);
  sheet.setTabColor(ADMIN_TRACE_THEME.purple);
}}

function applyAlternatingRows_(sheet, startRow, numberOfRows, colCount) {{
  for (let i = 0; i < numberOfRows; i++) {{
    const color = i % 2 === 0 ? ADMIN_TRACE_THEME.white : ADMIN_TRACE_THEME.lightPurple;
    sheet.getRange(startRow + i, 1, 1, colCount).setBackground(color);
  }}
}}

function applyStatusDropdown_(sheet, rows) {{
  const header = rows[0];
  const statusIndex = header.findIndex(cell => String(cell).toLowerCase() === "status");
  if (statusIndex === -1 || rows.length <= 1) return;

  const col = statusIndex + 1;
  const range = sheet.getRange(3, col, rows.length - 1, 1);
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(ADMIN_TRACE_STATUS_VALUES, true)
    .setAllowInvalid(false)
    .build();
  range.setDataValidation(rule);
  range.setBackground("#FFF7ED");
  range.setFontWeight("bold");
  range.setFontColor(ADMIN_TRACE_THEME.purple);
}}

function sizeColumns_(sheet, header) {{
  const widthsByName = {{
    "Date": 110,
    "Status": 140,
    "Notes": 260,
    "Owner": 140,
    "Rows": 90
  }};

  for (let i = 0; i < header.length; i++) {{
    const name = String(header[i]);
    let width = widthsByName[name] || 260;
    if (/Requirement|Expected|Feature|Purpose|Observation|Action Needed|Must Be Checked/.test(name)) width = 360;
    if (/Route|Item|Rule|Section|Area|Type/.test(name)) width = 260;
    sheet.setColumnWidth(i + 1, width);
  }}
}}

function sheetNameForTable_(title, tableNumber) {{
  const cleaned = String(title)
    .replace(/^\\d+\\.\\s*/, "")
    .replace(/Trace|Checklist/gi, "")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .trim()
    .replace(/\\s+/g, " ");
  const prefix = String(tableNumber).padStart(2, "0");
  const base = cleaned || "Table";
  return (prefix + " " + base).slice(0, 99);
}}

function getOrCreateSheet_(ss, name) {{
  const existing = ss.getSheetByName(name);
  if (existing) return existing;
  return ss.insertSheet(name);
}}
"""


def main():
    markdown = SOURCE.read_text(encoding="utf-8")
    OUTPUT.write_text(build_script(markdown), encoding="utf-8")
    print(OUTPUT)


if __name__ == "__main__":
    main()

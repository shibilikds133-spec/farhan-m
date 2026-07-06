/**
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

const ADMIN_TRACE_MARKDOWN = "# Admin UI Trace Manual\n\n## Manual Purpose\n\nThis file is for manual tracing only.\n\nUse this document to check whether the Admin Panel implementation follows `Admin_UI_Architecture_Plan.md` without missing any page, component, feature, workflow, responsive rule, or premium UI requirement.\n\nImportant rule:\n\n- Do not treat this file as a replacement for `Admin_UI_Architecture_Plan.md`.\n- Do not modify `Admin_UI_Architecture_Plan.md` while tracing.\n- Use this file as a checklist while agents or developers build the admin panel.\n- Mark progress manually in the status columns.\n\n## Status Legend\n\nUse these status values:\n\n| Status | Meaning |\n|---|---|\n| Not Started | Work has not begun |\n| In Progress | Work is being built |\n| UI Done | Visual layout is built |\n| Logic Done | Interaction/data behavior is connected |\n| Tested | Checked on mobile and desktop |\n| Approved | Product owner approved |\n| Needs Fix | Built but has issues |\n\n## 1. Master Files Trace\n\n| Item | Must Be Checked | Status | Notes |\n|---|---|---|---|\n| `Admin_UI_Architecture_Plan.md` exists | Admin implementation follows it | Not Started | |\n| `UI_PLAN_V2.md` checked | Typography, spacing, colors, Cooper Black rules followed | Not Started | |\n| `Architecture_Plan.md` checked | Routes and layout hierarchy respected | Not Started | |\n| `PROGRESS_LOG.md` checked | New features included | Not Started | |\n| Member UI checked | Admin matches `MemberHeader` and `InlineLoginForm` style | Not Started | |\n\n## 2. Non-Negotiable UI Trace\n\n| UI Rule | Expected Result | Status | Notes |\n|---|---|---|---|\n| Member-side visual inheritance | Admin looks like same product, not a separate dashboard | Not Started | |\n| Background color | Uses `#F6F8FC` shell background | Not Started | |\n| Cards/surfaces | White/slate surfaces with soft border | Not Started | |\n| Buttons | Match current button radius, weight, hover, and density | Not Started | |\n| Icons | Uses `lucide-react` only | Not Started | |\n| Global action icons | Uses Community Action Icon style | Not Started | |\n| Icon hover | Soft shadow and scale/lift hover | Not Started | |\n| Glass overlays | Menus/drawers/modals use premium glass where appropriate | Not Started | |\n| Framer motion | Dropdowns/drawers use restrained motion | Not Started | |\n| No heavy marketing UI | Admin stays operational and dense | Not Started | |\n| Mobile-first | All admin pages work from 320px width | Not Started | |\n\n## 3. Typography Trace\n\n| Typography Rule | Expected Result | Status | Notes |\n|---|---|---|---|\n| Cooper Black restriction | Only exact text `SSF` uses Cooper Black | Not Started | |\n| Unit name font | `Alparamba Unit` uses normal UI font | Not Started | |\n| Admin titles | No Cooper Black in page titles | Not Started | |\n| Buttons/forms/tables | No Cooper Black used | Not Started | |\n| Financial values | Tabular numerals used | Not Started | |\n| Dates/IDs/phones | Tabular numerals used | Not Started | |\n| Letter spacing | No negative/tight letter spacing | Not Started | |\n| Malayalam text | Text remains readable and not squeezed | Not Started | |\n\n## 4. Admin Route Trace\n\n| Route | Purpose | Status | Notes |\n|---|---|---|---|\n| `/admin` | Redirects to dashboard | Not Started | |\n| `/admin/login` | Admin login/PIN entry | Not Started | |\n| `/admin/dashboard` | Admin overview | Not Started | |\n| `/admin/members` | Members list | Not Started | |\n| `/admin/members/new` | Add member | Not Started | |\n| `/admin/members/[id]` | Member detail | Not Started | |\n| `/admin/members/[id]/edit` | Edit member route fallback | Not Started | |\n| `/admin/cash-entry` | Manual cash entry | Not Started | |\n| `/admin/payments` | Payments ledger | Not Started | |\n| `/admin/payments/[id]` | Payment detail | Not Started | |\n| `/admin/defaulters` | Defaulters list | Not Started | |\n| `/admin/reports` | Reports dashboard | Not Started | |\n| `/admin/reports/[type]` | Report detail/export view | Not Started | |\n| `/admin/audit-log` | Audit log | Not Started | |\n| `/admin/blood-donors` | Blood donor admin | Not Started | |\n| `/admin/settings` | Settings overview | Not Started | |\n| `/admin/settings/support-contacts` | Support contacts management | Not Started | |\n| `/admin/settings/admins` | Admin users/roles | Not Started | |\n| `/admin/settings/events` | Special event settings | Not Started | |\n| `/admin/settings/payments` | Payment settings | Not Started | |\n\n## 5. Admin Layout Trace\n\n| Layout Item | Expected Result | Status | Notes |\n|---|---|---|---|\n| Admin layout file | `src/app/admin/layout.tsx` exists | Not Started | |\n| Admin redirect | `src/app/admin/page.tsx` redirects correctly | Not Started | |\n| Desktop sidebar | Persistent sidebar on desktop | Not Started | |\n| Mobile drawer | Sidebar becomes drawer on mobile | Not Started | |\n| Topbar | Matches member header height/density | Not Started | |\n| Logo lockup | Official logo plus `SSF Alparamba Unit` style | Not Started | |\n| Navigation active state | Blue text/icon with subtle surface | Not Started | |\n| Profile menu | Premium circular/glass menu style | Not Started | |\n| Notifications | Bell uses Community Action Icon style | Not Started | |\n| Global search | Present where useful without clutter | Not Started | |\n| Breadcrumbs | Used only on deep admin pages | Not Started | |\n\n## 6. Admin Sidebar Trace\n\n| Sidebar Item | Present | Status | Notes |\n|---|---|---|---|\n| Dashboard | Yes | Not Started | |\n| Members | Yes | Not Started | |\n| Cash Entry | Yes | Not Started | |\n| Payments | Yes | Not Started | |\n| Defaulters | Yes | Not Started | |\n| Reports | Yes | Not Started | |\n| Blood Donors | Yes | Not Started | |\n| Audit Log | Yes | Not Started | |\n| Settings | Yes | Not Started | |\n\n## 7. Admin Dashboard Trace\n\n| Dashboard Item | Expected Result | Status | Notes |\n|---|---|---|---|\n| Total Collected stat | Amount visible in first viewport | Not Started | |\n| Monthly Dues stat | Separate from events | Not Started | |\n| Special Events stat | Separate event contribution total | Not Started | |\n| Pending Amount stat | Clear unpaid total | Not Started | |\n| Paid Members stat | Count and rate visible | Not Started | |\n| Defaulters stat | Current risk visible | Not Started | |\n| Cash Handovers stat | Pending verification shown | Not Started | |\n| Blood Donors stat | Available donor count shown | Not Started | |\n| Quick action: Add Member | Present near top | Not Started | |\n| Quick action: Record Cash | Present near top | Not Started | |\n| Quick action: View Defaulters | Present near top | Not Started | |\n| Quick action: Export Report | Present near top | Not Started | |\n| Collection chart | Trend visible after stats | Not Started | |\n| Payment method split | UPI, QR, cash separated | Not Started | |\n| Recent payments | Visible within early scroll | Not Started | |\n| Recent activity | Admin actions previewed | Not Started | |\n\n## 8. Members List Trace\n\n| Members Feature | Expected Result | Status | Notes |\n|---|---|---|---|\n| Search | Name, phone, member ID, area | Not Started | |\n| Status filter | Active/inactive/etc. | Not Started | |\n| Payment filter | Paid/pending/overdue | Not Started | |\n| Blood group filter | 8 groups supported | Not Started | |\n| Donor filter | Available/unavailable | Not Started | |\n| Monthly tier filter | Base/premium/custom | Not Started | |\n| Area filter | Area-based filtering | Not Started | |\n| PIN status filter | Issued/not issued/reset | Not Started | |\n| Desktop table | Proper columns and sticky header | Not Started | |\n| Mobile cards | Clean card fallback | Not Started | |\n| Row action menu | View, edit, record payment, reset PIN | Not Started | |\n| Add member action | Present and clear | Not Started | |\n| Export members | Available if scoped | Not Started | |\n\n## 9. Add/Edit Member Trace\n\n| Form Section | Fields/Behavior | Status | Notes |\n|---|---|---|---|\n| Basic details | Name, phone, age, address, area, occupation | Not Started | |\n| Membership | Member ID, status, tier, amount, joined date | Not Started | |\n| Blood donor | Blood group, donor, available | Not Started | |\n| Family | Add/edit/remove family members | Not Started | |\n| Access | Issue/reset 4-digit PIN | Not Started | |\n| Admin notes | Internal note field | Not Started | |\n| Validation | Phone, amount, PIN, required fields | Not Started | |\n| Sticky footer | Save/cancel visible on long forms | Not Started | |\n| Destructive confirm | Deactivate/delete requires confirmation | Not Started | |\n\n## 10. Member Detail Trace\n\n| Detail Section | Expected Result | Status | Notes |\n|---|---|---|---|\n| Header summary | Name, ID, phone, status | Not Started | |\n| Quick actions | Edit, Record Payment, Reset PIN | Not Started | |\n| Overview tab | Profile and due summary | Not Started | |\n| Payments tab | Payment history and receipts | Not Started | |\n| Dues tab | Due months and amounts | Not Started | |\n| Family tab | Family members | Not Started | |\n| Donor tab | Blood donor info | Not Started | |\n| Notes tab | Internal admin notes | Not Started | |\n| Audit tab | Member-related audit entries | Not Started | |\n| Receipt links | Public receipt links work | Not Started | |\n\n## 11. Cash Entry Trace\n\n| Cash Entry Requirement | Expected Result | Status | Notes |\n|---|---|---|---|\n| Monthly dues mode | Separate mode/tab | Not Started | |\n| Special event mode | Separate mode/tab | Not Started | |\n| Member search | Search/select member | Not Started | |\n| Guest payer support | Phone/name for non-member payer | Not Started | |\n| Pending month selection | Multiple arrears months selectable | Not Started | |\n| Base/Premium tier | Contribution tier visible | Not Started | |\n| Custom event amount | Minimum amount validation | Not Started | |\n| Event selection | Event name saved | Not Started | |\n| Received-by admin | Required dropdown | Not Started | |\n| Admin role labels | President/role visible | Not Started | |\n| Confirmation modal | Review before save | Not Started | |\n| Receipt generation | Receipt link after save | Not Started | |\n| Ledger update | Payment appears in ledger | Not Started | |\n| Audit entry | Cash record creates audit entry | Not Started | |\n\n## 12. Payments Ledger Trace\n\n| Ledger Requirement | Expected Result | Status | Notes |\n|---|---|---|---|\n| Search | Receipt, phone, member, reference | Not Started | |\n| Date filter | Date range works | Not Started | |\n| Category filter | Monthly Dues vs Special Events | Not Started | |\n| Method filter | UPI, QR, Cash Handover, Admin Cash Entry | Not Started | |\n| Status filter | Pending/confirmed/failed/etc. | Not Started | |\n| Collected-by filter | Admin recipient filtering | Not Started | |\n| Desktop table | All required columns | Not Started | |\n| Mobile cards | Clean fallback | Not Started | |\n| Amount alignment | Right aligned/tabular | Not Started | |\n| Payment detail route | `/admin/payments/[id]` works | Not Started | |\n| Public receipt link | Links to `/receipt/[id]` | Not Started | |\n| Export | Export flow present if scoped | Not Started | |\n\n## 13. Defaulters Trace\n\n| Defaulter Feature | Expected Result | Status | Notes |\n|---|---|---|---|\n| Current month unpaid | Separate section | Not Started | |\n| Severe defaulters | Separate section | Not Started | |\n| Recently resolved | Optional section | Not Started | |\n| Follow-up queue | Follow-up state visible | Not Started | |\n| Month filter | Month selection works | Not Started | |\n| Severity filter | Current/severe/etc. | Not Started | |\n| Area filter | Area-based filtering | Not Started | |\n| Record payment action | Quick action available | Not Started | |\n| Mark contacted | Follow-up tracking | Not Started | |\n| Export phone list | Available if scoped | Not Started | |\n| Empty state | Positive no-defaulters message | Not Started | |\n\n## 14. Reports Trace\n\n| Report Type | Expected Result | Status | Notes |\n|---|---|---|---|\n| Monthly collection | Summary and export | Not Started | |\n| Dues collection | Monthly dues only | Not Started | |\n| Special events | Event contributions only | Not Started | |\n| Payment method split | UPI/QR/cash split | Not Started | |\n| Cash handover | Collected-by admin totals | Not Started | |\n| Defaulters | Follow-up/export report | Not Started | |\n| Member status | Active/inactive/member data | Not Started | |\n| Blood donor | Donor export by group | Not Started | |\n| Admin activity | Activity/audit summary | Not Started | |\n| Export metadata | Unit, date range, generated by | Not Started | |\n\n## 15. Audit Log Trace\n\n| Audit Requirement | Expected Result | Status | Notes |\n|---|---|---|---|\n| Audit route | `/admin/audit-log` exists | Not Started | |\n| Search | Actor/action/entity search | Not Started | |\n| Date range | Filter by period | Not Started | |\n| Actor filter | Filter by admin | Not Started | |\n| Entity filter | Member/payment/settings/etc. | Not Started | |\n| Dense table | Time, actor, action, entity, summary | Not Started | |\n| Detail drawer | Before/after values | Not Started | |\n| Critical actions logged | Member/payment/settings changes | Not Started | |\n\n## 16. Settings Trace\n\n| Settings Area | Expected Result | Status | Notes |\n|---|---|---|---|\n| Unit Profile | Unit name/contact details | Not Started | |\n| Payment Settings | UPI, QR, monthly amounts, minimums | Not Started | |\n| Special Events | Add/edit event definitions | Not Started | |\n| Support Contacts | Add/edit/delete support numbers | Not Started | |\n| Admin Users | Roles and permissions | Not Started | |\n| Member Access | PIN issue/reset rules | Not Started | |\n| Receipt Settings | Prefix, labels, receipt themes | Not Started | |\n| Field-level loading | No full-page reload for every save | Not Started | |\n| Confirmation dialogs | Destructive actions confirmed | Not Started | |\n\n## 17. Support Contacts Trace\n\n| Support Contact Feature | Expected Result | Status | Notes |\n|---|---|---|---|\n| Add contact | Name, role, phone | Not Started | |\n| Edit contact | Existing contact editable | Not Started | |\n| Delete/deactivate contact | Safe confirmation | Not Started | |\n| Reorder contacts | Sort order supported | Not Started | |\n| Primary contact | One or more primary rules clear | Not Started | |\n| WhatsApp enabled | Toggle supported | Not Started | |\n| Active/inactive | Member drawer only shows active contacts | Not Started | |\n| Member profile sync | `ContactAdminsDrawer` uses configured list later | Not Started | |\n\n## 18. Blood Donors Trace\n\n| Blood Donor Feature | Expected Result | Status | Notes |\n|---|---|---|---|\n| Blood donor route | `/admin/blood-donors` exists | Not Started | |\n| Blood group filter | 8 blood groups | Not Started | |\n| Availability filter | Available/unavailable | Not Started | |\n| Area filter | Area based | Not Started | |\n| Search | Name/phone search | Not Started | |\n| Blood group pill | Matches member directory style | Not Started | |\n| Mark availability | Admin can update donor status | Not Started | |\n| Open member detail | Donor links to member | Not Started | |\n| Export donor list | Available if scoped | Not Started | |\n| Empty state | Specific no-donor message | Not Started | |\n\n## 19. Admin Login Trace\n\n| Login Requirement | Expected Result | Status | Notes |\n|---|---|---|---|\n| Mobile number step | 10-digit phone input | Not Started | |\n| 4-digit PIN step | Same PIN language as member login | Not Started | |\n| No OTP wording | Does not say SMS OTP unless changed later | Not Started | |\n| Official logo | Logo shown cleanly | Not Started | |\n| `SSF` font rule | Cooper Black only for `SSF` | Not Started | |\n| Error handling | Invalid PIN shown clearly | Not Started | |\n| Loading state | Button/loading state present | Not Started | |\n\n## 20. Feature Coverage Trace\n\n| Existing/New Feature | Admin Must Account For It | Status | Notes |\n|---|---|---|---|\n| Blood donors | Admin can view/edit donor data | Not Started | |\n| Cash handovers | Admin can track receiver/collector | Not Started | |\n| Payments separation | Monthly dues and events separated | Not Started | |\n| UPI payments | Ledger/report support | Not Started | |\n| QR Code payments | Ledger/report support | Not Started | |\n| Monthly arrears | Multiple months selectable | Not Started | |\n| Base/Premium tiers | Tier stored and visible | Not Started | |\n| Custom event amount | Minimum validation | Not Started | |\n| Event receipts | Amber/special event metadata | Not Started | |\n| Cash collected by | Receipt and ledger metadata | Not Started | |\n| Support contact management | Admin settings controls member drawer | Not Started | |\n| Admin PIN system | 4-digit PIN workflows | Not Started | |\n| Biometric setting | Member profile setting acknowledged | Not Started | |\n| Notification bell | Admin topbar includes it | Not Started | |\n| Circular profile menu | Admin profile menu matches style | Not Started | |\n| Community Action Icon | Global action icon style preserved | Not Started | |\n\n## 21. Mobile QA Trace\n\n| Mobile Check | Expected Result | Status | Notes |\n|---|---|---|---|\n| 320px width | No horizontal overflow | Not Started | |\n| Header | Logo/title/actions do not overlap | Not Started | |\n| Drawer nav | Opens/closes smoothly | Not Started | |\n| Cards | Text fits inside cards | Not Started | |\n| Tables | Converted to mobile cards | Not Started | |\n| Forms | Inputs readable and tappable | Not Started | |\n| Sticky footer | Does not cover fields/errors | Not Started | |\n| Modals | Fit viewport or become sheet | Not Started | |\n| Filter sheets | Touch-friendly and not hidden by OS bar | Not Started | |\n| Toasts | Do not cover bottom navigation/actions | Not Started | |\n\n## 22. Desktop QA Trace\n\n| Desktop Check | Expected Result | Status | Notes |\n|---|---|---|---|\n| Sidebar | Persistent and aligned | Not Started | |\n| Topbar | Clean, dense, not crowded | Not Started | |\n| Tables | Sticky headers and readable columns | Not Started | |\n| Amount columns | Right aligned | Not Started | |\n| Filter bars | Controls align cleanly | Not Started | |\n| Charts | Below stats, not competing | Not Started | |\n| Detail pages | Side panels/tabs used effectively | Not Started | |\n| Hover states | Subtle and premium | Not Started | |\n| Wide screens | Content does not stretch awkwardly | Not Started | |\n\n## 23. State QA Trace\n\n| State | Every Admin Page Must Have | Status | Notes |\n|---|---|---|---|\n| Loading | Skeletons match final layout | Not Started | |\n| Empty | Purpose-specific empty message | Not Started | |\n| Error | Calm retry/recovery path | Not Started | |\n| Partial data | Available sections remain visible | Not Started | |\n| No filter results | Reset filters action | Not Started | |\n| Success | Toast or visible saved state | Not Started | |\n| Destructive confirm | Confirmation modal/dialog | Not Started | |\n\n## 24. Accessibility Trace\n\n| Accessibility Check | Expected Result | Status | Notes |\n|---|---|---|---|\n| Icon labels | Icon-only buttons have accessible names | Not Started | |\n| Keyboard nav | Forms, menus, filters usable by keyboard | Not Started | |\n| Focus rings | Visible blue focus state | Not Started | |\n| Dialog focus | Modals/drawers trap and restore focus | Not Started | |\n| Table headers | Semantic headers | Not Started | |\n| Form labels | Labels and error associations | Not Started | |\n| Color use | Status not color-only | Not Started | |\n| Reduced motion | Motion can be reduced | Not Started | |\n\n## 25. Final Approval Checklist\n\n| Final Item | Requirement | Status | Notes |\n|---|---|---|---|\n| Admin visual match | Looks like member-side premium UI | Not Started | |\n| All routes covered | No missing Phase 3/4 route | Not Started | |\n| All features covered | No missed progress-log feature | Not Started | |\n| Mobile checked | 320px and common mobile widths | Not Started | |\n| Desktop checked | Tablet, desktop, wide desktop | Not Started | |\n| Receipts linked | Receipt paths preserved | Not Started | |\n| Audit coverage | Critical changes traceable | Not Started | |\n| Settings complete | Support, payments, admins, events covered | Not Started | |\n| Product owner review | Final approval received | Not Started | |\n\n## 26. Manual Trace Notes\n\nUse this space while reviewing builds.\n\n| Date | Page/Feature | Observation | Action Needed | Owner | Status |\n|---|---|---|---|---|---|\n|  |  |  |  |  |  |\n|  |  |  |  |  |  |\n|  |  |  |  |  |  |\n\n";

const ADMIN_TRACE_STATUS_VALUES = [
  "Not Started",
  "In Progress",
  "UI Done",
  "Logic Done",
  "Tested",
  "Approved",
  "Needs Fix"
];

const ADMIN_TRACE_THEME = {
  purple: "#24123A",
  mutedPurple: "#5B476E",
  lightPurple: "#F5F0FA",
  headerPurple: "#EEE4F7",
  borderPurple: "#D8CBE5",
  white: "#FFFFFF"
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Admin Trace Manual")
    .addItem("Recreate manual in this sheet", "recreateAdminUiTraceManualInActiveSpreadsheet")
    .addItem("Create new trace manual spreadsheet", "createAdminUiTraceManualSpreadsheet")
    .addToUi();
}

function createAdminUiTraceManualSpreadsheet() {
  const ss = SpreadsheetApp.create("Admin UI Trace Manual");
  buildAdminTraceManual_(ss);
  Logger.log("Created Admin UI Trace Manual: " + ss.getUrl());
  return ss.getUrl();
}

function recreateAdminUiTraceManualInActiveSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  buildAdminTraceManual_(ss);
  Logger.log("Recreated Admin UI Trace Manual: " + ss.getUrl());
  return ss.getUrl();
}

function buildAdminTraceManual_(ss) {
  const parsed = parseAdminTraceMarkdown_(ADMIN_TRACE_MARKDOWN);
  clearSpreadsheet_(ss);
  createIndexSheet_(ss, parsed);
  createFullManualSheet_(ss, ADMIN_TRACE_MARKDOWN);
  parsed.tables.forEach((table, index) => createChecklistSheet_(ss, table, index + 1));
  ss.setActiveSheet(ss.getSheetByName("Index"));
}

function parseAdminTraceMarkdown_(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const sections = [];
  const tables = [];
  let currentHeading = "Manual";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      currentHeading = trimmed.replace(/^##\s+/, "").trim();
      sections.push(currentHeading);
      continue;
    }

    if (trimmed.startsWith("|")) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      i--;

      const rows = tableLines
        .filter(row => !isMarkdownSeparatorRow_(row))
        .map(row => splitMarkdownTableRow_(row));

      if (rows.length > 0) {
        tables.push({
          title: currentHeading,
          rows: rows
        });
      }
    }
  }

  return { sections, tables };
}

function splitMarkdownTableRow_(line) {
  let value = line.trim();
  if (value.startsWith("|")) value = value.slice(1);
  if (value.endsWith("|")) value = value.slice(0, -1);
  return value.split("|").map(cell => cleanMarkdownCell_(cell.trim()));
}

function isMarkdownSeparatorRow_(line) {
  const cells = splitMarkdownTableRowRaw_(line);
  return cells.length > 0 && cells.every(cell => /^:?-{3,}:?$/.test(cell.trim()));
}

function splitMarkdownTableRowRaw_(line) {
  let value = line.trim();
  if (value.startsWith("|")) value = value.slice(1);
  if (value.endsWith("|")) value = value.slice(0, -1);
  return value.split("|");
}

function cleanMarkdownCell_(value) {
  return value.replace(/`/g, "");
}

function clearSpreadsheet_(ss) {
  const existingSheets = ss.getSheets();
  let temp = ss.getSheetByName("__TEMP__");
  if (!temp) temp = ss.insertSheet("__TEMP__");
  existingSheets.forEach(sheet => {
    if (sheet.getName() !== "__TEMP__") ss.deleteSheet(sheet);
  });
  temp.clear();
}

function createIndexSheet_(ss, parsed) {
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

  parsed.tables.forEach((table, index) => {
    rows.push([sheetNameForTable_(table.title, index + 1), Math.max(table.rows.length - 1, 0)]);
  });

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
}

function createFullManualSheet_(ss, markdown) {
  const sheet = getOrCreateSheet_(ss, "Full Manual");
  sheet.clear();

  const lines = markdown.replace(/\r\n/g, "\n").split("\n").map((line, index) => [index + 1, line]);
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
}

function createChecklistSheet_(ss, table, tableNumber) {
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

  if (rowCount > 1) {
    sheet.getRange(3, 1, rowCount - 1, colCount)
      .setFontColor(ADMIN_TRACE_THEME.purple)
      .setWrap(true)
      .setVerticalAlignment("top");
    applyAlternatingRows_(sheet, 3, rowCount - 1, colCount);
  }

  sheet.getRange(2, 1, rowCount, colCount)
    .setBorder(true, true, true, true, true, true, ADMIN_TRACE_THEME.borderPurple, SpreadsheetApp.BorderStyle.SOLID);

  applyStatusDropdown_(sheet, rows);
  sizeColumns_(sheet, rows[0]);

  sheet.setFrozenRows(2);
  sheet.setTabColor(ADMIN_TRACE_THEME.purple);
}

function applyAlternatingRows_(sheet, startRow, numberOfRows, colCount) {
  for (let i = 0; i < numberOfRows; i++) {
    const color = i % 2 === 0 ? ADMIN_TRACE_THEME.white : ADMIN_TRACE_THEME.lightPurple;
    sheet.getRange(startRow + i, 1, 1, colCount).setBackground(color);
  }
}

function applyStatusDropdown_(sheet, rows) {
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
}

function sizeColumns_(sheet, header) {
  const widthsByName = {
    "Date": 110,
    "Status": 140,
    "Notes": 260,
    "Owner": 140,
    "Rows": 90
  };

  for (let i = 0; i < header.length; i++) {
    const name = String(header[i]);
    let width = widthsByName[name] || 260;
    if (/Requirement|Expected|Feature|Purpose|Observation|Action Needed|Must Be Checked/.test(name)) width = 360;
    if (/Route|Item|Rule|Section|Area|Type/.test(name)) width = 260;
    sheet.setColumnWidth(i + 1, width);
  }
}

function sheetNameForTable_(title, tableNumber) {
  const cleaned = String(title)
    .replace(/^\d+\.\s*/, "")
    .replace(/Trace|Checklist/gi, "")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, " ");
  const prefix = String(tableNumber).padStart(2, "0");
  const base = cleaned || "Table";
  return (prefix + " " + base).slice(0, 99);
}

function getOrCreateSheet_(ss, name) {
  const existing = ss.getSheetByName(name);
  if (existing) return existing;
  return ss.insertSheet(name);
}

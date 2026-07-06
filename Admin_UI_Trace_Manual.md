# Admin UI Trace Manual

## Manual Purpose

This file is for manual tracing only.

Use this document to check whether the Admin Panel implementation follows `Admin_UI_Architecture_Plan.md` without missing any page, component, feature, workflow, responsive rule, or premium UI requirement.

Important rule:

- Do not treat this file as a replacement for `Admin_UI_Architecture_Plan.md`.
- Do not modify `Admin_UI_Architecture_Plan.md` while tracing.
- Use this file as a checklist while agents or developers build the admin panel.
- Mark progress manually in the status columns.

## Status Legend

Use these status values:

| Status | Meaning |
|---|---|
| Not Started | Work has not begun |
| In Progress | Work is being built |
| UI Done | Visual layout is built |
| Logic Done | Interaction/data behavior is connected |
| Tested | Checked on mobile and desktop |
| Approved | Product owner approved |
| Needs Fix | Built but has issues |

## 1. Master Files Trace

| Item | Must Be Checked | Status | Notes |
|---|---|---|---|
| `Admin_UI_Architecture_Plan.md` exists | Admin implementation follows it | Not Started | |
| `UI_PLAN_V2.md` checked | Typography, spacing, colors, Cooper Black rules followed | Not Started | |
| `Architecture_Plan.md` checked | Routes and layout hierarchy respected | Not Started | |
| `PROGRESS_LOG.md` checked | New features included | Not Started | |
| Member UI checked | Admin matches `MemberHeader` and `InlineLoginForm` style | Not Started | |

## 2. Non-Negotiable UI Trace

| UI Rule | Expected Result | Status | Notes |
|---|---|---|---|
| Member-side visual inheritance | Admin looks like same product, not a separate dashboard | Not Started | |
| Background color | Uses `#F6F8FC` shell background | Not Started | |
| Cards/surfaces | White/slate surfaces with soft border | Not Started | |
| Buttons | Match current button radius, weight, hover, and density | Not Started | |
| Icons | Uses `lucide-react` only | Not Started | |
| Global action icons | Uses Community Action Icon style | Not Started | |
| Icon hover | Soft shadow and scale/lift hover | Not Started | |
| Glass overlays | Menus/drawers/modals use premium glass where appropriate | Not Started | |
| Framer motion | Dropdowns/drawers use restrained motion | Not Started | |
| No heavy marketing UI | Admin stays operational and dense | Not Started | |
| Mobile-first | All admin pages work from 320px width | Not Started | |

## 3. Typography Trace

| Typography Rule | Expected Result | Status | Notes |
|---|---|---|---|
| Cooper Black restriction | Only exact text `SSF` uses Cooper Black | Not Started | |
| Unit name font | `Alparamba Unit` uses normal UI font | Not Started | |
| Admin titles | No Cooper Black in page titles | Not Started | |
| Buttons/forms/tables | No Cooper Black used | Not Started | |
| Financial values | Tabular numerals used | Not Started | |
| Dates/IDs/phones | Tabular numerals used | Not Started | |
| Letter spacing | No negative/tight letter spacing | Not Started | |
| Malayalam text | Text remains readable and not squeezed | Not Started | |

## 4. Admin Route Trace

| Route | Purpose | Status | Notes |
|---|---|---|---|
| `/admin` | Redirects to dashboard | Not Started | |
| `/admin/login` | Admin login/PIN entry | Not Started | |
| `/admin/dashboard` | Admin overview | Not Started | |
| `/admin/members` | Members list | Not Started | |
| `/admin/members/new` | Add member | Not Started | |
| `/admin/members/[id]` | Member detail | Not Started | |
| `/admin/members/[id]/edit` | Edit member route fallback | Not Started | |
| `/admin/cash-entry` | Manual cash entry | Not Started | |
| `/admin/payments` | Payments ledger | Not Started | |
| `/admin/payments/[id]` | Payment detail | Not Started | |
| `/admin/defaulters` | Defaulters list | Not Started | |
| `/admin/reports` | Reports dashboard | Not Started | |
| `/admin/reports/[type]` | Report detail/export view | Not Started | |
| `/admin/audit-log` | Audit log | Not Started | |
| `/admin/blood-donors` | Blood donor admin | Not Started | |
| `/admin/settings` | Settings overview | Not Started | |
| `/admin/settings/support-contacts` | Support contacts management | Not Started | |
| `/admin/settings/admins` | Admin users/roles | Not Started | |
| `/admin/settings/events` | Special event settings | Not Started | |
| `/admin/settings/payments` | Payment settings | Not Started | |

## 5. Admin Layout Trace

| Layout Item | Expected Result | Status | Notes |
|---|---|---|---|
| Admin layout file | `src/app/admin/layout.tsx` exists | Not Started | |
| Admin redirect | `src/app/admin/page.tsx` redirects correctly | Not Started | |
| Desktop sidebar | Persistent sidebar on desktop | Not Started | |
| Mobile drawer | Sidebar becomes drawer on mobile | Not Started | |
| Topbar | Matches member header height/density | Not Started | |
| Logo lockup | Official logo plus `SSF Alparamba Unit` style | Not Started | |
| Navigation active state | Blue text/icon with subtle surface | Not Started | |
| Profile menu | Premium circular/glass menu style | Not Started | |
| Notifications | Bell uses Community Action Icon style | Not Started | |
| Global search | Present where useful without clutter | Not Started | |
| Breadcrumbs | Used only on deep admin pages | Not Started | |

## 6. Admin Sidebar Trace

| Sidebar Item | Present | Status | Notes |
|---|---|---|---|
| Dashboard | Yes | Not Started | |
| Members | Yes | Not Started | |
| Cash Entry | Yes | Not Started | |
| Payments | Yes | Not Started | |
| Defaulters | Yes | Not Started | |
| Reports | Yes | Not Started | |
| Blood Donors | Yes | Not Started | |
| Audit Log | Yes | Not Started | |
| Settings | Yes | Not Started | |

## 7. Admin Dashboard Trace

| Dashboard Item | Expected Result | Status | Notes |
|---|---|---|---|
| Total Collected stat | Amount visible in first viewport | Not Started | |
| Monthly Dues stat | Separate from events | Not Started | |
| Special Events stat | Separate event contribution total | Not Started | |
| Pending Amount stat | Clear unpaid total | Not Started | |
| Paid Members stat | Count and rate visible | Not Started | |
| Defaulters stat | Current risk visible | Not Started | |
| Cash Handovers stat | Pending verification shown | Not Started | |
| Blood Donors stat | Available donor count shown | Not Started | |
| Quick action: Add Member | Present near top | Not Started | |
| Quick action: Record Cash | Present near top | Not Started | |
| Quick action: View Defaulters | Present near top | Not Started | |
| Quick action: Export Report | Present near top | Not Started | |
| Collection chart | Trend visible after stats | Not Started | |
| Payment method split | UPI, QR, cash separated | Not Started | |
| Recent payments | Visible within early scroll | Not Started | |
| Recent activity | Admin actions previewed | Not Started | |

## 8. Members List Trace

| Members Feature | Expected Result | Status | Notes |
|---|---|---|---|
| Search | Name, phone, member ID, area | Not Started | |
| Status filter | Active/inactive/etc. | Not Started | |
| Payment filter | Paid/pending/overdue | Not Started | |
| Blood group filter | 8 groups supported | Not Started | |
| Donor filter | Available/unavailable | Not Started | |
| Monthly tier filter | Base/premium/custom | Not Started | |
| Area filter | Area-based filtering | Not Started | |
| PIN status filter | Issued/not issued/reset | Not Started | |
| Desktop table | Proper columns and sticky header | Not Started | |
| Mobile cards | Clean card fallback | Not Started | |
| Row action menu | View, edit, record payment, reset PIN | Not Started | |
| Add member action | Present and clear | Not Started | |
| Export members | Available if scoped | Not Started | |

## 9. Add/Edit Member Trace

| Form Section | Fields/Behavior | Status | Notes |
|---|---|---|---|
| Basic details | Name, phone, age, address, area, occupation | Not Started | |
| Membership | Member ID, status, tier, amount, joined date | Not Started | |
| Blood donor | Blood group, donor, available | Not Started | |
| Family | Add/edit/remove family members | Not Started | |
| Access | Issue/reset 4-digit PIN | Not Started | |
| Admin notes | Internal note field | Not Started | |
| Validation | Phone, amount, PIN, required fields | Not Started | |
| Sticky footer | Save/cancel visible on long forms | Not Started | |
| Destructive confirm | Deactivate/delete requires confirmation | Not Started | |

## 10. Member Detail Trace

| Detail Section | Expected Result | Status | Notes |
|---|---|---|---|
| Header summary | Name, ID, phone, status | Not Started | |
| Quick actions | Edit, Record Payment, Reset PIN | Not Started | |
| Overview tab | Profile and due summary | Not Started | |
| Payments tab | Payment history and receipts | Not Started | |
| Dues tab | Due months and amounts | Not Started | |
| Family tab | Family members | Not Started | |
| Donor tab | Blood donor info | Not Started | |
| Notes tab | Internal admin notes | Not Started | |
| Audit tab | Member-related audit entries | Not Started | |
| Receipt links | Public receipt links work | Not Started | |

## 11. Cash Entry Trace

| Cash Entry Requirement | Expected Result | Status | Notes |
|---|---|---|---|
| Monthly dues mode | Separate mode/tab | Not Started | |
| Special event mode | Separate mode/tab | Not Started | |
| Member search | Search/select member | Not Started | |
| Guest payer support | Phone/name for non-member payer | Not Started | |
| Pending month selection | Multiple arrears months selectable | Not Started | |
| Base/Premium tier | Contribution tier visible | Not Started | |
| Custom event amount | Minimum amount validation | Not Started | |
| Event selection | Event name saved | Not Started | |
| Received-by admin | Required dropdown | Not Started | |
| Admin role labels | President/role visible | Not Started | |
| Confirmation modal | Review before save | Not Started | |
| Receipt generation | Receipt link after save | Not Started | |
| Ledger update | Payment appears in ledger | Not Started | |
| Audit entry | Cash record creates audit entry | Not Started | |

## 12. Payments Ledger Trace

| Ledger Requirement | Expected Result | Status | Notes |
|---|---|---|---|
| Search | Receipt, phone, member, reference | Not Started | |
| Date filter | Date range works | Not Started | |
| Category filter | Monthly Dues vs Special Events | Not Started | |
| Method filter | UPI, QR, Cash Handover, Admin Cash Entry | Not Started | |
| Status filter | Pending/confirmed/failed/etc. | Not Started | |
| Collected-by filter | Admin recipient filtering | Not Started | |
| Desktop table | All required columns | Not Started | |
| Mobile cards | Clean fallback | Not Started | |
| Amount alignment | Right aligned/tabular | Not Started | |
| Payment detail route | `/admin/payments/[id]` works | Not Started | |
| Public receipt link | Links to `/receipt/[id]` | Not Started | |
| Export | Export flow present if scoped | Not Started | |

## 13. Defaulters Trace

| Defaulter Feature | Expected Result | Status | Notes |
|---|---|---|---|
| Current month unpaid | Separate section | Not Started | |
| Severe defaulters | Separate section | Not Started | |
| Recently resolved | Optional section | Not Started | |
| Follow-up queue | Follow-up state visible | Not Started | |
| Month filter | Month selection works | Not Started | |
| Severity filter | Current/severe/etc. | Not Started | |
| Area filter | Area-based filtering | Not Started | |
| Record payment action | Quick action available | Not Started | |
| Mark contacted | Follow-up tracking | Not Started | |
| Export phone list | Available if scoped | Not Started | |
| Empty state | Positive no-defaulters message | Not Started | |

## 14. Reports Trace

| Report Type | Expected Result | Status | Notes |
|---|---|---|---|
| Monthly collection | Summary and export | Not Started | |
| Dues collection | Monthly dues only | Not Started | |
| Special events | Event contributions only | Not Started | |
| Payment method split | UPI/QR/cash split | Not Started | |
| Cash handover | Collected-by admin totals | Not Started | |
| Defaulters | Follow-up/export report | Not Started | |
| Member status | Active/inactive/member data | Not Started | |
| Blood donor | Donor export by group | Not Started | |
| Admin activity | Activity/audit summary | Not Started | |
| Export metadata | Unit, date range, generated by | Not Started | |

## 15. Audit Log Trace

| Audit Requirement | Expected Result | Status | Notes |
|---|---|---|---|
| Audit route | `/admin/audit-log` exists | Not Started | |
| Search | Actor/action/entity search | Not Started | |
| Date range | Filter by period | Not Started | |
| Actor filter | Filter by admin | Not Started | |
| Entity filter | Member/payment/settings/etc. | Not Started | |
| Dense table | Time, actor, action, entity, summary | Not Started | |
| Detail drawer | Before/after values | Not Started | |
| Critical actions logged | Member/payment/settings changes | Not Started | |

## 16. Settings Trace

| Settings Area | Expected Result | Status | Notes |
|---|---|---|---|
| Unit Profile | Unit name/contact details | Not Started | |
| Payment Settings | UPI, QR, monthly amounts, minimums | Not Started | |
| Special Events | Add/edit event definitions | Not Started | |
| Support Contacts | Add/edit/delete support numbers | Not Started | |
| Admin Users | Roles and permissions | Not Started | |
| Member Access | PIN issue/reset rules | Not Started | |
| Receipt Settings | Prefix, labels, receipt themes | Not Started | |
| Field-level loading | No full-page reload for every save | Not Started | |
| Confirmation dialogs | Destructive actions confirmed | Not Started | |

## 17. Support Contacts Trace

| Support Contact Feature | Expected Result | Status | Notes |
|---|---|---|---|
| Add contact | Name, role, phone | Not Started | |
| Edit contact | Existing contact editable | Not Started | |
| Delete/deactivate contact | Safe confirmation | Not Started | |
| Reorder contacts | Sort order supported | Not Started | |
| Primary contact | One or more primary rules clear | Not Started | |
| WhatsApp enabled | Toggle supported | Not Started | |
| Active/inactive | Member drawer only shows active contacts | Not Started | |
| Member profile sync | `ContactAdminsDrawer` uses configured list later | Not Started | |

## 18. Blood Donors Trace

| Blood Donor Feature | Expected Result | Status | Notes |
|---|---|---|---|
| Blood donor route | `/admin/blood-donors` exists | Not Started | |
| Blood group filter | 8 blood groups | Not Started | |
| Availability filter | Available/unavailable | Not Started | |
| Area filter | Area based | Not Started | |
| Search | Name/phone search | Not Started | |
| Blood group pill | Matches member directory style | Not Started | |
| Mark availability | Admin can update donor status | Not Started | |
| Open member detail | Donor links to member | Not Started | |
| Export donor list | Available if scoped | Not Started | |
| Empty state | Specific no-donor message | Not Started | |

## 19. Admin Login Trace

| Login Requirement | Expected Result | Status | Notes |
|---|---|---|---|
| Mobile number step | 10-digit phone input | Not Started | |
| 4-digit PIN step | Same PIN language as member login | Not Started | |
| No OTP wording | Does not say SMS OTP unless changed later | Not Started | |
| Official logo | Logo shown cleanly | Not Started | |
| `SSF` font rule | Cooper Black only for `SSF` | Not Started | |
| Error handling | Invalid PIN shown clearly | Not Started | |
| Loading state | Button/loading state present | Not Started | |

## 20. Feature Coverage Trace

| Existing/New Feature | Admin Must Account For It | Status | Notes |
|---|---|---|---|
| Blood donors | Admin can view/edit donor data | Not Started | |
| Cash handovers | Admin can track receiver/collector | Not Started | |
| Payments separation | Monthly dues and events separated | Not Started | |
| UPI payments | Ledger/report support | Not Started | |
| QR Code payments | Ledger/report support | Not Started | |
| Monthly arrears | Multiple months selectable | Not Started | |
| Base/Premium tiers | Tier stored and visible | Not Started | |
| Custom event amount | Minimum validation | Not Started | |
| Event receipts | Amber/special event metadata | Not Started | |
| Cash collected by | Receipt and ledger metadata | Not Started | |
| Support contact management | Admin settings controls member drawer | Not Started | |
| Admin PIN system | 4-digit PIN workflows | Not Started | |
| Biometric setting | Member profile setting acknowledged | Not Started | |
| Notification bell | Admin topbar includes it | Not Started | |
| Circular profile menu | Admin profile menu matches style | Not Started | |
| Community Action Icon | Global action icon style preserved | Not Started | |

## 21. Mobile QA Trace

| Mobile Check | Expected Result | Status | Notes |
|---|---|---|---|
| 320px width | No horizontal overflow | Not Started | |
| Header | Logo/title/actions do not overlap | Not Started | |
| Drawer nav | Opens/closes smoothly | Not Started | |
| Cards | Text fits inside cards | Not Started | |
| Tables | Converted to mobile cards | Not Started | |
| Forms | Inputs readable and tappable | Not Started | |
| Sticky footer | Does not cover fields/errors | Not Started | |
| Modals | Fit viewport or become sheet | Not Started | |
| Filter sheets | Touch-friendly and not hidden by OS bar | Not Started | |
| Toasts | Do not cover bottom navigation/actions | Not Started | |

## 22. Desktop QA Trace

| Desktop Check | Expected Result | Status | Notes |
|---|---|---|---|
| Sidebar | Persistent and aligned | Not Started | |
| Topbar | Clean, dense, not crowded | Not Started | |
| Tables | Sticky headers and readable columns | Not Started | |
| Amount columns | Right aligned | Not Started | |
| Filter bars | Controls align cleanly | Not Started | |
| Charts | Below stats, not competing | Not Started | |
| Detail pages | Side panels/tabs used effectively | Not Started | |
| Hover states | Subtle and premium | Not Started | |
| Wide screens | Content does not stretch awkwardly | Not Started | |

## 23. State QA Trace

| State | Every Admin Page Must Have | Status | Notes |
|---|---|---|---|
| Loading | Skeletons match final layout | Not Started | |
| Empty | Purpose-specific empty message | Not Started | |
| Error | Calm retry/recovery path | Not Started | |
| Partial data | Available sections remain visible | Not Started | |
| No filter results | Reset filters action | Not Started | |
| Success | Toast or visible saved state | Not Started | |
| Destructive confirm | Confirmation modal/dialog | Not Started | |

## 24. Accessibility Trace

| Accessibility Check | Expected Result | Status | Notes |
|---|---|---|---|
| Icon labels | Icon-only buttons have accessible names | Not Started | |
| Keyboard nav | Forms, menus, filters usable by keyboard | Not Started | |
| Focus rings | Visible blue focus state | Not Started | |
| Dialog focus | Modals/drawers trap and restore focus | Not Started | |
| Table headers | Semantic headers | Not Started | |
| Form labels | Labels and error associations | Not Started | |
| Color use | Status not color-only | Not Started | |
| Reduced motion | Motion can be reduced | Not Started | |

## 25. Final Approval Checklist

| Final Item | Requirement | Status | Notes |
|---|---|---|---|
| Admin visual match | Looks like member-side premium UI | Not Started | |
| All routes covered | No missing Phase 3/4 route | Not Started | |
| All features covered | No missed progress-log feature | Not Started | |
| Mobile checked | 320px and common mobile widths | Not Started | |
| Desktop checked | Tablet, desktop, wide desktop | Not Started | |
| Receipts linked | Receipt paths preserved | Not Started | |
| Audit coverage | Critical changes traceable | Not Started | |
| Settings complete | Support, payments, admins, events covered | Not Started | |
| Product owner review | Final approval received | Not Started | |

## 26. Manual Trace Notes

Use this space while reviewing builds.

| Date | Page/Feature | Observation | Action Needed | Owner | Status |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |


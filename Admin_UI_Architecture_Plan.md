# Admin UI Architecture Plan

## 1. Purpose And Authority

This document is the unified Phase 3 and Phase 4 implementation plan for the Admin Panel. It combines frontend architecture, route structure, data shapes, component dependencies, and UI/UX layout rules for every admin surface.

This plan must be read with:

1. `PROGRESS_LOG.md`
2. `UI_PLAN_V2.md`
3. `Architecture_Plan.md`
4. Current member UI implementations, especially `MemberHeader.tsx` and `InlineLoginForm.tsx`

Authority order for implementation:

1. Product owner latest instruction
2. `Admin_UI_Architecture_Plan.md`
3. `UI_PLAN_V2.md`
4. `Architecture_Plan.md`
5. Current codebase implementation

The admin panel must not become a separate visual product. It must look and behave like the same premium SSF Alparamba system already implemented for members.

## 2. Non-Negotiable UI Inheritance Rules

### 2.1 Shared Visual Language

Admin must inherit the exact member-side visual style:

- Background: `#F6F8FC` as the primary app shell background.
- Surfaces: white and slate-tinted surfaces using `#FFFFFF`, `#F8FAFC`, and `#F1F5F9`.
- Borders: light hairline borders using `#E2E8F0` or `#E5EAF3`.
- Text: slate hierarchy with primary `#0F172A`, secondary `#475569`, muted `#64748B`.
- Primary actions: `#2563EB`.
- Success/verified states: `#16A34A`.
- Warning/event accents: ceremonial amber/gold only where meaningful.
- Error/destructive/overdue states: `#DC2626`.
- Motion: restrained `framer-motion` transitions, 150-300ms, spring only for menus/drawers where already established.
- Icons: `lucide-react` only.
- Density: compact and operational, but still premium.

### 2.2 Community Action Icon Style

All standalone global action icons in admin must use the same "Community Action Icon" style standardized in the member UI.

Required class pattern:

- `rounded-full` pill/circle shape.
- `bg-[#F8FAFC]` or `bg-slate-50`.
- `border border-[#E2E8F0]`.
- Soft premium shadow: `shadow-[0_4px_12px_rgba(15,23,42,0.08)]`.
- Slate icon color by default.
- Hover: subtle lift or scale, including `scale-105` where practical.
- Transition: smooth 150-220ms.
- Minimum touch target: 44x44px.
- Accessible label required for icon-only buttons.

Use this style for:

- Notification bell.
- Sidebar collapse button.
- Search button on mobile.
- Drawer close buttons.
- Modal close buttons.
- Download/export icon buttons.
- Receipt view/download actions.
- Row action menu trigger.
- Filter clear buttons when icon-only.
- Admin profile/avatar menu trigger where applicable.

Do not introduce square icon buttons, heavy filled icon buttons, or mismatched circular styles.

### 2.3 Typography Rules

The strict `SSF` brand rule applies to admin:

- Cooper Black may be used only for the exact text `SSF`.
- Unit names such as `Alparamba Unit` must use the normal UI font.
- Admin page titles, table headings, cards, buttons, labels, charts, reports, settings, and analytics numbers must never use Cooper Black.
- Financial values, counts, dates, IDs, receipt numbers, phone numbers, and PIN values must use tabular numerals.
- Letter spacing must remain 0 except rare all-caps metadata labels.

Header lockup example:

- `SSF` in `.font-cooper`.
- `Alparamba Unit` in standard bold slate UI type.

### 2.4 Glassmorphism And Premium Interaction

Admin overlays should inherit the member-side premium feel:

- Use glass only for overlays, menus, floating drawers, and elevated panels.
- Use white surfaces with `backdrop-blur-3xl` only when the layer is actually floating.
- Use `AnimatePresence` and `motion` for dropdowns, drawers, confirmations, and stateful panels.
- Avoid decorative glass panels inside data-heavy tables.
- Keep operational data crisp and readable.

The circular reveal profile menu pattern from the member header may be reused for admin profile/account menus.

## 3. Admin Product Scope

The admin panel covers Phase 3 and Phase 4.

### Phase 3: Admin Core

1. Admin layout and navigation.
2. Admin dashboard.
3. Members list.
4. Member detail.
5. Manual cash entry.
6. Basic payments ledger.
7. Support contacts management.

### Phase 4: Advanced Admin

1. Defaulters and follow-up workflows.
2. Full payments ledger with separation by dues, special events, UPI, QR, and cash handover.
3. Reports and exports.
4. Audit log.
5. Settings.
6. Admin user and role management.
7. Payment configuration.
8. Event configuration.
9. Blood donor administration.
10. PIN/access management.

## 4. Route Architecture

### 4.1 Route Map

| Route | Access | Phase | Purpose |
|---|---|---:|---|
| `/admin` | Admin | 3 | Redirect to `/admin/dashboard` |
| `/admin/login` | Public/admin | 3 | Admin PIN/login entry if separate admin auth is required |
| `/admin/dashboard` | Admin | 3 | Collection overview, risk summary, quick actions |
| `/admin/members` | Admin | 3 | Search, filter, add, edit, and manage members |
| `/admin/members/new` | Admin | 3 | Add new member |
| `/admin/members/[id]` | Admin | 3 | Member profile, dues, payments, family, donor info, notes |
| `/admin/members/[id]/edit` | Admin | 3 | Full edit screen or drawer route fallback |
| `/admin/cash-entry` | Admin | 3 | Record cash handover/manual payment |
| `/admin/payments` | Admin | 3/4 | Unified ledger across dues, special events, UPI, QR, and cash |
| `/admin/payments/[id]` | Admin | 4 | Payment detail, verification, receipt, audit trail |
| `/admin/defaulters` | Admin | 4 | Current and severe defaulters with follow-up tools |
| `/admin/reports` | Admin | 4 | Collection, event, dues, donor, and defaulter reports |
| `/admin/reports/[type]` | Admin | 4 | Deep report view for print/export |
| `/admin/audit-log` | Admin | 4 | Complete admin/system activity log |
| `/admin/settings` | Admin | 4 | Unit, payment, receipt, member, support, and event settings |
| `/admin/settings/support-contacts` | Admin | 4 | Add/edit/delete profile support contacts |
| `/admin/settings/admins` | Admin | 4 | Admin users, roles, permissions, PIN issuing |
| `/admin/settings/events` | Admin | 4 | Special event definitions and active donation campaigns |
| `/admin/settings/payments` | Admin | 4 | UPI, QR, monthly dues, tiers, receipt settings |
| `/admin/blood-donors` | Admin | 4 | Blood donor directory and availability management |

### 4.2 Route Behavior

- `/admin` must redirect to `/admin/dashboard`.
- Admin routes must live under `src/app/admin`.
- Admin shell must use `src/app/admin/layout.tsx`.
- Deep admin pages should use breadcrumbs only when the route is more than one level deep.
- Modal/drawer interactions may remain in-page first; route-backed pages are required for direct access, refresh safety, and future permissions.
- Public receipt routes remain public or token-gated as already planned. Admin should link to `/receipt/[id]` for member-visible receipt views and to `/admin/payments/[id]` for internal payment detail.

## 5. Folder And Component Architecture

### 5.1 Recommended Folders

```txt
src/app/admin/
  layout.tsx
  page.tsx
  login/page.tsx
  dashboard/page.tsx
  members/page.tsx
  members/new/page.tsx
  members/[id]/page.tsx
  members/[id]/edit/page.tsx
  cash-entry/page.tsx
  payments/page.tsx
  payments/[id]/page.tsx
  defaulters/page.tsx
  reports/page.tsx
  reports/[type]/page.tsx
  audit-log/page.tsx
  blood-donors/page.tsx
  settings/page.tsx
  settings/support-contacts/page.tsx
  settings/admins/page.tsx
  settings/events/page.tsx
  settings/payments/page.tsx

src/components/admin/
  layout/
  dashboard/
  members/
  payments/
  cash-entry/
  defaulters/
  reports/
  audit/
  settings/
  blood-donors/

src/lib/admin/
  mock-data.ts
  admin-types.ts
  admin-formatters.ts
  admin-permissions.ts
```

### 5.2 Admin Layout Components

- `AdminLayoutShell`
- `AdminSidebar`
- `AdminTopbar`
- `AdminMobileDrawer`
- `AdminProfileMenu`
- `AdminBreadcrumbs`
- `AdminPageHeader`
- `AdminActionIcon`
- `AdminSearchCommand`
- `AdminNotificationMenu`

### 5.3 Shared UI Components To Reuse

Reuse or extend existing primitives instead of creating a new design language:

- `Button`
- `Card`
- `Input`
- `Label`
- `Badge`
- Member-style action icon class pattern
- Member-style dropdown/menu motion
- Member-style glass overlay treatment
- `sonner` toasts
- `framer-motion`
- `lucide-react`

Add only where needed:

- `Textarea`
- `Select` or custom dropdown matching the cash handover dropdown polish
- `Drawer`
- `Modal`
- `Skeleton`
- `EmptyState`
- `DataTable`
- `FilterBar`
- `AmountText`
- `StatusBadge`
- `ConfirmDialog`
- `DateRangePicker`
- `Tabs` or segmented control

## 6. Admin Layout Specification

### 6.1 Desktop Layout

Use a persistent operational shell:

- Left sidebar width: 260px expanded, 76px collapsed.
- Topbar height: 64px, matching member header density.
- Main background: `#F6F8FC`.
- Main content padding: 24-32px.
- Content max width: 1440px, except wide ledgers may use full available width.
- Sidebar uses white or slightly translucent white surface with right border.
- Topbar uses `bg-[#F6F8FC]` with bottom border `#E5EAF3`, matching `MemberHeader`.

Topbar content:

- Left: current page title or breadcrumb on deep pages.
- Center: optional global search on desktop.
- Right: notification icon, quick action icon, admin name/role, avatar menu.

Sidebar order:

1. Dashboard
2. Members
3. Cash Entry
4. Payments
5. Defaulters
6. Reports
7. Blood Donors
8. Audit Log
9. Settings

Active nav:

- Text/icon `#2563EB`.
- White or slate-50 rounded-full/pill background.
- Light border only if needed.
- No heavy filled blue blocks.

### 6.2 Mobile Layout

Admin remains mobile-first:

- Sticky topbar with logo, page title, notification, and menu icon.
- Sidebar becomes a full-height drawer.
- Drawer uses glassy white elevated surface and `framer-motion`.
- Tables become cards.
- Filters become bottom sheets or compact floating panels.
- Primary task actions remain reachable near the page header and in sticky footers for long forms.

Mobile topbar:

- Left: `SSF` lockup and/or page context.
- Right: notification action icon and menu action icon.
- Height: 64px.
- Padding: 16px.

### 6.3 Admin Header Branding

Admin topbar/sidebars must use the same brand lockup style as member:

- Logo image: `/logo/logo.webp`.
- `mix-blend-multiply` and contrast polish may be reused.
- `SSF` uses `.font-cooper`.
- `Alparamba Unit` uses standard UI font.
- Admin-specific labels like "Admin Panel" must not use Cooper Black.

## 7. Data Model Architecture

The admin UI may start with mock data, but the structures must be backend-ready.

### 7.1 Member

```ts
type MemberStatus = "active" | "inactive" | "blocked" | "left";
type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

interface Member {
  id: string;
  memberId: string;
  name: string;
  phone: string;
  alternatePhone?: string;
  age?: number;
  bloodGroup?: BloodGroup;
  isBloodDonor: boolean;
  donorAvailable: boolean;
  address?: string;
  area?: string;
  occupation?: string;
  familyCount?: number;
  status: MemberStatus;
  monthlyTier: "base" | "premium" | "custom";
  monthlyAmount: number;
  pinStatus: "not_issued" | "issued" | "reset_required";
  joinedAt?: string;
  lastPaidAt?: string;
  createdAt: string;
  updatedAt: string;
}
```

### 7.2 Family Member

```ts
interface FamilyMember {
  id: string;
  memberId: string;
  name: string;
  relationship: string;
  age?: number;
  bloodGroup?: BloodGroup;
  isBloodDonor?: boolean;
  phone?: string;
}
```

### 7.3 Payment

Payments must separate monthly dues and special events while still appearing in one ledger.

```ts
type PaymentCategory = "monthly_dues" | "special_event";
type PaymentMethod = "upi" | "qr_code" | "cash_handover" | "admin_cash_entry";
type PaymentStatus = "pending" | "confirmed" | "failed" | "refunded" | "cancelled";

interface Payment {
  id: string;
  receiptId: string;
  memberId?: string;
  payerName?: string;
  payerPhone: string;
  category: PaymentCategory;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  months?: string[];
  tier?: "base" | "premium" | "custom";
  eventId?: string;
  eventName?: string;
  collectedByAdminId?: string;
  collectedByAdminName?: string;
  recordedByAdminId?: string;
  verifiedByAdminId?: string;
  referenceId?: string;
  notes?: string;
  paidAt: string;
  recordedAt: string;
  verifiedAt?: string;
}
```

### 7.4 Cash Handover

Cash handover must preserve who received the cash and who recorded/verified it.

```ts
interface CashHandover {
  id: string;
  paymentId: string;
  memberId?: string;
  payerPhone: string;
  amount: number;
  category: PaymentCategory;
  months?: string[];
  eventId?: string;
  receivedByAdminId: string;
  receivedByAdminName: string;
  recordedByAdminId?: string;
  status: "received" | "recorded" | "verified" | "disputed";
  receivedAt: string;
  recordedAt?: string;
  verifiedAt?: string;
  notes?: string;
}
```

### 7.5 Special Event

```ts
interface SpecialEvent {
  id: string;
  name: string;
  description?: string;
  suggestedAmount?: number;
  minimumAmount: number;
  isActive: boolean;
  receiptTheme: "amber" | "default";
  startsAt?: string;
  endsAt?: string;
  createdAt: string;
}
```

### 7.6 Support Contact

Support contacts power the member profile Contact Admins drawer.

```ts
interface SupportContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  whatsappEnabled: boolean;
  isPrimary: boolean;
  sortOrder: number;
  isActive: boolean;
  updatedAt: string;
}
```

### 7.7 Admin User

```ts
type AdminRole = "president" | "secretary" | "treasurer" | "collector" | "viewer";

interface AdminUser {
  id: string;
  name: string;
  role: AdminRole;
  phone: string;
  avatarInitials: string;
  canReceiveCash: boolean;
  canVerifyPayments: boolean;
  canManageMembers: boolean;
  canManageSettings: boolean;
  status: "active" | "inactive";
  lastLoginAt?: string;
}
```

### 7.8 Audit Log

```ts
interface AuditLogEntry {
  id: string;
  actorAdminId: string;
  actorName: string;
  action: string;
  entityType: "member" | "payment" | "cash_handover" | "event" | "support_contact" | "admin_user" | "settings";
  entityId: string;
  summary: string;
  before?: unknown;
  after?: unknown;
  createdAt: string;
}
```

## 8. Page Specifications

### 8.1 Admin Dashboard

Route: `/admin/dashboard`

Primary job: show current collection health and provide fast access to the most common admin actions.

First viewport content:

- Page title: "Dashboard"
- Date/month selector
- Quick actions:
  - Add Member
  - Record Cash
  - View Defaulters
  - Export Report
- Stat cards:
  - Total Collected
  - Monthly Dues Collected
  - Special Event Contributions
  - Pending Amount
  - Paid Members
  - Defaulters
  - Cash Handovers Pending Verification
  - Blood Donors Available

Main sections:

- Collection trend chart.
- Monthly dues vs special event split.
- Payment method split: UPI, QR Code, Cash Handover, Admin Cash Entry.
- Recent payments.
- Recent cash handovers.
- Admin activity preview.
- Defaulter risk preview.

UI rules:

- Stats use tabular numerals.
- Metric dominates card.
- Icons must be lucide and semantic.
- No oversized hero panels.
- Desktop: 4 stat cards per row.
- Tablet: 2 columns.
- Mobile: 1 column.
- Quick action icons use Community Action Icon style when standalone.

States:

- Loading: skeleton stat cards and chart blocks.
- Empty: show "No payments recorded for this period" with Record Cash action.
- Partial: available stats remain visible; unavailable widgets show quiet partial state.
- Error: retry action and no destructive visual panic.

### 8.2 Members List

Route: `/admin/members`

Primary job: find, add, edit, and understand member payment/donor status quickly.

Controls:

- Search by name, phone, member ID, area.
- Filters:
  - Status
  - Payment status
  - Blood group
  - Donor availability
  - Monthly tier
  - Area
  - PIN status
- Sort:
  - Name
  - Last paid
  - Due amount
  - Created date
- Actions:
  - Add Member
  - Export Members
  - Bulk PIN issue/reset
  - Bulk reminder list export

Desktop table columns:

1. Member
2. Phone
3. Area
4. Blood Group
5. Donor
6. Monthly Tier
7. Due Amount
8. Last Paid
9. Status
10. Actions

Mobile card layout:

- Top: name, status badge.
- Second: phone, area.
- Third: due amount, last paid.
- Footer: blood group pill, donor state, action menu.

Required row actions:

- View details.
- Edit member.
- Record payment.
- Reset PIN.
- Open receipt history.
- Mark donor availability.
- Deactivate member.

UI rules:

- Blood group badge uses sleek pill style: `rounded-full bg-red-50 text-red-600`.
- Due amount uses red only for unpaid/overdue amount and status.
- Action menu trigger uses Community Action Icon style.
- Avoid showing exact sensitive financial history in crowded mobile cards; use detail page for full context.

### 8.3 Add/Edit Member

Routes:

- `/admin/members/new`
- `/admin/members/[id]/edit`

May also be implemented as a drawer from the list, but route pages must exist for direct access.

Form groups:

1. Basic Details
   - Name
   - Phone
   - Alternate phone
   - Age
   - Address
   - Area
   - Occupation
2. Membership
   - Member ID
   - Status
   - Monthly tier
   - Monthly amount
   - Joined date
3. Blood Donor
   - Blood group
   - Is blood donor
   - Available now
4. Family
   - Family members list
   - Add/edit/remove family member
5. Access
   - Issue 4-digit PIN
   - Reset PIN
   - Mark reset required
6. Admin Notes
   - Internal note

Validation:

- Phone must be 10 digits.
- Monthly amount cannot be below configured minimum.
- Blood group must be one of 8 allowed values.
- PIN must be 4 digits if manually set.
- Required fields must validate on blur and submit.

UI rules:

- Use sticky footer for Save/Cancel on long forms.
- Use blue primary button.
- Destructive actions must be separate and require confirmation.
- Inputs match `InlineLoginForm` non-glass field treatment where applicable.

### 8.4 Member Detail

Route: `/admin/members/[id]`

Primary job: give admin a complete operational view of one member.

Header:

- Member name.
- Member ID.
- Status badge.
- Phone.
- Quick actions:
  - Edit
  - Record Payment
  - Reset PIN
  - Call/WhatsApp if supported

Sections:

- Profile summary.
- Payment status.
- Due months.
- Monthly tier.
- Total paid.
- Recent payments.
- Receipt list.
- Cash handover history.
- Special event contributions.
- Blood donor profile.
- Family members.
- Admin notes.
- Audit trail for this member.

Layout:

- Desktop: summary side panel + main tabbed content.
- Tablet: stacked panels.
- Mobile: summary card followed by tabs/sections.

Tabs:

- Overview
- Payments
- Dues
- Family
- Donor
- Notes
- Audit

### 8.5 Cash Entry

Route: `/admin/cash-entry`

Primary job: record cash safely, transparently, and with receipt continuity.

Modes:

1. Monthly dues
2. Special event

Required fields:

- Member search or phone number.
- Payer name when member is not found.
- Payment category.
- Months selected for monthly dues.
- Base/Premium/Custom tier information.
- Event selection for special events.
- Amount.
- Received by admin.
- Recorded by admin.
- Notes.

Specific cash handover requirements:

- The receiving admin list must match the public cash handover selection concept.
- Include admin role labels, including President where applicable.
- Cash records must show "Collected By" on receipts.
- Admin-entered cash must be distinguishable from member-selected cash handover.

Flow:

1. Search/select member.
2. Select category.
3. Enter/select amount and period/event.
4. Select received-by admin.
5. Review confirmation modal.
6. Save payment.
7. Show success toast and receipt link.

UI rules:

- Use custom premium dropdown, not raw browser select, for admin/member selection.
- Long form uses sticky action footer.
- Confirmation modal uses glass/elevated overlay.
- Success state includes View Receipt and Record Another.

Validation:

- Amount must be positive and meet configured minimum.
- Monthly dues require at least one month.
- Special event requires event or event name.
- Cash must have receiving admin.

### 8.6 Payments Ledger

Route: `/admin/payments`

Primary job: audit and manage all money movement in one place.

Top controls:

- Search receipt ID, phone, member, reference ID.
- Date range.
- Category: All, Monthly Dues, Special Events.
- Method: All, UPI, QR Code, Cash Handover, Admin Cash Entry.
- Status: Pending, Confirmed, Failed, Refunded, Cancelled.
- Collected by admin.
- Recorded by admin.
- Export.

Desktop columns:

1. Date
2. Receipt ID
3. Member/Payer
4. Category
5. Method
6. Period/Event
7. Amount
8. Status
9. Collected By
10. Recorded By
11. Actions

Mobile card:

- Receipt ID and status.
- Member/payer and phone.
- Amount.
- Category/method pills.
- Date.
- Collected by.
- View detail action.

Payment detail:

- Internal route `/admin/payments/[id]`.
- Public receipt link `/receipt/[id]`.
- Verification metadata.
- Audit trail.
- Notes.
- Refund/cancel action if future backend supports it.

UI rules:

- Category pills must clearly separate Monthly Dues and Special Event.
- Special event rows use restrained amber accent, not full amber cards.
- Amounts right-aligned in desktop tables.
- Export icon uses Community Action Icon style when icon-only.

### 8.7 Defaulters

Route: `/admin/defaulters`

Primary job: identify who needs follow-up without creating a punitive experience.

Sections:

- Current month unpaid.
- Severe defaulters.
- Recently resolved.
- Follow-up queue.

Controls:

- Month selector.
- Severity filter.
- Area filter.
- Member status.
- Minimum unpaid amount.
- Sort by amount, months overdue, name, area.

Data:

- Member.
- Phone.
- Area.
- Due months.
- Due amount.
- Last paid.
- Severity.
- Follow-up status.
- Assigned admin.

Actions:

- Record payment.
- View member.
- Mark contacted.
- Export follow-up list.
- Copy phone list.
- Send reminder placeholder for future WhatsApp automation.

UI rules:

- Red is used only for severity labels and overdue values.
- Do not flood the page with red backgrounds.
- Empty state must feel positive: "No defaulters for this period."

### 8.8 Reports

Route: `/admin/reports`

Primary job: generate reliable, export-ready summaries.

Report types:

- Monthly collection summary.
- Dues collection report.
- Special events report.
- Payment method split.
- Cash handover report.
- Defaulters report.
- Member status report.
- Blood donor report.
- Admin activity report.

Controls:

- Date range.
- Month.
- Category.
- Payment method.
- Admin.
- Area.
- Export PDF/CSV.

Report cards:

- Collected.
- Pending.
- Collection rate.
- Paid members.
- Defaulters.
- Event contributions.
- Cash total.

Charts:

- Collection trend.
- Category split.
- Payment method split.
- Defaulter trend.

Export requirements:

- Organization name.
- Unit name.
- Report title.
- Date range.
- Generated date.
- Generated by.
- Totals.
- Filters applied.
- Clear table headings.

UI rules:

- Charts appear after summary stats.
- Exported charts must not depend on hover-only information.
- Use tabular numerals.

### 8.9 Audit Log

Route: `/admin/audit-log`

Primary job: provide traceability for trust and accountability.

Controls:

- Search actor/action/entity.
- Date range.
- Actor.
- Entity type.
- Action type.

Columns:

1. Time
2. Actor
3. Action
4. Entity
5. Summary
6. Actions

Detail drawer:

- Actor.
- Timestamp.
- Entity.
- Before values.
- After values.
- Related route.

UI rules:

- Audit rows are dense.
- Use drawer for details.
- Do not use dramatic colors except failed/security-related events.

### 8.10 Settings

Route: `/admin/settings`

Primary job: configure the product without developer involvement.

Settings sections:

1. Unit Profile
   - Unit name
   - Logo reference
   - Address
   - Contact phone
2. Payment Settings
   - UPI ID
   - QR code configuration
   - Monthly base amount
   - Monthly premium amount
   - Custom amount minimum
   - Receipt prefix
3. Special Events
   - Active event list
   - Minimum event contribution
   - Event receipt label
4. Support Contacts
   - Name
   - Role
   - Phone
   - Sort order
   - Active state
5. Admin Users
   - Name
   - Role
   - Phone
   - Can receive cash
   - Permissions
6. Member Access
   - PIN issuing rules
   - PIN reset workflow
   - Biometric login copy/settings placeholder
7. Receipt Settings
   - Receipt titles
   - Public receipt visibility
   - Cash handover labels
   - Event receipt amber theme

UI rules:

- Settings groups are flat cards, not nested cards.
- Save actions are specific: "Save Payment Settings", "Add Support Contact".
- Field-level loading preferred over full-page loading.
- Destructive actions require confirmation.

### 8.11 Support Contacts Management

Route: `/admin/settings/support-contacts`

Primary job: manage the list used by the member profile Contact Admins drawer.

Required features:

- Add support contact.
- Edit support contact.
- Delete/deactivate support contact.
- Reorder contacts.
- Mark primary.
- Enable/disable WhatsApp.

Fields:

- Name.
- Role.
- Phone.
- WhatsApp enabled.
- Primary.
- Active.

Member-side dependency:

- `ContactAdminsDrawer` must eventually consume this configured list.
- Admin changes must preserve a clear active/inactive distinction.

### 8.12 Blood Donors

Route: `/admin/blood-donors`

Primary job: manage blood donor data introduced in the member community directory.

Controls:

- Blood group filter with 8 groups.
- Availability filter.
- Area filter.
- Search name/phone.

Data:

- Member name.
- Phone.
- Blood group.
- Area.
- Availability.
- Last updated.

Actions:

- Mark available/unavailable.
- Edit member donor details.
- Open member detail.
- Export donor list.

UI rules:

- Blood group pills match member directory style.
- Use red healthcare accent carefully.
- Empty state for a blood group must say no donors are currently listed for that group.

### 8.13 Admin Login

Route: `/admin/login`

Primary job: secure admin entry while matching the current PIN login language.

Rules:

- Reuse the same PIN language shift from `InlineLoginForm`.
- Use mobile number + 4-digit PIN.
- Admin-specific copy may say "Admin PIN".
- Use official logo.
- `SSF` brand typography rule applies.
- OTP wording should not return unless product owner explicitly requests SMS OTP again.

## 9. Navigation And Permissions

### 9.1 Roles

Supported roles:

- President
- Secretary
- Treasurer
- Collector
- Viewer

Permission groups:

- View dashboard.
- Manage members.
- Record cash.
- Verify payments.
- View payments.
- Export reports.
- Manage support contacts.
- Manage events.
- Manage payment settings.
- Manage admin users.
- View audit log.

### 9.2 Role Defaults

- President: all permissions.
- Secretary: members, reports, audit, support contacts.
- Treasurer: payments, cash entry, reports, verification.
- Collector: cash entry, members view, own cash records.
- Viewer: read-only dashboard/reports.

UI behavior:

- Hide actions the user cannot perform.
- Disabled actions need a tooltip or helper only when the action is visible for context.
- Permission-denied pages must be calm and specific.

## 10. Component Specifications

### 10.1 AdminPageHeader

Structure:

- Title.
- Subtitle/helper.
- Optional period/filter chip.
- Action cluster.

Rules:

- Title uses standard UI font.
- Action cluster wraps cleanly on mobile.
- Icon-only actions use Community Action Icon style.

### 10.2 StatsCard

Structure:

- Label.
- Metric.
- Helper/delta.
- Optional icon.

Rules:

- Metric uses tabular numerals.
- No Cooper Black.
- Color represents status only.
- Skeleton state preserves height.

### 10.3 DataTable

Required:

- Sticky header on desktop.
- Mobile card fallback.
- Sort indicators.
- Empty state.
- Loading skeleton rows.
- Filter no-results state.
- Accessible headers.

Rows:

- Ledger: 44-48px.
- Members: 52-64px.
- Audit: 44-48px.

### 10.4 FilterBar

Rules:

- Desktop: horizontal controls.
- Mobile: compact row with search and filter action icon.
- Active filters appear as removable pills.
- Clear filter icon uses Community Action Icon style when icon-only.

### 10.5 Drawers

Use for:

- Member quick view.
- Audit details.
- Payment details preview.
- Filter panels.
- Edit support contact.

Rules:

- Desktop width: 420-560px.
- Mobile: full-width or floating card bottom sheet.
- Close icon uses Community Action Icon style.
- Focus is trapped.
- Escape closes.

### 10.6 Modals

Use for:

- Payment confirmation.
- Delete/deactivate confirmation.
- PIN reset confirmation.
- Export options.

Rules:

- Elevated white/glass card.
- Backdrop blur.
- Primary action bottom-right desktop, full-width mobile.
- Destructive actions red and explicit.

### 10.7 Badges

Required variants:

- Paid
- Pending
- Overdue
- Failed
- Verified
- Cash
- UPI
- QR
- Special Event
- Monthly Dues
- Admin
- Member
- Blood Donor
- Available
- Inactive

Rules:

- Soft background with strong readable text.
- Avoid saturated filled badges except rare critical states.

## 11. Workflow Requirements

### 11.1 Record Monthly Dues

1. Admin opens Cash Entry or member detail.
2. Selects member.
3. Chooses Monthly Dues.
4. Selects pending months.
5. Confirms tier/amount.
6. Selects collected-by admin.
7. Saves.
8. Receipt is generated with Monthly Dues labels.
9. Ledger and member detail update.
10. Audit log records the action.

### 11.2 Record Special Event Contribution

1. Admin opens Cash Entry.
2. Selects member or enters guest phone/name.
3. Chooses Special Event.
4. Selects event.
5. Enters amount with minimum validation.
6. Selects collected-by admin.
7. Saves.
8. Receipt uses Special Event differentiation and amber theme.
9. Ledger shows category separately.
10. Report totals update.

### 11.3 Verify Cash Handover

1. Admin opens dashboard pending handovers or payments ledger.
2. Reviews payer, amount, period/event, and collected-by admin.
3. Confirms or marks disputed.
4. Verification metadata is added.
5. Audit log records verification.

### 11.4 Manage Support Contacts

1. Admin opens Support Contacts settings.
2. Adds or edits contact.
3. Saves.
4. Member profile Contact Admins drawer receives active contacts.
5. Audit log records change.

### 11.5 Manage Blood Donors

1. Admin opens Blood Donors page or member detail.
2. Filters by group/area/availability.
3. Updates donor status.
4. Community directory filters reflect the change.
5. Audit log records donor data update.

### 11.6 Reset Member PIN

1. Admin opens member detail.
2. Selects Reset PIN.
3. Confirms action.
4. System generates or accepts a 4-digit PIN.
5. Admin shares PIN manually outside the app for now.
6. Member login uses updated PIN.
7. Audit log records reset.

## 12. Responsive Rules

### Mobile 320-767px

- Single-column layout.
- Page gutter: 16px.
- Header height: 64px.
- Cards: 16px padding.
- Tables become cards.
- Filters become drawers/bottom sheets.
- Primary form actions use sticky footer.
- No text overlap at 320px.
- Touch targets minimum 44x44px.

### Tablet 768-1023px

- Stats use 2-column grid.
- Sidebar may be collapsible rail or drawer.
- Tables may remain tabular if readable.
- Forms may use 2 columns for short paired fields.

### Desktop 1024-1439px

- Persistent sidebar.
- 12-column grid.
- Stats use 4-column grid.
- Tables use sticky headers.
- Detail pages may use side panels.

### Large Desktop 1440px+

- Max content width 1440px.
- Use extra width for tables, filters, and side activity panels.
- Do not scale typography larger just because width is available.

## 13. Empty, Loading, Error, And Partial States

Every admin route must define:

- Loading state.
- Empty state.
- Error state.
- Partial data state.
- No-results-after-filter state.

Required examples:

- Dashboard empty: "No payments recorded for this period."
- Members no result: preserve filters and offer reset.
- Ledger empty: clarify whether no payments exist or filters exclude them.
- Defaulters empty: positive state confirming no current defaulters.
- Blood donors empty: "No available donors found for this blood group."
- Audit log empty: show unavailable/system message, since true empty should be rare.
- Settings partial: show saved values and mark unavailable sections.

## 14. Accessibility Requirements

- All icon-only buttons require accessible names.
- Custom dropdowns must support keyboard navigation.
- Modals/drawers must trap focus and restore focus.
- Focus ring must be visible and blue.
- Tables need semantic headers.
- Forms need labels, helper text, and error text associations.
- Amounts and status cannot rely on color alone.
- Malayalam text must remain legible where used.
- Reduced motion must be respected for `framer-motion` interactions.
- Toasts should not be the only record of critical state changes.

## 15. Formatting And Data Display

### 15.1 Amounts

- Compact: `INR 12,450` or project-approved rupee symbol format if the codebase already uses it.
- Detailed ledger: `INR 12,450.00` only if paise precision is present.
- Unknown: `--`.
- True zero: `INR 0`.
- Always tabular numerals.

### 15.2 Dates

- Tables: `05 Jul 2026`.
- Detail metadata: include time when relevant.
- Exports: include generated timestamp.

### 15.3 Phone Numbers

- Display consistently as 10-digit Indian mobile numbers or `+91` format where already used.
- Inputs must use numeric keyboard on mobile.

### 15.4 Receipt IDs

- Receipt IDs must be visually distinct and copyable.
- Use tabular numerals.
- Public receipt links must remain stable.

## 16. Feature Coverage Checklist

Admin implementation must account for all current product features:

- Member dashboard dues.
- Member payment history.
- Member profile details.
- Member edit profile fields.
- Community directory.
- Blood donor filter and blood group pills.
- Public payment separation between Monthly Dues and Special Events.
- Monthly arrears month selection.
- Base and Premium contribution tiers.
- Custom event amount with minimum amount.
- UPI payment.
- QR Code payment modal/terminal.
- Cash Handover with receiving admin.
- Receipt differentiation by payment method.
- Receipt differentiation by event category.
- Cash "Collected By" metadata.
- Dynamic support contact list for Contact Admins drawer.
- Admin-generated 4-digit PIN authentication.
- Biometric login setting placeholder in member profile.
- Notification bell.
- Circular reveal profile/account menus.
- Global Community Action Icon style.
- Official logo rendering and transparency handling.

No Phase 3 or Phase 4 admin screen is complete if it ignores any relevant item above.

## 17. Implementation Sequence

### Step 1: Admin Foundation

- Create `src/app/admin/layout.tsx`.
- Create redirect `src/app/admin/page.tsx`.
- Build `AdminLayoutShell`, `AdminSidebar`, `AdminTopbar`, and `AdminMobileDrawer`.
- Create shared `AdminActionIcon` or shared class utility for Community Action Icon style.
- Create admin mock data and types.

### Step 2: Dashboard

- Build `/admin/dashboard`.
- Add stat cards, quick actions, collection split, recent activity.
- Include cash handover pending verification and event contribution summaries.

### Step 3: Members

- Build `/admin/members`.
- Build member search, filters, table/card fallback.
- Build `/admin/members/[id]`.
- Build add/edit member flows.
- Include donor and PIN data.

### Step 4: Cash Entry

- Build `/admin/cash-entry`.
- Include monthly dues and special event tabs.
- Include admin recipient dropdown.
- Include receipt continuity.

### Step 5: Payments Ledger

- Build `/admin/payments`.
- Build category/method/status filters.
- Build `/admin/payments/[id]`.
- Include public receipt link and internal audit metadata.

### Step 6: Defaulters

- Build `/admin/defaulters`.
- Include current/severe segmentation.
- Include follow-up actions.

### Step 7: Settings And Support Contacts

- Build `/admin/settings`.
- Build `/admin/settings/support-contacts`.
- Build payment/event/admin user settings placeholders or full forms as scoped.

### Step 8: Reports, Audit, Blood Donors

- Build `/admin/reports`.
- Build `/admin/audit-log`.
- Build `/admin/blood-donors`.
- Add export-ready layouts and empty/error states.

## 18. Quality Gate Before Shipping Each Admin Screen

Before a screen is considered done:

- It visually matches the member-side premium style.
- `SSF` is the only Cooper Black text.
- All amounts, dates, IDs, and metrics use tabular numerals.
- Global action icons use Community Action Icon style.
- Lucide icons are used consistently.
- Mobile 320px layout has no overlap or broken text.
- Desktop layout is dense and scannable.
- Loading, empty, error, partial, and no-results states exist.
- Forms validate on blur and submit.
- Destructive actions require confirmation.
- Tables have mobile card fallbacks.
- Cash, UPI, QR, Monthly Dues, and Special Event distinctions are preserved.
- Receipts remain reachable.
- Audit-critical actions create audit entries in the data model.
- No new visual assets were added without approval.

## 19. Final Design Principle

The admin panel should feel like the command center for a serious community finance product: calm, fast, transparent, and trustworthy. It must give committee volunteers operational power without making the UI feel technical, heavy, or separate from the polished member experience already built.

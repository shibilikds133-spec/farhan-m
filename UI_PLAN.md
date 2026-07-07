# [SSF Alparamba] Digital Varisankhya Collection Portal
## Premium SaaS UI/UX Specification — v2.0 (Next-Level)

### 1. Product Vision
A trust-first community finance tool. Every screen should communicate transparency and accountability to members while giving non-technical committee volunteers admin superpowers with zero training curve. Benchmark feel: Stripe Dashboard × CRED × Linear, filtered through restrained, respectful cultural branding.

### 2. Design System (Tokens)
- **Color Tokens**:
  - Primary Background: `#FFFFFF`
  - Secondary Background: `#F8FAFC`
  - Text Primary: `#0F172A`
  - Accent Green (Success): `#16A34A`
  - Accent Blue (Primary Actions): `#2563EB`
  - Accent Gold: `#C8A96B` (ceremonial only)
  - Accent Red (Defaulters/Errors): `#DC2626`
- **Typography**: Inter (English) + Noto Sans Malayalam. Tabular-figure style for numerals.
- **Radius**: Cards 20px, Buttons 12px, Inputs 10px, Pills Full.
- **Shadows**: Soft only `0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.06)`.
- **Motion**: Subtle 150-300ms ease-outs. No gimmicky animations.
- **Cultural Identity**: Low-opacity geometric/arabesque patterns (3-5%) on hero and receipts. Bismillah/greeting respectfully sized.

### 3. Information Architecture
- **Public**: Landing/Home, Pay Now (guest), Payment Success, Receipt, Support.
- **Member**: Dashboard, History, Profile/Family, Notifications.
- **Admin**: Dashboard, Members, Payments Ledger, Cash Entry, Defaulters, Reports, Audit Log, Settings.

### 4. Implementation Phasing

**Phase 1: Foundation & Landing Page (The First Step)**
- Initialize Next.js (App Router), Tailwind CSS, ShadCN UI.
- Configure Design System tokens in `tailwind.config.ts` & `globals.css`.
- Setup fonts (Inter + Noto Sans Malayalam).
- Build the Public Landing Page (Hero, Stats strip, Call to Actions).

**Phase 2: Authentication & Member Flow**
- OTP Login Mock/Setup.
- Member Dashboard (Dues, History, Family members).
- Payment Page (UPI integration prep, Cash acknowledgment mode).
- Payment Success & Receipt generation.

**Phase 3: Admin Core Features**
- Admin Layout (Sidebar/Header with bilingual greeting).
- Admin Dashboard (Stats, Quick Actions).
- Members List & Detail View.
- Cash Entry Flow.

**Phase 4: Advanced Admin & Settings**
- Defaulters View (Severe vs Current Month).
- Payments Ledger & Audit Log.
- Reports & Exports.
- Settings Panel.

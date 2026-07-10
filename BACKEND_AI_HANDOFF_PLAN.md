# Backend AI Handoff Plan

This document is the compact continuation guide for moving this project work to another system, another workspace, or another AI agent. It records the current backend strategy, Codex/Gemini collaboration model, completed phases, strict rules, and next implementation direction.

## 1. Master Files To Read First

Every agent must read these files before doing backend work:

1. `Backend_Architecture_Supabase_Plan.md`
2. `BACKEND_PROGRESS.md`
3. `Architecture_Plan.md`
4. `UI_PLAN_V2.md`
5. `AGENTS.md`

`Backend_Architecture_Supabase_Plan.md` is the master backend law. It contains the Supabase backend architecture, schema/RLS direction, operational addendum, portability rules, and end-to-end data flow plan.

`BACKEND_PROGRESS.md` is the shared work ledger. Every backend task must be logged there after completion.

## 2. Non-Negotiable UI Protection Rule

Backend work must happen behind the existing UI.

Agents must not:

- Redesign the UI.
- Change layout, colors, spacing, typography, or icons.
- Change cards, tables, forms, or public/member/admin visual design.
- Change Malayalam text.
- Remove pages or routes.
- Change responsive behavior.
- Modify landing page visuals.

Allowed:

- Add backend-only files.
- Add adapters, services, contracts, DTOs, validation, and server-side wiring.
- Remove unused mock logic only when the replacement keeps the UI visually identical.

## 3. Core Backend Architecture

The backend must follow this strict pattern:

```txt
UI / Route Handler
↓
Service Layer
↓
Repository Interface
↓
Backend Adapter
↓
Supabase / API / Database
```

Frontend UI components must never call Supabase directly.

Supabase must be isolated inside adapter files only. This keeps the app portable and allows future migration to another backend, another Supabase project, S3/R2 storage, or custom APIs.

## 4. Current AI Collaboration Strategy

Current working model:

```txt
Codex  = Planner
Gemini = Implementer
Codex  = Reviewer
```

Workflow:

1. Codex prepares the technical planner document.
2. Gemini implements exactly from that planner.
3. Gemini updates `BACKEND_PROGRESS.md`.
4. Codex reviews implementation against checklist.
5. Next phase starts only after review.

Recommended conflict prevention:

- Split work by phase/module.
- Do not let two agents edit the same file at the same time.
- Always read `BACKEND_PROGRESS.md` before starting.
- Always write completed work to `BACKEND_PROGRESS.md`.
- Keep UI work and backend work clearly separated.

## 5. Completed Backend Phases

### Phase 1: Contracts, DTOs, and Error Types

Completed by Codex.

Created:

```txt
src/lib/backend/errors/errorCodes.ts
src/lib/backend/errors/BackendError.ts
src/lib/backend/contracts/common.contract.ts
src/lib/backend/contracts/member.contract.ts
src/lib/backend/contracts/payment.contract.ts
src/lib/backend/contracts/admin.contract.ts
src/lib/backend/dto/member.dto.ts
src/lib/backend/dto/payment.dto.ts
src/lib/backend/dto/admin.dto.ts
```

Purpose:

- Standard `BackendResult`.
- Standard backend errors.
- Actor context.
- DTOs.
- Repository interfaces.
- Service interfaces.

### Phase 2: Validation Schemas

Completed by Gemini and reviewed by Codex.

Created:

```txt
src/lib/backend/errors/createBackendError.ts
src/lib/backend/errors/resultHelpers.ts
src/lib/backend/validation/commonSchemas.ts
src/lib/backend/validation/memberSchemas.ts
src/lib/backend/validation/paymentSchemas.ts
src/lib/backend/validation/adminSchemas.ts
```

Important decision:

- Payment minimum amounts are configurable.
- Special event minimum amount is not hardcoded.
- Cash entry minimum amount is not hardcoded.
- Minimum amounts must be passed into validation from the service layer.

### Phase 3: Service Layer

Completed by Gemini and reviewed by Codex.

Created:

```txt
src/lib/backend/services/memberService.ts
src/lib/backend/services/paymentService.ts
src/lib/backend/services/adminAuthService.ts
src/lib/backend/services/adminMemberService.ts
src/lib/backend/services/adminPaymentService.ts
src/lib/backend/services/adminDashboardService.ts
src/lib/backend/services/auditService.ts
```

Purpose:

- Pure TypeScript business logic.
- Uses Phase 2 validation schemas.
- Uses Phase 1 repository interfaces.
- No Supabase imports.
- No Next.js imports.
- No UI imports.
- Uses Dependency Injection.

Payment service dependency rule:

```txt
getSpecialEventMinimumAmount(...)
getCashEntryMinimumAmount(...)
```

These values must come from injected dependencies, not hardcoded fallbacks.

## 6. Current Backend Folder State

Current backend structure:

```txt
src/lib/backend/
  contracts/
    admin.contract.ts
    common.contract.ts
    member.contract.ts
    payment.contract.ts
  dto/
    admin.dto.ts
    member.dto.ts
    payment.dto.ts
  errors/
    BackendError.ts
    createBackendError.ts
    errorCodes.ts
    resultHelpers.ts
  services/
    adminAuthService.ts
    adminDashboardService.ts
    adminMemberService.ts
    adminPaymentService.ts
    auditService.ts
    memberService.ts
    paymentService.ts
  validation/
    adminSchemas.ts
    commonSchemas.ts
    memberSchemas.ts
    paymentSchemas.ts
```

## 7. Next Planned Phase: Phase 4 Supabase Adapters

Phase 4 should create Supabase adapter implementations for existing repository interfaces.

Planned folder:

```txt
src/lib/backend/adapters/supabase/
  client.ts
  index.ts
  mappers/
    member.mapper.ts
    payment.mapper.ts
    admin.mapper.ts
  repositories/
    supabaseMemberRepository.ts
    supabasePaymentRepository.ts
    supabaseReceiptRepository.ts
    supabaseAdminRepository.ts
    supabaseAuditRepository.ts
    supabaseAdminDashboardRepository.ts
```

Phase 4 rules:

- Supabase imports are allowed only inside `src/lib/backend/adapters/supabase/`.
- No UI files should be touched.
- No service files should be changed unless a contract mismatch makes it unavoidable.
- No hardcoded Supabase project URL or keys.
- Read environment variables only.
- Service role key must remain server-only.
- Return DTO-shaped data, not raw Supabase rows.
- Storage must use bucket/path metadata, not hardcoded public URLs.

Expected environment variables:

```txt
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

## 8. Source Of Truth Rules

The database is the source of truth for persisted business data.

Frontend mock data must not become a second source of truth.

Rules:

- Member data source of truth: Supabase member tables.
- Payment data source of truth: Supabase payment/receipt tables.
- Admin data source of truth: Supabase admin/role/permission tables.
- Audit data source of truth: Supabase audit log table.
- Storage file source of truth: bucket + path + metadata.
- UI local state is temporary display state only.
- Cache is not source of truth.

## 9. Error And Response Standard

All backend-facing services must return:

```ts
BackendResult<T>
```

Do not throw raw errors across service boundaries.

Use:

```txt
ok(...)
fail(...)
fromThrowable(...)
authError(...)
permissionError(...)
validationError(...)
notFoundError(...)
conflictError(...)
serverError(...)
```

## 10. Audit And Operational Requirements

The system must be ready for production operations.

Audit should track:

- Who changed data.
- What was changed.
- When it changed.
- Entity type and entity id.
- Old/new values where applicable.
- Payment approvals/rejections/cancellations.
- Admin actions.
- Login attempts where applicable.

Operational readiness must include:

- Daily/weekly backup strategy.
- Restore testing.
- Environment separation.
- RLS verification.
- Server-only service role key.
- Migration-safe schema changes.
- Production launch checklist.

## 11. Review Checklist For Every Backend Phase

Codex reviewer should check:

- No UI files changed unless explicitly approved.
- No Malayalam text changed.
- No Supabase imports outside adapters.
- No Next.js imports in pure backend layers.
- `BackendResult` reused.
- DTOs reused.
- No duplicate conflicting types.
- No hardcoded payment minimum amounts.
- Repositories are injected, not imported as concrete database clients.
- Environment variables are used instead of hardcoded project details.
- `BACKEND_PROGRESS.md` updated.
- `npx.cmd tsc --noEmit` passes.

## 12. Handoff Message For New Agents

Hello new agent.

This project uses a strict portable backend architecture. Before touching backend files, read:

```txt
Backend_Architecture_Supabase_Plan.md
BACKEND_PROGRESS.md
BACKEND_AI_HANDOFF_PLAN.md
```

Follow this architecture:

```txt
Repository -> Service -> Adapter
```

Never call Supabase directly from frontend UI components. Do not change UI visuals, Malayalam text, layout, colors, typography, routes, or responsive behavior.

If you implement a backend task, update `BACKEND_PROGRESS.md` immediately after completion with your name, date, task summary, files touched, and verification result.

## 13. Current Recommended Next Action

The next safe action is:

```txt
Implement Phase 4: Supabase Adapters
```

After Gemini implements Phase 4, Codex should review:

- Adapter isolation.
- DTO mapping correctness.
- Repository interface compliance.
- Environment variable safety.
- Storage portability.
- TypeScript correctness.


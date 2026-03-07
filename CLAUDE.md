# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite, localhost:5173)
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

No test suite is configured.

## Architecture

This is a React + Vite SPA — a restaurant admin dashboard for "PBN Restaurant". It uses Tailwind CSS v4 (via `@tailwindcss/vite` plugin), Framer Motion for page transitions, and Lucide React for icons. There is **no router** — navigation is managed via a single `activePage` state string in `App.jsx`.

### Auth & Role System

- `src/context/AuthContext.jsx` — provides `user`, `login`, `logout`. Authentication is done against `src/data/users.js` (mock data, in-memory only).
- `src/utils/rolePermissions.js` — the central permission system. Contains:
  - `ROLES` enum
  - `rolePermissions` map (role name → permission booleans)
  - `getNavItems(role)` — returns which sidebar nav items are visible for a role
  - `canPerformAction(role, action)` — boolean permission check
  - `getRoleRestrictions(role)` — returns read-only/modification flags

### Roles

| Role | Key capabilities |
|---|---|
| Corporate Admin | Branch mgmt, experiment categories, global reports, audit mode, AI activity logs |
| Unit Manager | View experiments/inventory/orders, assign chefs & reviewers, view customer feedback |
| Chef | Create & submit experiments, modify own experiments |
| Order Logger | Log and view orders |
| Quality Reviewer | Approve/reject experiments, view AI insights |
| Customer Feedback Collector | Create and view customer feedback |
| CRA Auditor | Read-only across all data; full chronology, version history, approval records |

### Page Routing

`App.jsx` maps string keys (e.g. `'experiment-history'`, `'admin/branches'`) to page components. `resolvePageForRole()` guards navigation — unauthorized page keys fall back to `'dashboard'`. All pages receive `{ user }` as a prop.

### Layout

`src/layouts/DashboardLayout.jsx` — shell with collapsible `Sidebar` + `Topbar`. Nav items are generated from `getNavItems(user.role)`. Page content transitions use Framer Motion `AnimatePresence`.

### Data

All data in `src/data/` is static mock data (JS modules with exported arrays). There is no API or backend. State mutations (e.g. approving experiments, assigning reviewers) are local React state initialized from these files — changes are lost on refresh.

Key data files:
- `experiments.js` — experiment records with `chronology`, `versionHistory`, `approvalRecords`
- `users.js` — mock users with plaintext passwords + `auditLogs`
- `deliveries.js`, `orders.js`, `inventory.js`, `insights.js`, `staff.js`, `corporateAdmin.js`

### UI Components

Reusable components live in `src/components/ui/`:
- `Table`, `Badge`, `Button`, `StatCard`, `PageHeader`, `FormInput`, `FileUpload`, `AlertCard`
- `Modal` — base modal wrapper
- `ExperimentModals` — `AssignChefModal`, `AssignReviewerModal`, `ConfigureMetadataModal`
- `ExperimentDetailsModal` — full experiment detail view (shows chronology/version history for CRA Auditor)
- `ReviewerApprovalModal` — approve/reject flow for Quality Reviewer
- `Timeline` — chronology timeline component

### Adding a New Page

1. Create `src/pages/MyPage.jsx`
2. Add permission flags to `rolePermissions` in `src/utils/rolePermissions.js`
3. Add a nav item in `getNavItems()` in the same file
4. Add the page guard in `resolvePageForRole()` in `App.jsx`
5. Add the page component to the `pages` map in `App.jsx`

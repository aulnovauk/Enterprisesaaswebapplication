# E-SAMMP - EESL Solar Platform

A React + TypeScript + Vite frontend application for Indian government EESL (Energy Efficiency Services Limited) solar power portfolio management.

## Pages

- Dashboard (KPI/analytics, geographic distribution, charts)
- JMR Data Management
- KPI Engine / Transparency Console
- Outage & Loss Analytics / Waterfall Loss
- Contract & LD Analytics
- Reports & MIS / Report Studio
- AI & Trend Analytics / AI Insight Summary
- Site & Portfolio Management
- User Management
- Audit Logs / Governance Console
- ERP Integration
- Settings

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4 + MUI (Material UI)
- **UI Components**: Radix UI primitives, shadcn/ui-style components, lucide-react icons
- **Charts**: Recharts
- **Routing**: React Router v7
- **Font**: Inter (loaded via Google Fonts)

## Theme / Color Palette

- **Primary (Deep Navy)**: `#0A2E4A` — sidebar, headers, primary buttons
- **Accent (Solar Gold)**: `#E8A800` / `#FFC72C` — active indicators, highlights
- **Success**: `#059669` — positive KPIs, targets met
- **Warning**: `#D97706` — approaching thresholds
- **Danger**: `#DC2626` — missed targets, critical alerts
- **Info**: `#2563EB` — informational states
- **Background**: `#F8FAFC` (slate-50)
- **Cards**: `#FFFFFF`
- **Gray scale**: Slate-based (Tailwind slate palette)
- **Border Radius**: 6px base
- CSS variables defined in `src/styles/theme.css`

## Key UX Features

- **Command Palette** (`CommandPalette.tsx`): Global Cmd+K / Ctrl+K search for pages, actions, plants. Integrated into Layout sidebar with ⌘K hint button.
- **Notification Panel** (`NotificationPanel.tsx`): Slide-out panel with 18 mock alerts (critical/warning/info/success), category filters, mark-as-read. Bell icon with unread count badge in sidebar. Shared state via `useSyncExternalStore` so badge updates reactively.
- **Custom Chart Tooltips** (`ChartTooltip.tsx`): Branded Recharts tooltips with navy accent, colored indicators, formatted values, trend arrows. Applied to Dashboard, OutageLossAnalytics, ContractLDAnalytics, AITrendAnalytics.
- **KPI Card Hover Preview** (inline in `Dashboard.tsx`): 1.5s hover delay, auto-positioning, AnimatePresence, scrollable popup.

## Project Structure

```
src/
  app/
    App.tsx           - Root app component (RouterProvider)
    routes.tsx        - Route definitions
    components/
      Layout.tsx      - Main layout with sidebar, Command Palette, Notification Bell
      CommandPalette.tsx - Global Cmd+K search dialog
      NotificationPanel.tsx - Slide-out notification panel + useNotificationCount hook
      ChartTooltip.tsx - Reusable branded Recharts tooltip
      ui/             - shadcn/ui primitives
    pages/            - Page-level components
  imports/            - Markdown documentation
  main.tsx            - Entry point
  styles/
    fonts.css         - Google Fonts (Inter) import
    tailwind.css      - Tailwind v4 config
    theme.css         - CSS variables, theme, base styles
    index.css         - Style imports aggregator
index.html            - HTML entry
vite.config.ts        - Vite config (port 5000, host 0.0.0.0)
```

## Client JMR Report Fields

The platform now supports the client's JMR report format with these fields tracked per site per month:
- **Site_Name** — Plant/site name
- **District** — District-level location (added to JMR records, Dashboard plantMarkers, Outage summary)
- **Vendor** — O&M vendor
- **Capacity_KWp** — Site capacity in KWp (platform also uses MW internally; KWp = MW × 1000)
- **JMR_Month** — JMR reporting month (e.g., Jan-2026, Nov-2025)
- **Energy_Export_KWh** — Net energy exported to grid in KWh
- **Energy_Import_KWh** — Energy imported from grid in KWh
- **Outage** — Total outage duration in HH:MM format

These fields are displayed in:
1. **JMR Data Management** → JMR Repository table (new columns: District, Capacity KWp, Energy Export KWh, Energy Import KWh, Outage HH:MM)
2. **Dashboard** → Plant listing shows district alongside plant name
3. **Outage & Loss Analytics** → "Site-wise Monthly Outage Summary" table at bottom with all client sample data rows (ABC–JKL sites), color-coded outage severity

## Development

- Workflow: `npm run dev` on port 5000
- Host: `0.0.0.0` with `allowedHosts: true` for Replit proxy

## Deployment

- Type: Static site
- Build: `npm run build`
- Public directory: `dist`

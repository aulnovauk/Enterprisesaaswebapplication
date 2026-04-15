# E-SAMMP - EESL Solar Platform

A React + TypeScript + Vite frontend application for Indian government EESL (Energy Efficiency Services Limited) solar power portfolio management.

## Pages

- Dashboard (KPI/analytics, geographic distribution, charts)
- JMR Data Management
- KPI Engine / Transparency Console
- Outage & Loss Analytics / Waterfall Loss
- Contract & LD Analytics
- Financial Reports (Revenue Impact MoM with Chart/Table toggle, Loss Attribution, Vendor Revenue, Invoicing & Collection with vendor-wise plant-level breakdown)
- Reports & MIS / Report Studio
- AI & Trend Analytics / AI Insight Summary
- Site & Portfolio Management (Plant Inventory + Performance Analytics: Vendor Radar, Plant PR%/CUF% Quadrant, Plant Ranking)
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
- **Dashboard Filters**: Top filter bar includes Financial Year, Month, State, Vendor, and Plant filters. Plant dropdown dynamically scopes options based on active State/Vendor selections and auto-resets when parent filters change. Uses plant ID for unique identification. All dashboard sections are fully reactive to filters: KPI cards, vendor health, risk/alerts, generation charts, commercial (waterfall, LD table, O&M), benchmarking (vendor ranking, cluster comparison), analytics (LPI, downtime), asset health breakdown, and the geographic map all drill down based on the active filter selection.
- **KPI Card Hover Preview** (inline in `Dashboard.tsx`): 1.5s hover delay, auto-positioning, AnimatePresence, scrollable popup.
- **Vendor Card Hover Preview** (`VendorCardWithPreview` in `Dashboard.tsx`): 2s hover delay on any Vendor Revenue Health card reveals a popup with plant-level revenue details (budgeted, realized, shortfall, collection %, PR, CUF per plant with district info). Auto-positions horizontally (left/right) and vertically (above/below) based on viewport space. Uses `vendorPlantDetails` data with all 12 Maharashtra plants.
- **Dashboard Drag-and-Drop Layout** (`Dashboard.tsx`): Users can click "Customize" in the header toolbar to enable drag-and-drop reordering of dashboard sections (Rows 2-6). Each section shows a grip handle when in customize mode. Layout order persists in localStorage (`dashboard-widget-order`). "Reset Layout" button restores defaults. Uses `react-dnd` + `react-dnd-html5-backend` (same libraries as Reports & MIS). Row 1 (KPI cards) stays fixed at top. Widget IDs: `geo-risk`, `generation`, `commercial`, `benchmarking`, `advanced`.

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

## JMR Generation Comparison & Missing JMR Alerts

- **Generation Comparison Tab** (`JMRDataManagement.tsx`): New "Generation Comparison" tab in JMR Data Management. Compares current month vs previous month JMR generation with:
  - 4 KPI delta cards (Gross Generation, Net Export, Revenue, Plant Records) with MoM % change indicators
  - Grouped bar chart (Recharts) showing plant-wise current vs previous month generation
  - Detailed plant-by-plant comparison table with trend arrows and portfolio totals
  - Auto-generated insight banner summarizing portfolio performance
  - Month selector with auto-previous-month detection
  - Plant-level data aggregation (handles multiple records per plant/month)
  - **Top-level Plant/Vendor filters fully applied**: comparisonData useMemo filters by selectedPlant and selectedVendor in addition to FY/month. Subtitle dynamically reflects active filter scope.

- **Audit & Version History Tab** (`JMRDataManagement.tsx`): Audit trail table now respects top-level Plant/Vendor filters. Each audit record has plant and vendor fields matching canonical JMR record names. Plant column added to audit table.

- **Missing JMR Alert Banner** (`JMRDataManagement.tsx`): Persistent alert banner shown across all JMR tabs when any plant has JMR submissions missing for more than 1 month. Features:
  - Automatic gap detection: compares each plant's latest JMR month against the FY's most recent month
  - Per-plant badges showing overdue count and missing month names
  - Dismissible per FY (auto-reopens when switching fiscal years)
  - Sorted by severity (most overdue plants first)
  - Hardened against invalid month values

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

## Header & Filter Bar Standards

All pages follow a consistent production-grade sticky header pattern:

- **Sticky header**: `bg-white border-b-2 border-slate-200 shadow-sm shrink-0 z-20 sticky top-0`
- **Icon**: Navy box pattern — `p-1.5 bg-[#2955A0] rounded-lg` with white icon `w-4 h-4`
- **Title**: `text-base font-bold text-slate-900 leading-none`
- **Subtitle**: `text-xs text-slate-600 mt-0.5`
- **Filter row**: Below title with `Filter` icon label + Select dropdowns (h-7 text-xs bg-slate-50 border-slate-200)
- **Reset button**: Amber-styled `✕ Reset` button appears when any filter is active
- **Plant data**: All plant/vendor dropdowns use canonical 12-plant list from `src/app/data/plants.ts`

Pages with filter bars: Dashboard, JMR Data Management, KPI Engine, Outage & Loss Analytics, Contract & LD Analytics, Financial Reports, Waterfall & Loss Analytics, AI & Trend Analytics, Portfolio Compliance Health.

## Development

- Workflow: `npm run dev` on port 5000
- Host: `0.0.0.0` with `allowedHosts: true` for Replit proxy

## Deployment

- Type: Static site
- Build: `npm run build`
- Public directory: `dist`

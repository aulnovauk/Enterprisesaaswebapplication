import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { JMRDataManagement } from "./pages/JMRDataManagement";
import { KPIEngine } from "./pages/KPIEngine";
import { OutageLossAnalytics } from "./pages/OutageLossAnalytics";
import { ContractLDAnalytics } from "./pages/ContractLDAnalytics";
import { ReportsMIS } from "./pages/ReportsMIS";
import { AITrendAnalytics } from "./pages/AITrendAnalytics";
import { SitePortfolioManagement } from "./pages/SitePortfolioManagement";
import { UserManagement } from "./pages/UserManagement";
import { AuditLogs } from "./pages/AuditLogs";
import { ERPIntegration } from "./pages/ERPIntegration";
import { Settings } from "./pages/Settings";
import { AIInsightSummary } from "./pages/AIInsightSummary";
import { AuditGovernanceConsole } from "./pages/AuditGovernanceConsole";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "jmr-data", Component: JMRDataManagement },
      { path: "kpi-engine", Component: KPIEngine },
      { path: "outage-loss", Component: OutageLossAnalytics },
      { path: "contract-ld", Component: ContractLDAnalytics },
      { path: "reports", Component: ReportsMIS },
      { path: "ai-analytics", Component: AITrendAnalytics },
      { path: "ai-insight-summary", Component: AIInsightSummary },
      { path: "site-portfolio", Component: SitePortfolioManagement },
      { path: "users", Component: UserManagement },
      { path: "audit-logs", Component: AuditLogs },
      { path: "audit-governance", Component: AuditGovernanceConsole },
      { path: "erp-integration", Component: ERPIntegration },
      { path: "settings", Component: Settings },
    ],
  },
]);
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  FileSpreadsheet,
  Activity,
  TrendingDown,
  FileText,
  BarChart3,
  BrainCircuit,
  Building2,
  Users,
  FileSearch,
  Database,
  Settings as SettingsIcon,
  ChevronDown,
  Download,
  User,
  LogOut,
  Sun,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/jmr-data", label: "JMR Data Management", icon: FileSpreadsheet },
  { path: "/kpi-engine", label: "KPI Engine", icon: Activity },
  { path: "/outage-loss", label: "Outage & Loss Analytics", icon: TrendingDown },
  { path: "/contract-ld", label: "Contract & LD Analytics", icon: FileText },
  { path: "/reports", label: "Reports & MIS", icon: BarChart3 },
  { path: "/ai-analytics", label: "AI & Trend Analytics", icon: BrainCircuit },
  { path: "/site-portfolio", label: "Site & Portfolio Management", icon: Building2 },
  { path: "/users", label: "User Management", icon: Users },
  { path: "/audit-logs", label: "Audit Logs", icon: FileSearch },
  { path: "/erp-integration", label: "ERP Integration", icon: Database },
  { path: "/settings", label: "Settings", icon: SettingsIcon },
];

const financialYears = ["FY 2025-26", "FY 2024-25", "FY 2023-24", "FY 2022-23"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const plants = ["All Plants", "Plant A - 10MW", "Plant B - 25MW", "Plant C - 50MW", "Cluster North", "Cluster South"];

export function Layout() {
  const location = useLocation();
  const [selectedFY, setSelectedFY] = useState("FY 2025-26");
  const [selectedMonth, setSelectedMonth] = useState("February");
  const [selectedPlant, setSelectedPlant] = useState("All Plants");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Hide global filters on pages with their own comprehensive filter systems
  const hideGlobalFilters = location.pathname === "/" || location.pathname === "/jmr-data";

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <aside 
        className={`border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "w-20" : "w-64"
        }`} 
        style={{ backgroundColor: "#0B3C5D" }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div className={`flex items-center gap-3 transition-opacity duration-300 ${
            isSidebarCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          }`}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#F4B400" }}>
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-white text-sm">E-SAMMP</h1>
              <p className="text-xs text-gray-300">EESL Solar Platform</p>
            </div>
          </div>
          {isSidebarCollapsed && (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto" style={{ backgroundColor: "#F4B400" }}>
              <Sun className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {/* Collapse/Expand Button */}
        <div className="px-4 py-2">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-gray-300 hover:bg-white/5 hover:text-white transition-colors text-xs"
            title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span className="font-medium">Collapse</span>
              </>
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`group relative flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm ${
                      isActive
                        ? "bg-white/10 text-white font-medium shadow-sm"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    } ${isSidebarCollapsed ? "justify-center" : ""}`}
                    title={isSidebarCollapsed ? item.label : ""}
                  >
                    {/* Active indicator */}
                    {isActive && !isSidebarCollapsed && (
                      <div 
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                        style={{ backgroundColor: "#F4B400" }}
                      />
                    )}
                    {isActive && isSidebarCollapsed && (
                      <div 
                        className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-6 rounded-t-full"
                        style={{ backgroundColor: "#F4B400" }}
                      />
                    )}
                    
                    <Icon className={`flex-shrink-0 transition-transform duration-200 ${
                      isActive ? "w-5 h-5" : "w-[18px] h-[18px] group-hover:scale-110"
                    }`} />
                    <span className={`transition-all duration-300 whitespace-nowrap ${
                      isSidebarCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <p className={`text-xs text-gray-400 text-center transition-all duration-300 ${
            isSidebarCollapsed ? "opacity-0" : "opacity-100"
          }`}>
            © 2026 EESL. All rights reserved.
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-gray-200 bg-white px-8 flex items-center justify-between">
          {!hideGlobalFilters && (
            <div className="flex items-center gap-4">
              <Select value={selectedFY} onValueChange={setSelectedFY}>
                <SelectTrigger className="w-40 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {financialYears.map((fy) => (
                    <SelectItem key={fy} value={fy}>{fy}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-36 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPlant} onValueChange={setSelectedPlant}>
                <SelectTrigger className="w-48 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {plants.map((plant) => (
                    <SelectItem key={plant} value={plant}>{plant}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {hideGlobalFilters && <div></div>}

          <div className="flex items-center gap-3">
            {!hideGlobalFilters && (
              <Button variant="outline" size="sm" className="h-9">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm" style={{ backgroundColor: "#0B3C5D" }}>
                    AM
                  </div>
                  <span className="text-sm font-medium">Admin User</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
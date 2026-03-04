import { useState } from "react";
import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Sun,
  AlertTriangle,
  DollarSign,
  Activity,
  MapPin,
  Download,
  Calendar,
  Filter,
  Clock,
  ArrowUp,
  ArrowDown,
  Target,
  Leaf,
  Database,
  BarChart3,
  Users,
  Building2,
  AlertCircle,
  XCircle,
  CheckCircle,
  TrendingUp as TrendUp,
  Gauge,
  Factory,
} from "lucide-react";

// Portfolio Configuration
const PORTFOLIO_CONFIG = {
  totalCapacity: 220, // MW
  totalPlants: 45,
  states: ["Maharashtra", "Tamil Nadu", "Goa"],
};

// Strategic KPI Cards Data
const strategicKPIs = [
  {
    id: "capacity",
    title: "Total Installed Capacity",
    value: "220",
    unit: "MW",
    target: 220,
    actual: 220,
    change: "0%",
    trend: "stable",
    sparkline: [220, 220, 220, 220, 220, 220, 220, 220, 220, 220, 220, 220],
    compliance: "green",
    icon: Factory,
  },
  {
    id: "mtd-generation",
    title: "MTD Generation",
    value: "42,580",
    unit: "MWh",
    target: 45000,
    actual: 42580,
    change: "+5.2%",
    trend: "up",
    sparkline: [3200, 3450, 3680, 3920, 4150, 4380, 4620, 4850, 5080, 5320, 5560, 5800],
    compliance: "yellow",
    icon: Zap,
  },
  {
    id: "ytd-generation",
    title: "YTD Generation",
    value: "485,240",
    unit: "MWh",
    target: 520000,
    actual: 485240,
    change: "+8.4%",
    trend: "up",
    sparkline: [38500, 41200, 43800, 46500, 48900, 51200, 53800, 56200, 58900, 61500, 64100, 66800],
    compliance: "yellow",
    icon: Zap,
  },
  {
    id: "portfolio-cuf",
    title: "Portfolio CUF",
    value: "22.1",
    unit: "%",
    target: 24,
    actual: 22.1,
    change: "+0.8%",
    trend: "up",
    sparkline: [20.5, 20.8, 21.0, 21.2, 21.4, 21.6, 21.8, 21.9, 22.0, 22.1, 22.1, 22.1],
    compliance: "yellow",
    icon: Target,
  },
  {
    id: "grid-availability",
    title: "Grid Availability",
    value: "97.8",
    unit: "%",
    target: 98,
    actual: 97.8,
    change: "+0.5%",
    trend: "up",
    sparkline: [97.2, 97.3, 97.4, 97.5, 97.6, 97.7, 97.7, 97.8, 97.8, 97.8, 97.8, 97.8],
    compliance: "green",
    icon: Activity,
  },
  {
    id: "revenue-realized",
    title: "Revenue Realized",
    value: "₹28.5",
    unit: "Cr",
    target: 31.2,
    actual: 28.5,
    change: "+6.2%",
    trend: "up",
    sparkline: [2.1, 2.3, 2.5, 2.7, 2.9, 3.1, 3.3, 3.5, 3.7, 3.9, 4.1, 4.3],
    compliance: "yellow",
    icon: DollarSign,
  },
  {
    id: "revenue-shortfall",
    title: "Revenue Shortfall",
    value: "₹2.7",
    unit: "Cr",
    target: 0,
    actual: 2.7,
    change: "-0.3Cr",
    trend: "down",
    sparkline: [3.5, 3.4, 3.3, 3.2, 3.1, 3.0, 2.9, 2.8, 2.8, 2.7, 2.7, 2.7],
    compliance: "red",
    icon: AlertTriangle,
  },
  {
    id: "ld-exposure",
    title: "Total LD Exposure",
    value: "₹1.24",
    unit: "Cr",
    target: 0,
    actual: 1.24,
    change: "-0.08Cr",
    trend: "down",
    sparkline: [1.8, 1.7, 1.6, 1.5, 1.4, 1.35, 1.3, 1.28, 1.26, 1.25, 1.24, 1.24],
    compliance: "red",
    icon: AlertCircle,
  },
  {
    id: "asset-health",
    title: "Asset Health Index",
    value: "82.5",
    unit: "/100",
    target: 90,
    actual: 82.5,
    change: "+1.2",
    trend: "up",
    sparkline: [78, 79, 79.5, 80, 80.5, 81, 81.5, 81.8, 82, 82.2, 82.4, 82.5],
    compliance: "yellow",
    icon: Gauge,
  },
  {
    id: "co2-reduction",
    title: "CO₂ Emission Reduction",
    value: "384,520",
    unit: "Tonnes",
    target: 410000,
    actual: 384520,
    change: "+8.4%",
    trend: "up",
    sparkline: [30500, 32800, 35200, 37600, 40100, 42500, 45000, 47500, 50100, 52600, 55200, 57800],
    compliance: "green",
    icon: Leaf,
  },
];

// Plant Markers for India Map (Simplified representation)
const plantMarkers = [
  // Maharashtra
  { id: 1, name: "Pune Solar Park", state: "Maharashtra", lat: 18.5, lon: 73.8, capacity: 25, status: "compliant", cuf: 23.5 },
  { id: 2, name: "Nashik Site A", state: "Maharashtra", lat: 19.9, lon: 73.7, capacity: 15, status: "warning", cuf: 21.2 },
  { id: 3, name: "Aurangabad Project", state: "Maharashtra", lat: 19.8, lon: 75.3, capacity: 30, status: "compliant", cuf: 24.1 },
  { id: 4, name: "Solapur SPV", state: "Maharashtra", lat: 17.6, lon: 75.9, capacity: 20, status: "compliant", cuf: 23.8 },
  { id: 5, name: "Nagpur Plant", state: "Maharashtra", lat: 21.1, lon: 79.0, capacity: 18, status: "curtailment", cuf: 19.5 },
  
  // Tamil Nadu
  { id: 6, name: "Chennai Coastal", state: "Tamil Nadu", lat: 13.0, lon: 80.2, capacity: 22, status: "compliant", cuf: 24.5 },
  { id: 7, name: "Coimbatore Solar", state: "Tamil Nadu", lat: 11.0, lon: 76.9, capacity: 28, status: "warning", cuf: 20.8 },
  { id: 8, name: "Madurai Project", state: "Tamil Nadu", lat: 9.9, lon: 78.1, capacity: 16, status: "compliant", cuf: 23.2 },
  { id: 9, name: "Trichy Site B", state: "Tamil Nadu", lat: 10.8, lon: 78.7, capacity: 19, status: "non-compliant", cuf: 18.5 },
  
  // Goa
  { id: 10, name: "Panaji Solar Farm", state: "Goa", lat: 15.4, lon: 73.8, capacity: 8, status: "compliant", cuf: 22.8 },
  { id: 11, name: "Margao SPV", state: "Goa", lat: 15.2, lon: 73.9, capacity: 7, status: "warning", cuf: 21.5 },
];

// Risk & Alert Data
const riskData = {
  nonCompliantPlants: 8,
  highLDRisk: 5,
  escalationTriggered: 3,
  pendingJMR: 12,
  topUnderperforming: [
    { plant: "Trichy Site B", state: "Tamil Nadu", cuf: 18.5, gap: -5.5 },
    { plant: "Nagpur Plant", state: "Maharashtra", cuf: 19.5, gap: -4.5 },
    { plant: "Coimbatore Solar", state: "Tamil Nadu", cuf: 20.8, gap: -3.2 },
  ],
};

// Generation Analytics Data
const mtdGenerationData = [
  { plant: "Chennai Coastal", target: 1850, actual: 1920 },
  { plant: "Aurangabad Project", target: 2450, actual: 2380 },
  { plant: "Pune Solar Park", target: 2100, actual: 2150 },
  { plant: "Coimbatore Solar", target: 2350, actual: 2120 },
  { plant: "Solapur SPV", target: 1680, actual: 1720 },
  { plant: "Nashik Site A", target: 1260, actual: 1180 },
];

const cufTrendData = [
  { month: "Mar", portfolio: 21.2, target: 24.0 },
  { month: "Apr", portfolio: 21.5, target: 24.0 },
  { month: "May", portfolio: 22.1, target: 24.0 },
  { month: "Jun", portfolio: 21.8, target: 24.0 },
  { month: "Jul", portfolio: 20.9, target: 24.0 },
  { month: "Aug", portfolio: 21.4, target: 24.0 },
  { month: "Sep", portfolio: 21.9, target: 24.0 },
  { month: "Oct", portfolio: 22.3, target: 24.0 },
  { month: "Nov", portfolio: 22.0, target: 24.0 },
  { month: "Dec", portfolio: 21.7, target: 24.0 },
  { month: "Jan", portfolio: 22.2, target: 24.0 },
  { month: "Feb", portfolio: 22.1, target: 24.0 },
];

const downtimeData = [
  { name: "Grid Outage", value: 38, color: "#EF4444" },
  { name: "Equipment Failure", value: 25, color: "#F59E0B" },
  { name: "Planned Shutdown", value: 18, color: "#10B981" },
  { name: "Curtailment", value: 12, color: "#F4B400" },
  { name: "Force Majeure", value: 7, color: "#8B5CF6" },
];

// Revenue Waterfall Data
const revenueWaterfallData = [
  { stage: "Budgeted", value: 31.2, delta: 0 },
  { stage: "Expected", value: 29.8, delta: -1.4 },
  { stage: "Actual", value: 29.2, delta: -0.6 },
  { stage: "Realized", value: 28.5, delta: -0.7 },
];

// LD Exposure by Vendor
const ldExposureData = [
  { vendor: "Vendor A", plants: 12, ldAmount: 0.42, severity: "medium" },
  { vendor: "Vendor B", plants: 8, ldAmount: 0.28, severity: "low" },
  { vendor: "Vendor C", plants: 15, ldAmount: 0.54, severity: "high" },
  { vendor: "Vendor D", plants: 10, ldAmount: 0.00, severity: "none" },
];

// O&M Deviation Data
const omDeviationData = {
  prBenchmark: 82.0,
  actualPR: 78.6,
  settlementAmount: 1.85,
};

// Vendor Performance Ranking
const vendorRankingData = [
  { rank: 1, vendor: "Vendor D", plants: 10, avgCuf: 23.8, avgAvailability: 97.5, ldExposure: 0.00, compliance: 98.5 },
  { rank: 2, vendor: "Vendor A", plants: 12, avgCuf: 22.5, avgAvailability: 96.2, ldExposure: 0.42, compliance: 94.2 },
  { rank: 3, vendor: "Vendor B", plants: 8, avgCuf: 22.1, avgAvailability: 95.8, ldExposure: 0.28, compliance: 95.8 },
  { rank: 4, vendor: "Vendor C", plants: 15, avgCuf: 20.8, avgAvailability: 93.5, ldExposure: 0.54, compliance: 88.5 },
];

// Cluster Comparison
const clusterComparisonData = [
  { state: "Maharashtra", capacity: 108, generation: 24580, cuf: 22.8, availability: 96.5, ldExposure: 0.52 },
  { state: "Tamil Nadu", capacity: 85, generation: 18240, cuf: 21.5, availability: 95.2, ldExposure: 0.58 },
  { state: "Goa", capacity: 15, generation: 3420, cuf: 22.8, availability: 97.8, ldExposure: 0.14 },
];

// Lost Production Index
const lpiData = [
  { month: "Mar", lpi: 8.5 },
  { month: "Apr", lpi: 7.2 },
  { month: "May", lpi: 6.8 },
  { month: "Jun", lpi: 9.1 },
  { month: "Jul", lpi: 12.5 },
  { month: "Aug", lpi: 8.9 },
  { month: "Sep", lpi: 7.5 },
  { month: "Oct", lpi: 6.2 },
  { month: "Nov", lpi: 7.8 },
  { month: "Dec", lpi: 9.5 },
  { month: "Jan", lpi: 7.1 },
  { month: "Feb", lpi: 8.2 },
];

// Asset Health Index Breakdown
const assetHealthBreakdown = [
  { component: "PR Score", value: 78.6, target: 82.0, weight: 35 },
  { component: "Availability Score", value: 96.2, target: 98.0, weight: 30 },
  { component: "Downtime Score", value: 85.5, target: 95.0, weight: 20 },
  { component: "Compliance Score", value: 88.5, target: 95.0, weight: 15 },
];

const statusColors: any = {
  compliant: { bg: "#10B981", label: "Compliant" },
  warning: { bg: "#F4B400", label: "Warning" },
  "non-compliant": { bg: "#EF4444", label: "Non-Compliant" },
  shutdown: { bg: "#6B7280", label: "Shutdown" },
  curtailment: { bg: "#F59E0B", label: "Curtailment" },
};

const complianceColors: any = {
  green: "bg-emerald-500",
  yellow: "bg-amber-500",
  red: "bg-rose-500",
  stable: "bg-slate-400",
};

export function Dashboard() {
  const [financialYear, setFinancialYear] = useState("FY 2025-26");
  const [month, setMonth] = useState("February");
  const [stateFilter, setStateFilter] = useState("All States");
  const [vendorFilter, setVendorFilter] = useState("All Vendors");
  const [durationToggle, setDurationToggle] = useState("MTD");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* GLOBAL TOP FILTER BAR */}
      <div className="bg-white border-b-2 border-slate-200 shadow-sm shrink-0 z-20 sticky top-0">
        <div className="px-6 py-2">
          {/* Row 1: Title & Meta Info */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-[#0B3C5D] rounded-lg">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900 leading-none">Portfolio Dashboard</h1>
                <p className="text-xs text-slate-600 mt-0.5">
                  {PORTFOLIO_CONFIG.totalCapacity} MW · {PORTFOLIO_CONFIG.totalPlants} Plants · {PORTFOLIO_CONFIG.states.length} States
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-200">
                <Clock className="w-3 h-3 text-slate-500" />
                <span className="text-xs text-slate-600">Updated 2 min ago</span>
              </div>
              <Button size="sm" variant="outline" className="gap-1.5 h-7 px-3 text-xs">
                <Download className="w-3.5 h-3.5" />
                Export
              </Button>
            </div>
          </div>

          {/* Row 2: Filters & Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select value={financialYear} onValueChange={setFinancialYear}>
                <SelectTrigger className="w-32 h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FY 2025-26">FY 2025-26</SelectItem>
                  <SelectItem value="FY 2024-25">FY 2024-25</SelectItem>
                  <SelectItem value="FY 2023-24">FY 2023-24</SelectItem>
                </SelectContent>
              </Select>

              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className="w-28 h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="w-32 h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All States">All States</SelectItem>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="Goa">Goa</SelectItem>
                </SelectContent>
              </Select>

              <Select value={vendorFilter} onValueChange={setVendorFilter}>
                <SelectTrigger className="w-32 h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Vendors">All Vendors</SelectItem>
                  <SelectItem value="Vendor A">Vendor A</SelectItem>
                  <SelectItem value="Vendor B">Vendor B</SelectItem>
                  <SelectItem value="Vendor C">Vendor C</SelectItem>
                  <SelectItem value="Vendor D">Vendor D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              {["MTD", "YTD", "Annual"].map((duration) => (
                <button
                  key={duration}
                  onClick={() => setDurationToggle(duration)}
                  className={`px-4 py-1 text-xs font-semibold rounded transition-all ${
                    durationToggle === duration
                      ? "bg-[#0B3C5D] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6 max-w-[1920px] mx-auto pb-16">
          
          {/* ROW 1 – STRATEGIC KPI SUMMARY CARDS */}
          <div className="grid grid-cols-5 gap-4">
            {strategicKPIs.map((kpi) => {
              const Icon = kpi.icon;
              const progressPercent = (kpi.actual / kpi.target) * 100;
              
              return (
                <motion.div
                  key={kpi.id}
                  whileHover={{ y: -2 }}
                  className="cursor-pointer"
                >
                  <Card className="border-2 border-slate-200 hover:border-[#0B3C5D] hover:shadow-lg transition-all">
                    <CardContent className="p-4">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wide mb-1">
                            {kpi.title}
                          </p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-bold text-slate-900">{kpi.value}</span>
                            <span className="text-xs font-medium text-slate-600">{kpi.unit}</span>
                          </div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${complianceColors[kpi.compliance]}`}></div>
                      </div>

                      {/* Target Progress */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-[10px] mb-1">
                          <span className="text-slate-600">Target: {kpi.target} {kpi.unit}</span>
                          <span className="font-bold text-slate-900">{progressPercent.toFixed(0)}%</span>
                        </div>
                        <Progress value={progressPercent} className="h-1" />
                      </div>

                      {/* Trend & Change */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {kpi.trend === "up" ? (
                            <ArrowUp className="w-3 h-3 text-emerald-600" />
                          ) : kpi.trend === "down" ? (
                            <ArrowDown className="w-3 h-3 text-rose-600" />
                          ) : (
                            <div className="w-3 h-3" />
                          )}
                          <span className={`text-[10px] font-bold ${
                            kpi.trend === "up" ? "text-emerald-600" : 
                            kpi.trend === "down" ? "text-rose-600" : "text-slate-600"
                          }`}>
                            {kpi.change}
                          </span>
                          <span className="text-[10px] text-slate-500">MoM</span>
                        </div>
                        
                        {/* Mini Sparkline */}
                        <div className="h-6 w-16">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={kpi.sparkline.map((val) => ({ value: val }))}>
                              <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke={kpi.compliance === "green" ? "#10B981" : kpi.compliance === "yellow" ? "#F4B400" : "#EF4444"}
                                strokeWidth={1.5}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* ROW 2 – GEOGRAPHICAL & RISK VIEW */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left: India Map with Plant Markers */}
            <Card className="col-span-7 border-2 border-slate-200 shadow-md">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Geographic Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative bg-slate-50 rounded-xl p-8 h-96 border-2 border-slate-200">
                  {/* Simplified India Map Representation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-sm font-semibold text-slate-700 mb-2">Interactive Map View</p>
                      <p className="text-xs text-slate-500 mb-4">Click on markers to view plant details</p>
                      
                      {/* Legend */}
                      <div className="inline-flex flex-col gap-2 bg-white p-4 rounded-lg border-2 border-slate-200 shadow-sm">
                        {Object.entries(statusColors).map(([status, config]) => (
                          <div key={status} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.bg }}></div>
                            <span className="text-xs font-medium text-slate-700">{config.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Plant Summary Cards */}
                  <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                    {PORTFOLIO_CONFIG.states.map((state) => {
                      const statePlants = plantMarkers.filter(p => p.state === state);
                      const stateCapacity = statePlants.reduce((sum, p) => sum + p.capacity, 0);
                      
                      return (
                        <div key={state} className="bg-white p-3 rounded-lg border-2 border-slate-200 shadow-sm">
                          <div className="text-[10px] font-bold text-slate-600 uppercase mb-1">{state}</div>
                          <div className="text-lg font-bold text-slate-900">{stateCapacity} MW</div>
                          <div className="text-xs text-slate-600">{statePlants.length} Plants</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right: Risk & Alert Panel */}
            <Card className="col-span-5 border-2 border-slate-200 shadow-md">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Risk & Alert Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Risk Summary Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-rose-50 rounded-lg border-2 border-rose-200">
                      <div className="text-xs font-semibold text-rose-700 mb-1">Non-Compliant Plants</div>
                      <div className="text-2xl font-bold text-rose-900">{riskData.nonCompliantPlants}</div>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg border-2 border-amber-200">
                      <div className="text-xs font-semibold text-amber-700 mb-1">High LD Risk</div>
                      <div className="text-2xl font-bold text-amber-900">{riskData.highLDRisk}</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
                      <div className="text-xs font-semibold text-purple-700 mb-1">Escalations</div>
                      <div className="text-2xl font-bold text-purple-900">{riskData.escalationTriggered}</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <div className="text-xs font-semibold text-blue-700 mb-1">Pending JMR</div>
                      <div className="text-2xl font-bold text-blue-900">{riskData.pendingJMR}</div>
                    </div>
                  </div>

                  <Separator />

                  {/* Top Underperforming Plants */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase mb-3">Top Underperforming Plants</h4>
                    <div className="space-y-2">
                      {riskData.topUnderperforming.map((plant, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-900">{plant.plant}</span>
                            <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 text-[10px]">
                              {plant.gap.toFixed(1)}%
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600">{plant.state}</span>
                            <span className="font-semibold text-slate-900">CUF: {plant.cuf}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ROW 3 – GENERATION & PERFORMANCE ANALYTICS */}
          <div className="grid grid-cols-12 gap-6">
            {/* MTD vs Target Generation */}
            <Card className="col-span-4 border-2 border-slate-200 shadow-md">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base">MTD vs Target Generation</CardTitle>
                <CardDescription className="text-xs">Top 6 plants by capacity</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mtdGenerationData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" tick={{ fontSize: 10 }} stroke="#64748b" />
                      <YAxis dataKey="plant" type="category" tick={{ fontSize: 10 }} stroke="#64748b" width={100} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="target" fill="#94A3B8" name="Target (MWh)" />
                      <Bar dataKey="actual" fill="#0B3C5D" name="Actual (MWh)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* CUF Trend (12 Month) */}
            <Card className="col-span-5 border-2 border-slate-200 shadow-md">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base">Portfolio CUF Trend (12 Months)</CardTitle>
                <CardDescription className="text-xs">Monthly performance vs target</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cufTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#64748b" />
                      <YAxis domain={[19, 25]} tick={{ fontSize: 10 }} stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Line 
                        type="monotone" 
                        dataKey="portfolio" 
                        stroke="#0B3C5D" 
                        strokeWidth={3}
                        name="Portfolio CUF (%)"
                        dot={{ fill: '#0B3C5D', r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Target (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Downtime Classification */}
            <Card className="col-span-3 border-2 border-slate-200 shadow-md">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base">Downtime Classification</CardTitle>
                <CardDescription className="text-xs">Distribution by cause</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-72 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={downtimeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        dataKey="value"
                        label={(entry) => `${entry.value}%`}
                        labelLine={false}
                      >
                        {downtimeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {downtimeData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                        <span className="text-slate-700">{item.name}</span>
                      </div>
                      <span className="font-bold text-slate-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ROW 4 – COMMERCIAL & FINANCIAL INSIGHT */}
          <div className="grid grid-cols-12 gap-6">
            {/* Revenue Waterfall */}
            <Card className="col-span-4 border-2 border-slate-200 shadow-md">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base">Revenue Waterfall (₹ Cr)</CardTitle>
                <CardDescription className="text-xs">Budget to realization flow</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueWaterfallData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="stage" tick={{ fontSize: 10 }} stroke="#64748b" />
                      <YAxis domain={[25, 33]} tick={{ fontSize: 10 }} stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Bar dataKey="value" fill="#0B3C5D" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-3 bg-amber-50 rounded-lg border-2 border-amber-200">
                  <div className="text-xs font-semibold text-amber-700 mb-1">Total Shortfall</div>
                  <div className="text-xl font-bold text-amber-900">₹2.7 Cr</div>
                  <div className="text-xs text-amber-600 mt-1">8.7% below budget</div>
                </div>
              </CardContent>
            </Card>

            {/* LD Exposure by Vendor */}
            <Card className="col-span-4 border-2 border-slate-200 shadow-md">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base">LD Exposure by Vendor</CardTitle>
                <CardDescription className="text-xs">Liquidated damages summary</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs font-bold">Vendor</TableHead>
                      <TableHead className="text-xs font-bold text-center">Plants</TableHead>
                      <TableHead className="text-xs font-bold text-right">LD (₹ Cr)</TableHead>
                      <TableHead className="text-xs font-bold text-right">Risk</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ldExposureData.map((vendor) => (
                      <TableRow key={vendor.vendor} className="hover:bg-slate-50">
                        <TableCell className="text-xs font-semibold">{vendor.vendor}</TableCell>
                        <TableCell className="text-xs text-center">{vendor.plants}</TableCell>
                        <TableCell className="text-xs text-right font-bold">₹{vendor.ldAmount.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Badge 
                            variant="outline" 
                            className={`text-[10px] ${
                              vendor.severity === "high" ? "bg-rose-50 text-rose-700 border-rose-200" :
                              vendor.severity === "medium" ? "bg-amber-50 text-amber-700 border-amber-200" :
                              vendor.severity === "low" ? "bg-blue-50 text-blue-700 border-blue-200" :
                              "bg-emerald-50 text-emerald-700 border-emerald-200"
                            }`}
                          >
                            {vendor.severity === "none" ? "Clean" : vendor.severity}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 p-3 bg-rose-50 rounded-lg border-2 border-rose-200">
                  <div className="text-xs font-semibold text-rose-700 mb-1">Total Portfolio LD</div>
                  <div className="text-xl font-bold text-rose-900">₹1.24 Cr</div>
                </div>
              </CardContent>
            </Card>

            {/* O&M Deviation Settlement */}
            <Card className="col-span-4 border-2 border-slate-200 shadow-md">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base">O&M Deviation Settlement</CardTitle>
                <CardDescription className="text-xs">Performance vs benchmark</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg border-2 border-slate-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-semibold text-slate-600 mb-2">PR Benchmark</div>
                        <div className="text-3xl font-bold text-slate-900">{omDeviationData.prBenchmark}%</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-600 mb-2">Actual PR</div>
                        <div className="text-3xl font-bold text-rose-600">{omDeviationData.actualPR}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
                    <div className="text-xs font-semibold text-amber-700 mb-2">PR Gap</div>
                    <div className="text-2xl font-bold text-amber-900">
                      -{(omDeviationData.prBenchmark - omDeviationData.actualPR).toFixed(1)}%
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <div className="text-xs font-semibold text-blue-700 mb-2">Settlement Amount</div>
                    <div className="text-2xl font-bold text-blue-900">₹{omDeviationData.settlementAmount} Cr</div>
                    <div className="text-xs text-blue-600 mt-1">Payable to EESL</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ROW 5 – BENCHMARKING & COMPARISON */}
          <div className="grid grid-cols-12 gap-6">
            {/* Vendor Performance Ranking */}
            <Card className="col-span-7 border-2 border-slate-200 shadow-md">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base">Vendor Performance Ranking</CardTitle>
                <CardDescription className="text-xs">Comparative analysis across vendors</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs font-bold w-12">Rank</TableHead>
                      <TableHead className="text-xs font-bold">Vendor</TableHead>
                      <TableHead className="text-xs font-bold text-center">Plants</TableHead>
                      <TableHead className="text-xs font-bold text-right">Avg CUF</TableHead>
                      <TableHead className="text-xs font-bold text-right">Availability</TableHead>
                      <TableHead className="text-xs font-bold text-right">LD (₹ Cr)</TableHead>
                      <TableHead className="text-xs font-bold text-right">Compliance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendorRankingData.map((vendor) => (
                      <TableRow key={vendor.rank} className="hover:bg-slate-50 cursor-pointer">
                        <TableCell>
                          <div className="w-7 h-7 rounded-lg bg-[#0B3C5D] text-white flex items-center justify-center font-bold text-xs">
                            {vendor.rank}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-bold">{vendor.vendor}</TableCell>
                        <TableCell className="text-xs text-center">{vendor.plants}</TableCell>
                        <TableCell className="text-xs text-right font-semibold">{vendor.avgCuf}%</TableCell>
                        <TableCell className="text-xs text-right font-semibold">{vendor.avgAvailability}%</TableCell>
                        <TableCell className="text-xs text-right font-semibold">₹{vendor.ldExposure.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Badge 
                            variant="outline"
                            className={`text-[10px] ${
                              vendor.compliance >= 95 ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                              vendor.compliance >= 90 ? "bg-amber-50 text-amber-700 border-amber-200" :
                              "bg-rose-50 text-rose-700 border-rose-200"
                            }`}
                          >
                            {vendor.compliance}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Cluster Comparison */}
            <Card className="col-span-5 border-2 border-slate-200 shadow-md">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base">State-wise Cluster Comparison</CardTitle>
                <CardDescription className="text-xs">Regional performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {clusterComparisonData.map((cluster) => (
                    <div key={cluster.state} className="p-4 bg-slate-50 rounded-lg border-2 border-slate-200 hover:border-[#0B3C5D] transition-all cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-slate-900">{cluster.state}</h4>
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          {cluster.capacity} MW
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-3 text-xs">
                        <div>
                          <div className="text-slate-600 mb-1">Generation</div>
                          <div className="font-bold text-slate-900">{cluster.generation.toLocaleString()} MWh</div>
                        </div>
                        <div>
                          <div className="text-slate-600 mb-1">CUF</div>
                          <div className="font-bold text-slate-900">{cluster.cuf}%</div>
                        </div>
                        <div>
                          <div className="text-slate-600 mb-1">Availability</div>
                          <div className="font-bold text-slate-900">{cluster.availability}%</div>
                        </div>
                        <div>
                          <div className="text-slate-600 mb-1">LD</div>
                          <div className="font-bold text-rose-600">₹{cluster.ldExposure}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ROW 6 – ADVANCED ANALYTICS */}
          <div className="grid grid-cols-12 gap-6">
            {/* Lost Production Index */}
            <Card className="col-span-6 border-2 border-slate-200 shadow-md">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base">Lost Production Index (LPI)</CardTitle>
                <CardDescription className="text-xs">Monthly energy loss percentage</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={lpiData}>
                      <defs>
                        <linearGradient id="colorLPI" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#64748b" />
                      <YAxis domain={[0, 15]} tick={{ fontSize: 10 }} stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="lpi" 
                        stroke="#EF4444" 
                        strokeWidth={3}
                        fill="url(#colorLPI)" 
                        name="LPI (%)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-3 bg-rose-50 rounded-lg border-2 border-rose-200">
                  <div className="text-xs font-semibold text-rose-700 mb-1">Average LPI (12M)</div>
                  <div className="text-xl font-bold text-rose-900">8.3%</div>
                  <div className="text-xs text-rose-600 mt-1">Target: &lt;5%</div>
                </div>
              </CardContent>
            </Card>

            {/* Asset Health Index Breakdown */}
            <Card className="col-span-6 border-2 border-slate-200 shadow-md">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base">Asset Health Index Breakdown</CardTitle>
                <CardDescription className="text-xs">Weighted component scores</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {assetHealthBreakdown.map((component) => {
                    const score = (component.value / component.target) * 100;
                    
                    return (
                      <div key={component.component}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{component.component}</span>
                            <Badge variant="outline" className="text-[10px] bg-slate-100 text-slate-700">
                              {component.weight}%
                            </Badge>
                          </div>
                          <div className="text-xs">
                            <span className="font-bold text-slate-900">{component.value}</span>
                            <span className="text-slate-600"> / {component.target}</span>
                          </div>
                        </div>
                        <div className="relative">
                          <Progress value={score} className="h-3" />
                          <div className="absolute top-0 left-0 h-3 flex items-center px-2">
                            <span className="text-[10px] font-bold text-white">{score.toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/80 rounded-lg text-white">
                  <div className="text-xs font-semibold mb-2">Composite Asset Health Index</div>
                  <div className="text-4xl font-bold">82.5 <span className="text-xl">/100</span></div>
                  <div className="text-xs mt-2 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    +1.2 points this month
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
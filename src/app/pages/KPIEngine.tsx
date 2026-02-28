import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  ArrowRight, 
  Info, 
  History, 
  Settings, 
  AlertCircle, 
  CheckCircle2, 
  Download,
  Filter,
  ChevronRight,
  Database,
  Zap,
  DollarSign,
  Activity,
  AlertTriangle,
  PlayCircle,
  RefreshCw,
  MoreVertical,
  Edit3,
  Save,
  X,
  Lock,
  Unlock
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

// --- Types & Interfaces ---

interface KPIInput {
  label: string;
  value: string;
  unit: string;
  source?: string; // e.g., "SCADA", "Manual", "Calculated"
  variable: string; // e.g., "G_act"
}

interface KPIStep {
  step: string;
  formula?: string;
  value: string;
}

interface KPIData {
  id: string;
  name: string;
  shortName: string;
  category: "Technical" | "Financial" | "Operational";
  description: string;
  frequency: string; // e.g., "Daily", "Monthly"
  icon: React.ElementType;
  color: string;
  currentValue: number;
  target: number;
  unit: string;
  status: "good" | "warning" | "critical";
  trend: "up" | "down" | "neutral";
  trendValue: number; // e.g., +2.4%
  formula: {
    expression: string; // The math expression text
    inputs: KPIInput[];
    steps: KPIStep[];
  };
  history: { date: string; value: number }[];
}

// --- Mock Data ---

const kpiList: KPIData[] = [
  {
    id: "cuf",
    name: "Capacity Utilization Factor (CUF)",
    shortName: "CUF",
    category: "Technical",
    description: "The ratio of the actual electrical energy output of a photovoltaic solar plant over the year to the maximum possible electrical energy output over that year.",
    frequency: "Monthly",
    icon: Activity,
    color: "#0B3C5D",
    currentValue: 22.4,
    target: 23.0,
    unit: "%",
    status: "warning",
    trend: "down",
    trendValue: -2.6,
    formula: {
      expression: "\\frac{Actual Generation}{Installed Capacity \\times Time Period} \\times 100",
      inputs: [
        { label: "Actual Generation", variable: "E_gen", value: "4485.2", unit: "MWh", source: "JMR Data" },
        { label: "Installed Capacity", variable: "P_inst", value: "50", unit: "MW", source: "Master Data" },
        { label: "Time Period", variable: "T_period", value: "672", unit: "Hours", source: "System" },
      ],
      steps: [
        { step: "Calculate Max Possible Output", formula: "P_inst × T_period", value: "33,600 MWh" },
        { step: "Calculate Ratio", formula: "E_gen / MaxOutput", value: "0.13348" },
        { step: "Convert to Percentage", formula: "Ratio × 100", value: "13.35%" },
      ],
    },
    history: [
      { date: "Aug", value: 21.8 },
      { date: "Sep", value: 22.1 },
      { date: "Oct", value: 23.2 },
      { date: "Nov", value: 22.8 },
      { date: "Dec", value: 22.3 },
      { date: "Jan", value: 22.6 },
      { date: "Feb", value: 22.4 },
    ]
  },
  {
    id: "grid-availability",
    name: "Grid Availability",
    shortName: "Grid Avail",
    category: "Operational",
    description: "Percentage of time the grid was available for power injection.",
    frequency: "Daily",
    icon: Zap,
    color: "#10B981",
    currentValue: 98.5,
    target: 98.0,
    unit: "%",
    status: "good",
    trend: "up",
    trendValue: +0.5,
    formula: {
      expression: "\\frac{Total Time - Grid Outage}{Total Time} \\times 100",
      inputs: [
        { label: "Total Period", variable: "T_total", value: "672", unit: "Hours", source: "System" },
        { label: "Grid Outage Time", variable: "T_outage", value: "10.08", unit: "Hours", source: "JMR Outage Log" },
      ],
      steps: [
        { step: "Calculate Available Time", formula: "T_total - T_outage", value: "661.92 Hours" },
        { step: "Calculate Percentage", formula: "(Available / Total) × 100", value: "98.5%" },
      ],
    },
    history: [
      { date: "Aug", value: 97.2 },
      { date: "Sep", value: 97.8 },
      { date: "Oct", value: 98.5 },
      { date: "Nov", value: 98.0 },
      { date: "Dec", value: 97.5 },
      { date: "Jan", value: 98.2 },
      { date: "Feb", value: 98.5 },
    ]
  },
  {
    id: "roi",
    name: "Return on Investment (ROI)",
    shortName: "ROI",
    category: "Financial",
    description: "A performance measure used to evaluate the efficiency or profitability of an investment.",
    frequency: "Annual",
    icon: DollarSign,
    color: "#F59E0B",
    currentValue: 8.2,
    target: 9.0,
    unit: "%",
    status: "warning",
    trend: "down",
    trendValue: -8.9,
    formula: {
      expression: "\\frac{Revenue - O\\&M Cost}{Total Investment} \\times 100",
      inputs: [
        { label: "Annual Revenue", variable: "Rev_annual", value: "480.5", unit: "₹ Lakhs", source: "Finance Module" },
        { label: "Annual O&M Cost", variable: "Cost_om", value: "42.8", unit: "₹ Lakhs", source: "Finance Module" },
        { label: "Total Investment", variable: "Inv_total", value: "5400", unit: "₹ Lakhs", source: "Master Data" },
      ],
      steps: [
        { step: "Calculate Net Revenue", formula: "Rev_annual - Cost_om", value: "437.7 ₹ Lakhs" },
        { step: "Calculate ROI", formula: "(Net Revenue / Inv_total) × 100", value: "8.1%" },
      ],
    },
    history: [
      { date: "Aug", value: 8.0 },
      { date: "Sep", value: 8.1 },
      { date: "Oct", value: 8.4 },
      { date: "Nov", value: 8.3 },
      { date: "Dec", value: 8.2 },
      { date: "Jan", value: 8.3 },
      { date: "Feb", value: 8.2 },
    ]
  },
  {
    id: "plant-availability",
    name: "Plant Availability",
    shortName: "Plant Avail",
    category: "Operational",
    description: "Percentage of time the plant was available to generate power, excluding external grid outages.",
    frequency: "Daily",
    icon: Activity,
    color: "#6366F1",
    currentValue: 97.8,
    target: 95.0,
    unit: "%",
    status: "good",
    trend: "up",
    trendValue: +2.9,
    formula: {
      expression: "\\frac{Total Period - (Breakdown + PM)}{Total Period} \\times 100",
      inputs: [
        { label: "Total Period", variable: "T_total", value: "672", unit: "Hours", source: "System" },
        { label: "Breakdown Hours", variable: "T_bd", value: "12.5", unit: "Hours", source: "O&M Log" },
        { label: "PM Hours", variable: "T_pm", value: "8.0", unit: "Hours", source: "O&M Log" },
      ],
      steps: [
        { step: "Calculate Total Downtime", formula: "T_bd + T_pm", value: "20.5 Hours" },
        { step: "Calculate Available Time", formula: "T_total - Downtime", value: "651.5 Hours" },
        { step: "Final Percentage", formula: "(Available / Total) × 100", value: "96.96%" },
      ],
    },
    history: [
      { date: "Aug", value: 96.5 },
      { date: "Sep", value: 96.8 },
      { date: "Oct", value: 97.2 },
      { date: "Nov", value: 97.0 },
      { date: "Dec", value: 96.7 },
      { date: "Jan", value: 97.5 },
      { date: "Feb", value: 97.8 },
    ]
  },
  {
    id: "ld-exposure",
    name: "Liquidated Damages Exposure",
    shortName: "LD Exposure",
    category: "Financial",
    description: "Estimated penalty for non-performance based on contractual obligations.",
    frequency: "Monthly",
    icon: AlertTriangle,
    color: "#EF4444",
    currentValue: 2.4,
    target: 0.0,
    unit: "₹ Lakhs",
    status: "critical",
    trend: "up", // Up is bad for cost/risk usually, but here we show it numerically
    trendValue: +12.5, // increased risk
    formula: {
      expression: "(Target - Actual) \\\\times LD Rate",
      inputs: [
        { label: "Contractual Target", variable: "E_target", value: "4700", unit: "MWh", source: "Contract DB" },
        { label: "Actual Generation", variable: "E_act", value: "4485.2", unit: "MWh", source: "JMR Data" },
        { label: "LD Rate", variable: "R_ld", value: "0.01", unit: "₹/kWh", source: "Contract DB" },
      ],
      steps: [
        { step: "Calculate Shortfall", formula: "E_target - E_act", value: "214.8 MWh" },
        { step: "Convert Units", formula: "214.8 MWh × 1000", value: "214,800 kWh" },
        { step: "Calculate LD", formula: "Shortfall_kWh × R_ld", value: "₹ 2,148" },
      ],
    },
    history: [
      { date: "Aug", value: 2.1 },
      { date: "Sep", value: 2.2 },
      { date: "Oct", value: 2.5 },
      { date: "Nov", value: 2.3 },
      { date: "Dec", value: 2.8 },
      { date: "Jan", value: 2.6 },
      { date: "Feb", value: 2.4 },
    ]
  },
  {
    id: "revenue-realization",
    name: "Revenue Realization",
    shortName: "Revenue",
    category: "Financial",
    description: "Total revenue generated from energy sales in the billing period based on actual generation and tariff rates.",
    frequency: "Monthly",
    icon: DollarSign,
    color: "#10B981",
    currentValue: 42.85,
    target: 45.0,
    unit: "₹ Lakhs",
    status: "warning",
    trend: "down",
    trendValue: -4.8,
    formula: {
      expression: "\\\\frac{Energy Generated \\\\times Tariff Rate}{1000}",
      inputs: [
        { label: "Energy Generated", variable: "E_gen", value: "4485.2", unit: "MWh", source: "JMR Data" },
        { label: "Tariff Rate", variable: "T_rate", value: "9.55", unit: "₹/kWh", source: "Contract DB" },
        { label: "Grid Charges", variable: "C_grid", value: "0.85", unit: "₹ Lakhs", source: "Finance Module" },
      ],
      steps: [
        { step: "Convert to kWh", formula: "E_gen × 1000", value: "4,485,200 kWh" },
        { step: "Calculate Gross Revenue", formula: "Energy_kWh × T_rate", value: "₹ 42,823,460" },
        { step: "Deduct Grid Charges", formula: "Gross - C_grid", value: "₹ 42.85 Lakhs" },
      ],
    },
    history: [
      { date: "Aug", value: 43.2 },
      { date: "Sep", value: 44.1 },
      { date: "Oct", value: 45.5 },
      { date: "Nov", value: 44.8 },
      { date: "Dec", value: 43.9 },
      { date: "Jan", value: 44.3 },
      { date: "Feb", value: 42.85 },
    ]
  },
  {
    id: "degradation-ratio",
    name: "Degradation Ratio",
    shortName: "Degradation",
    category: "Technical",
    description: "Annual degradation rate of photovoltaic modules measured as the percentage decline in energy output compared to baseline performance.",
    frequency: "Annual",
    icon: TrendingDown,
    color: "#F59E0B",
    currentValue: 0.65,
    target: 0.70,
    unit: "%/year",
    status: "good",
    trend: "down", // Lower degradation is better
    trendValue: -7.1,
    formula: {
      expression: "\\\\frac{Baseline Output - Current Output}{Baseline Output \\\\times Years} \\\\times 100",
      inputs: [
        { label: "Baseline Output (Year 1)", variable: "E_baseline", value: "12500", unit: "MWh", source: "Master Data" },
        { label: "Current Annual Output", variable: "E_current", value: "12175", unit: "MWh", source: "JMR Data" },
        { label: "Years in Operation", variable: "Y_ops", value: "4", unit: "Years", source: "System" },
      ],
      steps: [
        { step: "Calculate Total Degradation", formula: "E_baseline - E_current", value: "325 MWh" },
        { step: "Calculate % Degradation", formula: "(Total_Deg / E_baseline) × 100", value: "2.6%" },
        { step: "Annual Degradation Rate", formula: "% Degradation / Years", value: "0.65%/year" },
      ],
    },
    history: [
      { date: "2021", value: 0.50 },
      { date: "2022", value: 0.58 },
      { date: "2023", value: 0.62 },
      { date: "2024", value: 0.65 },
      { date: "2025", value: 0.65 },
      { date: "2026", value: 0.65 },
    ]
  }
];

// --- Helper Functions ---

const getStatusColor = (status: KPIData["status"]) => {
  switch (status) {
    case "good": return "text-emerald-600 bg-emerald-50 border-emerald-200";
    case "warning": return "text-amber-600 bg-amber-50 border-amber-200";
    case "critical": return "text-rose-600 bg-rose-50 border-rose-200";
    default: return "text-slate-600 bg-slate-50 border-slate-200";
  }
};

const getStatusBadge = (status: KPIData["status"]) => {
  switch (status) {
    case "good": return "On Track";
    case "warning": return "Warning";
    case "critical": return "Critical";
    default: return "Unknown";
  }
};

// --- Sub-components ---

const KPISidebarItem = ({ kpi, isSelected, onClick }: { kpi: KPIData; isSelected: boolean; onClick: () => void }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01, backgroundColor: isSelected ? "#f1f5f9" : "#f8fafc" }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl mb-3 transition-all duration-200 border ${
        isSelected 
          ? "bg-slate-100 border-blue-600 shadow-sm ring-1 ring-blue-600/20" 
          : "bg-white border-slate-200 hover:border-slate-300"
      }`}
      style={{ backgroundColor: isSelected ? "#f1f5f9" : "#ffffff" }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${isSelected ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
            <kpi.icon size={18} />
          </div>
          <span className={`text-sm font-semibold ${isSelected ? "text-blue-900" : "text-slate-700"}`}>
            {kpi.shortName}
          </span>
        </div>
        <Badge variant="outline" className={`text-xs ${getStatusColor(kpi.status)}`}>
          {getStatusBadge(kpi.status)}
        </Badge>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-slate-900">
            {kpi.currentValue}
            <span className="text-sm font-medium text-slate-500 ml-1">{kpi.unit}</span>
          </div>
        </div>
        <div className={`flex items-center text-xs font-medium ${kpi.trend === "up" ? "text-emerald-600" : kpi.trend === "down" ? "text-rose-600" : "text-slate-600"}`}>
           {kpi.trend === "up" ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
           {kpi.trendValue > 0 ? "+" : ""}{kpi.trendValue}%
        </div>
      </div>
    </motion.button>
  );
};

const FormulaVisualizer = ({ expression }: { expression: string }) => {
  // Simple visualizer that replaces latex-like syntax with HTML for this demo
  // In a real app, use 'react-katex' or similar.
  // We'll do a simple parsing for fractions to look nice.
  
  const parts = expression.split("\\frac");
  
  if (parts.length > 1) {
    // Basic rendering for the demo to look "mathy"
    return (
      <div className="font-mono text-lg text-slate-800 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center min-h-[120px]">
        {parts.map((part, i) => {
          if (i === 0) return part;
          const content = part.match(/{([^}]*)}{([^}]*)}/);
          if (content) {
            const [full, num, den] = content;
            const remainder = part.replace(full, "");
            return (
              <div key={i} className="flex items-center mx-2">
                <div className="flex flex-col items-center text-center">
                  <span className="border-b-2 border-slate-800 px-2 pb-1 mb-1 block w-full">{num.replace(/\\times/g, "×")}</span>
                  <span className="px-2 pt-1 block w-full">{den.replace(/\\times/g, "×")}</span>
                </div>
                <span className="ml-2">{remainder.replace(/\\times/g, "×")}</span>
              </div>
            );
          }
          return part;
        })}
      </div>
    );
  }

  return (
    <div className="font-mono text-lg text-slate-800 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center min-h-[120px]">
      {expression.replace(/\\times/g, "×")}
    </div>
  );
};

// --- Main Component ---

export function KPIEngine() {
  const [selectedKPI, setSelectedKPI] = useState<KPIData>(kpiList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedFormula, setEditedFormula] = useState("");
  const [isAdmin] = useState(true); // Mock admin status - in real app, get from auth context

  const filteredKPIs = kpiList.filter(kpi => 
    kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    kpi.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Initialize edited formula when KPI changes
  const handleKPIChange = (kpi: KPIData) => {
    setSelectedKPI(kpi);
    setEditedFormula(kpi.formula.expression);
    setIsEditMode(false);
  };

  const handleEditFormula = () => {
    setIsEditMode(true);
    setEditedFormula(selectedKPI.formula.expression);
  };

  const handleSaveFormula = () => {
    // In a real app, save to backend
    console.log("Formula saved:", editedFormula);
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedFormula(selectedKPI.formula.expression);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-50 overflow-hidden font-sans">
      
      {/* LEFT SIDEBAR - KPI LIST */}
      <div className="w-[380px] flex flex-col border-r border-slate-200 bg-white h-full shadow-lg z-10">
        <div className="p-6 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#0B3C5D] rounded-lg">
              <Calculator className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">KPI Engine</h1>
              <p className="text-xs text-slate-500 font-medium">Governance & Compliance</p>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              placeholder="Search KPIs..." 
              className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="flex-1 px-4 py-4 bg-slate-50/50">
          <div className="space-y-1">
            {filteredKPIs.length > 0 ? (
              filteredKPIs.map(kpi => (
                <KPISidebarItem 
                  key={kpi.id} 
                  kpi={kpi} 
                  isSelected={selectedKPI.id === kpi.id} 
                  onClick={() => handleKPIChange(kpi)}
                />
              ))
            ) : (
              <div className="text-center py-10 text-slate-400">
                <p>No KPIs found</p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-slate-200 bg-white">
          <Button variant="outline" className="w-full justify-between text-slate-600" size="sm">
            <span>Filter by Category</span>
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* RIGHT MAIN CONTENT - DETAILS */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 relative">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />

        <div className="flex-1 overflow-y-auto p-8">
          <motion.div
            key={selectedKPI.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto space-y-8"
          >
            {/* Header Section */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none px-3 py-1">
                    {selectedKPI.category}
                  </Badge>
                  <Badge variant="outline" className="text-slate-500 border-slate-300">
                    {selectedKPI.frequency} Update
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{selectedKPI.name}</h1>
                <p className="text-slate-600 max-w-3xl text-lg">{selectedKPI.description}</p>
              </div>
              <div className="flex gap-2">
                 <Button variant="outline" className="gap-2 bg-white">
                  <History className="w-4 h-4" /> History
                </Button>
                <Button className="gap-2 bg-[#0B3C5D] hover:bg-[#082a42] text-white">
                  <Download className="w-4 h-4" /> Export Report
                </Button>
              </div>
            </div>

            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-none shadow-md bg-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#0B3C5D]" />
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-slate-500 mb-1">Current Performance</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900">{selectedKPI.currentValue}</span>
                    <span className="text-lg text-slate-500 font-medium">{selectedKPI.unit}</span>
                  </div>
                  <div className={`flex items-center mt-2 text-sm font-medium ${selectedKPI.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                    {selectedKPI.trend === "up" ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    {selectedKPI.trendValue > 0 ? "+" : ""}{selectedKPI.trendValue}% vs last month
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#F4B400]" />
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-slate-500 mb-1">Target Benchmark</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900">{selectedKPI.target}</span>
                    <span className="text-lg text-slate-500 font-medium">{selectedKPI.unit}</span>
                  </div>
                  <div className="mt-2 text-sm text-slate-600 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    Based on Contractual Agreement
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-300" />
                <CardContent className="p-0 h-full">
                  <div className="p-6 pb-2">
                    <p className="text-sm font-medium text-slate-500 mb-1">Performance Trend</p>
                  </div>
                  <div className="h-24 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={selectedKPI.history}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={selectedKPI.color} stopOpacity={0.3}/>
                              <stop offset="95%" stopColor={selectedKPI.color} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="value" stroke={selectedKPI.color} fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator />

            {/* Formula & Calculation Engine */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Logic & Inputs */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* 1. Formula Expression */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">1</div>
                      <h2 className="text-xl font-bold text-slate-900">Computation Logic</h2>
                    </div>
                    {isAdmin && !isEditMode && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-2 text-[#0B3C5D] border-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white" 
                        onClick={handleEditFormula}
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Formula
                      </Button>
                    )}
                  </div>
                  {isEditMode ? (
                    <Card className="border-2 border-[#0B3C5D] shadow-lg bg-white">
                      <CardHeader className="bg-blue-50 border-b border-blue-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-[#0B3C5D]" />
                            <span className="text-sm font-semibold text-[#0B3C5D]">Formula Editor (Admin Mode)</span>
                          </div>
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
                            Requires Audit Approval
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Formula Expression (LaTeX Format)</label>
                            <textarea
                              value={editedFormula}
                              onChange={(e) => setEditedFormula(e.target.value)}
                              className="w-full min-h-[120px] px-4 py-3 bg-white border-2 border-slate-200 rounded-lg font-mono text-sm focus:border-[#0B3C5D] focus:ring-2 focus:ring-[#0B3C5D]/20 outline-none resize-none"
                              placeholder="Enter formula in LaTeX format..."
                            />
                          </div>
                          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="text-xs font-medium text-slate-600 mb-2">Preview:</p>
                            <FormulaVisualizer expression={editedFormula} />
                          </div>
                          <div className="flex gap-3 justify-end pt-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="gap-2" 
                              onClick={handleCancelEdit}
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </Button>
                            <Button 
                              size="sm" 
                              className="gap-2 bg-[#0B3C5D] hover:bg-[#082a42] text-white" 
                              onClick={handleSaveFormula}
                            >
                              <Save className="w-4 h-4" />
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <FormulaVisualizer expression={selectedKPI.formula.expression} />
                  )}
                </section>

                {/* 2. Input Parameters Table */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">2</div>
                    <h2 className="text-xl font-bold text-slate-900">Input Parameters</h2>
                  </div>
                  
                  <Card className="overflow-hidden border-slate-200 shadow-sm">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead className="w-[200px]">Parameter Name</TableHead>
                          <TableHead>Variable</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead className="text-right">Current Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedKPI.formula.inputs.map((input, idx) => (
                          <TableRow key={idx} className="hover:bg-slate-50/50">
                            <TableCell className="font-medium text-slate-900">{input.label}</TableCell>
                            <TableCell>
                              <code className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-mono">{input.variable}</code>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Database className="w-3 h-3 text-slate-400" />
                                <span className="text-slate-600 text-sm">{input.source}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className="font-bold text-slate-900">{input.value}</span> 
                              <span className="text-slate-500 text-sm ml-1">{input.unit}</span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="bg-blue-50/50 p-3 border-t border-blue-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-blue-700">
                        <Info className="w-4 h-4" />
                        <span>Parameters are fetched automatically from the Data Lake.</span>
                      </div>
                      <Button size="sm" variant="ghost" className="text-blue-700 hover:text-blue-800 hover:bg-blue-100">
                        <RefreshCw className="w-3 h-3 mr-2" />
                        Refresh Data
                      </Button>
                    </div>
                  </Card>
                </section>
                
                {/* 3. Step-by-Step Breakdown */}
                <section>
                   <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">3</div>
                    <h2 className="text-xl font-bold text-slate-900">Step-by-Step Execution</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {selectedKPI.formula.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-emerald-500 mt-1" />
                          {idx !== selectedKPI.formula.steps.length - 1 && (
                            <div className="w-0.5 h-full bg-emerald-200 my-1" />
                          )}
                        </div>
                        <Card className="flex-1 p-4 border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                             <div>
                               <h3 className="font-semibold text-slate-900 text-sm mb-1">{step.step}</h3>
                               {step.formula && (
                                 <code className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{step.formula}</code>
                               )}
                             </div>
                             <div className="text-right">
                               <span className="text-lg font-bold text-emerald-700">{step.value}</span>
                             </div>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </section>

              </div>

              {/* Right Column: Actions & Meta */}
              <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <PlayCircle className="text-yellow-400" />
                      Simulator
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      Run "What-If" scenarios by modifying input parameters temporarily.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedKPI.formula.inputs.map((input, idx) => (
                      <div key={idx} className="space-y-1">
                        <label className="text-xs text-slate-400">{input.label} ({input.unit})</label>
                        <Input 
                          defaultValue={input.value} 
                          className="bg-slate-800 border-slate-700 text-white focus:ring-yellow-400 focus:border-yellow-400"
                        />
                      </div>
                    ))}
                    <Button className="w-full bg-[#F4B400] hover:bg-yellow-500 text-black font-bold mt-2">
                      Recalculate KPI
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                     <CardTitle className="text-base">Metadata</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Last Calculated</span>
                      <span className="font-medium">Today, 10:30 AM</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Data Quality Score</span>
                      <span className="font-medium text-emerald-600">98% (High)</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Owner</span>
                      <span className="font-medium">Asset Mgmt. Team</span>
                    </div>
                     <div className="flex justify-between">
                      <span className="text-slate-500">Sign-off Required</span>
                      <span className="font-medium">No</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
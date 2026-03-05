import { useState, useRef } from "react";
import { PageExportMenu } from "../components/PageExportMenu";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import {
  AlertTriangle,
  Power,
  Wrench,
  Cloud,
  Filter,
  TrendingDown,
  TrendingUp,
  Calendar,
  Zap,
  AlertCircle,
  CheckCircle,
  XCircle,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { CustomChartTooltip } from "../components/ChartTooltip";

// Downtime categorization data
const downtimeCategories = [
  { 
    id: "grid-outage",
    name: "Grid Outage", 
    incidents: 42, 
    hours: 156.5, 
    energyLoss: 1250, 
    color: "#EF4444",
    icon: Power,
  },
  { 
    id: "equipment-failure",
    name: "Equipment Failure", 
    incidents: 28, 
    hours: 98.3, 
    energyLoss: 890, 
    color: "#F59E0B",
    icon: AlertTriangle,
  },
  { 
    id: "planned-shutdown",
    name: "Planned Shutdown", 
    incidents: 15, 
    hours: 45.2, 
    energyLoss: 420, 
    color: "#10B981",
    icon: CheckCircle,
  },
  { 
    id: "force-majeure",
    name: "Force Majeure", 
    incidents: 8, 
    hours: 28.4, 
    energyLoss: 280, 
    color: "#6366F1",
    icon: Cloud,
  },
];

// Waterfall chart data: Budgeted → Expected → Actual → Evacuated
const waterfallData = [
  { name: "Budgeted Generation", value: 5200, cumulative: 5200, fill: "#0A2E4A" },
  { name: "Grid Curtailment", value: -180, cumulative: 5020, fill: "#EF4444" },
  { name: "Equipment Loss", value: -245, cumulative: 4775, fill: "#F59E0B" },
  { name: "Planned Shutdown", value: -125, cumulative: 4650, fill: "#10B981" },
  { name: "Force Majeure", value: -95, cumulative: 4555, fill: "#6366F1" },
  { name: "Expected Generation", value: 4555, cumulative: 4555, fill: "#0A2E4A" },
  { name: "Additional Loss", value: -70, cumulative: 4485, fill: "#DC2626" },
  { name: "Actual Generation", value: 4485, cumulative: 4485, fill: "#059669" },
  { name: "Auxiliary Consumption", value: -35, cumulative: 4450, fill: "#9333EA" },
  { name: "Net Evacuated", value: 4450, cumulative: 4450, fill: "#0A2E4A" },
];

// Loss bucketing table
const lossBuckets = [
  { 
    category: "Grid Outage Loss",
    budgeted: 150,
    actual: 180,
    variance: 30,
    variancePct: 20.0,
    impact: "high",
  },
  { 
    category: "Equipment Loss",
    budgeted: 200,
    actual: 245,
    variance: 45,
    variancePct: 22.5,
    impact: "high",
  },
  { 
    category: "Planned Shutdown",
    budgeted: 120,
    actual: 125,
    variance: 5,
    variancePct: 4.2,
    impact: "low",
  },
  { 
    category: "Force Majeure",
    budgeted: 80,
    actual: 95,
    variance: 15,
    variancePct: 18.8,
    impact: "medium",
  },
  { 
    category: "Auxiliary Consumption",
    budgeted: 40,
    actual: 35,
    variance: -5,
    variancePct: -12.5,
    impact: "positive",
  },
];

// MoM comparison data
const momData = [
  { month: "Aug", budgeted: 5100, actual: 4820, loss: 280 },
  { month: "Sep", budgeted: 5150, actual: 4890, loss: 260 },
  { month: "Oct", budgeted: 5200, actual: 4950, loss: 250 },
  { month: "Nov", budgeted: 5180, actual: 4910, loss: 270 },
  { month: "Dec", budgeted: 5220, actual: 4880, loss: 340 },
  { month: "Jan", budgeted: 5200, actual: 4920, loss: 280 },
  { month: "Feb", budgeted: 5200, actual: 4485, loss: 715 },
];

// YoY comparison data
const yoyData = [
  { month: "Feb 2024", actual: 4750 },
  { month: "Feb 2025", actual: 4680 },
  { month: "Feb 2026", actual: 4485 },
];

// YTD monthly loss by category (Apr → Feb, FY 2025-26)
const ytdMonthlyLossData = [
  { month: "Apr", gridOutage: 95,  equipFailure: 68,  plannedShutdown: 35, forceMajeure: 15, spylTotal: 195 },
  { month: "May", gridOutage: 110, equipFailure: 72,  plannedShutdown: 42, forceMajeure: 18, spylTotal: 228 },
  { month: "Jun", gridOutage: 130, equipFailure: 85,  plannedShutdown: 38, forceMajeure: 22, spylTotal: 262 },
  { month: "Jul", gridOutage: 155, equipFailure: 92,  plannedShutdown: 45, forceMajeure: 28, spylTotal: 305 },
  { month: "Aug", gridOutage: 180, equipFailure: 98,  plannedShutdown: 50, forceMajeure: 32, spylTotal: 340 },
  { month: "Sep", gridOutage: 165, equipFailure: 88,  plannedShutdown: 38, forceMajeure: 25, spylTotal: 310 },
  { month: "Oct", gridOutage: 120, equipFailure: 75,  plannedShutdown: 45, forceMajeure: 20, spylTotal: 255 },
  { month: "Nov", gridOutage: 140, equipFailure: 82,  plannedShutdown: 38, forceMajeure: 22, spylTotal: 270 },
  { month: "Dec", gridOutage: 160, equipFailure: 95,  plannedShutdown: 55, forceMajeure: 30, spylTotal: 328 },
  { month: "Jan", gridOutage: 135, equipFailure: 78,  plannedShutdown: 40, forceMajeure: 22, spylTotal: 262 },
  { month: "Feb", gridOutage: 180, equipFailure: 110, plannedShutdown: 48, forceMajeure: 35, spylTotal: 310 },
];

// YTD summary vs Same Period Last Year (SPYL)
const ytdSummaryRows = [
  { category: "Grid Outage",       color: "#EF4444", ytdHours: 156.5, ytdMWh: 1250, revenue: "₹2.50 Cr", spylMWh: 1130, changePct: +10.6 },
  { category: "Equipment Failure", color: "#F59E0B", ytdHours:  98.3, ytdMWh:  890, revenue: "₹1.78 Cr", spylMWh:  798, changePct: +11.5 },
  { category: "Planned Shutdown",  color: "#10B981", ytdHours:  45.2, ytdMWh:  420, revenue: "₹0.84 Cr", spylMWh:  480, changePct: -12.5 },
  { category: "Force Majeure",     color: "#6366F1", ytdHours:  28.4, ytdMWh:  280, revenue: "₹0.56 Cr", spylMWh:  195, changePct: +43.6 },
];

// Pareto analysis (80/20 rule)
const paretoData = [
  { cause: "Grid Instability", incidents: 42, energyLoss: 1250, cumPct: 43.2 },
  { cause: "Inverter Failure", incidents: 18, energyLoss: 580, cumPct: 63.3 },
  { cause: "Transformer Issue", incidents: 10, energyLoss: 310, cumPct: 74.0 },
  { cause: "String Fault", incidents: 8, energyLoss: 245, cumPct: 82.5 },
  { cause: "Communication Loss", incidents: 6, energyLoss: 180, cumPct: 88.7 },
  { cause: "Weather", incidents: 8, energyLoss: 280, cumPct: 98.4 },
  { cause: "Others", incidents: 5, energyLoss: 45, cumPct: 100.0 },
];

// Gantt timeline data (last 7 days)
const ganttData = [
  { 
    date: "2026-02-22",
    events: [
      { id: 1, type: "Grid Outage", start: 8, duration: 3, plant: "Plant A" },
      { id: 2, type: "Equipment Failure", start: 14, duration: 2, plant: "Plant C" },
    ]
  },
  { 
    date: "2026-02-23",
    events: [
      { id: 3, type: "Planned Shutdown", start: 10, duration: 6, plant: "Plant B" },
    ]
  },
  { 
    date: "2026-02-24",
    events: [
      { id: 4, type: "Force Majeure", start: 16, duration: 2, plant: "Plant D" },
      { id: 5, type: "Grid Outage", start: 6, duration: 4, plant: "Plant A" },
    ]
  },
  { 
    date: "2026-02-25",
    events: [
      { id: 6, type: "Equipment Failure", start: 12, duration: 5, plant: "Plant C" },
    ]
  },
  { 
    date: "2026-02-26",
    events: [
      { id: 7, type: "Grid Outage", start: 8, duration: 2, plant: "Plant A" },
      { id: 8, type: "Equipment Failure", start: 14, duration: 4, plant: "Plant C" },
    ]
  },
  { 
    date: "2026-02-27",
    events: []
  },
  { 
    date: "2026-02-28",
    events: [
      { id: 9, type: "Planned Shutdown", start: 9, duration: 8, plant: "Plant B" },
    ]
  },
];

const getEventColor = (type: string) => {
  switch (type) {
    case "Grid Outage": return "#EF4444";
    case "Equipment Failure": return "#F59E0B";
    case "Planned Shutdown": return "#10B981";
    case "Force Majeure": return "#6366F1";
    default: return "#6B7280";
  }
};

export function OutageLossAnalytics() {
  const [rootCauseFilter, setRootCauseFilter] = useState("all");
  const [plantFilter, setPlantFilter] = useState("all");
  const pageRef = useRef<HTMLDivElement>(null);

  const totalLoss = downtimeCategories.reduce((sum, cat) => sum + cat.energyLoss, 0);

  return (
    <div ref={pageRef} className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-white border-b-2 border-slate-200 shadow-sm shrink-0 z-20 sticky top-0">
        <div className="px-6 py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-[#0A2E4A] rounded-lg">
                <TrendingDown className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900 leading-none">Outage & Loss Analytics</h1>
                <p className="text-xs text-slate-600 mt-0.5">Comprehensive loss analysis with root cause classification and deviation tracking</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PageExportMenu
                pageTitle="Outage & Loss Analytics"
                contentRef={pageRef}
                variant="navy"
                label="Export Report"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-medium text-slate-900">Filters:</span>
            </div>
            <div className="w-44">
              <Select value={rootCauseFilter} onValueChange={setRootCauseFilter}>
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue placeholder="Root Cause" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="grid">Grid Outage</SelectItem>
                  <SelectItem value="equipment">Equipment Failure</SelectItem>
                  <SelectItem value="planned">Planned Shutdown</SelectItem>
                  <SelectItem value="force-majeure">Force Majeure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-44">
              <Select value={plantFilter} onValueChange={setPlantFilter}>
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue placeholder="Plant Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plants</SelectItem>
                  <SelectItem value="plant-a">Plant A - 10MW</SelectItem>
                  <SelectItem value="plant-b">Plant B - 25MW</SelectItem>
                  <SelectItem value="plant-c">Plant C - 50MW</SelectItem>
                  <SelectItem value="plant-d">Plant D - 30MW</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" className="h-7 px-3 text-xs">Reset</Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
      {/* Downtime Categorization Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {downtimeCategories.map((category) => {
          const Icon = category.icon;
          const percentage = ((category.energyLoss / totalLoss) * 100).toFixed(1);
          
          return (
            <Card key={category.id} className="border-2 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: category.color }} />
                  </div>
                  <Badge 
                    className="text-xs font-semibold"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    {percentage}%
                  </Badge>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{category.name}</h3>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Incidents:</span>
                    <span className="font-bold text-gray-900">{category.incidents}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Total Hours:</span>
                    <span className="font-bold text-gray-900">{category.hours.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Energy Loss:</span>
                    <span className="font-bold" style={{ color: category.color }}>
                      {category.energyLoss} MWh
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Waterfall Chart: Budgeted → Expected → Actual → Evacuated */}
      <Card className="mb-8">
        <CardHeader className="border-b">
          <CardTitle className="text-base font-semibold">Energy Loss Waterfall Analysis</CardTitle>
          <p className="text-xs text-gray-600 mt-1">
            Budgeted Generation → Expected → Actual → Net Evacuated (MWh)
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={waterfallData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                angle={-15} 
                textAnchor="end" 
                height={100}
                tick={{ fontSize: 11 }} 
                stroke="#6B7280" 
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
              <Tooltip content={<CustomChartTooltip unit="MWh" />} />
              <Bar dataKey="value" stackId="a">
                {waterfallData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
              <Line 
                type="stepAfter" 
                dataKey="cumulative" 
                stroke="#0A2E4A" 
                strokeWidth={2}
                dot={{ fill: "#0A2E4A", r: 4 }}
                name="Cumulative"
              />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-xs text-gray-600 mb-1">Budgeted</div>
                <div className="text-xl font-bold text-gray-900">5,200</div>
                <div className="text-xs text-gray-500">MWh</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Total Loss</div>
                <div className="text-xl font-bold text-red-600">-645</div>
                <div className="text-xs text-gray-500">MWh</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Expected</div>
                <div className="text-xl font-bold text-gray-900">4,555</div>
                <div className="text-xs text-gray-500">MWh</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Actual</div>
                <div className="text-xl font-bold text-green-600">4,485</div>
                <div className="text-xs text-gray-500">MWh</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Net Evacuated</div>
                <div className="text-xl font-bold" style={{ color: "#0A2E4A" }}>4,450</div>
                <div className="text-xs text-gray-500">MWh</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loss Bucketing Table */}
      <Card className="mb-8">
        <CardHeader className="border-b">
          <CardTitle className="text-base font-semibold">Loss Bucketing & Variance Analysis</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Loss Category</TableHead>
                <TableHead className="text-right font-semibold">Budgeted (MWh)</TableHead>
                <TableHead className="text-right font-semibold">Actual (MWh)</TableHead>
                <TableHead className="text-right font-semibold">Variance (MWh)</TableHead>
                <TableHead className="text-right font-semibold">Variance %</TableHead>
                <TableHead className="font-semibold">Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lossBuckets.map((bucket, idx) => {
                const isNegative = bucket.variance > 0;
                const isPositive = bucket.variance < 0;
                
                return (
                  <TableRow 
                    key={idx}
                    className={
                      bucket.impact === "high" 
                        ? "bg-red-50" 
                        : bucket.impact === "medium"
                        ? "bg-yellow-50"
                        : bucket.impact === "positive"
                        ? "bg-green-50"
                        : ""
                    }
                  >
                    <TableCell className="font-semibold text-gray-900">{bucket.category}</TableCell>
                    <TableCell className="text-right font-mono">{bucket.budgeted}</TableCell>
                    <TableCell className="text-right font-mono font-semibold">{bucket.actual}</TableCell>
                    <TableCell className="text-right font-mono">
                      <span className={isNegative ? "text-red-600" : isPositive ? "text-green-600" : "text-gray-900"}>
                        {bucket.variance > 0 ? "+" : ""}{bucket.variance}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      <span className={isNegative ? "text-red-600" : isPositive ? "text-green-600" : "text-gray-900"}>
                        {bucket.variancePct > 0 ? "+" : ""}{bucket.variancePct.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          bucket.impact === "high"
                            ? "bg-red-100 text-red-800"
                            : bucket.impact === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : bucket.impact === "positive"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {bucket.impact === "positive" ? "Favorable" : bucket.impact.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* MoM and YoY Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* MoM Comparison */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base font-semibold">Month-over-Month (MoM) Comparison</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={momData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6B7280" />
                <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
                <Tooltip content={<CustomChartTooltip unit="MWh" />} />
                <Legend />
                <Bar dataKey="budgeted" fill="#0A2E4A" name="Budgeted (MWh)" />
                <Bar dataKey="actual" fill="#10B981" name="Actual (MWh)" />
                <Line 
                  type="monotone" 
                  dataKey="loss" 
                  stroke="#EF4444" 
                  strokeWidth={2} 
                  name="Loss (MWh)"
                  yAxisId={0}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* YoY Comparison */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base font-semibold">Year-over-Year (YoY) Comparison</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yoyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6B7280" />
                <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" domain={[4000, 5000]} />
                <Tooltip content={<CustomChartTooltip unit="MWh" />} />
                <Bar dataKey="actual" name="Actual Generation (MWh)">
                  {yoyData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? "#6366F1" : index === 1 ? "#F59E0B" : "#EF4444"} 
                    />
                  ))}
                </Bar>
                <ReferenceLine y={4750} stroke="#0A2E4A" strokeDasharray="3 3" label="Baseline" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-around">
              <div className="text-center">
                <div className="text-xs text-gray-600">YoY Change</div>
                <div className="text-lg font-bold text-red-600 flex items-center justify-center gap-1 mt-1">
                  <TrendingDown className="w-4 h-4" />
                  -5.6%
                </div>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div className="text-center">
                <div className="text-xs text-gray-600">2-Year Decline</div>
                <div className="text-lg font-bold text-red-600 flex items-center justify-center gap-1 mt-1">
                  <TrendingDown className="w-4 h-4" />
                  -265 MWh
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── YTD Loss Comparison ─────────────────────────────────────────── */}
      <Card className="mb-8 border-2 border-slate-200">
        <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-[#0A2E4A] to-[#0A2E4A]/80 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-white" />
              <CardTitle className="text-base font-semibold text-white">
                Year-to-Date (YTD) Loss Comparison — FY 2025-26
              </CardTitle>
            </div>
            <span className="text-xs text-blue-200 font-medium">Apr 2025 – Feb 2026 &nbsp;·&nbsp; 11 months</span>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">

          {/* ── KPI summary strip ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "YTD Total Hours Lost", value: "328.4 hrs", sub: "vs 298.5 SPYL", delta: +10.0, icon: Calendar },
              { label: "YTD Energy Loss",       value: "2,840 MWh", sub: "vs 2,603 SPYL", delta: +9.1,  icon: Zap },
              { label: "YTD Revenue Impact",    value: "₹5.68 Cr",  sub: "lost generation", delta: null, icon: TrendingDown },
              { label: "Worst Category YTD",    value: "Grid Outage", sub: "44% of total loss", delta: null, icon: AlertCircle },
            ].map(({ label, value, sub, delta, icon: Icon }) => (
              <div key={label} className="p-4 rounded-xl border-2 border-slate-100 bg-slate-50 flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
                </div>
                <span className="text-xl font-bold text-slate-900">{value}</span>
                <div className="flex items-center gap-1">
                  {delta !== null ? (
                    delta > 0 ? (
                      <ArrowUpRight className="w-3.5 h-3.5 text-rose-500" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5 text-emerald-500" />
                    )
                  ) : (
                    <Minus className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span className={`text-xs font-semibold ${
                    delta === null ? "text-slate-500"
                    : delta > 0   ? "text-rose-600"
                    : "text-emerald-600"
                  }`}>
                    {delta !== null ? `${delta > 0 ? "+" : ""}${delta}% vs SPYL` : sub}
                  </span>
                  {delta !== null && (
                    <span className="text-xs text-slate-400 ml-0.5">&nbsp;· {sub}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Stacked bar + SPYL line chart ── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-slate-800">Monthly Loss by Category (MWh) vs Same Period Last Year</h4>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm bg-[#EF4444]" />Grid Outage</span>
                <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm bg-[#F59E0B]" />Equipment Failure</span>
                <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm bg-[#10B981]" />Planned Shutdown</span>
                <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm bg-[#6366F1]" />Force Majeure</span>
                <span className="flex items-center gap-1.5"><span className="inline-block w-8 h-0.5 bg-[#0A2E4A] border-dashed border-t-2 border-[#0A2E4A]" />SPYL Total</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={ytdMonthlyLossData} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#6B7280" />
                <YAxis tick={{ fontSize: 11 }} stroke="#6B7280" unit=" MWh" width={60} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const total = payload.filter(p => p.dataKey !== "spylTotal").reduce((s, p) => s + (Number(p.value) || 0), 0);
                    return (
                      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs min-w-[160px]">
                        <p className="font-bold text-slate-900 mb-2">{label}</p>
                        {payload.map((p: any) => p.dataKey !== "spylTotal" && (
                          <div key={p.dataKey} className="flex justify-between gap-4 mb-1">
                            <span style={{ color: p.fill }} className="font-medium">{p.name}</span>
                            <span className="font-mono font-semibold">{p.value} MWh</span>
                          </div>
                        ))}
                        <div className="border-t border-slate-100 mt-1 pt-1 flex justify-between">
                          <span className="font-bold text-slate-700">YTD Total</span>
                          <span className="font-mono font-bold text-slate-900">{total} MWh</span>
                        </div>
                        {payload.find((p: any) => p.dataKey === "spylTotal") && (
                          <div className="flex justify-between mt-1 text-slate-500">
                            <span>SPYL Total</span>
                            <span className="font-mono">{payload.find((p: any) => p.dataKey === "spylTotal")?.value} MWh</span>
                          </div>
                        )}
                      </div>
                    );
                  }}
                />
                <Bar dataKey="gridOutage"      name="Grid Outage"       stackId="a" fill="#EF4444" radius={[0,0,0,0]} />
                <Bar dataKey="equipFailure"    name="Equipment Failure" stackId="a" fill="#F59E0B" />
                <Bar dataKey="plannedShutdown" name="Planned Shutdown"  stackId="a" fill="#10B981" />
                <Bar dataKey="forceMajeure"    name="Force Majeure"     stackId="a" fill="#6366F1" radius={[3,3,0,0]} />
                <Line
                  type="monotone"
                  dataKey="spylTotal"
                  name="SPYL Total"
                  stroke="#0A2E4A"
                  strokeWidth={2}
                  strokeDasharray="5 3"
                  dot={{ r: 3, fill: "#0A2E4A" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* ── YTD vs SPYL summary table ── */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-3">YTD vs Same Period Last Year — Category Breakdown</h4>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-bold text-xs">Category</TableHead>
                    <TableHead className="font-bold text-xs text-right">YTD Hours</TableHead>
                    <TableHead className="font-bold text-xs text-right">YTD Loss (MWh)</TableHead>
                    <TableHead className="font-bold text-xs text-right">SPYL (MWh)</TableHead>
                    <TableHead className="font-bold text-xs text-right">Δ vs SPYL</TableHead>
                    <TableHead className="font-bold text-xs text-right">Revenue Impact</TableHead>
                    <TableHead className="font-bold text-xs text-center">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ytdSummaryRows.map((row) => (
                    <TableRow key={row.category} className="hover:bg-slate-50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="inline-block w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                          <span className="font-semibold text-slate-900 text-sm">{row.category}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">{row.ytdHours.toFixed(1)}</TableCell>
                      <TableCell className="text-right font-mono font-semibold text-sm">{row.ytdMWh.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono text-slate-500 text-sm">{row.spylMWh.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-flex items-center gap-0.5 font-semibold text-sm ${
                          row.changePct < 0 ? "text-emerald-600" : "text-rose-600"
                        }`}>
                          {row.changePct < 0
                            ? <ArrowDownRight className="w-3.5 h-3.5" />
                            : <ArrowUpRight className="w-3.5 h-3.5" />
                          }
                          {row.changePct > 0 ? "+" : ""}{row.changePct.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-slate-700 text-sm">{row.revenue}</TableCell>
                      <TableCell className="text-center">
                        {row.changePct > 20 ? (
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">Critical</span>
                        ) : row.changePct > 0 ? (
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">Elevated</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">Improved</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Totals row */}
                  <TableRow className="bg-slate-100 font-bold border-t-2 border-slate-300">
                    <TableCell className="font-bold text-slate-900">Total</TableCell>
                    <TableCell className="text-right font-mono font-bold">328.4</TableCell>
                    <TableCell className="text-right font-mono font-bold">2,840</TableCell>
                    <TableCell className="text-right font-mono text-slate-600">2,603</TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center gap-0.5 font-bold text-rose-600">
                        <ArrowUpRight className="w-3.5 h-3.5" />+9.1%
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-bold text-slate-900">₹5.68 Cr</TableCell>
                    <TableCell className="text-center">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">Elevated</span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Pareto Analysis */}
      <Card className="mb-8">
        <CardHeader className="border-b">
          <CardTitle className="text-base font-semibold">Pareto Analysis - Root Cause Classification</CardTitle>
          <p className="text-xs text-gray-600 mt-1">
            80/20 Rule: Identify top causes contributing to 80% of energy losses
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={paretoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="cause" 
                angle={-20} 
                textAnchor="end" 
                height={80}
                tick={{ fontSize: 11 }} 
                stroke="#6B7280" 
              />
              <YAxis 
                yAxisId="left" 
                tick={{ fontSize: 12 }} 
                stroke="#6B7280"
                label={{ value: 'Energy Loss (MWh)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                domain={[0, 100]}
                tick={{ fontSize: 12 }} 
                stroke="#6B7280"
                label={{ value: 'Cumulative %', angle: 90, position: 'insideRight', style: { fontSize: 12 } }}
              />
              <Tooltip content={<CustomChartTooltip unit="MWh" />} />
              <Legend />
              <Bar 
                yAxisId="left" 
                dataKey="energyLoss" 
                fill="#0A2E4A" 
                name="Energy Loss (MWh)"
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="cumPct" 
                stroke="#EF4444" 
                strokeWidth={3}
                dot={{ fill: "#EF4444", r: 5 }}
                name="Cumulative %"
              />
              <ReferenceLine yAxisId="right" y={80} stroke="#F59E0B" strokeDasharray="5 5" label="80%" />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-gray-900">Key Insight:</span>
              <span className="text-gray-700">
                Top 4 causes account for <strong className="text-orange-600">82.5%</strong> of total energy losses
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gantt-style Downtime Timeline */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-base font-semibold">Downtime Timeline - Last 7 Days</CardTitle>
          <p className="text-xs text-gray-600 mt-1">
            Gantt-style visualization of outage events across time
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {ganttData.map((day, dayIdx) => (
              <div key={dayIdx}>
                <div className="flex items-center gap-4">
                  {/* Date Label */}
                  <div className="w-28 flex-shrink-0">
                    <div className="text-xs font-semibold text-gray-900">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  
                  {/* Timeline (24 hours) */}
                  <div className="flex-1 relative h-10 bg-gray-100 rounded border border-gray-200">
                    {/* Hour markers */}
                    {[0, 6, 12, 18, 24].map((hour) => (
                      <div
                        key={hour}
                        className="absolute top-0 bottom-0 border-l border-gray-300"
                        style={{ left: `${(hour / 24) * 100}%` }}
                      >
                        <span className="absolute -top-5 -ml-2 text-xs text-gray-500">{hour}</span>
                      </div>
                    ))}
                    
                    {/* Events */}
                    {day.events.map((event) => (
                      <div
                        key={event.id}
                        className="absolute top-1 bottom-1 rounded shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                        style={{
                          left: `${(event.start / 24) * 100}%`,
                          width: `${(event.duration / 24) * 100}%`,
                          backgroundColor: getEventColor(event.type),
                        }}
                        title={`${event.type} - ${event.plant} - ${event.duration}h`}
                      >
                        <div className="h-full flex items-center justify-center px-2">
                          <span className="text-xs font-medium text-white truncate">
                            {event.plant}
                          </span>
                        </div>
                        {/* Tooltip on hover */}
                        <div className="absolute hidden group-hover:block bottom-full left-0 mb-2 p-2 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap z-10">
                          <div className="font-semibold">{event.type}</div>
                          <div>{event.plant}</div>
                          <div>{event.start}:00 - {event.start + event.duration}:00 ({event.duration}h)</div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Empty state */}
                    {day.events.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs text-gray-400">No outages</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-6 flex-wrap">
              <span className="text-xs font-semibold text-gray-700">Legend:</span>
              {downtimeCategories.map((cat) => (
                <div key={cat.id} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-xs text-gray-700">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}

import { useState, useRef, useMemo } from "react";
import { PageExportMenu } from "../components/PageExportMenu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
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
  IndianRupee,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  CloudRain,
  Wrench,
  BarChart2,
  PieChart as PieChartIcon,
  FileText,
  Building2,
  ArrowRight,
  Info,
  Target,
  Wallet,
  Receipt,
  Scale,
  ShieldAlert,
  CircleDollarSign,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  ComposedChart,
  Cell,
  PieChart,
  Pie,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ReferenceLine,
} from "recharts";

const TARIFF = 2.0;

const monthlyRevenueData = [
  { month: "Apr 25", budgeted: 2.60, expected: 2.52, actual: 2.48, realized: 2.42, collection: 93.1, genMWh: 12400, gridLoss: 0.04, eqLoss: 0.03, weatherLoss: 0.05, curtailmentLoss: 0.02, otherLoss: 0.01 },
  { month: "May 25", budgeted: 2.75, expected: 2.68, actual: 2.62, realized: 2.55, collection: 92.4, genMWh: 13100, gridLoss: 0.03, eqLoss: 0.04, weatherLoss: 0.04, curtailmentLoss: 0.01, otherLoss: 0.01 },
  { month: "Jun 25", budgeted: 2.45, expected: 2.30, actual: 2.18, realized: 2.10, collection: 85.7, genMWh: 10900, gridLoss: 0.06, eqLoss: 0.03, weatherLoss: 0.08, curtailmentLoss: 0.03, otherLoss: 0.02 },
  { month: "Jul 25", budgeted: 2.35, expected: 2.15, actual: 2.02, realized: 1.95, collection: 83.0, genMWh: 10100, gridLoss: 0.08, eqLoss: 0.05, weatherLoss: 0.10, curtailmentLoss: 0.04, otherLoss: 0.02 },
  { month: "Aug 25", budgeted: 2.50, expected: 2.38, actual: 2.30, realized: 2.22, collection: 88.8, genMWh: 11500, gridLoss: 0.05, eqLoss: 0.04, weatherLoss: 0.06, curtailmentLoss: 0.02, otherLoss: 0.01 },
  { month: "Sep 25", budgeted: 2.55, expected: 2.48, actual: 2.42, realized: 2.36, collection: 92.5, genMWh: 12100, gridLoss: 0.04, eqLoss: 0.03, weatherLoss: 0.04, curtailmentLoss: 0.02, otherLoss: 0.01 },
  { month: "Oct 25", budgeted: 2.70, expected: 2.65, actual: 2.60, realized: 2.54, collection: 94.1, genMWh: 13000, gridLoss: 0.03, eqLoss: 0.02, weatherLoss: 0.03, curtailmentLoss: 0.01, otherLoss: 0.01 },
  { month: "Nov 25", budgeted: 2.65, expected: 2.58, actual: 2.50, realized: 2.44, collection: 92.1, genMWh: 12500, gridLoss: 0.04, eqLoss: 0.04, weatherLoss: 0.05, curtailmentLoss: 0.02, otherLoss: 0.01 },
  { month: "Dec 25", budgeted: 2.55, expected: 2.45, actual: 2.38, realized: 2.30, collection: 90.2, genMWh: 11900, gridLoss: 0.05, eqLoss: 0.05, weatherLoss: 0.04, curtailmentLoss: 0.03, otherLoss: 0.02 },
  { month: "Jan 26", budgeted: 2.60, expected: 2.55, actual: 2.48, realized: 2.42, collection: 93.1, genMWh: 12400, gridLoss: 0.04, eqLoss: 0.03, weatherLoss: 0.04, curtailmentLoss: 0.02, otherLoss: 0.01 },
  { month: "Feb 26", budgeted: 2.50, expected: 2.42, actual: 2.35, realized: 2.28, collection: 91.2, genMWh: 11750, gridLoss: 0.04, eqLoss: 0.04, weatherLoss: 0.05, curtailmentLoss: 0.02, otherLoss: 0.02 },
  { month: "Mar 26", budgeted: 2.72, expected: 2.66, actual: 2.58, realized: 2.52, collection: 92.6, genMWh: 12900, gridLoss: 0.04, eqLoss: 0.03, weatherLoss: 0.05, curtailmentLoss: 0.02, otherLoss: 0.01 },
];

const vendorRevenueData = [
  { vendor: "SolarCo India", plants: "Sakri, Ahmednagar", plantCount: 2, capacity: 35.2, budgeted: 8.40, actual: 7.82, realized: 7.55, collection: 89.9, ldExposure: 0.42, shortfall: 0.85, status: "warning" },
  { vendor: "SunPower Tech", plants: "Sangli, Wardha, Buldhana, Chandrapur, Amravati", plantCount: 5, capacity: 63.2, budgeted: 12.65, actual: 11.45, realized: 10.92, collection: 86.3, ldExposure: 0.54, shortfall: 1.73, status: "critical" },
  { vendor: "Mega Solar Inc", plants: "Beed, Devdaithan, Bhandara", plantCount: 3, capacity: 48.0, budgeted: 11.52, actual: 10.88, realized: 10.45, collection: 90.7, ldExposure: 0.55, shortfall: 1.07, status: "warning" },
  { vendor: "Green Energy Ltd", plants: "Osmanabad", plantCount: 1, capacity: 18.5, budgeted: 4.44, actual: 4.38, realized: 4.30, collection: 96.8, ldExposure: 0.00, shortfall: 0.14, status: "healthy" },
  { vendor: "TechSolar Pvt", plants: "Latur", plantCount: 1, capacity: 15.0, budgeted: 3.60, actual: 3.52, realized: 3.45, collection: 95.8, ldExposure: 0.00, shortfall: 0.15, status: "healthy" },
];

const plantRevenueData = [
  { plant: "Sakri Solar Park", district: "Dhule", vendor: "SolarCo India", capacity: 25.5, tariff: 2.00, budgetedGen: 5520, actualGen: 5180, revenue: 1.04, budgetedRev: 1.10, shortfall: 0.06, collectionPct: 94.2, invoiced: 1.10, collected: 1.04, pending: 0.06, overdue: 0.02, pr: 78.2, cuf: 22.1 },
  { plant: "Sangli Solar Farm", district: "Sangli", vendor: "SunPower Tech", capacity: 7.9, tariff: 2.00, budgetedGen: 1710, actualGen: 1520, revenue: 0.30, budgetedRev: 0.34, shortfall: 0.04, collectionPct: 88.5, invoiced: 0.34, collected: 0.30, pending: 0.04, overdue: 0.01, pr: 74.8, cuf: 20.8 },
  { plant: "Osmanabad Solar Plant", district: "Osmanabad", vendor: "Green Energy Ltd", capacity: 18.5, tariff: 2.00, budgetedGen: 4010, actualGen: 3920, revenue: 0.78, budgetedRev: 0.80, shortfall: 0.02, collectionPct: 97.5, invoiced: 0.80, collected: 0.78, pending: 0.02, overdue: 0.00, pr: 82.5, cuf: 24.1 },
  { plant: "Latur Solar Station", district: "Latur", vendor: "TechSolar Pvt", capacity: 15.0, tariff: 2.00, budgetedGen: 3250, actualGen: 3180, revenue: 0.64, budgetedRev: 0.65, shortfall: 0.01, collectionPct: 98.0, invoiced: 0.65, collected: 0.64, pending: 0.01, overdue: 0.00, pr: 83.1, cuf: 23.8 },
  { plant: "Beed Solar Park", district: "Beed", vendor: "Mega Solar Inc", capacity: 20.0, tariff: 2.00, budgetedGen: 4340, actualGen: 4120, revenue: 0.82, budgetedRev: 0.87, shortfall: 0.05, collectionPct: 94.8, invoiced: 0.87, collected: 0.82, pending: 0.05, overdue: 0.01, pr: 80.2, cuf: 23.7 },
  { plant: "Wardha Solar Plant", district: "Wardha", vendor: "SunPower Tech", capacity: 12.0, tariff: 2.00, budgetedGen: 2600, actualGen: 2380, revenue: 0.48, budgetedRev: 0.52, shortfall: 0.04, collectionPct: 91.5, invoiced: 0.52, collected: 0.48, pending: 0.04, overdue: 0.01, pr: 76.5, cuf: 21.5 },
  { plant: "Devdaithan Solar Park", district: "Jalna", vendor: "Mega Solar Inc", capacity: 16.0, tariff: 2.00, budgetedGen: 3470, actualGen: 3280, revenue: 0.66, budgetedRev: 0.69, shortfall: 0.03, collectionPct: 95.0, invoiced: 0.69, collected: 0.66, pending: 0.03, overdue: 0.01, pr: 79.8, cuf: 22.3 },
  { plant: "Ahmednagar Solar Farm", district: "Ahmednagar", vendor: "SolarCo India", capacity: 9.7, tariff: 2.00, budgetedGen: 2100, actualGen: 1980, revenue: 0.40, budgetedRev: 0.42, shortfall: 0.02, collectionPct: 94.0, invoiced: 0.42, collected: 0.40, pending: 0.02, overdue: 0.01, pr: 79.0, cuf: 22.2 },
  { plant: "Buldhana Solar Farm", district: "Buldhana", vendor: "SunPower Tech", capacity: 14.5, tariff: 2.00, budgetedGen: 3140, actualGen: 2880, revenue: 0.58, budgetedRev: 0.63, shortfall: 0.05, collectionPct: 91.8, invoiced: 0.63, collected: 0.58, pending: 0.05, overdue: 0.02, pr: 77.0, cuf: 21.6 },
  { plant: "Chandrapur Solar Plant", district: "Chandrapur", vendor: "SunPower Tech", capacity: 18.4, tariff: 2.00, budgetedGen: 3990, actualGen: 3650, revenue: 0.73, budgetedRev: 0.80, shortfall: 0.07, collectionPct: 91.5, invoiced: 0.80, collected: 0.73, pending: 0.07, overdue: 0.02, pr: 77.2, cuf: 21.6 },
  { plant: "Bhandara Solar Farm", district: "Bhandara", vendor: "Mega Solar Inc", capacity: 12.0, tariff: 2.00, budgetedGen: 2600, actualGen: 2450, revenue: 0.49, budgetedRev: 0.52, shortfall: 0.03, collectionPct: 94.2, invoiced: 0.52, collected: 0.49, pending: 0.03, overdue: 0.01, pr: 79.5, cuf: 22.2 },
  { plant: "Amravati Solar Station", district: "Amravati", vendor: "SunPower Tech", capacity: 10.5, tariff: 2.00, budgetedGen: 2275, actualGen: 2050, revenue: 0.41, budgetedRev: 0.46, shortfall: 0.05, collectionPct: 89.8, invoiced: 0.46, collected: 0.41, pending: 0.05, overdue: 0.02, pr: 75.8, cuf: 21.2 },
];

const invoiceStatusData = [
  { status: "Paid", count: 28, amount: 6.82, color: "#10b981" },
  { status: "Partially Paid", count: 8, amount: 1.45, color: "#f59e0b" },
  { status: "Pending", count: 12, amount: 2.38, color: "#6366f1" },
  { status: "Overdue", count: 4, amount: 0.68, color: "#ef4444" },
  { status: "Disputed", count: 2, amount: 0.22, color: "#8b5cf6" },
];

const quarterlyData = [
  { quarter: "Q1 (Apr–Jun 25)", budgeted: 7.80, actual: 7.28, realized: 7.07, shortfall: 0.73, collection: 90.4 },
  { quarter: "Q2 (Jul–Sep 25)", budgeted: 7.40, actual: 6.74, realized: 6.53, shortfall: 0.87, collection: 88.1 },
  { quarter: "Q3 (Oct–Dec 25)", budgeted: 7.90, actual: 7.48, realized: 7.28, shortfall: 0.62, collection: 92.1 },
  { quarter: "Q4 (Jan–Mar 26)", budgeted: 7.82, actual: 7.41, realized: 7.22, shortfall: 0.60, collection: 92.3 },
];

export function FinancialReports() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedFY, setSelectedFY] = useState("FY 2025-26");
  const [activeTab, setActiveTab] = useState("revenue-impact");

  const ytdTotals = useMemo(() => {
    const data = monthlyRevenueData;
    return {
      budgeted: data.reduce((s, d) => s + d.budgeted, 0),
      expected: data.reduce((s, d) => s + d.expected, 0),
      actual: data.reduce((s, d) => s + d.actual, 0),
      realized: data.reduce((s, d) => s + d.realized, 0),
      totalGen: data.reduce((s, d) => s + d.genMWh, 0),
      avgCollection: data.reduce((s, d) => s + d.collection, 0) / data.length,
      gridLoss: data.reduce((s, d) => s + d.gridLoss, 0),
      eqLoss: data.reduce((s, d) => s + d.eqLoss, 0),
      weatherLoss: data.reduce((s, d) => s + d.weatherLoss, 0),
      curtailmentLoss: data.reduce((s, d) => s + d.curtailmentLoss, 0),
      otherLoss: data.reduce((s, d) => s + d.otherLoss, 0),
    };
  }, []);

  const totalShortfall = ytdTotals.budgeted - ytdTotals.realized;
  const totalLossBreakdown = [
    { category: "Grid Unavailability", value: ytdTotals.gridLoss, color: "#ef4444", icon: Zap },
    { category: "Equipment Downtime", value: ytdTotals.eqLoss, color: "#f59e0b", icon: Wrench },
    { category: "Weather / Irradiance", value: ytdTotals.weatherLoss, color: "#6366f1", icon: CloudRain },
    { category: "Curtailment", value: ytdTotals.curtailmentLoss, color: "#0ea5e9", icon: ShieldAlert },
    { category: "Other Losses", value: ytdTotals.otherLoss, color: "#84cc16", icon: Info },
  ];
  const totalLoss = totalLossBreakdown.reduce((s, d) => s + d.value, 0);

  const revenueWaterfallSteps = [
    { name: "Budgeted", value: ytdTotals.budgeted, fill: "#94a3b8", type: "total" },
    { name: "Grid Loss", value: -ytdTotals.gridLoss, fill: "#ef4444", type: "loss" },
    { name: "Equip. Loss", value: -ytdTotals.eqLoss, fill: "#f59e0b", type: "loss" },
    { name: "Weather", value: -ytdTotals.weatherLoss, fill: "#6366f1", type: "loss" },
    { name: "Curtailment", value: -ytdTotals.curtailmentLoss, fill: "#0ea5e9", type: "loss" },
    { name: "Other", value: -ytdTotals.otherLoss, fill: "#84cc16", type: "loss" },
    { name: "Collection Gap", value: -(ytdTotals.actual - ytdTotals.realized), fill: "#8b5cf6", type: "loss" },
    { name: "Realized", value: ytdTotals.realized, fill: "#2955A0", type: "total" },
  ];

  const invoiceTotal = invoiceStatusData.reduce((s, d) => s + d.amount, 0);

  return (
    <div ref={pageRef} className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#2955A0] text-white shadow-lg">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Financial Reports</h1>
              <p className="text-sm text-slate-500">Revenue tracking, loss attribution, invoicing & collection analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedFY} onValueChange={setSelectedFY}>
              <SelectTrigger className="w-[140px]">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FY 2025-26">FY 2025-26</SelectItem>
              </SelectContent>
            </Select>
            <Badge className="bg-emerald-100 text-emerald-800 px-3 py-1">
              <Clock className="w-3 h-3 mr-1" />
              Last Updated: 07-Apr-2026
            </Badge>
            <PageExportMenu pageTitle="Financial Reports" contentRef={pageRef} />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {[
            { label: "YTD Budgeted Revenue", value: `₹${ytdTotals.budgeted.toFixed(2)} Cr`, sub: `${monthlyRevenueData.length} months`, icon: Target, color: "bg-slate-100 text-slate-600" },
            { label: "YTD Realized Revenue", value: `₹${ytdTotals.realized.toFixed(2)} Cr`, sub: `${((ytdTotals.realized / ytdTotals.budgeted) * 100).toFixed(1)}% of budget`, icon: Wallet, color: "bg-[#2955A0]/10 text-[#2955A0]" },
            { label: "Revenue Shortfall", value: `₹${totalShortfall.toFixed(2)} Cr`, sub: `${((totalShortfall / ytdTotals.budgeted) * 100).toFixed(1)}% gap`, icon: TrendingDown, color: "bg-rose-50 text-rose-600" },
            { label: "Avg Collection Rate", value: `${ytdTotals.avgCollection.toFixed(1)}%`, sub: ytdTotals.avgCollection >= 92 ? "On Track" : "Below Target", icon: Receipt, color: ytdTotals.avgCollection >= 92 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600" },
            { label: "Revenue per MW", value: `₹${(ytdTotals.realized / 0.18).toFixed(1)} L`, sub: "Portfolio average", icon: CircleDollarSign, color: "bg-violet-50 text-violet-600" },
            { label: "Total LD Exposure", value: `₹${vendorRevenueData.reduce((s, v) => s + v.ldExposure, 0).toFixed(2)} Cr`, sub: `${vendorRevenueData.filter(v => v.ldExposure > 0).length} vendors at risk`, icon: Scale, color: "bg-orange-50 text-orange-600" },
          ].map((kpi) => (
            <Card key={kpi.label} className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded-lg ${kpi.color}`}>
                    <kpi.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{kpi.label}</span>
                </div>
                <p className="text-xl font-bold text-slate-900">{kpi.value}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{kpi.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border-2 border-slate-200 p-1 shadow-sm">
            <TabsTrigger value="revenue-impact" className="data-[state=active]:bg-[#2955A0] data-[state=active]:text-white text-xs gap-1.5">
              <BarChart2 className="w-3.5 h-3.5" /> Revenue Impact MoM
            </TabsTrigger>
            <TabsTrigger value="loss-attribution" className="data-[state=active]:bg-[#2955A0] data-[state=active]:text-white text-xs gap-1.5">
              <PieChartIcon className="w-3.5 h-3.5" /> Loss Attribution
            </TabsTrigger>
            <TabsTrigger value="vendor-revenue" className="data-[state=active]:bg-[#2955A0] data-[state=active]:text-white text-xs gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Vendor & Plant Revenue
            </TabsTrigger>
            <TabsTrigger value="invoicing" className="data-[state=active]:bg-[#2955A0] data-[state=active]:text-white text-xs gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Invoicing & Collection
            </TabsTrigger>
          </TabsList>

          <TabsContent value="revenue-impact" className="mt-4 space-y-6">
            <div className="grid grid-cols-12 gap-6">
              <Card className="col-span-8 border-2 border-slate-200">
                <CardHeader className="border-b border-slate-100 pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-[#2955A0]" />
                    Monthly Revenue Impact — Budgeted vs Realized (₹ Cr)
                  </CardTitle>
                  <CardDescription>Month-wise revenue tracking with budget variance for {selectedFY}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={340}>
                    <ComposedChart data={monthlyRevenueData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} domain={[1.5, 3.0]} />
                      <RechartsTooltip
                        content={({ active, payload, label }) => {
                          if (!active || !payload?.length) return null;
                          return (
                            <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs min-w-[180px]">
                              <p className="font-bold text-slate-800 mb-2">{label}</p>
                              {payload.map((p) => (
                                <div key={p.name} className="flex justify-between gap-4 py-0.5">
                                  <span className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                                    {p.name}
                                  </span>
                                  <span className="font-semibold">₹{Number(p.value).toFixed(2)} Cr</span>
                                </div>
                              ))}
                            </div>
                          );
                        }}
                      />
                      <Bar dataKey="budgeted" name="Budgeted" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={20} />
                      <Bar dataKey="realized" name="Realized" fill="#2955A0" radius={[4, 4, 0, 0]} barSize={20} />
                      <Line type="monotone" dataKey="actual" name="Actual" stroke="#E8A800" strokeWidth={2} dot={{ r: 3, fill: "#E8A800" }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-4 border-2 border-slate-200">
                <CardHeader className="border-b border-slate-100 pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-rose-500" />
                    Revenue Shortfall Analysis
                  </CardTitle>
                  <CardDescription>Where budget vs realization gap occurs</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  {monthlyRevenueData.slice(-5).reverse().map((m) => {
                    const gap = m.budgeted - m.realized;
                    const gapPct = (gap / m.budgeted) * 100;
                    return (
                      <div key={m.month} className="flex items-center gap-3">
                        <div className="w-14 text-xs font-semibold text-slate-700">{m.month}</div>
                        <div className="flex-1">
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-slate-500">₹{m.realized.toFixed(2)} / ₹{m.budgeted.toFixed(2)} Cr</span>
                            <span className={`font-bold ${gapPct > 8 ? "text-rose-600" : gapPct > 5 ? "text-amber-600" : "text-emerald-600"}`}>
                              -{gapPct.toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#2955A0]"
                              style={{ width: `${(m.realized / m.budgeted) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      YTD Shortfall Summary
                    </div>
                    <p className="text-xl font-bold text-amber-900">₹{totalShortfall.toFixed(2)} Cr</p>
                    <p className="text-[10px] text-amber-700 mt-0.5">
                      {((totalShortfall / ytdTotals.budgeted) * 100).toFixed(1)}% below annual budget · Projected annual gap: ₹{(totalShortfall * (12 / monthlyRevenueData.length)).toFixed(2)} Cr
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-slate-200">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-[#2955A0]" />
                  Month-wise Revenue Detail Table
                </CardTitle>
                <CardDescription>Complete financial breakdown for each month — {selectedFY}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left px-4 py-3 font-semibold text-slate-700 text-xs">Month</th>
                        <th className="text-right px-4 py-3 font-semibold text-slate-700 text-xs">Gen (MWh)</th>
                        <th className="text-right px-4 py-3 font-semibold text-slate-700 text-xs">Budgeted (₹Cr)</th>
                        <th className="text-right px-4 py-3 font-semibold text-slate-700 text-xs">Expected (₹Cr)</th>
                        <th className="text-right px-4 py-3 font-semibold text-slate-700 text-xs">Actual (₹Cr)</th>
                        <th className="text-right px-4 py-3 font-semibold text-slate-700 text-xs">Realized (₹Cr)</th>
                        <th className="text-right px-4 py-3 font-semibold text-slate-700 text-xs">Shortfall</th>
                        <th className="text-right px-4 py-3 font-semibold text-slate-700 text-xs">Collection %</th>
                        <th className="text-center px-4 py-3 font-semibold text-slate-700 text-xs">MoM Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyRevenueData.map((m, idx) => {
                        const shortfall = m.budgeted - m.realized;
                        const shortfallPct = (shortfall / m.budgeted) * 100;
                        const prevRealized = idx > 0 ? monthlyRevenueData[idx - 1].realized : m.realized;
                        const momChange = ((m.realized - prevRealized) / prevRealized) * 100;
                        return (
                          <tr key={m.month} className={`border-b border-slate-100 hover:bg-slate-50 ${idx % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                            <td className="px-4 py-2.5 font-semibold text-slate-800 text-xs">{m.month}</td>
                            <td className="px-4 py-2.5 text-right text-xs text-slate-600">{m.genMWh.toLocaleString("en-IN")}</td>
                            <td className="px-4 py-2.5 text-right text-xs text-slate-500">₹{m.budgeted.toFixed(2)}</td>
                            <td className="px-4 py-2.5 text-right text-xs text-slate-500">₹{m.expected.toFixed(2)}</td>
                            <td className="px-4 py-2.5 text-right text-xs font-semibold text-[#E8A800]">₹{m.actual.toFixed(2)}</td>
                            <td className="px-4 py-2.5 text-right text-xs font-bold text-[#2955A0]">₹{m.realized.toFixed(2)}</td>
                            <td className="px-4 py-2.5 text-right">
                              <span className={`text-xs font-bold ${shortfallPct > 8 ? "text-rose-600" : shortfallPct > 5 ? "text-amber-600" : "text-emerald-600"}`}>
                                ₹{shortfall.toFixed(2)} ({shortfallPct.toFixed(1)}%)
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-right">
                              <Badge className={`text-[10px] ${m.collection >= 93 ? "bg-emerald-100 text-emerald-700" : m.collection >= 88 ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}`}>
                                {m.collection.toFixed(1)}%
                              </Badge>
                            </td>
                            <td className="px-4 py-2.5 text-center">
                              {idx === 0 ? (
                                <span className="text-slate-300 text-xs">—</span>
                              ) : momChange >= 0 ? (
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600">
                                  <ArrowUpRight className="w-3 h-3" />+{momChange.toFixed(1)}%
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-rose-600">
                                  <ArrowDownRight className="w-3 h-3" />{momChange.toFixed(1)}%
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-[#2955A0]/5 border-t-2 border-[#2955A0]/20 font-bold">
                        <td className="px-4 py-3 text-xs text-slate-800">YTD Total</td>
                        <td className="px-4 py-3 text-right text-xs text-slate-800">{ytdTotals.totalGen.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-3 text-right text-xs text-slate-700">₹{ytdTotals.budgeted.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-xs text-slate-700">₹{ytdTotals.expected.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-xs text-[#E8A800]">₹{ytdTotals.actual.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-xs text-[#2955A0]">₹{ytdTotals.realized.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-xs text-rose-600">₹{totalShortfall.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-xs">{ytdTotals.avgCollection.toFixed(1)}%</td>
                        <td className="px-4 py-3 text-center text-xs text-slate-400">—</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#2955A0]" />
                  Quarterly Revenue Summary
                </CardTitle>
                <CardDescription>Quarter-wise aggregated revenue performance</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-4 gap-4">
                  {quarterlyData.map((q) => {
                    const gapPct = ((q.budgeted - q.realized) / q.budgeted) * 100;
                    return (
                      <div key={q.quarter} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <p className="text-xs font-bold text-slate-800 mb-3">{q.quarter}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-slate-500">Budgeted</span>
                            <span className="font-semibold text-slate-700">₹{q.budgeted.toFixed(2)} Cr</span>
                          </div>
                          <div className="flex justify-between text-[10px]">
                            <span className="text-slate-500">Realized</span>
                            <span className="font-bold text-[#2955A0]">₹{q.realized.toFixed(2)} Cr</span>
                          </div>
                          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-[#2955A0]" style={{ width: `${(q.realized / q.budgeted) * 100}%` }} />
                          </div>
                          <div className="flex justify-between text-[10px]">
                            <span className={`font-bold ${gapPct > 8 ? "text-rose-600" : "text-amber-600"}`}>-{gapPct.toFixed(1)}% gap</span>
                            <Badge className={`text-[9px] ${q.collection >= 92 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{q.collection.toFixed(1)}% coll.</Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loss-attribution" className="mt-4 space-y-6">
            <div className="grid grid-cols-12 gap-6">
              <Card className="col-span-7 border-2 border-slate-200">
                <CardHeader className="border-b border-slate-100 pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-[#2955A0]" />
                    Revenue Waterfall — Budget to Realization
                  </CardTitle>
                  <CardDescription>Step-by-step flow showing where revenue was lost from budget to realized amount</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={revenueWaterfallSteps} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                      <RechartsTooltip
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          const d = payload[0]?.payload;
                          return (
                            <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
                              <p className="font-bold text-slate-800 mb-1">{d?.name}</p>
                              <p className="text-slate-600">
                                {d?.type === "total" ? "Total: " : "Loss: "}₹{Math.abs(Number(d?.value)).toFixed(2)} Cr
                              </p>
                            </div>
                          );
                        }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {revenueWaterfallSteps.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-5 border-2 border-slate-200">
                <CardHeader className="border-b border-slate-100 pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <PieChartIcon className="w-4 h-4 text-[#2955A0]" />
                    Revenue Loss Breakdown
                  </CardTitle>
                  <CardDescription>₹{totalLoss.toFixed(2)} Cr total losses by category</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {totalLossBreakdown.map((item) => {
                      const pct = (item.value / totalLoss) * 100;
                      return (
                        <div key={item.category} className="flex items-center gap-3">
                          <div className="p-1.5 rounded-lg" style={{ backgroundColor: item.color + "15" }}>
                            <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="font-semibold text-slate-700">{item.category}</span>
                              <span className="font-bold text-slate-900">₹{item.value.toFixed(2)} Cr ({pct.toFixed(1)}%)</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-800 mb-1">
                      <Info className="w-3.5 h-3.5" />
                      Key Insight
                    </div>
                    <p className="text-[11px] text-blue-700">
                      Weather/Irradiance accounts for the largest revenue impact at ₹{ytdTotals.weatherLoss.toFixed(2)} Cr ({((ytdTotals.weatherLoss / totalLoss) * 100).toFixed(0)}%).
                      Monsoon months (Jun-Aug) show 2.5x higher weather losses vs dry season.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-slate-200">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-[#2955A0]" />
                  Month-wise Revenue Loss Stacked View
                </CardTitle>
                <CardDescription>How each loss category impacts monthly revenue across the year</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyRevenueData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <RechartsTooltip
                      content={({ active, payload, label }) => {
                        if (!active || !payload?.length) return null;
                        return (
                          <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs min-w-[180px]">
                            <p className="font-bold text-slate-800 mb-2">{label}</p>
                            {payload.map((p) => (
                              <div key={p.name} className="flex justify-between gap-4 py-0.5">
                                <span className="flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                                  {p.name}
                                </span>
                                <span className="font-semibold">₹{Number(p.value).toFixed(2)} Cr</span>
                              </div>
                            ))}
                          </div>
                        );
                      }}
                    />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="gridLoss" name="Grid Loss" stackId="loss" fill="#ef4444" />
                    <Bar dataKey="eqLoss" name="Equipment" stackId="loss" fill="#f59e0b" />
                    <Bar dataKey="weatherLoss" name="Weather" stackId="loss" fill="#6366f1" />
                    <Bar dataKey="curtailmentLoss" name="Curtailment" stackId="loss" fill="#0ea5e9" />
                    <Bar dataKey="otherLoss" name="Other" stackId="loss" fill="#84cc16" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendor-revenue" className="mt-4 space-y-6">

            {(() => {
              const vendorColors: Record<string, string> = {
                "SolarCo India": "#2955A0",
                "SunPower Tech": "#ef4444",
                "Mega Solar Inc": "#f59e0b",
                "Green Energy Ltd": "#10b981",
                "TechSolar Pvt": "#8b5cf6",
              };
              const vendorBarData = vendorRevenueData.map(v => ({
                name: v.vendor.split(" ").slice(0, 2).join(" "),
                fullName: v.vendor,
                budgeted: v.budgeted,
                realized: v.realized,
                shortfall: v.shortfall,
                collection: v.collection,
                ldExposure: v.ldExposure,
              }));
              const radarData = [
                { metric: "Collection %", fullMetric: "Collection Rate" },
                { metric: "Realization", fullMetric: "Revenue Realization %" },
                { metric: "LD Score", fullMetric: "LD Compliance (inverse)" },
                { metric: "Capacity Util.", fullMetric: "Capacity Utilization" },
                { metric: "Plant Health", fullMetric: "Portfolio Health Score" },
              ].map(m => {
                const entry: Record<string, string | number> = { metric: m.metric, fullMetric: m.fullMetric };
                vendorRevenueData.forEach(v => {
                  const key = v.vendor;
                  if (m.metric === "Collection %") entry[key] = v.collection;
                  else if (m.metric === "Realization") entry[key] = (v.realized / v.budgeted) * 100;
                  else if (m.metric === "LD Score") entry[key] = Math.max(0, 100 - (v.ldExposure / v.budgeted) * 500);
                  else if (m.metric === "Capacity Util.") entry[key] = (v.realized / v.capacity) * 30 + 60;
                  else entry[key] = v.status === "healthy" ? 95 : v.status === "warning" ? 75 : 55;
                });
                return entry;
              });
              const maxBudgeted = Math.max(...vendorRevenueData.map(v => v.budgeted));
              const plantScatterData = plantRevenueData.map(p => ({
                x: p.pr,
                y: p.cuf,
                z: p.revenue * 100,
                name: p.plant.split(" ").slice(0, 2).join(" "),
                fullName: p.plant,
                vendor: p.vendor,
                revenue: p.revenue,
                collectionPct: p.collectionPct,
                capacity: p.capacity,
                fill: vendorColors[p.vendor] || "#94a3b8",
              }));
              const sortedPlants = [...plantRevenueData].sort((a, b) => b.revenue - a.revenue);

              return (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {vendorRevenueData.map((v) => {
                      const pct = (v.realized / v.budgeted) * 100;
                      const circumference = 2 * Math.PI * 36;
                      const offset = circumference - (circumference * Math.min(pct, 100)) / 100;
                      const color = vendorColors[v.vendor] || "#94a3b8";
                      return (
                        <Card key={v.vendor} className={`border-2 ${v.status === "critical" ? "border-rose-200 bg-rose-50/30" : v.status === "warning" ? "border-amber-200 bg-amber-50/30" : "border-emerald-200 bg-emerald-50/30"} relative overflow-hidden`}>
                          <CardContent className="p-4 flex flex-col items-center">
                            <Badge className={`absolute top-2 right-2 text-[8px] ${v.status === "healthy" ? "bg-emerald-100 text-emerald-700" : v.status === "warning" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}`}>
                              {v.status === "healthy" ? "Healthy" : v.status === "warning" ? "At Risk" : "Critical"}
                            </Badge>
                            <div className="relative w-20 h-20 mb-2">
                              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                                <circle cx="40" cy="40" r="36" fill="none" stroke="#e2e8f0" strokeWidth="5" />
                                <circle cx="40" cy="40" r="36" fill="none" stroke={color} strokeWidth="5" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000" />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-sm font-bold" style={{ color }}>{pct.toFixed(0)}%</span>
                                <span className="text-[7px] text-slate-400">realized</span>
                              </div>
                            </div>
                            <div className="text-xs font-bold text-slate-800 text-center leading-tight">{v.vendor}</div>
                            <div className="text-[9px] text-slate-400 mt-0.5">{v.plantCount} plants · {v.capacity} MW</div>
                            <div className="w-full mt-3 space-y-1">
                              <div className="flex justify-between text-[9px]">
                                <span className="text-slate-400">Budgeted</span>
                                <span className="font-semibold text-slate-600">₹{v.budgeted.toFixed(2)} Cr</span>
                              </div>
                              <div className="flex justify-between text-[9px]">
                                <span className="text-slate-400">Realized</span>
                                <span className="font-bold" style={{ color }}>₹{v.realized.toFixed(2)} Cr</span>
                              </div>
                              <div className="flex justify-between text-[9px]">
                                <span className="text-slate-400">Shortfall</span>
                                <span className={`font-bold ${v.shortfall > 1 ? "text-rose-600" : "text-amber-600"}`}>₹{v.shortfall.toFixed(2)} Cr</span>
                              </div>
                              {v.ldExposure > 0 && (
                                <div className="flex justify-between text-[9px]">
                                  <span className="text-slate-400">LD Exposure</span>
                                  <span className="font-bold text-orange-600">₹{v.ldExposure.toFixed(2)} Cr</span>
                                </div>
                              )}
                            </div>
                            <div className="w-full mt-2 pt-2 border-t border-slate-200">
                              <div className="flex items-center justify-between">
                                <span className="text-[8px] text-slate-400">Collection</span>
                                <Badge className={`text-[8px] px-1.5 ${v.collection >= 93 ? "bg-emerald-100 text-emerald-700" : v.collection >= 88 ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}`}>
                                  {v.collection}%
                                </Badge>
                              </div>
                              <div className="h-1.5 rounded-full bg-slate-200 mt-1 overflow-hidden">
                                <div className="h-full rounded-full transition-all" style={{ width: `${v.collection}%`, backgroundColor: v.collection >= 93 ? "#10b981" : v.collection >= 88 ? "#f59e0b" : "#ef4444" }} />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-12 gap-6">
                    <Card className="col-span-7 border-2 border-slate-200">
                      <CardHeader className="border-b border-slate-100 pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <BarChart2 className="w-4 h-4 text-[#2955A0]" />
                          Vendor Revenue — Budgeted vs Realized
                        </CardTitle>
                        <CardDescription>Side-by-side comparison with shortfall gap — {selectedFY}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ResponsiveContainer width="100%" height={280}>
                          <BarChart data={vendorBarData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }} barGap={4}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}`} />
                            <RechartsTooltip content={({ active, payload }) => {
                              if (!active || !payload?.length) return null;
                              const d = payload[0]?.payload;
                              return (
                                <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
                                  <p className="font-bold text-slate-800 mb-1">{d?.fullName}</p>
                                  <p className="text-slate-500">Budgeted: <span className="font-bold text-slate-800">₹{d?.budgeted?.toFixed(2)} Cr</span></p>
                                  <p className="text-slate-500">Realized: <span className="font-bold text-[#2955A0]">₹{d?.realized?.toFixed(2)} Cr</span></p>
                                  <p className="text-slate-500">Shortfall: <span className="font-bold text-rose-600">₹{d?.shortfall?.toFixed(2)} Cr</span></p>
                                  <p className="text-slate-500">Collection: <span className="font-bold">{d?.collection?.toFixed(1)}%</span></p>
                                </div>
                              );
                            }} />
                            <Bar dataKey="budgeted" name="Budgeted" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={28} />
                            <Bar dataKey="realized" name="Realized" radius={[4, 4, 0, 0]} barSize={28}>
                              {vendorBarData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={vendorColors[vendorRevenueData[index].vendor] || "#2955A0"} />
                              ))}
                            </Bar>
                            <Legend wrapperStyle={{ fontSize: "11px" }} />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card className="col-span-5 border-2 border-slate-200">
                      <CardHeader className="border-b border-slate-100 pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Target className="w-4 h-4 text-[#2955A0]" />
                          Vendor Performance Radar
                        </CardTitle>
                        <CardDescription>Multi-dimensional vendor health comparison</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <ResponsiveContainer width="100%" height={280}>
                          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: "#64748b" }} />
                            <PolarRadiusAxis angle={90} domain={[50, 100]} tick={{ fontSize: 8 }} axisLine={false} />
                            {vendorRevenueData.map((v) => (
                              <Radar
                                key={v.vendor}
                                name={v.vendor}
                                dataKey={v.vendor}
                                stroke={vendorColors[v.vendor]}
                                fill={vendorColors[v.vendor]}
                                fillOpacity={0.08}
                                strokeWidth={2}
                              />
                            ))}
                            <Legend wrapperStyle={{ fontSize: "10px" }} />
                            <RechartsTooltip content={({ active, payload, label }) => {
                              if (!active || !payload?.length) return null;
                              return (
                                <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-2.5 text-xs">
                                  <p className="font-bold text-slate-800 mb-1">{label}</p>
                                  {payload.map((p: { name?: string; value?: number; color?: string }) => (
                                    <p key={p.name} className="flex items-center gap-1.5">
                                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                                      <span className="text-slate-600">{p.name}: <span className="font-bold">{typeof p.value === "number" ? p.value.toFixed(1) : p.value}</span></span>
                                    </p>
                                  ))}
                                </div>
                              );
                            }} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-2 border-slate-200">
                    <CardHeader className="border-b border-slate-100 pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <CircleDollarSign className="w-4 h-4 text-[#2955A0]" />
                        Plant Performance Quadrant — PR% vs CUF%
                      </CardTitle>
                      <CardDescription>Bubble size represents revenue (₹Cr), color represents vendor — identify top and underperforming plants</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ResponsiveContainer width="100%" height={340}>
                        <ScatterChart margin={{ top: 16, right: 24, left: 8, bottom: 24 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis type="number" dataKey="x" name="PR%" domain={[72, 86]} tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} label={{ value: "Performance Ratio (%)", position: "bottom", offset: 8, fontSize: 11, fill: "#94a3b8" }} />
                          <YAxis type="number" dataKey="y" name="CUF%" domain={[19, 26]} tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} label={{ value: "CUF (%)", angle: -90, position: "insideLeft", offset: 8, fontSize: 11, fill: "#94a3b8" }} />
                          <ZAxis type="number" dataKey="z" range={[120, 600]} />
                          <ReferenceLine x={78} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: "PR Threshold", position: "top", fontSize: 9, fill: "#f59e0b" }} />
                          <ReferenceLine y={22} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: "CUF Target", position: "right", fontSize: 9, fill: "#f59e0b" }} />
                          <RechartsTooltip content={({ active, payload }) => {
                            if (!active || !payload?.length) return null;
                            const d = payload[0]?.payload;
                            return (
                              <div className="bg-white border border-slate-200 rounded-lg shadow-xl p-3 text-xs">
                                <p className="font-bold text-slate-800">{d?.fullName}</p>
                                <p className="text-slate-500 mb-1">{d?.vendor} · {d?.capacity} MW</p>
                                <div className="space-y-0.5">
                                  <p>PR: <span className="font-bold">{d?.x}%</span></p>
                                  <p>CUF: <span className="font-bold">{d?.y}%</span></p>
                                  <p>Revenue: <span className="font-bold text-[#2955A0]">₹{d?.revenue?.toFixed(2)} Cr</span></p>
                                  <p>Collection: <span className="font-bold">{d?.collectionPct}%</span></p>
                                </div>
                              </div>
                            );
                          }} />
                          <Scatter data={plantScatterData}>
                            {plantScatterData.map((entry, index) => (
                              <Cell key={`scatter-${index}`} fill={entry.fill} fillOpacity={0.7} stroke={entry.fill} strokeWidth={1.5} />
                            ))}
                          </Scatter>
                        </ScatterChart>
                      </ResponsiveContainer>
                      <div className="flex flex-wrap items-center justify-center gap-4 mt-2 pb-1">
                        {Object.entries(vendorColors).map(([vendor, color]) => (
                          <span key={vendor} className="flex items-center gap-1.5 text-[10px] text-slate-500">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color, opacity: 0.7 }} />
                            {vendor}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-slate-200">
                    <CardHeader className="border-b border-slate-100 pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#2955A0]" />
                        Plant Revenue Ranking — Budget vs Realized
                      </CardTitle>
                      <CardDescription>All 12 plants ranked by realized revenue with budget baseline and collection breakdown</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {sortedPlants.map((p, idx) => {
                          const maxRev = Math.max(...plantRevenueData.map(pp => pp.budgetedRev));
                          const budgetWidth = (p.budgetedRev / maxRev) * 100;
                          const revenueWidth = (p.revenue / maxRev) * 100;
                          const realizePct = (p.revenue / p.budgetedRev * 100);
                          const color = vendorColors[p.vendor] || "#94a3b8";
                          const collTotal = p.collected + (p.pending - p.overdue) + p.overdue;
                          const collPct = collTotal > 0 ? (p.collected / collTotal) * 100 : 0;
                          const pendPct = collTotal > 0 ? ((p.pending - p.overdue) / collTotal) * 100 : 0;
                          const overdPct = collTotal > 0 ? (p.overdue / collTotal) * 100 : 0;
                          return (
                            <div key={p.plant} className="group">
                              <div className="flex items-center gap-3">
                                <div className="w-5 text-right">
                                  <span className="text-[10px] font-bold text-slate-400">#{idx + 1}</span>
                                </div>
                                <div className="w-[180px] flex-shrink-0">
                                  <div className="text-xs font-semibold text-slate-800 leading-tight">{p.plant}</div>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                                    <span className="text-[9px] text-slate-400">{p.vendor} · {p.capacity} MW</span>
                                  </div>
                                </div>
                                <div className="flex-1 relative">
                                  <div className="relative h-6">
                                    <div className="absolute top-0 h-2.5 rounded-sm bg-slate-200 transition-all" style={{ width: `${budgetWidth}%` }} />
                                    <div className="absolute top-[14px] h-2.5 rounded-sm transition-all" style={{ width: `${revenueWidth}%`, backgroundColor: color }} />
                                    <div
                                      className="absolute top-0 h-full border-r-2 border-dashed"
                                      style={{ left: `${budgetWidth}%`, borderColor: "#94a3b8" }}
                                    />
                                  </div>
                                </div>
                                <div className="w-[60px] text-right flex-shrink-0">
                                  <div className="text-xs font-bold text-[#2955A0]">₹{p.revenue.toFixed(2)}</div>
                                  <div className="text-[9px] text-slate-400">/ ₹{p.budgetedRev.toFixed(2)}</div>
                                </div>
                                <div className="w-[50px] text-right flex-shrink-0">
                                  <span className={`text-[10px] font-bold ${realizePct >= 95 ? "text-emerald-600" : realizePct >= 88 ? "text-amber-600" : "text-rose-600"}`}>
                                    {realizePct.toFixed(0)}%
                                  </span>
                                </div>
                                <div className="w-[80px] flex-shrink-0">
                                  <div className="flex">
                                    <div className="h-3 rounded-l-sm bg-emerald-400 transition-all" style={{ width: `${collPct}%` }} title={`Collected: ₹${p.collected}`} />
                                    <div className="h-3 bg-amber-400 transition-all" style={{ width: `${Math.max(pendPct, 0)}%` }} title={`Pending: ₹${(p.pending - p.overdue).toFixed(2)}`} />
                                    <div className="h-3 rounded-r-sm bg-rose-400 transition-all" style={{ width: `${overdPct}%` }} title={`Overdue: ₹${p.overdue}`} />
                                  </div>
                                  <div className="text-[8px] text-slate-400 mt-0.5 text-center">
                                    {p.collectionPct}% collected
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-slate-100">
                        <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          <span className="w-4 h-2 rounded-sm bg-slate-200" /> Budgeted
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          <span className="w-4 h-2 rounded-sm bg-[#2955A0]" /> Realized
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          <span className="w-4 h-2 rounded-sm bg-emerald-400" /> Collected
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          <span className="w-4 h-2 rounded-sm bg-amber-400" /> Pending
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          <span className="w-4 h-2 rounded-sm bg-rose-400" /> Overdue
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </>
              );
            })()}

          </TabsContent>

          <TabsContent value="invoicing" className="mt-4 space-y-6">
            <div className="grid grid-cols-12 gap-6">
              <Card className="col-span-5 border-2 border-slate-200">
                <CardHeader className="border-b border-slate-100 pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-[#2955A0]" />
                    Invoice Status Distribution
                  </CardTitle>
                  <CardDescription>YTD invoice lifecycle — {invoiceStatusData.reduce((s, d) => s + d.count, 0)} invoices totaling ₹{invoiceTotal.toFixed(2)} Cr</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={invoiceStatusData}
                        dataKey="amount"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        innerRadius={55}
                        paddingAngle={3}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {invoiceStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          const d = payload[0]?.payload;
                          return (
                            <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
                              <p className="font-bold text-slate-800">{d?.status}</p>
                              <p className="text-slate-600">{d?.count} invoices · ₹{d?.amount.toFixed(2)} Cr</p>
                            </div>
                          );
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-2">
                    {invoiceStatusData.map((item) => (
                      <div key={item.status} className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-slate-700">{item.status}</span>
                        </span>
                        <span className="font-semibold text-slate-800">{item.count} invoices · ₹{item.amount.toFixed(2)} Cr</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="col-span-7 space-y-6">
                <Card className="border-2 border-slate-200">
                  <CardHeader className="border-b border-slate-100 pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-[#2955A0]" />
                      Collection Efficiency Trend
                    </CardTitle>
                    <CardDescription>Month-wise collection rate tracking against 92% target</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ResponsiveContainer width="100%" height={240}>
                      <AreaChart data={monthlyRevenueData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                        <YAxis domain={[78, 100]} tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                        <RechartsTooltip
                          content={({ active, payload, label }) => {
                            if (!active || !payload?.length) return null;
                            return (
                              <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
                                <p className="font-bold text-slate-800 mb-1">{label}</p>
                                <p className="text-[#2955A0] font-semibold">Collection: {Number(payload[0]?.value).toFixed(1)}%</p>
                              </div>
                            );
                          }}
                        />
                        <defs>
                          <linearGradient id="collGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2955A0" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#2955A0" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="collection" stroke="#2955A0" strokeWidth={2} fill="url(#collGrad)" dot={{ r: 3, fill: "#2955A0" }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-3 gap-4">
                  <Card className="border-2 border-emerald-200 bg-emerald-50/50">
                    <CardContent className="p-4 text-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-emerald-800">₹{invoiceStatusData[0].amount.toFixed(2)} Cr</p>
                      <p className="text-xs text-emerald-600 mt-1">Fully Collected</p>
                      <p className="text-[10px] text-emerald-500">{invoiceStatusData[0].count} invoices cleared</p>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-amber-200 bg-amber-50/50">
                    <CardContent className="p-4 text-center">
                      <Clock className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-amber-800">₹{(invoiceStatusData[1].amount + invoiceStatusData[2].amount).toFixed(2)} Cr</p>
                      <p className="text-xs text-amber-600 mt-1">Pending Collection</p>
                      <p className="text-[10px] text-amber-500">{invoiceStatusData[1].count + invoiceStatusData[2].count} invoices in pipeline</p>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-rose-200 bg-rose-50/50">
                    <CardContent className="p-4 text-center">
                      <AlertTriangle className="w-6 h-6 text-rose-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-rose-800">₹{(invoiceStatusData[3].amount + invoiceStatusData[4].amount).toFixed(2)} Cr</p>
                      <p className="text-xs text-rose-600 mt-1">Overdue & Disputed</p>
                      <p className="text-[10px] text-rose-500">{invoiceStatusData[3].count + invoiceStatusData[4].count} invoices require action</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <Card className="border-2 border-blue-100 bg-blue-50/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-blue-800">Revenue Collection Policy</p>
                    <p className="text-sm mt-0.5 text-blue-700">
                      Invoices are raised monthly per JMR approval. Standard payment terms are <strong>Net 30 days</strong> from invoice date.
                      Invoices unpaid beyond 45 days are flagged as overdue. Disputed invoices require resolution within 60 days per PPA terms.
                      Collection targets: <strong>92% within 30 days</strong>, <strong>98% within 60 days</strong>.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

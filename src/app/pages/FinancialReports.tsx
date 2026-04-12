import { useState, useRef, useMemo } from "react";
import { PageExportMenu } from "../components/PageExportMenu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  IndianRupee,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
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
  Line,
  Area,
  AreaChart,
  ComposedChart,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

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
              <Building2 className="w-3.5 h-3.5" /> Vendor Revenue
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

              return (
                <>
                  <Card className="border-2 border-slate-200">
                    <CardHeader className="border-b border-slate-100 pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <BarChart2 className="w-4 h-4 text-[#2955A0]" />
                        Vendor Revenue — Budgeted vs Realized
                      </CardTitle>
                      <CardDescription>Side-by-side comparison with shortfall gap — {selectedFY}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ResponsiveContainer width="100%" height={320}>
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
                          <Bar dataKey="budgeted" name="Budgeted" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={36} />
                          <Bar dataKey="realized" name="Realized" radius={[4, 4, 0, 0]} barSize={36}>
                            {vendorBarData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={vendorColors[vendorRevenueData[index].vendor] || "#2955A0"} />
                            ))}
                          </Bar>
                          <Legend wrapperStyle={{ fontSize: "11px" }} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-5 gap-4">
                    {vendorRevenueData.map((v) => {
                      const realizePct = (v.realized / v.budgeted * 100);
                      const color = vendorColors[v.vendor] || "#94a3b8";
                      return (
                        <Card key={v.vendor} className="border border-slate-200">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                              <span className="text-xs font-bold text-slate-800 truncate">{v.vendor}</span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-[10px]">
                                <span className="text-slate-400">Budgeted</span>
                                <span className="font-semibold text-slate-700">₹{v.budgeted.toFixed(2)} Cr</span>
                              </div>
                              <div className="flex justify-between text-[10px]">
                                <span className="text-slate-400">Realized</span>
                                <span className="font-bold" style={{ color }}>₹{v.realized.toFixed(2)} Cr</span>
                              </div>
                              <div className="flex justify-between text-[10px]">
                                <span className="text-slate-400">Shortfall</span>
                                <span className={`font-bold ${v.shortfall > 1 ? "text-rose-600" : "text-amber-600"}`}>₹{v.shortfall.toFixed(2)} Cr</span>
                              </div>
                              <div className="flex justify-between text-[10px]">
                                <span className="text-slate-400">Collection</span>
                                <span className={`font-bold ${v.collection >= 93 ? "text-emerald-600" : v.collection >= 88 ? "text-amber-600" : "text-rose-600"}`}>{v.collection}%</span>
                              </div>
                              {v.ldExposure > 0 && (
                                <div className="flex justify-between text-[10px]">
                                  <span className="text-slate-400">LD Exposure</span>
                                  <span className="font-bold text-orange-600">₹{v.ldExposure.toFixed(2)} Cr</span>
                                </div>
                              )}
                            </div>
                            <div className="mt-3 pt-2 border-t border-slate-100">
                              <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                <div className="h-full rounded-full transition-all" style={{ width: `${realizePct}%`, backgroundColor: color }} />
                              </div>
                              <div className="text-[9px] text-slate-400 mt-1 text-center">{realizePct.toFixed(1)}% realized</div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Info className="w-4 h-4 text-[#2955A0] flex-shrink-0" />
                    <p className="text-[11px] text-slate-600">
                      For detailed vendor performance analytics (radar comparison, plant PR% vs CUF% quadrant, and plant ranking), visit <span className="font-bold text-[#2955A0]">Site & Portfolio Management → Performance Analytics</span>.
                    </p>
                  </div>
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

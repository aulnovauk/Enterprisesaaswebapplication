import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import {
  FileText,
  DollarSign,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Calculator,
  Bell,
  TrendingUp,
  Shield,
  Users,
  Building2,
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

// Portfolio summary data
const portfolioSummary = {
  totalCapacity: 115,
  totalSites: 5,
  compliantSites: 2,
  nonCompliantSites: 3,
  totalLDExposure: 14.2,
  ytdLDExposure: 82.5,
  criticalEscalations: 2,
  complianceRate: 40,
};

// Site-wise LD exposure
const sitewiseLD = [
  {
    siteId: "EESL-RAJ-001",
    siteName: "Plant A - Jaipur",
    capacity: 10,
    vendor: "SolarTech India",
    contractedGen: 850,
    actualGen: 820,
    shortfall: 30,
    ldRate: 0.012,
    ldAmount: 0.36,
    complianceStatus: "green",
    availability: 96.2,
    targetAvailability: 95.0,
    cuf: 21.8,
    targetCuf: 23.0,
  },
  {
    siteId: "EESL-GUJ-002",
    siteName: "Plant B - Gandhinagar",
    capacity: 25,
    vendor: "SunPower Solutions",
    contractedGen: 2100,
    actualGen: 1980,
    shortfall: 120,
    ldRate: 0.015,
    ldAmount: 1.8,
    complianceStatus: "red",
    availability: 93.8,
    targetAvailability: 95.0,
    cuf: 22.1,
    targetCuf: 23.0,
  },
  {
    siteId: "EESL-MP-003",
    siteName: "Plant C - Rewa",
    capacity: 50,
    vendor: "SolarTech India",
    contractedGen: 4200,
    actualGen: 4100,
    shortfall: 100,
    ldRate: 0.010,
    ldAmount: 1.0,
    complianceStatus: "red",
    availability: 94.5,
    targetAvailability: 95.0,
    cuf: 22.3,
    targetCuf: 23.0,
  },
  {
    siteId: "EESL-KAR-004",
    siteName: "Plant D - Tumkur",
    capacity: 30,
    vendor: "GreenEnergy Corp",
    contractedGen: 2500,
    actualGen: 2300,
    shortfall: 200,
    ldRate: 0.018,
    ldAmount: 3.6,
    complianceStatus: "red",
    availability: 92.1,
    targetAvailability: 95.0,
    cuf: 20.8,
    targetCuf: 23.0,
  },
  {
    siteId: "EESL-UP-005",
    siteName: "Plant E - Varanasi",
    capacity: 15,
    vendor: "SunPower Solutions",
    contractedGen: 1250,
    actualGen: 1280,
    shortfall: -30,
    ldRate: 0.012,
    ldAmount: 0,
    complianceStatus: "green",
    availability: 97.3,
    targetAvailability: 95.0,
    cuf: 23.5,
    targetCuf: 23.0,
  },
];

// Vendor-wise aggregation
const vendorwiseLD = [
  {
    vendorName: "SolarTech India",
    sites: 2,
    totalCapacity: 60,
    totalLDAmount: 1.36,
    complianceRate: 50,
    avgAvailability: 95.35,
    status: "warning",
  },
  {
    vendorName: "SunPower Solutions",
    sites: 2,
    totalCapacity: 40,
    totalLDAmount: 1.8,
    complianceRate: 50,
    avgAvailability: 95.55,
    status: "warning",
  },
  {
    vendorName: "GreenEnergy Corp",
    sites: 1,
    totalCapacity: 30,
    totalLDAmount: 3.6,
    complianceRate: 0,
    avgAvailability: 92.1,
    status: "critical",
  },
];

// Guaranteed vs Actual comparison
const guaranteedVsActual = [
  { parameter: "Generation (MWh)", guaranteed: 10900, actual: 10480, variance: -420, variancePct: -3.85, status: "red" },
  { parameter: "Availability (%)", guaranteed: 95.0, actual: 94.2, variance: -0.8, variancePct: -0.84, status: "red" },
  { parameter: "CUF (%)", guaranteed: 23.0, actual: 22.4, variance: -0.6, variancePct: -2.61, status: "red" },
  { parameter: "PR (%)", guaranteed: 78.0, actual: 78.6, variance: 0.6, variancePct: 0.77, status: "green" },
  { parameter: "Response Time (hrs)", guaranteed: 4.0, actual: 3.8, variance: -0.2, variancePct: -5.0, status: "green" },
];

// Escalation alerts
const escalationAlerts = [
  {
    id: "ESC-2026-008",
    site: "Plant D - Tumkur",
    vendor: "GreenEnergy Corp",
    severity: "critical",
    issue: "Consistent availability below 93% for 3 consecutive months",
    ldExposure: 3.6,
    daysOpen: 15,
    status: "open",
  },
  {
    id: "ESC-2026-007",
    site: "Plant B - Gandhinagar",
    vendor: "SunPower Solutions",
    severity: "high",
    issue: "Generation shortfall exceeds 5% threshold",
    ldExposure: 1.8,
    daysOpen: 8,
    status: "open",
  },
  {
    id: "ESC-2026-006",
    site: "Plant C - Rewa",
    vendor: "SolarTech India",
    severity: "medium",
    issue: "CUF below guaranteed for 2 months",
    ldExposure: 1.0,
    daysOpen: 3,
    status: "acknowledged",
  },
];

// Monthly LD trend
const monthlyLDTrend = [
  { month: "Aug", ldAmount: 8.5, complianceRate: 60 },
  { month: "Sep", ldAmount: 6.3, complianceRate: 60 },
  { month: "Oct", ldAmount: 4.2, complianceRate: 80 },
  { month: "Nov", ldAmount: 7.8, complianceRate: 60 },
  { month: "Dec", ldAmount: 9.2, complianceRate: 40 },
  { month: "Jan", ldAmount: 5.5, complianceRate: 60 },
  { month: "Feb", ldAmount: 14.2, complianceRate: 40 },
];

export function ContractLDAnalytics() {
  const [selectedSite, setSelectedSite] = useState<typeof sitewiseLD[0] | null>(null);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Contractual Compliance & LD Analytics</h1>
            <p className="text-sm text-gray-600 mt-1">
              Executive dashboard for contractual obligations, liquidated damages tracking, and vendor compliance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export LD Report
            </Button>
            <Button style={{ backgroundColor: "#0B3C5D" }} className="text-white">
              <Bell className="w-4 h-4 mr-2" />
              Configure Alerts
            </Button>
          </div>
        </div>
      </div>

      {/* Portfolio-level Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-2 border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
              <Badge variant="destructive" className="text-xs font-semibold">Current Month</Badge>
            </div>
            <h3 className="text-xs font-medium text-gray-600 mb-2">Total LD Exposure</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-red-600">₹{portfolioSummary.totalLDExposure}L</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              YTD: <span className="font-semibold text-gray-900">₹{portfolioSummary.ytdLDExposure}L</span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <Badge className="bg-orange-100 text-orange-800 text-xs font-semibold">Compliance</Badge>
            </div>
            <h3 className="text-xs font-medium text-gray-600 mb-2">Portfolio Compliance Rate</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-orange-600">{portfolioSummary.complianceRate}%</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {portfolioSummary.compliantSites} of {portfolioSummary.totalSites} sites compliant
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <Badge variant="destructive" className="text-xs font-semibold">Active</Badge>
            </div>
            <h3 className="text-xs font-medium text-gray-600 mb-2">Critical Escalations</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-red-600">{portfolioSummary.criticalEscalations}</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <Badge className="bg-blue-100 text-blue-800 text-xs font-semibold">Portfolio</Badge>
            </div>
            <h3 className="text-xs font-medium text-gray-600 mb-2">Total Portfolio Capacity</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">{portfolioSummary.totalCapacity}</span>
              <span className="text-sm text-gray-600">MW</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Across {portfolioSummary.totalSites} sites
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Guaranteed vs Actual Generation Comparison */}
      <Card className="mb-8">
        <CardHeader className="border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Guaranteed vs Actual Performance Comparison</CardTitle>
              <p className="text-xs text-gray-600 mt-1">February 2026 - Portfolio-wide metrics</p>
            </div>
            <Badge className="bg-red-100 text-red-800">3 of 5 parameters non-compliant</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Parameter</TableHead>
                <TableHead className="text-right font-semibold">Guaranteed</TableHead>
                <TableHead className="text-right font-semibold">Actual</TableHead>
                <TableHead className="text-right font-semibold">Variance</TableHead>
                <TableHead className="text-right font-semibold">Variance %</TableHead>
                <TableHead className="text-center font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guaranteedVsActual.map((item, idx) => {
                const isNegative = item.variance < 0;
                const bgColor = item.status === "red" ? "bg-red-50" : "bg-green-50";
                
                return (
                  <TableRow key={idx} className={bgColor}>
                    <TableCell className="font-semibold text-gray-900">{item.parameter}</TableCell>
                    <TableCell className="text-right font-mono text-gray-700">{item.guaranteed.toFixed(1)}</TableCell>
                    <TableCell className="text-right font-mono font-bold text-gray-900">{item.actual.toFixed(1)}</TableCell>
                    <TableCell className="text-right font-mono">
                      <span className={isNegative ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
                        {item.variance > 0 ? "+" : ""}{item.variance.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      <span className={isNegative ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
                        {item.variancePct > 0 ? "+" : ""}{item.variancePct.toFixed(2)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {item.status === "green" ? (
                        <Badge className="bg-green-100 text-green-800 border border-green-300">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Compliant
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <XCircle className="w-3 h-3 mr-1" />
                          Non-Compliant
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* LD Formula Application Panel */}
      <Card className="mb-8">
        <CardHeader className="border-b bg-blue-50">
          <div className="flex items-center gap-3">
            <Calculator className="w-5 h-5 text-blue-600" />
            <div>
              <CardTitle className="text-base font-semibold">LD Formula Application</CardTitle>
              <p className="text-xs text-gray-600 mt-1">Standard contractual formula for liquidated damages calculation</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formula Explanation */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Formula</h3>
                <div className="p-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                  <p className="font-mono text-sm text-gray-900 font-bold">
                    LD Amount = (Contracted Generation - Actual Generation) × LD Rate
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">Parameters</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 bg-blue-50 rounded">
                    <span className="text-gray-700">Contracted Generation:</span>
                    <span className="font-semibold text-gray-900">As per PPA/Contract</span>
                  </div>
                  <div className="flex justify-between p-2 bg-blue-50 rounded">
                    <span className="text-gray-700">Actual Generation:</span>
                    <span className="font-semibold text-gray-900">From JMR Data</span>
                  </div>
                  <div className="flex justify-between p-2 bg-blue-50 rounded">
                    <span className="text-gray-700">LD Rate:</span>
                    <span className="font-semibold text-gray-900">₹0.010 - ₹0.018 per kWh</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Calculation */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Example: Plant D - Tumkur</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="text-xs text-gray-600 mb-1">Step 1: Identify Shortfall</div>
                    <div className="font-mono text-sm font-semibold text-gray-900">
                      2,500 MWh - 2,300 MWh = 200 MWh
                    </div>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="text-xs text-gray-600 mb-1">Step 2: Apply LD Rate</div>
                    <div className="font-mono text-sm font-semibold text-gray-900">
                      200 MWh × 1,000 × ₹0.018 = ₹3,600
                    </div>
                  </div>

                  <div className="p-3 bg-red-100 border-2 border-red-300 rounded">
                    <div className="text-xs text-gray-600 mb-1">LD Amount (Final)</div>
                    <div className="font-mono text-2xl font-bold text-red-600">
                      ₹3.6 Lakhs
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-orange-50 border border-orange-200 rounded text-xs">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-orange-900">Note:</p>
                    <p className="text-orange-800 mt-1">
                      LD rates vary by contract. Cumulative LD exposure is capped at 10% of contract value per annum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Site-wise LD Exposure Table */}
      <Card className="mb-8">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle className="text-base font-semibold">Site-wise LD Exposure & Compliance Status</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-semibold">Site ID</TableHead>
                  <TableHead className="font-semibold">Site Name</TableHead>
                  <TableHead className="font-semibold">Vendor</TableHead>
                  <TableHead className="text-right font-semibold">Capacity (MW)</TableHead>
                  <TableHead className="text-right font-semibold">Contracted (MWh)</TableHead>
                  <TableHead className="text-right font-semibold">Actual (MWh)</TableHead>
                  <TableHead className="text-right font-semibold">Shortfall (MWh)</TableHead>
                  <TableHead className="text-right font-semibold">LD Rate (₹/kWh)</TableHead>
                  <TableHead className="text-right font-semibold">LD Amount (₹L)</TableHead>
                  <TableHead className="text-center font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sitewiseLD.map((site, idx) => {
                  const bgColor = site.complianceStatus === "green" ? "bg-green-50" : "bg-red-50";
                  
                  return (
                    <TableRow key={idx} className={bgColor}>
                      <TableCell className="font-mono text-xs font-semibold">{site.siteId}</TableCell>
                      <TableCell className="font-semibold text-gray-900">{site.siteName}</TableCell>
                      <TableCell className="text-gray-700">{site.vendor}</TableCell>
                      <TableCell className="text-right font-mono">{site.capacity}</TableCell>
                      <TableCell className="text-right font-mono text-gray-700">{site.contractedGen}</TableCell>
                      <TableCell className="text-right font-mono font-semibold">{site.actualGen}</TableCell>
                      <TableCell className="text-right font-mono">
                        <span className={site.shortfall > 0 ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
                          {site.shortfall > 0 ? "-" : "+"}{Math.abs(site.shortfall)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-mono text-gray-700">{site.ldRate.toFixed(3)}</TableCell>
                      <TableCell className="text-right font-mono">
                        <span className={site.ldAmount > 0 ? "text-red-600 font-bold text-base" : "text-green-600 font-semibold"}>
                          {site.ldAmount > 0 ? `₹${site.ldAmount.toFixed(2)}` : "₹0.00"}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {site.complianceStatus === "green" ? (
                          <Badge className="bg-green-100 text-green-800 border-2 border-green-300 font-semibold">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Compliant
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="border-2 border-red-300 font-semibold">
                            <XCircle className="w-3 h-3 mr-1" />
                            LD Applied
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Vendor-wise LD Dashboard */}
      <Card className="mb-8">
        <CardHeader className="border-b bg-gray-50">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-700" />
            <CardTitle className="text-base font-semibold">Vendor-wise LD Dashboard</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {vendorwiseLD.map((vendor, idx) => (
              <Card key={idx} className={`border-2 ${vendor.status === "critical" ? "border-red-300 bg-red-50" : "border-orange-300 bg-orange-50"}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm">{vendor.vendorName}</h3>
                    <Badge className={vendor.status === "critical" ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"}>
                      {vendor.status === "critical" ? "Critical" : "Warning"}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Sites:</span>
                      <span className="font-semibold text-gray-900">{vendor.sites}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-semibold text-gray-900">{vendor.totalCapacity} MW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Compliance Rate:</span>
                      <span className={`font-bold ${vendor.complianceRate === 0 ? "text-red-600" : "text-orange-600"}`}>
                        {vendor.complianceRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Availability:</span>
                      <span className="font-semibold text-gray-900">{vendor.avgAvailability.toFixed(1)}%</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between pt-1">
                      <span className="text-gray-700 font-medium">Total LD Exposure:</span>
                      <span className="font-bold text-red-600 text-base">₹{vendor.totalLDAmount.toFixed(2)}L</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Vendor comparison chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendorwiseLD}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="vendorName" tick={{ fontSize: 11 }} stroke="#6B7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
              <Tooltip />
              <Bar dataKey="totalLDAmount" name="LD Amount (₹ Lakhs)">
                {vendorwiseLD.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.status === "critical" ? "#DC2626" : "#F59E0B"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Escalation Trigger Alerts */}
      <Card className="mb-8">
        <CardHeader className="border-b bg-red-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-red-600" />
              <div>
                <CardTitle className="text-base font-semibold">Escalation Trigger Alerts</CardTitle>
                <p className="text-xs text-gray-600 mt-1">Critical compliance issues requiring immediate action</p>
              </div>
            </div>
            <Badge variant="destructive" className="text-xs font-semibold">
              {escalationAlerts.filter(a => a.status === "open").length} Open Alerts
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Escalation ID</TableHead>
                <TableHead className="font-semibold">Site</TableHead>
                <TableHead className="font-semibold">Vendor</TableHead>
                <TableHead className="font-semibold">Issue Description</TableHead>
                <TableHead className="text-right font-semibold">LD Exposure (₹L)</TableHead>
                <TableHead className="text-center font-semibold">Severity</TableHead>
                <TableHead className="text-center font-semibold">Days Open</TableHead>
                <TableHead className="text-center font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {escalationAlerts.map((alert, idx) => {
                const bgColor = alert.severity === "critical" ? "bg-red-50" : alert.severity === "high" ? "bg-orange-50" : "bg-yellow-50";
                
                return (
                  <TableRow key={idx} className={bgColor}>
                    <TableCell className="font-mono text-xs font-semibold">{alert.id}</TableCell>
                    <TableCell className="font-semibold text-gray-900">{alert.site}</TableCell>
                    <TableCell className="text-gray-700">{alert.vendor}</TableCell>
                    <TableCell className="text-sm max-w-xs">{alert.issue}</TableCell>
                    <TableCell className="text-right font-mono font-bold text-red-600">₹{alert.ldExposure.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        className={
                          alert.severity === "critical" 
                            ? "bg-red-100 text-red-800 border border-red-300" 
                            : alert.severity === "high"
                            ? "bg-orange-100 text-orange-800 border border-orange-300"
                            : "bg-yellow-100 text-yellow-800 border border-yellow-300"
                        }
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-semibold text-gray-900">{alert.daysOpen}</TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        className={
                          alert.status === "open" 
                            ? "bg-red-100 text-red-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {alert.status === "open" ? "Open" : "Acknowledged"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Monthly LD Trend */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-base font-semibold">Monthly LD Trend & Portfolio Compliance</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={monthlyLDTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6B7280" />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="#6B7280" label={{ value: 'LD Amount (₹ Lakhs)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#6B7280" label={{ value: 'Compliance Rate (%)', angle: 90, position: 'insideRight', style: { fontSize: 12 } }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="ldAmount" fill="#EF4444" name="LD Amount (₹ Lakhs)" />
              <Line yAxisId="right" type="monotone" dataKey="complianceRate" stroke="#0B3C5D" strokeWidth={3} name="Compliance Rate (%)" dot={{ fill: "#0B3C5D", r: 5 }} />
              <ReferenceLine yAxisId="right" y={80} stroke="#F59E0B" strokeDasharray="5 5" label="Target: 80%" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

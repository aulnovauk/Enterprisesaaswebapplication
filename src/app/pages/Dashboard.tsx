import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { TrendingUp, TrendingDown, Zap, Sun, AlertTriangle, DollarSign } from "lucide-react";
import { Badge } from "../components/ui/badge";

const kpiCards = [
  {
    title: "Total Generation (MWh)",
    value: "45,234",
    change: "+5.2%",
    trend: "up",
    icon: Zap,
    color: "#F4B400",
  },
  {
    title: "Plant Availability (%)",
    value: "96.8%",
    change: "+2.1%",
    trend: "up",
    icon: Sun,
    color: "#10B981",
  },
  {
    title: "CUF (%)",
    value: "22.4%",
    change: "-0.8%",
    trend: "down",
    icon: TrendingUp,
    color: "#0B3C5D",
  },
  {
    title: "Active Outages",
    value: "12",
    change: "+3",
    trend: "down",
    icon: AlertTriangle,
    color: "#EF4444",
  },
  {
    title: "LD Amount (₹ Lakhs)",
    value: "₹14.2",
    change: "-₹2.1",
    trend: "up",
    icon: DollarSign,
    color: "#8B5CF6",
  },
  {
    title: "PR (%)",
    value: "78.6%",
    change: "+1.3%",
    trend: "up",
    icon: TrendingUp,
    color: "#F59E0B",
  },
];

const generationData = [
  { month: "Apr", actual: 3850, target: 4200, previous: 3650 },
  { month: "May", actual: 4320, target: 4500, previous: 4100 },
  { month: "Jun", actual: 3990, target: 4100, previous: 3800 },
  { month: "Jul", actual: 3650, target: 3900, previous: 3400 },
  { month: "Aug", actual: 3820, target: 4000, previous: 3550 },
  { month: "Sep", actual: 4100, target: 4300, previous: 3900 },
  { month: "Oct", actual: 4450, target: 4600, previous: 4200 },
  { month: "Nov", actual: 4280, target: 4400, previous: 4050 },
  { month: "Dec", actual: 4150, target: 4350, previous: 3920 },
  { month: "Jan", actual: 4380, target: 4500, previous: 4150 },
  { month: "Feb", actual: 4520, target: 4700, previous: 4300 },
];

const plantPerformance = [
  { name: "Plant A - 10MW", value: 98.2 },
  { name: "Plant B - 25MW", value: 96.5 },
  { name: "Plant C - 50MW", value: 95.8 },
  { name: "Plant D - 30MW", value: 94.3 },
  { name: "Plant E - 15MW", value: 97.1 },
];

const outageDistribution = [
  { name: "Grid Outage", value: 35, color: "#EF4444" },
  { name: "Equipment Failure", value: 28, color: "#F59E0B" },
  { name: "Maintenance", value: 22, color: "#10B981" },
  { name: "Weather", value: 15, color: "#3B82F6" },
];

const recentAlerts = [
  { id: 1, plant: "Plant C - 50MW", issue: "Inverter INV-12 Down", severity: "high", time: "2 hours ago" },
  { id: 2, plant: "Plant A - 10MW", issue: "Low String Voltage - Block 3", severity: "medium", time: "4 hours ago" },
  { id: 3, plant: "Plant B - 25MW", issue: "Grid Frequency Variation", severity: "low", time: "6 hours ago" },
  { id: 4, plant: "Plant D - 30MW", issue: "SCADA Communication Loss", severity: "high", time: "8 hours ago" },
];

export function Dashboard() {
  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-600 mt-1">FY 2025-26 | February 2026 | All Plants</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: kpi.color + "20" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                  </div>
                </div>
                <h3 className="text-xs font-medium text-gray-600 mb-2">{kpi.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-gray-900">{kpi.value}</span>
                  <span
                    className={`text-xs font-medium flex items-center gap-1 ${
                      kpi.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {kpi.trend === "up" ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {kpi.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Generation Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Monthly Generation Trend (MWh)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={generationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6B7280" />
                <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="actual" stroke="#0B3C5D" strokeWidth={2} name="Actual" />
                <Line type="monotone" dataKey="target" stroke="#F4B400" strokeWidth={2} name="Target" />
                <Line type="monotone" dataKey="previous" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" name="Previous Year" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Outage Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Outage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={outageDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {outageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Plant Performance & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plant Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Plant Availability (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={plantPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" domain={[90, 100]} tick={{ fontSize: 12 }} stroke="#6B7280" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="#6B7280" width={120} />
                <Tooltip />
                <Bar dataKey="value" fill="#0B3C5D" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Recent Alerts & Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={
                          alert.severity === "high"
                            ? "destructive"
                            : alert.severity === "medium"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-900">{alert.issue}</h4>
                    <p className="text-xs text-gray-600 mt-1">{alert.plant}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

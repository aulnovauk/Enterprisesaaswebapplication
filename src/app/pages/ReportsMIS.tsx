import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Progress } from "../components/ui/progress";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../components/ui/select";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription 
} from "../components/ui/dialog";
import {
  FileText,
  Download,
  Calendar,
  Mail,
  Save,
  Play,
  Settings,
  Plus,
  Trash2,
  Database,
  BarChart3,
  Filter,
  Clock,
  Users,
  Send,
  FileSpreadsheet,
  Eye,
  Copy,
  Edit3,
  TrendingUp,
  Zap,
  CheckCircle,
  AlertCircle,
  Search,
  Star,
  MoreVertical,
  RefreshCw,
  Layers,
  PieChart,
  Activity,
  DollarSign,
  Target,
  BookOpen,
  Sparkles,
  ArrowRight,
  FileBarChart,
  Grid3x3,
  LayoutGrid,
  CalendarDays,
  UserPlus,
  Share2,
  Pencil,
  Maximize2,
  X,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Table2,
  LineChart,
  AreaChart as AreaChartIcon,
  Hash,
  Type,
  Sigma,
  Wand2,
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  LineChart as RLineChart, 
  Line, 
  AreaChart,
  Area,
  PieChart as RPieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { toast } from "sonner";

// Data fields available for reporting (Power BI style)
const dataFields = [
  // Performance Measures
  { id: "generation", name: "Generation (MWh)", category: "Performance", type: "measure", icon: Zap },
  { id: "availability", name: "Availability (%)", category: "Performance", type: "measure", icon: Activity },
  { id: "cuf", name: "CUF (%)", category: "Performance", type: "measure", icon: TrendingUp },
  { id: "pr", name: "Performance Ratio (%)", category: "Performance", type: "measure", icon: Target },
  { id: "gridAvailability", name: "Grid Availability (%)", category: "Performance", type: "measure", icon: Activity },
  
  // Environmental Measures
  { id: "irradiation", name: "Irradiation (kWh/m²)", category: "Environmental", type: "measure", icon: Sparkles },
  { id: "ambientTemp", name: "Ambient Temperature (°C)", category: "Environmental", type: "measure", icon: Activity },
  { id: "moduleTemp", name: "Module Temperature (°C)", category: "Environmental", type: "measure", icon: Activity },
  
  // Financial Measures
  { id: "revenue", name: "Revenue (₹L)", category: "Financial", type: "measure", icon: DollarSign },
  { id: "ldAmount", name: "LD Amount (₹L)", category: "Financial", type: "measure", icon: AlertCircle },
  { id: "omCost", name: "O&M Cost (₹L)", category: "Financial", type: "measure", icon: DollarSign },
  { id: "energyRevenue", name: "Energy Revenue (₹L)", category: "Financial", type: "measure", icon: DollarSign },
  
  // Loss Analysis Measures
  { id: "energyLoss", name: "Energy Loss (MWh)", category: "Loss Analysis", type: "measure", icon: AlertCircle },
  { id: "downtime", name: "Downtime (Hours)", category: "Loss Analysis", type: "measure", icon: Clock },
  { id: "curtailment", name: "Curtailment Loss (MWh)", category: "Loss Analysis", type: "measure", icon: TrendingUp },
  { id: "transmissionLoss", name: "Transmission Loss (%)", category: "Loss Analysis", type: "measure", icon: Activity },
  
  // Dimensions
  { id: "plant", name: "Plant Name", category: "Location", type: "dimension", icon: Database },
  { id: "state", name: "State", category: "Location", type: "dimension", icon: Database },
  { id: "region", name: "Region", category: "Location", type: "dimension", icon: Database },
  { id: "cluster", name: "Cluster", category: "Location", type: "dimension", icon: Layers },
  
  { id: "vendor", name: "Vendor", category: "Organization", type: "dimension", icon: Users },
  { id: "client", name: "Client", category: "Organization", type: "dimension", icon: Users },
  { id: "owner", name: "Owner", category: "Organization", type: "dimension", icon: Users },
  
  { id: "date", name: "Date", category: "Time", type: "dimension", icon: Calendar },
  { id: "month", name: "Month", category: "Time", type: "dimension", icon: Calendar },
  { id: "quarter", name: "Quarter", category: "Time", type: "dimension", icon: Calendar },
  { id: "year", name: "Year", category: "Time", type: "dimension", icon: Calendar },
];

// Visualization types
const visualizationTypes = [
  { id: "table", name: "Table", icon: Table2, color: "blue" },
  { id: "bar", name: "Bar Chart", icon: BarChart3, color: "emerald" },
  { id: "line", name: "Line Chart", icon: LineChart, color: "purple" },
  { id: "area", name: "Area Chart", icon: AreaChartIcon, color: "amber" },
  { id: "pie", name: "Pie Chart", icon: PieChart, color: "rose" },
  { id: "kpi", name: "KPI Card", icon: Target, color: "blue" },
];

// Sample preview data
const sampleData = [
  { plant: "Plant A - Jaipur", state: "Rajasthan", region: "North", generation: 820, availability: 96.2, cuf: 21.8, revenue: 245, ldAmount: 0.36, energyLoss: 12.5, downtime: 8.2 },
  { plant: "Plant B - Gandhinagar", state: "Gujarat", region: "West", generation: 1980, availability: 93.8, cuf: 22.1, revenue: 592, ldAmount: 1.8, energyLoss: 45.2, downtime: 14.5 },
  { plant: "Plant C - Rewa", state: "Madhya Pradesh", region: "Central", generation: 4100, availability: 94.5, cuf: 22.3, revenue: 1225, ldAmount: 1.0, energyLoss: 38.6, downtime: 11.8 },
  { plant: "Plant D - Bangalore", state: "Karnataka", region: "South", generation: 2300, availability: 92.1, cuf: 20.8, revenue: 687, ldAmount: 3.6, energyLoss: 62.3, downtime: 18.9 },
  { plant: "Plant E - Lucknow", state: "Uttar Pradesh", region: "North", generation: 1280, availability: 97.3, cuf: 23.5, revenue: 382, ldAmount: 0, energyLoss: 8.1, downtime: 4.2 },
  { plant: "Plant F - Pune", state: "Maharashtra", region: "West", generation: 3200, availability: 95.8, cuf: 22.8, revenue: 956, ldAmount: 0.5, energyLoss: 28.4, downtime: 9.6 },
  { plant: "Plant G - Hyderabad", state: "Telangana", region: "South", generation: 2850, availability: 94.2, cuf: 21.9, revenue: 852, ldAmount: 1.2, energyLoss: 34.7, downtime: 12.3 },
];

// Report templates (same as before)
const reportTemplates = [
  {
    id: "monthly-perf",
    name: "Monthly Performance Report",
    description: "Comprehensive monthly generation and performance metrics",
    category: "Operational",
    frequency: "Monthly",
    lastGenerated: "Feb 28, 2026",
    recipients: 15,
    status: "scheduled",
    icon: Activity,
    color: "blue",
    thumbnail: "chart",
    tags: ["CUF", "Generation", "Availability"],
    estimatedTime: "2 min",
  },
  {
    id: "exec-dashboard",
    name: "Executive Dashboard",
    description: "High-level KPIs and insights for leadership",
    category: "Analytics",
    frequency: "Weekly",
    lastGenerated: "Mar 1, 2026",
    recipients: 5,
    status: "active",
    icon: TrendingUp,
    color: "purple",
    thumbnail: "dashboard",
    tags: ["KPI", "Trends", "Summary"],
    estimatedTime: "3 min",
  },
  {
    id: "ld-compliance",
    name: "LD & Compliance Report",
    description: "Contractual obligations and penalty tracking",
    category: "Commercial",
    frequency: "Monthly",
    lastGenerated: "Feb 28, 2026",
    recipients: 8,
    status: "scheduled",
    icon: FileBarChart,
    color: "amber",
    thumbnail: "table",
    tags: ["LD", "Penalties", "Contract"],
    estimatedTime: "4 min",
  },
  {
    id: "vendor-comparison",
    name: "Vendor Performance Comparison",
    description: "Multi-vendor analysis and benchmarking",
    category: "Analytics",
    frequency: "Quarterly",
    lastGenerated: "Jan 31, 2026",
    recipients: 12,
    status: "draft",
    icon: Users,
    color: "emerald",
    thumbnail: "comparison",
    tags: ["Vendors", "Benchmark", "Analysis"],
    estimatedTime: "5 min",
  },
  {
    id: "jmr-summary",
    name: "JMR Data Summary",
    description: "Consolidated Joint Meter Reading data across all plants",
    category: "Compliance",
    frequency: "Monthly",
    lastGenerated: "Feb 28, 2026",
    recipients: 20,
    status: "scheduled",
    icon: Database,
    color: "blue",
    thumbnail: "table",
    tags: ["JMR", "Compliance", "Data"],
    estimatedTime: "3 min",
  },
  {
    id: "revenue-analysis",
    name: "Revenue Analysis Report",
    description: "Financial performance and revenue realization tracking",
    category: "Commercial",
    frequency: "Monthly",
    lastGenerated: "Feb 28, 2026",
    recipients: 10,
    status: "active",
    icon: DollarSign,
    color: "green",
    thumbnail: "chart",
    tags: ["Revenue", "Finance", "Billing"],
    estimatedTime: "3 min",
  },
  {
    id: "outage-analysis",
    name: "Outage & Loss Analysis",
    description: "Detailed breakdown of downtime and energy losses",
    category: "Operational",
    frequency: "Weekly",
    lastGenerated: "Mar 1, 2026",
    recipients: 18,
    status: "active",
    icon: AlertCircle,
    color: "red",
    thumbnail: "chart",
    tags: ["Outage", "Loss", "Downtime"],
    estimatedTime: "4 min",
  },
  {
    id: "forecast-report",
    name: "Generation Forecast Report",
    description: "AI-powered generation predictions and weather analysis",
    category: "Analytics",
    frequency: "Daily",
    lastGenerated: "Today",
    recipients: 25,
    status: "active",
    icon: Sparkles,
    color: "purple",
    thumbnail: "forecast",
    tags: ["AI", "Forecast", "Prediction"],
    estimatedTime: "2 min",
  },
];

// Scheduled reports
const scheduledReports = [
  {
    id: "SCH-001",
    name: "Daily Generation Summary",
    schedule: "Daily at 6:00 AM",
    nextRun: "Tomorrow, 6:00 AM",
    recipients: ["ops@eesl.in", "management@eesl.in"],
    status: "active",
    lastRun: "Today, 6:00 AM",
  },
  {
    id: "SCH-002",
    name: "Weekly Performance Report",
    schedule: "Every Monday at 8:00 AM",
    nextRun: "Mon, Mar 3, 8:00 AM",
    recipients: ["executive@eesl.in"],
    status: "active",
    lastRun: "Mon, Feb 24, 8:00 AM",
  },
  {
    id: "SCH-003",
    name: "Monthly Financial Report",
    schedule: "1st of every month at 9:00 AM",
    nextRun: "Apr 1, 9:00 AM",
    recipients: ["finance@eesl.in", "cfo@eesl.in"],
    status: "active",
    lastRun: "Mar 1, 9:00 AM",
  },
  {
    id: "SCH-004",
    name: "Quarterly Board Report",
    schedule: "Quarterly - 5th of Q end month",
    nextRun: "Apr 5, 10:00 AM",
    recipients: ["board@eesl.in"],
    status: "paused",
    lastRun: "Jan 5, 10:00 AM",
  },
];

// Recent reports
const recentReports = [
  {
    id: "RPT-2026-0301",
    name: "Executive Dashboard",
    generatedAt: "Mar 1, 2026 9:00 AM",
    generatedBy: "System Scheduler",
    format: "PDF",
    size: "2.4 MB",
    status: "completed",
    downloadUrl: "#",
  },
  {
    id: "RPT-2026-0228",
    name: "Monthly Performance Report - February",
    generatedAt: "Feb 28, 2026 8:00 AM",
    generatedBy: "Rajesh Kumar",
    format: "Excel",
    size: "5.8 MB",
    status: "completed",
    downloadUrl: "#",
  },
  {
    id: "RPT-2026-0228B",
    name: "JMR Data Summary - February",
    generatedAt: "Feb 28, 2026 10:30 AM",
    generatedBy: "System Scheduler",
    format: "PDF",
    size: "1.2 MB",
    status: "completed",
    downloadUrl: "#",
  },
  {
    id: "RPT-2026-0227",
    name: "Vendor Performance Comparison",
    generatedAt: "Feb 27, 2026 3:00 PM",
    generatedBy: "Priya Sharma",
    format: "Excel",
    size: "3.6 MB",
    status: "failed",
    downloadUrl: "#",
  },
];

// Report usage analytics data
const usageAnalytics = [
  { month: "Oct", reports: 45, downloads: 120 },
  { month: "Nov", reports: 52, downloads: 135 },
  { month: "Dec", reports: 48, downloads: 128 },
  { month: "Jan", reports: 58, downloads: 155 },
  { month: "Feb", reports: 62, downloads: 168 },
];

const categoryColors: any = {
  Operational: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500" },
  Commercial: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  Compliance: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
  Analytics: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500" },
};

const statusConfig: any = {
  active: { label: "Active", color: "bg-emerald-600 text-white", dot: "bg-emerald-500" },
  scheduled: { label: "Scheduled", color: "bg-blue-600 text-white", dot: "bg-blue-500" },
  draft: { label: "Draft", color: "bg-slate-400 text-white", dot: "bg-slate-400" },
  paused: { label: "Paused", color: "bg-amber-600 text-white", dot: "bg-amber-500" },
  completed: { label: "Completed", color: "bg-emerald-600 text-white", dot: "bg-emerald-500" },
  failed: { label: "Failed", color: "bg-rose-600 text-white", dot: "bg-rose-500" },
};

// Draggable Field Component (Power BI Style)
function DraggableField({ field }: { field: typeof dataFields[0] }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FIELD",
    item: { field },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const Icon = field.icon;

  return (
    <div
      ref={drag}
      className={`group flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all cursor-move
        ${isDragging 
          ? "opacity-40 border-[#0B3C5D] bg-blue-50" 
          : "border-slate-200 bg-white hover:border-[#0B3C5D] hover:bg-blue-50 hover:shadow-sm"
        }`}
    >
      <GripVertical className="w-3 h-3 text-slate-400 group-hover:text-[#0B3C5D]" />
      <Icon className="w-3.5 h-3.5 text-slate-500" />
      <span className="text-xs font-medium text-slate-700 flex-1">{field.name}</span>
      <Badge 
        variant="outline" 
        className={`text-[10px] px-1.5 py-0 ${
          field.type === "measure" 
            ? "bg-blue-50 text-blue-700 border-blue-200" 
            : "bg-purple-50 text-purple-700 border-purple-200"
        }`}
      >
        {field.type === "measure" ? <Hash className="w-3 h-3" /> : <Type className="w-3 h-3" />}
      </Badge>
    </div>
  );
}

// Drop Zone Component (Power BI Style Field Well)
function FieldWell({ 
  title, 
  icon: Icon, 
  fields, 
  onDrop, 
  onRemove,
  acceptType 
}: any) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "FIELD",
    drop: (item: any) => onDrop(item.field),
    canDrop: (item: any) => acceptType === "all" || item.field.type === acceptType,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`rounded-xl border-2 transition-all min-h-[100px] p-4
        ${isOver && canDrop
          ? "border-[#0B3C5D] bg-blue-50 shadow-lg" 
          : canDrop
          ? "border-dashed border-slate-300 bg-slate-50"
          : "border-dashed border-slate-200 bg-white"
        }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-slate-600" />
        <Label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{title}</Label>
        {fields.length > 0 && (
          <Badge variant="secondary" className="ml-auto text-xs bg-[#0B3C5D] text-white">
            {fields.length}
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        {fields.length === 0 ? (
          <div className="text-center py-6">
            <Database className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-400">Drag fields here</p>
          </div>
        ) : (
          fields.map((field: any, idx: number) => {
            const FieldIcon = field.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2 p-2 bg-white rounded-lg border-2 border-slate-200 group hover:border-rose-300"
              >
                <FieldIcon className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs font-medium text-slate-700 flex-1">{field.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(idx)}
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-rose-50 hover:text-rose-600"
                >
                  <X className="w-3 h-3" />
                </Button>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}

type ViewMode = "gallery" | "builder" | "scheduled" | "history" | "analytics";

export function ReportsMIS() {
  const [viewMode, setViewMode] = useState<ViewMode>("gallery");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof reportTemplates[0] | null>(null);

  // Report Builder State
  const [rowFields, setRowFields] = useState<any[]>([]);
  const [columnFields, setColumnFields] = useState<any[]>([]);
  const [filterFields, setFilterFields] = useState<any[]>([]);
  const [visualizationType, setVisualizationType] = useState("table");
  const [aggregationType, setAggregationType] = useState("sum");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Performance", "Location", "Time"]);
  const [reportName, setReportName] = useState("Untitled Report");

  const filteredTemplates = reportTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(reportTemplates.map(t => t.category)));
  const fieldCategories = Array.from(new Set(dataFields.map(f => f.category)));

  // Statistics
  const stats = {
    totalTemplates: reportTemplates.length,
    activeSchedules: scheduledReports.filter(r => r.status === "active").length,
    reportsThisMonth: 62,
    avgGenerationTime: "3.2 min",
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleFieldDrop = (field: any, zone: "row" | "column" | "filter") => {
    const setter = zone === "row" ? setRowFields : zone === "column" ? setColumnFields : setFilterFields;
    const current = zone === "row" ? rowFields : zone === "column" ? columnFields : filterFields;
    
    if (!current.some(f => f.id === field.id)) {
      setter([...current, field]);
      toast.success(`${field.name} added to ${zone}s`);
    }
  };

  const handleFieldRemove = (index: number, zone: "row" | "column" | "filter") => {
    const setter = zone === "row" ? setRowFields : zone === "column" ? setColumnFields : setFilterFields;
    const current = zone === "row" ? rowFields : zone === "column" ? columnFields : filterFields;
    
    setter(current.filter((_, idx) => idx !== index));
  };

  const clearAllFields = () => {
    setRowFields([]);
    setColumnFields([]);
    setFilterFields([]);
    toast.success("All fields cleared");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
        
        {/* Enhanced Header */}
        <div className="bg-white border-b border-slate-200 shadow-sm shrink-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/80 rounded-xl shadow-md">
                  <FileBarChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 leading-none">Reports & MIS</h1>
                  <p className="text-sm text-slate-600 mt-1">Management Information System · Power BI-Style Reporting</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  className="gap-2 border-slate-300"
                  onClick={() => setScheduleDialogOpen(true)}
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Report
                </Button>
                
                <Button 
                  className="gap-2 bg-[#0B3C5D] hover:bg-[#082a42] text-white shadow-md"
                  onClick={() => setViewMode("builder")}
                >
                  <Wand2 className="w-4 h-4" />
                  Report Builder
                </Button>

                <Button variant="outline" size="icon" className="border-slate-300">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-600">Report Templates</span>
                    <LayoutGrid className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stats.totalTemplates}</div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-gradient-to-br from-emerald-50 to-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-600">Active Schedules</span>
                    <CalendarDays className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stats.activeSchedules}</div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-gradient-to-br from-purple-50 to-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-600">Reports This Month</span>
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stats.reportsThisMonth}</div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-gradient-to-br from-amber-50 to-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-600">Avg Gen Time</span>
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stats.avgGenerationTime}</div>
                </CardContent>
              </Card>
            </div>

            {/* View Mode Tabs */}
            <div className="flex items-center justify-between">
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="w-auto">
                <TabsList className="bg-slate-100 border border-slate-200 p-1 h-11">
                  <TabsTrigger value="gallery" className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm px-4">
                    <Grid3x3 className="w-4 h-4" />
                    Template Gallery
                  </TabsTrigger>
                  <TabsTrigger value="builder" className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm px-4">
                    <Wand2 className="w-4 h-4" />
                    Report Builder
                  </TabsTrigger>
                  <TabsTrigger value="scheduled" className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm px-4">
                    <CalendarDays className="w-4 h-4" />
                    Scheduled Reports
                  </TabsTrigger>
                  <TabsTrigger value="history" className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm px-4">
                    <Clock className="w-4 h-4" />
                    Report History
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm px-4">
                    <BarChart3 className="w-4 h-4" />
                    Analytics
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Search & Filters */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-64 h-10 bg-slate-50 border-slate-200"
                  />
                </div>

                {viewMode === "gallery" && (
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40 h-10 bg-slate-50">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          
          {/* Template Gallery View */}
          {viewMode === "gallery" && (
            <ScrollArea className="h-full">
              <div className="p-8 max-w-[1600px] mx-auto pb-12">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredTemplates.map((template) => {
                    const Icon = template.icon;
                    const categoryStyle = categoryColors[template.category];
                    const statusStyle = statusConfig[template.status];
                    
                    return (
                      <motion.div
                        key={template.id}
                        whileHover={{ y: -4 }}
                        className="group"
                      >
                        <Card className="border-2 border-slate-200 hover:border-[#0B3C5D] hover:shadow-xl transition-all cursor-pointer h-full">
                          <CardHeader className="pb-3">
                            {/* Thumbnail Preview */}
                            <div className={`h-32 rounded-lg mb-4 ${categoryStyle.bg} ${categoryStyle.border} border-2 flex items-center justify-center relative overflow-hidden`}>
                              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
                              <Icon className={`w-12 h-12 ${categoryStyle.text} relative z-10`} />
                              
                              {/* Hover Actions */}
                              <div className="absolute inset-0 bg-[#0B3C5D]/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="gap-2 bg-white hover:bg-slate-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTemplate(template);
                                    setPreviewDialogOpen(true);
                                  }}
                                >
                                  <Eye className="w-4 h-4" />
                                  Preview
                                </Button>
                                <Button
                                  size="sm"
                                  className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast.success(`Generating ${template.name}...`);
                                  }}
                                >
                                  <Play className="w-4 h-4" />
                                  Generate
                                </Button>
                              </div>
                            </div>

                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-slate-900 text-sm mb-1 truncate">{template.name}</h3>
                                <Badge variant="outline" className={`text-xs ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}>
                                  {template.category}
                                </Badge>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>

                            <p className="text-xs text-slate-600 line-clamp-2 mb-3">{template.description}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {template.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0 bg-slate-100 text-slate-700">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardHeader>

                          <Separator />

                          <CardContent className="pt-3 pb-3">
                            <div className="space-y-2 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="text-slate-600">Status:</span>
                                <Badge className={`${statusStyle.color} text-xs px-2 py-0`}>
                                  {statusStyle.label}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-600">Frequency:</span>
                                <span className="font-semibold text-slate-900">{template.frequency}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-600">Recipients:</span>
                                <span className="font-semibold text-slate-900 flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {template.recipients}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-600">Last Generated:</span>
                                <span className="font-medium text-slate-700">{template.lastGenerated}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-600">Est. Time:</span>
                                <span className="font-medium text-slate-700 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {template.estimatedTime}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {filteredTemplates.length === 0 && (
                  <div className="text-center py-24">
                    <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No reports found</h3>
                    <p className="text-slate-600 mb-6">Try adjusting your search or filters</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setCategoryFilter("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}

          {/* POWER BI-STYLE REPORT BUILDER VIEW */}
          {viewMode === "builder" && (
            <div className="flex h-full overflow-hidden">
              
              {/* LEFT PANEL - Fields Palette */}
              <div className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 shadow-sm">
                <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/90">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-5 h-5 text-white" />
                    <h2 className="text-sm font-bold text-white">Data Fields</h2>
                  </div>
                  <p className="text-xs text-blue-100">Drag fields to build your report</p>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-3">
                    {fieldCategories.map((category) => (
                      <div key={category} className="space-y-2">
                        <button
                          onClick={() => toggleCategory(category)}
                          className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{category}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {dataFields.filter(f => f.category === category).length}
                            </Badge>
                            {expandedCategories.includes(category) ? (
                              <ChevronDown className="w-4 h-4 text-slate-500" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-500" />
                            )}
                          </div>
                        </button>

                        <AnimatePresence>
                          {expandedCategories.includes(category) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-1.5 pl-2"
                            >
                              {dataFields
                                .filter(f => f.category === category)
                                .map((field) => (
                                  <DraggableField key={field.id} field={field} />
                                ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Quick Actions */}
                <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2 text-xs"
                    onClick={clearAllFields}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Clear All Fields
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2 text-xs"
                  >
                    <Wand2 className="w-4 h-4" />
                    Auto-Generate Report
                  </Button>
                </div>
              </div>

              {/* CENTER PANEL - Report Canvas */}
              <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
                
                {/* Canvas Toolbar */}
                <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
                  <div className="flex items-center gap-3">
                    <Input
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                      className="font-semibold text-sm border-none shadow-none focus-visible:ring-0 px-0 w-64"
                    />
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">Unsaved</Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Copy className="w-4 h-4" />
                      Load Template
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                    <Button size="sm" className="gap-2 bg-[#0B3C5D]">
                      <Play className="w-4 h-4" />
                      Generate Report
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-6 space-y-6">
                    
                    {/* Field Wells (Power BI Style) */}
                    <Card className="border-2 border-slate-200 shadow-lg">
                      <CardHeader className="border-b bg-slate-50 pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Layers className="w-4 h-4" />
                          Field Wells
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Drag and drop fields to configure your report structure
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-3 gap-4">
                          <FieldWell
                            title="Rows / Dimensions"
                            icon={Database}
                            fields={rowFields}
                            onDrop={(field: any) => handleFieldDrop(field, "row")}
                            onRemove={(idx: number) => handleFieldRemove(idx, "row")}
                            acceptType="dimension"
                          />
                          
                          <FieldWell
                            title="Columns / Values"
                            icon={Sigma}
                            fields={columnFields}
                            onDrop={(field: any) => handleFieldDrop(field, "column")}
                            onRemove={(idx: number) => handleFieldRemove(idx, "column")}
                            acceptType="measure"
                          />
                          
                          <FieldWell
                            title="Filters"
                            icon={Filter}
                            fields={filterFields}
                            onDrop={(field: any) => handleFieldDrop(field, "filter")}
                            onRemove={(idx: number) => handleFieldRemove(idx, "filter")}
                            acceptType="all"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Live Preview */}
                    <Card className="border-2 border-slate-200 shadow-lg">
                      <CardHeader className="border-b bg-slate-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-sm flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              Live Preview
                            </CardTitle>
                            <CardDescription className="text-xs mt-1">
                              Real-time visualization of your report
                            </CardDescription>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Visualization Type Selector */}
                            <Select value={visualizationType} onValueChange={setVisualizationType}>
                              <SelectTrigger className="w-40 h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {visualizationTypes.map((viz) => {
                                  const VizIcon = viz.icon;
                                  return (
                                    <SelectItem key={viz.id} value={viz.id}>
                                      <div className="flex items-center gap-2">
                                        <VizIcon className="w-4 h-4" />
                                        {viz.name}
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>

                            <Select value={aggregationType} onValueChange={setAggregationType}>
                              <SelectTrigger className="w-32 h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sum">Sum</SelectItem>
                                <SelectItem value="avg">Average</SelectItem>
                                <SelectItem value="count">Count</SelectItem>
                                <SelectItem value="min">Minimum</SelectItem>
                                <SelectItem value="max">Maximum</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        {rowFields.length === 0 && columnFields.length === 0 ? (
                          <div className="text-center py-20">
                            <Wand2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Build Your Report</h3>
                            <p className="text-sm text-slate-600 mb-6">
                              Drag fields from the left panel into the field wells above
                            </p>
                            <div className="flex gap-2 justify-center">
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                <Hash className="w-3 h-3 mr-1" />
                                Measures = Values
                              </Badge>
                              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                <Type className="w-3 h-3 mr-1" />
                                Dimensions = Rows
                              </Badge>
                            </div>
                          </div>
                        ) : (
                          <div className="min-h-[400px]">
                            {visualizationType === "table" && (
                              <div className="overflow-x-auto">
                                <Table>
                                  <TableHeader>
                                    <TableRow className="bg-slate-50">
                                      {rowFields.map((field) => (
                                        <TableHead key={field.id} className="font-bold text-xs">
                                          {field.name}
                                        </TableHead>
                                      ))}
                                      {columnFields.map((field) => (
                                        <TableHead key={field.id} className="font-bold text-xs text-right">
                                          {field.name}
                                        </TableHead>
                                      ))}
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {sampleData.slice(0, 7).map((row, idx) => (
                                      <TableRow key={idx}>
                                        {rowFields.map((field) => (
                                          <TableCell key={field.id} className="text-xs font-medium">
                                            {(row as any)[field.id] ?? "-"}
                                          </TableCell>
                                        ))}
                                        {columnFields.map((field) => (
                                          <TableCell key={field.id} className="text-xs text-right font-semibold">
                                            {(row as any)[field.id]?.toLocaleString() ?? "-"}
                                          </TableCell>
                                        ))}
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            )}

                            {visualizationType === "bar" && columnFields.length > 0 && (
                              <div className="h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={sampleData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis 
                                      dataKey={rowFields[0]?.id || "plant"} 
                                      tick={{ fontSize: 11 }} 
                                      stroke="#64748b" 
                                    />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#64748b" />
                                    <Tooltip 
                                      contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                      }}
                                    />
                                    <Legend />
                                    {columnFields.map((field, idx) => (
                                      <Bar 
                                        key={field.id} 
                                        dataKey={field.id} 
                                        fill={idx === 0 ? "#0B3C5D" : idx === 1 ? "#10B981" : "#F4B400"} 
                                        name={field.name}
                                      />
                                    ))}
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            )}

                            {visualizationType === "line" && columnFields.length > 0 && (
                              <div className="h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                  <RLineChart data={sampleData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis 
                                      dataKey={rowFields[0]?.id || "plant"} 
                                      tick={{ fontSize: 11 }} 
                                      stroke="#64748b" 
                                    />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#64748b" />
                                    <Tooltip 
                                      contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                      }}
                                    />
                                    <Legend />
                                    {columnFields.map((field, idx) => (
                                      <Line 
                                        key={field.id} 
                                        type="monotone"
                                        dataKey={field.id} 
                                        stroke={idx === 0 ? "#0B3C5D" : idx === 1 ? "#10B981" : "#F4B400"} 
                                        strokeWidth={2}
                                        name={field.name}
                                      />
                                    ))}
                                  </RLineChart>
                                </ResponsiveContainer>
                              </div>
                            )}

                            {visualizationType === "area" && columnFields.length > 0 && (
                              <div className="h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart data={sampleData}>
                                    <defs>
                                      <linearGradient id="colorField1" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0B3C5D" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#0B3C5D" stopOpacity={0}/>
                                      </linearGradient>
                                      <linearGradient id="colorField2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                      </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis 
                                      dataKey={rowFields[0]?.id || "plant"} 
                                      tick={{ fontSize: 11 }} 
                                      stroke="#64748b" 
                                    />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#64748b" />
                                    <Tooltip 
                                      contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                      }}
                                    />
                                    <Legend />
                                    {columnFields.map((field, idx) => (
                                      <Area 
                                        key={field.id} 
                                        type="monotone"
                                        dataKey={field.id} 
                                        stroke={idx === 0 ? "#0B3C5D" : "#10B981"} 
                                        strokeWidth={2}
                                        fill={idx === 0 ? "url(#colorField1)" : "url(#colorField2)"}
                                        name={field.name}
                                      />
                                    ))}
                                  </AreaChart>
                                </ResponsiveContainer>
                              </div>
                            )}

                            {visualizationType === "pie" && columnFields.length > 0 && rowFields.length > 0 && (
                              <div className="h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                  <RPieChart>
                                    <Pie
                                      data={sampleData.slice(0, 5)}
                                      dataKey={columnFields[0].id}
                                      nameKey={rowFields[0].id}
                                      cx="50%"
                                      cy="50%"
                                      outerRadius={120}
                                      label
                                    >
                                      {sampleData.slice(0, 5).map((entry, index) => (
                                        <Cell 
                                          key={`cell-${index}`} 
                                          fill={['#0B3C5D', '#10B981', '#F4B400', '#8B5CF6', '#EF4444'][index]}
                                        />
                                      ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                  </RPieChart>
                                </ResponsiveContainer>
                              </div>
                            )}

                            {visualizationType === "kpi" && columnFields.length > 0 && (
                              <div className="grid grid-cols-4 gap-6">
                                {columnFields.map((field, idx) => {
                                  const value = sampleData.reduce((sum, row) => sum + ((row as any)[field.id] || 0), 0);
                                  const avg = value / sampleData.length;
                                  
                                  return (
                                    <Card key={field.id} className="border-2 border-slate-200">
                                      <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                          <span className="text-sm font-medium text-slate-600">{field.name}</span>
                                          <Target className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="text-3xl font-bold text-slate-900 mb-2">
                                          {aggregationType === "sum" ? value.toLocaleString() : avg.toFixed(1)}
                                        </div>
                                        <div className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                                          <TrendingUp className="w-4 h-4" />
                                          +12% vs last period
                                        </div>
                                      </CardContent>
                                    </Card>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                  </div>
                </ScrollArea>
              </div>

              {/* RIGHT PANEL - Settings & Export */}
              <div className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0 shadow-sm">
                <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/90">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-5 h-5 text-white" />
                    <h2 className="text-sm font-bold text-white">Settings & Export</h2>
                  </div>
                  <p className="text-xs text-blue-100">Configure report options</p>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-6">
                    
                    {/* Aggregation Settings */}
                    <div>
                      <Label className="text-xs font-bold text-slate-700 mb-3 block uppercase tracking-wide">
                        Aggregation Method
                      </Label>
                      <Select value={aggregationType} onValueChange={setAggregationType}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sum">Sum (Total)</SelectItem>
                          <SelectItem value="avg">Average</SelectItem>
                          <SelectItem value="count">Count</SelectItem>
                          <SelectItem value="min">Minimum</SelectItem>
                          <SelectItem value="max">Maximum</SelectItem>
                          <SelectItem value="weighted">Weighted Average</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    {/* Export Options */}
                    <div>
                      <Label className="text-xs font-bold text-slate-700 mb-3 block uppercase tracking-wide">
                        Export Format
                      </Label>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start gap-2 text-xs h-9">
                          <FileText className="w-4 h-4 text-red-600" />
                          Export as PDF
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 text-xs h-9">
                          <FileSpreadsheet className="w-4 h-4 text-green-600" />
                          Export as Excel (.xlsx)
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 text-xs h-9">
                          <Table2 className="w-4 h-4 text-blue-600" />
                          Export as CSV
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 text-xs h-9">
                          <Database className="w-4 h-4 text-indigo-600" />
                          Export as JSON
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Report Info */}
                    <div>
                      <Label className="text-xs font-bold text-slate-700 mb-3 block uppercase tracking-wide">
                        Report Summary
                      </Label>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Dimensions:</span>
                          <Badge variant="secondary">{rowFields.length}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Measures:</span>
                          <Badge variant="secondary">{columnFields.length}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Filters:</span>
                          <Badge variant="secondary">{filterFields.length}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Visualization:</span>
                          <Badge variant="secondary">{visualizationTypes.find(v => v.id === visualizationType)?.name}</Badge>
                        </div>
                      </div>
                    </div>

                  </div>
                </ScrollArea>

                {/* Save Actions */}
                <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
                  <Button className="w-full gap-2 bg-[#0B3C5D]">
                    <Save className="w-4 h-4" />
                    Save as Template
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Share2 className="w-4 h-4" />
                    Share Report
                  </Button>
                </div>
              </div>

            </div>
          )}

          {/* Scheduled Reports View (same as before) */}
          {viewMode === "scheduled" && (
            <ScrollArea className="h-full">
              <div className="p-8 max-w-[1400px] mx-auto pb-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Scheduled Reports</h2>
                    <p className="text-slate-600 mt-1">Automated report generation and distribution</p>
                  </div>
                  <Button 
                    className="gap-2 bg-[#0B3C5D]"
                    onClick={() => setScheduleDialogOpen(true)}
                  >
                    <Plus className="w-4 h-4" />
                    New Schedule
                  </Button>
                </div>

                <div className="grid gap-4">
                  {scheduledReports.map((schedule) => {
                    const statusStyle = statusConfig[schedule.status];
                    
                    return (
                      <Card key={schedule.id} className="border-slate-200 hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-lg font-bold text-slate-900">{schedule.name}</h3>
                                <Badge className={`${statusStyle.color} px-3 py-1`}>
                                  {statusStyle.label}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-4 gap-6 text-sm">
                                <div>
                                  <div className="text-slate-600 mb-1 flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Schedule
                                  </div>
                                  <div className="font-semibold text-slate-900">{schedule.schedule}</div>
                                </div>

                                <div>
                                  <div className="text-slate-600 mb-1 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Next Run
                                  </div>
                                  <div className="font-semibold text-slate-900">{schedule.nextRun}</div>
                                </div>

                                <div>
                                  <div className="text-slate-600 mb-1 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Recipients
                                  </div>
                                  <div className="font-semibold text-slate-900">{schedule.recipients.length} addresses</div>
                                </div>

                                <div>
                                  <div className="text-slate-600 mb-1 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Last Run
                                  </div>
                                  <div className="font-semibold text-slate-900">{schedule.lastRun}</div>
                                </div>
                              </div>

                              {/* Recipients List */}
                              <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="flex flex-wrap gap-2">
                                  {schedule.recipients.map((email) => (
                                    <Badge key={email} variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                      {email}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 ml-6">
                              <Button variant="outline" size="sm" className="gap-2">
                                <Pencil className="w-4 h-4" />
                                Edit
                              </Button>
                              {schedule.status === "active" ? (
                                <Button variant="outline" size="sm" className="gap-2">
                                  <AlertCircle className="w-4 h-4" />
                                  Pause
                                </Button>
                              ) : (
                                <Button variant="outline" size="sm" className="gap-2 text-emerald-600 border-emerald-300">
                                  <Play className="w-4 h-4" />
                                  Activate
                                </Button>
                              )}
                              <Button variant="outline" size="sm" className="gap-2 text-rose-600 border-rose-300">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </ScrollArea>
          )}

          {/* Report History View (same as before) */}
          {viewMode === "history" && (
            <ScrollArea className="h-full">
              <div className="p-8 max-w-[1400px] mx-auto pb-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Report History</h2>
                    <p className="text-slate-600 mt-1">Previously generated reports and downloads</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <Filter className="w-4 h-4" />
                      Filter
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Download className="w-4 h-4" />
                      Export List
                    </Button>
                  </div>
                </div>

                <Card className="border-slate-200 shadow-md">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50">
                          <TableHead className="font-bold">Report Name</TableHead>
                          <TableHead className="font-bold">Generated At</TableHead>
                          <TableHead className="font-bold">Generated By</TableHead>
                          <TableHead className="font-bold">Format</TableHead>
                          <TableHead className="font-bold">Size</TableHead>
                          <TableHead className="font-bold">Status</TableHead>
                          <TableHead className="text-right font-bold">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentReports.map((report) => {
                          const statusStyle = statusConfig[report.status];
                          
                          return (
                            <TableRow key={report.id} className="hover:bg-slate-50">
                              <TableCell>
                                <div>
                                  <div className="font-semibold text-slate-900">{report.name}</div>
                                  <div className="text-xs text-slate-500">{report.id}</div>
                                </div>
                              </TableCell>
                              <TableCell className="text-sm text-slate-700">{report.generatedAt}</TableCell>
                              <TableCell className="text-sm text-slate-700">{report.generatedBy}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">
                                  {report.format}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm font-medium text-slate-700">{report.size}</TableCell>
                              <TableCell>
                                <Badge className={`${statusStyle.color} text-xs`}>
                                  {statusStyle.label}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex gap-2 justify-end">
                                  <Button variant="outline" size="sm" className="gap-2">
                                    <Eye className="w-4 h-4" />
                                    View
                                  </Button>
                                  {report.status === "completed" && (
                                    <Button variant="outline" size="sm" className="gap-2">
                                      <Download className="w-4 h-4" />
                                      Download
                                    </Button>
                                  )}
                                  {report.status === "failed" && (
                                    <Button variant="outline" size="sm" className="gap-2 text-blue-600 border-blue-300">
                                      <RefreshCw className="w-4 h-4" />
                                      Retry
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          )}

          {/* Analytics View (same as before) */}
          {viewMode === "analytics" && (
            <ScrollArea className="h-full">
              <div className="p-8 max-w-[1400px] mx-auto pb-12">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Report Analytics</h2>
                  <p className="text-slate-600 mt-1">Usage statistics and performance metrics</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-4 gap-6 mb-6">
                  <Card className="border-slate-200 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-slate-600">Total Reports Generated</span>
                        <FileBarChart className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-4xl font-bold text-slate-900 mb-1">284</div>
                      <div className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +12% vs last month
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-slate-600">Total Downloads</span>
                        <Download className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-4xl font-bold text-slate-900 mb-1">756</div>
                      <div className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +18% vs last month
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-slate-600">Active Schedules</span>
                        <CalendarDays className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-4xl font-bold text-slate-900 mb-1">{stats.activeSchedules}</div>
                      <div className="text-sm text-slate-600">Running smoothly</div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-slate-600">Avg Generation Time</span>
                        <Clock className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="text-4xl font-bold text-slate-900 mb-1">{stats.avgGenerationTime}</div>
                      <div className="text-sm text-slate-600">System performance</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Usage Trends Chart */}
                <Card className="border-slate-200 shadow-md mb-6">
                  <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-base">Report Generation & Download Trends</CardTitle>
                    <CardDescription>Last 5 months activity</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={usageAnalytics}>
                          <defs>
                            <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0B3C5D" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#0B3C5D" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="month" stroke="#64748b" />
                          <YAxis stroke="#64748b" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e2e8f0',
                              borderRadius: '12px',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                          />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="reports" 
                            stroke="#0B3C5D" 
                            strokeWidth={2}
                            fill="url(#colorReports)" 
                            name="Reports Generated"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="downloads" 
                            stroke="#10B981" 
                            strokeWidth={2}
                            fill="url(#colorDownloads)" 
                            name="Downloads"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Popular Reports */}
                <div className="grid grid-cols-2 gap-6">
                  <Card className="border-slate-200 shadow-md">
                    <CardHeader className="border-b border-slate-100">
                      <CardTitle className="text-base">Most Popular Reports</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {reportTemplates.slice(0, 5).map((template, idx) => (
                          <div key={template.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                                {idx + 1}
                              </div>
                              <div>
                                <div className="font-semibold text-sm text-slate-900">{template.name}</div>
                                <div className="text-xs text-slate-600">{template.category}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-slate-900">{145 - idx * 20}</div>
                              <div className="text-xs text-slate-600">generations</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 shadow-md">
                    <CardHeader className="border-b border-slate-100">
                      <CardTitle className="text-base">Reports by Category</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {categories.map((category) => {
                          const count = reportTemplates.filter(t => t.category === category).length;
                          const percentage = (count / reportTemplates.length) * 100;
                          const style = categoryColors[category];
                          
                          return (
                            <div key={category}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-slate-900">{category}</span>
                                <span className="text-sm font-bold text-slate-900">{count} reports</span>
                              </div>
                              <Progress value={percentage} className="h-2" />
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Schedule Dialog */}
        <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl">Schedule Report Generation</DialogTitle>
              <DialogDescription>
                Configure automated report generation and email distribution
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div>
                <Label className="text-sm font-semibold mb-2 block">Select Report Template</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Frequency</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Time</Label>
                  <Input type="time" defaultValue="08:00" />
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Email Recipients</Label>
                <Input placeholder="Enter email addresses separated by commas" />
                <p className="text-xs text-slate-600 mt-1">e.g., ops@eesl.in, finance@eesl.in</p>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Export Format</Label>
                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" className="justify-start gap-2">
                    <FileText className="w-4 h-4 text-red-600" />
                    PDF
                  </Button>
                  <Button variant="outline" className="justify-start gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-green-600" />
                    Excel
                  </Button>
                  <Button variant="outline" className="justify-start gap-2">
                    <Database className="w-4 h-4 text-blue-600" />
                    CSV
                  </Button>
                  <Button variant="outline" className="justify-start gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    DOCX
                  </Button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setScheduleDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-[#0B3C5D]"
                  onClick={() => {
                    toast.success("Report schedule created successfully");
                    setScheduleDialogOpen(false);
                  }}
                >
                  Create Schedule
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Preview Dialog */}
        <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
          <DialogContent className="max-w-5xl h-[85vh]">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedTemplate?.name}</DialogTitle>
              <DialogDescription>{selectedTemplate?.description}</DialogDescription>
            </DialogHeader>
            <ScrollArea className="flex-1">
              <div className="p-6">
                <div className="text-center py-20">
                  <Eye className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Report Preview</h3>
                  <p className="text-slate-600 mb-6">Interactive preview of {selectedTemplate?.name}</p>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download Sample
                    </Button>
                    <Button className="bg-[#0B3C5D] gap-2">
                      <Play className="w-4 h-4" />
                      Generate Now
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  );
}

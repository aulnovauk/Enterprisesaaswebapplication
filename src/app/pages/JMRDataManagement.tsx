import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../components/ui/dialog";
import {
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Save,
  Send,
  Lock,
  AlertCircle,
  User,
  FileCheck,
  History,
  Eye,
  Plus,
  LayoutGrid,
  List,
  Zap,
  Activity,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Search,
  MoreVertical,
  RefreshCw,
  AlertTriangle,
  Info,
  ChevronRight,
  Edit3,
  MessageSquare,
  BarChart3,
  Check,
  Sparkles,
  Database,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ChevronDown,
  ChevronLeft,
  Settings,
  Users,
  PlayCircle,
  PauseCircle,
  MapPin,
  Building2,
  Layers,
  Target,
  DollarSign,
  Percent,
  SlidersHorizontal,
  Copy,
  X,
  Lightbulb,
  BookOpen,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "../components/ui/scroll-area";
import { toast } from "sonner";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  ComposedChart,
  Legend
} from "recharts";
import { Checkbox } from "../components/ui/checkbox";

// Enhanced Mock Data
const financialYears = ["FY 2025-26", "FY 2024-25", "FY 2023-24"];
const months = [
  "April", "May", "June", "July", "August", "September",
  "October", "November", "December", "January", "February", "March"
];

const states = ["All States", "Rajasthan", "Maharashtra", "Andhra Pradesh", "Gujarat", "Karnataka", "Tamil Nadu"];

// Enhanced plant data with more details
const plants = [
  { 
    id: "PLT-001", 
    name: "Jodhpur Solar Park A", 
    capacity: "50 MW", 
    state: "Rajasthan",
    district: "Jodhpur",
    cluster: "North-1",
    vendor: "SolarCo India",
    status: "completed",
    completeness: 100,
    quality: 98,
    lastUpdated: "2 hours ago",
    submittedBy: "Rajesh Kumar",
    reviewedBy: "Priya Sharma",
    trend: "up",
    trendValue: 2.4,
    cuf: 22.4,
    generation: 4520,
    isActive: true,
  },
  { 
    id: "PLT-002", 
    name: "Sangli Solar Farm", 
    capacity: "25 MW", 
    state: "Maharashtra",
    district: "Sangli",
    cluster: "West-2",
    vendor: "SunPower Tech",
    status: "pending-review",
    completeness: 100,
    quality: 95,
    lastUpdated: "5 hours ago",
    submittedBy: "Amit Desai",
    reviewedBy: "Pending",
    trend: "down",
    trendValue: -1.2,
    cuf: 21.8,
    generation: 2150,
    isActive: true,
  },
  { 
    id: "PLT-003", 
    name: "Anantapur PV Plant", 
    capacity: "100 MW", 
    state: "Andhra Pradesh",
    district: "Anantapur",
    cluster: "South-1",
    vendor: "Green Energy Ltd",
    status: "draft",
    completeness: 65,
    quality: 72,
    lastUpdated: "1 day ago",
    submittedBy: "Venkat Rao",
    reviewedBy: "—",
    trend: "neutral",
    trendValue: 0,
    cuf: 20.5,
    generation: 8900,
    isActive: true,
  },
  { 
    id: "PLT-004", 
    name: "Kutch Solar Station", 
    capacity: "75 MW", 
    state: "Gujarat",
    district: "Kutch",
    cluster: "West-1",
    vendor: "TechSolar Pvt",
    status: "not-started",
    completeness: 0,
    quality: 0,
    lastUpdated: "—",
    submittedBy: "—",
    reviewedBy: "—",
    trend: "neutral",
    trendValue: 0,
    cuf: 0,
    generation: 0,
    isActive: false,
  },
  { 
    id: "PLT-005", 
    name: "Pavagada Solar Park", 
    capacity: "150 MW", 
    state: "Karnataka",
    district: "Pavagada",
    cluster: "South-2",
    vendor: "Mega Solar Inc",
    status: "completed",
    completeness: 100,
    quality: 100,
    lastUpdated: "3 hours ago",
    submittedBy: "Lakshmi Narayanan",
    reviewedBy: "Suresh Iyer",
    trend: "up",
    trendValue: 5.2,
    cuf: 23.8,
    generation: 15500,
    isActive: true,
  },
  { 
    id: "PLT-006", 
    name: "Bhadla Solar Park", 
    capacity: "200 MW", 
    state: "Rajasthan",
    district: "Jodhpur",
    cluster: "North-1",
    vendor: "Adani Solar",
    status: "pending-review",
    completeness: 100,
    quality: 92,
    lastUpdated: "4 hours ago",
    submittedBy: "Anil Mehra",
    reviewedBy: "Pending",
    trend: "up",
    trendValue: 3.1,
    cuf: 24.2,
    generation: 21000,
    isActive: true,
  },
  { 
    id: "PLT-007", 
    name: "Rewa Solar Plant", 
    capacity: "80 MW", 
    state: "Madhya Pradesh",
    district: "Rewa",
    cluster: "Central-1",
    vendor: "Mahindra Susten",
    status: "draft",
    completeness: 45,
    quality: 68,
    lastUpdated: "2 days ago",
    submittedBy: "Manish Tiwari",
    reviewedBy: "—",
    trend: "down",
    trendValue: -2.8,
    cuf: 19.8,
    generation: 6850,
    isActive: true,
  },
];

// Historical comparison data
const historicalData = [
  { month: "Oct", actual: 4520, target: 4700, cuf: 22.8, generation: 58500 },
  { month: "Nov", actual: 4485, target: 4700, cuf: 22.4, generation: 57200 },
  { month: "Dec", actual: 4650, target: 4700, cuf: 23.1, generation: 59100 },
  { month: "Jan", actual: 4580, target: 4700, cuf: 22.7, generation: 58000 },
  { month: "Feb", actual: 4485, target: 4700, cuf: 22.4, generation: 57000 },
];

// Workflow stages
const workflowStages = [
  { id: 1, name: "Data Entry", status: "completed", user: "Rajesh Kumar", date: "Feb 28, 10:30", duration: "2h 15m" },
  { id: 2, name: "Technical Review", status: "current", user: "Priya Sharma", date: "In Progress", duration: "—" },
  { id: 3, name: "Commercial Review", status: "pending", user: "—", date: "—", duration: "—" },
  { id: 4, name: "Final Approval", status: "pending", user: "—", date: "—", duration: "—" },
  { id: 5, name: "Lock & Archive", status: "pending", user: "—", date: "—", duration: "—" },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "completed":
      return { label: "Approved & Locked", color: "bg-emerald-600 text-white border-emerald-600", icon: CheckCircle, dotColor: "bg-emerald-500" };
    case "pending-review":
      return { label: "Pending Review", color: "bg-amber-600 text-white border-amber-600", icon: Clock, dotColor: "bg-amber-500" };
    case "draft":
      return { label: "Draft", color: "bg-blue-600 text-white border-blue-600", icon: FileText, dotColor: "bg-blue-500" };
    case "not-started":
      return { label: "Not Started", color: "bg-slate-400 text-white border-slate-400", icon: Minus, dotColor: "bg-slate-400" };
    default:
      return { label: "Unknown", color: "bg-gray-500 text-white border-gray-500", icon: AlertCircle, dotColor: "bg-gray-400" };
  }
};

type ViewMode = "dashboard" | "entry" | "review" | "analytics";

export function JMRDataManagement() {
  const [selectedFY, setSelectedFY] = useState("FY 2025-26");
  const [selectedMonth, setSelectedMonth] = useState("February");
  const [selectedPlant, setSelectedPlant] = useState<typeof plants[0] | null>(null);
  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("All States");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(true);
  const [csvDialogOpen, setCsvDialogOpen] = useState(false);
  const [entryStep, setEntryStep] = useState(1);

  // Form data state
  const [formData, setFormData] = useState({
    grossGeneration: "4520.5",
    netExport: "4485.2",
    gridAvailability: "98.5",
    plantAvailability: "97.8",
    curtailmentUnits: "12.3",
    breakdownHours: "12.5",
    pmHours: "8.0",
    contractualTarget: "4700",
    revenue: "42.85",
  });

  const prevMonthData = {
    grossGeneration: "4550.2",
    netExport: "4510.8",
    gridAvailability: "97.2",
    plantAvailability: "96.5",
    cuf: "23.1",
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const auxiliaryConsumption = formData.grossGeneration && formData.netExport 
    ? (parseFloat(formData.grossGeneration) - parseFloat(formData.netExport)).toFixed(2)
    : "—";

  const targetAchievement = formData.netExport && formData.contractualTarget 
    ? ((parseFloat(formData.netExport) / parseFloat(formData.contractualTarget)) * 100).toFixed(2)
    : "—";

  const cuf = "22.4";
  const pr = "78.6";

  // Advanced filtering
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.district.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = stateFilter === "All States" || plant.state === stateFilter;
    
    const matchesStatus = statusFilter === "all" || plant.status === statusFilter;

    return matchesSearch && matchesState && matchesStatus;
  });

  // Calculate statistics
  const overallStats = {
    totalPlants: plants.length,
    completed: plants.filter(p => p.status === "completed").length,
    pendingReview: plants.filter(p => p.status === "pending-review").length,
    draft: plants.filter(p => p.status === "draft").length,
    notStarted: plants.filter(p => p.status === "not-started").length,
    avgCompleteness: Math.round(plants.reduce((sum, p) => sum + p.completeness, 0) / plants.length),
    avgQuality: Math.round(plants.reduce((sum, p) => sum + p.quality, 0) / plants.length),
    totalGeneration: plants.reduce((sum, p) => sum + p.generation, 0),
    avgCUF: (plants.filter(p => p.cuf > 0).reduce((sum, p) => sum + p.cuf, 0) / plants.filter(p => p.cuf > 0).length).toFixed(1),
  };

  const togglePlantSelection = (plantId: string) => {
    setSelectedPlants(prev => 
      prev.includes(plantId) 
        ? prev.filter(id => id !== plantId)
        : [...prev, plantId]
    );
  };

  const selectAllFiltered = () => {
    setSelectedPlants(filteredPlants.map(p => p.id));
  };

  const clearSelection = () => {
    setSelectedPlants([]);
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      
      {/* Enhanced Command Bar */}
      <div className="bg-white border-b border-slate-200 shadow-sm shrink-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/80 rounded-xl shadow-md">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 leading-none">JMR Data Management</h1>
                <p className="text-sm text-slate-600 mt-1">Monthly Joint Meter Reading · Data Governance Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Period Selector */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <Calendar className="w-4 h-4 text-slate-500" />
                <Select value={selectedFY} onValueChange={setSelectedFY}>
                  <SelectTrigger className="border-0 bg-transparent h-auto p-0 font-semibold text-slate-900 focus:ring-0 w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {financialYears.map((fy) => (
                      <SelectItem key={fy} value={fy}>{fy}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Separator orientation="vertical" className="h-5 mx-1" />
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="border-0 bg-transparent h-auto p-0 font-semibold text-slate-900 focus:ring-0 w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quick Actions */}
              <Button variant="outline" className="gap-2 border-slate-300">
                <Download className="w-4 h-4" />
                Export
              </Button>
              
              <Dialog open={csvDialogOpen} onOpenChange={setCsvDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-[#0B3C5D] hover:bg-[#082a42] text-white shadow-md">
                    <Upload className="w-4 h-4" />
                    Bulk Upload
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                  <DialogHeader>
                    <DialogTitle>CSV Bulk Upload</DialogTitle>
                    <DialogDescription>
                      Upload JMR data for multiple plants using CSV file
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="flex-1 pr-4">
                    <BulkUploadDialog onClose={() => setCsvDialogOpen(false)} />
                  </ScrollArea>
                </DialogContent>
              </Dialog>

              <Button variant="outline" size="icon" className="border-slate-300">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center justify-between">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="w-auto">
              <TabsList className="bg-slate-100 border border-slate-200 p-1 h-11">
                <TabsTrigger value="dashboard" className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm px-4">
                  <LayoutGrid className="w-4 h-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="entry" className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm px-4">
                  <Edit3 className="w-4 h-4" />
                  Data Entry
                </TabsTrigger>
                <TabsTrigger value="review" className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm px-4">
                  <CheckCircle className="w-4 h-4" />
                  Review & Approve
                </TabsTrigger>
                <TabsTrigger value="analytics" className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm px-4">
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Live Status Indicators */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-emerald-700">3 users active</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                <span>Last sync: 2 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - Smart Filters & Plant List */}
        <motion.div 
          initial={false}
          animate={{ width: sidebarCollapsed ? 60 : 360 }}
          className="bg-white border-r border-slate-200 flex flex-col shrink-0 shadow-sm"
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between shrink-0">
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-sm font-bold text-slate-900">Plant Selection</h2>
                <p className="text-xs text-slate-600 mt-0.5">{filteredPlants.length} of {plants.length} plants</p>
              </div>
            )}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="shrink-0"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>

          {!sidebarCollapsed && (
            <>
              {/* Search & Filters */}
              <div className="p-4 space-y-3 border-b border-slate-200 shrink-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search plants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-10 bg-slate-50 border-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Select value={stateFilter} onValueChange={setStateFilter}>
                    <SelectTrigger className="h-9 text-xs bg-slate-50">
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-9 text-xs bg-slate-50">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending-review">Pending Review</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="not-started">Not Started</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Batch Actions */}
                {selectedPlants.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <span className="text-xs font-semibold text-blue-900 flex-1">
                      {selectedPlants.length} selected
                    </span>
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={clearSelection}>
                      Clear
                    </Button>
                    <Button size="sm" className="h-7 text-xs bg-[#0B3C5D]">
                      Batch Action
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Plant List */}
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-3 space-y-2 pb-6">
                  {/* Select All Option */}
                  <div className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                    <Checkbox 
                      checked={selectedPlants.length === filteredPlants.length && filteredPlants.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) selectAllFiltered();
                        else clearSelection();
                      }}
                    />
                    <span className="text-xs font-medium text-slate-600">Select All ({filteredPlants.length})</span>
                  </div>

                  <Separator className="my-2" />

                  {filteredPlants.map((plant) => {
                    const config = getStatusConfig(plant.status);
                    const isSelected = selectedPlant?.id === plant.id;
                    const isChecked = selectedPlants.includes(plant.id);
                    
                    return (
                      <motion.div
                        key={plant.id}
                        whileHover={{ x: 4 }}
                        onClick={() => {
                          setSelectedPlant(plant);
                          if (viewMode === "dashboard") setViewMode("entry");
                        }}
                        className={`group relative p-3 rounded-xl border-2 transition-all cursor-pointer ${
                          isSelected 
                            ? "border-[#0B3C5D] bg-blue-50 shadow-md" 
                            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                        }`}
                      >
                        {/* Selection Checkbox */}
                        <div 
                          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePlantSelection(plant.id);
                          }}
                        >
                          <Checkbox checked={isChecked} />
                        </div>

                        {/* Plant Info */}
                        <div className="flex items-start gap-3 mb-2">
                          <div className={`w-2 h-2 rounded-full mt-2 ${config.dotColor}`}></div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-slate-900 truncate mb-1">{plant.name}</div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              <span>{plant.id}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                {plant.capacity}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="bg-slate-50 rounded-lg p-2">
                            <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">Quality</div>
                            <div className="text-sm font-bold text-slate-900">{plant.quality}%</div>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-2">
                            <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">CUF</div>
                            <div className="text-sm font-bold text-slate-900">{plant.cuf || "—"}%</div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="mt-2">
                          <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${config.color}`}>
                            {config.label}
                          </Badge>
                        </div>
                      </motion.div>
                    );
                  })}

                  {filteredPlants.length === 0 && (
                    <div className="text-center py-12">
                      <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-sm text-slate-500">No plants found</p>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => {
                          setSearchTerm("");
                          setStateFilter("All States");
                          setStatusFilter("all");
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
            </>
          )}
        </motion.div>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
          
          {/* Dashboard View */}
          {viewMode === "dashboard" && (
            <ScrollArea className="flex-1">
              <div className="p-8 max-w-7xl mx-auto space-y-6 pb-12">
                
                {/* Key Metrics Cards */}
                <div className="grid grid-cols-4 gap-6">
                  <Card className="border-none shadow-lg bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/80 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-white/80">Total Capacity</span>
                        <Zap className="w-5 h-5 text-white/80" />
                      </div>
                      <div className="text-4xl font-bold mb-1">780 MW</div>
                      <div className="text-sm text-white/80">Across {plants.length} plants</div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-white/80">Generation (Feb)</span>
                        <Activity className="w-5 h-5 text-white/80" />
                      </div>
                      <div className="text-4xl font-bold mb-1">{(overallStats.totalGeneration / 1000).toFixed(1)}k</div>
                      <div className="text-sm text-white/80">MWh · Target 62k MWh</div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-lg bg-gradient-to-br from-[#F4B400] to-[#F4B400]/80 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-white/80">Avg CUF</span>
                        <Percent className="w-5 h-5 text-white/80" />
                      </div>
                      <div className="text-4xl font-bold mb-1">{overallStats.avgCUF}%</div>
                      <div className="text-sm text-white/80">Portfolio average</div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-white/80">Data Quality</span>
                        <Sparkles className="w-5 h-5 text-white/80" />
                      </div>
                      <div className="text-4xl font-bold mb-1">{overallStats.avgQuality}%</div>
                      <div className="text-sm text-white/80">Excellent score</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Status Overview */}
                <div className="grid grid-cols-5 gap-4">
                  <Card className="shadow-md border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-600">Completed</span>
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 mb-1">{overallStats.completed}</div>
                      <Progress value={(overallStats.completed / overallStats.totalPlants) * 100} className="h-1.5" />
                    </CardContent>
                  </Card>

                  <Card className="shadow-md border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-600">Pending Review</span>
                        <Clock className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 mb-1">{overallStats.pendingReview}</div>
                      <Progress value={(overallStats.pendingReview / overallStats.totalPlants) * 100} className="h-1.5" />
                    </CardContent>
                  </Card>

                  <Card className="shadow-md border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-600">Draft</span>
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 mb-1">{overallStats.draft}</div>
                      <Progress value={(overallStats.draft / overallStats.totalPlants) * 100} className="h-1.5" />
                    </CardContent>
                  </Card>

                  <Card className="shadow-md border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-600">Not Started</span>
                        <Minus className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 mb-1">{overallStats.notStarted}</div>
                      <Progress value={(overallStats.notStarted / overallStats.totalPlants) * 100} className="h-1.5" />
                    </CardContent>
                  </Card>

                  <Card className="shadow-md border-slate-200 bg-gradient-to-br from-purple-50 to-white">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-600">Completeness</span>
                        <Database className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 mb-1">{overallStats.avgCompleteness}%</div>
                      <Progress value={overallStats.avgCompleteness} className="h-1.5" />
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions & Recent Activity */}
                <div className="grid grid-cols-3 gap-6">
                  
                  {/* Quick Actions */}
                  <Card className="shadow-md border-slate-200">
                    <CardHeader className="border-b border-slate-100 pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#0B3C5D]" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start gap-3 h-auto py-3 border-slate-200 hover:bg-blue-50 hover:border-blue-300"
                        onClick={() => setViewMode("entry")}
                      >
                        <Plus className="w-4 h-4" />
                        <div className="text-left">
                          <div className="font-semibold text-sm">New Data Entry</div>
                          <div className="text-xs text-slate-500">Start entering JMR data</div>
                        </div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full justify-start gap-3 h-auto py-3 border-slate-200 hover:bg-amber-50 hover:border-amber-300"
                        onClick={() => setViewMode("review")}
                      >
                        <CheckCircle className="w-4 h-4" />
                        <div className="text-left">
                          <div className="font-semibold text-sm">Review Pending ({overallStats.pendingReview})</div>
                          <div className="text-xs text-slate-500">Approve submitted data</div>
                        </div>
                      </Button>

                      <Button 
                        variant="outline" 
                        className="w-full justify-start gap-3 h-auto py-3 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300"
                        onClick={() => setCsvDialogOpen(true)}
                      >
                        <Upload className="w-4 h-4" />
                        <div className="text-left">
                          <div className="font-semibold text-sm">Bulk Upload CSV</div>
                          <div className="text-xs text-slate-500">Import multiple plants</div>
                        </div>
                      </Button>

                      <Button 
                        variant="outline" 
                        className="w-full justify-start gap-3 h-auto py-3 border-slate-200 hover:bg-purple-50 hover:border-purple-300"
                        onClick={() => setViewMode("analytics")}
                      >
                        <BarChart3 className="w-4 h-4" />
                        <div className="text-left">
                          <div className="font-semibold text-sm">View Analytics</div>
                          <div className="text-xs text-slate-500">Performance insights</div>
                        </div>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="col-span-2 shadow-md border-slate-200">
                    <CardHeader className="border-b border-slate-100 pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Activity className="w-5 h-5 text-[#0B3C5D]" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[280px]">
                        <div className="divide-y divide-slate-100">
                          {[
                            { user: "Rajesh Kumar", action: "submitted data for", plant: "Jodhpur Solar Park A", time: "2 hours ago", type: "submit", color: "blue" },
                            { user: "Priya Sharma", action: "approved data for", plant: "Pavagada Solar Park", time: "3 hours ago", type: "approve", color: "emerald" },
                            { user: "Amit Desai", action: "updated data for", plant: "Sangli Solar Farm", time: "5 hours ago", type: "update", color: "amber" },
                            { user: "Venkat Rao", action: "started entry for", plant: "Anantapur PV Plant", time: "1 day ago", type: "start", color: "purple" },
                            { user: "System", action: "auto-locked", plant: "Bhadla Solar Park", time: "1 day ago", type: "system", color: "slate" },
                          ].map((activity, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors">
                              <div className={`w-8 h-8 rounded-full bg-${activity.color}-100 flex items-center justify-center text-${activity.color}-700 font-semibold text-xs shrink-0`}>
                                {activity.user.split(" ").map(n => n[0]).join("")}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-slate-900">
                                  <span className="font-semibold">{activity.user}</span>
                                  {" "}<span className="text-slate-600">{activity.action}</span>
                                  {" "}<span className="font-semibold">{activity.plant}</span>
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  <span className="text-xs text-slate-500">{activity.time}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Trends */}
                <Card className="shadow-md border-slate-200">
                  <CardHeader className="border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#0B3C5D]" />
                        Generation Trend (Last 5 Months)
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Chart
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={historicalData}>
                          <defs>
                            <linearGradient id="colorGeneration" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0B3C5D" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#0B3C5D" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="month" stroke="#64748b" />
                          <YAxis yAxisId="left" stroke="#64748b" />
                          <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
                          <RechartsTooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e2e8f0',
                              borderRadius: '12px',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                          />
                          <Legend />
                          <Area 
                            yAxisId="left"
                            type="monotone" 
                            dataKey="generation" 
                            fill="url(#colorGeneration)" 
                            stroke="#0B3C5D" 
                            strokeWidth={2}
                            name="Generation (MWh)"
                          />
                          <Bar yAxisId="left" dataKey="target" fill="#F4B400" radius={[8, 8, 0, 0]} name="Target (MWh)" />
                          <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="cuf" 
                            stroke="#10B981" 
                            strokeWidth={3} 
                            dot={{ fill: '#10B981', r: 5 }}
                            name="CUF (%)"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </ScrollArea>
          )}

          {/* Data Entry View */}
          {viewMode === "entry" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {selectedPlant ? (
                <>
                  {/* Plant Header */}
                  <div className="bg-white border-b border-slate-200 px-8 py-5 shrink-0 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedPlant(null);
                            setViewMode("dashboard");
                          }}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-xl font-bold text-slate-900">{selectedPlant.name}</h2>
                            <Badge className={`${getStatusConfig(selectedPlant.status).color} px-3 py-1 shadow-sm`}>
                              {getStatusConfig(selectedPlant.status).label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-slate-400" />
                              <span className="font-medium">{selectedPlant.id}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-slate-400" />
                              <span className="font-semibold">{selectedPlant.capacity}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-slate-400" />
                              <span>{selectedPlant.district}, {selectedPlant.state}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-slate-400" />
                              <span>Updated {selectedPlant.lastUpdated}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <History className="w-4 h-4" />
                          History
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Copy className="w-4 h-4" />
                          Clone Prev Month
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => setShowAIPanel(!showAIPanel)}
                        >
                          <Lightbulb className={`w-4 h-4 ${showAIPanel ? "text-amber-500" : ""}`} />
                          AI Assist
                        </Button>
                      </div>
                    </div>

                    {/* Progress Stepper */}
                    <div className="mt-6 flex items-center gap-2">
                      {[
                        { num: 1, label: "Generation Data", icon: Activity },
                        { num: 2, label: "Availability", icon: CheckCircle },
                        { num: 3, label: "Commercial", icon: DollarSign },
                        { num: 4, label: "Review", icon: Eye },
                      ].map((step, idx) => (
                        <div key={step.num} className="flex items-center flex-1">
                          <button
                            onClick={() => setEntryStep(step.num)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all w-full ${
                              entryStep === step.num
                                ? "border-[#0B3C5D] bg-blue-50 shadow-md"
                                : entryStep > step.num
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              entryStep === step.num
                                ? "bg-[#0B3C5D] text-white"
                                : entryStep > step.num
                                ? "bg-emerald-500 text-white"
                                : "bg-slate-200 text-slate-600"
                            }`}>
                              {entryStep > step.num ? <Check className="w-5 h-5" /> : step.num}
                            </div>
                            <div className="text-left">
                              <div className={`text-xs font-semibold ${
                                entryStep === step.num ? "text-[#0B3C5D]" : "text-slate-600"
                              }`}>
                                Step {step.num}
                              </div>
                              <div className={`text-xs ${
                                entryStep === step.num ? "text-slate-900" : "text-slate-500"
                              }`}>
                                {step.label}
                              </div>
                            </div>
                          </button>
                          {idx < 3 && (
                            <ChevronRight className="w-5 h-5 text-slate-300 mx-1 shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Entry Form with AI Panel */}
                  <div className="flex-1 flex overflow-hidden">
                    <ScrollArea className="flex-1 p-8">
                      <div className="max-w-5xl mx-auto pb-12">
                        <StepperContent
                          step={entryStep}
                          formData={formData}
                          prevMonthData={prevMonthData}
                          onChange={handleInputChange}
                          auxiliaryConsumption={auxiliaryConsumption}
                          targetAchievement={targetAchievement}
                          cuf={cuf}
                          pr={pr}
                          onNext={() => setEntryStep(Math.min(4, entryStep + 1))}
                          onPrev={() => setEntryStep(Math.max(1, entryStep - 1))}
                        />
                      </div>
                    </ScrollArea>

                    {/* AI Assistant Panel */}
                    <AnimatePresence>
                      {showAIPanel && (
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: 360, opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          className="border-l border-slate-200 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden shrink-0"
                        >
                          <div className="p-6 h-full flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <div className="p-2 bg-amber-500 rounded-lg">
                                  <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-slate-900 text-sm">AI Assistant</h3>
                                  <p className="text-xs text-slate-600">Smart suggestions</p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setShowAIPanel(false)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>

                            <ScrollArea className="flex-1">
                              <div className="space-y-4 pr-2">
                                {/* AI Suggestion Cards */}
                                <Card className="border-2 border-amber-200 bg-white shadow-sm">
                                  <CardContent className="p-4">
                                    <div className="flex items-start gap-3 mb-3">
                                      <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                      <div>
                                        <h4 className="font-semibold text-sm text-slate-900 mb-1">Auto-fill Generation Data</h4>
                                        <p className="text-xs text-slate-600">Based on historical averages and weather data for February</p>
                                      </div>
                                    </div>
                                    <div className="space-y-2 mb-3">
                                      <div className="flex justify-between text-xs">
                                        <span className="text-slate-600">Gross Generation:</span>
                                        <span className="font-semibold">4,520 MWh</span>
                                      </div>
                                      <div className="flex justify-between text-xs">
                                        <span className="text-slate-600">Confidence:</span>
                                        <span className="font-semibold text-emerald-600">94%</span>
                                      </div>
                                    </div>
                                    <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                                      Apply Suggestions
                                    </Button>
                                  </CardContent>
                                </Card>

                                <Card className="border border-slate-200 bg-white shadow-sm">
                                  <CardContent className="p-4">
                                    <div className="flex items-start gap-3 mb-3">
                                      <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                      <div>
                                        <h4 className="font-semibold text-sm text-slate-900 mb-1">Data Quality Check</h4>
                                        <p className="text-xs text-slate-600">All fields validated · No anomalies detected</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
                                      <CheckCircle className="w-4 h-4" />
                                      Ready for submission
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card className="border border-slate-200 bg-white shadow-sm">
                                  <CardContent className="p-4">
                                    <div className="flex items-start gap-3 mb-3">
                                      <BookOpen className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                                      <div>
                                        <h4 className="font-semibold text-sm text-slate-900 mb-1">Quick Tips</h4>
                                        <ul className="text-xs text-slate-600 space-y-1 mt-2">
                                          <li>• Ensure grid availability is ≤ 100%</li>
                                          <li>• Net export cannot exceed gross generation</li>
                                          <li>• Document any curtailment events</li>
                                        </ul>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card className="border border-slate-200 bg-white shadow-sm">
                                  <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                      <Target className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                      <div>
                                        <h4 className="font-semibold text-sm text-slate-900 mb-1">Performance Benchmark</h4>
                                        <p className="text-xs text-slate-600 mb-2">Compared to similar plants in {selectedPlant.state}</p>
                                        <div className="space-y-2">
                                          <div>
                                            <div className="flex justify-between text-xs mb-1">
                                              <span className="text-slate-600">CUF Ranking</span>
                                              <span className="font-semibold">Top 25%</span>
                                            </div>
                                            <Progress value={75} className="h-1.5" />
                                          </div>
                                          <div>
                                            <div className="flex justify-between text-xs mb-1">
                                              <span className="text-slate-600">Availability</span>
                                              <span className="font-semibold">Top 15%</span>
                                            </div>
                                            <Progress value={85} className="h-1.5" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </ScrollArea>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center max-w-md">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText className="w-12 h-12 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Select a Plant to Begin</h3>
                    <p className="text-slate-600 mb-6">Choose a plant from the sidebar to start entering JMR data or use quick actions to get started</p>
                    <div className="flex gap-3 justify-center">
                      <Button 
                        variant="outline"
                        onClick={() => setViewMode("dashboard")}
                      >
                        <LayoutGrid className="w-4 h-4 mr-2" />
                        View Dashboard
                      </Button>
                      <Button
                        className="bg-[#0B3C5D]"
                        onClick={() => filteredPlants.length > 0 && setSelectedPlant(filteredPlants[0])}
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Entry
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Review View */}
          {viewMode === "review" && (
            <ScrollArea className="flex-1">
              <div className="p-8 max-w-7xl mx-auto space-y-6 pb-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Review & Approval</h2>
                    <p className="text-slate-600 mt-1">Review submitted JMR data and approve for locking</p>
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

                {/* Pending Reviews Table */}
                <Card className="shadow-md border-slate-200">
                  <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-base">Pending Reviews ({plants.filter(p => p.status === "pending-review").length})</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50">
                          <TableHead className="w-12">
                            <Checkbox />
                          </TableHead>
                          <TableHead>Plant</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Submitted By</TableHead>
                          <TableHead>Quality</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {plants.filter(p => p.status === "pending-review").map((plant) => (
                          <TableRow key={plant.id} className="hover:bg-slate-50">
                            <TableCell>
                              <Checkbox />
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-semibold text-slate-900">{plant.name}</div>
                                <div className="text-xs text-slate-500">{plant.id} · {plant.capacity}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">{plant.district}, {plant.state}</div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-xs">
                                  {plant.submittedBy.split(" ").map(n => n[0]).join("")}
                                </div>
                                <span className="text-sm">{plant.submittedBy}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={plant.quality} className="h-2 w-16" />
                                <span className="text-sm font-semibold">{plant.quality}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-slate-600">{plant.lastUpdated}</div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedPlant(plant);
                                    setViewMode("entry");
                                  }}
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                  onClick={() => toast.success(`${plant.name} approved successfully`)}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Approve
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Workflow Progress */}
                <Card className="shadow-md border-slate-200">
                  <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Activity className="w-5 h-5 text-[#0B3C5D]" />
                      Approval Workflow
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <WorkflowTimeline stages={workflowStages} />
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          )}

          {/* Analytics View */}
          {viewMode === "analytics" && (
            <ScrollArea className="flex-1">
              <div className="p-8 max-w-7xl mx-auto space-y-6 pb-12">
                <HistoricalComparison data={historicalData} />
              </div>
            </ScrollArea>
          )}

        </div>
      </div>
    </div>
  );
}

// Stepper Content Component
function StepperContent({ 
  step, 
  formData, 
  prevMonthData, 
  onChange, 
  auxiliaryConsumption, 
  targetAchievement, 
  cuf, 
  pr,
  onNext,
  onPrev
}: any) {
  const getChangeIndicator = (current: string, previous: string) => {
    const curr = parseFloat(current);
    const prev = parseFloat(previous);
    if (isNaN(curr) || isNaN(prev)) return null;
    
    const diff = curr - prev;
    const percentChange = ((diff / prev) * 100).toFixed(1);
    
    if (diff > 0) {
      return (
        <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
          <ArrowUpRight className="w-3 h-3" />
          +{percentChange}%
        </div>
      );
    } else if (diff < 0) {
      return (
        <div className="flex items-center gap-1 text-xs text-rose-600 font-medium">
          <ArrowDownRight className="w-3 h-3" />
          {percentChange}%
        </div>
      );
    }
    return <div className="text-xs text-slate-400">—</div>;
  };

  return (
    <div className="space-y-6">
      
      {/* Step 1: Generation Data */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Generation & Export Data</h3>
            <p className="text-slate-600">Enter monthly generation and export metrics</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="shadow-md border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Label className="text-sm font-semibold text-slate-700">
                    Gross Generation (MWh) <span className="text-red-500">*</span>
                  </Label>
                  {getChangeIndicator(formData.grossGeneration, prevMonthData.grossGeneration)}
                </div>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.grossGeneration}
                  onChange={(e) => onChange("grossGeneration", e.target.value)}
                  className="text-xl font-bold h-14 mb-3 border-2 focus:border-[#0B3C5D]"
                />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Previous: {prevMonthData.grossGeneration} MWh</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCircle className="w-3 h-3" />
                    Validated
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Label className="text-sm font-semibold text-slate-700">
                    Net Export (MWh) <span className="text-red-500">*</span>
                  </Label>
                  {getChangeIndicator(formData.netExport, prevMonthData.netExport)}
                </div>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.netExport}
                  onChange={(e) => onChange("netExport", e.target.value)}
                  className="text-xl font-bold h-14 mb-3 border-2 focus:border-[#0B3C5D]"
                />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Previous: {prevMonthData.netExport} MWh</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCircle className="w-3 h-3" />
                    Validated
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Label className="text-sm font-semibold text-slate-700 mb-4 block">
                  Contractual Target (MWh) <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.contractualTarget}
                  onChange={(e) => onChange("contractualTarget", e.target.value)}
                  className="text-xl font-bold h-14 mb-3 border-2 focus:border-[#0B3C5D]"
                />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">From PPA contract</span>
                  <span className="flex items-center gap-1 text-blue-600 font-medium">
                    <Database className="w-3 h-3" />
                    Auto-loaded
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="p-6">
                <Label className="text-sm font-semibold text-slate-700 mb-4 block">
                  Auxiliary Consumption
                </Label>
                <div className="text-3xl font-bold text-slate-900 mb-2">{auxiliaryConsumption}</div>
                <div className="text-xs text-slate-500">MWh · Auto-calculated</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Step 2: Availability */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Availability & Performance</h3>
            <p className="text-slate-600">Grid and plant availability metrics</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="shadow-md border-slate-200">
              <CardContent className="p-6">
                <Label className="text-sm font-semibold text-slate-700 mb-4 block">
                  Grid Availability (%) <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  max="100"
                  value={formData.gridAvailability}
                  onChange={(e) => onChange("gridAvailability", e.target.value)}
                  className="text-xl font-bold h-14 mb-3 border-2 focus:border-[#0B3C5D]"
                />
                <div className="text-xs text-slate-500">
                  Previous: {prevMonthData.gridAvailability}%
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-slate-200">
              <CardContent className="p-6">
                <Label className="text-sm font-semibold text-slate-700 mb-4 block">
                  Plant Availability (%) <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  max="100"
                  value={formData.plantAvailability}
                  onChange={(e) => onChange("plantAvailability", e.target.value)}
                  className="text-xl font-bold h-14 mb-3 border-2 focus:border-[#0B3C5D]"
                />
                <div className="text-xs text-slate-500">
                  Previous: {prevMonthData.plantAvailability}%
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-slate-200">
              <CardContent className="p-6">
                <Label className="text-sm font-semibold text-slate-700 mb-4 block">
                  Curtailment Units (MWh)
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.curtailmentUnits}
                  onChange={(e) => onChange("curtailmentUnits", e.target.value)}
                  className="text-xl font-bold h-14 mb-3 border-2 focus:border-[#0B3C5D]"
                />
                <div className="text-xs text-slate-500">Grid-imposed curtailment</div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-slate-200">
              <CardContent className="p-6">
                <Label className="text-sm font-semibold text-slate-700 mb-4 block">
                  Breakdown Hours
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.breakdownHours}
                  onChange={(e) => onChange("breakdownHours", e.target.value)}
                  className="text-xl font-bold h-14 mb-3 border-2 focus:border-[#0B3C5D]"
                />
                <div className="text-xs text-slate-500">Unplanned downtime</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Step 3: Commercial */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Commercial Data</h3>
            <p className="text-slate-600">Revenue and commercial metrics</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="shadow-md border-slate-200">
              <CardContent className="p-6">
                <Label className="text-sm font-semibold text-slate-700 mb-4 block">
                  Revenue (₹ Lakhs)
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.revenue}
                  onChange={(e) => onChange("revenue", e.target.value)}
                  className="text-xl font-bold h-14 mb-3 border-2 focus:border-[#0B3C5D]"
                />
                <div className="text-xs text-slate-500">Calculated from tariff</div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-l-4 border-l-emerald-500 bg-gradient-to-br from-emerald-50 to-white">
              <CardContent className="p-6">
                <Label className="text-sm font-semibold text-slate-700 mb-4 block">
                  Target Achievement
                </Label>
                <div className="text-3xl font-bold text-slate-900 mb-2">{targetAchievement}%</div>
                <div className="text-xs text-slate-500">Auto-calculated</div>
              </CardContent>
            </Card>
          </div>

          {/* Auto-calculated Metrics */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Performance Indicators (Auto-Calculated)
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-md border-l-4 border-l-amber-500 bg-gradient-to-br from-amber-50 to-white">
                <CardContent className="p-5">
                  <div className="text-xs font-medium text-slate-600 mb-2">CUF</div>
                  <div className="text-2xl font-bold text-slate-900">{cuf}%</div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
                <CardContent className="p-5">
                  <div className="text-xs font-medium text-slate-600 mb-2">Performance Ratio</div>
                  <div className="text-2xl font-bold text-slate-900">{pr}%</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 4: Review */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Review & Submit</h3>
            <p className="text-slate-600">Verify all entered data before submission</p>
          </div>

          <Card className="shadow-md border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 mb-1">Data Quality: Excellent</h4>
                  <p className="text-sm text-slate-600 mb-3">All required fields completed with 98% accuracy score</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Completeness</div>
                      <div className="flex items-center gap-2">
                        <Progress value={100} className="h-2 flex-1" />
                        <span className="text-xs font-bold">100%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Validation</div>
                      <div className="flex items-center gap-2">
                        <Progress value={98} className="h-2 flex-1" />
                        <span className="text-xs font-bold">98%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Consistency</div>
                      <div className="flex items-center gap-2">
                        <Progress value={100} className="h-2 flex-1" />
                        <span className="text-xs font-bold">100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Table */}
          <Card className="shadow-md border-slate-200">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-base">Data Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">Gross Generation</TableCell>
                    <TableCell className="text-right">{formData.grossGeneration} MWh</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Net Export</TableCell>
                    <TableCell className="text-right">{formData.netExport} MWh</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Auxiliary Consumption</TableCell>
                    <TableCell className="text-right">{auxiliaryConsumption} MWh</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Grid Availability</TableCell>
                    <TableCell className="text-right">{formData.gridAvailability}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Plant Availability</TableCell>
                    <TableCell className="text-right">{formData.plantAvailability}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Target Achievement</TableCell>
                    <TableCell className="text-right">{targetAchievement}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">CUF</TableCell>
                    <TableCell className="text-right">{cuf}%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <Card className="shadow-md bg-white sticky bottom-0 border-slate-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">Step {step} of 4 · {step === 4 ? "Ready to submit" : "In progress"}</div>
                <div className="text-sm text-slate-600">Auto-saved 2 min ago</div>
              </div>
            </div>
            <div className="flex gap-3">
              {step > 1 && (
                <Button variant="outline" className="gap-2" onClick={onPrev}>
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
              )}
              <Button variant="outline" className="gap-2">
                <Save className="w-4 h-4" />
                Save Draft
              </Button>
              {step < 4 ? (
                <Button className="gap-2 bg-[#0B3C5D]" onClick={onNext}>
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => toast.success("Data submitted successfully for review")}
                >
                  <Send className="w-4 h-4" />
                  Submit for Review
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Historical Comparison Component
function HistoricalComparison({ data }: { data: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Performance Analytics</h2>
          <p className="text-slate-600 mt-1">Historical trends and comparative analysis</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="5months">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="5months">Last 5 Months</SelectItem>
              <SelectItem value="12months">Last 12 Months</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Card className="shadow-md border-slate-200">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#0B3C5D]" />
            Generation vs Target Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B3C5D" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0B3C5D" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <RechartsTooltip 
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
                  dataKey="actual" 
                  fill="url(#colorActual)" 
                  stroke="#0B3C5D" 
                  strokeWidth={2}
                  name="Actual Generation (MWh)"
                />
                <Bar dataKey="target" fill="#F4B400" radius={[8, 8, 0, 0]} name="Target (MWh)" />
                <Line 
                  type="monotone" 
                  dataKey="cuf" 
                  stroke="#10B981" 
                  strokeWidth={3} 
                  dot={{ fill: '#10B981', r: 6 }}
                  name="CUF (%)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card className="shadow-md border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-slate-600">Avg Generation</div>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-1">4,544 MWh</div>
            <div className="text-sm text-emerald-600 font-medium flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              +2.3% vs previous period
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-slate-600">Avg CUF</div>
              <Activity className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-1">22.7%</div>
            <div className="text-sm text-slate-600">Within expected range</div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-slate-600">Target Achievement</div>
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-1">95.4%</div>
            <div className="text-sm text-rose-600 font-medium flex items-center gap-1">
              <ArrowDownRight className="w-4 h-4" />
              -4.6% shortfall
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Workflow Timeline Component
function WorkflowTimeline({ stages }: { stages: any[] }) {
  return (
    <div className="space-y-6">
      {stages.map((stage, idx) => {
        const isCompleted = stage.status === "completed";
        const isCurrent = stage.status === "current";

        return (
          <div key={stage.id} className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 shrink-0 ${
                isCompleted ? "bg-emerald-500 border-emerald-500 text-white" :
                isCurrent ? "bg-amber-500 border-amber-500 text-white" :
                "bg-slate-200 border-slate-200 text-slate-400"
              }`}>
                {isCompleted ? <CheckCircle className="w-6 h-6" /> : stage.id}
              </div>
              {idx < stages.length - 1 && (
                <div className={`w-0.5 h-16 ${isCompleted ? "bg-emerald-300" : "bg-slate-200"}`} />
              )}
            </div>

            <Card className={`flex-1 ${isCurrent ? "border-2 border-amber-500 bg-amber-50 shadow-lg" : "border border-slate-200 shadow-md"}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">{stage.name}</h3>
                    {stage.user !== "—" && stage.user !== "Pending" && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <User className="w-4 h-4" />
                        <span>{stage.user}</span>
                        {stage.duration !== "—" && (
                          <>
                            <span>·</span>
                            <Clock className="w-4 h-4" />
                            <span>{stage.duration}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <Badge className={
                    isCompleted ? "bg-emerald-500 text-white" :
                    isCurrent ? "bg-amber-500 text-white" :
                    "bg-slate-300 text-slate-700"
                  }>
                    {isCompleted ? "Completed" : isCurrent ? "In Progress" : "Pending"}
                  </Badge>
                </div>
                
                {stage.date !== "—" && stage.date !== "In Progress" && (
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    <span>{stage.date}</span>
                  </div>
                )}

                {isCurrent && (
                  <div className="mt-4 pt-4 border-t border-amber-200">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => toast.success("Data approved successfully")}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="text-rose-600 border-rose-300 hover:bg-rose-50">
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Request Changes
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

// Bulk Upload Dialog Component
function BulkUploadDialog({ onClose }: { onClose: () => void }) {
  const [dragActive, setDragActive] = useState(false);

  return (
    <div className="space-y-6 py-4">
      {/* Upload Area */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-900">Select CSV File</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Download Template
          </Button>
        </div>
        <div 
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
            dragActive 
              ? "border-[#0B3C5D] bg-blue-50" 
              : "border-slate-300 bg-slate-50 hover:border-blue-400"
          }`}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
        >
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Drag & Drop CSV File Here
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            or click to browse from your computer
          </p>
          <Button className="bg-[#0B3C5D] hover:bg-[#082a42] text-white">
            <Upload className="w-4 h-4 mr-2" />
            Select File
          </Button>
        </div>
        
        <Card className="mt-4 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h4 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4" />
              CSV Format Requirements
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold text-blue-900 mb-1">Required Columns:</div>
                <ul className="text-blue-800 space-y-0.5 text-xs">
                  <li>• FY, Month, State, District</li>
                  <li>• Plant ID, Gross Gen, Net Export</li>
                  <li>• Grid Avail, Plant Avail</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-blue-900 mb-1">Optional Columns:</div>
                <ul className="text-blue-800 space-y-0.5 text-xs">
                  <li>• Curtailment, Breakdown Hrs</li>
                  <li>• PM Hrs, Target, Revenue</li>
                  <li>• Max file size: 10MB</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outline" className="gap-2">
          <Eye className="w-4 h-4" />
          Preview Data
        </Button>
        <Button className="bg-[#0B3C5D] hover:bg-[#082a42] text-white gap-2">
          <Upload className="w-4 h-4" />
          Upload & Process
        </Button>
      </div>
    </div>
  );
}

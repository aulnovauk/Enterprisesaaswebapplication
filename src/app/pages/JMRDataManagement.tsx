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
} from "lucide-react";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "../components/ui/scroll-area";
import { toast } from "sonner";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from "recharts";

// Mock data
const financialYears = ["FY 2025-26", "FY 2024-25", "FY 2023-24"];
const months = [
  "April", "May", "June", "July", "August", "September",
  "October", "November", "December", "January", "February", "March"
];

// Enhanced plant data with status
const plants = [
  { 
    id: "PLT-001", 
    name: "Jodhpur Solar Park A", 
    capacity: "50 MW", 
    state: "Rajasthan",
    district: "Jodhpur",
    status: "completed",
    completeness: 100,
    quality: 98,
    lastUpdated: "2 hours ago",
    submittedBy: "John Doe",
    trend: "up",
    trendValue: 2.4
  },
  { 
    id: "PLT-002", 
    name: "Sangli Solar Farm", 
    capacity: "25 MW", 
    state: "Maharashtra",
    district: "Sangli",
    status: "pending-review",
    completeness: 100,
    quality: 95,
    lastUpdated: "5 hours ago",
    submittedBy: "Jane Smith",
    trend: "down",
    trendValue: -1.2
  },
  { 
    id: "PLT-003", 
    name: "Anantapur PV Plant", 
    capacity: "100 MW", 
    state: "Andhra Pradesh",
    district: "Anantapur",
    status: "draft",
    completeness: 65,
    quality: 72,
    lastUpdated: "1 day ago",
    submittedBy: "Robert Lee",
    trend: "neutral",
    trendValue: 0
  },
  { 
    id: "PLT-004", 
    name: "Kutch Solar Station", 
    capacity: "75 MW", 
    state: "Gujarat",
    district: "Kutch",
    status: "not-started",
    completeness: 0,
    quality: 0,
    lastUpdated: "—",
    submittedBy: "—",
    trend: "neutral",
    trendValue: 0
  },
  { 
    id: "PLT-005", 
    name: "Pavagada Solar Park", 
    capacity: "150 MW", 
    state: "Karnataka",
    district: "Pavagada",
    status: "completed",
    completeness: 100,
    quality: 100,
    lastUpdated: "3 hours ago",
    submittedBy: "Sarah Johnson",
    trend: "up",
    trendValue: 5.2
  },
];

// Historical comparison data
const historicalData = [
  { month: "Oct", actual: 4520, target: 4700, cuf: 22.8 },
  { month: "Nov", actual: 4485, target: 4700, cuf: 22.4 },
  { month: "Dec", actual: 4650, target: 4700, cuf: 23.1 },
  { month: "Jan", actual: 4580, target: 4700, cuf: 22.7 },
  { month: "Feb", actual: 4485, target: 4700, cuf: 22.4 },
];

// Workflow stages
const workflowStages = [
  { id: 1, name: "Draft", status: "completed", user: "John Doe", date: "Feb 28, 10:30" },
  { id: 2, name: "Review", status: "current", user: "Pending", date: "—" },
  { id: 3, name: "Approve", status: "pending", user: "—", date: "—" },
  { id: 4, name: "Lock", status: "pending", user: "—", date: "—" },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "completed":
      return { label: "Approved & Locked", color: "bg-emerald-500 text-white", icon: CheckCircle };
    case "pending-review":
      return { label: "Pending Review", color: "bg-amber-500 text-white", icon: Clock };
    case "draft":
      return { label: "Draft", color: "bg-blue-500 text-white", icon: FileText };
    case "not-started":
      return { label: "Not Started", color: "bg-slate-400 text-white", icon: Minus };
    default:
      return { label: "Unknown", color: "bg-gray-500 text-white", icon: AlertCircle };
  }
};

export function JMRDataManagement() {
  const [selectedFY, setSelectedFY] = useState("FY 2025-26");
  const [selectedMonth, setSelectedMonth] = useState("February");
  const [selectedPlant, setSelectedPlant] = useState<typeof plants[0] | null>(plants[0]);
  const [viewMode, setViewMode] = useState<"cards" | "table" | "form">("cards");
  const [searchTerm, setSearchTerm] = useState("");
  const [csvDialogOpen, setCsvDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("entry");

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

  // Previous month data for comparison
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

  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate overall statistics
  const overallStats = {
    totalPlants: plants.length,
    completed: plants.filter(p => p.status === "completed").length,
    pendingReview: plants.filter(p => p.status === "pending-review").length,
    draft: plants.filter(p => p.status === "draft").length,
    notStarted: plants.filter(p => p.status === "not-started").length,
    avgCompleteness: Math.round(plants.reduce((sum, p) => sum + p.completeness, 0) / plants.length),
    avgQuality: Math.round(plants.reduce((sum, p) => sum + p.quality, 0) / plants.length),
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-slate-50 overflow-hidden flex flex-col font-sans">
      
      {/* Enhanced Top Bar - Status Dashboard */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="px-8 py-6">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#0B3C5D] rounded-lg">
                  <FileCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">JMR Data Management</h1>
                  <p className="text-sm text-slate-600 mt-0.5">Monthly Joint Meter Reading | Data Entry & Governance</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <Calendar className="w-4 h-4 text-slate-500" />
                <Select value={selectedFY} onValueChange={setSelectedFY}>
                  <SelectTrigger className="border-0 bg-transparent h-auto p-0 font-medium text-slate-900 focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {financialYears.map((fy) => (
                      <SelectItem key={fy} value={fy}>{fy}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Separator orientation="vertical" className="h-4 mx-1" />
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="border-0 bg-transparent h-auto p-0 font-medium text-slate-900 focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Dialog open={csvDialogOpen} onOpenChange={setCsvDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-[#0B3C5D] hover:bg-[#082a42] text-white">
                    <Upload className="w-4 h-4" />
                    Bulk Upload
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle>CSV Bulk Upload</DialogTitle>
                    <DialogDescription>
                      Upload JMR data for multiple plants using CSV file
                    </DialogDescription>
                  </DialogHeader>
                  <BulkUploadDialog onClose={() => setCsvDialogOpen(false)} />
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Stats Overview Cards */}
          <div className="grid grid-cols-6 gap-4">
            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-600">Total Plants</span>
                  <LayoutGrid className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{overallStats.totalPlants}</div>
                <div className="text-xs text-slate-500 mt-1">Under management</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-emerald-50 to-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-600">Completed</span>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{overallStats.completed}</div>
                <Progress value={(overallStats.completed / overallStats.totalPlants) * 100} className="h-1 mt-2" />
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-amber-50 to-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-600">Pending Review</span>
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{overallStats.pendingReview}</div>
                <div className="text-xs text-amber-600 mt-1 font-medium">Action required</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-600">Draft</span>
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{overallStats.draft}</div>
                <div className="text-xs text-slate-500 mt-1">In progress</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-slate-50 to-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-600">Data Completeness</span>
                  <Database className="w-4 h-4 text-slate-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{overallStats.avgCompleteness}%</div>
                <Progress value={overallStats.avgCompleteness} className="h-1 mt-2" />
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-600">Quality Score</span>
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{overallStats.avgQuality}%</div>
                <div className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Excellent
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex">
        
        {/* Left Panel - Plant Selection */}
        <div className="w-[420px] border-r border-slate-200 bg-white flex flex-col">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-900">Select Plant</h2>
              <div className="flex gap-1">
                <Button 
                  variant={viewMode === "cards" ? "default" : "ghost"} 
                  size="sm"
                  className={viewMode === "cards" ? "bg-[#0B3C5D] hover:bg-[#082a42]" : ""}
                  onClick={() => setViewMode("cards")}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === "table" ? "default" : "ghost"} 
                  size="sm"
                  className={viewMode === "table" ? "bg-[#0B3C5D] hover:bg-[#082a42]" : ""}
                  onClick={() => setViewMode("table")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-slate-50 border-slate-200"
              />
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            {viewMode === "cards" ? (
              <div className="space-y-3">
                {filteredPlants.map((plant) => {
                  const config = getStatusConfig(plant.status);
                  const isSelected = selectedPlant?.id === plant.id;
                  
                  return (
                    <motion.button
                      key={plant.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedPlant(plant)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected 
                          ? "border-[#0B3C5D] bg-blue-50 shadow-md" 
                          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 mb-1">{plant.name}</div>
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <span>{plant.id}</span>
                            <span>•</span>
                            <span>{plant.capacity}</span>
                          </div>
                        </div>
                        <Badge className={`${config.color} text-xs px-2 py-0.5`}>
                          <config.icon className="w-3 h-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Completeness</div>
                          <div className="flex items-center gap-2">
                            <Progress value={plant.completeness} className="h-1.5 flex-1" />
                            <span className="text-xs font-medium text-slate-700">{plant.completeness}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Quality</div>
                          <div className="flex items-center gap-2">
                            <Progress value={plant.quality} className="h-1.5 flex-1" />
                            <span className="text-xs font-medium text-slate-700">{plant.quality}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                        <span className="text-slate-500">
                          {plant.lastUpdated !== "—" ? `Updated ${plant.lastUpdated}` : "Not started"}
                        </span>
                        {plant.trend !== "neutral" && (
                          <div className={`flex items-center gap-1 font-medium ${
                            plant.trend === "up" ? "text-emerald-600" : "text-rose-600"
                          }`}>
                            {plant.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {Math.abs(plant.trendValue)}%
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Plant</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Quality</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPlants.map((plant) => {
                      const config = getStatusConfig(plant.status);
                      const isSelected = selectedPlant?.id === plant.id;
                      
                      return (
                        <TableRow 
                          key={plant.id}
                          className={`cursor-pointer ${isSelected ? "bg-blue-50" : "hover:bg-slate-50"}`}
                          onClick={() => setSelectedPlant(plant)}
                        >
                          <TableCell>
                            {isSelected && <Check className="w-4 h-4 text-[#0B3C5D]" />}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-slate-900">{plant.name}</div>
                            <div className="text-xs text-slate-500">{plant.capacity}</div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${config.color} text-xs`}>
                              {config.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="font-medium">{plant.quality}%</span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Right Panel - Data Entry & Details */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
          {selectedPlant ? (
            <>
              {/* Plant Header */}
              <div className="bg-white border-b border-slate-200 px-8 py-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-slate-900">{selectedPlant.name}</h2>
                      <Badge className={`${getStatusConfig(selectedPlant.status).color} px-3 py-1`}>
                        {getStatusConfig(selectedPlant.status).label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-500">Plant ID:</span>
                        <span className="font-semibold">{selectedPlant.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold">{selectedPlant.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-500">Location:</span>
                        <span className="font-semibold">{selectedPlant.district}, {selectedPlant.state}</span>
                      </div>
                      {selectedPlant.lastUpdated !== "—" && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span>Last updated {selectedPlant.lastUpdated}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <History className="w-4 h-4" />
                      Version History
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Comments (3)
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tabs Content */}
              <div className="flex-1 flex flex-col min-h-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
                  <div className="bg-white border-b border-slate-200 px-8">
                    <TabsList className="bg-transparent border-b-0 h-12 p-0 gap-6">
                      <TabsTrigger 
                        value="entry" 
                        className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#0B3C5D] data-[state=active]:bg-transparent rounded-none px-0 font-medium"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Data Entry
                      </TabsTrigger>
                      <TabsTrigger 
                        value="comparison" 
                        className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#0B3C5D] data-[state=active]:bg-transparent rounded-none px-0 font-medium"
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Historical Comparison
                      </TabsTrigger>
                      <TabsTrigger 
                        value="workflow" 
                        className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#0B3C5D] data-[state=active]:bg-transparent rounded-none px-0 font-medium"
                      >
                        <Activity className="w-4 h-4 mr-2" />
                        Approval Workflow
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <TabsContent value="entry" className="mt-0 p-8">
                      <DataEntryForm 
                        formData={formData}
                        prevMonthData={prevMonthData}
                        onChange={handleInputChange}
                        auxiliaryConsumption={auxiliaryConsumption}
                        targetAchievement={targetAchievement}
                        cuf={cuf}
                        pr={pr}
                      />
                    </TabsContent>

                    <TabsContent value="comparison" className="mt-0 p-8">
                      <HistoricalComparison data={historicalData} />
                    </TabsContent>

                    <TabsContent value="workflow" className="mt-0 p-8">
                      <WorkflowTimeline stages={workflowStages} />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Plant Selected</h3>
                <p className="text-sm text-slate-600">Select a plant from the list to view and edit JMR data</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Data Entry Form Component
function DataEntryForm({ 
  formData, 
  prevMonthData,
  onChange, 
  auxiliaryConsumption, 
  targetAchievement, 
  cuf, 
  pr 
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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Smart Suggestions Banner */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-white shadow-md">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-1">AI-Powered Suggestions Available</h3>
              <p className="text-sm text-slate-600 mb-3">
                We've analyzed historical patterns and detected some fields that can be auto-filled based on typical values for this plant.
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Auto-fill Suggested Values
                </Button>
                <Button size="sm" variant="outline">
                  Review Suggestions
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generation & Export Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-[#0B3C5D] rounded-full" />
          <h3 className="text-lg font-bold text-slate-900">Generation & Export Data</h3>
          <Badge variant="outline" className="ml-auto">Required Fields</Badge>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
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
                className="text-lg font-semibold h-12 mb-2"
              />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Previous: {prevMonthData.grossGeneration} MWh</span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Validated
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
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
                className="text-lg font-semibold h-12 mb-2"
              />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Previous: {prevMonthData.netExport} MWh</span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Validated
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-5">
              <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                Contractual Target (MWh) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                step="0.01"
                value={formData.contractualTarget}
                onChange={(e) => onChange("contractualTarget", e.target.value)}
                className="text-lg font-semibold h-12 mb-2"
              />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>From contract database</span>
                <span className="flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  Auto-loaded
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-5">
              <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                Revenue (₹ Lakhs)
              </Label>
              <Input
                type="number"
                step="0.01"
                value={formData.revenue}
                onChange={(e) => onChange("revenue", e.target.value)}
                className="text-lg font-semibold h-12 mb-2"
              />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Calculated from tariff</span>
                <span className="flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Optional
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Availability & Performance Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-[#10B981] rounded-full" />
          <h3 className="text-lg font-bold text-slate-900">Availability & Performance</h3>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-5">
              <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                Grid Availability (%) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                step="0.01"
                max="100"
                value={formData.gridAvailability}
                onChange={(e) => onChange("gridAvailability", e.target.value)}
                className="text-lg font-semibold h-12 mb-2"
              />
              <div className="text-xs text-slate-500">
                Prev: {prevMonthData.gridAvailability}%
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-5">
              <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                Plant Availability (%) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                step="0.01"
                max="100"
                value={formData.plantAvailability}
                onChange={(e) => onChange("plantAvailability", e.target.value)}
                className="text-lg font-semibold h-12 mb-2"
              />
              <div className="text-xs text-slate-500">
                Prev: {prevMonthData.plantAvailability}%
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-5">
              <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                Curtailment Units (MWh)
              </Label>
              <Input
                type="number"
                step="0.01"
                value={formData.curtailmentUnits}
                onChange={(e) => onChange("curtailmentUnits", e.target.value)}
                className="text-lg font-semibold h-12 mb-2"
              />
              <div className="text-xs text-slate-500">
                Grid curtailment
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-5">
              <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                Breakdown Hours
              </Label>
              <Input
                type="number"
                step="0.1"
                value={formData.breakdownHours}
                onChange={(e) => onChange("breakdownHours", e.target.value)}
                className="text-lg font-semibold h-12 mb-2"
              />
              <div className="text-xs text-slate-500">
                Unplanned downtime
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Auto-Calculated Metrics */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-[#F4B400] rounded-full" />
          <h3 className="text-lg font-bold text-slate-900">Auto-Calculated Metrics</h3>
          <Badge variant="outline" className="ml-auto bg-purple-50 text-purple-700 border-purple-200">
            <Sparkles className="w-3 h-3 mr-1" />
            Computed
          </Badge>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card className="shadow-sm border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-5">
              <div className="text-xs font-medium text-slate-600 mb-2">Auxiliary Consumption</div>
              <div className="text-2xl font-bold text-slate-900">{auxiliaryConsumption}</div>
              <div className="text-xs text-slate-500 mt-1">MWh</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-emerald-500 bg-gradient-to-br from-emerald-50 to-white">
            <CardContent className="p-5">
              <div className="text-xs font-medium text-slate-600 mb-2">Target Achievement</div>
              <div className="text-2xl font-bold text-slate-900">{targetAchievement}</div>
              <div className="text-xs text-slate-500 mt-1">%</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-amber-500 bg-gradient-to-br from-amber-50 to-white">
            <CardContent className="p-5">
              <div className="text-xs font-medium text-slate-600 mb-2">CUF</div>
              <div className="text-2xl font-bold text-slate-900">{cuf}</div>
              <div className="text-xs text-slate-500 mt-1">%</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-5">
              <div className="text-xs font-medium text-slate-600 mb-2">Performance Ratio</div>
              <div className="text-2xl font-bold text-slate-900">{pr}</div>
              <div className="text-xs text-slate-500 mt-1">%</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Action Buttons */}
      <Card className="shadow-sm bg-white sticky bottom-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">All required fields completed</div>
                <div className="text-sm text-slate-600">Data quality score: 98% • Last auto-saved 2 min ago</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Save className="w-4 h-4" />
                Save as Draft
              </Button>
              <Button className="gap-2 bg-[#0B3C5D] hover:bg-[#082a42] text-white">
                <Send className="w-4 h-4" />
                Submit for Review
              </Button>
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
    <div className="max-w-6xl mx-auto space-y-8">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#0B3C5D]" />
            Generation vs Target Trend
          </CardTitle>
          <CardDescription>Last 5 months performance comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="actual" fill="#0B3C5D" radius={[8, 8, 0, 0]} name="Actual Generation" />
                <Bar dataKey="target" fill="#F4B400" radius={[8, 8, 0, 0]} name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#0B3C5D]" />
            CUF Trend Analysis
          </CardTitle>
          <CardDescription>Capacity Utilization Factor over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Line type="monotone" dataKey="cuf" stroke="#0B3C5D" strokeWidth={3} dot={{ fill: '#0B3C5D', r: 6 }} name="CUF %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card className="shadow-sm border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-slate-600">Avg Generation</div>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">4,544 MWh</div>
            <div className="text-sm text-emerald-600 font-medium">+2.3% vs previous period</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-slate-600">Avg CUF</div>
              <Activity className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">22.7%</div>
            <div className="text-sm text-slate-600">Within expected range</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-slate-600">Target Achievement</div>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">95.4%</div>
            <div className="text-sm text-rose-600 font-medium">-4.6% shortfall</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Workflow Timeline Component
function WorkflowTimeline({ stages }: { stages: any[] }) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-sm">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#0B3C5D]" />
            Approval Workflow Progress
          </CardTitle>
          <CardDescription>Track the review and approval process</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-8">
            {stages.map((stage, idx) => {
              const isCompleted = stage.status === "completed";
              const isCurrent = stage.status === "current";
              const isPending = stage.status === "pending";

              return (
                <div key={stage.id} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 ${
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

                  <Card className={`flex-1 ${isCurrent ? "border-2 border-amber-500 bg-amber-50" : "border border-slate-200"}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-1">{stage.name}</h3>
                          {stage.user !== "—" && stage.user !== "Pending" && (
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <User className="w-4 h-4" />
                              <span>{stage.user}</span>
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
                      
                      {stage.date !== "—" && (
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Clock className="w-4 h-4" />
                          <span>{stage.date}</span>
                        </div>
                      )}

                      {isCurrent && (
                        <div className="mt-4 pt-4 border-t border-amber-200">
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-rose-600 border-rose-300 hover:bg-rose-50">
                              Reject
                            </Button>
                            <Button size="sm" variant="outline">
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
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="shadow-sm mt-6">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="w-5 h-5 text-[#0B3C5D]" />
            Comments & Discussion (3)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                JD
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-slate-900">John Doe</span>
                  <span className="text-xs text-slate-500">2 hours ago</span>
                </div>
                <p className="text-sm text-slate-700">Data entry completed for February. Please review the breakdown hours - slightly higher than usual due to inverter maintenance.</p>
              </div>
            </div>

            <Separator />

            <div className="flex gap-3">
              <Input placeholder="Add a comment..." className="flex-1" />
              <Button className="bg-[#0B3C5D] hover:bg-[#082a42] text-white">
                Comment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Bulk Upload Dialog Component
function BulkUploadDialog({ onClose }: { onClose: () => void }) {
  const csvErrors = [
    { row: 3, field: "Gross Generation", value: "abc", error: "Must be numeric" },
    { row: 5, field: "Net Export", value: "-100", error: "Cannot be negative" },
    { row: 8, field: "Plant Availability", value: "105", error: "Must be ≤ 100%" },
  ];

  return (
    <div className="space-y-6 py-4">
      {/* Upload Area */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Select CSV File</h3>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </Button>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer bg-slate-50">
          <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Drag & Drop CSV File Here
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            or click to browse from your computer
          </p>
          <Button className="bg-[#0B3C5D] hover:bg-[#082a42] text-white">
            Select File
          </Button>
        </div>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">CSV Format Requirements:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Required columns: FY, Month, State, District, Plant ID, Gross Gen, Net Export, Grid Avail, Plant Avail</li>
            <li>• Optional columns: Curtailment, Breakdown Hrs, PM Hrs, Target, Revenue</li>
            <li>• Numeric values without units | Date format: YYYY-MM-DD | Max file size: 10MB</li>
          </ul>
        </div>
      </div>

      {/* Validation Errors */}
      {csvErrors.length > 0 && (
        <Card className="border-2 border-red-200 bg-red-50">
          <CardHeader className="bg-red-100 border-b border-red-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <CardTitle className="text-sm text-red-900">
                {csvErrors.length} Validation Errors Found
              </CardTitle>
            </div>
            <CardDescription className="text-red-800">
              Correct these errors before proceeding with upload
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Row</TableHead>
                  <TableHead>Field</TableHead>
                  <TableHead>Invalid Value</TableHead>
                  <TableHead>Error</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {csvErrors.map((error, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-semibold text-red-900">#{error.row}</TableCell>
                    <TableCell className="text-red-900">{error.field}</TableCell>
                    <TableCell className="font-mono text-sm text-red-700">{error.value}</TableCell>
                    <TableCell className="text-red-800 text-sm">{error.error}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Preview Data
        </Button>
        <Button 
          className="bg-[#0B3C5D] hover:bg-[#082a42] text-white" 
          disabled={csvErrors.length > 0}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload & Submit
        </Button>
      </div>
    </div>
  );
}

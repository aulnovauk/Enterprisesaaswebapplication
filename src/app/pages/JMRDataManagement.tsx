import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
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
  DialogFooter,
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
  Database,
  Calendar,
  Filter,
  Search,
  RotateCcw,
  X as XIcon,
  AlertTriangle,
  Info,
  Edit3,
  ChevronRight,
  FileUp,
  CheckCircle2,
  Ban,
  Unlock,
  FileImage,
  GitCompare,
  ShieldCheck,
  UserCheck,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  HelpCircle,
  Zap,
  Building2,
  MapPin,
  Trash2,
  Plus,
  Copy,
  ExternalLink,
} from "lucide-react";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "../components/ui/scroll-area";
import { toast } from "sonner";
import { Checkbox } from "../components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

// Mock Data
const financialYears = ["FY 2025-26", "FY 2024-25", "FY 2023-24"];
const months = [
  "April", "May", "June", "July", "August", "September",
  "October", "November", "December", "January", "February", "March"
];
const states = ["Maharashtra", "Tamil Nadu", "Rajasthan", "Gujarat", "Karnataka", "Andhra Pradesh"];
const vendors = ["SolarCo India", "SunPower Tech", "Green Energy Ltd", "TechSolar Pvt", "Mega Solar Inc"];
const ppaTypes = ["Long Term (25Y)", "Medium Term (15Y)", "Short Term (5Y)"];

// JMR Repository Mock Data
const jmrRecords = [
  {
    id: "JMR-2026-02-001",
    fy: "FY 2025-26",
    month: "February",
    plant: "Jodhpur Solar Park A",
    vendor: "SolarCo India",
    grossGeneration: 4520,
    revenue: 42.85,
    approvalStatus: "approved",
    lockStatus: true,
    version: 2,
    pdfUploaded: true,
    submittedBy: "Rajesh Kumar",
    approvedBy: "Priya Sharma",
    submittedDate: "2026-03-01",
    approvedDate: "2026-03-02",
  },
  {
    id: "JMR-2026-02-002",
    fy: "FY 2025-26",
    month: "February",
    plant: "Sangli Solar Farm",
    vendor: "SunPower Tech",
    grossGeneration: 2150,
    revenue: 20.42,
    approvalStatus: "pending",
    lockStatus: false,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Amit Desai",
    approvedBy: "—",
    submittedDate: "2026-03-01",
    approvedDate: "—",
  },
  {
    id: "JMR-2026-02-003",
    fy: "FY 2025-26",
    month: "February",
    plant: "Anantapur PV Plant",
    vendor: "Green Energy Ltd",
    grossGeneration: 8900,
    revenue: 84.55,
    approvalStatus: "draft",
    lockStatus: false,
    version: 1,
    pdfUploaded: false,
    submittedBy: "Venkat Rao",
    approvedBy: "—",
    submittedDate: "—",
    approvedDate: "—",
  },
  {
    id: "JMR-2026-01-001",
    fy: "FY 2025-26",
    month: "January",
    plant: "Kutch Solar Station",
    vendor: "TechSolar Pvt",
    grossGeneration: 6750,
    revenue: 64.12,
    approvalStatus: "rejected",
    lockStatus: false,
    version: 3,
    pdfUploaded: true,
    submittedBy: "Sunil Patel",
    approvedBy: "—",
    submittedDate: "2026-02-01",
    approvedDate: "—",
  },
  {
    id: "JMR-2026-01-002",
    fy: "FY 2025-26",
    month: "January",
    plant: "Pavagada Solar Park",
    vendor: "Mega Solar Inc",
    grossGeneration: 15500,
    revenue: 147.25,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Lakshmi N",
    approvedBy: "Suresh Iyer",
    submittedDate: "2026-02-01",
    approvedDate: "2026-02-03",
  },
];

// Audit Trail Mock Data
const auditRecords = [
  {
    versionNo: 2,
    modifiedBy: "Priya Sharma",
    role: "Checker",
    timestamp: "2026-03-02 14:30:45",
    fieldsChanged: ["Approval Status", "Lock Status"],
    changeSummary: "Approved and locked JMR record",
    approvalStatus: "Approved",
    ipAddress: "192.168.1.105",
  },
  {
    versionNo: 1,
    modifiedBy: "Rajesh Kumar",
    role: "Maker",
    timestamp: "2026-03-01 10:15:22",
    fieldsChanged: ["Gross Generation", "Net Export", "Revenue"],
    changeSummary: "Initial JMR data entry",
    approvalStatus: "Submitted",
    ipAddress: "192.168.1.102",
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "approved":
      return {
        label: "Approved",
        variant: "default" as const,
        className: "bg-emerald-600 text-white hover:bg-emerald-700",
        icon: CheckCircle,
      };
    case "pending":
      return {
        label: "Pending Review",
        variant: "default" as const,
        className: "bg-amber-600 text-white hover:bg-amber-700",
        icon: Clock,
      };
    case "draft":
      return {
        label: "Draft",
        variant: "outline" as const,
        className: "border-blue-600 text-blue-600",
        icon: FileText,
      };
    case "rejected":
      return {
        label: "Rejected",
        variant: "default" as const,
        className: "bg-rose-600 text-white hover:bg-rose-700",
        icon: XCircle,
      };
    case "locked":
      return {
        label: "Locked",
        variant: "default" as const,
        className: "bg-slate-600 text-white hover:bg-slate-700",
        icon: Lock,
      };
    default:
      return {
        label: status,
        variant: "outline" as const,
        className: "",
        icon: FileText,
      };
  }
};

export function JMRDataManagement() {
  const [activeTab, setActiveTab] = useState("manual-entry");
  const [selectedFY, setSelectedFY] = useState("FY 2025-26");
  const [selectedMonth, setSelectedMonth] = useState("February");
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [selectedVendor, setSelectedVendor] = useState("All Vendors");
  const [selectedPPAType, setSelectedPPAType] = useState("All PPA Types");
  const [showWorkflowPanel, setShowWorkflowPanel] = useState(true);
  const [entryStep, setEntryStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Form State - Plant Metadata
  const [plantMetadata, setPlantMetadata] = useState({
    state: "Maharashtra",
    district: "Sangli",
    plantName: "Sangli Solar Farm",
    capacity: "25",
    cod: "2024-04-15",
    vendor: "SunPower Tech",
    procurer: "EESL",
    contractType: "Domestic",
    ppaType: "Long Term (25Y)",
  });

  // Form State - Operational Parameters
  const [operationalData, setOperationalData] = useState({
    grossGeneration: "2150.5",
    netExportEnergy: "2120.3",
    importUnits: "5.2",
    gridAvailability: "98.5",
    plantAvailability: "97.8",
    curtailmentUnits: "12.3",
    solarDowntimeHours: "8.5",
    gridDowntimeHours: "15.2",
    preventiveMaintenanceHours: "8.0",
    breakdownHours: "12.5",
    transmissionLineLoss: "1.8",
    reactivePowerWithdrawal: "45.2",
  });

  // Form State - Commercial Parameters
  const [commercialData, setCommercialData] = useState({
    contractualTarget: "2200",
    revenueRealized: "20.42",
    omDeviationAmount: "0.85",
  });

  // Validation state
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);

  // Computed values
  const auxiliaryConsumption = operationalData.grossGeneration && operationalData.netExportEnergy
    ? (parseFloat(operationalData.grossGeneration) - parseFloat(operationalData.netExportEnergy)).toFixed(2)
    : "—";

  const targetAchievement = operationalData.netExportEnergy && commercialData.contractualTarget
    ? ((parseFloat(operationalData.netExportEnergy) / parseFloat(commercialData.contractualTarget)) * 100).toFixed(2)
    : "—";

  const cuf = "21.8";
  const paf = "97.8";
  const expectedGeneration = "2200";
  const revenueShortfall = "1.58";
  const ldRisk = "Low";

  // Handle form validation
  const validateForm = () => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check mandatory fields
    if (!operationalData.grossGeneration) errors.push("Gross Generation is required");
    if (!operationalData.netExportEnergy) errors.push("Net Export Energy is required");
    if (!commercialData.revenueRealized) errors.push("Revenue Realized is required");

    // Check logical consistency
    if (parseFloat(operationalData.netExportEnergy) > parseFloat(operationalData.grossGeneration)) {
      errors.push("Net Export cannot exceed Gross Generation");
    }

    // Check thresholds
    if (parseFloat(operationalData.gridAvailability) < 95) {
      warnings.push("Grid Availability below 95% threshold");
    }
    if (parseFloat(operationalData.plantAvailability) < 95) {
      warnings.push("Plant Availability below 95% threshold");
    }

    setValidationErrors(errors);
    setValidationWarnings(warnings);

    return errors.length === 0;
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully");
  };

  const handleSubmitForReview = () => {
    if (validateForm()) {
      toast.success("Submitted for review successfully");
    } else {
      toast.error("Please fix validation errors before submitting");
    }
  };

  const handleReset = () => {
    setOperationalData({
      grossGeneration: "",
      netExportEnergy: "",
      importUnits: "",
      gridAvailability: "",
      plantAvailability: "",
      curtailmentUnits: "",
      solarDowntimeHours: "",
      gridDowntimeHours: "",
      preventiveMaintenanceHours: "",
      breakdownHours: "",
      transmissionLineLoss: "",
      reactivePowerWithdrawal: "",
    });
    setCommercialData({
      contractualTarget: "",
      revenueRealized: "",
      omDeviationAmount: "",
    });
    setValidationErrors([]);
    setValidationWarnings([]);
    toast.info("Form reset");
  };

  // Filter JMR records
  const filteredJMRRecords = jmrRecords.filter((record) => {
    const matchesSearch =
      record.plant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.vendor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || record.approvalStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* GLOBAL HEADER */}
      <div className="bg-white border-b-2 border-slate-200 shadow-sm shrink-0 sticky top-0 z-30">
        <div className="px-6 py-4">
          {/* Title & Primary Filters */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/80 rounded-xl shadow-md">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 leading-none">
                  JMR Data Management
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Monthly Joint Meter Reading · Certified Data Governance
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Status Indicators */}
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-slate-700">System Active</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-xs text-slate-600">Last sync: 2 min ago</span>
              </div>

              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <Calendar className="w-4 h-4 text-slate-500" />
                <Select value={selectedFY} onValueChange={setSelectedFY}>
                  <SelectTrigger className="border-0 bg-transparent h-auto p-0 font-semibold text-sm w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {financialYears.map((fy) => (
                      <SelectItem key={fy} value={fy}>
                        {fy}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Separator orientation="vertical" className="h-4" />
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="border-0 bg-transparent h-auto p-0 font-semibold text-sm w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-36 h-9 text-xs">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All States">All States</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                <SelectTrigger className="w-36 h-9 text-xs">
                  <SelectValue placeholder="Vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Vendors">All Vendors</SelectItem>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor} value={vendor}>
                      {vendor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPPAType} onValueChange={setSelectedPPAType}>
                <SelectTrigger className="w-40 h-9 text-xs">
                  <SelectValue placeholder="PPA Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All PPA Types">All PPA Types</SelectItem>
                  {ppaTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Summary */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-slate-700">
                  Submission: <span className="text-emerald-600">Completed</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold text-slate-700">
                  Approval: <span className="text-amber-600">Pending</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Unlock className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-slate-700">
                  Lock: <span className="text-blue-600">Unlocked</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Tabs Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            {/* Tab Navigation */}
            <div className="bg-white border-b border-slate-200 px-6 shrink-0">
              <TabsList className="bg-transparent h-12 p-0 gap-1">
                <TabsTrigger
                  value="manual-entry"
                  className="gap-2 data-[state=active]:bg-[#0B3C5D] data-[state=active]:text-white data-[state=active]:shadow-sm px-4 rounded-lg"
                >
                  <Edit3 className="w-4 h-4" />
                  Manual Entry
                </TabsTrigger>
                <TabsTrigger
                  value="bulk-upload"
                  className="gap-2 data-[state=active]:bg-[#0B3C5D] data-[state=active]:text-white data-[state=active]:shadow-sm px-4 rounded-lg"
                >
                  <FileUp className="w-4 h-4" />
                  Excel Bulk Upload
                </TabsTrigger>
                <TabsTrigger
                  value="repository"
                  className="gap-2 data-[state=active]:bg-[#0B3C5D] data-[state=active]:text-white data-[state=active]:shadow-sm px-4 rounded-lg"
                >
                  <Database className="w-4 h-4" />
                  JMR Repository
                </TabsTrigger>
                <TabsTrigger
                  value="audit"
                  className="gap-2 data-[state=active]:bg-[#0B3C5D] data-[state=active]:text-white data-[state=active]:shadow-sm px-4 rounded-lg"
                >
                  <History className="w-4 h-4" />
                  Audit & Version History
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto bg-slate-50">
              {/* TAB 1: MANUAL ENTRY */}
              <TabsContent value="manual-entry" className="m-0 h-full">
                <div className="flex h-full">
                  {/* Left: Form */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-6 max-w-5xl mx-auto space-y-6 pb-12">
                      {/* Progress Steps */}
                      <Card className="border-2 border-slate-200">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            {[
                              { num: 1, label: "Plant Metadata", icon: Building2 },
                              { num: 2, label: "Operational Data", icon: Zap },
                              { num: 3, label: "Commercial Data", icon: TrendingUp },
                              { num: 4, label: "Review & Submit", icon: CheckCircle2 },
                            ].map((step, idx) => {
                              const Icon = step.icon;
                              const isActive = entryStep === step.num;
                              const isCompleted = entryStep > step.num;

                              return (
                                <div key={step.num} className="flex items-center flex-1">
                                  <div className="flex flex-col items-center flex-1">
                                    <div
                                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                                        isCompleted
                                          ? "bg-emerald-600 text-white"
                                          : isActive
                                          ? "bg-[#0B3C5D] text-white"
                                          : "bg-slate-200 text-slate-500"
                                      }`}
                                    >
                                      {isCompleted ? (
                                        <CheckCircle2 className="w-5 h-5" />
                                      ) : (
                                        <Icon className="w-5 h-5" />
                                      )}
                                    </div>
                                    <span
                                      className={`text-xs font-semibold mt-2 ${
                                        isActive ? "text-[#0B3C5D]" : "text-slate-600"
                                      }`}
                                    >
                                      {step.label}
                                    </span>
                                  </div>
                                  {idx < 3 && (
                                    <div
                                      className={`h-0.5 flex-1 -mx-2 ${
                                        isCompleted ? "bg-emerald-600" : "bg-slate-200"
                                      }`}
                                    ></div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>

                      {/* SECTION 1: Plant Metadata */}
                      {entryStep === 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <Card className="border-2 border-slate-200">
                            <CardHeader className="border-b border-slate-100">
                              <CardTitle className="flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-[#0B3C5D]" />
                                Plant Metadata
                              </CardTitle>
                              <CardDescription>
                                Basic plant identification and configuration details
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <Label htmlFor="state" className="text-xs font-bold uppercase text-slate-700">
                                    State <span className="text-rose-600">*</span>
                                  </Label>
                                  <Select
                                    value={plantMetadata.state}
                                    onValueChange={(val) =>
                                      setPlantMetadata({ ...plantMetadata, state: val })
                                    }
                                  >
                                    <SelectTrigger id="state">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {states.map((state) => (
                                        <SelectItem key={state} value={state}>
                                          {state}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="district" className="text-xs font-bold uppercase text-slate-700">
                                    District <span className="text-rose-600">*</span>
                                  </Label>
                                  <Input
                                    id="district"
                                    value={plantMetadata.district}
                                    onChange={(e) =>
                                      setPlantMetadata({ ...plantMetadata, district: e.target.value })
                                    }
                                    placeholder="Enter district"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="plantName" className="text-xs font-bold uppercase text-slate-700">
                                    Plant Name <span className="text-rose-600">*</span>
                                  </Label>
                                  <Input
                                    id="plantName"
                                    value={plantMetadata.plantName}
                                    onChange={(e) =>
                                      setPlantMetadata({ ...plantMetadata, plantName: e.target.value })
                                    }
                                    placeholder="Enter plant name"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="capacity" className="text-xs font-bold uppercase text-slate-700">
                                    Capacity (MW) <span className="text-rose-600">*</span>
                                  </Label>
                                  <Input
                                    id="capacity"
                                    type="number"
                                    value={plantMetadata.capacity}
                                    onChange={(e) =>
                                      setPlantMetadata({ ...plantMetadata, capacity: e.target.value })
                                    }
                                    placeholder="Enter capacity"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="cod" className="text-xs font-bold uppercase text-slate-700">
                                    COD (Commercial Operation Date) <span className="text-rose-600">*</span>
                                  </Label>
                                  <Input
                                    id="cod"
                                    type="date"
                                    value={plantMetadata.cod}
                                    onChange={(e) =>
                                      setPlantMetadata({ ...plantMetadata, cod: e.target.value })
                                    }
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="vendor" className="text-xs font-bold uppercase text-slate-700">
                                    Vendor <span className="text-rose-600">*</span>
                                  </Label>
                                  <Select
                                    value={plantMetadata.vendor}
                                    onValueChange={(val) =>
                                      setPlantMetadata({ ...plantMetadata, vendor: val })
                                    }
                                  >
                                    <SelectTrigger id="vendor">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {vendors.map((vendor) => (
                                        <SelectItem key={vendor} value={vendor}>
                                          {vendor}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="procurer" className="text-xs font-bold uppercase text-slate-700">
                                    Procurer <span className="text-rose-600">*</span>
                                  </Label>
                                  <Input
                                    id="procurer"
                                    value={plantMetadata.procurer}
                                    onChange={(e) =>
                                      setPlantMetadata({ ...plantMetadata, procurer: e.target.value })
                                    }
                                    placeholder="e.g., EESL, SECI"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="contractType" className="text-xs font-bold uppercase text-slate-700">
                                    Contract Type <span className="text-rose-600">*</span>
                                  </Label>
                                  <Select
                                    value={plantMetadata.contractType}
                                    onValueChange={(val) =>
                                      setPlantMetadata({ ...plantMetadata, contractType: val })
                                    }
                                  >
                                    <SelectTrigger id="contractType">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Domestic">Domestic</SelectItem>
                                      <SelectItem value="ADB">ADB Funded</SelectItem>
                                      <SelectItem value="World Bank">World Bank</SelectItem>
                                      <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="ppaType" className="text-xs font-bold uppercase text-slate-700">
                                    PPA Type <span className="text-rose-600">*</span>
                                  </Label>
                                  <Select
                                    value={plantMetadata.ppaType}
                                    onValueChange={(val) =>
                                      setPlantMetadata({ ...plantMetadata, ppaType: val })
                                    }
                                  >
                                    <SelectTrigger id="ppaType">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {ppaTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                          {type}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={handleReset}>
                              <RotateCcw className="w-4 h-4 mr-2" />
                              Reset
                            </Button>
                            <Button onClick={() => setEntryStep(2)} className="bg-[#0B3C5D]">
                              Next Step
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {/* SECTION 2: Operational Parameters */}
                      {entryStep === 2 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <Card className="border-2 border-slate-200">
                            <CardHeader className="border-b border-slate-100">
                              <CardTitle className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-[#0B3C5D]" />
                                Operational Parameters
                              </CardTitle>
                              <CardDescription>Monthly generation and operational metrics</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                              {/* Generation Metrics */}
                              <div>
                                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                                  <div className="w-1 h-4 bg-[#0B3C5D] rounded"></div>
                                  Generation Metrics
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-slate-700">
                                      Gross Generation (MWh) <span className="text-rose-600">*</span>
                                    </Label>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      value={operationalData.grossGeneration}
                                      onChange={(e) =>
                                        setOperationalData({
                                          ...operationalData,
                                          grossGeneration: e.target.value,
                                        })
                                      }
                                      placeholder="0.00"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-slate-700">
                                      Net Export Energy (MWh) <span className="text-rose-600">*</span>
                                    </Label>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      value={operationalData.netExportEnergy}
                                      onChange={(e) =>
                                        setOperationalData({
                                          ...operationalData,
                                          netExportEnergy: e.target.value,
                                        })
                                      }
                                      placeholder="0.00"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-slate-700">
                                      Import Units (MWh)
                                    </Label>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      value={operationalData.importUnits}
                                      onChange={(e) =>
                                        setOperationalData({
                                          ...operationalData,
                                          importUnits: e.target.value,
                                        })
                                      }
                                      placeholder="0.00"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-slate-700">
                                      Auxiliary Consumption (MWh)
                                    </Label>
                                    <Input
                                      value={auxiliaryConsumption}
                                      disabled
                                      className="bg-slate-100 font-semibold"
                                    />
                                    <p className="text-xs text-slate-500">Auto-calculated</p>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              {/* Availability Metrics */}
                              <div>
                                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                                  <div className="w-1 h-4 bg-[#0B3C5D] rounded"></div>
                                  Availability Metrics
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-slate-700">
                                      Grid Availability (%) <span className="text-rose-600">*</span>
                                    </Label>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      value={operationalData.gridAvailability}
                                      onChange={(e) =>
                                        setOperationalData({
                                          ...operationalData,
                                          gridAvailability: e.target.value,
                                        })
                                      }
                                      placeholder="0.00"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-slate-700">
                                      Plant Availability (%) <span className="text-rose-600">*</span>
                                    </Label>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      value={operationalData.plantAvailability}
                                      onChange={(e) =>
                                        setOperationalData({
                                          ...operationalData,
                                          plantAvailability: e.target.value,
                                        })
                                      }
                                      placeholder="0.00"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-slate-700">
                                      Curtailment Units (MWh)
                                    </Label>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      value={operationalData.curtailmentUnits}
                                      onChange={(e) =>
                                        setOperationalData({
                                          ...operationalData,
                                          curtailmentUnits: e.target.value,
                                        })
                                      }
                                      placeholder="0.00"
                                    />
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              {/* Downtime Metrics */}
                              <div>
                                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                                  <div className="w-1 h-4 bg-[#0B3C5D] rounded"></div>
                                  Downtime Hours
                                </h3>
                                <div className="grid grid-cols-4 gap-4">
                                  <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-slate-700">
                                      Solar Downtime (hrs)
                                    </Label>
                                    <Input
                                      type="number"
                                      step="0.1"
                                      value={operationalData.solarDowntimeHours}
                                      onChange={(e) =>
                                        setOperationalData({
                                          ...operationalData,
                                          solarDowntimeHours: e.target.value,
                                        })
                                      }
                                      placeholder="0.0"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-slate-700">
                                      Grid Downtime (hrs)
                                    </Label>
                                    <Input
                                      type="number"
                                      step="0.1"
                                      value={operationalData.gridDowntimeHours}
                                      onChange={(e) =>
                                        setOperationalData({
                                          ...operationalData,
                                          gridDowntimeHours: e.target.value,
                                        })
                                      }
                                      placeholder="0.0"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-slate-700">
                                      PM Hours
                                    </Label>
                                    <Input
                                      type="number"
                                      step="0.1"
                                      value={operationalData.preventiveMaintenanceHours}
                                      onChange={(e) =>
                                        setOperationalData({
                                          ...operationalData,
                                          preventiveMaintenanceHours: e.target.value,
                                        })
                                      }
                                      placeholder="0.0"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-slate-700">
                                      Breakdown Hours
                                    </Label>
                                    <Input
                                      type="number"
                                      step="0.1"
                                      value={operationalData.breakdownHours}
                                      onChange={(e) =>
                                        setOperationalData({
                                          ...operationalData,
                                          breakdownHours: e.target.value,
                                        })
                                      }
                                      placeholder="0.0"
                                    />
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              {/* Other Parameters */}
                              <div>
                                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                                  <div className="w-1 h-4 bg-[#0B3C5D] rounded"></div>
                                  Other Parameters
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-slate-700">
                                      Transmission Line Loss (%)
                                    </Label>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      value={operationalData.transmissionLineLoss}
                                      onChange={(e) =>
                                        setOperationalData({
                                          ...operationalData,
                                          transmissionLineLoss: e.target.value,
                                        })
                                      }
                                      placeholder="0.00"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-slate-700">
                                      Reactive Power Withdrawal (kVAR)
                                    </Label>
                                    <Input
                                      type="number"
                                      step="0.1"
                                      value={operationalData.reactivePowerWithdrawal}
                                      onChange={(e) =>
                                        setOperationalData({
                                          ...operationalData,
                                          reactivePowerWithdrawal: e.target.value,
                                        })
                                      }
                                      placeholder="0.0"
                                    />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <div className="flex justify-between gap-3">
                            <Button variant="outline" onClick={() => setEntryStep(1)}>
                              Previous
                            </Button>
                            <div className="flex gap-3">
                              <Button variant="outline" onClick={handleReset}>
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Reset
                              </Button>
                              <Button onClick={() => setEntryStep(3)} className="bg-[#0B3C5D]">
                                Next Step
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* SECTION 3: Commercial Parameters */}
                      {entryStep === 3 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <Card className="border-2 border-slate-200">
                            <CardHeader className="border-b border-slate-100">
                              <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-[#0B3C5D]" />
                                Commercial Parameters
                              </CardTitle>
                              <CardDescription>Revenue and contractual compliance data</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <Label className="text-xs font-bold uppercase text-slate-700">
                                    Contractual Target Generation (MWh) <span className="text-rose-600">*</span>
                                  </Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    value={commercialData.contractualTarget}
                                    onChange={(e) =>
                                      setCommercialData({
                                        ...commercialData,
                                        contractualTarget: e.target.value,
                                      })
                                    }
                                    placeholder="0.00"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label className="text-xs font-bold uppercase text-slate-700">
                                    Revenue Realized (₹ Lakhs) <span className="text-rose-600">*</span>
                                  </Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    value={commercialData.revenueRealized}
                                    onChange={(e) =>
                                      setCommercialData({
                                        ...commercialData,
                                        revenueRealized: e.target.value,
                                      })
                                    }
                                    placeholder="0.00"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label className="text-xs font-bold uppercase text-slate-700">
                                    O&M Deviation Amount (₹ Lakhs)
                                  </Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    value={commercialData.omDeviationAmount}
                                    onChange={(e) =>
                                      setCommercialData({
                                        ...commercialData,
                                        omDeviationAmount: e.target.value,
                                      })
                                    }
                                    placeholder="0.00"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label className="text-xs font-bold uppercase text-slate-700">
                                    Target Achievement (%)
                                  </Label>
                                  <Input
                                    value={targetAchievement}
                                    disabled
                                    className="bg-slate-100 font-semibold"
                                  />
                                  <p className="text-xs text-slate-500">Auto-calculated</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Auto-Computed Preview */}
                          <Card className="border-2 border-blue-200 bg-blue-50">
                            <CardHeader className="border-b border-blue-100">
                              <CardTitle className="flex items-center gap-2 text-blue-900">
                                <CheckCircle2 className="w-5 h-5" />
                                Auto-Computed Preview
                              </CardTitle>
                              <CardDescription className="text-blue-700">
                                Live calculated KPIs based on entered data
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                              <div className="grid grid-cols-5 gap-4">
                                <div className="bg-white p-4 rounded-lg border border-blue-200">
                                  <div className="text-xs font-bold text-slate-600 uppercase mb-1">CUF</div>
                                  <div className="text-2xl font-bold text-slate-900">{cuf}%</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-blue-200">
                                  <div className="text-xs font-bold text-slate-600 uppercase mb-1">PAF</div>
                                  <div className="text-2xl font-bold text-slate-900">{paf}%</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-blue-200">
                                  <div className="text-xs font-bold text-slate-600 uppercase mb-1">
                                    Expected Gen
                                  </div>
                                  <div className="text-2xl font-bold text-slate-900">{expectedGeneration}</div>
                                  <div className="text-xs text-slate-600">MWh</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-blue-200">
                                  <div className="text-xs font-bold text-slate-600 uppercase mb-1">
                                    Revenue Shortfall
                                  </div>
                                  <div className="text-2xl font-bold text-rose-600">₹{revenueShortfall}</div>
                                  <div className="text-xs text-slate-600">Lakhs</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-blue-200">
                                  <div className="text-xs font-bold text-slate-600 uppercase mb-1">LD Risk</div>
                                  <Badge
                                    variant="outline"
                                    className="bg-emerald-50 text-emerald-700 border-emerald-200 mt-1"
                                  >
                                    {ldRisk}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <div className="flex justify-between gap-3">
                            <Button variant="outline" onClick={() => setEntryStep(2)}>
                              Previous
                            </Button>
                            <div className="flex gap-3">
                              <Button variant="outline" onClick={handleReset}>
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Reset
                              </Button>
                              <Button onClick={() => setEntryStep(4)} className="bg-[#0B3C5D]">
                                Next Step
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* SECTION 4: Review & Validation */}
                      {entryStep === 4 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          {/* Validation Panel */}
                          <Card className="border-2 border-slate-200">
                            <CardHeader className="border-b border-slate-100">
                              <CardTitle className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-[#0B3C5D]" />
                                Validation & Compliance Check
                              </CardTitle>
                              <CardDescription>
                                Automated field validation and threshold checks
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                              {validationErrors.length > 0 && (
                                <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-lg">
                                  <div className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                      <h4 className="font-bold text-rose-900 mb-2">
                                        Validation Errors ({validationErrors.length})
                                      </h4>
                                      <ul className="space-y-1">
                                        {validationErrors.map((error, idx) => (
                                          <li key={idx} className="text-sm text-rose-700">
                                            • {error}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {validationWarnings.length > 0 && (
                                <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
                                  <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                      <h4 className="font-bold text-amber-900 mb-2">
                                        Warnings ({validationWarnings.length})
                                      </h4>
                                      <ul className="space-y-1">
                                        {validationWarnings.map((warning, idx) => (
                                          <li key={idx} className="text-sm text-amber-700">
                                            • {warning}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {validationErrors.length === 0 && validationWarnings.length === 0 && (
                                <div className="p-4 bg-emerald-50 border-2 border-emerald-200 rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                    <div className="flex-1">
                                      <h4 className="font-bold text-emerald-900">All Validations Passed</h4>
                                      <p className="text-sm text-emerald-700 mt-1">
                                        Data is ready for submission
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              <Button
                                variant="outline"
                                onClick={validateForm}
                                className="w-full gap-2"
                              >
                                <RefreshCw className="w-4 h-4" />
                                Re-run Validation
                              </Button>
                            </CardContent>
                          </Card>

                          {/* Data Summary */}
                          <Card className="border-2 border-slate-200">
                            <CardHeader className="border-b border-slate-100">
                              <CardTitle>Data Summary</CardTitle>
                              <CardDescription>Review all entered information before submission</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                              <div>
                                <h4 className="text-sm font-bold text-slate-700 mb-3">Plant Metadata</h4>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <span className="text-slate-600">Plant:</span>{" "}
                                    <span className="font-semibold">{plantMetadata.plantName}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Capacity:</span>{" "}
                                    <span className="font-semibold">{plantMetadata.capacity} MW</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Vendor:</span>{" "}
                                    <span className="font-semibold">{plantMetadata.vendor}</span>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              <div>
                                <h4 className="text-sm font-bold text-slate-700 mb-3">
                                  Key Operational Metrics
                                </h4>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <span className="text-slate-600">Gross Generation:</span>{" "}
                                    <span className="font-semibold">{operationalData.grossGeneration} MWh</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Net Export:</span>{" "}
                                    <span className="font-semibold">{operationalData.netExportEnergy} MWh</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Plant Availability:</span>{" "}
                                    <span className="font-semibold">{operationalData.plantAvailability}%</span>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              <div>
                                <h4 className="text-sm font-bold text-slate-700 mb-3">Commercial Metrics</h4>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <span className="text-slate-600">Revenue Realized:</span>{" "}
                                    <span className="font-semibold">₹{commercialData.revenueRealized} L</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Target Achievement:</span>{" "}
                                    <span className="font-semibold">{targetAchievement}%</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">CUF:</span>{" "}
                                    <span className="font-semibold">{cuf}%</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Action Buttons */}
                          <div className="flex justify-between gap-3">
                            <Button variant="outline" onClick={() => setEntryStep(3)}>
                              Previous
                            </Button>
                            <div className="flex gap-3">
                              <Button variant="outline" onClick={handleReset}>
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Reset All
                              </Button>
                              <Button variant="outline" onClick={handleSaveDraft} className="gap-2">
                                <Save className="w-4 h-4" />
                                Save Draft
                              </Button>
                              <Button
                                onClick={handleSubmitForReview}
                                className="bg-emerald-600 hover:bg-emerald-700 gap-2"
                              >
                                <Send className="w-4 h-4" />
                                Submit for Review
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Right: Workflow Panel */}
                  {showWorkflowPanel && (
                    <motion.div
                      initial={{ x: 300 }}
                      animate={{ x: 0 }}
                      className="w-80 border-l border-slate-200 bg-white shrink-0"
                    >
                      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900">Workflow Status</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowWorkflowPanel(false)}
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                      <ScrollArea className="h-[calc(100vh-200px)]">
                        <div className="p-4 space-y-6">
                          {/* Maker */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-600 uppercase">Maker</h4>
                                <p className="text-sm font-semibold text-slate-900">Data Entry</p>
                              </div>
                            </div>
                            <div className="ml-4 pl-4 border-l-2 border-blue-200 space-y-2">
                              <div className="text-sm">
                                <span className="text-slate-600">Entered by:</span>{" "}
                                <span className="font-semibold">Current User</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-slate-600">Date:</span>{" "}
                                <span className="font-semibold">Mar 2, 2026 10:30</span>
                              </div>
                              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                                In Progress
                              </Badge>
                            </div>
                          </div>

                          <Separator />

                          {/* Checker */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                                <UserCheck className="w-4 h-4 text-amber-600" />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-600 uppercase">Checker</h4>
                                <p className="text-sm font-semibold text-slate-900">Technical Review</p>
                              </div>
                            </div>
                            <div className="ml-4 pl-4 border-l-2 border-slate-200 space-y-2">
                              <div className="text-sm text-slate-500">Pending submission</div>
                            </div>
                          </div>

                          <Separator />

                          {/* Approver */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                <ShieldCheck className="w-4 h-4 text-slate-400" />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-600 uppercase">Approver</h4>
                                <p className="text-sm font-semibold text-slate-900">Final Approval</p>
                              </div>
                            </div>
                            <div className="ml-4 pl-4 border-l-2 border-slate-200 space-y-2">
                              <div className="text-sm text-slate-500">Awaiting review</div>
                            </div>
                          </div>

                          <Separator />

                          {/* Comments Section */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              Comments
                            </h4>
                            <Textarea
                              placeholder="Add review comments..."
                              className="min-h-24 text-sm"
                            />
                          </div>

                          {/* Actions */}
                          <div className="space-y-2">
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2">
                              <CheckCircle className="w-4 h-4" />
                              Approve
                            </Button>
                            <Button variant="outline" className="w-full gap-2 border-rose-300 text-rose-600 hover:bg-rose-50">
                              <Ban className="w-4 h-4" />
                              Reject
                            </Button>
                          </div>

                          {/* Escalation Alert */}
                          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div className="text-xs text-amber-700">
                                <p className="font-semibold mb-1">Escalation Note</p>
                                <p>Records pending review for &gt;5 days will be auto-escalated</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    </motion.div>
                  )}

                  {!showWorkflowPanel && (
                    <Button
                      onClick={() => setShowWorkflowPanel(true)}
                      className="fixed right-0 top-1/2 -translate-y-1/2 rounded-l-lg rounded-r-none h-32 w-10 bg-[#0B3C5D] hover:bg-[#082a42] shadow-lg z-20"
                      style={{ writingMode: "vertical-rl" }}
                    >
                      <span className="transform rotate-180">Workflow Panel</span>
                    </Button>
                  )}
                </div>
              </TabsContent>

              {/* TAB 2: EXCEL BULK UPLOAD */}
              <TabsContent value="bulk-upload" className="m-0 p-6">
                <div className="max-w-5xl mx-auto space-y-6">
                  <BulkUploadContent />
                </div>
              </TabsContent>

              {/* TAB 3: JMR REPOSITORY */}
              <TabsContent value="repository" className="m-0 p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                  {/* Search & Filter Bar */}
                  <Card className="border-2 border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1 relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            placeholder="Search by JMR ID, Plant, Vendor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="pending">Pending Review</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" className="gap-2">
                          <Download className="w-4 h-4" />
                          Export Table
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* JMR Records Table */}
                  <Card className="border-2 border-slate-200">
                    <CardHeader className="border-b border-slate-100">
                      <CardTitle>Digital JMR Repository</CardTitle>
                      <CardDescription>
                        Complete archive of submitted and approved JMR records
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-slate-50">
                              <TableHead className="font-bold">JMR ID</TableHead>
                              <TableHead className="font-bold">FY / Month</TableHead>
                              <TableHead className="font-bold">Plant</TableHead>
                              <TableHead className="font-bold">Vendor</TableHead>
                              <TableHead className="font-bold text-right">Generation (MWh)</TableHead>
                              <TableHead className="font-bold text-right">Revenue (₹L)</TableHead>
                              <TableHead className="font-bold">Status</TableHead>
                              <TableHead className="font-bold text-center">Lock</TableHead>
                              <TableHead className="font-bold text-center">Version</TableHead>
                              <TableHead className="font-bold text-center">PDF</TableHead>
                              <TableHead className="font-bold text-center">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredJMRRecords.map((record) => {
                              const statusConfig = getStatusConfig(record.approvalStatus);
                              const StatusIcon = statusConfig.icon;

                              return (
                                <TableRow key={record.id} className="hover:bg-slate-50">
                                  <TableCell className="font-mono text-xs font-semibold">
                                    {record.id}
                                  </TableCell>
                                  <TableCell className="text-sm">
                                    <div>{record.fy}</div>
                                    <div className="text-xs text-slate-600">{record.month}</div>
                                  </TableCell>
                                  <TableCell className="font-semibold text-sm">
                                    {record.plant}
                                  </TableCell>
                                  <TableCell className="text-sm">{record.vendor}</TableCell>
                                  <TableCell className="text-right font-semibold">
                                    {record.grossGeneration.toLocaleString()}
                                  </TableCell>
                                  <TableCell className="text-right font-semibold">
                                    ₹{record.revenue.toFixed(2)}
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant={statusConfig.variant}
                                      className={`gap-1 ${statusConfig.className}`}
                                    >
                                      <StatusIcon className="w-3 h-3" />
                                      {statusConfig.label}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {record.lockStatus ? (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <Lock className="w-4 h-4 text-slate-600 mx-auto" />
                                          </TooltipTrigger>
                                          <TooltipContent>Record Locked</TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    ) : (
                                      <Unlock className="w-4 h-4 text-amber-600 mx-auto" />
                                    )}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Badge variant="outline" className="text-xs">
                                      v{record.version}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {record.pdfUploaded ? (
                                      <CheckCircle className="w-4 h-4 text-emerald-600 mx-auto" />
                                    ) : (
                                      <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center justify-center gap-1">
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                              <Eye className="w-4 h-4" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>View Details</TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>

                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                              <Download className="w-4 h-4" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>Download PDF</TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>

                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                              <GitCompare className="w-4 h-4" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>Compare Versions</TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* TAB 4: AUDIT & VERSION HISTORY */}
              <TabsContent value="audit" className="m-0 p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                  <Card className="border-2 border-slate-200">
                    <CardHeader className="border-b border-slate-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Audit Trail & Version History</CardTitle>
                          <CardDescription>
                            Complete log of all modifications and approvals
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="gap-2">
                            <GitCompare className="w-4 h-4" />
                            Compare Versions
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <Download className="w-4 h-4" />
                            Export Audit Log
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-slate-50">
                              <TableHead className="font-bold text-center">Version</TableHead>
                              <TableHead className="font-bold">Modified By</TableHead>
                              <TableHead className="font-bold">Role</TableHead>
                              <TableHead className="font-bold">Timestamp</TableHead>
                              <TableHead className="font-bold">Fields Changed</TableHead>
                              <TableHead className="font-bold">Change Summary</TableHead>
                              <TableHead className="font-bold">Status</TableHead>
                              <TableHead className="font-bold">IP Address</TableHead>
                              <TableHead className="font-bold text-center">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {auditRecords.map((audit) => (
                              <TableRow key={audit.versionNo} className="hover:bg-slate-50">
                                <TableCell className="text-center">
                                  <Badge variant="outline" className="font-mono">
                                    v{audit.versionNo}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-semibold">{audit.modifiedBy}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="text-xs">
                                    {audit.role}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm font-mono text-slate-600">
                                  {audit.timestamp}
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-wrap gap-1">
                                    {audit.fieldsChanged.map((field, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="outline"
                                        className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                                      >
                                        {field}
                                      </Badge>
                                    ))}
                                  </div>
                                </TableCell>
                                <TableCell className="text-sm max-w-xs">{audit.changeSummary}</TableCell>
                                <TableCell>
                                  <Badge
                                    className={
                                      audit.approvalStatus === "Approved"
                                        ? "bg-emerald-600"
                                        : "bg-blue-600"
                                    }
                                  >
                                    {audit.approvalStatus}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-mono text-xs text-slate-600">
                                  {audit.ipAddress}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center justify-center gap-1">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Eye className="w-4 h-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>View Changes</TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            disabled={audit.versionNo === 2}
                                          >
                                            <RotateCcw className="w-4 h-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Rollback (Admin Only)</TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Version Comparison Tool */}
                  <Card className="border-2 border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-blue-900">Version Comparison Tool</CardTitle>
                      <CardDescription className="text-blue-700">
                        Select two versions to compare side-by-side
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Select defaultValue="1">
                          <SelectTrigger className="w-48 bg-white">
                            <SelectValue placeholder="Version 1" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Version 1</SelectItem>
                            <SelectItem value="2">Version 2</SelectItem>
                          </SelectContent>
                        </Select>

                        <span className="text-blue-900 font-semibold">vs</span>

                        <Select defaultValue="2">
                          <SelectTrigger className="w-48 bg-white">
                            <SelectValue placeholder="Version 2" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Version 1</SelectItem>
                            <SelectItem value="2">Version 2</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button className="bg-[#0B3C5D] gap-2">
                          <GitCompare className="w-4 h-4" />
                          Compare
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Bulk Upload Component
function BulkUploadContent() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStats, setUploadStats] = useState({
    total: 0,
    valid: 0,
    errors: 0,
    duplicates: 0,
    warnings: 0,
  });
  const [showResults, setShowResults] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate processing
      setTimeout(() => {
        setUploadStats({
          total: 25,
          valid: 20,
          errors: 3,
          duplicates: 1,
          warnings: 1,
        });
        setShowResults(true);
        toast.success("File processed successfully");
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Download Template */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-900 mb-1">Step 1: Download Template</h3>
              <p className="text-sm text-blue-700">
                Download the standardized Excel template with all required fields
              </p>
            </div>
            <Button className="bg-[#0B3C5D] gap-2">
              <Download className="w-4 h-4" />
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload Zone */}
      <Card className="border-2 border-slate-200">
        <CardHeader className="border-b border-slate-100">
          <CardTitle>Step 2: Upload Completed File</CardTitle>
          <CardDescription>Drag and drop your Excel file or click to browse</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <label
            htmlFor="file-upload"
            className="block border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-[#0B3C5D] hover:bg-blue-50 transition-all"
          >
            <input
              id="file-upload"
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-sm font-semibold text-slate-900 mb-1">
              Drop Excel file here or click to upload
            </p>
            <p className="text-xs text-slate-600">Supports .xlsx, .xls, .csv files (Max 10MB)</p>

            {uploadedFile && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-emerald-200 rounded-lg">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-semibold text-slate-900">{uploadedFile.name}</span>
              </div>
            )}
          </label>
        </CardContent>
      </Card>

      {/* Upload Results */}
      {showResults && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-2 border-slate-200">
            <CardHeader className="border-b border-slate-100">
              <CardTitle>Upload Results</CardTitle>
              <CardDescription>Validation summary and error details</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Statistics */}
              <div className="grid grid-cols-5 gap-4">
                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-900">{uploadStats.total}</div>
                  <div className="text-xs font-semibold text-blue-700 mt-1">Total Records</div>
                </div>
                <div className="p-4 bg-emerald-50 border-2 border-emerald-200 rounded-lg text-center">
                  <div className="text-2xl font-bold text-emerald-900">{uploadStats.valid}</div>
                  <div className="text-xs font-semibold text-emerald-700 mt-1">Valid</div>
                </div>
                <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-lg text-center">
                  <div className="text-2xl font-bold text-rose-900">{uploadStats.errors}</div>
                  <div className="text-xs font-semibold text-rose-700 mt-1">Errors</div>
                </div>
                <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-lg text-center">
                  <div className="text-2xl font-bold text-amber-900">{uploadStats.warnings}</div>
                  <div className="text-xs font-semibold text-amber-700 mt-1">Warnings</div>
                </div>
                <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-lg text-center">
                  <div className="text-2xl font-bold text-slate-900">{uploadStats.duplicates}</div>
                  <div className="text-xs font-semibold text-slate-700 mt-1">Duplicates</div>
                </div>
              </div>

              {/* Error Details */}
              {uploadStats.errors > 0 && (
                <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-lg">
                  <h4 className="font-bold text-rose-900 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Error Records ({uploadStats.errors})
                  </h4>
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded border border-rose-100">
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-sm font-semibold text-slate-900">Row 7</span>
                        <Badge variant="outline" className="bg-rose-100 text-rose-700 border-rose-200 text-xs">
                          Invalid Data
                        </Badge>
                      </div>
                      <p className="text-xs text-rose-700">
                        Gross Generation cannot be empty (required field)
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border border-rose-100">
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-sm font-semibold text-slate-900">Row 14</span>
                        <Badge variant="outline" className="bg-rose-100 text-rose-700 border-rose-200 text-xs">
                          Validation Error
                        </Badge>
                      </div>
                      <p className="text-xs text-rose-700">
                        Net Export (2500) exceeds Gross Generation (2400)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download Error Report
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline">Fix & Re-upload</Button>
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 gap-2"
                    disabled={uploadStats.errors > 0}
                  >
                    <Send className="w-4 h-4" />
                    Submit All for Review
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

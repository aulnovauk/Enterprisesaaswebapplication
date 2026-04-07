import { useState, useRef, useMemo, useEffect } from "react";
import { PageExportMenu } from "../components/PageExportMenu";
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
  TrendingDown,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  Zap,
  Building2,
  MapPin,
  Trash2,
  Plus,
  Copy,
  ExternalLink,
  RefreshCw,
  BarChart2,
} from "lucide-react";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "../components/ui/scroll-area";
import { toast } from "sonner";
import { Checkbox } from "../components/ui/checkbox";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
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
export const initialJmrRecords = [
  {
    id: "JMR-2026-02-001",
    fy: "FY 2025-26",
    month: "February",
    plant: "Jodhpur Solar Park A",
    district: "Jodhpur",
    vendor: "SolarCo India",
    capacityKWp: 2555.19,
    grossGeneration: 4520,
    energyExportKWh: 261230.00,
    energyImportKWh: 1620.00,
    outage: "01:19",
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
    district: "Sangli",
    vendor: "SunPower Tech",
    capacityKWp: 789.00,
    grossGeneration: 2150,
    energyExportKWh: 100878.00,
    energyImportKWh: 661.00,
    outage: "13:46",
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
    district: "Anantapur",
    vendor: "Green Energy Ltd",
    capacityKWp: 2777.77,
    grossGeneration: 8900,
    energyExportKWh: 396600.00,
    energyImportKWh: 3400.00,
    outage: "23:16",
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
    district: "Kutch",
    vendor: "TechSolar Pvt",
    capacityKWp: 910.10,
    grossGeneration: 6750,
    energyExportKWh: 31790.00,
    energyImportKWh: 0.00,
    outage: "01:29",
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
    district: "Tumkur",
    vendor: "Mega Solar Inc",
    capacityKWp: 5009.99,
    grossGeneration: 15500,
    energyExportKWh: 645415.00,
    energyImportKWh: 2495.00,
    outage: "10:27",
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
  {
    id: "JMR-2026-02-004",
    fy: "FY 2025-26",
    month: "February",
    plant: "ABC Solar",
    district: "Yavatmal",
    vendor: "SolarCo India",
    capacityKWp: 469.00,
    grossGeneration: 1850,
    energyExportKWh: 63760.00,
    energyImportKWh: 320.00,
    outage: "00:00",
    revenue: 17.58,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Rajesh Kumar",
    approvedBy: "Priya Sharma",
    submittedDate: "2026-03-01",
    approvedDate: "2026-03-02",
  },
  {
    id: "JMR-2025-11-001",
    fy: "FY 2025-26",
    month: "November",
    plant: "EFG Solar Plant",
    district: "Jalna",
    vendor: "Mega Solar Inc",
    capacityKWp: 910.10,
    grossGeneration: 920,
    energyExportKWh: 31790.00,
    energyImportKWh: 0.00,
    outage: "01:29",
    revenue: 8.74,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Lakshmi N",
    approvedBy: "Suresh Iyer",
    submittedDate: "2025-12-01",
    approvedDate: "2025-12-03",
  },
  {
    id: "JMR-2025-11-002",
    fy: "FY 2025-26",
    month: "November",
    plant: "FGH Solar Unit",
    district: "Jalna",
    vendor: "SolarCo India",
    capacityKWp: 340.92,
    grossGeneration: 1125,
    energyExportKWh: 38810.50,
    energyImportKWh: 553.50,
    outage: "04:37",
    revenue: 10.69,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Amit Desai",
    approvedBy: "Priya Sharma",
    submittedDate: "2025-12-01",
    approvedDate: "2025-12-02",
  },
  {
    id: "JMR-2026-01-003",
    fy: "FY 2025-26",
    month: "January",
    plant: "GHI Solar Park",
    district: "Nandurbar",
    vendor: "SunPower Tech",
    capacityKWp: 758.88,
    grossGeneration: 2290,
    energyExportKWh: 79132.78,
    energyImportKWh: 403.82,
    outage: "08:46",
    revenue: 21.76,
    approvalStatus: "pending",
    lockStatus: false,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Venkat Rao",
    approvedBy: "—",
    submittedDate: "2026-02-01",
    approvedDate: "—",
  },
  {
    id: "JMR-2026-02-005",
    fy: "FY 2025-26",
    month: "February",
    plant: "IJK Solar Farm",
    district: "Kolhapur",
    vendor: "SunPower Tech",
    capacityKWp: 549.88,
    grossGeneration: 2030,
    energyExportKWh: 69999.00,
    energyImportKWh: 341.30,
    outage: "02:54",
    revenue: 19.29,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Sunil Patel",
    approvedBy: "Suresh Iyer",
    submittedDate: "2026-03-01",
    approvedDate: "2026-03-02",
  },
  {
    id: "JMR-2026-01-004",
    fy: "FY 2025-26",
    month: "January",
    plant: "Jodhpur Solar Park A",
    district: "Jodhpur",
    vendor: "SolarCo India",
    capacityKWp: 2555.19,
    grossGeneration: 4180,
    energyExportKWh: 241850.00,
    energyImportKWh: 1480.00,
    outage: "02:45",
    revenue: 39.50,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Rajesh Kumar",
    approvedBy: "Priya Sharma",
    submittedDate: "2026-02-01",
    approvedDate: "2026-02-03",
  },
  {
    id: "JMR-2026-01-005",
    fy: "FY 2025-26",
    month: "January",
    plant: "Sangli Solar Farm",
    district: "Sangli",
    vendor: "SunPower Tech",
    capacityKWp: 789.00,
    grossGeneration: 1980,
    energyExportKWh: 92460.00,
    energyImportKWh: 590.00,
    outage: "15:20",
    revenue: 18.76,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Amit Desai",
    approvedBy: "Priya Sharma",
    submittedDate: "2026-02-01",
    approvedDate: "2026-02-02",
  },
  {
    id: "JMR-2026-01-006",
    fy: "FY 2025-26",
    month: "January",
    plant: "Anantapur PV Plant",
    district: "Anantapur",
    vendor: "Green Energy Ltd",
    capacityKWp: 2777.77,
    grossGeneration: 8200,
    energyExportKWh: 365100.00,
    energyImportKWh: 3100.00,
    outage: "18:30",
    revenue: 77.88,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Venkat Rao",
    approvedBy: "Suresh Iyer",
    submittedDate: "2026-02-01",
    approvedDate: "2026-02-03",
  },
  {
    id: "JMR-2026-01-007",
    fy: "FY 2025-26",
    month: "January",
    plant: "ABC Solar",
    district: "Yavatmal",
    vendor: "SolarCo India",
    capacityKWp: 469.00,
    grossGeneration: 1720,
    energyExportKWh: 59340.00,
    energyImportKWh: 295.00,
    outage: "00:00",
    revenue: 16.35,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Rajesh Kumar",
    approvedBy: "Priya Sharma",
    submittedDate: "2026-02-01",
    approvedDate: "2026-02-02",
  },
  {
    id: "JMR-2026-01-008",
    fy: "FY 2025-26",
    month: "January",
    plant: "IJK Solar Farm",
    district: "Kolhapur",
    vendor: "SunPower Tech",
    capacityKWp: 549.88,
    grossGeneration: 1870,
    energyExportKWh: 64520.00,
    energyImportKWh: 312.50,
    outage: "03:40",
    revenue: 17.77,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Sunil Patel",
    approvedBy: "Suresh Iyer",
    submittedDate: "2026-02-01",
    approvedDate: "2026-02-02",
  },
  {
    id: "JMR-2026-03-001",
    fy: "FY 2025-26",
    month: "March",
    plant: "Jodhpur Solar Park A",
    district: "Jodhpur",
    vendor: "SolarCo India",
    capacityKWp: 2555.19,
    grossGeneration: 5120,
    energyExportKWh: 296480.00,
    energyImportKWh: 1830.00,
    outage: "00:48",
    revenue: 48.62,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Rajesh Kumar",
    approvedBy: "Priya Sharma",
    submittedDate: "2026-04-01",
    approvedDate: "2026-04-02",
  },
  {
    id: "JMR-2026-03-002",
    fy: "FY 2025-26",
    month: "March",
    plant: "Sangli Solar Farm",
    district: "Sangli",
    vendor: "SunPower Tech",
    capacityKWp: 789.00,
    grossGeneration: 2380,
    energyExportKWh: 111420.00,
    energyImportKWh: 720.00,
    outage: "10:15",
    revenue: 22.60,
    approvalStatus: "pending",
    lockStatus: false,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Amit Desai",
    approvedBy: "—",
    submittedDate: "2026-04-01",
    approvedDate: "—",
  },
  {
    id: "JMR-2026-03-003",
    fy: "FY 2025-26",
    month: "March",
    plant: "Anantapur PV Plant",
    district: "Anantapur",
    vendor: "Green Energy Ltd",
    capacityKWp: 2777.77,
    grossGeneration: 9850,
    energyExportKWh: 438750.00,
    energyImportKWh: 3650.00,
    outage: "15:40",
    revenue: 93.58,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Venkat Rao",
    approvedBy: "Suresh Iyer",
    submittedDate: "2026-04-01",
    approvedDate: "2026-04-03",
  },
  {
    id: "JMR-2026-03-004",
    fy: "FY 2025-26",
    month: "March",
    plant: "Kutch Solar Station",
    district: "Kutch",
    vendor: "TechSolar Pvt",
    capacityKWp: 910.10,
    grossGeneration: 7450,
    energyExportKWh: 35090.00,
    energyImportKWh: 0.00,
    outage: "00:55",
    revenue: 70.78,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Sunil Patel",
    approvedBy: "Priya Sharma",
    submittedDate: "2026-04-01",
    approvedDate: "2026-04-02",
  },
  {
    id: "JMR-2026-03-005",
    fy: "FY 2025-26",
    month: "March",
    plant: "Pavagada Solar Park",
    district: "Tumkur",
    vendor: "Mega Solar Inc",
    capacityKWp: 5009.99,
    grossGeneration: 17200,
    energyExportKWh: 716160.00,
    energyImportKWh: 2780.00,
    outage: "07:15",
    revenue: 163.42,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Lakshmi N",
    approvedBy: "Suresh Iyer",
    submittedDate: "2026-04-01",
    approvedDate: "2026-04-03",
  },
  {
    id: "JMR-2026-03-006",
    fy: "FY 2025-26",
    month: "March",
    plant: "ABC Solar",
    district: "Yavatmal",
    vendor: "SolarCo India",
    capacityKWp: 469.00,
    grossGeneration: 2050,
    energyExportKWh: 70730.00,
    energyImportKWh: 350.00,
    outage: "00:00",
    revenue: 19.47,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Rajesh Kumar",
    approvedBy: "Priya Sharma",
    submittedDate: "2026-04-01",
    approvedDate: "2026-04-02",
  },
  {
    id: "JMR-2026-03-007",
    fy: "FY 2025-26",
    month: "March",
    plant: "IJK Solar Farm",
    district: "Kolhapur",
    vendor: "SunPower Tech",
    capacityKWp: 549.88,
    grossGeneration: 2280,
    energyExportKWh: 78660.00,
    energyImportKWh: 385.00,
    outage: "01:30",
    revenue: 21.66,
    approvalStatus: "pending",
    lockStatus: false,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Sunil Patel",
    approvedBy: "—",
    submittedDate: "2026-04-01",
    approvedDate: "—",
  },
  {
    id: "JMR-2026-03-008",
    fy: "FY 2025-26",
    month: "March",
    plant: "GHI Solar Park",
    district: "Nandurbar",
    vendor: "SunPower Tech",
    capacityKWp: 758.88,
    grossGeneration: 2640,
    energyExportKWh: 91182.00,
    energyImportKWh: 465.00,
    outage: "05:20",
    revenue: 25.08,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Venkat Rao",
    approvedBy: "Suresh Iyer",
    submittedDate: "2026-04-01",
    approvedDate: "2026-04-03",
  },
  {
    id: "JMR-2025-12-001",
    fy: "FY 2025-26",
    month: "December",
    plant: "CDE Solar Project",
    district: "Nanded",
    vendor: "SunPower Tech",
    capacityKWp: 789.00,
    grossGeneration: 2920,
    energyExportKWh: 100878.00,
    energyImportKWh: 661.00,
    outage: "13:46",
    revenue: 27.74,
    approvalStatus: "approved",
    lockStatus: true,
    version: 2,
    pdfUploaded: true,
    submittedBy: "Amit Desai",
    approvedBy: "Priya Sharma",
    submittedDate: "2026-01-01",
    approvedDate: "2026-01-03",
  },
  {
    id: "JMR-2025-12-002",
    fy: "FY 2025-26",
    month: "December",
    plant: "JKL Solar Station",
    district: "Hingoli",
    vendor: "Mega Solar Inc",
    capacityKWp: 3122.49,
    grossGeneration: 12150,
    energyExportKWh: 419690.00,
    energyImportKWh: 1640.00,
    outage: "04:05",
    revenue: 115.43,
    approvalStatus: "approved",
    lockStatus: true,
    version: 1,
    pdfUploaded: true,
    submittedBy: "Lakshmi N",
    approvedBy: "Suresh Iyer",
    submittedDate: "2026-01-01",
    approvedDate: "2026-01-02",
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

const plants = [...new Set(initialJmrRecords.map(r => r.plant))];
const APPROVAL_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending Review" },
  { value: "draft", label: "Draft" },
  { value: "rejected", label: "Rejected" },
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
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [selectedPlant, setSelectedPlant] = useState("All Plants");
  const [selectedVendor, setSelectedVendor] = useState("All Vendors");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showWorkflowPanel, setShowWorkflowPanel] = useState(true);
  const pageRef = useRef<HTMLDivElement>(null);
  const [entryStep, setEntryStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

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

  // T001: Workflow state machine
  const [workflowStage, setWorkflowStage] = useState<"draft" | "submitted" | "under_review" | "approved" | "rejected" | "locked">("draft");
  const [checkerComment, setCheckerComment] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const [workflowTimestamps, setWorkflowTimestamps] = useState<{
    submitted?: string;
    checkerAssigned?: string;
    checkerApproved?: string;
    escalated?: string;
    approved?: string;
    locked?: string;
  }>({});

  const formatTimestamp = (date: Date) => {
    return date.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) +
      " " + date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  const recordTimestamp = (key: string) => {
    const now = formatTimestamp(new Date());
    setWorkflowTimestamps(prev => ({ ...prev, [key]: now }));
    return now;
  };

  const [jmrRecords, setJmrRecords] = useState([...initialJmrRecords]);

  // T005: PDF dialog state
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [pdfDialogRecord, setPdfDialogRecord] = useState<(typeof initialJmrRecords)[0] | null>(null);
  const [pdfUploadedSet, setPdfUploadedSet] = useState<Set<string>>(
    new Set(initialJmrRecords.filter(r => r.pdfUploaded).map(r => r.id))
  );

  // T006: Version comparison
  const [compareV1, setCompareV1] = useState("1");
  const [compareV2, setCompareV2] = useState("2");
  const [showDiff, setShowDiff] = useState(false);

  // T007: Custom additional parameters
  const [customParams, setCustomParams] = useState([
    { id: 1, label: "Reactive Power Import (kVAR)", value: "45.2", unit: "kVAR" },
  ]);

  const isLocked = workflowStage === "locked";

  // Computed values
  const auxiliaryConsumption = operationalData.grossGeneration && operationalData.netExportEnergy
    ? (parseFloat(operationalData.grossGeneration) - parseFloat(operationalData.netExportEnergy)).toFixed(2)
    : "—";

  const targetAchievement = operationalData.netExportEnergy && commercialData.contractualTarget
    ? ((parseFloat(operationalData.netExportEnergy) / parseFloat(commercialData.contractualTarget)) * 100).toFixed(2)
    : "—";

  const capacityMW = parseFloat(plantMetadata.capacity) || 0;
  const grossGen = parseFloat(operationalData.grossGeneration) || 0;
  const netExport = parseFloat(operationalData.netExportEnergy) || 0;
  const plantAvail = parseFloat(operationalData.plantAvailability) || 0;
  const gridAvail = parseFloat(operationalData.gridAvailability) || 0;
  const contractTarget = parseFloat(commercialData.contractualTarget) || 0;
  const revRealized = parseFloat(commercialData.revenueRealized) || 0;
  const omDeviation = parseFloat(commercialData.omDeviationAmount) || 0;
  const hoursInMonth = 720;
  const tariffRate = 3.50;

  const cufVal = capacityMW > 0 ? (netExport / (capacityMW * hoursInMonth)) * 100 : 0;
  const cuf = cufVal.toFixed(1);

  const pafVal = plantAvail;
  const paf = pafVal.toFixed(1);

  const expectedGenVal = contractTarget;
  const expectedGeneration = expectedGenVal.toFixed(0);

  const expectedRevenue = contractTarget > 0 ? (contractTarget * tariffRate) / 100 : 0;
  const revenueShortfallVal = Math.max(0, expectedRevenue - revRealized + omDeviation);
  const revenueShortfall = revenueShortfallVal.toFixed(2);

  const targetAchPct = contractTarget > 0 ? (netExport / contractTarget) * 100 : 0;
  const ldRisk = targetAchPct >= 100 ? "None" : targetAchPct >= 95 ? "Low" : targetAchPct >= 90 ? "Medium" : "High";
  const ldRiskColor = ldRisk === "None" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
    ldRisk === "Low" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
    ldRisk === "Medium" ? "bg-amber-50 text-amber-700 border-amber-200" :
    "bg-rose-50 text-rose-700 border-rose-200";

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
      setWorkflowStage("submitted");
      recordTimestamp("submitted");
      recordTimestamp("checkerAssigned");
      toast.success("JMR submitted for Checker review");
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

  const isFiltered = selectedFY !== "FY 2025-26" || selectedMonth !== "All Months" || selectedPlant !== "All Plants" || selectedVendor !== "All Vendors" || selectedStatus !== "all";

  const resetAllFilters = () => {
    setSelectedFY("FY 2025-26");
    setSelectedMonth("All Months");
    setSelectedPlant("All Plants");
    setSelectedVendor("All Vendors");
    setSelectedStatus("all");
    setSearchTerm("");
    toast.info("All filters reset");
  };

  const filteredJMRRecords = useMemo(() => jmrRecords.filter((record) => {
    const matchesFY = record.fy === selectedFY;
    const matchesMonth = selectedMonth === "All Months" || record.month === selectedMonth;
    const matchesPlant = selectedPlant === "All Plants" || record.plant === selectedPlant;
    const matchesVendor = selectedVendor === "All Vendors" || record.vendor === selectedVendor;
    const matchesStatus = selectedStatus === "all" || record.approvalStatus === selectedStatus;
    const matchesSearch =
      !searchTerm ||
      record.plant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.district.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFY && matchesMonth && matchesPlant && matchesVendor && matchesStatus && matchesSearch;
  }), [jmrRecords, selectedFY, selectedMonth, selectedPlant, selectedVendor, selectedStatus, searchTerm]);

  const statusCounts = useMemo(() => {
    const byPeriod = jmrRecords.filter(r => r.fy === selectedFY && (selectedMonth === "All Months" || r.month === selectedMonth));
    return {
      approved: byPeriod.filter(r => r.approvalStatus === "approved").length,
      pending: byPeriod.filter(r => r.approvalStatus === "pending").length,
      draft: byPeriod.filter(r => r.approvalStatus === "draft").length,
      rejected: byPeriod.filter(r => r.approvalStatus === "rejected").length,
      total: byPeriod.length,
    };
  }, [jmrRecords, selectedFY, selectedMonth]);

  // Generation Comparison state
  const [cmpCurrentMonth, setCmpCurrentMonth] = useState("March");
  const [cmpPrevMonth, setCmpPrevMonth] = useState("February");

  const comparisonData = useMemo(() => {
    const currentRecs = jmrRecords.filter(r => r.fy === selectedFY && r.month === cmpCurrentMonth);
    const prevRecs = jmrRecords.filter(r => r.fy === selectedFY && r.month === cmpPrevMonth);

    const sumBy = (recs: typeof jmrRecords, key: keyof typeof jmrRecords[0]) =>
      recs.reduce((acc, r) => acc + (Number(r[key]) || 0), 0);

    const currentGross = sumBy(currentRecs, "grossGeneration");
    const prevGross = sumBy(prevRecs, "grossGeneration");
    const currentExport = sumBy(currentRecs, "energyExportKWh") / 1000;
    const prevExport = sumBy(prevRecs, "energyExportKWh") / 1000;
    const currentRevenue = sumBy(currentRecs, "revenue");
    const prevRevenue = sumBy(prevRecs, "revenue");

    const delta = (curr: number, prev: number) =>
      prev === 0 ? 0 : ((curr - prev) / prev) * 100;

    const aggregateByPlant = (recs: typeof jmrRecords) => {
      const map = new Map<string, { grossGeneration: number; energyExportKWh: number; revenue: number; count: number }>();
      for (const r of recs) {
        const existing = map.get(r.plant) || { grossGeneration: 0, energyExportKWh: 0, revenue: 0, count: 0 };
        existing.grossGeneration += r.grossGeneration;
        existing.energyExportKWh += r.energyExportKWh;
        existing.revenue += r.revenue;
        existing.count += 1;
        map.set(r.plant, existing);
      }
      return map;
    };

    const currentByPlant = aggregateByPlant(currentRecs);
    const prevByPlant = aggregateByPlant(prevRecs);
    const allPlants = [...new Set([...currentByPlant.keys(), ...prevByPlant.keys()])];

    const chartData = allPlants.map(plant => {
      const cur = currentByPlant.get(plant);
      const prv = prevByPlant.get(plant);
      const shortName = plant.split(" ").slice(0, 2).join(" ");
      return {
        name: shortName,
        fullName: plant,
        current: cur ? Math.round(cur.grossGeneration) : 0,
        previous: prv ? Math.round(prv.grossGeneration) : 0,
        currentExport: cur ? Math.round(cur.energyExportKWh / 1000) : 0,
        previousExport: prv ? Math.round(prv.energyExportKWh / 1000) : 0,
        currentRevenue: cur ? cur.revenue : 0,
        previousRevenue: prv ? prv.revenue : 0,
      };
    });

    return {
      currentRecs,
      prevRecs,
      currentGross,
      prevGross,
      currentExport,
      prevExport,
      currentRevenue,
      prevRevenue,
      deltaGross: delta(currentGross, prevGross),
      deltaExport: delta(currentExport, prevExport),
      deltaRevenue: delta(currentRevenue, prevRevenue),
      deltaPlants: currentRecs.length - prevRecs.length,
      chartData,
    };
  }, [jmrRecords, selectedFY, cmpCurrentMonth, cmpPrevMonth]);

  const [showMissingAlert, setShowMissingAlert] = useState(true);
  const [lastDismissedFY, setLastDismissedFY] = useState<string | null>(null);

  useEffect(() => {
    if (lastDismissedFY !== null && lastDismissedFY !== selectedFY) {
      setShowMissingAlert(true);
      setLastDismissedFY(null);
    }
  }, [selectedFY, lastDismissedFY]);

  const missingJmrAlerts = useMemo(() => {
    const fyRecords = jmrRecords.filter(r => r.fy === selectedFY);
    if (fyRecords.length === 0) return [];

    const validMonthIdxs = fyRecords.map(r => months.indexOf(r.month)).filter(idx => idx >= 0);
    if (validMonthIdxs.length === 0) return [];

    const latestMonthIdx = Math.max(...validMonthIdxs);
    const plantMap = new Map<string, number[]>();

    for (const r of fyRecords) {
      const idx = months.indexOf(r.month);
      if (idx < 0) continue;
      const existing = plantMap.get(r.plant) || [];
      existing.push(idx);
      plantMap.set(r.plant, existing);
    }

    const alerts: { plant: string; lastMonth: string; gapMonths: number; missingMonths: string[] }[] = [];

    for (const [plant, idxs] of plantMap.entries()) {
      const latestPlantMonth = Math.max(...idxs);
      const gap = latestMonthIdx - latestPlantMonth;

      if (gap > 1) {
        const missing: string[] = [];
        for (let i = latestPlantMonth + 1; i <= latestMonthIdx; i++) {
          missing.push(months[i]);
        }
        alerts.push({
          plant,
          lastMonth: months[latestPlantMonth],
          gapMonths: gap,
          missingMonths: missing,
        });
      }
    }

    return alerts.sort((a, b) => b.gapMonths - a.gapMonths);
  }, [jmrRecords, selectedFY]);

  const updateRepositoryFromForm = (status: "approved" | "locked") => {
    const capacityKWp = (parseFloat(plantMetadata.capacity) || 0) * 1000;
    const grossGen = parseFloat(operationalData.grossGeneration) || 0;
    const netExportKWh = parseFloat(operationalData.netExportEnergy) || 0;
    const importKWh = parseFloat(operationalData.importUnits) || 0;
    const rev = parseFloat(commercialData.revenueRealized) || 0;
    const downtime = parseFloat(operationalData.solarDowntimeHours) || 0;
    const dtHrs = Math.floor(downtime);
    const dtMin = Math.round((downtime - dtHrs) * 60);
    const outageStr = `${String(dtHrs).padStart(2, "0")}:${String(dtMin).padStart(2, "0")}`;
    const today = new Date().toISOString().split("T")[0];

    const matchIdx = jmrRecords.findIndex(
      r => r.plant === plantMetadata.plantName && r.fy === selectedFY
    );

    const updatedRecord = {
      id: matchIdx >= 0 ? jmrRecords[matchIdx].id : `JMR-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-NEW`,
      fy: selectedFY,
      month: selectedMonth === "All Months" ? new Date().toLocaleString("en-US", { month: "long" }) : selectedMonth,
      plant: plantMetadata.plantName,
      district: plantMetadata.district,
      vendor: plantMetadata.vendor,
      capacityKWp,
      grossGeneration: grossGen,
      energyExportKWh: netExportKWh,
      energyImportKWh: importKWh,
      outage: outageStr,
      revenue: rev,
      approvalStatus: status === "locked" ? "approved" as const : "approved" as const,
      lockStatus: status === "locked",
      version: matchIdx >= 0 ? jmrRecords[matchIdx].version + 1 : 1,
      pdfUploaded: matchIdx >= 0 ? jmrRecords[matchIdx].pdfUploaded : false,
      submittedBy: "Current User",
      approvedBy: "Rahul Sharma",
      submittedDate: workflowTimestamps.submitted ? today : today,
      approvedDate: today,
    };

    setJmrRecords(prev => {
      if (matchIdx >= 0) {
        const updated = [...prev];
        updated[matchIdx] = updatedRecord;
        return updated;
      }
      return [updatedRecord, ...prev];
    });
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-slate-50 flex flex-col">
      {/* GLOBAL HEADER */}
      <div className="bg-white border-b-2 border-slate-200 shadow-sm shrink-0 sticky top-0 z-30">
        <div className="px-6 py-2">
          {/* Row 1: Title & Actions */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-gradient-to-br from-[#2955A0] to-[#2955A0]/80 rounded-xl shadow-md">
                <Database className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900 leading-none">
                  JMR Data Management
                </h1>
                <p className="text-xs text-slate-600 mt-0.5">
                  Monthly Joint Meter Reading · Certified Data Governance
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-slate-700">System Active</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-xs text-slate-600">Last sync: 2 min ago</span>
              </div>

              <PageExportMenu
                pageTitle="JMR Data Management"
                contentRef={pageRef}
                label="Export"
              />
            </div>
          </div>

          {/* Row 2: Filters & Status Summary */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-lg border border-slate-200">
                <Calendar className="w-3 h-3 text-slate-500" />
                <Select value={selectedFY} onValueChange={setSelectedFY}>
                  <SelectTrigger className="border-0 bg-transparent h-auto p-0 font-semibold text-xs w-24">
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
                <Separator orientation="vertical" className="h-3.5" />
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="border-0 bg-transparent h-auto p-0 font-semibold text-xs w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Months">All Months</SelectItem>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select value={selectedPlant} onValueChange={setSelectedPlant}>
                <SelectTrigger className="w-40 h-7 text-xs">
                  <SelectValue placeholder="Plant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Plants">All Plants</SelectItem>
                  {plants.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                <SelectTrigger className="w-32 h-7 text-xs">
                  <SelectValue placeholder="Vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Vendors">All Vendors</SelectItem>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor} value={vendor}>{vendor}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32 h-7 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {APPROVAL_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {isFiltered && (
                <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-rose-600 hover:bg-rose-50" onClick={resetAllFilters}>
                  <RotateCcw className="w-3 h-3" /> Reset
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded border border-emerald-200">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700">{statusCounts.approved} Approved</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded border border-amber-200">
                <Clock className="w-3 h-3 text-amber-600" />
                <span className="text-xs font-medium text-amber-700">{statusCounts.pending} Pending</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-slate-50 rounded border border-slate-200">
                <FileText className="w-3 h-3 text-slate-500" />
                <span className="text-xs font-medium text-slate-600">{statusCounts.draft} Draft</span>
              </div>
              {statusCounts.rejected > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-rose-50 rounded border border-rose-200">
                  <XCircle className="w-3 h-3 text-rose-600" />
                  <span className="text-xs font-medium text-rose-700">{statusCounts.rejected} Rejected</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isFiltered && (
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-1.5 flex items-center gap-2 shrink-0">
          <Filter className="w-3 h-3 text-blue-600 shrink-0" />
          <span className="text-xs text-blue-800 font-medium">Active Filters:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {selectedFY !== "FY 2025-26" && <Badge variant="outline" className="text-[10px] h-5 bg-blue-100 text-blue-700 border-blue-300">{selectedFY}</Badge>}
            {selectedMonth !== "All Months" && <Badge variant="outline" className="text-[10px] h-5 bg-blue-100 text-blue-700 border-blue-300">{selectedMonth}</Badge>}
            {selectedPlant !== "All Plants" && <Badge variant="outline" className="text-[10px] h-5 bg-blue-100 text-blue-700 border-blue-300">{selectedPlant}</Badge>}
            {selectedVendor !== "All Vendors" && <Badge variant="outline" className="text-[10px] h-5 bg-blue-100 text-blue-700 border-blue-300">{selectedVendor}</Badge>}
            {selectedStatus !== "all" && <Badge variant="outline" className="text-[10px] h-5 bg-blue-100 text-blue-700 border-blue-300">{APPROVAL_OPTIONS.find(o => o.value === selectedStatus)?.label}</Badge>}
          </div>
          <span className="text-xs text-blue-600 ml-1">({filteredJMRRecords.length} records)</span>
          <Button variant="ghost" size="sm" className="h-5 text-[10px] text-blue-600 hover:bg-blue-100 ml-auto px-2" onClick={resetAllFilters}>
            Clear All
          </Button>
        </div>
      )}

      {/* Missing JMR Alert Banner */}
      {showMissingAlert && missingJmrAlerts.length > 0 && (() => {
        const criticalCount = missingJmrAlerts.filter(a => a.gapMonths >= 3).length;
        const warningCount = missingJmrAlerts.filter(a => a.gapMonths === 2).length;
        const totalMissing = missingJmrAlerts.reduce((sum, a) => sum + a.gapMonths, 0);
        return (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="shrink-0 overflow-hidden"
          >
            <div className="bg-gradient-to-b from-rose-50 via-white to-slate-50 px-6 py-4 border-b-2 border-rose-200/60">
              {/* Top Row: Header + Stats + Dismiss */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-300/40">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center shadow-md shadow-rose-300/50 ring-2 ring-white animate-pulse">
                      <span className="text-[9px] font-bold text-white">{missingJmrAlerts.length}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">Missing JMR Submissions Detected</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {missingJmrAlerts.length} plant{missingJmrAlerts.length > 1 ? "s" : ""} require immediate attention · {totalMissing} total month-records overdue
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2">
                    {criticalCount > 0 && (
                      <div className="flex items-center gap-1.5 bg-rose-100 border border-rose-200 rounded-lg px-2.5 py-1 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">{criticalCount} Critical</span>
                      </div>
                    )}
                    {warningCount > 0 && (
                      <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">{warningCount} Warning</span>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                    onClick={() => { setShowMissingAlert(false); setLastDismissedFY(selectedFY); }}
                  >
                    <XIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Plant Alert Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {missingJmrAlerts.map((alert) => {
                  const isCritical = alert.gapMonths >= 3;
                  const severityLabel = isCritical ? "CRITICAL" : "WARNING";
                  return (
                    <div
                      key={alert.plant}
                      className={`group relative bg-white border-2 rounded-xl p-3.5 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
                        isCritical
                          ? "border-rose-200 hover:border-rose-300 shadow-sm shadow-rose-100 hover:shadow-rose-200/50"
                          : "border-amber-200 hover:border-amber-300 shadow-sm shadow-amber-100 hover:shadow-amber-200/50"
                      }`}
                    >
                      {/* Severity indicator line */}
                      <div className={`absolute top-0 left-4 right-4 h-[3px] rounded-b-full ${
                        isCritical ? "bg-gradient-to-r from-transparent via-rose-500 to-transparent" : "bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                      }`} />

                      {/* Row 1: Plant Name + Severity */}
                      <div className="flex items-start justify-between gap-2 mb-2.5 mt-0.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isCritical ? "bg-rose-100" : "bg-amber-100"
                          }`}>
                            <Building2 className={`w-3.5 h-3.5 ${isCritical ? "text-rose-600" : "text-amber-600"}`} />
                          </div>
                          <span className="text-xs font-bold text-slate-800 truncate">{alert.plant}</span>
                        </div>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-md tracking-widest shrink-0 ${
                          isCritical ? "bg-rose-100 text-rose-600 ring-1 ring-rose-200" : "bg-amber-100 text-amber-600 ring-1 ring-amber-200"
                        }`}>
                          {severityLabel}
                        </span>
                      </div>

                      {/* Row 2: Overdue count */}
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className={`text-2xl font-black leading-none ${isCritical ? "text-rose-500" : "text-amber-500"}`}>
                          {alert.gapMonths}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-semibold text-slate-700 leading-tight">months</span>
                          <span className="text-[10px] text-slate-400 leading-tight">overdue</span>
                        </div>
                      </div>

                      {/* Row 3: Month timeline */}
                      <div className="flex items-center gap-[3px] mb-2">
                        {months.map((m, i) => {
                          const monthIdx = months.indexOf(alert.lastMonth);
                          const fyRecordsMonths = jmrRecords.filter(r => r.fy === selectedFY).map(r => months.indexOf(r.month));
                          const latestFYMonth = Math.max(...fyRecordsMonths.filter(idx => idx >= 0));
                          const isLast = i === monthIdx;
                          const isMissing = alert.missingMonths.includes(m);
                          const isBeforeOrAtLast = i <= monthIdx;
                          const isFuture = i > latestFYMonth;
                          return (
                            <TooltipProvider key={m}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className={`w-full h-2 rounded-full transition-all ${
                                    isLast
                                      ? "bg-emerald-500 shadow-sm shadow-emerald-200"
                                      : isMissing
                                      ? isCritical ? "bg-rose-400 animate-pulse shadow-sm shadow-rose-200" : "bg-amber-400 shadow-sm shadow-amber-200"
                                      : isBeforeOrAtLast
                                      ? "bg-slate-200"
                                      : isFuture
                                      ? "bg-slate-100"
                                      : "bg-slate-200"
                                  }`} />
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="text-[10px] py-1 px-2">
                                  {m}{isLast ? " (last submitted)" : isMissing ? " (missing)" : ""}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          );
                        })}
                      </div>

                      {/* Row 4: Meta info */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                        <span className="text-[10px] text-slate-400">
                          Last: <span className="text-slate-600 font-semibold">{alert.lastMonth}</span>
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Missing: <span className={`font-semibold ${isCritical ? "text-rose-600" : "text-amber-600"}`}>{alert.missingMonths.join(", ")}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );
      })()}

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
                  className="gap-2 data-[state=active]:bg-[#2955A0] data-[state=active]:text-white data-[state=active]:shadow-sm px-4 rounded-lg"
                >
                  <Edit3 className="w-4 h-4" />
                  Manual Entry
                </TabsTrigger>
                <TabsTrigger
                  value="bulk-upload"
                  className="gap-2 data-[state=active]:bg-[#2955A0] data-[state=active]:text-white data-[state=active]:shadow-sm px-4 rounded-lg"
                >
                  <FileUp className="w-4 h-4" />
                  Excel Bulk Upload
                </TabsTrigger>
                <TabsTrigger
                  value="repository"
                  className="gap-2 data-[state=active]:bg-[#2955A0] data-[state=active]:text-white data-[state=active]:shadow-sm px-4 rounded-lg"
                >
                  <Database className="w-4 h-4" />
                  JMR Repository
                </TabsTrigger>
                <TabsTrigger
                  value="audit"
                  className="gap-2 data-[state=active]:bg-[#2955A0] data-[state=active]:text-white data-[state=active]:shadow-sm px-4 rounded-lg"
                >
                  <History className="w-4 h-4" />
                  Audit & Version History
                </TabsTrigger>
                <TabsTrigger
                  value="generation-comparison"
                  className="gap-2 data-[state=active]:bg-[#2955A0] data-[state=active]:text-white data-[state=active]:shadow-sm px-4 rounded-lg"
                >
                  <BarChart2 className="w-4 h-4" />
                  Generation Comparison
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
                                          ? "bg-[#2955A0] text-white"
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
                                        isActive ? "text-[#2955A0]" : "text-slate-600"
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

                      {/* T002: Locked banner — shown on ALL steps */}
                      {workflowStage === "locked" && entryStep !== 4 && (
                        <div className="flex items-center justify-between px-4 py-3 bg-amber-50 border-2 border-amber-400 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Lock className="w-5 h-5 text-amber-700 shrink-0" />
                            <div>
                              <p className="text-sm font-bold text-amber-900">This JMR is approved and locked.</p>
                              <p className="text-xs text-amber-700">Contact your administrator to request an amendment.</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="gap-1.5 border-amber-400 text-amber-700 hover:bg-amber-100 text-xs shrink-0" onClick={() => toast.info("Unlock request sent to Approver")}>
                            <Unlock className="w-3 h-3" /> Request Unlock
                          </Button>
                        </div>
                      )}

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
                                <Building2 className="w-5 h-5 text-[#2955A0]" />
                                Plant Metadata
                              </CardTitle>
                              <CardDescription>
                                Basic plant identification and configuration details
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                              <div className={`grid grid-cols-2 gap-6 ${isLocked ? "opacity-60 pointer-events-none" : ""}`}>
                                <div className="space-y-2">
                                  <Label htmlFor="state" className="text-xs font-bold uppercase text-slate-700">
                                    State <span className="text-rose-600">*</span>
                                  </Label>
                                  <Select
                                    value={plantMetadata.state}
                                    onValueChange={(val) =>
                                      setPlantMetadata({ ...plantMetadata, state: val })
                                    }
                                    disabled={isLocked}
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
                                    disabled={isLocked}
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
                                    disabled={isLocked}
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
                                    disabled={isLocked}
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
                                    disabled={isLocked}
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
                                    disabled={isLocked}
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
                                    disabled={isLocked}
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
                                    disabled={isLocked}
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
                                    disabled={isLocked}
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
                            {!isLocked && (
                              <Button variant="outline" onClick={handleReset}>
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Reset
                              </Button>
                            )}
                            <Button onClick={() => setEntryStep(2)} className="bg-[#2955A0]">
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
                                <Zap className="w-5 h-5 text-[#2955A0]" />
                                Operational Parameters
                              </CardTitle>
                              <CardDescription>Monthly generation and operational metrics</CardDescription>
                            </CardHeader>
                            <CardContent className={`p-6 space-y-6 ${isLocked ? "opacity-60 pointer-events-none" : ""}`}>
                              {/* Generation Metrics */}
                              <div>
                                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                                  <div className="w-1 h-4 bg-[#2955A0] rounded"></div>
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
                                      disabled={isLocked}
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
                                  <div className="w-1 h-4 bg-[#2955A0] rounded"></div>
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
                                  <div className="w-1 h-4 bg-[#2955A0] rounded"></div>
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
                                  <div className="w-1 h-4 bg-[#2955A0] rounded"></div>
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

                              {/* T007: Additional Custom Parameters */}
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-purple-600 rounded"></div>
                                    Additional Parameters (EESL Defined)
                                  </h3>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="gap-1.5 text-xs border-purple-300 text-purple-700 hover:bg-purple-50"
                                    onClick={() => setCustomParams(prev => [...prev, { id: Date.now(), label: "", value: "", unit: "—" }])}
                                  >
                                    <Plus className="w-3 h-3" /> Add Parameter
                                  </Button>
                                </div>
                                <div className="space-y-2">
                                  {customParams.map((param) => (
                                    <div key={param.id} className="flex items-center gap-2 p-2 bg-purple-50 border border-purple-200 rounded-lg">
                                      <Input
                                        className="flex-1 h-7 text-xs"
                                        placeholder="Parameter name..."
                                        value={param.label}
                                        onChange={e => setCustomParams(prev => prev.map(p => p.id === param.id ? { ...p, label: e.target.value } : p))}
                                      />
                                      <Input
                                        className="w-24 h-7 text-xs"
                                        placeholder="Value"
                                        value={param.value}
                                        onChange={e => setCustomParams(prev => prev.map(p => p.id === param.id ? { ...p, value: e.target.value } : p))}
                                      />
                                      <Select value={param.unit} onValueChange={val => setCustomParams(prev => prev.map(p => p.id === param.id ? { ...p, unit: val } : p))}>
                                        <SelectTrigger className="w-20 h-7 text-xs">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {["kVAR", "kWh", "MWh", "MW", "%", "hrs", "Units", "—"].map(u => (
                                            <SelectItem key={u} value={u}>{u}</SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-7 w-7 text-rose-500 hover:bg-rose-50 shrink-0"
                                        onClick={() => setCustomParams(prev => prev.filter(p => p.id !== param.id))}
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  ))}
                                  {customParams.length === 0 && (
                                    <p className="text-xs text-slate-400 italic text-center py-3">No custom parameters. Click "+ Add Parameter" to add one.</p>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <div className="flex justify-between gap-3">
                            <Button variant="outline" onClick={() => setEntryStep(1)}>
                              Previous
                            </Button>
                            <div className="flex gap-3">
                              {!isLocked && (
                                <Button variant="outline" onClick={handleReset}>
                                  <RotateCcw className="w-4 h-4 mr-2" />
                                  Reset
                                </Button>
                              )}
                              <Button onClick={() => setEntryStep(3)} className="bg-[#2955A0]">
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
                                <TrendingUp className="w-5 h-5 text-[#2955A0]" />
                                Commercial Parameters
                              </CardTitle>
                              <CardDescription>Revenue and contractual compliance data</CardDescription>
                            </CardHeader>
                            <CardContent className={`p-6 space-y-6 ${isLocked ? "opacity-60 pointer-events-none" : ""}`}>
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
                                Live calculated KPIs based on entered data — formulas shown below each value
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                              <div className="grid grid-cols-5 gap-4">
                                <div className="bg-white p-4 rounded-lg border border-blue-200">
                                  <div className="text-xs font-bold text-slate-600 uppercase mb-1">CUF</div>
                                  <div className="text-2xl font-bold text-slate-900">{cuf}%</div>
                                  <div className="mt-2 pt-2 border-t border-blue-100">
                                    <div className="text-[9px] font-semibold text-blue-700 uppercase tracking-wide mb-1">Formula</div>
                                    <div className="text-[10px] text-slate-600 leading-relaxed font-mono bg-slate-50 rounded px-2 py-1.5">
                                      (Net Export ÷ (Capacity × Hours)) × 100
                                    </div>
                                    <div className="text-[9px] text-slate-500 mt-1.5 leading-relaxed">
                                      = ({netExport} ÷ ({capacityMW} MW × {hoursInMonth} hrs)) × 100
                                    </div>
                                    <div className="text-[9px] font-semibold text-blue-800 mt-0.5">
                                      = {cuf}%
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-blue-200">
                                  <div className="text-xs font-bold text-slate-600 uppercase mb-1">PAF</div>
                                  <div className="text-2xl font-bold text-slate-900">{paf}%</div>
                                  <div className="mt-2 pt-2 border-t border-blue-100">
                                    <div className="text-[9px] font-semibold text-blue-700 uppercase tracking-wide mb-1">Formula</div>
                                    <div className="text-[10px] text-slate-600 leading-relaxed font-mono bg-slate-50 rounded px-2 py-1.5">
                                      Plant Availability Factor
                                    </div>
                                    <div className="text-[9px] text-slate-500 mt-1.5 leading-relaxed">
                                      = Plant Availability entered
                                    </div>
                                    <div className="text-[9px] font-semibold text-blue-800 mt-0.5">
                                      = {paf}%
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-blue-200">
                                  <div className="text-xs font-bold text-slate-600 uppercase mb-1">
                                    Expected Gen
                                  </div>
                                  <div className="text-2xl font-bold text-slate-900">{expectedGeneration}</div>
                                  <div className="text-xs text-slate-600">MWh</div>
                                  <div className="mt-2 pt-2 border-t border-blue-100">
                                    <div className="text-[9px] font-semibold text-blue-700 uppercase tracking-wide mb-1">Formula</div>
                                    <div className="text-[10px] text-slate-600 leading-relaxed font-mono bg-slate-50 rounded px-2 py-1.5">
                                      Contractual Target Generation
                                    </div>
                                    <div className="text-[9px] text-slate-500 mt-1.5 leading-relaxed">
                                      = Target from contract
                                    </div>
                                    <div className="text-[9px] font-semibold text-blue-800 mt-0.5">
                                      = {expectedGeneration} MWh
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-blue-200">
                                  <div className="text-xs font-bold text-slate-600 uppercase mb-1">
                                    Revenue Shortfall
                                  </div>
                                  <div className="text-2xl font-bold text-rose-600">₹{revenueShortfall}</div>
                                  <div className="text-xs text-slate-600">Lakhs</div>
                                  <div className="mt-2 pt-2 border-t border-blue-100">
                                    <div className="text-[9px] font-semibold text-blue-700 uppercase tracking-wide mb-1">Formula</div>
                                    <div className="text-[10px] text-slate-600 leading-relaxed font-mono bg-slate-50 rounded px-2 py-1.5">
                                      (Target × Tariff) − Revenue + O&M Dev
                                    </div>
                                    <div className="text-[9px] text-slate-500 mt-1.5 leading-relaxed">
                                      = ({contractTarget} × ₹{tariffRate}/100) − ₹{revRealized} + ₹{omDeviation}
                                    </div>
                                    <div className="text-[9px] text-slate-500">
                                      = ₹{expectedRevenue.toFixed(2)} − ₹{revRealized} + ₹{omDeviation}
                                    </div>
                                    <div className="text-[9px] font-semibold text-blue-800 mt-0.5">
                                      = ₹{revenueShortfall} Lakhs
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-blue-200">
                                  <div className="text-xs font-bold text-slate-600 uppercase mb-1">LD Risk</div>
                                  <Badge
                                    variant="outline"
                                    className={`${ldRiskColor} mt-1`}
                                  >
                                    {ldRisk}
                                  </Badge>
                                  <div className="mt-2 pt-2 border-t border-blue-100">
                                    <div className="text-[9px] font-semibold text-blue-700 uppercase tracking-wide mb-1">Formula</div>
                                    <div className="text-[10px] text-slate-600 leading-relaxed font-mono bg-slate-50 rounded px-2 py-1.5">
                                      Based on Target Achievement %
                                    </div>
                                    <div className="text-[9px] text-slate-500 mt-1.5 leading-relaxed">
                                      = ({netExport} ÷ {contractTarget}) × 100
                                    </div>
                                    <div className="text-[9px] font-semibold text-blue-800 mt-0.5">
                                      = {targetAchPct.toFixed(1)}%
                                    </div>
                                    <div className="text-[8px] text-slate-400 mt-1 space-y-0.5">
                                      <div>≥100% → None</div>
                                      <div>95–99% → Low</div>
                                      <div>90–94% → Medium</div>
                                      <div>&lt;90% → High</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <div className="flex justify-between gap-3">
                            <Button variant="outline" onClick={() => setEntryStep(2)}>
                              Previous
                            </Button>
                            <div className="flex gap-3">
                              {!isLocked && (
                                <Button variant="outline" onClick={handleReset}>
                                  <RotateCcw className="w-4 h-4 mr-2" />
                                  Reset
                                </Button>
                              )}
                              <Button onClick={() => { validateForm(); setEntryStep(4); }} className="bg-[#2955A0]">
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
                          {/* T002: Locked banner */}
                          {workflowStage === "locked" && (
                            <div className="flex items-center justify-between px-4 py-3 bg-amber-50 border-2 border-amber-400 rounded-xl">
                              <div className="flex items-center gap-3">
                                <Lock className="w-5 h-5 text-amber-700 shrink-0" />
                                <div>
                                  <p className="text-sm font-bold text-amber-900">This JMR is approved and locked.</p>
                                  <p className="text-xs text-amber-700">Contact your administrator to request an amendment.</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline" className="gap-1.5 border-amber-400 text-amber-700 hover:bg-amber-100 text-xs shrink-0" onClick={() => toast.info("Unlock request sent to Approver")}>
                                <Unlock className="w-3 h-3" /> Request Unlock
                              </Button>
                            </div>
                          )}
                          {/* Validation Panel */}
                          <Card className="border-2 border-slate-200">
                            <CardHeader className="border-b border-slate-100">
                              <CardTitle className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-[#2955A0]" />
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
                            <Button variant="outline" onClick={() => setEntryStep(3)} disabled={workflowStage === "locked"}>
                              Previous
                            </Button>
                            {workflowStage === "locked" ? (
                              <Button variant="outline" className="gap-2 border-amber-400 text-amber-700 hover:bg-amber-50" onClick={() => toast.info("Unlock request sent to Approver")}>
                                <Unlock className="w-4 h-4" />
                                Request Unlock
                              </Button>
                            ) : (
                              <div className="flex gap-3">
                                <Button variant="outline" onClick={handleReset} className="gap-2">
                                  <RotateCcw className="w-4 h-4" />
                                  Reset All
                                </Button>
                                <Button variant="outline" onClick={handleSaveDraft} className="gap-2" disabled={workflowStage !== "draft"}>
                                  <Save className="w-4 h-4" />
                                  Save Draft
                                </Button>
                                <Button
                                  onClick={handleSubmitForReview}
                                  className="bg-emerald-600 hover:bg-emerald-700 gap-2"
                                  disabled={workflowStage !== "draft"}
                                >
                                  <Send className="w-4 h-4" />
                                  Submit for Review
                                </Button>
                              </div>
                            )}
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
                        <div className="p-4 space-y-4">
                          {/* LOCKED badge */}
                          {workflowStage === "locked" && (
                            <div className="flex items-center justify-center gap-2 py-2 px-4 bg-yellow-400 rounded-lg border-2 border-yellow-500">
                              <Lock className="w-4 h-4 text-yellow-900" />
                              <span className="text-sm font-black text-yellow-900 tracking-widest uppercase">Locked</span>
                            </div>
                          )}
                          {workflowStage === "rejected" && (
                            <div className="flex items-center gap-2 py-2 px-3 bg-rose-100 rounded-lg border border-rose-300">
                              <Ban className="w-4 h-4 text-rose-700" />
                              <span className="text-xs font-bold text-rose-700">JMR Rejected</span>
                            </div>
                          )}

                          {/* ── MAKER STAGE ── */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${workflowStage === "draft" ? "bg-blue-100" : "bg-emerald-100"}`}>
                                {workflowStage === "draft" ? (
                                  <User className="w-4 h-4 text-blue-600" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                                )}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-600 uppercase">Maker</h4>
                                <p className="text-sm font-semibold text-slate-900">Data Entry</p>
                              </div>
                              {workflowStage !== "draft" && (
                                <Badge className="ml-auto bg-emerald-100 text-emerald-700 border-emerald-300 text-[10px]">Submitted ✓</Badge>
                              )}
                            </div>
                            <div className={`ml-4 pl-4 border-l-2 space-y-2 ${workflowStage === "draft" ? "border-blue-200" : "border-emerald-200"}`}>
                              <div className="text-sm"><span className="text-slate-600">Entered by:</span> <span className="font-semibold">Current User</span></div>
                              <div className="text-sm"><span className="text-slate-600">Date:</span> <span className="font-semibold">{workflowTimestamps.submitted || formatTimestamp(new Date())}</span></div>
                              {workflowStage === "draft" && (
                                <>
                                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">In Progress</Badge>
                                  <div className="flex flex-col gap-2 pt-1">
                                    <Button size="sm" variant="outline" className="gap-1 text-xs" onClick={handleSaveDraft}>
                                      <Save className="w-3 h-3" /> Save Draft
                                    </Button>
                                    <Button size="sm" className="gap-1 text-xs bg-[#2955A0] hover:bg-[#1E4888]" onClick={handleSubmitForReview}>
                                      <Send className="w-3 h-3" /> Submit for Review
                                    </Button>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          <Separator />

                          {/* ── CHECKER STAGE ── */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                workflowStage === "draft" ? "bg-slate-100" :
                                workflowStage === "submitted" || workflowStage === "under_review" ? "bg-amber-100" :
                                workflowStage === "rejected" ? "bg-rose-100" : "bg-emerald-100"
                              }`}>
                                {workflowStage === "draft" ? (
                                  <UserCheck className="w-4 h-4 text-slate-400" />
                                ) : workflowStage === "submitted" || workflowStage === "under_review" ? (
                                  <UserCheck className="w-4 h-4 text-amber-600" />
                                ) : workflowStage === "rejected" ? (
                                  <Ban className="w-4 h-4 text-rose-600" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                                )}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-600 uppercase">Checker</h4>
                                <p className="text-sm font-semibold text-slate-900">Technical Review</p>
                              </div>
                              {(workflowStage === "approved" || workflowStage === "locked") && (
                                <Badge className="ml-auto bg-emerald-100 text-emerald-700 border-emerald-300 text-[10px]">Approved ✓</Badge>
                              )}
                            </div>
                            <div className={`ml-4 pl-4 border-l-2 space-y-2 ${
                              workflowStage === "draft" ? "border-slate-200 opacity-50" :
                              workflowStage === "rejected" ? "border-rose-200" :
                              (workflowStage === "approved" || workflowStage === "locked") ? "border-emerald-200" : "border-amber-200"
                            }`}>
                              {workflowStage === "draft" ? (
                                <div className="text-xs text-slate-400 italic">Awaiting submission</div>
                              ) : workflowStage === "submitted" ? (
                                <>
                                  <div className="text-sm"><span className="text-slate-600">Reviewer:</span> <span className="font-semibold">Priya Mehta</span></div>
                                  <div className="text-sm"><span className="text-slate-600">Assigned:</span> <span className="font-semibold">{workflowTimestamps.checkerAssigned || "—"}</span></div>
                                  <Textarea
                                    value={checkerComment}
                                    onChange={e => setCheckerComment(e.target.value)}
                                    placeholder="Add checker comment..."
                                    className="min-h-16 text-xs"
                                  />
                                  <div className="flex flex-col gap-2 pt-1">
                                    <Button size="sm" className="gap-1 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={() => { setWorkflowStage("under_review"); recordTimestamp("checkerApproved"); recordTimestamp("escalated"); toast.success("Checker approved — sent to Approver"); }}>
                                      <CheckCircle className="w-3 h-3" /> Approve →
                                    </Button>
                                    <Button size="sm" variant="outline" className="gap-1 text-xs" onClick={() => { setWorkflowStage("draft"); toast.info("Sent back to Maker for revision"); }}>
                                      <RotateCcw className="w-3 h-3" /> Send Back
                                    </Button>
                                    <Button size="sm" variant="outline" className="gap-1 text-xs border-rose-300 text-rose-600 hover:bg-rose-50" onClick={() => { setWorkflowStage("rejected"); setRejectionReason(checkerComment || "Rejected by Checker"); toast.error("JMR rejected by Checker"); }}>
                                      <Ban className="w-3 h-3" /> Reject
                                    </Button>
                                  </div>
                                </>
                              ) : workflowStage === "rejected" ? (
                                <>
                                  <Badge className="bg-rose-100 text-rose-700 border-rose-200 text-xs">Rejected</Badge>
                                  {rejectionReason && <div className="text-xs text-rose-700 mt-1">Reason: {rejectionReason}</div>}
                                  <Button size="sm" variant="outline" className="gap-1 text-xs mt-2 w-full" onClick={() => { setWorkflowStage("draft"); setRejectionReason(""); toast.info("JMR reset to draft"); }}>
                                    <RotateCcw className="w-3 h-3" /> Reset to Draft
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <div className="text-sm"><span className="text-slate-600">Reviewer:</span> <span className="font-semibold">Priya Mehta</span></div>
                                  {checkerComment && <div className="text-xs text-slate-600 italic">"{checkerComment}"</div>}
                                </>
                              )}
                            </div>
                          </div>

                          <Separator />

                          {/* ── APPROVER STAGE ── */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                workflowStage === "under_review" ? "bg-purple-100" :
                                (workflowStage === "approved" || workflowStage === "locked") ? "bg-emerald-100" : "bg-slate-100"
                              }`}>
                                {workflowStage === "under_review" ? (
                                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                                ) : (workflowStage === "approved" || workflowStage === "locked") ? (
                                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                                ) : (
                                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                                )}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-600 uppercase">Approver</h4>
                                <p className="text-sm font-semibold text-slate-900">Final Approval</p>
                              </div>
                              {workflowStage === "approved" && (
                                <Badge className="ml-auto bg-emerald-100 text-emerald-700 border-emerald-300 text-[10px]">Approved ✓</Badge>
                              )}
                              {workflowStage === "locked" && (
                                <Badge className="ml-auto bg-emerald-100 text-emerald-700 border-emerald-300 text-[10px]">Locked ✓</Badge>
                              )}
                            </div>
                            <div className={`ml-4 pl-4 border-l-2 space-y-2 ${
                              workflowStage === "under_review" ? "border-purple-200" :
                              (workflowStage === "approved" || workflowStage === "locked") ? "border-emerald-200" : "border-slate-200 opacity-50"
                            }`}>
                              {workflowStage !== "under_review" && workflowStage !== "approved" && workflowStage !== "locked" ? (
                                <div className="text-xs text-slate-400 italic">{workflowStage === "submitted" ? "Awaiting checker approval" : "Awaiting submission"}</div>
                              ) : workflowStage === "under_review" ? (
                                <>
                                  <div className="text-sm"><span className="text-slate-600">Approver:</span> <span className="font-semibold">Rahul Sharma</span></div>
                                  <div className="text-sm"><span className="text-slate-600">Escalated:</span> <span className="font-semibold">{workflowTimestamps.escalated || "—"}</span></div>
                                  <div className="flex flex-col gap-2 pt-1">
                                    <Button size="sm" className="gap-1 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={() => { setWorkflowStage("approved"); recordTimestamp("approved"); updateRepositoryFromForm("approved"); toast.success("JMR approved by Approver"); }}>
                                      <CheckCircle className="w-3 h-3" /> Approve
                                    </Button>
                                    <Button size="sm" className="gap-1 text-xs bg-[#2955A0] hover:bg-[#1E4888]" onClick={() => { setWorkflowStage("locked"); recordTimestamp("approved"); recordTimestamp("locked"); updateRepositoryFromForm("locked"); toast.success("JMR approved and locked"); }}>
                                      <Lock className="w-3 h-3" /> Approve & Lock
                                    </Button>
                                    <Button size="sm" variant="outline" className="gap-1 text-xs border-rose-300 text-rose-600 hover:bg-rose-50" onClick={() => { setWorkflowStage("rejected"); setRejectionReason("Rejected by Approver"); toast.error("JMR rejected by Approver"); }}>
                                      <Ban className="w-3 h-3" /> Reject
                                    </Button>
                                  </div>
                                </>
                              ) : workflowStage === "approved" ? (
                                <>
                                  <div className="text-sm"><span className="text-slate-600">Approver:</span> <span className="font-semibold">Rahul Sharma</span></div>
                                  <div className="text-sm"><span className="text-slate-600">Approved:</span> <span className="font-semibold">{workflowTimestamps.approved || "—"}</span></div>
                                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">Approved</Badge>
                                  <Button size="sm" className="gap-1 text-xs bg-[#2955A0] hover:bg-[#1E4888] mt-1" onClick={() => { setWorkflowStage("locked"); recordTimestamp("locked"); updateRepositoryFromForm("locked"); toast.success("JMR record locked"); }}>
                                    <Lock className="w-3 h-3" /> Lock Record
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <div className="text-sm"><span className="text-slate-600">Approver:</span> <span className="font-semibold">Rahul Sharma</span></div>
                                  <div className="text-sm"><span className="text-slate-600">Approved:</span> <span className="font-semibold">{workflowTimestamps.approved || "—"}</span></div>
                                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">Finalised & Locked</Badge>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Escalation Alert */}
                          {(workflowStage === "submitted" || workflowStage === "under_review") && (
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                              <div className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                <div className="text-xs text-amber-700">
                                  <p className="font-semibold mb-1">Escalation Note</p>
                                  <p>Records pending review for &gt;5 days will be auto-escalated</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </motion.div>
                  )}

                  {!showWorkflowPanel && (
                    <Button
                      onClick={() => setShowWorkflowPanel(true)}
                      className="fixed right-0 top-1/2 -translate-y-1/2 rounded-l-lg rounded-r-none h-32 w-10 bg-[#2955A0] hover:bg-[#1E4888] shadow-lg z-20"
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
                  {/* Search Bar */}
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
                        <Badge variant="outline" className="text-xs px-3 py-1.5 shrink-0">
                          {filteredJMRRecords.length} of {jmrRecords.length} records
                        </Badge>
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
                              <TableHead className="font-bold">District</TableHead>
                              <TableHead className="font-bold">Vendor</TableHead>
                              <TableHead className="font-bold text-right">Capacity (KWp)</TableHead>
                              <TableHead className="font-bold text-right">Generation (MWh)</TableHead>
                              <TableHead className="font-bold text-right">Energy Export (KWh)</TableHead>
                              <TableHead className="font-bold text-right">Energy Import (KWh)</TableHead>
                              <TableHead className="font-bold text-center">Outage (HH:MM)</TableHead>
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
                                  <TableCell className="text-sm">{record.district}</TableCell>
                                  <TableCell className="text-sm">{record.vendor}</TableCell>
                                  <TableCell className="text-right font-semibold text-sm">
                                    {record.capacityKWp.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </TableCell>
                                  <TableCell className="text-right font-semibold">
                                    {record.grossGeneration.toLocaleString()}
                                  </TableCell>
                                  <TableCell className="text-right font-semibold text-sm">
                                    {record.energyExportKWh.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </TableCell>
                                  <TableCell className="text-right font-semibold text-sm">
                                    {record.energyImportKWh.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </TableCell>
                                  <TableCell className="text-center font-mono text-sm">
                                    {record.outage}
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
                                    {pdfUploadedSet.has(record.id) ? (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-1.5 text-xs h-7 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                                        onClick={() => { setPdfDialogRecord(record); setPdfDialogOpen(true); }}
                                      >
                                        <Eye className="w-3 h-3" /> View PDF
                                      </Button>
                                    ) : (
                                      <label className="cursor-pointer">
                                        <input
                                          type="file"
                                          accept=".pdf"
                                          className="hidden"
                                          onChange={() => {
                                            toast.loading("Uploading PDF...", { id: `pdf-${record.id}` });
                                            setTimeout(() => {
                                              setPdfUploadedSet(prev => new Set([...prev, record.id]));
                                              toast.success("PDF uploaded successfully", { id: `pdf-${record.id}` });
                                            }, 1500);
                                          }}
                                        />
                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400 transition-colors font-medium">
                                          <FileUp className="w-3 h-3" /> Upload PDF
                                        </span>
                                      </label>
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
                        <Select value={compareV1} onValueChange={v => { setCompareV1(v); setShowDiff(false); }}>
                          <SelectTrigger className="w-48 bg-white">
                            <SelectValue placeholder="Version 1" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Version 1 — Draft (Mar 1)</SelectItem>
                            <SelectItem value="2">Version 2 — Approved (Mar 5)</SelectItem>
                          </SelectContent>
                        </Select>

                        <span className="text-blue-900 font-semibold">vs</span>

                        <Select value={compareV2} onValueChange={v => { setCompareV2(v); setShowDiff(false); }}>
                          <SelectTrigger className="w-48 bg-white">
                            <SelectValue placeholder="Version 2" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Version 1 — Draft (Mar 1)</SelectItem>
                            <SelectItem value="2">Version 2 — Approved (Mar 5)</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button className="bg-[#2955A0] gap-2" onClick={() => { if (compareV1 !== compareV2) { setShowDiff(true); } else { toast.warning("Please select two different versions"); } }}>
                          <GitCompare className="w-4 h-4" />
                          Compare
                        </Button>
                      </div>

                      {/* T006: Diff Table */}
                      {showDiff && compareV1 !== compareV2 && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2">
                          <div className="bg-white rounded-xl border-2 border-blue-200 overflow-hidden">
                            <div className="grid grid-cols-[1fr_120px_16px_120px] bg-[#2955A0] text-white text-xs font-bold px-4 py-2.5 gap-2">
                              <span>Parameter</span>
                              <span className="text-center">Version {compareV1 < compareV2 ? compareV1 : compareV2}</span>
                              <span></span>
                              <span className="text-center">Version {compareV1 < compareV2 ? compareV2 : compareV1}</span>
                            </div>
                            {[
                              { param: "Gross Generation (MWh)", v1: "4,380", v2: "4,520", changed: true },
                              { param: "Net Export Energy (MWh)", v1: "4,342", v2: "4,478", changed: true },
                              { param: "Grid Availability (%)", v1: "96.5", v2: "96.5", changed: false },
                              { param: "Plant Availability (%)", v1: "95.2", v2: "97.8", changed: true },
                              { param: "Revenue Realized (₹ L)", v1: "41.86", v2: "43.19", changed: true },
                              { param: "Contractual Target (MWh)", v1: "4,600", v2: "4,600", changed: false },
                              { param: "LD Risk", v1: "Medium", v2: "Low", changed: true },
                              { param: "Approval Status", v1: "Pending", v2: "Approved", changed: true },
                              { param: "CUF (%)", v1: "20.1", v2: "20.8", changed: true },
                              { param: "Curtailment (MWh)", v1: "45.2", v2: "45.2", changed: false },
                            ].map((row, idx) => (
                              <div key={idx} className={`grid grid-cols-[1fr_120px_16px_120px] px-4 py-2 gap-2 items-center border-b border-slate-100 text-sm ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                                <span className="font-medium text-slate-700 text-xs">{row.param}</span>
                                {row.changed ? (
                                  <>
                                    <span className="text-center text-xs font-semibold text-rose-600 line-through">{row.v1}</span>
                                    <span className="text-center text-slate-400">→</span>
                                    <span className="text-center text-xs font-semibold text-emerald-700 bg-emerald-50 rounded px-1">{row.v2}</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-center text-xs text-slate-400">{row.v1}</span>
                                    <span className="text-center text-slate-300 text-xs">—</span>
                                    <span className="text-center text-xs text-slate-400">{row.v2}</span>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-blue-700 mt-2 flex items-center gap-1">
                            <Info className="w-3 h-3" />
                            <span className="text-rose-600 font-semibold line-through">Red strikethrough</span> = old value &nbsp;·&nbsp; <span className="text-emerald-700 font-semibold">Green</span> = new value &nbsp;·&nbsp; Grey = unchanged
                          </p>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>

                </div>
              </TabsContent>

              {/* TAB 5: GENERATION COMPARISON */}
              <TabsContent value="generation-comparison" className="m-0 p-6">
                <div className="max-w-7xl mx-auto space-y-6">

                  {/* Header + Month Selectors */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <BarChart2 className="w-5 h-5 text-[#2955A0]" />
                        Month-over-Month Generation Comparison
                      </h2>
                      <p className="text-sm text-slate-500 mt-0.5">
                        Compare JMR generation metrics across two months to support data-driven decision making
                      </p>
                    </div>
                    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Current Month</span>
                        <Select value={cmpCurrentMonth} onValueChange={(v) => {
                          setCmpCurrentMonth(v);
                          const idx = months.indexOf(v);
                          const prevIdx = idx === 0 ? months.length - 1 : idx - 1;
                          setCmpPrevMonth(months[prevIdx]);
                        }}>
                          <SelectTrigger className="h-8 w-36 text-sm font-semibold border-[#2955A0] text-[#2955A0]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col items-center">
                        <GitCompare className="w-4 h-4 text-slate-400 mt-4" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Compare With</span>
                        <Select value={cmpPrevMonth} onValueChange={setCmpPrevMonth}>
                          <SelectTrigger className="h-8 w-36 text-sm font-semibold border-slate-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* KPI Delta Cards */}
                  {(() => {
                    const { currentGross, prevGross, currentExport, prevExport, currentRevenue, prevRevenue, deltaGross, deltaExport, deltaRevenue, currentRecs, prevRecs } = comparisonData;
                    const fmt = (n: number, dec = 0) => n.toLocaleString("en-IN", { maximumFractionDigits: dec });
                    const DeltaBadge = ({ delta }: { delta: number }) => {
                      const isUp = delta >= 0;
                      const Icon = isUp ? ArrowUpRight : ArrowDownRight;
                      return (
                        <span className={`inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full ${isUp ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                          <Icon className="w-3 h-3" />
                          {Math.abs(delta).toFixed(1)}%
                        </span>
                      );
                    };
                    const cards = [
                      {
                        label: "Gross Generation",
                        unit: "MWh",
                        current: currentGross,
                        previous: prevGross,
                        delta: deltaGross,
                        icon: Zap,
                        color: "blue",
                        format: (v: number) => fmt(v),
                      },
                      {
                        label: "Net Export Energy",
                        unit: "MWh",
                        current: currentExport,
                        previous: prevExport,
                        delta: deltaExport,
                        icon: TrendingUp,
                        color: "emerald",
                        format: (v: number) => fmt(v, 1),
                      },
                      {
                        label: "Revenue Realized",
                        unit: "₹ Lakhs",
                        current: currentRevenue,
                        previous: prevRevenue,
                        delta: deltaRevenue,
                        icon: TrendingDown,
                        color: "amber",
                        format: (v: number) => fmt(v, 2),
                      },
                      {
                        label: "Plant Records",
                        unit: "plants",
                        current: currentRecs.length,
                        previous: prevRecs.length,
                        delta: prevRecs.length === 0 ? 0 : ((currentRecs.length - prevRecs.length) / prevRecs.length) * 100,
                        icon: Building2,
                        color: "violet",
                        format: (v: number) => String(v),
                      },
                    ];
                    const colorMap: Record<string, { bg: string; border: string; icon: string; label: string }> = {
                      blue:   { bg: "bg-blue-50",   border: "border-blue-200",   icon: "text-blue-600",   label: "text-blue-900" },
                      emerald:{ bg: "bg-emerald-50", border: "border-emerald-200", icon: "text-emerald-600", label: "text-emerald-900" },
                      amber:  { bg: "bg-amber-50",  border: "border-amber-200",  icon: "text-amber-600",  label: "text-amber-900" },
                      violet: { bg: "bg-violet-50", border: "border-violet-200", icon: "text-violet-600", label: "text-violet-900" },
                    };
                    return (
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {cards.map((card) => {
                          const c = colorMap[card.color];
                          const Icon = card.icon;
                          return (
                            <Card key={card.label} className={`border-2 ${c.border} ${c.bg}`}>
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div className={`p-2 rounded-lg bg-white/60 ${c.icon}`}>
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <DeltaBadge delta={card.delta} />
                                </div>
                                <p className={`text-xs font-semibold ${c.label} mb-1`}>{card.label}</p>
                                <div className="flex items-end justify-between">
                                  <div>
                                    <p className="text-2xl font-bold text-slate-900">{card.format(card.current)}</p>
                                    <p className="text-xs text-slate-500">{card.unit} · {cmpCurrentMonth}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-semibold text-slate-500">{card.format(card.previous)}</p>
                                    <p className="text-[10px] text-slate-400">{cmpPrevMonth}</p>
                                  </div>
                                </div>
                                <div className="mt-3 h-1.5 bg-white/60 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${card.delta >= 0 ? "bg-emerald-500" : "bg-rose-400"}`}
                                    style={{ width: `${Math.min(100, Math.abs(card.delta) * 3 + 40)}%` }}
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    );
                  })()}

                  {/* Bar Chart */}
                  <Card className="border-2 border-slate-200">
                    <CardHeader className="border-b border-slate-100 pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base flex items-center gap-2">
                            <BarChart2 className="w-4 h-4 text-[#2955A0]" />
                            Plant-wise Gross Generation — {cmpCurrentMonth} vs {cmpPrevMonth}
                          </CardTitle>
                          <CardDescription>Side-by-side comparison of gross generation (MWh) per plant</CardDescription>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#2955A0] inline-block" /> {cmpCurrentMonth}</span>
                          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-slate-300 inline-block" /> {cmpPrevMonth}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      {comparisonData.chartData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                          <BarChart2 className="w-10 h-10 mb-2 opacity-40" />
                          <p className="text-sm">No JMR data found for selected months</p>
                          <p className="text-xs mt-1">Try selecting different months or fiscal year</p>
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={comparisonData.chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }} barCategoryGap="25%" barGap={4}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(1)}k` : String(v)} />
                            <RechartsTooltip
                              content={({ active, payload, label }) => {
                                if (!active || !payload?.length) return null;
                                const d = payload[0]?.payload;
                                return (
                                  <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
                                    <p className="font-bold text-slate-800 mb-2">{d?.fullName}</p>
                                    {payload.map((p: { name: string; value: number; color: string }) => (
                                      <div key={p.name} className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                                        <span className="text-slate-600">{p.name}:</span>
                                        <span className="font-semibold">{Number(p.value).toLocaleString("en-IN")} MWh</span>
                                      </div>
                                    ))}
                                    {payload[0] && payload[1] && (
                                      <div className="mt-2 pt-2 border-t border-slate-100">
                                        <span className="text-slate-500">Change: </span>
                                        <span className={`font-bold ${payload[0].value >= payload[1].value ? "text-emerald-600" : "text-rose-600"}`}>
                                          {payload[0].value >= payload[1].value ? "+" : ""}{(((payload[0].value - payload[1].value) / (payload[1].value || 1)) * 100).toFixed(1)}%
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                );
                              }}
                            />
                            <Bar dataKey="current" name={cmpCurrentMonth} fill="#2955A0" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="previous" name={cmpPrevMonth} fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </CardContent>
                  </Card>

                  {/* Plant-by-Plant Comparison Table */}
                  <Card className="border-2 border-slate-200">
                    <CardHeader className="border-b border-slate-100 pb-4">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Database className="w-4 h-4 text-[#2955A0]" />
                        Detailed Plant-wise Comparison
                      </CardTitle>
                      <CardDescription>
                        {cmpCurrentMonth} vs {cmpPrevMonth} · {selectedFY} — all JMR-submitted plants
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                              <th className="text-left px-4 py-3 font-semibold text-slate-700 text-xs">Plant</th>
                              <th className="text-right px-4 py-3 font-semibold text-slate-700 text-xs">
                                <span className="text-[#2955A0]">{cmpCurrentMonth}</span> Generation (MWh)
                              </th>
                              <th className="text-right px-4 py-3 font-semibold text-slate-700 text-xs">
                                {cmpPrevMonth} Generation (MWh)
                              </th>
                              <th className="text-right px-4 py-3 font-semibold text-slate-700 text-xs">MoM Change</th>
                              <th className="text-right px-4 py-3 font-semibold text-slate-700 text-xs">
                                <span className="text-[#2955A0]">{cmpCurrentMonth}</span> Revenue (₹L)
                              </th>
                              <th className="text-right px-4 py-3 font-semibold text-slate-700 text-xs">
                                {cmpPrevMonth} Revenue (₹L)
                              </th>
                              <th className="text-center px-4 py-3 font-semibold text-slate-700 text-xs">Trend</th>
                            </tr>
                          </thead>
                          <tbody>
                            {comparisonData.chartData.length === 0 ? (
                              <tr>
                                <td colSpan={7} className="text-center py-10 text-slate-400 text-sm">
                                  No data available for the selected months
                                </td>
                              </tr>
                            ) : (
                              comparisonData.chartData.map((row, idx) => {
                                const momPct = row.previous === 0
                                  ? null
                                  : ((row.current - row.previous) / row.previous) * 100;
                                const isUp = momPct !== null && momPct >= 0;
                                return (
                                  <tr key={row.fullName} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                                    <td className="px-4 py-3">
                                      <div className="font-semibold text-slate-800 text-xs">{row.fullName}</div>
                                    </td>
                                    <td className="px-4 py-3 text-right font-semibold text-[#2955A0]">
                                      {row.current > 0 ? row.current.toLocaleString("en-IN") : <span className="text-slate-400">—</span>}
                                    </td>
                                    <td className="px-4 py-3 text-right text-slate-500">
                                      {row.previous > 0 ? row.previous.toLocaleString("en-IN") : <span className="text-slate-400">—</span>}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                      {momPct === null ? (
                                        <span className="text-slate-400 text-xs">N/A</span>
                                      ) : (
                                        <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${isUp ? "text-emerald-700" : "text-rose-600"}`}>
                                          {isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                                          {Math.abs(momPct).toFixed(1)}%
                                        </span>
                                      )}
                                    </td>
                                    <td className="px-4 py-3 text-right font-semibold text-[#2955A0]">
                                      {row.currentRevenue > 0 ? `₹${row.currentRevenue.toFixed(2)}` : <span className="text-slate-400">—</span>}
                                    </td>
                                    <td className="px-4 py-3 text-right text-slate-500">
                                      {row.previousRevenue > 0 ? `₹${row.previousRevenue.toFixed(2)}` : <span className="text-slate-400">—</span>}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      {momPct === null ? (
                                        <span className="text-slate-300">—</span>
                                      ) : isUp ? (
                                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100">
                                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                                        </div>
                                      ) : (
                                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100">
                                          <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                                        </div>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                          {comparisonData.chartData.length > 0 && (
                            <tfoot>
                              <tr className="bg-[#2955A0]/5 border-t-2 border-[#2955A0]/20">
                                <td className="px-4 py-3 font-bold text-slate-800 text-xs">Portfolio Total</td>
                                <td className="px-4 py-3 text-right font-bold text-[#2955A0]">
                                  {comparisonData.currentGross.toLocaleString("en-IN")}
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-slate-600">
                                  {comparisonData.prevGross.toLocaleString("en-IN")}
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${comparisonData.deltaGross >= 0 ? "text-emerald-700" : "text-rose-600"}`}>
                                    {comparisonData.deltaGross >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                                    {Math.abs(comparisonData.deltaGross).toFixed(1)}%
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-[#2955A0]">
                                  ₹{comparisonData.currentRevenue.toFixed(2)}
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-slate-600">
                                  ₹{comparisonData.prevRevenue.toFixed(2)}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${comparisonData.deltaGross >= 0 ? "bg-emerald-100" : "bg-rose-100"}`}>
                                    {comparisonData.deltaGross >= 0
                                      ? <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                                      : <TrendingDown className="w-3.5 h-3.5 text-rose-600" />}
                                  </div>
                                </td>
                              </tr>
                            </tfoot>
                          )}
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Insight Banner */}
                  {comparisonData.chartData.length > 0 && (
                    <Card className={`border-2 ${comparisonData.deltaGross >= 0 ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${comparisonData.deltaGross >= 0 ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
                            {comparisonData.deltaGross >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className={`font-bold text-sm ${comparisonData.deltaGross >= 0 ? "text-emerald-800" : "text-amber-800"}`}>
                              Portfolio Insight · {cmpCurrentMonth} vs {cmpPrevMonth}
                            </p>
                            <p className={`text-sm mt-0.5 ${comparisonData.deltaGross >= 0 ? "text-emerald-700" : "text-amber-700"}`}>
                              {comparisonData.deltaGross >= 0
                                ? `Generation is up ${comparisonData.deltaGross.toFixed(1)}% MoM — portfolio is performing above the previous month benchmark.`
                                : `Generation is down ${Math.abs(comparisonData.deltaGross).toFixed(1)}% MoM — review outage logs and plant availability for root-cause analysis.`}
                              {" "}Revenue {comparisonData.deltaRevenue >= 0 ? "also improved" : "declined"} by {Math.abs(comparisonData.deltaRevenue).toFixed(1)}%
                              {" "}({comparisonData.deltaRevenue >= 0 ? "+" : ""}₹{(comparisonData.currentRevenue - comparisonData.prevRevenue).toFixed(2)} Lakhs).
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      {/* T005: PDF Preview Dialog — rendered at root level so it works from any tab */}
      <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#2955A0]" />
              PDF Document Preview
            </DialogTitle>
            <DialogDescription>
              {pdfDialogRecord ? `${pdfDialogRecord.plant} · ${pdfDialogRecord.month} · v${pdfDialogRecord.version}` : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="bg-slate-100 rounded-xl border-2 border-slate-200 p-8 text-center space-y-3">
            <FileImage className="w-14 h-14 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">
              {pdfDialogRecord ? `JMR_${pdfDialogRecord.plant.replace(/ /g,"_")}_${pdfDialogRecord.month}_v${pdfDialogRecord.version}.pdf` : ""}
            </p>
            <div className="flex justify-center gap-4 text-xs text-slate-500">
              <span>Size: 1.4 MB</span>
              <span>·</span>
              <span>Uploaded: Mar 5, 2026</span>
              <span>·</span>
              <span>Pages: 6</span>
            </div>
            <div className="mt-2 px-8 py-6 bg-white border border-slate-200 rounded-lg text-xs text-slate-400 italic">
              PDF preview pane — document renders here in production
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPdfDialogOpen(false)}>Close</Button>
            <Button className="bg-[#2955A0] gap-2" onClick={() => { toast.success("Downloading PDF…"); }}>
              <Download className="w-4 h-4" /> Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Bulk Upload Component
const EXCEL_HEADERS = [
  { col: "Plant ID", system: "Plant Identifier" },
  { col: "Month", system: "Reporting Month" },
  { col: "Gross Gen (MWh)", system: "Gross Generation" },
  { col: "Net Export", system: "Net Export Energy" },
  { col: "Avail %", system: "Grid Availability" },
  { col: "Plant Avail %", system: "Plant Availability" },
  { col: "Curtail (MWh)", system: "Curtailment Units" },
  { col: "Revenue (L)", system: "Revenue Realized" },
  { col: "Contract Target", system: "Contractual Target" },
  { col: "PR Ratio", system: "— Ignore —" },
];

const SYSTEM_FIELDS = [
  "Plant Identifier", "Reporting Month", "Gross Generation", "Net Export Energy",
  "Grid Availability", "Plant Availability", "Curtailment Units", "Revenue Realized",
  "Contractual Target", "O&M Deviation Amount", "— Ignore —",
];

const VALID_PREVIEW_ROWS = [
  { row: 2, plant: "Sangli Solar Farm", month: "Feb", gross: "2,150", net: "2,120", revenue: "20.42", status: "valid" },
  { row: 3, plant: "Nashik Site A", month: "Feb", gross: "1,180", net: "1,162", revenue: "11.18", status: "valid" },
  { row: 4, plant: "Aurangabad Project", month: "Feb", gross: "2,380", net: "2,345", revenue: "22.56", status: "valid" },
  { row: 5, plant: "Solapur SPV", month: "Feb", gross: "1,720", net: "1,695", revenue: "16.31", status: "warning" },
  { row: 6, plant: "Chennai Coastal", month: "Feb", gross: "1,920", net: "1,892", revenue: "18.20", status: "valid" },
];

function BulkUploadContent() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStats, setUploadStats] = useState({ total: 0, valid: 0, errors: 0, duplicates: 0, warnings: 0 });
  const [showMapping, setShowMapping] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showValidPreview, setShowValidPreview] = useState(true);
  const [columnMappings, setColumnMappings] = useState<Record<string, string>>(
    Object.fromEntries(EXCEL_HEADERS.map(h => [h.col, h.system]))
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setShowResults(false);
      setShowMapping(false);
      setTimeout(() => {
        setShowMapping(true);
        toast.info("File parsed — review column mappings before validating");
      }, 800);
    }
  };

  const handleConfirmMapping = () => {
    setShowMapping(false);
    setTimeout(() => {
      setUploadStats({ total: 25, valid: 20, errors: 3, duplicates: 1, warnings: 1 });
      setShowResults(true);
      toast.success("Validation complete — 20 valid, 3 errors, 1 warning");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Download Template */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-900 mb-1">Step 1: Download Template</h3>
              <p className="text-sm text-blue-700">Download the standardized Excel template with all required fields</p>
            </div>
            <Button className="bg-[#2955A0] gap-2" onClick={() => toast.success("Template downloaded")}>
              <Download className="w-4 h-4" /> Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Upload Zone */}
      <Card className="border-2 border-slate-200">
        <CardHeader className="border-b border-slate-100">
          <CardTitle>Step 2: Upload Completed File</CardTitle>
          <CardDescription>Drag and drop your Excel file or click to browse</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <label
            htmlFor="file-upload"
            className="block border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-[#2955A0] hover:bg-blue-50 transition-all"
          >
            <input id="file-upload" type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileUpload} />
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-sm font-semibold text-slate-900 mb-1">Drop Excel file here or click to upload</p>
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

      {/* Step 2.5: Column Mapping Engine (T003) */}
      {showMapping && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardHeader className="border-b border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-purple-900 flex items-center gap-2">
                    <GitCompare className="w-5 h-5" />
                    Step 2.5: Column Mapping
                  </CardTitle>
                  <CardDescription className="text-purple-700">
                    Map detected Excel columns to system fields. Auto-matched where possible — adjust if needed.
                  </CardDescription>
                </div>
                <Badge className="bg-purple-100 text-purple-800 border-purple-300">{EXCEL_HEADERS.length} columns detected</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="rounded-lg overflow-hidden border border-purple-200">
                <div className="grid grid-cols-[1fr_1fr_80px] bg-purple-700 text-white text-xs font-bold px-4 py-2.5 gap-4">
                  <span>Detected Excel Column</span>
                  <span>Map to System Field</span>
                  <span className="text-center">Status</span>
                </div>
                {EXCEL_HEADERS.map((h, idx) => {
                  const mapped = columnMappings[h.col];
                  const isIgnored = mapped === "— Ignore —";
                  return (
                    <div key={h.col} className={`grid grid-cols-[1fr_1fr_80px] px-4 py-2.5 gap-4 items-center border-b border-purple-100 text-sm ${idx % 2 === 0 ? "bg-white" : "bg-purple-50"}`}>
                      <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{h.col}</span>
                      <Select value={mapped} onValueChange={val => setColumnMappings(prev => ({ ...prev, [h.col]: val }))}>
                        <SelectTrigger className="h-7 text-xs bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SYSTEM_FIELDS.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <div className="flex justify-center">
                        {isIgnored ? (
                          <Badge className="bg-slate-100 text-slate-500 border-slate-300 text-[10px]">Ignored</Badge>
                        ) : mapped === h.system ? (
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 text-[10px]">Auto ✓</Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-700 border-blue-300 text-[10px]">Manual</Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-end mt-4">
                <Button className="bg-[#2955A0] gap-2" onClick={handleConfirmMapping}>
                  <CheckCircle className="w-4 h-4" /> Confirm Mapping & Validate
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Step 3: Upload Results (T004 included) */}
      {showResults && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-2 border-slate-200">
            <CardHeader className="border-b border-slate-100">
              <CardTitle>Step 3: Validation Results</CardTitle>
              <CardDescription>Summary, errors, and valid record preview</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Statistics */}
              <div className="grid grid-cols-5 gap-4">
                {[
                  { n: uploadStats.total, label: "Total Records", cls: "blue" },
                  { n: uploadStats.valid, label: "Valid", cls: "emerald" },
                  { n: uploadStats.errors, label: "Errors", cls: "rose" },
                  { n: uploadStats.warnings, label: "Warnings", cls: "amber" },
                  { n: uploadStats.duplicates, label: "Duplicates", cls: "slate" },
                ].map(s => (
                  <div key={s.label} className={`p-4 bg-${s.cls}-50 border-2 border-${s.cls}-200 rounded-lg text-center`}>
                    <div className={`text-2xl font-bold text-${s.cls}-900`}>{s.n}</div>
                    <div className={`text-xs font-semibold text-${s.cls}-700 mt-1`}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Error Details */}
              {uploadStats.errors > 0 && (
                <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-lg">
                  <h4 className="font-bold text-rose-900 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5" /> Error Records ({uploadStats.errors})
                  </h4>
                  <div className="space-y-2">
                    {[
                      { row: 7, type: "Invalid Data", msg: "Gross Generation cannot be empty (required field)" },
                      { row: 14, type: "Validation Error", msg: "Net Export (2500) exceeds Gross Generation (2400)" },
                      { row: 21, type: "Duplicate", msg: "Record for Sangli Solar Farm / Feb 2026 already exists" },
                    ].map(err => (
                      <div key={err.row} className="bg-white p-3 rounded border border-rose-100 flex items-start justify-between">
                        <div>
                          <span className="text-sm font-semibold text-slate-900">Row {err.row}</span>
                          <p className="text-xs text-rose-700 mt-0.5">{err.msg}</p>
                        </div>
                        <Badge variant="outline" className="bg-rose-100 text-rose-700 border-rose-200 text-xs shrink-0 ml-3">{err.type}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* T004: Valid Records Preview */}
              <div className="border-2 border-emerald-200 rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 bg-emerald-50 text-sm font-bold text-emerald-900 hover:bg-emerald-100 transition-colors"
                  onClick={() => setShowValidPreview(p => !p)}
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Preview: Valid Records ({uploadStats.valid})
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${showValidPreview ? "rotate-90" : ""}`} />
                </button>
                {showValidPreview && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-emerald-700 text-white">
                          {["Row #", "Plant", "Month", "Gross Gen", "Net Export", "Revenue (₹ L)", "Status"].map(h => (
                            <th key={h} className="px-3 py-2 text-left font-semibold whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {VALID_PREVIEW_ROWS.map((r, idx) => (
                          <tr key={r.row} className={`border-b border-emerald-100 ${r.status === "warning" ? "bg-amber-50" : idx % 2 === 0 ? "bg-white" : "bg-emerald-50"}`}>
                            <td className="px-3 py-2 font-mono text-slate-500">#{r.row}</td>
                            <td className="px-3 py-2 font-semibold text-slate-800">{r.plant}</td>
                            <td className="px-3 py-2 text-slate-600">{r.month}</td>
                            <td className="px-3 py-2 font-semibold">{r.gross}</td>
                            <td className="px-3 py-2">{r.net}</td>
                            <td className="px-3 py-2">₹{r.revenue}</td>
                            <td className="px-3 py-2">
                              {r.status === "warning" ? (
                                <Badge className="bg-amber-100 text-amber-700 border-amber-300 text-[10px]">⚠ Warning</Badge>
                              ) : (
                                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 text-[10px]">✓ Valid</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-slate-100 text-slate-500 italic">
                          <td className="px-3 py-2" colSpan={7}>…and {uploadStats.valid - VALID_PREVIEW_ROWS.length} more valid records</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <Button variant="outline" className="gap-2" onClick={() => toast.success("Error report downloaded")}>
                  <Download className="w-4 h-4" /> Download Error Report
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => { setShowResults(false); setShowMapping(false); setUploadedFile(null); }}>
                    Fix & Re-upload
                  </Button>
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 gap-2"
                    disabled={uploadStats.valid === 0}
                    onClick={() => toast.success(`${uploadStats.valid} valid records submitted for Checker review`)}
                  >
                    <Send className="w-4 h-4" /> Submit {uploadStats.valid} Valid for Review
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

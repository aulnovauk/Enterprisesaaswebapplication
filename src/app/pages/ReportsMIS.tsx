import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
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
  GripVertical,
  Database,
  BarChart3,
  Table2,
  Filter,
  Clock,
  Users,
  Send,
  FileSpreadsheet,
  FileCode,
  Eye,
  ChevronRight,
  ChevronDown,
  X,
  Copy,
  Edit3,
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Data fields available for reporting
const dataFields = [
  { id: "generation", name: "Generation (MWh)", category: "Performance", type: "measure" },
  { id: "availability", name: "Availability (%)", category: "Performance", type: "measure" },
  { id: "cuf", name: "CUF (%)", category: "Performance", type: "measure" },
  { id: "pr", name: "PR (%)", category: "Performance", type: "measure" },
  { id: "irradiation", name: "Irradiation (kWh/m²)", category: "Environmental", type: "measure" },
  { id: "plant", name: "Plant Name", category: "Dimensions", type: "dimension" },
  { id: "state", name: "State", category: "Dimensions", type: "dimension" },
  { id: "vendor", name: "Vendor", category: "Dimensions", type: "dimension" },
  { id: "client", name: "Client", category: "Dimensions", type: "dimension" },
  { id: "cluster", name: "Cluster", category: "Dimensions", type: "dimension" },
  { id: "date", name: "Date", category: "Time", type: "dimension" },
  { id: "month", name: "Month", category: "Time", type: "dimension" },
  { id: "year", name: "Year", category: "Time", type: "dimension" },
  { id: "ldAmount", name: "LD Amount (₹L)", category: "Financial", type: "measure" },
  { id: "revenue", name: "Revenue (₹L)", category: "Financial", type: "measure" },
  { id: "energyLoss", name: "Energy Loss (MWh)", category: "Loss Analysis", type: "measure" },
  { id: "downtime", name: "Downtime (Hours)", category: "Loss Analysis", type: "measure" },
];

// KPI definitions
const kpiDefinitions = [
  { id: "total-generation", name: "Total Generation", formula: "SUM(Generation)" },
  { id: "avg-availability", name: "Average Availability", formula: "AVG(Availability)" },
  { id: "weighted-cuf", name: "Weighted CUF", formula: "WEIGHTED_AVG(CUF, Capacity)" },
  { id: "total-ld", name: "Total LD Exposure", formula: "SUM(LD Amount)" },
  { id: "total-revenue", name: "Total Revenue", formula: "SUM(Revenue)" },
  { id: "energy-loss", name: "Total Energy Loss", formula: "SUM(Energy Loss)" },
];

// Report templates
const reportTemplates = [
  { id: "monthly-perf", name: "Monthly Performance Report", description: "Standard monthly generation report" },
  { id: "ld-compliance", name: "LD & Compliance Report", description: "Contractual compliance tracking" },
  { id: "vendor-comparison", name: "Vendor Comparison", description: "Multi-vendor performance analysis" },
  { id: "executive-summary", name: "Executive Summary", description: "High-level dashboard for management" },
];

// Email distribution lists
const distributionLists = [
  { id: "exec", name: "Executive Leadership", members: ["ceo@eesl.in", "cfo@eesl.in", "coo@eesl.in"], count: 3 },
  { id: "ops", name: "Operations Team", members: ["ops-manager@eesl.in", "plant-heads@eesl.in"], count: 8 },
  { id: "finance", name: "Finance Team", members: ["finance@eesl.in", "accounts@eesl.in"], count: 5 },
  { id: "vendors", name: "Vendor Partners", members: ["vendor1@example.com", "vendor2@example.com"], count: 12 },
];

// Email audit logs
const emailAuditLogs = [
  { id: "E-2026-001", reportName: "Monthly Performance Report", sentDate: "2026-02-28 08:00", recipients: 15, status: "delivered" },
  { id: "E-2026-002", reportName: "Weekly Operations Summary", sentDate: "2026-02-27 06:00", recipients: 8, status: "delivered" },
  { id: "E-2026-003", reportName: "Daily Generation Summary", sentDate: "2026-02-26 06:00", recipients: 12, status: "delivered" },
  { id: "E-2026-004", reportName: "Executive Dashboard", sentDate: "2026-02-25 09:00", recipients: 3, status: "failed" },
];

// Sample preview data
const previewData = [
  { plant: "Plant A", state: "Rajasthan", generation: 820, availability: 96.2, cuf: 21.8, ldAmount: 0.36 },
  { plant: "Plant B", state: "Gujarat", generation: 1980, availability: 93.8, cuf: 22.1, ldAmount: 1.8 },
  { plant: "Plant C", state: "Madhya Pradesh", generation: 4100, availability: 94.5, cuf: 22.3, ldAmount: 1.0 },
  { plant: "Plant D", state: "Karnataka", generation: 2300, availability: 92.1, cuf: 20.8, ldAmount: 3.6 },
  { plant: "Plant E", state: "Uttar Pradesh", generation: 1280, availability: 97.3, cuf: 23.5, ldAmount: 0 },
];

// Draggable field component
function DraggableField({ field }: { field: typeof dataFields[0] }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FIELD",
    item: { field },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center gap-2 p-2 rounded border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 cursor-move transition-all ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <GripVertical className="w-4 h-4 text-gray-400" />
      <span className="text-xs font-medium text-gray-700">{field.name}</span>
      <Badge className="ml-auto text-xs bg-gray-100 text-gray-700">{field.type === "measure" ? "📊" : "📋"}</Badge>
    </div>
  );
}

// Drop zone component
function DropZone({ onDrop, items, onRemove, label }: any) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FIELD",
    drop: (item: any) => onDrop(item.field),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`min-h-[100px] p-3 rounded-lg border-2 border-dashed transition-all ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
      }`}
    >
      <Label className="text-xs font-semibold text-gray-700 mb-2 block">{label}</Label>
      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">Drag fields here</p>
        ) : (
          items.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
              <span className="text-xs font-medium text-gray-700">{item.name}</span>
              <button onClick={() => onRemove(idx)} className="text-gray-400 hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function ReportsMIS() {
  const [selectedFields, setSelectedFields] = useState<any[]>([]);
  const [selectedKPIs, setSelectedKPIs] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    plant: "all",
    state: "all",
    vendor: "all",
    client: "all",
    cluster: "all",
    dateFrom: "",
    dateTo: "",
  });
  const [aggregation, setAggregation] = useState("sum");
  const [previewMode, setPreviewMode] = useState<"table" | "chart">("table");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Performance", "Dimensions"]);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [distributionDialogOpen, setDistributionDialogOpen] = useState(false);
  const [emailAuditDialogOpen, setEmailAuditDialogOpen] = useState(false);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const categories = Array.from(new Set(dataFields.map((f) => f.category)));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-[calc(100vh-4rem)] bg-gray-100">
        {/* LEFT PANEL - Data Fields & Filters */}
        <div className="w-[320px] bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Data Fields & Filters
            </h2>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Data Fields */}
              <div>
                <h3 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Available Fields</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category}>
                      <button
                        onClick={() => toggleCategory(category)}
                        className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded"
                      >
                        <span className="text-xs font-medium text-gray-700">{category}</span>
                        {expandedCategories.includes(category) ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                      {expandedCategories.includes(category) && (
                        <div className="ml-2 mt-1 space-y-1">
                          {dataFields
                            .filter((f) => f.category === category)
                            .map((field) => (
                              <DraggableField key={field.id} field={field} />
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* KPI Selection */}
              <div>
                <h3 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">KPI Selection</h3>
                <div className="space-y-2">
                  {kpiDefinitions.map((kpi) => (
                    <div key={kpi.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                      <Checkbox
                        id={kpi.id}
                        checked={selectedKPIs.some((k) => k.id === kpi.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedKPIs([...selectedKPIs, kpi]);
                          } else {
                            setSelectedKPIs(selectedKPIs.filter((k) => k.id !== kpi.id));
                          }
                        }}
                      />
                      <Label htmlFor={kpi.id} className="text-xs cursor-pointer flex-1">
                        <div className="font-medium text-gray-700">{kpi.name}</div>
                        <div className="text-gray-500 font-mono">{kpi.formula}</div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Aggregation Options */}
              <div>
                <h3 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Aggregation</h3>
                <Select value={aggregation} onValueChange={setAggregation}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sum">Sum</SelectItem>
                    <SelectItem value="avg">Average</SelectItem>
                    <SelectItem value="weighted">Weighted Average</SelectItem>
                    <SelectItem value="custom">Custom Logic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Filters */}
              <div>
                <h3 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-gray-600 mb-1">Plant</Label>
                    <Select value={filters.plant} onValueChange={(v) => setFilters({ ...filters, plant: v })}>
                      <SelectTrigger className="w-full h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Plants</SelectItem>
                        <SelectItem value="plant-a">Plant A - Jaipur</SelectItem>
                        <SelectItem value="plant-b">Plant B - Gandhinagar</SelectItem>
                        <SelectItem value="plant-c">Plant C - Rewa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600 mb-1">State</Label>
                    <Select value={filters.state} onValueChange={(v) => setFilters({ ...filters, state: v })}>
                      <SelectTrigger className="w-full h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All States</SelectItem>
                        <SelectItem value="rajasthan">Rajasthan</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        <SelectItem value="mp">Madhya Pradesh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600 mb-1">Vendor</Label>
                    <Select value={filters.vendor} onValueChange={(v) => setFilters({ ...filters, vendor: v })}>
                      <SelectTrigger className="w-full h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Vendors</SelectItem>
                        <SelectItem value="solartech">SolarTech India</SelectItem>
                        <SelectItem value="sunpower">SunPower Solutions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600 mb-1">Client</Label>
                    <Select value={filters.client} onValueChange={(v) => setFilters({ ...filters, client: v })}>
                      <SelectTrigger className="w-full h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Clients</SelectItem>
                        <SelectItem value="eesl">EESL</SelectItem>
                        <SelectItem value="ntpc">NTPC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600 mb-1">Cluster</Label>
                    <Select value={filters.cluster} onValueChange={(v) => setFilters({ ...filters, cluster: v })}>
                      <SelectTrigger className="w-full h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Clusters</SelectItem>
                        <SelectItem value="north">North India</SelectItem>
                        <SelectItem value="south">South India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600 mb-1">Time Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="date"
                        className="h-8 text-xs"
                        value={filters.dateFrom}
                        onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                        placeholder="From"
                      />
                      <Input
                        type="date"
                        className="h-8 text-xs"
                        value={filters.dateTo}
                        onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                        placeholder="To"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full" size="sm" style={{ backgroundColor: "#0B3C5D" }}>
                <Play className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </ScrollArea>
        </div>

        {/* CENTER PANEL - Report Canvas & Preview */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Toolbar */}
          <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <h1 className="text-base font-semibold text-gray-900">Custom Report Builder</h1>
              <Badge className="bg-blue-100 text-blue-800">Unsaved</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Load Template
              </Button>
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Template
              </Button>
              <Button size="sm" style={{ backgroundColor: "#0B3C5D" }} className="text-white">
                <Play className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>

          {/* Report Canvas */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <DropZone
                label="Rows / Dimensions"
                items={selectedFields.filter((f) => f.type === "dimension")}
                onDrop={(field: any) => {
                  if (!selectedFields.some((f) => f.id === field.id)) {
                    setSelectedFields([...selectedFields, field]);
                  }
                }}
                onRemove={(idx: number) => {
                  const dims = selectedFields.filter((f) => f.type === "dimension");
                  const removed = dims[idx];
                  setSelectedFields(selectedFields.filter((f) => f.id !== removed.id));
                }}
              />

              <DropZone
                label="Columns / Measures"
                items={selectedFields.filter((f) => f.type === "measure")}
                onDrop={(field: any) => {
                  if (!selectedFields.some((f) => f.id === field.id)) {
                    setSelectedFields([...selectedFields, field]);
                  }
                }}
                onRemove={(idx: number) => {
                  const measures = selectedFields.filter((f) => f.type === "measure");
                  const removed = measures[idx];
                  setSelectedFields(selectedFields.filter((f) => f.id !== removed.id));
                }}
              />
            </div>

            {/* Live Preview */}
            <Card>
              <CardHeader className="border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Live Preview
                  </CardTitle>
                  <Tabs value={previewMode} onValueChange={(v: any) => setPreviewMode(v)}>
                    <TabsList>
                      <TabsTrigger value="table" className="text-xs">
                        <Table2 className="w-3 h-3 mr-1" />
                        Table
                      </TabsTrigger>
                      <TabsTrigger value="chart" className="text-xs">
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Chart
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {selectedFields.length === 0 ? (
                  <div className="text-center py-12">
                    <Database className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">Drag fields to build your report</p>
                  </div>
                ) : previewMode === "table" ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {selectedFields.map((field) => (
                            <TableHead key={field.id} className="font-semibold text-xs">
                              {field.name}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {previewData.map((row, idx) => (
                          <TableRow key={idx}>
                            {selectedFields.map((field) => (
                              <TableCell key={field.id} className="text-xs">
                                {(row as any)[field.id] ?? "-"}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={previewData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="plant" tick={{ fontSize: 11 }} stroke="#6B7280" />
                      <YAxis tick={{ fontSize: 11 }} stroke="#6B7280" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="generation" fill="#0B3C5D" name="Generation (MWh)" />
                      <Bar dataKey="availability" fill="#10B981" name="Availability (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* RIGHT PANEL - Export & Scheduling */}
        <div className="w-[320px] bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Export & Scheduling
            </h2>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Export Options */}
              <div>
                <h3 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Export Format</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-xs" size="sm">
                    <FileText className="w-4 h-4 mr-2 text-red-600" />
                    Export as PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-xs" size="sm">
                    <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                    Export as Excel (.xlsx)
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-xs" size="sm">
                    <Table2 className="w-4 h-4 mr-2 text-blue-600" />
                    Export as CSV
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-xs" size="sm">
                    <FileCode className="w-4 h-4 mr-2 text-indigo-600" />
                    Export as DOCX
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Schedule Email */}
              <div>
                <h3 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Schedule Email</h3>
                <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-xs" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Configure Schedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Auto-Generation Calendar Configuration</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label className="text-sm mb-2">Report Name</Label>
                        <Input placeholder="e.g., Monthly Performance Report" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm mb-2">Frequency</Label>
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
                          <Label className="text-sm mb-2">Time</Label>
                          <Input type="time" defaultValue="08:00" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm mb-2">Start Date</Label>
                        <Input type="date" />
                      </div>
                      <div>
                        <Label className="text-sm mb-2">Distribution List</Label>
                        <Select defaultValue="exec">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {distributionLists.map((list) => (
                              <SelectItem key={list.id} value={list.id}>
                                {list.name} ({list.count} members)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button variant="outline" className="flex-1" onClick={() => setScheduleDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button className="flex-1" style={{ backgroundColor: "#0B3C5D" }}>
                          Save Schedule
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Separator />

              {/* Distribution List Manager */}
              <div>
                <h3 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Distribution Lists</h3>
                <Dialog open={distributionDialogOpen} onOpenChange={setDistributionDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-xs" size="sm">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Recipients
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Email Distribution List Manager</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Button size="sm" style={{ backgroundColor: "#0B3C5D" }} className="text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New List
                      </Button>
                      <div className="space-y-3">
                        {distributionLists.map((list) => (
                          <Card key={list.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-900">{list.name}</h4>
                                  <p className="text-xs text-gray-600">{list.count} members</p>
                                </div>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="sm">
                                    <Edit3 className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {list.members.slice(0, 3).map((email, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {email}
                                  </Badge>
                                ))}
                                {list.members.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{list.members.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Separator />

              {/* Email Audit Logs */}
              <div>
                <h3 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Audit & Logs</h3>
                <Dialog open={emailAuditDialogOpen} onOpenChange={setEmailAuditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-xs" size="sm">
                      <Clock className="w-4 h-4 mr-2" />
                      View Email Logs
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Email Audit Logs</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs">Email ID</TableHead>
                            <TableHead className="text-xs">Report Name</TableHead>
                            <TableHead className="text-xs">Sent Date</TableHead>
                            <TableHead className="text-xs">Recipients</TableHead>
                            <TableHead className="text-xs">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {emailAuditLogs.map((log) => (
                            <TableRow key={log.id}>
                              <TableCell className="text-xs font-mono">{log.id}</TableCell>
                              <TableCell className="text-xs">{log.reportName}</TableCell>
                              <TableCell className="text-xs">{log.sentDate}</TableCell>
                              <TableCell className="text-xs">{log.recipients}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    log.status === "delivered"
                                      ? "bg-green-100 text-green-800 text-xs"
                                      : "bg-red-100 text-red-800 text-xs"
                                  }
                                >
                                  {log.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Separator />

              {/* Save Template */}
              <div>
                <h3 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Template Management</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-xs" size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save as Template
                  </Button>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-900 font-medium mb-2">Available Templates</p>
                    <div className="space-y-1">
                      {reportTemplates.slice(0, 3).map((template) => (
                        <button
                          key={template.id}
                          className="w-full text-left p-2 text-xs hover:bg-white rounded transition-colors"
                        >
                          {template.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full" style={{ backgroundColor: "#F4B400" }}>
                <Send className="w-4 h-4 mr-2" />
                Send Report Now
              </Button>
            </div>
          </ScrollArea>
        </div>
      </div>
    </DndProvider>
  );
}

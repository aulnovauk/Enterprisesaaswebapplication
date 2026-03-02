import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Save, Play, Plus, Trash2, GripVertical, AlertTriangle, CheckCircle2, Calculator, Settings2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { KPI } from "./types";

interface FormulaBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  kpi: KPI;
}

export function FormulaBuilder({ isOpen, onClose, kpi }: FormulaBuilderProps) {
  const [formula, setFormula] = useState(kpi.id === "cuf" ? "(Actual_Generation / (Installed_Capacity * Time_Period)) * 100" : "Default_Formula");
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [tolerance, setTolerance] = useState("5");
  const [warningThreshold, setWarningThreshold] = useState("95");
  const [errorThreshold, setErrorThreshold] = useState("90");

  const parameters = [
    { name: "Actual_Generation", source: "JMR (SCADA)", type: "Variable" },
    { name: "Installed_Capacity", source: "Master Data", type: "Constant" },
    { name: "Time_Period", source: "System Time", type: "Variable" },
    { name: "Grid_Outage", source: "JMR (Manual)", type: "Variable" },
    { name: "Irradiance", source: "Weather Station", type: "Variable" },
  ];

  const operators = ["+", "-", "*", "/", "(", ")", ">", "<", "IF", "ELSE", "AND", "OR"];

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setTestResult("22.45%");
      setIsSimulating(false);
    }, 800);
  };

  const insertText = (text: string) => {
    setFormula(prev => prev + " " + text + " ");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[600px] bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Formula Configuration</h2>
                <p className="text-sm text-slate-500">Editing logic for <span className="font-semibold text-blue-700">{kpi.name}</span></p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-200">
                <X className="w-5 h-5 text-slate-500" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <Tabs defaultValue="builder" className="flex-1 flex flex-col">
                <div className="px-6 pt-4">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="builder" className="gap-2"><Calculator className="w-3 h-3" /> Formula Builder</TabsTrigger>
                    <TabsTrigger value="ppa" className="gap-2"><Settings2 className="w-3 h-3" /> PPA Mapping</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="builder" className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
                  
                  {/* Parameter Palette */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase text-slate-500">Available Parameters</Label>
                    <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 min-h-[80px]">
                      {parameters.map((param) => (
                        <div 
                          key={param.name} 
                          onClick={() => insertText(param.name)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 rounded-md shadow-sm cursor-pointer hover:border-blue-400 hover:shadow-md transition-all group active:scale-95"
                        >
                          <GripVertical className="w-3 h-3 text-slate-300 group-hover:text-slate-400" />
                          <span className="text-xs font-medium text-slate-700">{param.name}</span>
                          <Badge variant="secondary" className="text-[9px] px-1 h-4 bg-slate-100 text-slate-500">{param.source}</Badge>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="h-7 text-xs border-dashed border-slate-300 text-slate-500">
                        <Plus className="w-3 h-3 mr-1" /> Add Parameter
                      </Button>
                    </div>
                  </div>

                  {/* Operators */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase text-slate-500">Operators</Label>
                    <div className="flex flex-wrap gap-1">
                      {operators.map(op => (
                        <Button 
                           key={op} 
                           variant="outline" 
                           size="sm" 
                           className="h-7 min-w-[30px] px-2 text-xs font-mono bg-slate-50"
                           onClick={() => insertText(op)}
                        >
                          {op}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Formula Editor Area */}
                  <div className="space-y-2">
                     <div className="flex justify-between items-center">
                       <Label className="text-xs font-semibold uppercase text-slate-500">Calculation Logic</Label>
                       <span className="text-xs text-slate-400">Press Ctrl+Space for autocomplete</span>
                     </div>
                     <div className="relative">
                       <textarea
                         value={formula}
                         onChange={(e) => setFormula(e.target.value)}
                         className="w-full h-32 p-4 font-mono text-sm text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none leading-relaxed shadow-inner"
                       />
                       <div className="absolute bottom-3 right-3 flex gap-2">
                         <Button size="sm" variant="secondary" className="h-7 text-xs bg-white shadow-sm border border-slate-200 hover:bg-slate-50">
                            Check Syntax
                         </Button>
                       </div>
                     </div>
                  </div>

                  {/* Thresholds Configuration */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-slate-500">Tolerance %</Label>
                      <Input 
                        value={tolerance} 
                        onChange={(e) => setTolerance(e.target.value)} 
                        className="h-8 text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-slate-500">Warning &lt;</Label>
                      <Input 
                        value={warningThreshold} 
                        onChange={(e) => setWarningThreshold(e.target.value)} 
                        className="h-8 text-xs font-mono border-amber-200 focus:border-amber-400 focus:ring-amber-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-slate-500">Critical &lt;</Label>
                      <Input 
                        value={errorThreshold} 
                        onChange={(e) => setErrorThreshold(e.target.value)} 
                        className="h-8 text-xs font-mono border-rose-200 focus:border-rose-400 focus:ring-rose-200"
                      />
                    </div>
                  </div>

                  {/* Simulation / Test */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase text-slate-500">Simulation & Validation</Label>
                    <div className="bg-slate-900 rounded-lg p-4 text-slate-200 font-mono text-sm relative overflow-hidden">
                       <div className="flex justify-between items-center mb-3">
                          <span className="text-xs text-slate-400">Preview (Last 3 Months Data)</span>
                          <Button 
                            size="sm" 
                            className="h-6 text-xs bg-blue-600 hover:bg-blue-700 text-white border-none"
                            onClick={handleSimulate}
                            disabled={isSimulating}
                          >
                            {isSimulating ? "Running..." : <><Play className="w-3 h-3 mr-1" /> Run Simulation</>}
                          </Button>
                       </div>
                       
                       <div className="space-y-1">
                          <div className="flex justify-between border-b border-slate-800 pb-1 mb-1">
                             <span>Input: Actual_Generation</span>
                             <span className="text-emerald-400">4485.2 MWh</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-800 pb-1 mb-1">
                             <span>Input: Installed_Capacity</span>
                             <span className="text-emerald-400">50 MW</span>
                          </div>
                           <div className="flex justify-between border-b border-slate-800 pb-1 mb-1">
                             <span>Input: Time_Period</span>
                             <span className="text-emerald-400">672 Hours</span>
                          </div>
                          
                          {testResult && (
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-4 pt-3 border-t border-slate-700 flex justify-between items-center"
                            >
                               <span className="font-bold text-white">Result:</span>
                               <span className="font-bold text-xl text-emerald-400">{testResult}</span>
                            </motion.div>
                          )}
                       </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-amber-800">Impact Analysis</h4>
                      <p className="text-xs text-amber-700 mt-1">
                        Changing this formula will affect 12 active contracts and trigger a recalculation of LD for FY 2023-24. 
                        Estimated revenue impact: <span className="font-mono font-bold">- ₹ 45,000</span>.
                      </p>
                    </div>
                  </div>

                </TabsContent>

                <TabsContent value="ppa" className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900">Contract-Specific Overrides</h3>
                      <Button variant="outline" size="sm">Add Override</Button>
                    </div>
                    
                    {[1, 2].map((i) => (
                      <div key={i} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-sm font-bold text-slate-800">PPA Solar 2018 (Generic)</span>
                            <div className="flex gap-2 mt-1">
                               <Badge variant="outline" className="bg-white text-xs font-normal">v1.2 Active</Badge>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400"><Trash2 className="w-3.5 h-3.5" /></Button>
                        </div>
                        <div className="font-mono text-xs text-slate-600 bg-white p-2 rounded border border-slate-200">
                          (Actual_Generation / (Installed_Capacity * Time_Period)) * 100
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
               <div className="flex gap-4">
                 <div className="flex-1 space-y-1">
                   <Label className="text-xs font-semibold text-slate-500">Change Reason</Label>
                   <Input placeholder="e.g. Contract Amendment C4.2" className="h-8 text-xs bg-white" />
                 </div>
                 <div className="space-y-1">
                   <Label className="text-xs font-semibold text-slate-500">Effective From</Label>
                   <Input type="date" className="h-8 w-32 bg-white" />
                 </div>
               </div>
               
               <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                     <span>Next Version:</span>
                     <Badge variant="outline" className="font-mono bg-white">v1.3 (Draft)</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button className="bg-[#0B3C5D] text-white hover:bg-[#092e48] gap-2">
                      <Save className="w-4 h-4" /> Save & Submit
                    </Button>
                  </div>
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

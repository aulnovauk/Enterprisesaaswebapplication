import { useState } from "react";
import { GlobalFilterBar } from "../components/kpi/GlobalFilterBar";
import { KPISidebar } from "../components/kpi/KPISidebar";
import { KPIDetailView } from "../components/kpi/KPIDetailView";
import { FormulaBuilder } from "../components/kpi/FormulaBuilder";
import { kpiData } from "../components/kpi/mockData";
import { KPI } from "../components/kpi/types";

export function KPIEngine() {
  const [selectedKPI, setSelectedKPI] = useState<KPI>(kpiData[0]);
  const [isFormulaBuilderOpen, setIsFormulaBuilderOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      
      {/* 1. Global Filter Bar (Top) */}
      <GlobalFilterBar />

      <div className="flex flex-1 overflow-hidden">
        
        {/* 2. Left Panel - KPI List */}
        <KPISidebar 
          kpis={kpiData} 
          selectedKPIId={selectedKPI.id} 
          onSelectKPI={setSelectedKPI} 
        />

        {/* 3. Main Content - Detail View */}
        <main className="flex-1 flex flex-col relative overflow-hidden">
          
          {/* Background Decorative Gradient - Minimal */}
          <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-blue-50/30 to-transparent pointer-events-none z-0" />
          
          <div className="relative z-10 flex-1 overflow-hidden flex flex-col">
            <KPIDetailView 
              kpi={selectedKPI} 
              onEditFormula={() => setIsFormulaBuilderOpen(true)}
            />
          </div>

        </main>
      </div>

      {/* 4. Formula Builder Drawer */}
      <FormulaBuilder 
        isOpen={isFormulaBuilderOpen} 
        onClose={() => setIsFormulaBuilderOpen(false)} 
        kpi={selectedKPI} 
      />

    </div>
  );
}

import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Activity, Calendar, Download, Filter } from "lucide-react";

export function GlobalFilterBar() {
  return (
    <div className="bg-white border-b-2 border-slate-200 shadow-sm shrink-0 sticky top-0 z-20">
      <div className="px-6 py-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-[#0A2E4A] rounded-lg">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-none">KPI Engine</h1>
              <p className="text-xs text-slate-600 mt-0.5">KPI Governance · Performance Benchmarking</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-7 px-3 text-xs gap-2 text-slate-600 border-slate-200">
              <Filter className="w-3.5 h-3.5" />
              More Filters
            </Button>
            <Button size="sm" className="h-7 px-3 text-xs gap-2 bg-[#0A2E4A] hover:bg-[#092e48] text-white">
              <Download className="w-3.5 h-3.5" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">FY</span>
            <Select defaultValue="2023-24">
              <SelectTrigger className="w-[110px] h-7 text-xs bg-slate-50 border-slate-200">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023-24">2023-24</SelectItem>
                <SelectItem value="2022-23">2022-23</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select defaultValue="sep">
            <SelectTrigger className="w-[120px] h-7 text-xs bg-slate-50 border-slate-200">
              <Calendar className="w-3.5 h-3.5 mr-2 text-slate-400" />
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aug">August</SelectItem>
              <SelectItem value="sep">September</SelectItem>
              <SelectItem value="oct">October</SelectItem>
            </SelectContent>
          </Select>

          <div className="h-6 w-px bg-slate-200 mx-1" />

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] h-7 text-xs bg-slate-50 border-slate-200">
              <SelectValue placeholder="Portfolio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plants (45)</SelectItem>
              <SelectItem value="north">North Cluster</SelectItem>
              <SelectItem value="south">South Cluster</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-ppa">
            <SelectTrigger className="w-[160px] h-7 text-xs bg-slate-50 border-slate-200">
              <SelectValue placeholder="PPA Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-ppa">All Contracts</SelectItem>
              <SelectItem value="solar-2018">PPA Solar 2018</SelectItem>
              <SelectItem value="wind-2019">PPA Wind 2019</SelectItem>
            </SelectContent>
          </Select>
        
          <Select defaultValue="all-categories">
            <SelectTrigger className="w-[160px] h-7 text-xs bg-slate-50 border-slate-200">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">All Categories</SelectItem>
              <SelectItem value="operational">Operational</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="ai-predictive">AI / Predictive</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex bg-slate-100 rounded-md p-1">
            {["Monthly", "MTD", "YTD", "Annual"].map((period) => (
                <button
                    key={period}
                    className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${
                        period === "Monthly" 
                        ? "bg-white text-slate-800 shadow-sm" 
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                    {period}
                </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

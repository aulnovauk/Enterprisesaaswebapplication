import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Building2, MapPin, Zap, Calendar, Edit, Eye } from "lucide-react";

const portfolioStats = {
  totalPlants: 5,
  totalCapacity: 130,
  activeAssets: 1245,
  locations: 3,
};

const plants = [
  {
    id: "PLT-001",
    name: "Plant A",
    location: "Jodhpur, Rajasthan",
    capacity: "10 MW",
    commissionDate: "2020-04-15",
    technology: "Mono-crystalline",
    inverters: 4,
    modules: 28800,
    status: "operational",
    contractor: "Solar Corp Ltd",
  },
  {
    id: "PLT-002",
    name: "Plant B",
    location: "Bikaner, Rajasthan",
    capacity: "25 MW",
    commissionDate: "2019-11-20",
    technology: "Poly-crystalline",
    inverters: 10,
    modules: 72000,
    status: "operational",
    contractor: "Green Energy Pvt Ltd",
  },
  {
    id: "PLT-003",
    name: "Plant C",
    location: "Jaisalmer, Rajasthan",
    capacity: "50 MW",
    commissionDate: "2021-06-10",
    technology: "Mono-crystalline",
    inverters: 20,
    modules: 144000,
    status: "operational",
    contractor: "Solar Corp Ltd",
  },
  {
    id: "PLT-004",
    name: "Plant D",
    location: "Sangli, Maharashtra",
    capacity: "30 MW",
    commissionDate: "2020-09-05",
    technology: "Bifacial",
    inverters: 12,
    modules: 86400,
    status: "maintenance",
    contractor: "Renewable Solutions Inc",
  },
  {
    id: "PLT-005",
    name: "Plant E",
    location: "Anantapur, Andhra Pradesh",
    capacity: "15 MW",
    commissionDate: "2022-01-18",
    technology: "Mono-crystalline",
    inverters: 6,
    modules: 43200,
    status: "operational",
    contractor: "Green Energy Pvt Ltd",
  },
];

export function SitePortfolioManagement() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-white border-b-2 border-slate-200 shadow-sm shrink-0 z-20 sticky top-0">
        <div className="px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-[#2955A0] rounded-lg">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900 leading-none">Site & Portfolio Management</h1>
                <p className="text-xs text-slate-600 mt-0.5">Manage plant details, assets, and portfolio configuration</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button style={{ backgroundColor: "#2955A0" }} className="text-white h-7 px-3 text-xs">
                <Building2 className="w-4 h-4 mr-2" />
                Add New Plant
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Plants</p>
                <p className="text-2xl font-semibold text-gray-900">{portfolioStats.totalPlants}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: "#E8A80020" }}>
                <Zap className="w-6 h-6 mt-3 ml-3" style={{ color: "#E8A800" }} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Capacity</p>
                <p className="text-2xl font-semibold text-gray-900">{portfolioStats.totalCapacity} MW</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Assets</p>
                <p className="text-2xl font-semibold text-gray-900">{portfolioStats.activeAssets.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Locations</p>
                <p className="text-2xl font-semibold text-gray-900">{portfolioStats.locations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plant Inventory */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Plant Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plant ID</TableHead>
                <TableHead>Plant Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Technology</TableHead>
                <TableHead>Commission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plants.map((plant) => (
                <TableRow key={plant.id}>
                  <TableCell className="font-medium">{plant.id}</TableCell>
                  <TableCell>{plant.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {plant.location}
                    </div>
                  </TableCell>
                  <TableCell>{plant.capacity}</TableCell>
                  <TableCell>{plant.technology}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {plant.commissionDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={plant.status === "operational" ? "default" : "secondary"}
                      className={
                        plant.status === "operational"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {plant.status === "operational" ? "Operational" : "Maintenance"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Plant Details Cards */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {plants.slice(0, 2).map((plant) => (
          <Card key={plant.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">{plant.name} - Technical Details</CardTitle>
                <Badge
                  variant={plant.status === "operational" ? "default" : "secondary"}
                  className={
                    plant.status === "operational"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  }
                >
                  {plant.status === "operational" ? "Operational" : "Maintenance"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Plant ID</p>
                  <p className="text-sm font-medium text-gray-900">{plant.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Capacity</p>
                  <p className="text-sm font-medium text-gray-900">{plant.capacity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Location</p>
                  <p className="text-sm font-medium text-gray-900">{plant.location}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Commission Date</p>
                  <p className="text-sm font-medium text-gray-900">{plant.commissionDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Technology</p>
                  <p className="text-sm font-medium text-gray-900">{plant.technology}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Inverters</p>
                  <p className="text-sm font-medium text-gray-900">{plant.inverters} units</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Solar Modules</p>
                  <p className="text-sm font-medium text-gray-900">{plant.modules.toLocaleString()} units</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">O&M Contractor</p>
                  <p className="text-sm font-medium text-gray-900">{plant.contractor}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
}

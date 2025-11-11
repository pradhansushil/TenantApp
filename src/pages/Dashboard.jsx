import { useState } from "react";
import DashboardTenants from "../components/admin/dashboard/DashboardTenants";
import DashboardMaintenance from "../components/admin/dashboard/DashboardMaintenance";
import DashboardPayments from "../components/admin/dashboard/DashboardPayments";
import DashboardGraph from "../components/admin/dashboard/DashboardGraph";

export default function Dashboard() {
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleRefresh = () => setRefreshCounter((prev) => prev + 1);

  const handleViewAll = (section) => {
    console.log(`View all ${section}`);
    // Optionally navigate or open a modal/page here
  };

  return (
    <div className="dashboard-container p-6 space-y-8">
      {/* Widgets Grid */}
      <div className="dashboard-widgets grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardTenants
          onViewAll={handleViewAll}
          refreshCounter={refreshCounter}
        />
        <DashboardMaintenance
          onViewAll={handleViewAll}
          refreshCounter={refreshCounter}
        />
        <DashboardPayments
          onViewAll={handleViewAll}
          refreshCounter={refreshCounter}
        />
      </div>

      {/* Line Graph Section */}
      <div className="dashboard-graph mt-8">
        <DashboardGraph refreshCounter={refreshCounter} />
      </div>
    </div>
  );
}

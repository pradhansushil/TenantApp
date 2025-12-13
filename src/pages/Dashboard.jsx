// dashboard.jsx
// src/pages/

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
    <div className="dashboard-container">
      {/* Widgets Grid */}
      <div className="dashboard-widgets">
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
      <div className="dashboard-graph">
        <DashboardGraph refreshCounter={refreshCounter} />
      </div>
    </div>
  );
}

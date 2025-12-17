// dashboard.jsx
// src/pages/

import { useNavigate } from "react-router-dom";
import DashboardTenants from "../components/admin/dashboard/DashboardTenants";
import DashboardMaintenance from "../components/admin/dashboard/DashboardMaintenance";
import DashboardPayments from "../components/admin/dashboard/DashboardPayments";
import DashboardGraph from "../components/admin/dashboard/DashboardGraph";

// Route mapping - separation of concerns
const SECTION_ROUTES = {
  Tenants: "/admin/tenants",
  Maintenance: "/admin/maintenance",
  Payments: "/admin/payments",
};

export default function Dashboard({ refreshCounter }) {
  const navigate = useNavigate();

  const handleViewAll = (section) => {
    const route = SECTION_ROUTES[section];
    if (route) {
      navigate(route);
    }
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

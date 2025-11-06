import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Components
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminQuickActions from "../components/admin/AdminQuickActions";
import DashboardTenants from "../components/admin/dashboard/DashboardTenants";
import DashboardMaintenance from "../components/admin/dashboard/DashboardMaintenance";
import DashboardPayments from "../components/admin/dashboard/DashboardPayments";
import DashboardGraph from "../components/admin/dashboard/DashboardGraph";

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("Dashboard"); // track which section is active
  const navigate = useNavigate();

  // Check if the admin is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // user is logged in
      } else {
        navigate("/admin-login"); // redirect to login if not
      }
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [navigate]);

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin-login");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-container">
      {/* Header (welcome message + logout link) */}
      <AdminHeader user={user} handleLogout={handleLogout} />

      {/* Quick action buttons */}
      <AdminQuickActions />

      <div className="admin-body">
        {/* Sidebar navigation */}
        <AdminSidebar onSectionChange={setActiveSection} />

        {/* Main content area */}
        <main className="admin-main">
          {activeSection === "Dashboard" && (
            <>
              {/* Dashboard widgets */}
              <DashboardTenants onViewAll={() => setActiveSection("Tenants")} />
              <DashboardMaintenance
                onViewAll={() => setActiveSection("Maintenance")}
              />
              <DashboardPayments
                onViewAll={() => setActiveSection("Payments")}
              />
              <DashboardGraph />
              {/* Add more dashboard widgets here later */}
            </>
          )}

          {activeSection === "Tenants" && (
            <div className="tenants-page">
              {/* Replace with full tenants table/component later */}
              <p>Full Tenants Page Content Goes Here</p>
            </div>
          )}

          {activeSection === "Units" && (
            <div className="units-page">
              {/* Replace with full units management later */}
              <p>Full Units Page Content Goes Here</p>
            </div>
          )}

          {activeSection === "Payments" && (
            <div className="payments-page">
              {/* Replace with full payments management later */}
              <p>Full Payments Page Content Goes Here</p>
            </div>
          )}

          {activeSection === "Maintenance" && (
            <div className="maintenance-page">
              {/* Replace with full maintenance requests management later */}
              <p>Full Maintenance Page Content Goes Here</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

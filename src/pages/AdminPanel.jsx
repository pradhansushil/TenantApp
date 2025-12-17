// src/pages/AdminPanel.jsx
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Shared admin components
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminQuickActions from "../components/admin/AdminQuickActions";

// Admin pages
import Dashboard from "./Dashboard";
import Tenants from "./Tenants";
import Units from "./Units";
import Payments from "./Payments";
import Maintenance from "./Maintenance";

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Check auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/admin-login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin-login");
  };

  // Refresh handler
  const handleRefresh = () => {
    setRefreshCounter((prev) => prev + 1);
  };

  if (loading) return <p>Loading...</p>;

  // show quick actions only on /admin (dashboard)
  const isDashboard =
    location.pathname === "/admin" || location.pathname === "/admin/";

  return (
    <div className="admin-container">
      {/* Header visible on all admin pages */}
      <AdminHeader user={user} handleLogout={handleLogout} />

      <div className="admin-body">
        {/* Sidebar visible on all admin pages */}
        <AdminSidebar />

        {/* Main content area */}
        <main className="admin-main">
          {/* Only show quick actions on the dashboard */}
          {isDashboard && <AdminQuickActions onRefresh={handleRefresh} />}

          {/* Admin routes */}
          <Routes>
            <Route
              index
              element={<Dashboard refreshCounter={refreshCounter} />}
            />
            <Route path="tenants" element={<Tenants />} />
            <Route path="units" element={<Units />} />
            <Route path="payments" element={<Payments />} />
            <Route path="maintenance" element={<Maintenance />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Home } from "./pages/Home";
import TenantPortal from "./pages/TenantPortal";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

export function App() {
  const location = useLocation();

  // Only show Header and Footer if NOT on admin pages
  const showHeaderFooter = !location.pathname.startsWith("/admin");

  return (
    <div className="App">
      {showHeaderFooter && <Header />}

      <Routes>
        {/* Home page route */}
        <Route path="/" element={<Home />} />

        {/* Tenant Portal page route */}
        <Route path="/tenant-portal" element={<TenantPortal />} />

        {/* Admin Login route */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin dashboard route */}
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>

      {/* Footer only shows on public pages, not admin pages */}
      {showHeaderFooter && <Footer />}
    </div>
  );
}

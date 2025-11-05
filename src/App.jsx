import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"; // Footer will appear on all pages
import { Home } from "./pages/Home";
import TenantPortal from "./pages/TenantPortal";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

export function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        {/* Home page route */}
        <Route path="/" element={<Home />} />

        {/* Tenant Portal page route */}
        <Route path="/tenant-portal" element={<TenantPortal />} />

        {/* Admin Login route */}
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>

      {/* Footer outside Routes so it shows on all pages */}
      <Footer />
    </div>
  );
}

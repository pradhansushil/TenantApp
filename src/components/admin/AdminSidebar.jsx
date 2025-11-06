import { useState } from "react";

// Functional component for the admin sidebar
export default function AdminSidebar({ onSectionChange }) {
  // State to track which section is currently active
  const [activeSection, setActiveSection] = useState("Dashboard");

  // Handle clicking a sidebar link
  const handleLinkClick = (section) => {
    setActiveSection(section); // Update the active section state
    onSectionChange(section); // Notify parent (Admin.jsx) to render content
  };

  return (
    <aside className="admin-sidebar" aria-label="Sidebar navigation">
      <nav className="sidebar-nav" aria-label="Main navigation">
        <ul className="sidebar-list">
          {/* Dashboard Link */}
          <li
            className={`sidebar-item ${
              activeSection === "Dashboard" ? "active" : ""
            }`}
          >
            <a
              href="#dashboard"
              onClick={() => handleLinkClick("Dashboard")}
              className="sidebar-link"
            >
              Dashboard
            </a>
          </li>

          {/* Tenants Link */}
          <li
            className={`sidebar-item ${
              activeSection === "Tenants" ? "active" : ""
            }`}
          >
            <a
              href="#tenants"
              onClick={() => handleLinkClick("Tenants")}
              className="sidebar-link"
            >
              Tenants
            </a>
          </li>

          {/* Units Link */}
          <li
            className={`sidebar-item ${
              activeSection === "Units" ? "active" : ""
            }`}
          >
            <a
              href="#units"
              onClick={() => handleLinkClick("Units")}
              className="sidebar-link"
            >
              Units
            </a>
          </li>

          {/* Payments Link */}
          <li
            className={`sidebar-item ${
              activeSection === "Payments" ? "active" : ""
            }`}
          >
            <a
              href="#payments"
              onClick={() => handleLinkClick("Payments")}
              className="sidebar-link"
            >
              Payments
            </a>
          </li>

          {/* Maintenance Link */}
          <li
            className={`sidebar-item ${
              activeSection === "Maintenance" ? "active" : ""
            }`}
          >
            <a
              href="#maintenance"
              onClick={() => handleLinkClick("Maintenance")}
              className="sidebar-link"
            >
              Maintenance
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

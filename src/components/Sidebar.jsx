import React, { useState } from "react";

const Sidebar = () => {
  // State to track which link is currently active
  const [activeLink, setActiveLink] = useState("Dashboard");

  // Function to handle link click
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    // Semantic <aside> for sidebar
    <aside className="sidebar" aria-label="Sidebar navigation">
      {/* Semantic <nav> for navigation links */}
      <nav className="sidebar-nav" aria-label="Main navigation">
        <ul className="sidebar-list">
          {/* Dashboard Link */}
          <li
            className={`sidebar-item ${
              activeLink === "Dashboard" ? "active" : ""
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
              activeLink === "Tenants" ? "active" : ""
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
            className={`sidebar-item ${activeLink === "Units" ? "active" : ""}`}
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
              activeLink === "Payments" ? "active" : ""
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
              activeLink === "Maintenance" ? "active" : ""
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

          {/* Analytics Link */}
          <li
            className={`sidebar-item ${
              activeLink === "Analytics" ? "active" : ""
            }`}
          >
            <a
              href="#analytics"
              onClick={() => handleLinkClick("Analytics")}
              className="sidebar-link"
            >
              Analytics
            </a>
          </li>

          {/* Settings Link */}
          <li
            className={`sidebar-item ${
              activeLink === "Settings" ? "active" : ""
            }`}
          >
            <a
              href="#settings"
              onClick={() => handleLinkClick("Settings")}
              className="sidebar-link"
            >
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

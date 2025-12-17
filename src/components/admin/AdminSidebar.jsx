import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const links = [
    { name: "Dashboard", path: "/admin", end: true },
    { name: "Tenants", path: "/admin/tenants" },
    { name: "Units", path: "/admin/units" },
    { name: "Payments", path: "/admin/payments" },
    { name: "Maintenance", path: "/admin/maintenance" },
  ];

  return (
    <aside className="admin-sidebar">
      <ul className="sidebar-list">
        {links.map((link) => (
          <li key={link.name} className="sidebar-item">
            <NavLink
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

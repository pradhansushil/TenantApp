import { useEffect, useState } from "react";

export default function DashboardTenants({ onViewAll }) {
  const [latestTenants, setLatestTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const SHEETDB_URL = "https://sheetdb.io/api/v1/trs7w2oteqnyc"; // your SheetDB URL

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const res = await fetch(SHEETDB_URL);
        const data = await res.json();

        // Filter tenant rows and map to displayable format
        const tenantRows = data
          .filter((item) => item.Type_Tenant === "Tenant")
          .map((item) => ({
            tenantID: item.TenantID || `T-${Date.now()}`, // fallback if not in sheet
            name: item.Name,
            unit: item.Unit_Tenant,
            moveInDate: item.MoveInDate,
            phone: item.Phone,
            timestamp: item.Tenant_Timestamp || "1970-01-01T00:00:00.000Z", // for sorting
          }));

        setLatestTenants(tenantRows);
      } catch (err) {
        console.error("Error fetching tenant data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  if (loading) return <p>Loading tenants...</p>;

  // Sort by newest timestamp first
  const sortedTenants = [...latestTenants].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  // Limit to 2 latest tenants
  const displayedTenants = sortedTenants.slice(0, 2);

  return (
    <section
      className="dashboard-tenants"
      aria-labelledby="dashboard-tenants-heading"
    >
      <h2 id="dashboard-tenants-heading">Tenants</h2>

      {latestTenants.length > 0 ? (
        <table className="tenant-table">
          <thead>
            <tr>
              <th>TenantID</th>
              <th>Name</th>
              <th>Unit #</th>
              <th>MoveInDate</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {displayedTenants.map((tenant) => (
              <tr key={tenant.tenantID}>
                <td>{tenant.tenantID}</td>
                <td>{tenant.name}</td>
                <td>{tenant.unit}</td>
                <td>{tenant.moveInDate}</td>
                <td>{tenant.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tenants present</p>
      )}

      <a
        href="#"
        className="view-all-link"
        onClick={(e) => {
          e.preventDefault();
          if (onViewAll) onViewAll("Tenants");
        }}
      >
        View All
      </a>
    </section>
  );
}

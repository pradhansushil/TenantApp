import { useEffect, useState } from "react";

export default function DashboardTenants({ onViewAll, refreshCounter }) {
  const [latestTenants, setLatestTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const SHEETDB_URL = "https://sheetdb.io/api/v1/trs7w2oteqnyc?sheet=Tenants";

  useEffect(() => {
    const fetchTenants = async () => {
      setLoading(true); // start loading whenever refreshCounter changes
      try {
        const res = await fetch(SHEETDB_URL);
        const data = await res.json();

        // Map to displayable format
        const tenantRows = data.map((item) => ({
          tenantID: item.TenantID || `T-${Date.now()}`,
          name: item.Name,
          unit: item.Unit,
          moveInDate: item.MoveInDate,
          phone: item.Phone,
          timestamp: item.Timestamp || "1970-01-01T00:00:00.000Z",
        }));

        setLatestTenants(tenantRows);
      } catch (err) {
        console.error("Error fetching tenant data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, [refreshCounter]); // <--- added dependency here

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

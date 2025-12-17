import { useEffect, useState } from "react";
import { SHEETDB_URL, SHEETS } from "../../../utils/api";

export default function DashboardTenants({ onViewAll, refreshCounter }) {
  const [latestTenants, setLatestTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenants = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${SHEETDB_URL}?sheet=${SHEETS.TENANTS}`);
        const data = await res.json();

        const tenantRows = data.map((item) => ({
          tenantID: item.TenantID || `T-${Date.now()}`,
          name: item.Name,
          unit: item.Unit,
          moveInDate: item.MoveInDate,
          phone: item.Phone,
          timestamp: item.Timestamp || "1970-01-01T00:00:00.000Z",
        }));

        setLatestTenants(tenantRows);
      } catch {
        setError("Failed to load tenants. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, [refreshCounter]);

  if (loading) return <p>Loading tenants...</p>;

  if (error) return <p className="error">{error}</p>;

  const sortedTenants = [...latestTenants].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

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

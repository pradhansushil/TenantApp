import { useEffect, useState } from "react";
import { SHEETDB_URL, SHEETS } from "../../../utils/api";

export default function DashboardMaintenance({ onViewAll, refreshCounter }) {
  const [latestRequests, setLatestRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${SHEETDB_URL}?sheet=${SHEETS.MAINTENANCE}`);

        if (!res.ok) {
          throw new Error("Failed to fetch maintenance requests");
        }

        const data = await res.json();

        const maintenanceRows = data.map((item) => ({
          maintenanceID: item.MaintenanceID,
          tenantName: item.TenantName,
          unitNumber: item.Unit,
          details: item.Description,
          dateSubmitted: item.DateSubmitted || "N/A",
          timestamp: item.Timestamp || "1970-01-01T00:00:00.000Z",
        }));

        setLatestRequests(maintenanceRows);
      } catch (err) {
        setError("Failed to fetch maintenance requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [refreshCounter]);

  if (loading) return <p>Loading maintenance requests...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const sortedRequests = [...latestRequests].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const displayedRequests = sortedRequests.slice(0, 2);

  return (
    <section
      className="dashboard-maintenance"
      aria-labelledby="dashboard-maintenance-heading"
    >
      <h2 id="dashboard-maintenance-heading">Maintenance Requests</h2>

      {latestRequests.length > 0 ? (
        <table className="maintenance-table">
          <thead>
            <tr>
              <th>MaintenanceID</th>
              <th>Tenant Name</th>
              <th>Unit #</th>
              <th>Request Details</th>
              <th>Date Submitted</th>
            </tr>
          </thead>
          <tbody>
            {displayedRequests.map((request) => (
              <tr key={request.maintenanceID}>
                <td>{request.maintenanceID}</td>
                <td>{request.tenantName}</td>
                <td>{request.unitNumber}</td>
                <td>{request.details}</td>
                <td>{request.dateSubmitted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No maintenance requests present</p>
      )}

      <a
        href="#"
        className="view-all-link"
        onClick={(e) => {
          e.preventDefault();
          if (onViewAll) onViewAll("Maintenance");
        }}
      >
        View All
      </a>
    </section>
  );
}

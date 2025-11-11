import { useEffect, useState } from "react";

export default function DashboardMaintenance({ onViewAll, refreshCounter }) {
  const [latestRequests, setLatestRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const SHEETDB_URL =
    "https://sheetdb.io/api/v1/trs7w2oteqnyc?sheet=Maintenance";

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true); // show loading on refresh
      try {
        const res = await fetch(SHEETDB_URL);
        const data = await res.json();

        // Map to displayable format
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
        console.error("Error fetching maintenance data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [refreshCounter]); // <-- added dependency

  if (loading) return <p>Loading maintenance requests...</p>;

  // Sort by newest timestamp first
  const sortedRequests = [...latestRequests].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  // Limit to 2 latest requests
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

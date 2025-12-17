const MaintenanceTable = ({ requests }) => {
  if (requests.length === 0) {
    return (
      <div className="empty-state">
        <p>No maintenance requests match your filters.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tenant Name</th>
            <th>Unit #</th>
            <th>Issue Details</th>
            <th>Date Submitted</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req.MaintenanceID}>
              <td>{req.MaintenanceID}</td>
              <td>{req.TenantName}</td>
              <td>{req.Unit}</td>
              <td>{req.Description}</td>
              <td>{req.DateSubmitted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceTable;

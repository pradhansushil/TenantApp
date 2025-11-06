export default function AdminQuickActions() {
  // Handler for Add Tenant button
  const handleAddTenant = () => {
    console.log("Add Tenant clicked");
  };

  // Handler for Remove Tenant button
  const handleRemoveTenant = () => {
    console.log("Remove Tenant clicked");
  };

  // Handler for Refresh Data button
  const handleRefreshData = () => {
    console.log("Refresh Data clicked");
  };

  return (
    // Container div for quick action buttons
    <div className="admin-quick-actions">
      {/* Add Tenant Button */}
      <button onClick={handleAddTenant}>Add Tenant</button>

      {/* Remove Tenant Button */}
      <button onClick={handleRemoveTenant}>Remove Tenant</button>

      {/* Refresh Data Button */}
      <button onClick={handleRefreshData}>Refresh Data</button>
    </div>
  );
}

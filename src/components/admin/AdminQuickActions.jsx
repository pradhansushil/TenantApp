import { useState } from "react";
import TenantModal from "./dashboard/TenantModal";
import RemoveTenantModal from "./dashboard/RemoveTenantModal";
import Toast from "../Toasts";

export default function AdminQuickActions({ onRefresh }) {
  const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const clearToast = () => {
    setToast({ message: "", type: "success" });
  };

  const handleAddTenant = () => {
    setIsTenantModalOpen(true);
  };

  const handleRemoveTenant = () => {
    setIsRemoveModalOpen(true);
  };

  const handleRefreshData = () => {
    if (onRefresh) onRefresh();
  };

  const handleTenantSubmit = (savedTenant) => {
    showToast("Tenant added successfully", "success");
    handleRefreshData();
  };

  const handleTenantError = (errorMessage) => {
    showToast(errorMessage || "Failed to add tenant", "error");
  };

  const handleTenantRemoved = () => {
    showToast("Tenant removed successfully", "success");
    handleRefreshData();
  };

  const handleRemoveError = (errorMessage) => {
    showToast(errorMessage || "Failed to remove tenant", "error");
  };

  return (
    <div className="admin-quick-actions">
      <Toast message={toast.message} type={toast.type} onClose={clearToast} />

      <button onClick={handleAddTenant}>Add Tenant</button>
      <button onClick={handleRemoveTenant}>Remove Tenant</button>
      <button onClick={handleRefreshData}>Refresh Data</button>

      <TenantModal
        isOpen={isTenantModalOpen}
        onClose={() => setIsTenantModalOpen(false)}
        onSubmit={handleTenantSubmit}
        onError={handleTenantError}
      />

      <RemoveTenantModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onSuccess={handleTenantRemoved}
        onError={handleRemoveError}
      />
    </div>
  );
}

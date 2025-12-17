// AdminQuickActions.jsx
// Handles: Orchestration of tenant operations and modal flow
// Responsibility: Business logic, state management, API calls

import { useState } from "react";
import TenantModal from "./dashboard/TenantModal";
import RemoveTenantModal from "./dashboard/RemoveTenantModal";
import ConfirmDialog from "../ConfirmDialog";
import Toast from "../Toasts";

export default function AdminQuickActions({ onRefresh }) {
  // Modal states
  const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Business logic states
  const [pendingRemoval, setPendingRemoval] = useState(null);
  const [loading, setLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const clearToast = () => {
    setToast({ message: "", type: "success" });
  };

  // Quick action button handlers
  const handleAddTenant = () => {
    setIsTenantModalOpen(true);
  };

  const handleRemoveTenant = () => {
    setIsRemoveModalOpen(true);
  };

  const handleRefreshData = () => {
    if (onRefresh) onRefresh();
  };

  // Add tenant flow handlers
  const handleTenantSubmit = (savedTenant) => {
    showToast("Tenant added successfully", "success");
  };

  const handleTenantError = (errorMessage) => {
    showToast(errorMessage || "Failed to add tenant", "error");
  };

  // Remove tenant flow handlers
  const handleProceedToConfirm = (removalData) => {
    // Close the remove modal
    setIsRemoveModalOpen(false);

    // Store the data for deletion
    setPendingRemoval(removalData);

    // Open confirmation dialog
    setIsConfirmOpen(true);
  };

  const handleConfirmRemove = async () => {
    setLoading(true);

    try {
      const SHEETDB_URL = "https://sheetdb.io/api/v1/trs7w2oteqnyc";
      const query = `column=${encodeURIComponent(
        pendingRemoval.column
      )}&value=${encodeURIComponent(pendingRemoval.value)}`;

      const response = await fetch(`${SHEETDB_URL}?${query}`, {
        method: "DELETE",
      });

      if (response.ok) {
        showToast("Tenant removed successfully", "success");
        setIsConfirmOpen(false);
        setPendingRemoval(null);
      } else {
        const errorMsg = "No matching tenant found or failed to delete.";
        showToast(errorMsg, "error");
        setIsConfirmOpen(false);
        setPendingRemoval(null);
      }
    } catch (err) {
      const errorMsg = "An error occurred while removing the tenant.";
      showToast(errorMsg, "error");
      setIsConfirmOpen(false);
      setPendingRemoval(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelConfirm = () => {
    setIsConfirmOpen(false);
    setPendingRemoval(null);
    // User returns to dashboard - could optionally reopen remove modal here
  };

  return (
    <div className="admin-quick-actions">
      <Toast message={toast.message} type={toast.type} onClose={clearToast} />

      <button onClick={handleAddTenant}>Add Tenant</button>
      <button onClick={handleRemoveTenant}>Remove Tenant</button>
      <button onClick={handleRefreshData}>Refresh Data</button>

      {/* Add Tenant Modal */}
      <TenantModal
        isOpen={isTenantModalOpen}
        onClose={() => setIsTenantModalOpen(false)}
        onSubmit={handleTenantSubmit}
        onError={handleTenantError}
      />

      {/* Remove Tenant Modal */}
      <RemoveTenantModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onProceedToConfirm={handleProceedToConfirm}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelConfirm}
        title="Confirm Tenant Removal"
        message="Are you sure you want to remove this tenant? This action cannot be undone."
        confirmText="Yes, Remove"
        cancelText="Cancel"
        loading={loading}
      />
    </div>
  );
}

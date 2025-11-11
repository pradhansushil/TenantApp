import React, { useState } from "react";
import { deleteTenant } from "../../../services/tenantService.js";

export default function DeleteTenantModal({
  isOpen,
  onClose,
  tenantData,
  onDelete,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !tenantData) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTenant(tenantData.TenantID);
      onDelete?.(tenantData.TenantID); // Callback to remove tenant from state
      onClose?.();
    } catch (err) {
      console.error("Failed to delete tenant:", err);
      alert("There was an error deleting the tenant.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => onClose?.()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Delete Tenant</h2>
          <button className="close-button" onClick={() => onClose?.()}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <p>
            Are you sure you want to delete <strong>{tenantData.Name}</strong>{" "}
            (Unit {tenantData.Unit_Tenant})?
          </p>
        </div>

        <div className="modal-actions">
          <button onClick={() => onClose?.()} disabled={isDeleting}>
            Cancel
          </button>
          <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

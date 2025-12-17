import React, { useState } from "react";
import { deleteTenant } from "../../../services/tenantService.js";

export default function DeleteTenantModal({
  isOpen,
  onClose,
  tenantData,
  onDelete,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !tenantData) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null); // reset previous error
    try {
      await deleteTenant(tenantData.TenantID);
      onDelete?.(tenantData.TenantID);
      onClose?.();
    } catch {
      setError("Failed to delete tenant. Please try again.");
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
          {error && <p className="error-message">{error}</p>}
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

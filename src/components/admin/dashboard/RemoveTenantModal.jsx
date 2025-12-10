// For Remove Tenant Button
// Added X for the modal

import { useState } from "react";
import ConfirmDialog from "../../ConfirmDialog";

export default function RemoveTenantModal({
  isOpen,
  onClose,
  onSuccess,
  onError,
}) {
  const [tenantID, setTenantID] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingRemoval, setPendingRemoval] = useState(null);

  if (!isOpen) return null;

  const handleRemove = (e) => {
    e.preventDefault();
    setError("");

    if (!tenantID && !fullName) {
      setError("Please enter either Tenant ID or Full Name.");
      return;
    }

    // Store what we're about to delete
    let column = "";
    let value = "";
    if (tenantID) {
      column = "TenantID";
      value = tenantID.trim();
    } else if (fullName) {
      column = "Name";
      value = fullName.trim();
    }

    setPendingRemoval({ column, value });
    setIsConfirmOpen(true);
  };

  const handleConfirmRemove = async () => {
    setLoading(true);
    setIsConfirmOpen(false);

    try {
      const SHEETDB_URL = "https://sheetdb.io/api/v1/trs7w2oteqnyc";

      const query = `column=${encodeURIComponent(
        pendingRemoval.column
      )}&value=${encodeURIComponent(pendingRemoval.value)}`;

      const response = await fetch(`${SHEETDB_URL}?${query}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onSuccess?.();
        setTenantID("");
        setFullName("");
        setPendingRemoval(null);
        onClose();
      } else {
        const errorMsg = "No matching tenant found or failed to delete.";
        setError(errorMsg);
        onError?.(errorMsg);
      }
    } catch (err) {
      const errorMsg = "An error occurred while removing the tenant.";
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRemove = () => {
    setIsConfirmOpen(false);
    setPendingRemoval(null);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Remove Tenant</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleRemove} className="modal-body">
          <div>
            <label>Tenant ID</label>
            <input
              type="text"
              placeholder="Enter Tenant ID"
              value={tenantID}
              onChange={(e) => setTenantID(e.target.value)}
            />
          </div>

          <div>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>

            <button type="submit" className="remove-btn" disabled={loading}>
              {loading ? "Removing..." : "Remove Tenant"}
            </button>
          </div>
        </form>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
        title="Confirm Tenant Removal"
        message="Are you sure you want to remove this tenant? This action cannot be undone."
        confirmText="Yes, Remove"
        cancelText="Cancel"
      />
    </div>
  );
}

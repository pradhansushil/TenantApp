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
    setIsConfirmOpen(false); // Close the confirm dialog

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
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Remove Tenant</h2>

        <form onSubmit={handleRemove} className="modal-form">
          <input
            type="text"
            placeholder="Tenant ID"
            value={tenantID}
            onChange={(e) => setTenantID(e.target.value)}
            className="modal-input"
          />

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="modal-input"
          />

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="modal-btn cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="modal-btn remove-btn"
              disabled={loading}
            >
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

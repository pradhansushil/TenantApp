import { useState } from "react";

export default function RemoveTenantModal({ isOpen, onClose }) {
  const [tenantID, setTenantID] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleRemove = async (e) => {
    e.preventDefault();
    setError("");

    if (!tenantID && !fullName) {
      setError("Please enter either Tenant ID or Full Name.");
      return;
    }

    setLoading(true);

    try {
      const SHEETDB_URL = "https://sheetdb.io/api/v1/trs7w2oteqnyc";

      // Determine which column/value to use
      let column = "";
      let value = "";
      if (tenantID) {
        column = "TenantID";
        value = tenantID.trim();
      } else if (fullName) {
        column = "Name";
        value = fullName.trim();
      }

      // Build query string for SheetDB DELETE
      const query = `column=${encodeURIComponent(
        column
      )}&value=${encodeURIComponent(value)}`;

      const response = await fetch(`${SHEETDB_URL}?${query}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onSuccess?.();
        setTenantID("");
        setFullName("");
        onClose();
      } else {
        setError("No matching tenant found or failed to delete.");
      }
    } catch (err) {
      setError("An error occurred while removing the tenant.");
    } finally {
      setLoading(false);
    }
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
    </div>
  );
}

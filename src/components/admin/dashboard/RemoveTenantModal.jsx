import { useState } from "react";

export default function RemoveTenantModal({
  isOpen,
  onClose,
  onProceedToConfirm,
}) {
  const [tenantID, setTenantID] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    setError("");

    if (!tenantID && !fullName) {
      setError("Please enter either Tenant ID or Full Name.");
      return;
    }

    let column = "";
    let value = "";
    if (tenantID) {
      column = "TenantID";
      value = tenantID.trim();
    } else if (fullName) {
      column = "Name";
      value = fullName.trim();
    }

    onProceedToConfirm({ column, value });

    setTenantID("");
    setFullName("");
    setError("");
  };

  const handleClose = () => {
    setTenantID("");
    setFullName("");
    setError("");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Remove Tenant</h2>
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
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
            <button type="button" onClick={handleClose}>
              Cancel
            </button>

            <button className="remove-btn" onClick={handleSubmit}>
              Remove Tenant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

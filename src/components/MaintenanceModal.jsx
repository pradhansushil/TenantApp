import { useState } from "react";
import { addMaintenanceRequest } from "../services/maintenanceService";

export default function MaintenanceModal({
  isOpen,
  onClose,
  setToastMessage,
  setToastType,
}) {
  const [tenantName, setTenantName] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Guard clause: only render if open
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!tenantName.trim()) throw new Error("Enter your name.");
      if (!unitNumber.trim()) throw new Error("Enter your unit number.");
      if (!details.trim()) throw new Error("Describe the issue.");

      const now = new Date();
      const timestamp = now.toISOString();
      const dateSubmitted = `${
        now.getMonth() + 1
      }/${now.getDate()}/${now.getFullYear()}`;

      const payload = {
        MaintenanceID: `M-${Date.now()}`,
        TenantName: tenantName.trim(),
        Unit: unitNumber.trim(),
        Description: details.trim(),
        DateSubmitted: dateSubmitted,
        Timestamp: timestamp,
      };

      await addMaintenanceRequest(payload);

      // Show global success toast
      setToastType("success");
      setToastMessage("Maintenance request submitted successfully!");

      setTimeout(() => onClose(), 1500);
    } catch (err) {
      // Show global error toast
      setToastType("error");
      setToastMessage(err.message || "Error submitting maintenance request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Maintenance Request</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <div>
            <label>Your Name *</label>
            <input
              type="text"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Unit Number *</label>
            <input
              type="text"
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Describe the Issue *</label>
            <textarea
              rows="4"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

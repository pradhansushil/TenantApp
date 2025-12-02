import { useState } from "react";
import { addMaintenanceRequest } from "../services/maintenanceService";

export default function MaintenanceModal({
  onClose,
  setToastMessage,
  setToastType,
}) {
  const [tenantName, setTenantName] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      // ✅ Show global success toast
      setToastType("success");
      setToastMessage("Maintenance request submitted successfully!");

      setTimeout(() => onClose(), 1500);
    } catch (err) {
      // ✅ Show global error toast
      setToastType("error");
      setToastMessage(err.message || "Error submitting maintenance request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
        }}
      >
        <h2>Maintenance Request</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Your Name</label>
            <input
              type="text"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Unit Number</label>
            <input
              type="text"
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Describe the Issue</label>
            <textarea
              rows="4"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ marginRight: "10px" }}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>

          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

// src/components/admin/TenantModal.jsx
import { useState, useEffect } from "react";
import { addTenant, editTenant } from "../../../utils/tenantHelperFunctions";

export default function TenantModal({
  isOpen,
  onClose,
  onSubmit,
  tenantData = null,
}) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [phone, setPhone] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setUnit("");
    setPhone("");
    setMoveInDate("");
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
      return;
    }
    if (tenantData) {
      setName(tenantData.Name || "");
      setUnit(tenantData.Unit_Tenant || "");
      setPhone(tenantData.Phone || "");
      setMoveInDate(tenantData.MoveInDate || "");
    } else {
      resetForm();
    }
  }, [tenantData, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const tenantPayload = {
      Name: name,
      Unit_Tenant: unit,
      Phone: phone,
      MoveInDate: moveInDate,
    };

    try {
      let savedTenant;
      if (tenantData?.TenantID) {
        savedTenant = await editTenant(tenantData.TenantID, tenantPayload);
      } else {
        savedTenant = await addTenant(tenantPayload);
      }
      onSubmit?.(savedTenant);
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message || "Error saving tenant.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{tenantData ? "Edit Tenant" : "Add Tenant"}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <div>
            <label>Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Unit Number</label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label>Move-in Date</label>
            <input
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? tenantData
                  ? "Saving..."
                  : "Adding..."
                : tenantData
                ? "Save Changes"
                : "Add Tenant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

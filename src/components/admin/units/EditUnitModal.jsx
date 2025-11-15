import { useState, useEffect } from "react";

export function EditUnitModal({ isOpen, onClose, unit, onUpdate }) {
  const [unitNumber, setUnitNumber] = useState("");
  const [status, setStatus] = useState("Vacant");
  const [tenantName, setTenantName] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [rent, setRent] = useState("");
  const [notes, setNotes] = useState("");

  // When modal opens or unit changes, pre-fill form
  useEffect(() => {
    if (isOpen && unit) {
      setUnitNumber(unit.UnitNumber || "");
      setStatus(unit.Status || "Vacant");
      setTenantName(unit.TenantName || "");
      setMoveInDate(unit.MoveInDate || "");
      setRent(unit.Rent || "");
      setNotes(unit.Notes || "");
    }
  }, [isOpen, unit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUnit = {
      ...unit,
      UnitNumber: unitNumber,
      Status: status,
      TenantName: tenantName || "",
      MoveInDate: moveInDate || "",
      Rent: rent || "",
      Notes: notes || "",
    };
    onUpdate(updatedUnit);
    onClose();
  };

  if (!isOpen || !unit) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Unit</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Unit Number:
            <input
              type="text"
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
              required
            />
          </label>

          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Vacant">Vacant</option>
              <option value="Occupied">Occupied</option>
            </select>
          </label>

          <label>
            Tenant Name:
            <input
              type="text"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
            />
          </label>

          <label>
            Move-in Date:
            <input
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
            />
          </label>

          <label>
            Rent:
            <input
              type="number"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
            />
          </label>

          <label>
            Notes:
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>

          <div className="modal-actions">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

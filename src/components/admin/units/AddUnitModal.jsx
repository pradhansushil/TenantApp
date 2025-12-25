import { useState, useEffect } from "react";

export function AddUnitModal({ isOpen, onClose, onAdd }) {
  const [unitNumber, setUnitNumber] = useState("");
  const [status, setStatus] = useState("Vacant");
  const [tenantName, setTenantName] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [rent, setRent] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isOpen) {
      setUnitNumber("");
      setStatus("Vacant");
      setTenantName("");
      setMoveInDate("");
      setRent("");
      setNotes("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      UnitNumber: unitNumber,
      Status: status,
      TenantName: tenantName || "",
      MoveInDate: moveInDate || "",
      Rent: rent || "",
      Notes: notes || "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Unit</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
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
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
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
              <button type="submit">Add Unit</button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

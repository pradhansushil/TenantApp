import { useState, useEffect } from "react";

export function EditUnitModal({ isOpen, onClose, onAdd }) {
  const [unitNumber, setUnitNumber] = useState("");
  const [status, setStatus] = useState("Vacant");
  const [tenantName, setTenantName] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [rent, setRent] = useState("");
  const [notes, setNotes] = useState("");

  // Reset all form fields whenever the modal is opened
  // Ensures previous input does not persist when editing a different unit
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

  // Handle form submission: send unit data to parent and close modal
  // Default to empty strings for optional fields if left blank
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

  // Do not render modal if it is not open
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Unit</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {/* Controlled form inputs: local state updates on user input */}
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
              <button type="submit">Save Changes</button>
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

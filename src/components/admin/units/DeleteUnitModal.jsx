export function DeleteUnitModal({ isOpen, onClose, unit, onDelete }) {
  if (!isOpen || !unit) return null;

  const handleConfirm = () => {
    onDelete(unit.UnitID);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Delete Unit</h2>
        <p>
          Are you sure you want to delete unit{" "}
          <strong>{unit.UnitNumber}</strong>?
        </p>
        <div className="modal-actions">
          <button onClick={handleConfirm}>Yes, Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

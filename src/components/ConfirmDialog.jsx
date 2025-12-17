// ConfirmDialog.jsx
// Handles: Generic reusable confirmation dialog
// Responsibility: Display confirmation UI only

export default function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <h2>{title}</h2>
        <p>{message}</p>

        <div className="confirm-dialog-buttons">
          <button onClick={onCancel} disabled={loading}>
            {cancelText}
          </button>

          <button onClick={onConfirm} disabled={loading}>
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

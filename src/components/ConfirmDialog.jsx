export default function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  // Don't render anything if dialog is closed
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        {/* Title */}
        <h2>{title}</h2>

        {/* Message */}
        <p>{message}</p>

        {/* Action Buttons */}
        <div className="confirm-dialog-buttons">
          <button onClick={onCancel}>{cancelText}</button>

          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}

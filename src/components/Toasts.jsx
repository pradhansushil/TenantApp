import { useEffect } from "react";

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 4000,
}) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const styles = {
    container: {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "12px 20px",
      borderRadius: "6px",
      color: "#fff",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      zIndex: 9999,
      animation: "slideIn 0.3s ease",
      backgroundColor: type === "success" ? "#22c55e" : "#ef4444",
    },
    closeBtn: {
      background: "none",
      border: "none",
      color: "#fff",
      fontSize: "18px",
      cursor: "pointer",
      padding: 0,
      lineHeight: 1,
    },
  };

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
      <div style={styles.container} role="alert">
        <span>{message}</span>
        <button style={styles.closeBtn} onClick={onClose} aria-label="Dismiss">
          ×
        </button>
      </div>
    </>
  );
}

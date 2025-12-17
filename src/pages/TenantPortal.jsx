import { useState } from "react";
import MaintenanceModal from "../components/MaintenanceModal";
import PaymentModal from "../components/PaymentModal";
import Toast from "../components/Toasts";

export default function TenantPortal() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);

  // Toast State
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const closeToast = () => setToastMessage("");

  return (
    <>
      {/* Global Toast */}
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={closeToast} />
      )}

      <main className="tenant-portal">
        <div className="tenant-portal-container">
          <h1 className="tenant-portal-title">Tenant Portal</h1>
          <p className="tenant-portal-subtitle">
            Welcome! Use the options below to make a payment or submit a
            maintenance request.
          </p>

          <section className="tenant-portal-actions">
            <div className="tenant-action-card">
              <div className="tenant-action-icon">💳</div>
              <h2 className="tenant-action-title">Make Payment</h2>
              <p className="tenant-action-description">
                Submit your rent payment securely online.
              </p>
              <button
                className="btn btn-primary btn-large"
                onClick={() => setShowPaymentModal(true)}
              >
                Make Payment
              </button>
            </div>

            <div className="tenant-action-card">
              <div className="tenant-action-icon">🔧</div>
              <h2 className="tenant-action-title">Maintenance Request</h2>
              <p className="tenant-action-description">
                Report an issue that needs attention.
              </p>
              <button
                className="btn btn-secondary btn-large"
                onClick={() => setShowMaintenanceModal(true)}
              >
                Submit Request
              </button>
            </div>
          </section>

          {/* PAYMENT MODAL */}
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            setToastMessage={setToastMessage}
            setToastType={setToastType}
          />

          {/* MAINTENANCE MODAL */}
          <MaintenanceModal
            isOpen={showMaintenanceModal}
            onClose={() => setShowMaintenanceModal(false)}
            setToastMessage={setToastMessage}
            setToastType={setToastType}
          />
        </div>
      </main>
    </>
  );
}

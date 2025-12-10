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

      <main>
        <h1>Tenant Portal</h1>

        <section>
          <button onClick={() => setShowPaymentModal(true)}>
            Make Payment
          </button>
          <button onClick={() => setShowMaintenanceModal(true)}>
            Make Maintenance Request
          </button>

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
        </section>
      </main>
    </>
  );
}

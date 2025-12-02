import { useState } from "react";
import { addPayment } from "../services/paymentsService";
import {
  fetchAllPayments,
  updateDuePayment,
} from "../services/duePaymentService";
import MaintenanceModal from "../components/MaintenanceModal";
import Toast from "../components/Toasts";

export default function TenantPortal() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);

  const [tenantName, setTenantName] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("IPS");
  const [paymentReference, setPaymentReference] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ------------------------
  // 🔥 Toast State
  // ------------------------
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const closeToast = () => setToastMessage("");

  // ------------------------
  // Modal Toggles
  // ------------------------
  const togglePaymentModal = () => {
    setShowPaymentModal(!showPaymentModal);
    setTenantName("");
    setUnitNumber("");
    setPaymentAmount("");
    setPaymentMethod("IPS");
    setPaymentReference("");
  };

  const toggleMaintenanceModal = () => {
    setShowMaintenanceModal(!showMaintenanceModal);
  };

  // ------------------------
  // PAYMENT SUBMIT HANDLER
  // ------------------------
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!tenantName.trim()) throw new Error("Please enter your name.");
      if (!unitNumber.trim()) throw new Error("Please enter your unit number.");

      const amount = parseFloat(paymentAmount);
      if (isNaN(amount) || amount <= 0)
        throw new Error("Enter a valid payment amount.");

      const allDuePayments = await fetchAllPayments();

      const tenantPayments = allDuePayments.filter(
        (p) =>
          p.UnitNumber === unitNumber.trim() &&
          parseFloat(p.OwedAmount || 0) > 0
      );

      if (tenantPayments.length === 0)
        throw new Error("No unpaid balance found for this unit number.");

      tenantPayments.sort((a, b) => new Date(a.DueDate) - new Date(b.DueDate));
      const tenantDue = tenantPayments[0];

      const tenantID = tenantDue.TenantID;

      const today = new Date();
      const paymentDate = `${
        today.getMonth() + 1
      }/${today.getDate()}/${today.getFullYear()}`;

      const paymentPayload = {
        PaymentID: `P-${Date.now()}`,
        TenantID: tenantID,
        UnitNumber: unitNumber.trim(),
        PaymentDate: paymentDate,
        Amount: amount.toFixed(2),
        PaymentMethod: paymentMethod,
        Reference: paymentReference.trim() || "",
      };

      await addPayment(paymentPayload);

      const owedBefore = parseFloat(tenantDue.OwedAmount || 0);
      const newOwed = Math.max(0, owedBefore - amount);

      await updateDuePayment(tenantDue.DueID, {
        OwedAmount: newOwed.toFixed(2),
        Status: newOwed === 0 ? "Paid" : "Pending",
      });

      // ------------------------
      // 🔥 SUCCESS TOAST
      // ------------------------
      setToastType("success");
      setToastMessage(
        `Payment of $${amount.toFixed(2)} recorded successfully!`
      );

      setTimeout(() => togglePaymentModal(), 1500);
    } catch (err) {
      console.error(err);

      // ------------------------
      // 🔥 ERROR TOAST
      // ------------------------
      setToastType("error");
      setToastMessage(err.message || "Error processing payment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ------------------------
  // RENDER
  // ------------------------
  return (
    <>
      {/* 🔥 Global Toast */}
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={closeToast} />
      )}

      <main>
        <h1>Tenant Portal</h1>

        <section>
          <button onClick={togglePaymentModal}>Make Payment</button>
          <button onClick={toggleMaintenanceModal}>
            Make Maintenance Request
          </button>

          {/* ------------------------ */}
          {/* PAYMENT MODAL            */}
          {/* ------------------------ */}
          {showPaymentModal && (
            <div
              className="modal-overlay"
              onClick={togglePaymentModal}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 999,
              }}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  width: "350px",
                }}
              >
                <h2>Enter Payment</h2>

                <form onSubmit={handlePaymentSubmit}>
                  <div style={{ marginBottom: "10px" }}>
                    <label>Your Name</label>
                    <input
                      type="text"
                      value={tenantName}
                      onChange={(e) => setTenantName(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <label>Unit Number</label>
                    <input
                      type="text"
                      value={unitNumber}
                      onChange={(e) => setUnitNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <label>Payment Amount</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <label>Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="IPS">IPS</option>
                      <option value="eSewa">eSewa</option>
                      <option value="Bank">Bank</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <label>Reference / Notes</label>
                    <input
                      type="text"
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Submit Payment"}
                  </button>

                  <button type="button" onClick={togglePaymentModal}>
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ------------------------ */}
          {/* MAINTENANCE MODAL        */}
          {/* ------------------------ */}
          {showMaintenanceModal && (
            <MaintenanceModal
              onClose={toggleMaintenanceModal}
              setToastMessage={setToastMessage} // ✅ pass setter
              setToastType={setToastType} // ✅ pass setter
            />
          )}
        </section>
      </main>
    </>
  );
}

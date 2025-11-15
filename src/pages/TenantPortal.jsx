// src/components/tenant/TenantPortal.jsx
import { useState, useEffect } from "react";
import {
  fetchAllPayments,
  updateDuePayment,
} from "../services/duePaymentService";

export default function TenantPortal({ tenant }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("IPS");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentDue, setCurrentDue] = useState(null);

  const togglePaymentModal = () => {
    setShowPaymentModal(!showPaymentModal);
    setPaymentAmount("");
    setPaymentMethod("IPS");
    setPaymentStatus("");
  };

  // Fetch current due payment for this tenant
  useEffect(() => {
    const getTenantDue = async () => {
      try {
        const allPayments = await fetchAllPayments();
        const tenantDue = allPayments.find(
          (p) => p.TenantID === tenant.TenantID && parseFloat(p.OwedAmount) > 0
        );
        setCurrentDue(tenantDue || null);
      } catch (err) {
        console.error(err);
      }
    };
    getTenantDue();
  }, [tenant.TenantID]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPaymentStatus("Processing payment...");

    try {
      if (!currentDue) throw new Error("No due payment found for this tenant.");

      const amount = parseFloat(paymentAmount);
      if (isNaN(amount) || amount <= 0)
        throw new Error("Enter a valid payment amount.");

      const owedBefore = parseFloat(currentDue.OwedAmount || 0);
      const newOwed = Math.max(0, owedBefore - amount);

      const updatedData = {
        OwedAmount: newOwed.toFixed(2),
        Status: newOwed === 0 ? "Paid" : "Pending",
      };

      // Update Google Sheets DuePayments tab
      await updateDuePayment(currentDue.DueID, updatedData);

      setPaymentStatus(
        `Payment of $${amount.toFixed(2)} recorded successfully!`
      );
      setPaymentAmount("");
      setShowPaymentModal(false);
      setCurrentDue({ ...currentDue, ...updatedData });
    } catch (err) {
      console.error(err);
      setPaymentStatus(err.message || "Error processing payment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>Tenant Portal</h1>

      {currentDue ? (
        <p>
          Current owed amount:{" "}
          <span
            style={{
              color: parseFloat(currentDue.OwedAmount) > 0 ? "red" : "inherit",
            }}
          >
            ${parseFloat(currentDue.OwedAmount).toFixed(2)}
          </span>
        </p>
      ) : (
        <p>No pending payments.</p>
      )}

      <section>
        <button onClick={togglePaymentModal}>Make Payment</button>

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
                  <label>Unit Number</label>
                  <input
                    type="text"
                    value={tenant.Unit}
                    readOnly
                    style={{ width: "100%" }}
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
                    style={{ width: "100%" }}
                  />
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <label>Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ width: "100%" }}
                  >
                    <option value="IPS">IPS</option>
                    <option value="eSewa">eSewa</option>
                    <option value="Bank">Bank</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginRight: "10px" }}
                >
                  {isSubmitting ? "Processing..." : "Submit Payment"}
                </button>
                <button type="button" onClick={togglePaymentModal}>
                  Cancel
                </button>
              </form>

              {paymentStatus && (
                <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                  {paymentStatus}
                </p>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

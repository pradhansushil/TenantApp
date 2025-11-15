import { useState } from "react";

export default function DemoPaymentModal({ units, SHEETDB_URL }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unitNumber, setUnitNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!unitNumber || !amount) {
      alert("Unit and amount are required");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("Recording payment...");

    const paymentData = {
      data: {
        UnitNumber: unitNumber,
        PaymentDate: new Date().toISOString().split("T")[0],
        Amount: parseFloat(amount),
        PaymentMethod: "Demo",
        Reference: reference || "",
        // PeriodStart / PeriodEnd can be added here if needed later
      },
    };

    try {
      const res = await fetch(SHEETDB_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!res.ok) throw new Error("Network error");

      setStatusMessage("Payment recorded successfully! ✅");
      setUnitNumber("");
      setAmount("");
      setReference("");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      setStatusMessage("Failed to record payment. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Record Payment</button>

      {isOpen && (
        <div className="modal">
          <h2>Record Payment</h2>

          <label>
            Unit Number:
            <input
              type="text"
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
            />
          </label>

          <label>
            Amount:
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>

          <label>
            Reference (optional):
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </label>

          <div style={{ marginTop: "10px" }}>
            <button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Payment"}
            </button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>

          {statusMessage && <p>{statusMessage}</p>}
        </div>
      )}
    </>
  );
}

import { useState } from "react";

export default function PaymentModal({
  isOpen,
  onClose,
  units,
  SHEETDB_URL,
  onSuccess,
  onError,
}) {
  const [unitNumber, setUnitNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setUnitNumber("");
    setAmount("");
    setReference("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!unitNumber || !amount) {
      onError?.("Unit number and amount are required");
      return;
    }

    setIsSubmitting(true);

    const paymentData = {
      data: {
        UnitNumber: unitNumber,
        PaymentDate: new Date().toISOString().split("T")[0],
        Amount: parseFloat(amount),
        PaymentMethod: "Demo",
        Reference: reference || "",
        Timestamp: new Date().toISOString(),
      },
    };

    try {
      const res = await fetch(SHEETDB_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!res.ok) throw new Error("Network error");

      onSuccess?.("Payment recorded successfully!");
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      onError?.("Failed to record payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Record Payment</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <div>
            <label>Unit Number *</label>
            {units && units.length > 0 ? (
              <select
                value={unitNumber}
                onChange={(e) => setUnitNumber(e.target.value)}
                required
              >
                <option value="">Select a unit</option>
                {units.map((unit) => (
                  <option key={unit.UnitNumber} value={unit.UnitNumber}>
                    {unit.UnitNumber}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={unitNumber}
                onChange={(e) => setUnitNumber(e.target.value)}
                placeholder="Enter unit number"
                required
              />
            )}
          </div>

          <div>
            <label>Amount *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label>Reference (Optional)</label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Payment reference or note"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Recording..." : "Record Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

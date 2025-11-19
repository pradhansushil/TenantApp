import { useState, useEffect } from "react";

const SHEETDB_URL = "https://sheetdb.io/api/v1/trs7w2oteqnyc";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${SHEETDB_URL}?sheet=Payments`);

      if (!response.ok) {
        throw new Error("Failed to fetch payments");
      }

      const data = await response.json();
      setPayments(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading payments...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>All Payments</h1>

      {payments.length === 0 ? (
        <p>No payments yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Tenant ID</th>
              <th>Unit Number</th>
              <th>Payment Date</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment.PaymentID || index}>
                <td>{payment.PaymentID}</td>
                <td>{payment.TenantID}</td>
                <td>{payment.UnitNumber}</td>
                <td>{payment.PaymentDate}</td>
                <td>${parseFloat(payment.Amount || 0).toFixed(2)}</td>
                <td>{payment.PaymentMethod}</td>
                <td>{payment.Reference || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

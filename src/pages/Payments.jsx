import { useEffect, useState } from "react";
import { getAllPayments } from "../utils/paymentsHelperFunctions";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      const data = await getAllPayments();
      setPayments(data);
      setLoading(false);
    };
    fetchPayments();
  }, []);

  if (loading) return <p>Loading payments...</p>;

  return (
    <div>
      <h1>All Payments</h1>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>TenantID</th>
              <th>Tenant Name</th>
              <th>Unit Number</th>
              <th>Payment Date</th>
              <th>Amount</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, index) => (
              <tr key={index}>
                <td>{p.TenantID}</td>
                <td>{p.TenantName}</td>
                <td>{p.UnitNumber}</td>
                <td>{p.Date}</td>
                <td>{p.Amount}</td>
                <td>{p.Method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

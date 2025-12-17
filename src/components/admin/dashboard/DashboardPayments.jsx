import { useEffect, useState } from "react";
import { fetchAllPayments } from "../../../services/duePaymentService";

export default function DashboardPayments({ onViewAll, refreshCounter }) {
  const [duePayments, setDuePayments] = useState([]);

  useEffect(() => {
    const fetchDuePayments = async () => {
      try {
        const allPayments = await fetchAllPayments();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filtered = allPayments.filter((payment) => {
          const owedAmount = parseFloat(payment.OwedAmount || 0);
          if (owedAmount <= 0) return false;

          const dueDate = new Date(payment.DueDate);
          dueDate.setHours(0, 0, 0, 0);

          const gracePeriodDate = new Date(dueDate);
          gracePeriodDate.setDate(gracePeriodDate.getDate() + 7);

          const isOverdue = today > gracePeriodDate;
          const isCurrentMonthDue =
            dueDate.getFullYear() === today.getFullYear() &&
            dueDate.getMonth() === today.getMonth();

          return isCurrentMonthDue || isOverdue;
        });

        setDuePayments(filtered);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchDuePayments();
  }, [refreshCounter]);

  return (
    <section
      className="dashboard-payments"
      aria-labelledby="dashboard-payments-heading"
    >
      <h2 id="dashboard-payments-heading">Due / Overdue Payments</h2>

      {duePayments.length > 0 ? (
        <table className="payments-table">
          <thead>
            <tr>
              <th>Tenant Name</th>
              <th>Amount Due</th>
              <th>Owed Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {duePayments.map((payment, index) => {
              const owedAmount = parseFloat(payment.OwedAmount || 0);
              const roundedOwed = owedAmount.toFixed(2);
              const amountDue = parseFloat(payment.AmountDue || 0).toFixed(2);

              const dueDate = new Date(payment.DueDate);
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              const graceDate = new Date(dueDate);
              graceDate.setDate(graceDate.getDate() + 7);

              const status =
                owedAmount > 0
                  ? today > graceDate
                    ? "Overdue"
                    : "Due"
                  : "Paid";

              return (
                <tr key={index}>
                  <td>{payment.TenantName}</td>
                  <td>${amountDue}</td>
                  <td style={{ color: owedAmount > 0 ? "red" : "inherit" }}>
                    ${roundedOwed}
                  </td>
                  <td>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No payments currently due</p>
      )}

      <a
        href="#"
        className="view-all-link"
        onClick={(e) => {
          e.preventDefault();
          if (onViewAll) onViewAll("Payments");
        }}
      >
        View All
      </a>
    </section>
  );
}

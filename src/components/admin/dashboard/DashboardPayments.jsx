import React from "react";

// DashboardPayments component
// Props:
// - onViewAll: function to switch the active section to "Payments"
export default function DashboardPayments({ onViewAll }) {
  // Placeholder array for now; replace with actual data later
  const recentPayments = [
    // Example data for testing
    // { tenantName: "John Doe", unitNumber: "101", amount: 1200, date: "2025-11-01" },
    // { tenantName: "Jane Smith", unitNumber: "102", amount: 1500, date: "2025-11-03" },
  ];

  return (
    // Section wrapper with accessible labeling
    <section
      className="dashboard-payments"
      aria-labelledby="dashboard-payments-heading"
    >
      {/* Heading for the section */}
      <h2 id="dashboard-payments-heading">Recent Payments</h2>

      {/* Conditional rendering: if there are payments, show table; else show message */}
      {recentPayments.length > 0 ? (
        <table className="payments-table">
          <thead>
            <tr>
              <th>Tenant Name</th>
              <th>Unit #</th>
              <th>Amount</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Show only the first 2 latest payments */}
            {recentPayments.slice(0, 2).map((payment, index) => (
              <tr key={index}>
                <td>{payment.tenantName}</td>
                <td>{payment.unitNumber}</td>
                <td>${payment.amount}</td>
                <td>{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Message when there are no payments
        <p>No payments present</p>
      )}

      {/* "View All" link to trigger parent function */}
      <a
        href="#"
        className="view-all-link"
        onClick={(e) => {
          e.preventDefault(); // Prevent default link behavior
          if (onViewAll) onViewAll(); // Call prop function if provided
        }}
      >
        View All
      </a>
    </section>
  );
}

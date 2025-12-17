import { useState, useEffect } from "react";
import PaymentFilters from "../components/PaymentFilters";

const SHEETDB_URL = "https://sheetdb.io/api/v1/trs7w2oteqnyc";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchTenantID, setSearchTenantID] = useState("");
  const [searchUnit, setSearchUnit] = useState("");
  const [searchReference, setSearchReference] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [paymentFrom, setPaymentFrom] = useState("");
  const [paymentTo, setPaymentTo] = useState("");

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

  // Reset only filters (does not clear table data)
  const handleResetFilters = () => {
    setSearchTenantID("");
    setSearchUnit("");
    setSearchReference("");
    setPaymentMethodFilter("");
    setPaymentFrom("");
    setPaymentTo("");
  };

  // Filter payments before rendering
  const filteredPayments = payments
    .filter((p) => !searchTenantID || p.TenantID.includes(searchTenantID))
    .filter((p) => !searchUnit || p.UnitNumber.includes(searchUnit))
    .filter(
      (p) =>
        !searchReference ||
        (p.Reference || "")
          .toLowerCase()
          .includes(searchReference.toLowerCase())
    )
    .filter(
      (p) => !paymentMethodFilter || p.PaymentMethod === paymentMethodFilter
    )
    .filter((p) => {
      if (!paymentFrom && !paymentTo) return true;
      const paymentDate = new Date(p.PaymentDate);
      if (paymentFrom && paymentDate < new Date(paymentFrom)) return false;
      if (paymentTo && paymentDate > new Date(paymentTo)) return false;
      return true;
    });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Payment History</h1>
      </div>

      {/* Filters (with Reset button inside PaymentFilters) */}
      <PaymentFilters
        searchTenantID={searchTenantID}
        onSearchTenantIDChange={(e) => setSearchTenantID(e.target.value)}
        searchUnit={searchUnit}
        onSearchUnitChange={(e) => setSearchUnit(e.target.value)}
        searchReference={searchReference}
        onSearchReferenceChange={(e) => setSearchReference(e.target.value)}
        paymentMethodFilter={paymentMethodFilter}
        onPaymentMethodFilterChange={(e) =>
          setPaymentMethodFilter(e.target.value)
        }
        paymentFrom={paymentFrom}
        onPaymentFromChange={(e) => setPaymentFrom(e.target.value)}
        paymentTo={paymentTo}
        onPaymentToChange={(e) => setPaymentTo(e.target.value)}
        onResetFilters={handleResetFilters}
      />

      {loading ? (
        <div className="loading-state">
          <p>Loading payments...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
        </div>
      ) : filteredPayments.length === 0 ? (
        <div className="empty-state">
          <p>No payments found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
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
              {filteredPayments.map((payment, index) => (
                <tr key={payment.PaymentID || index}>
                  <td>{payment.PaymentID}</td>
                  <td>{payment.TenantID}</td>
                  <td>{payment.UnitNumber}</td>
                  <td>{payment.PaymentDate}</td>
                  <td>${parseFloat(payment.Amount || 0).toFixed(2)}</td>
                  <td>
                    <span
                      className={`badge badge-${
                        payment.PaymentMethod?.toLowerCase().replace(
                          /\s+/g,
                          "-"
                        ) || "default"
                      }`}
                    >
                      {payment.PaymentMethod}
                    </span>
                  </td>
                  <td>{payment.Reference || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

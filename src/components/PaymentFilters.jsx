export default function PaymentFilters({
  searchTenantID,
  onSearchTenantIDChange,
  searchUnit,
  onSearchUnitChange,
  searchReference,
  onSearchReferenceChange,
  paymentMethodFilter,
  onPaymentMethodFilterChange,
  paymentFrom,
  onPaymentFromChange,
  paymentTo,
  onPaymentToChange,
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Tenant ID"
        value={searchTenantID}
        onChange={onSearchTenantIDChange}
        style={{ marginRight: "0.5rem" }}
      />
      <input
        type="text"
        placeholder="Unit Number"
        value={searchUnit}
        onChange={onSearchUnitChange}
        style={{ marginRight: "0.5rem" }}
      />
      <input
        type="text"
        placeholder="Reference"
        value={searchReference}
        onChange={onSearchReferenceChange}
        style={{ marginRight: "0.5rem" }}
      />
      <select
        value={paymentMethodFilter}
        onChange={onPaymentMethodFilterChange}
        style={{ marginRight: "0.5rem" }}
      >
        <option value="">All Methods</option>
        <option value="Cash">Cash</option>
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="Card">Card</option>
      </select>
      <input
        type="date"
        value={paymentFrom}
        onChange={onPaymentFromChange}
        style={{ marginRight: "0.5rem" }}
      />
      <input
        type="date"
        value={paymentTo}
        onChange={onPaymentToChange}
        style={{ marginRight: "0.5rem" }}
      />
    </div>
  );
}

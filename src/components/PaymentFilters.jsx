// src/components/filters/PaymentFilters.jsx

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
  onResetFilters, // added prop
}) {
  return (
    <div className="filter-group">
      <input
        type="text"
        placeholder="Tenant ID"
        value={searchTenantID}
        onChange={onSearchTenantIDChange}
      />
      <input
        type="text"
        placeholder="Unit Number"
        value={searchUnit}
        onChange={onSearchUnitChange}
      />
      <input
        type="text"
        placeholder="Reference"
        value={searchReference}
        onChange={onSearchReferenceChange}
      />
      <select
        value={paymentMethodFilter}
        onChange={onPaymentMethodFilterChange}
      >
        <option value="">All Methods</option>
        <option value="Cash">Cash</option>
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="Card">Card</option>
      </select>
      <input type="date" value={paymentFrom} onChange={onPaymentFromChange} />
      <input type="date" value={paymentTo} onChange={onPaymentToChange} />

      {/* Consistent Reset Button */}
      <button onClick={onResetFilters}>Reset Filters</button>
    </div>
  );
}

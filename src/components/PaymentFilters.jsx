import MoreFeature from "./MoreFeature";

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
  onResetFilters,
}) {
  return (
    <div className="filter-group">
      {/* Inline (always visible) */}
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

      {/* More feature sits here, before Reset */}
      <MoreFeature>
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
      </MoreFeature>

      {/* Reset always last */}
      <button type="button" onClick={onResetFilters}>
        Reset Filters
      </button>
    </div>
  );
}

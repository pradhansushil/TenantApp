export default function MaintenanceFilters({
  searchText,
  setSearchText,
  dateRange,
  setDateRange,
  customStartDate,
  setCustomStartDate,
  customEndDate,
  setCustomEndDate,
  sortOption,
  setSortOption,
  resetFilters,
}) {
  return (
    <div className="filter-group">
      {/* Text Search */}
      <input
        type="text"
        placeholder="Search by tenant, unit, or description"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Predefined Date Range */}
      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        disabled={customStartDate || customEndDate}
      >
        <option value="All">All Dates</option>
        <option value="Last7Days">Last 7 Days</option>
        <option value="Last30Days">Last 30 Days</option>
        <option value="ThisYear">This Year</option>
      </select>

      {/* Custom Date Range */}
      <input
        type="date"
        value={customStartDate}
        onChange={(e) => setCustomStartDate(e.target.value)}
      />
      <input
        type="date"
        value={customEndDate}
        onChange={(e) => setCustomEndDate(e.target.value)}
      />

      {/* Sort Options */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="Newest">Newest First</option>
        <option value="Oldest">Oldest First</option>
        <option value="TenantAtoZ">Tenant Name A-Z</option>
        <option value="TenantZtoA">Tenant Name Z-A</option>
      </select>

      {/* Reset Filters */}
      <button type="button" onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
}

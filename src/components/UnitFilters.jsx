export default function UnitFilters({
  statusFilter,
  onStatusFilterChange,
  sortType,
  onSortTypeChange,
  onResetFilters,
}) {
  return (
    <div className="filter-group">
      {/* Status Filter */}
      <label htmlFor="status">Status:</label>
      <select id="status" value={statusFilter} onChange={onStatusFilterChange}>
        <option value="All">All</option>
        <option value="Occupied">Occupied</option>
        <option value="Vacant">Vacant</option>
      </select>

      {/* Sort Filter */}
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" value={sortType} onChange={onSortTypeChange}>
        <option value="UnitNumber">Unit Number</option>
        <option value="Rent">Rent</option>
      </select>

      {/* Reset Button */}
      <button onClick={onResetFilters}>Reset Filters</button>
    </div>
  );
}

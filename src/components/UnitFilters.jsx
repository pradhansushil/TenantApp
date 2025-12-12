export default function UnitFilters({
  statusFilter,
  setStatusFilter,
  sortType,
  setSortType,
  resetFilters,
}) {
  return (
    <div className="filter-group">
      {/* Status Filter */}
      <label htmlFor="status">Status:</label>
      <select
        id="status"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Occupied">Occupied</option>
        <option value="Vacant">Vacant</option>
      </select>

      {/* Sort Filter */}
      <label htmlFor="sort">Sort by:</label>
      <select
        id="sort"
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="UnitNumber">Unit Number</option>
        <option value="Rent">Rent</option>
      </select>

      {/* Reset Button */}
      <button className="btn btn-secondary" onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
}

export default function TenantFilters({
  searchName,
  onSearchNameChange,
  unitFilter,
  onUnitFilterChange,
  moveInFrom,
  onMoveInFromChange,
  moveInTo,
  onMoveInToChange,
  filterType,
  onFilterTypeChange,
  onResetFilters,
}) {
  return (
    <div className="filter-group">
      <input
        type="text"
        placeholder="Search by name"
        value={searchName}
        onChange={onSearchNameChange}
      />
      <input
        type="text"
        placeholder="Filter by unit"
        value={unitFilter}
        onChange={onUnitFilterChange}
      />
      <input type="date" value={moveInFrom} onChange={onMoveInFromChange} />
      <input type="date" value={moveInTo} onChange={onMoveInToChange} />
      <select value={filterType} onChange={onFilterTypeChange}>
        <option value="name">Name (A → Z)</option>
        <option value="moveInDate">Move-in Date (Newest → Oldest)</option>
        <option value="unit">Unit Number</option>
      </select>
      <button onClick={onResetFilters}>Reset Filters</button>
    </div>
  );
}

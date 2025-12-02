export default function TenantFilters({
  searchName,
  onSearchNameChange,
  unitFilter,
  onUnitFilterChange,
  moveInFrom,
  onMoveInFromChange,
  moveInTo,
  onMoveInToChange,
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
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
    </div>
  );
}

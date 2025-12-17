export const filterAndSortRequests = (
  requests,
  searchText,
  dateRange,
  customStartDate,
  customEndDate,
  sortOption
) => {
  let filtered = [...requests];

  // 1. Text search
  if (searchText.trim() !== "") {
    const lowerSearch = searchText.toLowerCase();
    filtered = filtered.filter(
      (req) =>
        req.TenantName.toLowerCase().includes(lowerSearch) ||
        req.Unit.toLowerCase().includes(lowerSearch) ||
        req.Description.toLowerCase().includes(lowerSearch)
    );
  }

  // 2. Date filtering
  filtered = filtered.filter((req) => {
    const timestamp = new Date(req.Timestamp);

    // Custom date range takes priority
    if (customStartDate || customEndDate) {
      const start = customStartDate
        ? new Date(customStartDate)
        : new Date("1970-01-01");
      const end = customEndDate ? new Date(customEndDate) : new Date();
      end.setHours(23, 59, 59, 999);
      return timestamp >= start && timestamp <= end;
    }

    // Predefined ranges
    const now = new Date();
    if (dateRange === "Last7Days") {
      const cutoff = new Date();
      cutoff.setDate(now.getDate() - 7);
      return timestamp >= cutoff;
    } else if (dateRange === "Last30Days") {
      const cutoff = new Date();
      cutoff.setDate(now.getDate() - 30);
      return timestamp >= cutoff;
    } else if (dateRange === "ThisYear") {
      const yearStart = new Date(now.getFullYear(), 0, 1);
      return timestamp >= yearStart;
    }

    return true; // All dates
  });

  // 3. Sorting
  filtered.sort((a, b) => {
    if (sortOption === "Newest")
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    if (sortOption === "Oldest")
      return new Date(a.Timestamp) - new Date(b.Timestamp);
    if (sortOption === "TenantAtoZ")
      return a.TenantName.localeCompare(b.TenantName);
    if (sortOption === "TenantZtoA")
      return b.TenantName.localeCompare(a.TenantName);

    return 0;
  });

  return filtered;
};

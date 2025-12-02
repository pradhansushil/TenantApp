import { useState, useEffect } from "react";
import MaintenanceFilters from "../components/MaintenanceFilters";
import MaintenanceTable from "../components/MaintenanceTable";
import { filterAndSortRequests } from "../utils/maintenanceHelpers";

const Maintenance = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState("All");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [sortOption, setSortOption] = useState("Newest");

  // RESTORE DEFAULTS
  const resetFilters = () => {
    setSearchText("");
    setDateRange("All");
    setCustomStartDate("");
    setCustomEndDate("");
    setSortOption("Newest");
  };

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const response = await fetch(
          "https://sheetdb.io/api/v1/trs7w2oteqnyc?sheet=Maintenance"
        );
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((row) => ({
            MaintenanceID: row.MaintenanceID,
            TenantName: row.TenantName,
            Unit: row.Unit,
            Description: row.Description,
            DateSubmitted: row.DateSubmitted,
            Timestamp: row.Timestamp,
          }));

          mapped.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));
          setRequests(mapped);
        } else {
          setRequests([]);
        }
      } catch (error) {
        console.error("Error fetching maintenance requests:", error);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenance();
  }, []);

  if (loading) return <p>Loading maintenance requests...</p>;
  if (requests.length === 0) return <p>No maintenance requests found.</p>;

  // Apply all filters + sorting through helper
  const filteredRequests = filterAndSortRequests(
    requests,
    searchText,
    dateRange,
    customStartDate,
    customEndDate,
    sortOption
  );

  return (
    <div>
      <h1>Maintenance Requests</h1>

      <MaintenanceFilters
        searchText={searchText}
        setSearchText={setSearchText}
        dateRange={dateRange}
        setDateRange={setDateRange}
        customStartDate={customStartDate}
        setCustomStartDate={setCustomStartDate}
        customEndDate={customEndDate}
        setCustomEndDate={setCustomEndDate}
        sortOption={sortOption}
        setSortOption={setSortOption}
        resetFilters={resetFilters}
      />

      <MaintenanceTable requests={filteredRequests} />
    </div>
  );
};

export default Maintenance;

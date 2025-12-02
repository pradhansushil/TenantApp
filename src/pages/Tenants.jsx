import { useState, useEffect } from "react";
import TenantModal from "../components/admin/dashboard/TenantModal";
import TenantFilters from "../components/TenantFilters";
import Toast from "../components/Toasts";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  getAllTenants,
  sortTenants,
  removeTenant,
} from "../utils/tenantHelperFunctions";

export default function Tenants() {
  const [tenants, setTenants] = useState([]);
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);
  const [filterType, setFilterType] = useState("name");

  // Filters
  const [searchName, setSearchName] = useState("");
  const [unitFilter, setUnitFilter] = useState("");
  const [moveInFrom, setMoveInFrom] = useState("");
  const [moveInTo, setMoveInTo] = useState("");

  // Toast state
  const [toast, setToast] = useState({ message: "", type: "success" });

  // Delete confirmation
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };
  const clearToast = () => setToast({ message: "", type: "success" });

  // Fetch tenants on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getAllTenants();
        setTenants(data);
        setFilteredTenants(sortTenants(data, filterType));
      } catch {
        setError("Failed to fetch tenants.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Apply filters + sort whenever tenants or filters change
  useEffect(() => {
    let filtered = tenants;

    // Search by name
    if (searchName) {
      filtered = filtered.filter((t) =>
        t.Name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // Filter by unit
    if (unitFilter) {
      filtered = filtered.filter((t) => t.Unit === unitFilter);
    }

    // Filter by move-in date range
    if (moveInFrom || moveInTo) {
      filtered = filtered.filter((t) => {
        const moveInDate = new Date(t.MoveInDate);
        if (moveInFrom && moveInDate < new Date(moveInFrom)) return false;
        if (moveInTo && moveInDate > new Date(moveInTo)) return false;
        return true;
      });
    }

    // Sort filtered tenants
    setFilteredTenants(sortTenants(filtered, filterType));
  }, [tenants, filterType, searchName, unitFilter, moveInFrom, moveInTo]);

  // Handlers for modals
  const handleAddClick = () => {
    setEditingTenant(null);
    setIsModalOpen(true);
  };
  const handleEditClick = (tenant) => {
    setEditingTenant(tenant);
    setIsModalOpen(true);
  };

  // Handlers for deletion
  const handleDelete = (tenantID) => {
    setTenantToDelete(tenantID);
    setIsConfirmOpen(true);
  };
  const handleConfirmDelete = async () => {
    try {
      await removeTenant(tenantToDelete);
      const updated = tenants.filter((t) => t.TenantID !== tenantToDelete);
      setTenants(updated);
      showToast("Tenant deleted successfully", "success");
    } catch (err) {
      showToast(err.message || "Failed to delete tenant", "error");
    } finally {
      setIsConfirmOpen(false);
      setTenantToDelete(null);
    }
  };
  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setTenantToDelete(null);
  };

  // Handle add/edit submit
  const handleSubmit = async (savedTenant) => {
    if (editingTenant?.TenantID) {
      const updated = tenants.map((t) =>
        t.TenantID === savedTenant.TenantID ? savedTenant : t
      );
      setTenants(updated);
      showToast("Tenant updated successfully", "success");
    } else {
      setTenants([savedTenant, ...tenants]);
      showToast("Tenant added successfully", "success");
    }
  };

  const handleSubmitError = (errorMessage) => {
    showToast(errorMessage || "Operation failed", "error");
  };

  const handleResetFilters = () => {
    setSearchName("");
    setUnitFilter("");
    setMoveInFrom("");
    setMoveInTo("");
  };

  if (loading) return <p>Loading tenants...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Toast message={toast.message} type={toast.type} onClose={clearToast} />

      <h1>Tenant Management</h1>
      <button onClick={handleAddClick}>Add Tenant</button>

      <TenantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        onError={handleSubmitError}
        tenantData={editingTenant}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Tenant"
        message="Are you sure you want to delete this tenant? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />

      {/* Filters */}
      <TenantFilters
        searchName={searchName}
        onSearchNameChange={(e) => setSearchName(e.target.value)}
        unitFilter={unitFilter}
        onUnitFilterChange={(e) => setUnitFilter(e.target.value)}
        moveInFrom={moveInFrom}
        onMoveInFromChange={(e) => setMoveInFrom(e.target.value)}
        moveInTo={moveInTo}
        onMoveInToChange={(e) => setMoveInTo(e.target.value)}
      />

      {/* Sort dropdown */}
      <div>
        <label>Sort by: </label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="name">Name (A → Z)</option>
          <option value="moveInDate">Move-in Date (Newest → Oldest)</option>
          <option value="unit">Unit Number</option>
        </select>
      </div>

      <button onClick={handleResetFilters}>Reset Filters</button>

      {/* Tenant Table */}
      {tenants.length === 0 ? (
        <p>No tenants found.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>TenantID</th>
              <th>Name</th>
              <th>Unit</th>
              <th>MoveInDate</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.map((t) => (
              <tr key={t.TenantID}>
                <td>{t.TenantID}</td>
                <td>{t.Name}</td>
                <td>{t.Unit}</td>
                <td>{t.MoveInDate}</td>
                <td>{t.Phone}</td>
                <td>
                  <a href="#" onClick={() => handleEditClick(t)}>
                    Edit
                  </a>{" "}
                  |{" "}
                  <a href="#" onClick={() => handleDelete(t.TenantID)}>
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

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

    if (searchName) {
      filtered = filtered.filter((t) =>
        t.Name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (unitFilter) {
      filtered = filtered.filter((t) => t.Unit === unitFilter);
    }

    if (moveInFrom || moveInTo) {
      filtered = filtered.filter((t) => {
        const moveInDate = new Date(t.MoveInDate);
        if (moveInFrom && moveInDate < new Date(moveInFrom)) return false;
        if (moveInTo && moveInDate > new Date(moveInTo)) return false;
        return true;
      });
    }

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
    setFilterType("name");
  };

  if (loading) return <div className="loading-state">Loading tenants...</div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <div className="page-container">
      <Toast message={toast.message} type={toast.type} onClose={clearToast} />

      <div className="page-header">
        <h1>Tenant Management</h1>
        <button className="btn btn-primary" onClick={handleAddClick}>
          Add Tenant
        </button>
      </div>

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

      <TenantFilters
        searchName={searchName}
        onSearchNameChange={(e) => setSearchName(e.target.value)}
        unitFilter={unitFilter}
        onUnitFilterChange={(e) => setUnitFilter(e.target.value)}
        moveInFrom={moveInFrom}
        onMoveInFromChange={(e) => setMoveInFrom(e.target.value)}
        moveInTo={moveInTo}
        onMoveInToChange={(e) => setMoveInTo(e.target.value)}
        filterType={filterType}
        onFilterTypeChange={(e) => setFilterType(e.target.value)}
        onResetFilters={handleResetFilters}
      />

      {tenants.length === 0 ? (
        <div className="empty-state">
          <p>No tenants found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Tenant ID</th>
                <th>Name</th>
                <th>Unit</th>
                <th>Move-in Date</th>
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
                  <td className="table-actions">
                    <button
                      className="btn-link btn-link-primary"
                      onClick={() => handleEditClick(t)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-link btn-link-danger"
                      onClick={() => handleDelete(t.TenantID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

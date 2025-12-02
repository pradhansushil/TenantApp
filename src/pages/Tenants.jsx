import { useState, useEffect } from "react";
import TenantModal from "../components/admin/dashboard/TenantModal";
import Toast from "../components/Toasts";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  getAllTenants,
  sortTenants,
  addTenant,
  editTenant,
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

  // Toast state
  const [toast, setToast] = useState({ message: "", type: "success" });

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const clearToast = () => {
    setToast({ message: "", type: "success" });
  };

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

  useEffect(() => {
    setFilteredTenants(sortTenants(tenants, filterType));
  }, [tenants, filterType]);

  const handleAddClick = () => {
    setEditingTenant(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (tenant) => {
    setEditingTenant(tenant);
    setIsModalOpen(true);
  };

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
      // Close dialog and clear the tenant to delete
      setIsConfirmOpen(false);
      setTenantToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setTenantToDelete(null);
  };

  const handleSubmit = async (savedTenant) => {
    if (editingTenant?.TenantID) {
      // Edited
      const updated = tenants.map((t) =>
        t.TenantID === savedTenant.TenantID ? savedTenant : t
      );
      setTenants(updated);
      showToast("Tenant updated successfully", "success");
    } else {
      // Added
      setTenants([savedTenant, ...tenants]);
      showToast("Tenant added successfully", "success");
    }
  };

  // Handle errors from the modal (if submission fails)
  const handleSubmitError = (errorMessage) => {
    showToast(errorMessage || "Operation failed", "error");
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

      {tenants.length === 0 ? (
        <p>No tenants found.</p>
      ) : (
        <>
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
                    </a>
                    <a href="#" onClick={() => handleDelete(t.TenantID)}>
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

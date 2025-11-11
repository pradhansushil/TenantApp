import { useState, useEffect } from "react";
import TenantModal from "../components/admin/dashboard/TenantModal";
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

  const handleDelete = async (tenantID) => {
    if (!window.confirm("Are you sure you want to delete this tenant?")) return;
    try {
      await removeTenant(tenantID);
      const updated = tenants.filter((t) => t.TenantID !== tenantID);
      setTenants(updated);
    } catch (err) {
      alert(err.message || "Failed to delete tenant.");
    }
  };

  const handleSubmit = async (savedTenant) => {
    if (editingTenant?.TenantID) {
      // Edited
      const updated = tenants.map((t) =>
        t.TenantID === savedTenant.TenantID ? savedTenant : t
      );
      setTenants(updated);
    } else {
      // Added
      setTenants([savedTenant, ...tenants]);
    }
  };

  if (loading) return <p>Loading tenants...</p>;
  if (error) return <p>{error}</p>;
  if (!tenants.length) return <p>No tenants found.</p>;

  return (
    <div>
      <h1>Tenant Management</h1>
      <button onClick={handleAddClick}>Add Tenant</button>

      <TenantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        tenantData={editingTenant}
      />

      <div style={{ margin: "10px 0" }}>
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

      <table
        border="1"
        cellPadding="5"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
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
                <a
                  href="#"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleEditClick(t)}
                >
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
    </div>
  );
}

import { useEffect, useState } from "react";
import Toast from "../components/Toasts";

// Modals
import { AddUnitModal } from "../components/admin/units/AddUnitModal";
import { EditUnitModal } from "../components/admin/units/EditUnitModal";
import ConfirmDialog from "../components/ConfirmDialog";

// Filters
import UnitFilters from "../components/UnitFilters";

// API / service functions
import {
  fetchUnits,
  addUnit,
  updateUnit,
  deleteUnit,
} from "../services/unitService";

// Helper function to sort units
function sortUnits(units, sortType) {
  const sorted = [...units];
  switch (sortType) {
    case "UnitNumber":
      return sorted.sort((a, b) =>
        (a.UnitNumber || "").localeCompare(b.UnitNumber || "")
      );
    case "Rent":
      return sorted.sort(
        (a, b) => (Number(a.Rent) || 0) - (Number(b.Rent) || 0)
      );
    default:
      return sorted;
  }
}

export default function Units() {
  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [unitToDelete, setUnitToDelete] = useState(null);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortType, setSortType] = useState("UnitNumber");

  // Toast state
  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = (message, type = "success") => setToast({ message, type });
  const clearToast = () => setToast({ message: "", type: "success" });

  // Load units on mount
  useEffect(() => {
    async function loadUnits() {
      try {
        setLoading(true);
        const data = await fetchUnits();
        setUnits(data);
        setFilteredUnits(applyFilters(data, statusFilter, sortType));
      } catch {
        setError("Failed to fetch units.");
      } finally {
        setLoading(false);
      }
    }
    loadUnits();
  }, []);

  // Reapply filters whenever units, statusFilter, or sortType changes
  useEffect(() => {
    setFilteredUnits(applyFilters(units, statusFilter, sortType));
  }, [units, statusFilter, sortType]);

  // Filter & sort helper
  function applyFilters(units, status, sortType) {
    let filtered = [...units];
    if (status !== "All") {
      filtered = filtered.filter((u) => u.Status === status);
    }
    return sortUnits(filtered, sortType);
  }

  // Add a new unit
  const handleAddUnit = async (newUnit) => {
    try {
      const added = await addUnit({
        ...newUnit,
        UnitID: `U-${Math.floor(1000 + Math.random() * 9000)}`,
      });
      setUnits((prev) => [...prev, added]);
      showToast("Unit added successfully", "success");
    } catch {
      showToast("Failed to add unit", "error");
    }
  };

  // Update an existing unit
  const handleUpdateUnit = async (updatedUnit) => {
    try {
      const updated = await updateUnit(updatedUnit);
      setUnits((prev) =>
        prev.map((u) => (u.UnitID === updated.UnitID ? updated : u))
      );
      showToast("Unit updated successfully", "success");
    } catch {
      showToast("Failed to update unit", "error");
    }
  };

  // Delete a unit
  const handleDeleteUnit = async () => {
    try {
      await deleteUnit(unitToDelete);
      setUnits((prev) => prev.filter((u) => u.UnitID !== unitToDelete));
      showToast("Unit deleted successfully", "success");
    } catch {
      showToast("Failed to delete unit", "error");
    } finally {
      setIsConfirmOpen(false);
      setUnitToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setUnitToDelete(null);
  };

  const handleResetFilters = () => {
    setStatusFilter("All");
    setSortType("UnitNumber");
  };

  return (
    <div className="page-container">
      <Toast message={toast.message} type={toast.type} onClose={clearToast} />

      <div className="page-header">
        <h1>Unit Management</h1>
        <button
          className="btn btn-primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Unit
        </button>
      </div>

      {/* Filters - always visible */}
      <UnitFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortType={sortType}
        setSortType={setSortType}
        resetFilters={handleResetFilters}
      />

      {loading ? (
        <div className="loading-state">
          <p>Loading units...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
        </div>
      ) : units.length === 0 ? (
        <div className="empty-state">
          <p>No units found.</p>
          <button
            className="btn btn-primary"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Your First Unit
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Unit ID</th>
                <th>Unit Number</th>
                <th>Status</th>
                <th>Tenant Name</th>
                <th>Move In Date</th>
                <th>Rent</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUnits.map((unit) => (
                <tr key={unit.UnitID}>
                  <td>{unit.UnitID}</td>
                  <td>{unit.UnitNumber}</td>
                  <td>
                    <span
                      className={`badge badge-${
                        unit.Status?.toLowerCase() || "default"
                      }`}
                    >
                      {unit.Status}
                    </span>
                  </td>
                  <td>{unit.TenantName || "-"}</td>
                  <td>{unit.MoveInDate || "-"}</td>
                  <td>${unit.Rent || "-"}</td>
                  <td>{unit.Notes || "-"}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn-link"
                        onClick={() => {
                          setEditingUnit(unit);
                          setIsEditModalOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-link btn-link-danger"
                        onClick={() => {
                          setUnitToDelete(unit.UnitID);
                          setIsConfirmOpen(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddUnitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddUnit}
      />

      <EditUnitModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        unit={editingUnit}
        onUpdate={handleUpdateUnit}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onConfirm={handleDeleteUnit}
        onCancel={handleCancelDelete}
        title="Delete Unit"
        message={
          unitToDelete
            ? `Are you sure you want to delete this unit? This action cannot be undone.`
            : ""
        }
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

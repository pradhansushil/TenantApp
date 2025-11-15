import { useEffect, useState } from "react";

// Modals
import { AddUnitModal } from "../components/admin/units/AddUnitModal";
import { EditUnitModal } from "../components/admin/units/EditUnitModal";
import { DeleteUnitModal } from "../components/admin/units/DeleteUnitModal";

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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingUnit, setDeletingUnit] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");
  const [sortType, setSortType] = useState("UnitNumber");

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
        UnitID: `U-${Math.floor(1000 + Math.random() * 9000)}`, // auto-generate
      });
      setUnits((prev) => [...prev, added]);
    } catch {
      setError("Failed to add unit.");
    }
  };

  // Update an existing unit
  const handleUpdateUnit = async (updatedUnit) => {
    try {
      const updated = await updateUnit(updatedUnit);
      setUnits((prev) =>
        prev.map((u) => (u.UnitID === updated.UnitID ? updated : u))
      );
    } catch {
      setError("Failed to update unit.");
    }
  };

  // Delete a unit
  const handleDeleteUnit = async (unitID) => {
    try {
      await deleteUnit(unitID);
      setUnits((prev) => prev.filter((u) => u.UnitID !== unitID));
    } catch {
      setError("Failed to delete unit.");
    }
  };

  if (loading) return <p>Loading units...</p>;
  if (error) return <p>{error}</p>;
  if (!units.length) return <p>No units found.</p>;

  return (
    <div>
      <h1>Unit Management</h1>

      {/* Controls */}
      <div className="units-controls">
        <button onClick={() => setIsAddModalOpen(true)}>Add Unit</button>

        <div className="filter-sort">
          <label>
            Status:
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Occupied">Occupied</option>
              <option value="Vacant">Vacant</option>
            </select>
          </label>

          <label>
            Sort by:
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="UnitNumber">Unit Number</option>
              <option value="Rent">Rent</option>
            </select>
          </label>
        </div>
      </div>

      {/* Table */}
      <table className="units-table">
        <thead>
          <tr>
            <th>UnitID</th>
            <th>UnitNumber</th>
            <th>Status</th>
            <th>TenantName</th>
            <th>MoveInDate</th>
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
              <td>{unit.Status}</td>
              <td>{unit.TenantName || "-"}</td>
              <td>{unit.MoveInDate || "-"}</td>
              <td>{unit.Rent || "-"}</td>
              <td>{unit.Notes || "-"}</td>
              <td>
                <a
                  href="#"
                  style={{ marginRight: "10px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setEditingUnit(unit);
                    setIsEditModalOpen(true);
                  }}
                >
                  Edit
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setDeletingUnit(unit);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
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

      <DeleteUnitModal
        isOpen={isDeleteModalOpen}
        unit={deletingUnit}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteUnit}
      />
    </div>
  );
}

// src/utils/unitsHelperFunctions.jsx
import {
  fetchUnits,
  addUnit as apiAddUnit,
  updateUnit as apiUpdateUnit,
  deleteUnit as apiDeleteUnit,
} from "../services/unitService.js";

/**
 * Fetch all units
 */
export async function getAllUnits() {
  try {
    const data = await fetchUnits();
    return data;
  } catch (err) {
    console.error("Failed to fetch units:", err);
    throw new Error("Failed to fetch units.");
  }
}

/**
 * Sort units
 * @param {Array} units
 * @param {string} filterType - 'UnitNumber' | 'Rent' | 'Status'
 */
export function sortUnits(units, filterType) {
  const sorted = [...units];
  switch (filterType) {
    case "UnitNumber":
      return sorted.sort((a, b) =>
        (a.UnitNumber || "").localeCompare(b.UnitNumber || "")
      );
    case "Rent":
      return sorted.sort(
        (a, b) => (Number(a.Rent) || 0) - (Number(b.Rent) || 0)
      );
    case "Status":
      return sorted.sort((a, b) =>
        (a.Status || "").localeCompare(b.Status || "")
      );
    default:
      return sorted;
  }
}

/**
 * Get unit by UnitNumber
 * @param {string} unitNumber
 */
export async function getUnitByNumber(unitNumber) {
  const units = await getAllUnits();
  return units.find((u) => u.UnitNumber === unitNumber) || null;
}

/**
 * Add unit
 */
export async function addUnit(unitData) {
  const payload = {
    ...unitData,
    UnitID: `U-${Date.now()}`, // simple auto-generated ID
  };
  const success = await apiAddUnit(payload);
  if (success) return payload;
  throw new Error("Failed to add unit.");
}

/**
 * Edit unit
 */
export async function editUnit(unitID, updatedData) {
  try {
    const updatedUnit = await apiUpdateUnit({ ...updatedData, UnitID: unitID });
    return updatedUnit;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to edit unit.");
  }
}

/**
 * Remove unit
 */
export async function removeUnit(unitID) {
  try {
    const success = await apiDeleteUnit(unitID);
    return success;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete unit.");
  }
}

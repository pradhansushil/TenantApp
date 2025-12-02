import {
  fetchTenants,
  saveTenantToSheet,
  updateTenant,
  deleteTenant,
} from "../services/tenantService.js";
import { prepopulateDuePayments } from "./duePaymentsHelperFunctions";
import { getUnitByNumber } from "./UnitsHelperFunctions";
import { updateUnit } from "../services/unitService.js"; // Needed for auto-updating the Units tab

/**
 * Fetch all tenants from SheetDB
 * @returns {Promise<Array>} tenant array
 */
export async function getAllTenants() {
  try {
    const data = await fetchTenants();
    return data;
  } catch (err) {
    console.error("Failed to fetch tenants:", err);
    throw new Error("Failed to fetch tenants.");
  }
}

/**
 * Sort tenants
 */
export function sortTenants(tenants, filterType) {
  const sorted = [...tenants];
  switch (filterType) {
    case "name":
      return sorted.sort((a, b) => (a.Name || "").localeCompare(b.Name || ""));
    case "moveInDate":
      return sorted.sort(
        (a, b) => new Date(b.MoveInDate || 0) - new Date(a.MoveInDate || 0)
      );
    case "unit":
      return sorted.sort((a, b) => (a.Unit || "").localeCompare(b.Unit || ""));
    default:
      return sorted;
  }
}

/**
 * Get tenant by ID
 */
export function getTenantByID(tenants, tenantID) {
  return tenants.find((t) => t.TenantID === tenantID) || null;
}

/**
 * Add tenant
 * - Formats dates as 'M/D/YYYY (with leading apostrophe)
 * - Saves tenant
 * - Prepopulates due payments
 * - Updates unit status (Vacant → Occupied)
 */
export async function addTenant(tenantData) {
  // Convert dates from YYYY-MM-DD → 'M/D/YYYY
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");

    const m = d.getMonth() + 1; // No leading zero
    const day = d.getDate(); // No leading zero
    const yyyy = d.getFullYear();

    return `'${m}/${day}/${yyyy}`; // Leading apostrophe
  };

  const payload = {
    ...tenantData,
    MoveInDate: formatDate(tenantData.MoveInDate),
    PeriodStart: formatDate(tenantData.PeriodStart),
    PeriodEnd: formatDate(tenantData.PeriodEnd),
    TenantID: `T-${Math.floor(1000 + Math.random() * 9000)}`,
    Timestamp: new Date().toISOString(),
  };

  // Save tenant to Google Sheets
  const success = await saveTenantToSheet(payload);

  if (success) {
    // ------------------------------------------
    // 1. GET UNIT INFO
    // ------------------------------------------
    const unit = await getUnitByNumber(payload.Unit);
    const rentAmount = unit ? parseFloat(unit.Rent) : 0;

    // ------------------------------------------
    // 2. PREPOPULATE DUE PAYMENTS
    // ------------------------------------------
    await prepopulateDuePayments(payload, rentAmount);

    // ------------------------------------------
    // 3. UPDATE UNIT STATUS
    // ------------------------------------------
    try {
      if (unit) {
        const updatedUnit = {
          ...unit,
          Status: "Occupied",
          TenantName: payload.FullName || payload.Name || "",
          MoveInDate: payload.MoveInDate, // Already 'M/D/YYYY format
        };

        await updateUnit(updatedUnit); // MUST include UnitID
      } else {
        console.warn("addTenant: Unit not found; skipping Units update.");
      }
    } catch (err) {
      console.error("Failed updating unit after adding tenant:", err);
    }

    return payload;
  }

  throw new Error("Failed to add tenant.");
}

/**
 * Edit tenant
 */
export async function editTenant(tenantID, updatedData) {
  try {
    const updatedTenant = await updateTenant(tenantID, { ...updatedData });
    return updatedTenant;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to edit tenant.");
  }
}

/**
 * Remove tenant
 */
export async function removeTenant(tenantID) {
  try {
    const success = await deleteTenant(tenantID);
    return success;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete tenant.");
  }
}

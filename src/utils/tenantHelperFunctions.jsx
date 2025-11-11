// src/utils/tenantHelperFunctions.js
import {
  fetchTenants,
  saveTenantToSheet,
  updateTenant,
  deleteTenant,
} from "../services/tenantService.js";

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
 * @param {Array} tenants
 * @param {string} filterType
 * @returns {Array} sorted tenants
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
 */
export async function addTenant(tenantData) {
  const payload = {
    ...tenantData,
    TenantID: `T-${Math.floor(1000 + Math.random() * 9000)}`,
    Timestamp: new Date().toISOString(),
  };
  const success = await saveTenantToSheet(payload);
  if (success) return payload;
  throw new Error("Failed to add tenant.");
}

/**
 * Edit tenant
 */
export async function editTenant(tenantID, updatedData) {
  try {
    const updatedTenant = await updateTenant(tenantID, {
      ...updatedData,
    });
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

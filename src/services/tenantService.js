import { SHEETDB_URL, SHEETS } from "../utils/api";

const SHEET_NAME = SHEETS.TENANTS;

/**
 * Save tenant data to Google Sheet via SheetDB
 * @param {Object} tenantData
 * @returns {Promise<boolean>} success or failure
 */
export async function saveTenantToSheet(tenantData) {
  try {
    const response = await fetch(`${SHEETDB_URL}?sheet=${SHEET_NAME}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: tenantData }),
    });

    if (!response.ok) {
      throw new Error("Failed to save tenant to Google Sheet");
    }

    return true; // success
  } catch (error) {
    console.error("Error saving tenant:", error);
    return false; // failure
  }
}

export async function fetchTenants() {
  try {
    const response = await fetch(`${SHEETDB_URL}?sheet=${SHEET_NAME}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tenants:", error);
    throw error;
  }
}

export async function updateTenant(tenantID, updatedData) {
  try {
    const response = await fetch(
      `${SHEETDB_URL}/TenantID/${tenantID}?sheet=${SHEET_NAME}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: updatedData }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update tenant. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating tenant:", error);
    throw error;
  }
}

export async function deleteTenant(tenantID) {
  try {
    const response = await fetch(
      `${SHEETDB_URL}/TenantID/${tenantID}?sheet=${SHEET_NAME}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to delete tenant. Status: ${response.status}`);
    }
    return true;
  } catch (err) {
    console.error("Error deleting tenant:", err);
    throw err;
  }
}

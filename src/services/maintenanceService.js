import { SHEETDB_URL, SHEETS } from "../utils/api";

export const addMaintenanceRequest = async (payload) => {
  const result = await fetch(`${SHEETDB_URL}?sheet=${SHEETS.MAINTENANCE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!result.ok) {
    throw new Error("Failed to save maintenance request.");
  }

  return await result.json();
};

export const addMaintenanceRequest = async (payload) => {
  const SHEETDB_URL =
    "https://sheetdb.io/api/v1/trs7w2oteqnyc?sheet=Maintenance";

  const result = await fetch(SHEETDB_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!result.ok) {
    throw new Error("Failed to save maintenance request.");
  }

  return await result.json();
};

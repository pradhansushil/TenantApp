import { SHEETDB_URL, SHEETS } from "../utils/api";

const SHEET_NAME = SHEETS.UNITS;

export async function fetchUnits() {
  const response = await fetch(`${SHEETDB_URL}?sheet=${SHEET_NAME}`);
  if (!response.ok) throw new Error("Failed to fetch units");
  return response.json();
}

export async function addUnit(newUnit) {
  const response = await fetch(`${SHEETDB_URL}?sheet=${SHEET_NAME}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: newUnit }),
  });
  if (!response.ok) throw new Error("Failed to add unit");
  return newUnit; // SheetDB returns array sometimes, can adapt if needed
}

export async function updateUnit(updatedUnit) {
  const response = await fetch(
    `${SHEETDB_URL}/UnitID/${updatedUnit.UnitID}?sheet=${SHEET_NAME}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: updatedUnit }),
    }
  );
  if (!response.ok) throw new Error("Failed to update unit");
  return updatedUnit;
}

export async function deleteUnit(unitID) {
  const response = await fetch(
    `${SHEETDB_URL}/UnitID/${unitID}?sheet=${SHEET_NAME}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) throw new Error("Failed to delete unit");
  return true;
}

import { SHEETDB_URL, SHEETS } from "../utils/api";

const SHEET_NAME = SHEETS.DUEPAYMENTS || "DuePayments";

/**
 * Fetch all payments from the Google Sheet and calculate OwedAmount.
 * OwedAmount = DueAmount - PaidAmount
 */
export async function fetchAllPayments() {
  try {
    const response = await fetch(`${SHEETDB_URL}?sheet=${SHEET_NAME}`);
    if (!response.ok) {
      throw new Error("Failed to fetch payments");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchAllPayments error:", error);
    return [];
  }
}

export function filterDuePayments(payments) {
  return payments.filter((p) => p.OwedAmount > 0);
}

/**
 * Update a single due payment row in Google Sheets
 * @param {string} dueID - The DueID of the row to update
 * @param {Object} updatedFields - Example: { OwedAmount: "0.00", Status: "Paid" }
 */
export async function updateDuePayment(dueID, updatedFields) {
  try {
    const response = await fetch(
      `${SHEETDB_URL}/DueID/${dueID}?sheet=${SHEET_NAME}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: updatedFields,
        }),
      }
    );

    if (!response.ok) throw new Error("Failed to update due payment");

    return true;
  } catch (err) {
    console.error("updateDuePayment error:", err);
    throw err;
  }
}

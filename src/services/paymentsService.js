import { SHEETDB_URL, SHEETS } from "../utils/api";

const SHEET_NAME = SHEETS.PAYMENTS;

/**
 * Fetch all payments from Payments tab
 * @returns {Promise<Array>}
 */
export async function fetchAllPayments() {
  try {
    const response = await fetch(`${SHEETDB_URL}?sheet=${SHEET_NAME}`);
    if (!response.ok) throw new Error("Failed to fetch payments");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("fetchAllPayments error:", err);
    return [];
  }
}

/**
 * Add a new payment record to Payments tab
 * @param {Object} paymentData - { TenantID, TenantName, UnitNumber, PaymentDate, Amount, Method }
 * @returns {Promise<boolean>}
 */
export async function addPayment(paymentData) {
  try {
    const response = await fetch(`${SHEETDB_URL}?sheet=${SHEET_NAME}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: paymentData }),
    });
    if (!response.ok) throw new Error("Failed to record payment");
    return true;
  } catch (err) {
    console.error("addPayment error:", err);
    throw err;
  }
}

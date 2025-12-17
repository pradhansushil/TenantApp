import { fetchAllPayments } from "../services/paymentsService.js";

/**
 * Get all payments from Payments sheet
 */
export async function getAllPayments() {
  try {
    const payments = await fetchAllPayments();
    return payments;
  } catch (err) {
    console.error("Failed to get payments:", err);
    return [];
  }
}

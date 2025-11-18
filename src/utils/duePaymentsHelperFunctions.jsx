// src/utils/duePaymentHelperFunctions.js
import { SHEETDB_URL } from "../services/duePaymentService.js";

/**
 * Save a single due payment to the DuePayments tab
 * @param {Object} duePaymentData
 * @returns {Promise<boolean>}
 */
export async function saveDuePaymentToSheet(duePaymentData) {
  try {
    const response = await fetch(`${SHEETDB_URL}?sheet=DuePayments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: duePaymentData }),
    });

    if (!response.ok) throw new Error("Failed to save due payment");

    return true;
  } catch (err) {
    console.error("saveDuePaymentToSheet error:", err);
    return false;
  }
}

/**
 * Pre-populate DuePayments for a tenant for every month in the lease period
 * @param {Object} tenant - Tenant object from Tenants tab
 * @param {number} rentAmount - Monthly rent
 */
export async function prepopulateDuePayments(tenant, rentAmount) {
  if (!tenant?.TenantID || !tenant.PeriodStart || !tenant.PeriodEnd) {
    console.error("Tenant data missing required fields for due payment");
    return;
  }

  // Parse M/D/YYYY format
  const parseDate = (dateStr) => {
    const [month, day, year] = dateStr.split("/");
    return new Date(year, month - 1, day);
  };

  const startDate = parseDate(tenant.PeriodStart);
  const endDate = parseDate(tenant.PeriodEnd);

  const payments = [];

  // Loop through each month in the lease
  let current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

  while (current <= endDate) {
    const dueDate = new Date(current); // 1st of the month

    // Only create due payments for future or current months
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dueDate >= today) {
      // Format date as text to prevent Excel conversion: 'YYYY-MM-DD
      const month = dueDate.getMonth() + 1;
      const day = dueDate.getDate();
      const year = dueDate.getFullYear();
      const formattedDate = `'${month}/${day}/${year}`;

      const duePayment = {
        DueID: `D-${Date.now()}-${Math.floor(Math.random() * 9000)}`,
        TenantID: tenant.TenantID,
        TenantName: tenant.Name,
        UnitNumber: tenant.Unit,
        DueDate: formattedDate,
        AmountDue: parseFloat(rentAmount).toFixed(2),
        OwedAmount: parseFloat(rentAmount).toFixed(2),
        Status: "Pending",
      };
      payments.push(duePayment);
    }

    // Move to next month
    current.setMonth(current.getMonth() + 1);
  }

  // Save all due payments to Google Sheet
  for (const payment of payments) {
    await saveDuePaymentToSheet(payment);
  }

  console.log(
    `Pre-populated ${payments.length} due payments for ${tenant.Name}`
  );
}

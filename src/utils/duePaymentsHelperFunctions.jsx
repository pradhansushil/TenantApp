import { SHEETDB_URL, SHEETS } from "./api";

/**
 * Save a single due payment to the DuePayments tab
 * @param {Object} duePaymentData
 * @returns {Promise<boolean>}
 */
export async function saveDuePaymentToSheet(duePaymentData) {
  try {
    const response = await fetch(`${SHEETDB_URL}?sheet=${SHEETS.DUEPAYMENTS}`, {
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
 *
 * STANDARD APARTMENT MOVE-IN:
 * - Tenant pays first month + last month (final month of lease) upfront
 * - First due payment is the month AFTER move-in month
 *
 * Example: Move in Dec 13, Lease: Dec 2024 - Dec 2025
 * - Pay at move-in: Dec 2024 + Dec 2025 (last month)
 * - First due payment: Jan 1, 2025
 * - Payments generated: Jan 2025 through Nov 2025 (Dec 2025 already paid)
 *
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
    // Remove leading apostrophe if present
    const cleanStr = dateStr.replace(/^'/, "");
    const [month, day, year] = cleanStr.split("/");
    return new Date(year, month - 1, day);
  };

  const moveInDate = tenant.MoveInDate ? parseDate(tenant.MoveInDate) : null;
  const startDate = parseDate(tenant.PeriodStart);
  const endDate = parseDate(tenant.PeriodEnd);

  // Determine first due date
  // Tenant pays first month at move-in, so next payment due is the month after
  const firstDueDate = moveInDate || startDate;
  const firstPaymentMonth = new Date(
    firstDueDate.getFullYear(),
    firstDueDate.getMonth() + 1,
    1
  );

  // Last payment month (already paid upfront, so exclude from due payments)
  const lastPaymentMonth = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    1
  );

  const payments = [];

  // Loop through each month from first due date to one month before lease end
  let current = new Date(firstPaymentMonth);

  while (current < lastPaymentMonth) {
    const dueDate = new Date(current); // 1st of the month

    // Format date as text to prevent Excel conversion: 'M/D/YYYY
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

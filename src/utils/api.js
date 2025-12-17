// src/utils/api.js

// Base SheetDB URL - Vite uses import.meta.env instead of process.env
export const SHEETDB_URL =
  import.meta.env.VITE_SHEETDB_URL || "https://sheetdb.io/api/v1/trs7w2oteqnyc";

// Sheet names as constants
export const SHEETS = {
  TENANTS: "Tenants",
  MAINTENANCE: "Maintenance",
  UNITS: "Units",
  PAYMENTS: "Payments",
  DUEPAYMENTS: "DuePayments",
};

import { useState } from "react";

export default function TenantPortal() {
  const [showPayments, setShowPayments] = useState(false);
  const [showMaintenance, setShowMaintenance] = useState(false);

  // Form state for maintenance request
  const [formData, setFormData] = useState({
    unit: "",
    tenantName: "",
    description: "",
  });

  // Status message (success or error)
  const [statusMessage, setStatusMessage] = useState("");
  const [isSending, setIsSending] = useState(false); // disable submit while sending

  // SheetDB API URL
  const SHEETDB_URL = "https://sheetdb.io/api/v1/p69mudl8gzef9"; // ← Replace with your SheetDB API URL

  const togglePayments = () => setShowPayments(!showPayments);
  const toggleMaintenance = () => setShowMaintenance(!showMaintenance);

  // Update form inputs as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setStatusMessage("Sending...");
    setIsSending(true);

    try {
      // SheetDB expects data inside a "data" object
      const payload = {
        data: {
          tenantName: formData.tenantName,
          unitNumber: formData.unit,
          description: formData.description,
        },
      };

      const res = await fetch(SHEETDB_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Network response not OK");

      const data = await res.json();

      // Check if SheetDB returned success
      if (data.created) {
        setStatusMessage(
          "We received your maintenance request and will get back to you soon. ✅"
        );
        setFormData({ unit: "", tenantName: "", description: "" });
      } else {
        setStatusMessage(
          "Oops! Something went wrong. Please try submitting your request again."
        );
      }
    } catch (err) {
      setStatusMessage(
        "Oops! Something went wrong with the network. Please check your internet and try again."
      );
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main>
      <h1>Tenant Portal</h1>

      {/* Payments Section */}
      <section>
        <button onClick={togglePayments}>Payments</button>
        {showPayments && (
          <div>
            <p>
              <strong>
                To pay your rent, click the link below. Make sure to include
                your Unit # in the payment notes.
              </strong>
            </p>
            <a
              href="https://esewa.com/payment-placeholder"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                color: "blue",
              }}
            >
              Pay via eSewa / IPS
            </a>
          </div>
        )}
      </section>

      {/* Maintenance Requests Section */}
      <section>
        <button onClick={toggleMaintenance}>Maintenance Requests</button>
        {showMaintenance && (
          <section aria-labelledby="maintenance-heading">
            <h2 id="maintenance-heading">Submit a Maintenance Request</h2>

            {/* Maintenance Request Form */}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="unit">Unit # (required):</label>
                <input
                  type="text"
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="tenantName">Tenant Name (required):</label>
                <input
                  type="text"
                  id="tenantName"
                  name="tenantName"
                  value={formData.tenantName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="description">Description of the issue:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  style={{ width: "100%" }}
                />
              </div>

              <button type="submit" disabled={isSending}>
                {isSending ? "Sending..." : "Submit Request"}
              </button>
            </form>

            <div
              aria-live="polite"
              style={{ marginTop: "8px", fontWeight: "bold" }}
            >
              {statusMessage}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

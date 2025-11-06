// Import Recharts components for a simple line chart
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardGraph() {
  // Placeholder data: simulate business growth / payments
  const data = [
    { month: "Jan", value: 400 },
    { month: "Feb", value: 600 },
    { month: "Mar", value: 500 },
    { month: "Apr", value: 700 },
    { month: "May", value: 800 },
    { month: "Jun", value: 750 },
  ];

  return (
    // Section with accessible labeling
    <section
      aria-labelledby="dashboard-graph-heading"
      className="dashboard-graph"
    >
      {/* Heading for accessibility */}
      <h2 id="dashboard-graph-heading">Business Growth / Payments Overview</h2>

      {/* Responsive chart container */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          {/* Grid lines for easier reading */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* X and Y axes */}
          <XAxis dataKey="month" />
          <YAxis />
          {/* Tooltip on hover */}
          <Tooltip />
          {/* Legend for chart info */}
          <Legend />
          {/* Line representing growth/payments */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

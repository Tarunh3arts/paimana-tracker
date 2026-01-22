"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DelayChart({ data }) {
  const topDelayed = [...data]
    .sort((a, b) => b.delay_months - a.delay_months)
    .slice(0, 5);

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <h2 style={{ fontWeight: "bold", marginBottom: "8px" }}>
        Top Delayed Projects
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={topDelayed}>
          <XAxis dataKey="name" hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey="delay_months" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

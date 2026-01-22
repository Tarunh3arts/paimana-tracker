"use client";

import { useState } from "react";

export default function ProjectTable({ data }) {
  const [search, setSearch] = useState("");

  const filtered = data.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        className="border p-2 mb-3 w-full"
        placeholder="Search project..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Progress %</th>
            <th>Delay (months)</th>
            <th>Cost Overrun %</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id} className="border-t">
              <td>{p.name}</td>
              <td>{p.state}</td>
              <td>{p.progress_pct}</td>
              <td>{p.delay_months}</td>
              <td>{p.cost_overrun_pct}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

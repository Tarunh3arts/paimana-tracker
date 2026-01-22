import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { useEffect, useState } from "react";
import api from "./api";

function SectorChart() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/analytics/advanced").then(res => setStats(res.data));
  }, []);

  if (!stats) return null;

  const barData = Object.keys(stats.sector_progress).map(k => ({
    sector: k,
    value: stats.sector_progress[k],
  }));

  const pieData = [
    { name: "Delayed", value: stats.delayed },
    { name: "On Track", value: stats.ontrack },
  ];

  return (
    <>
      <div className="row text-center mb-4">
        <div className="col">Total Projects<br/><b>{stats.total}</b></div>
        <div className="col text-warning">Delayed<br/><b>{stats.delayed}</b></div>
        <div className="col text-danger">Cost Overrun<br/><b>{stats.cost_overrun}</b></div>
      </div>

      <BarChart width={700} height={300} data={barData}>
        <XAxis dataKey="sector" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#0d6efd" />
      </BarChart>

      <PieChart width={400} height={300}>
        <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
          <Cell fill="#dc3545" />
          <Cell fill="#198754" />
        </Pie>
      </PieChart>
    </>
  );
}

export default SectorChart;

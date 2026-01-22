import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import api from "./api";

function SectorChart() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/analytics/summary").then(res => setStats(res.data));
  }, []);

  if (!stats) return null;

  const chartData = Object.keys(stats.sector_progress).map(k => ({
    sector: k,
    value: stats.sector_progress[k],
  }));

  return (
    <>
      <h5>Total Projects: {stats.total_projects}</h5>
      <h6 className="text-warning">Delayed: {stats.delayed_projects}</h6>
      <h6 className="text-danger">Cost Overrun: {stats.cost_overrun_projects}</h6>

      <BarChart width={700} height={350} data={chartData}>
        <XAxis dataKey="sector" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#0d6efd" />
      </BarChart>
    </>
  );
}

export default SectorChart;

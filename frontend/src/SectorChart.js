import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import api from "./api";

function SectorChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/analytics/sector-progress").then(res => {
      setData(Object.keys(res.data).map(k => ({
        sector: k,
        value: res.data[k],
      })));
    });
  }, []);

  return (
    <BarChart width={700} height={400} data={data}>
      <XAxis dataKey="sector" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#4ade80" />
    </BarChart>
  );
}

export default SectorChart;

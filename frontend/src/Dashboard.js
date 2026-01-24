import { useState } from "react";
import ProjectCards from "./ProjectCards";
import ReportUpload from "./ReportUpload";

function Dashboard() {
  const [reload, setReload] = useState(false);

  return (
    <div className="container mt-4">
      <ReportUpload refresh={() => setReload(!reload)} />
      <ProjectCards key={reload} />
    </div>
  );
}

export default Dashboard;

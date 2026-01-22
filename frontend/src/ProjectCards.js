import { useEffect, useState } from "react";
import api from "./api";

function ProjectCards() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then(res => setProjects(res.data));
  }, []);

  return (
    <div className="row">
      {projects.map(p => (
        <div key={p.project_id} className="col-md-6 mb-4">
          <div className="card bg-dark text-white card-hover">
            <div className="card-body">
              <h5>{p.project_name}</h5>
              <p>Sector: {p.sector}</p>
              <p>Progress: {p.progress}%</p>
              <p>Status: {p.status}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectCards;

import { useEffect, useState } from "react";
import api from "./api";

function ProjectCards() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/projects").then(res => setData(res.data));
  }, []);

  return (
    <div className="row mt-4">
      {data.map(p => (
        <div key={p.project_id} className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow bg-dark text-white">
            <div className="card-body">
              <h5>{p.project_name}</h5>
              <p>{p.sector}</p>
              <div className="progress mb-2">
                <div
                  className={`progress-bar ${p.progress < 60 ? "bg-danger" : "bg-success"}`}
                  style={{ width: `${p.progress}%` }}
                >
                  {p.progress}%
                </div>
              </div>
              <span className="badge bg-warning">{p.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectCards;

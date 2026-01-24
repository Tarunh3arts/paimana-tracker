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
          <div className="card shadow bg-dark text-white h-100">
            <div className="card-body">

              {/* Project Title */}
              <h5 className="card-title">{p.project_name}</h5>
              <p className="text-muted">{p.sector}</p>

              {/* Progress Bar */}
              <div className="progress mb-2">
                <div
                  className={`progress-bar ${
                    p.progress < 60 ? "bg-danger" : "bg-success"
                  }`}
                  style={{ width: `${p.progress}%` }}
                >
                  {p.progress}%
                </div>
              </div>

              {/* Status */}
              <span className="badge bg-warning mb-2">{p.status}</span>

              {/* ✅ Problems Faced (FIXED) */}
              {p.problems && p.problems.length > 0 && (
                <div className="mt-3">
                  <b className="text-warning">Problems Faced:</b>
                  <ul className="mt-1">
                    {p.problems.map((pr, i) => (
                      <li key={i} className="text-danger small">
                        {pr}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectCards;

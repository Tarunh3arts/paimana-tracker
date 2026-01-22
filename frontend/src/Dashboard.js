import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ProjectCards from "./ProjectCards";
import MapView from "./MapView";
import SectorChart from "./SectorChart";
import ChatUI from "./ChatUI";

function Dashboard() {
  const [page, setPage] = useState("dashboard");

  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 d-none d-md-block">
            <Sidebar setPage={setPage} />
          </div>

          <div className="col-md-10 mt-4">
            {page === "dashboard" && <ProjectCards />}
            {page === "map" && <MapView />}
            {page === "analytics" && <SectorChart />}
            {page === "chat" && <ChatUI />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

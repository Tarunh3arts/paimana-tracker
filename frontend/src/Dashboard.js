import { useState } from "react";
import Navbar from "./Navbar";
import ProjectCards from "./ProjectCards";
import MapView from "./MapView";
import SectorChart from "./SectorChart";
import ChatUI from "./ChatUI";

function Dashboard() {
  const [tab, setTab] = useState("dashboard");

  return (
    <>
      <Navbar setTab={setTab} />
      <div className="container">
        {tab==="dashboard" && <ProjectCards />}
        {tab==="map" && <MapView />}
        {tab==="analytics" && <SectorChart />}
        {tab==="chat" && <ChatUI />}
      </div>
    </>
  );
}

export default Dashboard;

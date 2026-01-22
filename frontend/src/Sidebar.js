import { FaChartBar, FaMap, FaRobot, FaTable } from "react-icons/fa";

function Sidebar({ setPage }) {
  return (
    <div className="p-3 bg-dark vh-100">
      <button className="btn btn-dark w-100 mb-2" onClick={() => setPage("dashboard")}>
        <FaTable /> Dashboard
      </button>
      <button className="btn btn-dark w-100 mb-2" onClick={() => setPage("map")}>
        <FaMap /> Map
      </button>
      <button className="btn btn-dark w-100 mb-2" onClick={() => setPage("analytics")}>
        <FaChartBar /> Analytics
      </button>
      <button className="btn btn-dark w-100" onClick={() => setPage("chat")}>
        <FaRobot /> AI Chat
      </button>
    </div>
  );
}

export default Sidebar;

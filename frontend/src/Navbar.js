function Navbar({ setTab }) {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
      <span className="navbar-brand">InfraTracker AI</span>
      <div className="navbar-nav ms-auto">
        <button className="btn btn-dark" onClick={()=>setTab("dashboard")}>Dashboard</button>
        <button className="btn btn-dark" onClick={()=>setTab("map")}>Map</button>
        <button className="btn btn-dark" onClick={()=>setTab("analytics")}>Analytics</button>
        <button className="btn btn-dark" onClick={()=>setTab("chat")}>AI Chat</button>
      </div>
    </nav>
  );
}
export default Navbar;

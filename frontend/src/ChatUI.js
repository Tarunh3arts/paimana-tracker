import { useState } from "react";
import api from "./api";

function ChatUI() {
  const [q, setQ] = useState("");
  const [res, setRes] = useState("");

  const ask = () => {
    api.get(`/chat?q=${q}`).then(r => {
      setRes(JSON.stringify(r.data, null, 2));
    });
  };

  return (
    <div className="card bg-dark text-white p-4">
      <input className="form-control mb-3" onChange={e=>setQ(e.target.value)} />
      <button className="btn btn-primary" onClick={ask}>Ask</button>
      <pre className="mt-3">{res}</pre>
    </div>
  );
}

export default ChatUI;

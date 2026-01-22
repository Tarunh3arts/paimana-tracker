import { useState } from "react";
import api from "./api";

function ChatUI() {
  const [q, setQ] = useState("");
  const [ans, setAns] = useState("");

  const ask = () => {
    api.get(`/chat?query=${q}`).then(res => {
      setAns(JSON.stringify(res.data, null, 2));
    });
  };

  return (
    <div className="card bg-dark text-white">
      <div className="card-body">
        <input className="form-control mb-3" value={q} onChange={e => setQ(e.target.value)} />
        <button className="btn btn-success" onClick={ask}>Ask AI</button>
        <pre className="mt-3">{ans}</pre>
      </div>
    </div>
  );
}

export default ChatUI;

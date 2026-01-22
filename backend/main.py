from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_data():
    with open("paimana_data.json") as f:
        return json.load(f)

@app.get("/projects")
def get_projects():
    return load_data()

@app.get("/analytics/summary")
def analytics():
    data = load_data()
    delayed = [p for p in data if p["status"] == "Delayed"]
    cost_overrun = [p for p in data if p["actual_cost"] > p["budget"]]

    sector_progress = {}
    for p in data:
        sector_progress.setdefault(p["sector"], []).append(p["progress"])

    return {
        "total_projects": len(data),
        "delayed_projects": len(delayed),
        "cost_overrun_projects": len(cost_overrun),
        "sector_progress": {
            k: sum(v) / len(v) for k, v in sector_progress.items()
        }
    }

@app.get("/chat")
def chat(q: str):
    data = load_data()
    q = q.lower()

    if "delayed" in q:
        return [p["project_name"] for p in data if p["status"] == "Delayed"]

    if "cost overrun" in q:
        return [p["project_name"] for p in data if p["actual_cost"] > p["budget"]]

    for p in data:
        if p["project_name"].lower() in q:
            return p

    return {"message": "Try: delayed projects, cost overrun projects, or project name"}

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

from fastapi import UploadFile, File
import uuid, json
from report_extractor import extract_text, extract_project_fields

@app.post("/upload-report")
async def upload_report(file: UploadFile = File(...)):
    file_id = f"uploads/{uuid.uuid4()}_{file.filename}"
    with open(file_id, "wb") as f:
        f.write(await file.read())

    text = extract_text(file_id)
    project_data = extract_project_fields(text)

    # Save to dataset (demo DB)
    with open("paimana_data.json", "r+") as f:
        data = json.load(f)
        project_data["project_id"] = len(data) + 1000
        data.append(project_data)
        f.seek(0)
        json.dump(data, f, indent=2)

    return {
        "message": "Report processed successfully",
        "project": project_data
    }

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
        return {
            "answer": "These projects are delayed:",
            "projects": [p["project_name"] for p in data if p["status"] == "Delayed"]
        }

    if "cost" in q:
        return {
            "answer": "Projects with cost overrun:",
            "projects": [p["project_name"] for p in data if p["actual_cost"] > p["budget"]]
        }

    return {
        "answer": "You can ask about delayed projects, cost overruns, or a project name."
    }


@app.get("/analytics/advanced")
def advanced_analytics():
    data = load_data()

    delayed = [p for p in data if p["status"] == "Delayed"]
    ontrack = [p for p in data if p["status"] != "Delayed"]
    cost_overrun = [p for p in data if p["actual_cost"] > p["budget"]]

    sector = {}
    for p in data:
        sector.setdefault(p["sector"], []).append(p["progress"])

    return {
        "total": len(data),
        "delayed": len(delayed),
        "ontrack": len(ontrack),
        "cost_overrun": len(cost_overrun),
        "sector_progress": {
            k: round(sum(v)/len(v), 2) for k, v in sector.items()
        }
    }

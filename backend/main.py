from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data_loader import load_data
from analytics import sector_stats,risk_score

app=FastAPI()

# Enable CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status":"API running"}

@app.get("/projects")
def projects():
    return load_data()

@app.get("/analytics/sector-progress")
def sector_progress():
    return sector_stats(load_data())

@app.get("/analytics/summary")
def summary():
    data=load_data()
    return {
        "total":len(data),
        "delayed":len([p for p in data if p["progress"]<80]),
        "high_risk":len([p for p in data if risk_score(p)>60])
    }

@app.get("/chat")
def chat(query:str):
    data=load_data()
    q=query.lower()

    if "delayed" in q:
        return [p for p in data if p["progress"]<80]

    if "risk" in q:
        return [{**p,"risk":risk_score(p)} for p in data if risk_score(p)>60]

    if "sector" in q:
        return sector_stats(data)

    return {"message":"Try delayed, risk, sector"}

@app.get("/map/markers")
def map_markers():
    data = load_data()
    return [
        {
            "project_id": p["project_id"],
            "name": p["project_name"],
            "lat": 17.385,      # demo coords (replace later)
            "lng": 78.4867,
            "status": p["status"]
        }
        for p in data
    ]

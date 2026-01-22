# InfraTracker AI

Real-time dashboard for tracking Indian infrastructure projects with AI-powered analytics, visualization, and geographic mapping.

## Features

- **Dashboard**: Project cards showing name, sector, progress %, and status
- **Map View**: Interactive geographic markers with clustering
- **Analytics**: Sector-wise progress visualization with bar charts
- **AI Chat**: Query interface for project insights
- **Theme Toggle**: Dark/light mode support

## Tech Stack

### Frontend
- React 18.2.0
- Bootstrap 5.3.8
- Axios for API calls
- Leaflet + React-Leaflet for maps
- Recharts for data visualization
- React Icons

### Backend
- FastAPI (Python)
- Uvicorn ASGI server
- CORS enabled

## Setup

### Backend
```bash
cd backend
pip install -r ../requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Access
- Frontend: http://localhost:3000
- Backend API: http://127.0.0.1:8000
- API Docs: http://127.0.0.1:8000/docs

## Project Structure
```
infrastructure-tracker/
├── backend/
│   ├── main.py              # FastAPI app
│   ├── data_loader.py       # Data utilities
│   ├── analytics.py         # Analytics functions
│   └── paimana_data.json    # Project data
├── frontend/
│   └── src/
│       ├── Dashboard.js     # Main layout
│       ├── ProjectCards.js  # Project cards
│       ├── MapView.js       # Leaflet map
│       ├── SectorChart.js   # Charts
│       └── ChatUI.js        # AI chat
└── requirements.txt
```

## License
MIT

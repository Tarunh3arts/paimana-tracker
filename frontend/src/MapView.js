import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import api from "./api";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "/image.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});


function MapView() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/projects").then(res => setData(res.data));
  }, []);

  return (
    <MapContainer center={[20.59,78.96]} zoom={5} style={{height:"500px"}}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.map(p => (
        <Marker key={p.project_id} icon={customIcon} position={[p.latitude, p.longitude]}>
          <Popup>
            <b>{p.project_name}</b><br/>
            {p.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;

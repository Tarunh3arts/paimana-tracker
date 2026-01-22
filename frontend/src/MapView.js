import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect, useState } from "react";
import api from "./api";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapView() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    api.get("/map/markers").then(res => setMarkers(res.data));
  }, []);

  return (
    <MapContainer center={[20.59, 78.96]} zoom={5} style={{ height: "500px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup>
        {markers.map(m => (
          <Marker key={m.project_id} position={[m.lat, m.lng]}>
            <Popup>
              <b>{m.name}</b><br />{m.status}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default MapView;

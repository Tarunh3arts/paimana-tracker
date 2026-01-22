import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ProjectMapInner({ data }) {
  return (
    <div style={{ height: "350px", width: "100%" }}>
      <MapContainer
        center={[22.5, 78.9]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]}>
            <Popup>
              <strong>{p.name}</strong><br />
              Progress: {p.progress_pct}%
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
  useEffect(() => {
    // Verhindere die Mehrfachinitialisierung der Karte
    if (!document.getElementById("map")._leaflet_id) {
      const map = L.map("map").setView([52.52, 13.405], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([52.52, 13.405]).addTo(map)
        .bindPopup("Aktueller Standort")
        .openPopup();
    }
  }, []);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "500px", outline: "none" }}
      role="application"
      aria-label="Interaktive Karte zur Eventsuche"
      tabIndex="0"
    ></div>
  );
}

export default Map;

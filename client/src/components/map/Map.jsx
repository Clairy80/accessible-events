import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
  const [map, setMap] = useState(null);
  const [zipcode, setZipcode] = useState("");

  useEffect(() => {
    if (!document.getElementById("map")._leaflet_id) {
      const newMap = L.map("map");
      setMap(newMap);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(newMap);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          newMap.setView([latitude, longitude], 12);
          L.marker([latitude, longitude])
            .addTo(newMap)
            .bindPopup("Ihr Standort")
            .openPopup();
        },
        () => {
          newMap.setView([52.52, 13.405], 12);
        }
      );
    }
  }, []);

  const searchByZipcode = async () => {
    if (!zipcode) return;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${zipcode},Germany`);
      const data = await response.json();
      if (data.length > 0 && map) {
        const { lat, lon } = data[0];
        map.setView([lat, lon], 12);
      }
    } catch (error) {
      console.error("Fehler bei der PLZ-Suche:", error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={zipcode} 
        onChange={(e) => setZipcode(e.target.value)} 
        placeholder="PLZ eingeben" 
      />
      <button onClick={searchByZipcode}>Suchen</button>
      <div
        id="map"
        style={{ width: "100%", height: "500px", outline: "none" }}
        role="application"
        aria-label="Interaktive Karte zur Eventsuche"
        tabIndex="0"
      ></div>
    </div>
  );
}

export default Map;

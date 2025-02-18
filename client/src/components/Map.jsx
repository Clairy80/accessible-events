import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";



function Map() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // UseEffect, um Events zu laden, wenn sich der searchTerm ändert
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`/api/events/search?query=${searchTerm}`);
      const data = await response.json();
      setEvents(data); // Events im State speichern
    };

    if (searchTerm) {
      fetchEvents();
    }
  }, [searchTerm]);

  // UseEffect für die Initialisierung und Aktualisierung der Karte
  useEffect(() => {
    const map = L.map("map", {
      center: [52.52, 13.405], // Standardkoordinaten
      zoom: 12,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Marker für jedes Event setzen
    events.forEach((event) => {
      L.marker([event.latitude, event.longitude])
        .addTo(map)
        .bindPopup(event.name);
    });

    // Nutzerstandort auf der Karte anzeigen
    map.locate({ setView: true, maxZoom: 16 });

    return () => {
      map.remove(); // Karte entfernen, wenn der Komponent entladen wird
    };
  }, [events]); // Der Effekt wird jedes Mal ausgeführt, wenn sich 'events' ändern

  return (
    <div className="map-container">
      {/* Suchfeld */}
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // setze den searchTerm auf Basis der Benutzereingabe
          placeholder="Suche nach Events..."
          aria-label="Suche nach barrierefreien Events"
        />
      </div>

      {/* Karte anzeigen */}
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

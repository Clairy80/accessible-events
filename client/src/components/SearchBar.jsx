import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [zipcode, setZipcode] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleZipcodeChange = (event) => {
    setZipcode(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const searchByZipcode = async () => {
    if (!zipcode) return;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${zipcode},Germany`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        onSearch({ lat, lon });
      }
    } catch (error) {
      console.error("Fehler bei der PLZ-Suche:", error);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Suche nach Events..."
        aria-label="Suche nach barrierefreien Events"
      />
      <button onClick={handleSearchSubmit} aria-label="Events suchen">
        Suchen
      </button>
      <input
        type="text"
        value={zipcode}
        onChange={handleZipcodeChange}
        placeholder="PLZ eingeben..."
        aria-label="Postleitzahl eingeben"
      />
      <button onClick={searchByZipcode} aria-label="Ort mit PLZ suchen">
        PLZ Suchen
      </button>
    </div>
  );
};

function Map() {
  const [map, setMap] = useState(null);

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

  const handleSearch = (location) => {
    if (map && location.lat && location.lon) {
      map.setView([location.lat, location.lon], 12);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div
        id="map"
        style={{ width: "100vw", height: "500px", outline: "none" }}
        role="application"
        aria-label="Interaktive Karte zur Eventsuche"
        tabIndex="0"
      ></div>
    </div>
  );
}

export default Map;

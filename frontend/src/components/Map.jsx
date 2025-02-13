import React, { useEffect } from "react";

function Map() {
  useEffect(() => {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 52.52, lng: 13.405 },
      zoom: 12
    });

    new google.maps.Marker({
      position: { lat: 52.52, lng: 13.405 },
      map,
      title: "Aktueller Standort",
    });
  }, []);

  return (
    <div 
      id="map" 
      role="application" 
      aria-label="Interaktive Karte zur Eventsuche" 
      tabIndex="0" 
      style={{ width: "100%", height: "500px", outline: "none" }}>
    </div>
  );
}

export default Map;

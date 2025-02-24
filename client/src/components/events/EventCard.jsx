import React from "react";

function EventCard({ event }) {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <p><strong>Datum:</strong> {event.date}</p>
      <p><strong>Ort:</strong> {event.location}</p>
      <p><strong>Kategorie:</strong> {event.category}</p>
      <button className="btn btn-primary">Details anzeigen</button>
    </div>
  );
}

export default EventCard;

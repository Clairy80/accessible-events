import React from "react";

function EventList({ events }) {
  return (
    <div className="event-list">
      <h2>Veranstaltungen</h2>
      {events.length === 0 ? (
        <p>Es wurden keine Veranstaltungen gefunden.</p>
      ) : (
        <ul>
          {events.map((event, index) => (
            <li key={index} className="event-item">
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p><strong>Datum:</strong> {event.date}</p>
              <p><strong>Ort:</strong> {event.location}</p>
              <p><strong>Kategorie:</strong> {event.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventList;

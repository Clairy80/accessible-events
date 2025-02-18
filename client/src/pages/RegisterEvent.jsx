import React, { useState } from "react";

function RegisterEvent() {
  const [eventData, setEventData] = useState({
    name: "",
    location: "",
    date: "",
    description: "",
    accessibility: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    if (response.ok) {
      alert("Event erfolgreich eingetragen!");
      setEventData({ name: "", location: "", date: "", description: "", accessibility: "" });
    } else {
      alert("Fehler beim Eintragen des Events.");
    }
  };

  return (
    <div>
      <h2>Event registrieren</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={eventData.name} onChange={handleChange} placeholder="Event Name" required />
        <input type="text" name="location" value={eventData.location} onChange={handleChange} placeholder="Ort" required />
        <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
        <textarea name="description" value={eventData.description} onChange={handleChange} placeholder="Beschreibung" required></textarea>
        <input type="text" name="accessibility" value={eventData.accessibility} onChange={handleChange} placeholder="Barrierefreiheit" required />
        <button type="submit">Event eintragen</button>
      </form>
    </div>
  );
}

export default RegisterEvent;
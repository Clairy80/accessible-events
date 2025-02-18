import React, { useState } from "react";

const RegisterEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    accessibility: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    if (response.ok) {
      alert("Event erfolgreich eingetragen!");
      setEventData({
        name: "",
        description: "",
        date: "",
        time: "",
        location: "",
        accessibility: "",
      });
    } else {
      alert("Fehler beim Eintragen des Events.");
    }
  };

  return (
    <div className="register-container">
      <h2>Event eintragen</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Eventname" value={eventData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Beschreibung" value={eventData.description} onChange={handleChange} required />
        <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
        <input type="time" name="time" value={eventData.time} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Ort (Adresse oder Koordinaten)" value={eventData.location} onChange={handleChange} required />
        <select name="accessibility" value={eventData.accessibility} onChange={handleChange} required>
          <option value="">Barrierefreiheit</option>
          <option value="wheelchair">Rollstuhlgerecht</option>
          <option value="blind">Für Sehbehinderte</option>
          <option value="deaf">Für Gehörlose</option>
          <option value="other">Sonstiges</option>
        </select>
        <button type="submit">Event speichern</button>
      </form>
    </div>
  );
};

export default RegisterEvent;

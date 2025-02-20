// src/components/RegisterEvent.jsx

import React, { useState } from "react";

const RegisterEvent = () => {
  const [event, setEvent] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  
  // Zustände für Barrierefreie Angebote
  const [accessibilityOptions, setAccessibilityOptions] = useState({
    ramp: false,
    elevator: false,
    parking: false,
    quietRoom: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAccessibilityOptions((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Daten vorbereiten
    const eventData = {
      event,
      organizer,
      password,
      email,
      accessibilityOptions,
    };

    try {
      // API Anfrage
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      // Prüfen, ob die Antwort erfolgreich war
      if (response.ok) {
        const data = await response.json();
        console.log("Event successfully registered:", data);
        // Optional: Benachrichtigung oder Redirect
      } else {
        console.log("Error registering event:", response.statusText);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <h2>Event Registrierung</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Event Name"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Veranstalter"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Barrierefreie Angebote */}
        <div>
          <label>Barrierefreie Angebote:</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="ramp"
                checked={accessibilityOptions.ramp}
                onChange={handleCheckboxChange}
              />
              Rampe
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="elevator"
                checked={accessibilityOptions.elevator}
                onChange={handleCheckboxChange}
              />
              Rollstuhlgerechter Aufzug
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="parking"
                checked={accessibilityOptions.parking}
                onChange={handleCheckboxChange}
              />
              Parkplatz
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="quietRoom"
                checked={accessibilityOptions.quietRoom}
                onChange={handleCheckboxChange}
              />
              Ruheraum für Autisten
            </label>
          </div>
        </div>

        <button type="submit">Event Registrieren</button>
      </form>
    </div>
  );
};

export default RegisterEvent;

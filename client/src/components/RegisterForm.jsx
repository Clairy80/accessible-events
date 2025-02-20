import React, { useState } from "react";

const RegisterForm = () => {
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

    // Anpassung der eventData, um den Feldnamen aus dem Backend zu entsprechen
    const eventData = {
      title: event, // event wird zu title
      description: "", // Hier könnte eine Beschreibung hinzugefügt werden
      date: "", // Hier könnte ein Datum hinzugefügt werden
      location: "", // Hier könnte der Standort hinzugefügt werden
      lat: 0, // Hier könnte der Wert von lat aus dem Formular kommen
      lon: 0, // Hier könnte der Wert von lon aus dem Formular kommen
      accessibilityOptions,
      publicTransportProximity: false, // Beispielwert
      wcAccessible: false, // Beispielwert
      elevatorAccessible: false, // Beispielwert
      languageOptions: [], // Beispielwert
    };

    try {
      const response = await fetch("http://localhost:5001/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Event erfolgreich registriert:", result);
      } else {
        console.error("Fehler bei der Registrierung:", result);
      }
    } catch (error) {
      console.error("Es gab einen Fehler bei der Anfrage:", error);
    }
  };

  return (
    <div>
      <h2>Registrierungsformular</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Event"
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

        <button type="submit">Registrieren</button>
      </form>
    </div>
  );
};

export default RegisterForm;

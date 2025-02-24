import React, { useState } from "react";

const LoginForOrganizer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:5001/api/organizers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Login erfolgreich:", result);
      } else {
        console.error("Fehler beim Login:", result);
      }
    } catch (error) {
      console.error("Fehler bei der Anfrage:", error);
    }
  };

  return (
    <div>
      <h2>Login für Veranstalter</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForOrganizer;

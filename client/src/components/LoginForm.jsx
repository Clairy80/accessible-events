import React, { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier könnte die Logik zum Verarbeiten der Login-Daten folgen
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-Mail-Adresse"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Passwort</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passwort"
          required
        />
      </div>
      <button type="submit">Einloggen</button>
    </form>
  );
}

export default LoginForm;

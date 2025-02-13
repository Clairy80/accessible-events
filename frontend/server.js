import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles.css";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setMessage("Erfolgreich eingeloggt!");
    } catch (error) {
      setMessage("Login fehlgeschlagen: " + error.response.data.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", { username, password });
      setMessage("Benutzer registriert! Jetzt einloggen.");
    } catch (error) {
      setMessage("Registrierung fehlgeschlagen: " + error.response.data.message);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Barrierefreie Events</h1>
        <p>Finde barrierefreie Veranstaltungen in deiner Nähe.</p>
      </header>

      <main>
        <section className="auth-forms">
          {/* Login Form */}
          <form onSubmit={handleLogin} aria-labelledby="login-form-title">
            <h2 id="login-form-title">Login</h2>
            <div>
              <label htmlFor="loginUsername">Benutzername</label>
              <input
                type="text"
                id="loginUsername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-required="true"
                aria-describedby="login-username-help"
              />
              <span id="login-username-help">Geben Sie Ihren Benutzernamen ein.</span>
            </div>
            <div>
              <label htmlFor="loginPassword">Passwort</label>
              <input
                type="password"
                id="loginPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
                aria-describedby="login-password-help"
              />
              <span id="login-password-help">Geben Sie Ihr Passwort ein.</span>
            </div>
            <button type="submit">Login</button>
          </form>

          {/* Register Form */}
          <form onSubmit={handleRegister} aria-labelledby="register-form-title">
            <h2 id="register-form-title">Registrierung</h2>
            <div>
              <label htmlFor="registerUsername">Benutzername</label>
              <input
                type="text"
                id="registerUsername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-required="true"
                aria-describedby="register-username-help"
              />
              <span id="register-username-help">Geben Sie einen Benutzernamen ein.</span>
            </div>
            <div>
              <label htmlFor="registerPassword">Passwort</label>
              <input
                type="password"
                id="registerPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
                aria-describedby="register-password-help"
              />
              <span id="register-password-help">Geben Sie ein Passwort ein.</span>
            </div>
            <button type="submit">Registrieren</button>
          </form>
        </section>

        {/* Feedback Message */}
        <section aria-live="polite">
          <p>{message}</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Barrierefreie Events</p>
      </footer>
    </div>
  );
}

export default App;

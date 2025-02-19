import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Map from "./components/Map.jsx";
import SearchBar from "./components/SearchBar.jsx";
import RegisterEvent from "./pages/RegisterEvent.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import "./assets/styles.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/">Event-Suche</Link></li>
            <li><Link to="/register-event">Event eintragen</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registrieren</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <SearchBar onSearch={handleSearch} />
              <Map searchTerm={searchTerm} />
            </>
          } />
          <Route path="/register-event" element={<RegisterEvent />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

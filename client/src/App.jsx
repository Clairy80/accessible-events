import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Map from "./components/Map.jsx";
import SearchBar from "./components/SearchBar.jsx";
import RegisterEvent from "./pages/RegisterEvent.jsx";
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
            <li><Link to="/register">Event eintragen</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <SearchBar onSearch={handleSearch} />
              <Map searchTerm={searchTerm} />
            </>
          } />
          <Route path="/register" element={<RegisterEvent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

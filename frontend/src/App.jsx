import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Map from "./components/Map";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <SearchBar />
        <Map />
      </main>
      <Footer />
    </div>
  );
}

export default App;

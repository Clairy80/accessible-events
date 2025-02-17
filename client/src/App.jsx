import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
/*import "./assets/styles.css";*/
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Map from './components/Map.jsx'; 
import Footer from "./components/Footer.jsx";

const App = () => {
  return (
    <div className="container">
      <Header />
      <main className="container">
        <SearchBar />
        <Map /> 
      </main>
      <Footer /> 
    </div>
  );
};

export default App;


import React from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm); // Sucht die Events, wenn der Benutzer etwas eingibt
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Suche nach Events..."
        aria-label="Suche nach barrierefreien Events"
      />
      <button onClick={handleSearchSubmit} aria-label="Events suchen">
        Suchen
      </button>
    </div>
  );
};

export default SearchBar;

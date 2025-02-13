import React from "react";

function SearchBar() {
  return (
    <section className="search">
      <label htmlFor="eventSearch" className="sr-only">Event suchen</label>
      <input type="text" id="eventSearch" placeholder="Suche nach Events" />
      <button>Suche</button>
    </section>
  );
}

export default SearchBar;

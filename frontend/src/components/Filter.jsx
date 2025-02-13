import React, { useState } from "react";

function Filter() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dateRange, setDateRange] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateRange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier könnte die Logik zum Filtern von Events folgen
    console.log("Kategorie:", selectedCategory);
    console.log("Datum:", dateRange);
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="category">Kategorie</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Alle</option>
          <option value="events">Events</option>
          <option value="restaurants">Restaurants</option>
          <option value="transport">Öffentliche Verkehrsmittel</option>
          <option value="parking">Parkplätze</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="dateRange">Datum</label>
        <input
          type="date"
          id="dateRange"
          value={dateRange}
          onChange={handleDateChange}
        />
      </div>
      <button type="submit">Filtern</button>
    </form>
  );
}

export default Filter;

import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="Searchbar">
      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <input
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search books"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

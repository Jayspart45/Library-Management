import React, { useState } from "react";
import BooksPage from "./BookPage";
import SearchBar from "./SearchBar";
export default function Book({ handleAddToCart }) {
  const [searchQuery, setSearchQuery] = useState("Web Development");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        handleSearch={handleSearch}
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
      />
      <BooksPage
        filter={filter}
        sortBy={sortBy}
        searchQuery={searchQuery}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
}

import React, { useState } from "react";
import BooksPage from "./BookPage";
import SearchBar from "../FeatureComponent/SearchBar";
import { useLocation } from "react-router-dom";
export default function Book({ handleAddToCart,cartItems }) {
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
  const location = useLocation();
  
  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        handleSearch={handleSearch}
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
      />
      <BooksPage
      cartItems={cartItems}
          
        filter={filter}
        sortBy={sortBy}
        searchQuery={searchQuery}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
}

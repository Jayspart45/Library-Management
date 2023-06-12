import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import BooksPage from './components/BookPage';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('Web Development');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <BooksPage searchQuery={searchQuery} />
    </div>
  );
};

export default App;

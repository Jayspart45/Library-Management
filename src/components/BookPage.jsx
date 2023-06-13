import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import BookList from "./BookList";
import Pagination from "./Pagination";

const BooksPage = ({ searchQuery, handleAddToCart,filter,sortBy }) => {
  const [books, setBooks] = useState([]);
 

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const perPage = 12;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
 
  
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
        const filterParam = filter ? `intitle:${filter}` : ""; // Filter by book title
        const orderBy = sortBy ? `orderBy=${sortBy}` : ""; // Sort by parameter
    
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            `${filterParam} ${searchQuery}`
          )}&startIndex=${currentPage * perPage}&maxResults=${perPage}&${orderBy}`
        );
    
        const data = await response.json();
        console.log(data);
        if (data.items) {
          setBooks(data.items);
          setPageCount(Math.ceil(data.totalItems / perPage));
        } else {
          setBooks([]);
          setPageCount(0);
        }

        setLoading(false);
      } catch (error) {
        
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery, currentPage]);

  return (
    <div>
      <h1 className="text-center display-2 text-light">Book List</h1>
      <Link className="btn" to="/cart">
        Cart
      </Link>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <BookList books={books} handleAddToCart={handleAddToCart} />
          <div id="observer"></div>
          {pageCount > 1 && (
            <Pagination
              pageCount={pageCount}
              handlePageClick={handlePageClick}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BooksPage;

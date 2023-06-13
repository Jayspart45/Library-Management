import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Spinner from "./Spinner";
import BookList from "./BookList";
import Pagination from "./Pagination";

const BooksPage = ({ searchQuery }) => {
  const [books, setBooks] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const perPage = 12; // Number of books to display per page

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            searchQuery
          )}&startIndex=${currentPage * perPage}&maxResults=${perPage}`
        );
        if (response.ok) {
          const data = await response.json();
          setBooks(data.items || []);
          setPageCount(Math.ceil(data.totalItems / perPage));
        } else {
          const errorData = await response.json();
          console.log("API Error:", errorData.error);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, searchQuery]);

  return (
    <div>
      <h1 className="text-center display-2 text-light">Book List</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <BookList books={books} />
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

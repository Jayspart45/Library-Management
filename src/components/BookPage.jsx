import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import BookItem from "./Bookitem";
import Spinner from "./Spinner";

const BooksPage = ({ searchQuery }) => {
  const [books, setBooks] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [observer, setObserver] = useState(null);
  const perPage = 12; // Number of books to display per page

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
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
          console.log(data);
          setBooks(data.items || []); // Set books to an empty array if data.items is undefined
          setPageCount(Math.ceil(data.totalItems / perPage));
        } else {
          const errorData = await response.json();
          console.log("API Error:", errorData.error);
          setError(errorData.error.message);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.5,
    };

    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });
    };

    const newObserver = new IntersectionObserver(handleObserver, options);
    setObserver(newObserver);

    return () => {
      // Cleanup function to disconnect the observer when the component unmounts
      newObserver.disconnect();
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  useEffect(() => {
    if (observer) {
      const targetElement = document.getElementById("observer");
      if (targetElement) {
        observer.observe(targetElement);
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observer]);

  return (
    <div>
      <h1 className="text-center display-2 text-light">Book List</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="row">
            {books.map((book, index) => (
              <div
                className="col-md-4 col-lg-2 col col-sm-6"
                key={`${book.id || book.isbn}-${index}`}
              >
                <BookItem book={book} />
                <hr />
              </div>
            ))}
          </div>
          <div id="observer"></div>
          {pageCount > 1 && (
            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName="pagination"
              activeClassName="active"
            />
          )}
        </>
      )}
    </div>
  );
};

export default BooksPage;

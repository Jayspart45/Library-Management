import React, { useState, useEffect } from "react";
import Spinner from "../FeatureComponent/Spinner";
import { Link } from "react-router-dom";
import BookList from "./BookList";
import Pagination from "../FeatureComponent/Pagination";
import User from "../FeatureComponent/User";

const BooksPage = ({ searchQuery, handleAddToCart, filter, sortBy, user, cartItems }) => {
  const [books, setBooks] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const perPage = 12;
  const [cartLength, setCartLength] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    setCurrentPage(0);
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
          )}&startIndex=${
            currentPage * perPage
          }&maxResults=${perPage}&${orderBy}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

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
        setError(null);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
        setError("Failed to fetch books. Please try again later.", error);
      }
    };

    fetchBooks();
  }, [searchQuery, currentPage]);

  const handleLogout = () => {
    // Perform logout actions here
  };

  useEffect(() => {
    const cartLength = cartItems.length;
    if (cartLength) {
      setCartLength(Number(cartLength));
    }
  }, [cartItems]);

  const [name, setName] = useState(() => {
    const storedName = localStorage.getItem("name");
    return storedName || user;
  });

  useEffect(() => {
    localStorage.setItem("name", user);
  }, [name]);

  return (
    <div>
      <h1 className="text-center topBar display-2 text-light">
        <User name={name} />
        Book List
        <Link className="ms-5 btn position-relative" to="/cart">
          Cart
          {cartLength > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartLength}
            </span>
          )}
          <i className="fa-solid fa-cart-shopping"></i>
        </Link>
        <Link to="/" className="btn" onClick={handleLogout}>
          Logout
          <i className="fa-solid ms-2 fa-right-from-bracket"></i>
        </Link>
      </h1>

      {error && (
        <div className="text-center">
          <p className="lead text-danger">{error}</p>
          <button className="btn" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : (
        !error && (
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
        )
      )}
    </div>
  );
};

export default BooksPage;

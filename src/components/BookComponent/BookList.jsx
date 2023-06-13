import React from "react";
import BookItem from "./Bookitem";

const BookList = ({ books, handleAddToCart }) => {
  return (
    <div className="row">
      {books.map((book, index) => (
        <div
          className="col-md-4 col-lg-2 col col-sm-6"
          key={`${book.id || book.isbn}-${index}`}
        >
          <BookItem book={book}  handleAddToCart={handleAddToCart} />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default BookList;

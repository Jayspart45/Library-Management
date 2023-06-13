import React from "react";
import BookItem from "./Bookitem";

const BookList = ({ books }) => {
  return (
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
  );
};

export default BookList;

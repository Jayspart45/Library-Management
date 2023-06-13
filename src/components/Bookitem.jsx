import React from "react";

const BookItem = ({ book, handleAddToCart }) => {
  const {
    title,
    authors,
    categories,
    publishedDate,
    imageLinks,
    industryIdentifiers,
  } = book.volumeInfo;
  const saleInfo = book.saleInfo;

  return (
    <div className="book-item card">
      {imageLinks && imageLinks.thumbnail && (
        <img className="card-top-img" src={imageLinks.thumbnail} alt={title} />
      )}
      <h3 className="card-title">{title.slice(0, 50)}...</h3>
      <p className="card-text">Author: {authors?.join(", ") ?? "Unknown"}</p>
      <p>Genre: {categories?.join(", ") ?? "Unknown"}</p>
      <p>Published: {publishedDate}</p>
      <p>
        Availability:{" "}
        {saleInfo.isEbook ? (
          <span style={{ color: "green" }}>Available &#10004;</span>
        ) : (
          <span style={{ color: "red" }}>Not Available &#10008;</span>
        )}
      </p>
      <p>
        Number of Copies:{" "}
        {industryIdentifiers && industryIdentifiers.length >= 0
          ? industryIdentifiers.length
          : "-"}
      </p>
      <button className="cartbtn" onClick={() => handleAddToCart(book)}>
        Add to Cart
      </button>
    </div>
  );
};

export default BookItem;

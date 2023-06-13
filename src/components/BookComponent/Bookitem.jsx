import React,{useState} from "react";
import Alert from "../FeatureComponent/Alert";
const BookItem = ({ book, handleAddToCart }) => {
  const {
    title,
    authors,
    categories,
    publishedDate,
    imageLinks,
    industryIdentifiers,
  } = book.volumeInfo;
  const [showAlert, setShowAlert] = useState(false);
  const saleInfo = book.saleInfo;
  const addToCart = () => {
    handleAddToCart(book);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };
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
      <button className="cartbtn" onClick={addToCart}>
        Add to Cart
      </button>
      {showAlert && <Alert type={"success"} title={title+" Book Added to Cart"} />}
    </div>
  );
};

export default BookItem;

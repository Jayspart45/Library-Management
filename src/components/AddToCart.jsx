import React from "react";
import AddToCartButton from "./AddToCart";

const AddToCartButton = ({ book, handleAddToCart }) => {
  const handleClick = () => {
    handleAddToCart(book);
  };

  return <button onClick={handleClick}>Add to Cart</button>;
};

export default AddToCartButton;

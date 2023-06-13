import React, { useState, useEffect } from "react";

const Cart = ({ cartItems }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log(cartItems);
    setCart(cartItems);
  }, [cartItems]);

  const handleRemoveFromCart = (bookId) => {
    const arr = cart.filter((item) => item.id !== bookId);
    setCart(arr);
  };

  return (
    <div className="centered" style={{ flexDirection: "column" }}>
      <h2 className="display-3 text-white text-center">Cart</h2>
      <ul className="CartList">
        {cart.map((item, index) => (
          <div className="carditem" key={index}>
            <li className="CardItem">{item.volumeInfo.title}</li>
            <button onClick={() => handleRemoveFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Cart;

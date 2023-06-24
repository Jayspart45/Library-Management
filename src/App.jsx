import React, { useState } from "react";
import Book from "./components/BookComponent/Book";
import Cart from "./components/FeatureComponent/Cart";
import Login from "./components/account/Login";
import Signup from "./components/account/Signup";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  const [cart, setCart] = useState([]);
  const [msg, setMsg] = useState([]);
  const [alert, setAlert] = useState(false);
  const handleAddToCart = (book) => {
    console.log(book);
    setCart((prevCart) => [...prevCart, book]);
  };
  const handleRemoveFromCart = (bookId) => {
    const updatedCart = cart.filter((item) => item.id !== bookId);
    setCart(updatedCart);
  };
  const handleCheckout = () => {
    const successMessage = "Successfully purchased items in the cart.";
    showAlert(successMessage);
    setCart([]);
  };

  const showAlert = (message) => {
    setMsg(message);
    console.log(cart);
    if (cart <= 0) setAlert(false);
    else setAlert(true);
  };
  setTimeout(() => {
    setAlert(false);
  }, 1000);
  return (
    <Router>
      <Routes>
        <Route index exact path="/" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route
          exact
          path="/book"
          element={<Book cartItems={cart} handleAddToCart={handleAddToCart} />}
        ></Route>
        <Route
          exact
          path="/cart"
          element={
            <Cart
              handleRemoveFromCart={handleRemoveFromCart}
              cartItems={cart}
              handleCheckout={handleCheckout}
              alert={alert}
              msg={msg}
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;

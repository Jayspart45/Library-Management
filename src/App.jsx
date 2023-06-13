import React, { useState } from "react";
import Book from "./components/BookComponent/Book";
import Cart from "./components/FeatureComponent/Cart";
import Login from "./components/account/Login";
import Signup from "./components/account/Signup";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (book) => {
    console.log(book);
    setCart((prevCart) => [...prevCart, book]);
  };
  
  return (
    <Router>
      <Routes>
        <Route index exact path="/" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/book" element={<Book cartItems={cart} handleAddToCart={handleAddToCart} />}></Route>
        <Route exact path="/cart" element={<Cart cartItems={cart} />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

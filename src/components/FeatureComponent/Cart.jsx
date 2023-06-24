import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Alert from "./Alert";

const Cart = ({
  cartItems,
  handleRemoveFromCart,
  handleCheckout,
  alert,
  msg,
}) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);

  const countTotalQuantity = (bookId) => {
    const totalQuantity = cart.reduce((total, item) => {
      if (item.id === bookId) {
        return total + 1;
      }
      return total;
    }, 0);
    return totalQuantity;
  };

  const uniqueBooks = [...new Set(cart.map((item) => item.id))];
  console.log(uniqueBooks);

  return (
    <div className="centered bg-img" style={{ flexDirection: "column" }}>
      {alert ? <Alert title={msg} type={"success"} /> : <></>}

      <h2 className="display-3 text-white text-center">Cart</h2>
      {cart.length > 0 ? (
        <table className="CartList">
          <thead>
            <tr>
              <th className="lead">Item Title</th>
              <th className="lead">Quantity</th>
              <th className="lead">Price</th>
              <th className="lead">Remove</th>
            </tr>
          </thead>
          <tbody>
            {uniqueBooks.map((bookId) => {
              const book = cart.find((item) => item.id === bookId);
              return (
                <tr key={bookId}>
                  <td>{book.volumeInfo.title}</td>
                  <td>{countTotalQuantity(bookId)}</td>
                  <td>
                    {book.saleInfo.retailPrice &&
                    book.saleInfo.retailPrice.amount ? (
                      <>
                        {(
                          book.saleInfo.retailPrice.amount *
                          countTotalQuantity(bookId)
                        ).toFixed(2)}
                        <i className="ms-2 fa-solid fa-indian-rupee-sign"></i>
                      </>
                    ) : (
                      "Not Available"
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleRemoveFromCart(bookId)}>
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <>
          <h1 className="lead   text-danger" >Cart Is Empty</h1>

          <img className="emptyCart" src={"./empty.svg"} alt="" />
        </>
      )}
      <div>
        <Link to="/book" className="btn mt-5">
          Go Back
        </Link>{" "}
        <button onClick={handleCheckout} className="btn mt-5">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import "./Main.scss";

import Bar from "../Bar/Bar";
import Shop from "../Shop/Shop";
import Cart from "../Cart/Cart";
import UpdateCart from "../UpdateCart/UpdateCart";

export default function Main() {
  const [cart, setCart] = useState({});
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  function addItem(unicID, name, price, quantity) {
    let updatedCart = { ...cart };

    if (quantity) {
      updatedCart[unicID] = { unicID, name, price, quantity };
    } else {
      delete updatedCart[unicID];
    }
    setCart(updatedCart);
    let newCount = 0;
    let newTotalPrice = 0;

    for (const item in updatedCart) {
      newCount += updatedCart[item].quantity;
      newTotalPrice += updatedCart[item].quantity * updatedCart[item].price;
    }
    setCount(newCount);
    setTotalPrice(newTotalPrice);
  }

  return (
    <>
      <h1>Fun Shop</h1>
      <Bar count={count} price={totalPrice} />
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="Shop" />} />

        {/* Other routes */}
        <Route
          path="Shop"
          element={<Shop addItem={addItem} setCart={setCart} />}
        />
        <Route
          path="Cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              setCount={setCount}
              setTotalPrice={setTotalPrice}
            />
          }
        />
        <Route path="UpdateCart" element={<UpdateCart />} />
      </Routes>
    </>
  );
}

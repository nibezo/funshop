import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import "./Main.scss";

import Bar from "../Bar/Bar";
import Shop from "../Shop/Shop";
import Cart from "../Cart/Cart";
import UpdateCart from "../UpdateCart/UpdateCart";

export default function Main() {
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  function addItem(unicID, name, price, quantity) {
    const updatedCart = [...cart];
    const element = updatedCart.find((obj) => obj.unicID == unicID);
    if (quantity) {
      const hasElement = updatedCart.some((obj) => obj.unicID == unicID);
      if (hasElement) {
        updatedCart[updatedCart.indexOf(element)].quantity = quantity;
      } else {
        updatedCart.push({ unicID, name, price, quantity });
      }
    } else {
      if (quantity === 0) {
        updatedCart.splice(updatedCart.indexOf(element), 1);
      }
    }
    setCount(updatedCart.reduce((acc, obj) => acc + obj.quantity, 0));
    setTotalPrice(
      updatedCart.reduce((acc, obj) => acc + obj.price * obj.quantity, 0)
    );
    console.log(updatedCart);
    setCart(updatedCart);
  }

  return (
    <>
      <h1>Fun Shop</h1>
      <span>
        Welcome,{" "}
        <span style={{ color: "#00985f", fontWeight: "bold" }}>
          {localStorage.getItem("username")}
        </span>
      </span>
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

import "./Main.scss";

import { Routes, Route, Navigate } from "react-router-dom";

import Bar from "../Bar/Bar";
import Shop from "../Shop/Shop";
import Cart from "../Cart/Cart";
import UpdateCart from "../UpdateCart/UpdateCart";

export default function Main() {
  return (
    <>
      <h1>Fun Shop</h1>
      <Bar />
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="Shop" />} />

        {/* Other routes */}
        <Route path="Shop" element={<Shop />} />
        <Route path="Cart" element={<Cart />} />
        <Route path="UpdateCart" element={<UpdateCart />} />
      </Routes>
    </>
  );
}
